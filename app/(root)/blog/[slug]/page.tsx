import BlogDetailPage from "@/components/blog/BlogDetailPage"
import { client } from "@/sanity/lib/client"
// import type { PageProps } from 'next'

interface PageProps {
  params?: Record<string, string>
  // Add other props as needed
}

const query = `
  *[_type == "blog" && slug.current == $slug][0]{
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
    readTime,
    "relatedPosts": *[_type == "blog" && slug.current != $slug][0..2]{
      title,
      slug,
      excerpt,
      image,
      readTime
    }
  }
`

export default async function Page({
  params,
}: PageProps) {
  const post = await client.fetch(query, { slug: params?.slug ?? "" })

  if (!post) {
    return <div className="text-center py-20">Article introuvable.</div>
  }

  return <BlogDetailPage post={post} />
}
