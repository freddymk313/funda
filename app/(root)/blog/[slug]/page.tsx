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

// Génère les slugs statiquement
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "blog"]{ "slug": slug.current }`)
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch(query, { slug })

  if (!post) {
    return <div className="text-center py-20">Article introuvable.</div>
  }

  return <BlogDetailPage post={post} />
}