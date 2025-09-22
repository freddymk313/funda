"use client"

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, MessageCircle, Bookmark, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from "../../sanity/lib/image"
import { PortableText } from '@portabletext/react'

// Enregistrer les plugins GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const BlogDetailPage = ({ post }: { post: any }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })

    tl.fromTo(".blog-content > *", {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    })

    // Animation de l'image principale
    gsap.fromTo(".featured-image", {
      scale: 1.1,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".featured-image",
        start: "top bottom"
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Erreur de partage:', error)
      }
    } else {
      setShowShareOptions(!showShareOptions)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowShareOptions(false)
    // Vous pouvez ajouter un toast de confirmation ici
  }

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Navigation */}
      {/* <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="container mx-auto px-4 md:px-16 lg:px-20 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Retour au blog</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Partager"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'text-yellow-500 bg-yellow-500/10' 
                    : 'hover:bg-accent'
                }`}
                aria-label="Sauvegarder"
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Article */}
      <article className="pb-8 md:pb-12">
        {/* En-tête de l'article */}
        <div className="container mx-auto px-4 md:px-16 lg:px-20 *max-w-4xl">
          <div className="py-8 md:py-12">
            {/* Catégorie */}
            {/* <div className="mb-6">
              <span
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)"
                }}
              >
                {post.category}
              </span>
            </div> */}

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-foreground">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Métadonnées */}
            <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-muted-foreground mb-8">
              {/* <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div> */}
                
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              
              
              {/* <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{post.views || '1.2k'} vues</span>
              </div> */}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium *border *border-border/50 *bg-background/50"
                  // style={{ color: "var(--muted-foreground)" }}
                  style={{
                          backgroundColor: "var(--secondary)",
                          color: "var(--muted-foreground)"
                        }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Image principale */}
        <div className="w-full mb-8 md:mb-12">
          <div className="featured-image relative w-full h-64 md:h-96 lg:h-[500px]">
            <Image
              src={urlFor(post.image).width(1200).height(600).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>

        {/* Contenu de l'article */}
        <div ref={contentRef} className="container mx-auto px-4 md:px-16 lg:px-20 *max-w-3xl">
          <div className="blog-content prose prose-lg md:prose-xl max-w-none">
            <PortableText value={post.content} />
          </div>

          {/* Actions de l'article */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-8 *border-t *border-border/40">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-2 md:py-2.5 border border-primary rounded-full text-primary hover:text-white hover:bg-primary transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Partager</span>
            </button>
          </div>

          {/* Options de partage */}
          {showShareOptions && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-background rounded-2xl p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Partager cet article</h3>
                <div className="space-y-3">
                  <button
                    onClick={copyToClipboard}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    Copier le lien
                  </button>
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    Partager sur Twitter
                  </button>
                  <button
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    Partager sur LinkedIn
                  </button>
                </div>
                <button
                  onClick={() => setShowShareOptions(false)}
                  className="w-full mt-4 p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Section articles similaires */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-8 md:py-10 bg-muted/30">
          <div className="container mx-auto px-4 *md:px-16 *lg:px-20 max-w-6xl">
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-foreground">
              Articles récent
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {post.relatedPosts.slice(0, 3).map((relatedPost: any) => (
                <Link
                  key={relatedPost.slug.current}
                  href={`/blog/${relatedPost.slug.current}`}
                  className="group"
                >
                  <div className="bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(relatedPost.image).width(400).height(250).url()}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default BlogDetailPage