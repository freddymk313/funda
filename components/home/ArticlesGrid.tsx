"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Calendar, Clock, Code, Shield, User } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { urlFor } from "../../sanity/lib/image"

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// const articles = [
//   {
//     id: 1,
//     title: "Introduction au développement web moderne",
//     excerpt: "Découvrez les fondamentaux du développement web avec les dernières technologies et meilleures pratiques.",
//     image: "/img/6.jpeg",
//     category: "Développement",
//     author: "Dr. Sarah Tech",
//     date: "15 Jan 2025",
//     readTime: "5 min",
//     tags: ["HTML", "CSS", "JavaScript"]
//   },
//   {
//     id: 2,
//     title: "Python pour la data science : par où commencer ?",
//     excerpt: "Un guide complet pour débuter en data science avec Python et ses bibliothèques essentielles.",
//     image: "/img/8.jpeg",
//     category: "Data Science",
//     author: "Prof. Data Analyst",
//     date: "12 Jan 2025",
//     readTime: "8 min",
//     tags: ["Python", "Pandas", "NumPy"]
//   },
//   {
//     id: 3,
//     title: "Python pour la data science : par où commencer ?",
//     excerpt: "Un guide complet pour débuter en data science avec Python et ses bibliothèques essentielles.",
//     image: "/img/5.jpeg",
//     category: "Data Science",
//     author: "Prof. Data Analyst",
//     date: "12 Jan 2025",
//     readTime: "8 min",
//     tags: ["Python", "Pandas", "NumPy"]
//   },
// ]

export default function ArticlesGrid({ articles }: { articles: any }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    })

    tl.from(sectionRef.current?.querySelector("h2")!, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
      .from(sectionRef.current?.querySelector("p")!, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(cardsRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "back.out(1.2)"
      }, "-=0.3")

    // Animation au survol des cartes
    cardsRef.current.forEach(card => {
      gsap.to(card, {
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      })
    })

    return () => {
      tl.kill();
    };
  }, [])

  return (
    <section ref={sectionRef} className="relative py-12 md:py-24 *px-6 overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-[var(--muted)] -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        {/* En-tête */}
        <div className="text-center mb-8 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="block mb-2" style={{ color: "var(--foreground)" }}>Explorez nos</span>
            <span
              className="relative inline-block uppercase"
              style={{ color: "var(--primary)" }}
            >
              Événements & Articles
            </span>
          </h2>
          <p
            className="text-base md:text-lg"
            style={{ color: "var(--muted-foreground)" }}
          >
            Découvrez nos dernières publications et ressources pour développer vos compétences en informatique.
          </p>
        </div>

        {/* Grille d'articles */}
        {/* Grille d'articles */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {articles.slice(-3).map((article: any, index: any) => (
            <article key={index} className="blog-post group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={urlFor(article.image).width(600).height(400).url()}
                    alt={article.title}
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
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Contenu */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--primary)] transition-colors">
                    <Link href={`/blog/${article.id}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 mb-4 flex-1" style={{ color: "var(--muted-foreground)" }}>
                    {article.excerpt.length > 120
                      ? `${article.excerpt.slice(0, 120)}…`
                      : article.excerpt}
                  </p>

                  {/* Métadonnées */}
                  <div className="flex items-center justify-between gap-4 text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag: any, index: any) => (
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

                  {/* Lire la suite */}
                  <Link
                    href={`/blog/${article.slug.current}`}
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

        {/* Bouton "Voir plus" */}
        <div className="text-center mt-10 md:mt-16">
          <Button
            size={"lg"}
            // className="uppercase text-sm rounded-full"
            className="event-button group rounded-full px-6 py-[22.5px] font-semibold transition-all"

            // className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:gap-3"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)"
            }}
          >
            <span>Voir tous les articles</span>
            {/* <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /> */}
          </Button>
        </div>
      </div>
    </section>
  )
}