"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Code, Shield } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const articles = [
  {
    title: "Introduction au développement web",
    desc: "Apprenez les bases du HTML, CSS et JavaScript pour commencer votre parcours de développeur web.",
    img: "/images/web-dev.jpg",
    icon: <Code className="w-5 h-5" />,
    category: "Développement"
  },
  {
    title: "Découverte de Python",
    desc: "Une introduction pratique au langage le plus populaire pour la data science et l'automatisation.",
    img: "/images/python.jpg",
    icon: <BookOpen className="w-5 h-5" />,
    category: "Programmation"
  },
  {
    title: "Cybersécurité pour débutants",
    desc: "Comprenez les bonnes pratiques essentielles pour protéger vos données et systèmes contre les menaces.",
    img: "/images/security.jpg",
    icon: <Shield className="w-5 h-5" />,
    category: "Sécurité"
  },
]

export default function ArticlesGrid() {
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
    <section ref={sectionRef} className="relative py-24 *px-6 overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-[var(--muted)] -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        {/* En-tête */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
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
            className="text-lg"
            style={{ color: "var(--muted-foreground)" }}
          >
            Découvrez nos dernières publications et ressources pour développer vos compétences en informatique.
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el as HTMLDivElement }}
              className="group relative h-full"
            >
              <Card className="h-full transition-all duration-300 *group-hover:shadow-xl group-hover:-translate-y-1 border-none overflow-hidden">
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  {/* Badge de catégorie */}
                  {/* <div 
                    className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)"
                    }}
                  >
                    {article.icon}
                    <span>{article.category}</span>
                  </div> */}
                </div>

                {/* Contenu */}
                <CardHeader className="*pb-3">
                  <CardTitle 
                    className="text-xl"
                    style={{ color: "var(--foreground)" }}
                  >
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <p 
                    className="mb-6 text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {article.desc}
                  </p>
                  <button 
                    className="flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                    style={{ color: "var(--primary)" }}
                  >
                    <span className="uppercase">Lire l'article</span>
                    {/* <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /> */}
                  </button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bouton "Voir plus" */}
        <div className="text-center mt-16">
          <Button 
          size={"lg"}
          // className="uppercase text-sm rounded-full"
                  className="event-button group rounded-full px-6 py-[22px] text-sm font-semibold uppercase transition-all"

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