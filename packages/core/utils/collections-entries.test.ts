// Test packages/astrolingo/utils/collections-entries.ts exported functions
import { describe, it, expect, vi, afterEach } from "vitest"
import { getCollectionTypeEntries } from "./collections-entries"
import { getCollection } from "astro:content"

vi.mock("astro:content", () => ({ getCollection: vi.fn() }))
vi.mock("virtual:astrolingo-user-config", () => {
  const userConfig = {
    archetypes: [
      { name: "Blog", path: "blog", collection: "blog", type: "blog-content" },
      { name: "Docs", path: "docs", collection: "docs", type: "docs-content" },
    ],
  }
  return { userConfig }
})

const blogEntries = [
  {
    id: "blog1",
    slug: "blog1",
    body: "",
    collection: "blog",
    data: { type: "blog-content", status: "published" },
    render: [],
  },
  {
    id: "blog2",
    slug: "blog2",
    body: "",
    collection: "blog",
    data: { type: "blog-content", status: "draft" },
    render: [],
  },
]

const docsEntries = [
  {
    id: "docs1",
    slug: "docs1",
    body: "",
    collection: "docs",
    data: { type: "docs-content", status: "published" },
    render: [],
  },
]

afterEach(() => {
  vi.clearAllMocks()
})

describe("getCollectionTypeEntries", () => {
  it("returns entries with matching type", async () => {
    vi.mocked(getCollection).mockImplementation(async (col) =>
      col === "blog" ? blogEntries : docsEntries
    )

    const result = await getCollectionTypeEntries("blog-content")

    expect(result).toEqual([
      { params: { slug: "blog/blog1" }, props: { entry: blogEntries[0] } },
      { params: { slug: "blog/blog2" }, props: { entry: blogEntries[1] } },
    ])
  })
})
