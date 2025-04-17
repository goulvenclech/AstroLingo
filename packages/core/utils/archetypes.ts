/**
 * Contains utility functions for working with Archetypes.
 */
import { userConfig } from "virtual:astrolingo-user-config"
/**
 * For a given URL location, get the current Archetype.
 * @param location - the current URL location.
 */
export function getCurrentArchetype(location: URL): Archetype {
  const currentCollectionSegment = location.pathname.split("/")[1] // Get the first segment (collection name)
  const currentArchetype = userConfig.archetypes.find(
    (archetype) => archetype.collection === currentCollectionSegment
  )
  if (!currentArchetype) {
    throw new Error(
      `Astrolingo: No archetype found for the collection: ${currentCollectionSegment}`
    )
  }
  return currentArchetype
}
