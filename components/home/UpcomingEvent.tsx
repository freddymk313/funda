"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, MapPin } from "lucide-react"
import Image from "next/image"

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function UpcomingEvent() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animation de la carte
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })

    // Animation des éléments internes
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 70%"
      }
    })

    tl.from(".event-date", { scale: 0.8, opacity: 0, duration: 0.6 })
      .from(".event-image", { scale: 1.1, opacity: 0, duration: 0.7 }, "-=0.3")
      .from(".event-title", { y: 20, opacity: 0, duration: 0.4 }, "-=0.3")
      .from(".event-detail", { y: 10, opacity: 0, stagger: 0.1, duration: 0.3 }, "-=0.2")

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-[var(--muted)]">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        <div
          ref={cardRef}
          className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row">
            {/* Date */}
            <div
              className="event-date flex flex-col items-center justify-center rounded-2xl m-6 py-2 px-8"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              <Calendar className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium uppercase tracking-wider">Janvier</span>
              <span className="text-4xl font-bold mt-1">25</span>
              <span className="text-sm mt-2">2025</span>
            </div>

            {/* Image d'espace */}
            <div className="event-image relative w-full *md:w-1/3 h-96 *md:h-auto overflow-hidden">
              <Image
                src="/img/meet.jpg" // Remplacez par votre image d'espace
                alt="Atelier de programmation Python"
                fill
                className="object-cover"
              />
              {/* Overlay coloré */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50 mix-blend-multiply"></div> */}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-8">
              <h3
                className="event-title text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                Atelier de programmation Python
              </h3>

              <div className="*space-y-3 flex items-center justify-between">
                <div className="event-detail flex items-center gap-3">
                  <Clock className="w-5 h-5" style={{ color: "var(--primary)" }} />
                  <span style={{ color: "var(--muted-foreground)" }}>
                    14h00 - 16h00
                  </span>
                </div>

                <div className="event-detail flex items-center gap-3">
                  <User className="w-5 h-5" style={{ color: "var(--primary)" }} />
                  <span style={{ color: "var(--muted-foreground)" }}>
                    Dr. Jonas MUBISA
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  className="event-button group rounded-full px-6 py-[22px] text-sm font-semibold uppercase transition-all *hover:scale-105"
                  size="lg"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)"
                  }}
                >
                  <span className="relative z-10">S'inscrire maintenant</span>
                </Button>

                <Button
                  variant="outline"
                  className="event-button rounded-full px-6 py-3 w-full md:w-fit text-sm font-semibold uppercase *hover:scale-105 transition-transform"
                  style={{
                    borderColor: "var(--primary)",
                    color: "var(--primary)"
                  }}
                >
                  Voir les détails
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}