"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight, MoveRight } from "lucide-react"

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
      .from(".event-title", { y: 20, opacity: 0, duration: 0.4 }, "-=0.3")
      .from(".event-detail", { y: 10, opacity: 0, stagger: 0.1, duration: 0.3 }, "-=0.2")
      // .from(".event-button", { x: 20, opacity: 0, duration: 0.4 }, "-=0.2")

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-[var(--muted)]">
      <div className="container mx-auto px-4 md:px-16 lg:px-20">
        {/* <h2 className="text-3xl md:text-4xl *lg:text-[44px] font-bold text-center mb-12 inline-block mx-auto">
          <span style={{ color: "var(--foreground)" }}>Arrive bientot</span>
        </h2> */}

        <div
          ref={cardRef}
          className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden *shadow-xl hover:shadow-xl transition-shadow duration-300"
          // style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Date */}
            <div 
              className="event-date flex flex-col items-center justify-center rounded-2xl m-6 py-2 px-8 *md:p-8"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              <Calendar className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium uppercase tracking-wider">Janvier</span>
              <span className="text-4xl font-bold mt-1">25</span>
              <span className="text-sm mt-2">2025</span>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-8">
              <h3 
                className="event-title text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                Atelier de programmation Python
              </h3>

              <div className="space-y-3">
                <div className="event-detail flex items-center gap-3">
                  <Clock className="w-5 h-5" style={{ color: "var(--primary)" }} />
                  <span style={{ color: "var(--muted-foreground)" }}>
                    14h00 - 16h00 (HNB)
                  </span>
                </div>

                <div className="event-detail flex items-center gap-3">
                  <User className="w-5 h-5" style={{ color: "var(--primary)" }} />
                  <span style={{ color: "var(--muted-foreground)" }}>
                    Dr. Jonas MUBISA
                  </span>
                </div>

                <p className="event-detail mt-4 text-gray-600" style={{ color: "var(--muted-foreground)" }}>
                  Apprenez les bases de Python et ses applications pratiques dans ce workshop interactif.
                  Parfait pour les débutants en programmation.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  className="event-button group rounded-full px-6 py-[22px] text-sm font-semibold uppercase transition-all"
                  size="lg"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)"
                  }}
                >
                  <span className="relative z-10">S'inscrire maintenant</span>
                  {/* <MoveRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /> */}
                </Button>

                <Button 
                  variant="outline" 
                  className="event-button rounded-full px-6 py-3 text-sm font-semibold uppercase"
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