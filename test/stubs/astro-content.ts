export interface CollectionEntry<T> {
  id: string
  slug: string
  body: string
  collection: string
  data: Record<string, unknown>
  render: unknown
}
export type CollectionKey = string
export async function getCollection(_collection: string): Promise<Array<CollectionEntry<CollectionKey>>> {
  return []
}
