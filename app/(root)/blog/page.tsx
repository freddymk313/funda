import { client } from "@/sanity/lib/client"
import BlogPageClient from "@/components/blog/BlogPageClient"

const query = `*[_type == "blog"] | order(date desc) {
  _id,
  title,
  slug,
  excerpt,
  content,
  image,
  category,
  tags,
  author,
  date,
  readTime
}`

export default async function BlogPage() {
  const posts = await client.fetch(query, {}, { cache: "no-store"})
  return <BlogPageClient posts={posts} />
}
