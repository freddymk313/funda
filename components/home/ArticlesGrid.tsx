"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const articles = [
  {
    title: "Introduction au développement web",
    desc: "Apprenez les bases du HTML, CSS et JavaScript pour commencer votre parcours.",
    img: "/placeholder.png",
  },
  {
    title: "Découverte de Python",
    desc: "Une introduction pratique au langage le plus populaire pour la data science.",
    img: "/placeholder.png",
  },
  {
    title: "Cybersécurité pour débutants",
    desc: "Comprenez les bonnes pratiques pour protéger vos données et systèmes.",
    img: "/placeholder.png",
  },
]

export default function ArticlesGrid() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.from(ref.current.querySelectorAll(".card-item"), {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })
    }
  }, [])

  return (
    <section ref={ref} className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-3xl font-heading font-bold mb-4">
          Explorez nos événements & articles récents
        </h2>
        <p className="text-gray-600">
          Découvrez nos dernières publications pour enrichir vos compétences.
        </p>
      </div>

      <div className="container mx-auto grid md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Card key={index} className="card-item overflow-hidden">
            <div className="relative w-full h-40">
              <Image
                src={article.img}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">{article.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
