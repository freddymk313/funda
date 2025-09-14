"use client"

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from "../../sanity/lib/image"

gsap.registerPlugin(ScrollTrigger)

const BlogPageClient = ({ posts }: { posts: any[] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    })
    return () => { tl.kill() }
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="relative overflow-hidden">
      {/* Section Hero */}
      <section className="relative py-24 md:py-28 px-4 text-center text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/img/blog-3.jpg" 
            alt="Image du blog"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog Funda</h1>
          <p className="md:text-lg opacity-90 max-w-2xl mx-auto">
            Découvrez nos articles, tutoriels et actualités pour maîtriser l'informatique
          </p>
        </div>
      </section>

      {/* Section principale */}
      <section ref={sectionRef} className="relative py-12 md:py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 md:px-16 lg:px-20 max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  {selectedCategory ? `Articles : ${selectedCategory}` : 'Tous les articles'}
                </h2>
                <p style={{ color: "var(--muted-foreground)" }}>
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} trouvé{filteredPosts.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Grille d'articles */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.map((post: any) => (
                  <article key={post.slug.current} className="blog-post group">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={urlFor(post.image).width(600).height(400).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              backgroundColor: "var(--primary)",
                              color: "var(--primary-foreground)"
                            }}
                          >
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--primary)] transition-colors">
                          <Link href={`/blog/${post.slug.current}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 mb-4 flex-1" style={{ color: "var(--muted-foreground)" }}>
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between gap-4 text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="px-2.5 py-1 rounded-full text-xs"
                              style={{
                                backgroundColor: "var(--secondary)",
                                color: "var(--muted-foreground)"
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="flex items-center gap-2 text-[var(--primary)] font-medium hover:gap-3 transition-all"
                        >
                          <span>Lire l'article</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPageClient
