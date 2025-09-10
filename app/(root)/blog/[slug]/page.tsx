// app/blog/[slug]/page.tsx
import BlogDetailPage from "@/components/blog/BlogDetailPage"
import { client } from "@/sanity/lib/client"

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

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await client.fetch(query, { slug: params.slug })

  if (!post) {
    return <div className="text-center py-20">Article introuvable.</div>
  }

  return <BlogDetailPage post={post} />
}
