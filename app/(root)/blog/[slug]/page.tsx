import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { notFound } from "next/navigation"
import { PortableText } from '@portabletext/react'

// ✅ La requête GROQ pour récupérer un article par slug
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
    readTime
  }
`

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(query, { slug: params.slug })

  if (!post) {
    return notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      {/* Image principale */}
      <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
        <Image
          src={urlFor(post.image).width(1200).height(600).url()}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{post.title}</h1>
        </div>
      </div>

      {/* Meta infos */}
      <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {new Date(post.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {post.readTime}
        </div>
        <span className="bg-[var(--primary)] text-white px-3 py-1 rounded-full text-xs">
          {post.category}
        </span>
      </div>

      {/* Extrait */}
      <p className="text-lg text-gray-700 mb-8">{post.excerpt}</p>

      {/* Contenu */}
      <div className="prose prose-lg max-w-none">
        <PortableText value={post.content} />
      </div>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-[var(--secondary)] text-[var(--muted-foreground)] rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
