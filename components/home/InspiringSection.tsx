"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2, PlayCircle, Download, Video } from "lucide-react"
import Image from "next/image"
import ConferenceSwiper from "./ConferenceSwiper"

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
    // .from(listItemsRef.current, {
    //   y: 20,
    //   opacity: 0,
    //   stagger: 0.15,
    //   duration: 0.5,
    //   ease: "back.out"
    // }, "-=0.3")

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
    <section ref={sectionRef} className="relative py-12 md:py-24 *px-4 *md:px-16 *lg:px-20 overflow-hidden">
      <div className="container mx-auto *max-w-6xl px-4 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Contenu texte */}
          <div ref={textRef} className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block mb-2" style={{ color: "var(--foreground)" }}>Decovrez nos</span>
              <span 
                className="relative inline-block uppercase"
                style={{ color: "var(--primary)" }}
              >
                Conférences & vidéos
              </span>
              <span></span>
            </h2>

            <p className="text-base md:text-lg" style={{ color: "var(--muted-foreground)" }}>
              Explorez une variété de contenus inspirants pour enrichir vos connaissances et 
              développer vos compétences en informatique.
            </p>

            <ul className="space-y-2">
              {[
                { icon: <PlayCircle className="w-5 h-5 md:w-6 md:h-6" />, text: "Conférences interactives avec experts" },
                { icon: <Video className="w-5 h-5 md:w-6 md:h-6" />, text: "Vidéos exclusives et tutoriels" },
                { icon: <Download className="w-5 h-5 md:w-6 md:h-6" />, text: "Ressources téléchargeables" }
              ].map((item, index) => (
                <li 
                  key={index}
                  ref={el => { listItemsRef.current[index] = el as HTMLLIElement }}
                  className="flex flex-row items-center gap-2 py-1 md:py-2 rounded-xl transition-all"
                  style={{ color: "var(--foreground)" }}
                >
                  <span style={{ color: "var(--primary)" }}>{item.icon}</span>
                  <span className="flex-1">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contenu image */}
          <ConferenceSwiper />
        </div>
      </div>
    </section>
  )
}