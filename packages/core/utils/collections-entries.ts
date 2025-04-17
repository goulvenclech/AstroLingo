/**
 * COLLECTIONS ENTRIES UTILS
 * This module contains functions to generate or get collections entries.
 */
import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content"
import { userConfig } from "virtual:astrolingo-user-config"

/**
 * For a given collection type, get all the collection entries.
 * In production, only published entries are returned.
 * @param type - An Astrolingo collection type, see "collections-schemas.ts"
 */
export async function getCollectionTypeEntries(type: string) {
  // Get the collection archetypes created by the user
  const { archetypes } = userConfig
  // Get every Astrolingo collections from the archetypes
  const allAstrolingoCollectionsEntries = await Promise.all(
    archetypes.map(async (archetype) => {
      const collection = await getCollection(archetype.collection)
      return collection
    })
  )
  // Filter the collections for a given type
  const allBlogContentEntries = allAstrolingoCollectionsEntries
    .flat()
    .filter((entry) => entry.data.type === type)
    // In production, only return published entries
    .filter((entry) => {
      if (import.meta.env.PROD) {
        return entry.data.status === "published"
      }
      return true
    })
  // Finnaly, return the params and props for each entry
  return allBlogContentEntries.map((entry) => ({
    params: { slug: entry.collection + "/" + entry.slug },
    props: { entry },
  }))
}

/**
 * For a given collection, get all the published collection entries.
 * @param collection - The collection to get the entries from
 */
export async function getCollectionEntries(
  collection: string
): Promise<Array<CollectionEntry<CollectionKey>>> {
  // Get the collection archetypes created by the user
  const { archetypes } = userConfig
  // Get every Astrolingo collections from the archetypes
  const allAstrolingoCollectionsEntries = await Promise.all(
    archetypes.map(async (archetype) => {
      const collection = await getCollection(archetype.collection)
      return collection
    })
  )
  // Filter the published entries for a given collection
  const allBlogContentEntries = allAstrolingoCollectionsEntries
    .flat()
    .filter((entry) => entry.collection === collection)
    .filter((entry) => entry.data.status === "published")

  return allBlogContentEntries
}
