"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PlayCircle, Download, Video } from "lucide-react"
import ConferenceSwiper from "./ConferenceSwiper"

gsap.registerPlugin(ScrollTrigger)

export default function InspiringSection({ events }: { events: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    })

    tl.from(textRef.current, { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" })
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <div ref={textRef} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="block mb-2 text-[var(--foreground)]">Découvrez nos</span>
              <span className="relative inline-block uppercase text-[var(--primary)]">
                conférences & vidéos
              </span>
            </h2>
            <p className="text-base md:text-lg text-[var(--muted-foreground)]">
              Explorez des contenus inspirants pour enrichir vos connaissances.
            </p>

            <ul className="space-y-2 text-[var(--foreground)]">
              <li className="flex gap-2 items-center">
                <PlayCircle className="text-[var(--primary)] w-5 h-5" />
                Conférences interactives
              </li>
              <li className="flex gap-2 items-center">
                <Video className="text-[var(--primary)] w-5 h-5" />
                Vidéos exclusives & tutoriels
              </li>
              <li className="flex gap-2 items-center">
                <Download className="text-[var(--primary)] w-5 h-5" />
                Ressources téléchargeables
              </li>
            </ul>
          </div>

          {/* Swiper alimenté par Sanity */}
          <ConferenceSwiper events={events} />
        </div>
      </div>
    </section>
  )
}
