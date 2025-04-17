/**
 * Contains utility functions to generate navigations.
 */
import type { CollectionEntry, CollectionKey } from "astro:content"
import Path from "path"
/**
 * Generate a collection navigation based on the collection entries.
 * Group entries by their category (folder) and sort categories based on their folder name prefix.
 * Entries within each category are sorted alphabetically by their ID.
 * @param entries Collection entries to group.
 * @returns Grouped and sorted collection entries.
 */
export const generateCollectionNavigation = (
  entries: Array<CollectionEntry<CollectionKey>>
): Record<string, CollectionEntry<CollectionKey>[]> => {
  // 1. Identify and sort category index files by their ID (path)
  // This ensures categories like '1-getting-started' come before '2-archetypes'
  const sortedCategories = entries
    .filter((entry) => Path.parse(entry.id).name === "index")
    .sort((a, b) => a.id.localeCompare(b.id))

  const categoryMap = new Map(
    sortedCategories.map((cat) => [Path.parse(cat.id).dir, cat])
  )

  // 2. Group all non-index entries, finding their corresponding category
  const grouped: Record<string, CollectionEntry<CollectionKey>[]> = {}
  const rootEntries: CollectionEntry<CollectionKey>[] = []

  entries.forEach((entry) => {
    // Skip index files themselves from appearing in the lists
    if (Path.parse(entry.id).name === "index") {
      return
    }

    const entryDir = Path.parse(entry.id).dir
    let foundCategory = false
    // Iterate through sorted categories to find the parent directory
    for (const [catDir, category] of categoryMap.entries()) {
      // Check if the entry's directory starts with the category directory
      // Use Path.sep to handle different OS path separators if necessary, though Astro usually normalizes IDs
      if (entryDir === catDir || entryDir.startsWith(catDir + Path.sep)) {
        const categoryTitle = category.data.title || "" // Use title for the key in the final object
        if (!grouped[categoryTitle]) {
          grouped[categoryTitle] = []
        }
        grouped[categoryTitle].push(entry)
        foundCategory = true
        break // Assign to the first matching category found
      }
    }

    // If no category directory matched, it's a root entry
    if (!foundCategory) {
      rootEntries.push(entry)
    }
  })

  // 3. Build the final result object, ordered by the sorted categories
  const finalResult: Record<string, CollectionEntry<CollectionKey>[]> = {}

  // Add root entries first, sorted by ID
  if (rootEntries.length > 0) {
    finalResult[""] = rootEntries.sort((a, b) => a.id.localeCompare(b.id))
  }

  // Add categorized entries in the order determined by sortedCategories
  sortedCategories.forEach((category) => {
    const categoryTitle = category.data.title || ""
    if (grouped[categoryTitle]) {
      // Sort entries within the category by ID
      finalResult[categoryTitle] = grouped[categoryTitle].sort((a, b) =>
        a.id.localeCompare(b.id)
      )
    }
    // Show categories even if they have no child pages (besides index.md)
    else if (categoryTitle) {
      finalResult[categoryTitle] = [] // Add empty category
    }
  })

  return finalResult
}
