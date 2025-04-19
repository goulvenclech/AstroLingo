/**
 * Contains utility functions to generate navigations.
 */
import type { CollectionEntry, CollectionKey } from "astro:content"
import Path from "path"
import { getCollectionEntries } from "./collections-entries"

interface ProcessedNavigationData {
  sortedCategories: CollectionEntry<CollectionKey>[]
  sortedRootEntries: CollectionEntry<CollectionKey>[]
  sortedEntriesByCategoryDir: Record<string, CollectionEntry<CollectionKey>[]>
}

/**
 * Processes a list of collection entries to sort and group them for navigation purposes.
 * Identifies categories, root entries, sorts them, and groups entries by category directory.
 */
function processNavigationEntries(
  entries: Array<CollectionEntry<CollectionKey>>
): ProcessedNavigationData {
  // 1. Identify and sort category index files by their ID (path)
  // This ensures categories like '1-getting-started' come before '2-archetypes'
  const sortedCategories = entries
    .filter((entry) => Path.parse(entry.id).name === "index")
    .sort((a, b) => a.id.localeCompare(b.id))

  const categoryMap = new Map(
    sortedCategories.map((cat) => [Path.parse(cat.id).dir, cat])
  )

  // 2. Separate root entries and categorized entries (excluding index files)
  const rootEntries: CollectionEntry<CollectionKey>[] = []
  // Use category directory as key for easier processing
  const entriesByCategoryDir: Record<string, CollectionEntry<CollectionKey>[]> =
    {}

  entries.forEach((entry) => {
    // Skip index files themselves
    if (Path.parse(entry.id).name === "index") {
      return
    }

    const entryDir = Path.parse(entry.id).dir
    let foundCategory = false
    // Iterate through sorted categories to find the parent directory
    for (const [catDir] of categoryMap.entries()) {
      // Check if the entry's directory is the category directory or a subdirectory
      if (entryDir === catDir || entryDir.startsWith(catDir + Path.sep)) {
        if (!entriesByCategoryDir[catDir]) {
          entriesByCategoryDir[catDir] = []
        }
        entriesByCategoryDir[catDir].push(entry)
        foundCategory = true
        break // Assign to the first matching category found
      }
    }

    // If no category directory matched, it's a root entry
    if (!foundCategory) {
      rootEntries.push(entry)
    }
  })

  // 3. Sort root entries and entries within each category
  const sortedRootEntries = rootEntries.sort((a, b) => a.id.localeCompare(b.id))
  const sortedEntriesByCategoryDir: Record<
    string,
    CollectionEntry<CollectionKey>[]
  > = {}
  for (const catDir in entriesByCategoryDir) {
    sortedEntriesByCategoryDir[catDir] = entriesByCategoryDir[catDir].sort(
      (a, b) => a.id.localeCompare(b.id)
    )
  }

  return {
    sortedCategories,
    sortedRootEntries,
    sortedEntriesByCategoryDir,
  }
}

/**
 * Generate a collection navigation structure for sidebars or index pages.
 * Groups entries by their category title and sorts categories based on their folder name prefix.
 * Entries within each category are sorted alphabetically by their ID.
 * @param entries - Collection entries to group.
 * @returns An object where keys are category titles (or "" for root) and values are arrays of sorted entries.
 */
export const generateCollectionNavigation = (
  entries: Array<CollectionEntry<CollectionKey>>
): Record<string, CollectionEntry<CollectionKey>[]> => {
  const { sortedCategories, sortedRootEntries, sortedEntriesByCategoryDir } =
    processNavigationEntries(entries)

  const finalResult: Record<string, CollectionEntry<CollectionKey>[]> = {}

  // Add root entries first, using an empty string as the key
  if (sortedRootEntries.length > 0) {
    finalResult[""] = sortedRootEntries
  }

  // Add categorized entries in the order determined by sortedCategories
  sortedCategories.forEach((category) => {
    const categoryTitle =
      category.data.title || Path.basename(Path.parse(category.id).dir) // Fallback title
    const catDir = Path.parse(category.id).dir
    if (sortedEntriesByCategoryDir[catDir]) {
      finalResult[categoryTitle] = sortedEntriesByCategoryDir[catDir]
    }
    // Show categories even if they have no child pages (besides index.md)
    else if (categoryTitle) {
      finalResult[categoryTitle] = []
    }
  })

  return finalResult
}

/**
 * Flattens the structured navigation into a single sorted list of entries,
 * respecting category order and intra-category sorting.
 * Excludes category index files. Used for prev/next navigation.
 * @param collection - The name of the collection.
 * @returns A flat array of collection entries sorted for navigation.
 */
async function getFlatSortedEntries(
  collection: string
): Promise<Array<CollectionEntry<CollectionKey>>> {
  const allEntries = await getCollectionEntries(collection) // Fetch all published entries
  const { sortedCategories, sortedRootEntries, sortedEntriesByCategoryDir } =
    processNavigationEntries(allEntries)

  const flatSortedList: CollectionEntry<CollectionKey>[] = []

  // Add root entries first
  flatSortedList.push(...sortedRootEntries)

  // Add categorized entries, ordered by sortedCategories
  sortedCategories.forEach((category) => {
    const catDir = Path.parse(category.id).dir
    if (sortedEntriesByCategoryDir[catDir]) {
      flatSortedList.push(...sortedEntriesByCategoryDir[catDir])
    }
  })

  return flatSortedList
}

/**
 * Finds the previous and next entries in a collection based on the flattened navigation order.
 * @param collection - The name of the collection.
 * @param currentSlug - The slug of the current entry.
 * @returns An object containing the previous and next entries (full CollectionEntry), or null if they don't exist.
 */
export async function getPrevNextNavigation(
  collection: string,
  currentSlug: string
): Promise<{
  prev: CollectionEntry<CollectionKey> | null
  next: CollectionEntry<CollectionKey> | null
}> {
  const flatSortedList = await getFlatSortedEntries(collection)
  const currentIndex = flatSortedList.findIndex(
    (entry) => entry.slug === currentSlug
  )

  if (currentIndex === -1) {
    // This can happen if the slug corresponds to a category index file (which is filtered out)
    // or if the slug doesn't exist in the published entries.
    console.warn(
      `[Astrolingo] getPrevNextNavigation: Entry with slug "${currentSlug}" not found in the sorted list for collection "${collection}". Is it a category index page or unpublished?`
    )
    return { prev: null, next: null }
  }

  const prev = currentIndex > 0 ? flatSortedList[currentIndex - 1] : null
  const next =
    currentIndex < flatSortedList.length - 1
      ? flatSortedList[currentIndex + 1]
      : null

  return { prev, next }
}
