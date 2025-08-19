"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2, PlayCircle, Download, Video } from "lucide-react"
import Image from "next/image"

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function InspiringSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const listItemsRef = useRef<HTMLLIElement[]>([])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    })

    tl.from(textRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(imageRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .from(listItemsRef.current, {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
      ease: "back.out"
    }, "-=0.3")

    // Animation de l'élément vidéo
    gsap.to(".video-play-button", {
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut"
    })

    return () => { tl.kill(); }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--accent)] opacity-10 blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[var(--primary)] opacity-10 blur-3xl -z-10"></div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div ref={textRef} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="block mb-2" style={{ color: "var(--foreground)" }}>Inspiring</span>
              <span 
                className="relative inline-block"
                style={{ color: "var(--primary)" }}
              >
                Conférences & vidéos
                <span 
                  className="absolute bottom-1 left-0 w-full h-1 rounded-full opacity-60"
                  style={{ backgroundColor: "var(--accent)" }}
                ></span>
              </span>
            </h2>

            <p className="text-lg" style={{ color: "var(--muted-foreground)" }}>
              Explorez une variété de contenus inspirants pour enrichir vos connaissances et 
              développer vos compétences en informatique.
            </p>

            <ul className="space-y-4">
              {[
                { icon: <PlayCircle className="w-6 h-6" />, text: "Conférences interactives avec experts" },
                { icon: <Video className="w-6 h-6" />, text: "Vidéos exclusives et tutoriels" },
                { icon: <Download className="w-6 h-6" />, text: "Ressources téléchargeables" }
              ].map((item, index) => (
                <li 
                  key={index}
                  ref={el => { listItemsRef.current[index] = el as HTMLLIElement }}
                  className="flex items-start gap-4 p-4 rounded-xl transition-all hover:bg-[var(--secondary)]"
                  style={{ color: "var(--foreground)" }}
                >
                  <span style={{ color: "var(--primary)" }}>{item.icon}</span>
                  <span className="flex-1">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contenu image */}
          <div ref={imageRef} className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            {/* Placeholder remplacé par une image réelle */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-20"></div>
            <Image
              src="/images/conference-section.jpg" // Remplacez par votre image
              alt="Conférence en informatique"
              fill
              className="object-cover"
              quality={90}
            />
            
            {/* Overlay et bouton play */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <button 
                className="video-play-button flex items-center justify-center w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:scale-110"
                aria-label="Lire la vidéo"
              >
                <PlayCircle 
                  className="w-10 h-10" 
                  style={{ color: "var(--primary)" }} 
                />
              </button>
            </div>

            {/* Badge */}
            <div 
              className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium shadow-md"
              style={{ 
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)"
              }}
            >
              Nouveauté
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}