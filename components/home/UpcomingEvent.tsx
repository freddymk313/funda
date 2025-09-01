"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export default function UpcomingEvent() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 70%",
      },
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
          className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row">
            {/* Date */}
            <div
              className="event-date flex flex-col items-center justify-center rounded-2xl m-6 py-3 px-8 shrink-0"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              <Calendar className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium uppercase tracking-wider">Janvier</span>
              <span className="text-4xl font-bold mt-1">25</span>
              <span className="text-sm mt-2">2025</span>
            </div>

            {/* Image */}
            <div className="event-image relative w-full md:w-1/2 min-h-[400px] md:min-h-[400px]">
              <Image
                src="/img/meet.jpg"
                alt="Atelier de programmation Python"
                fill
                className="object-cover md:mt-2"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <h3
                className="event-title text-2xl md:text-3xl font-bold mb-6"
                style={{ color: "var(--foreground)" }}
              >
                Le role du cloud computing dans la transformation numerique
              </h3>

              <div className="space-y-4">
                <div className="event-detail flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[var(--primary)]" />
                  <span className="text-[var(--muted-foreground)]">14h00 - 16h00</span>
                </div>

                <div className="event-detail flex items-center gap-3">
                  <User className="w-5 h-5 text-[var(--primary)]" />
                  <span className="text-[var(--muted-foreground)]">Dr. Jonas MUBISA</span>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/243991040032"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="rounded-full px-6 py-[22px] text-base font-semibold *border-[1.5px] transition-all"
                    size="lg"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    S'inscrire maintenant
                  </Button>
                </a>

                <Link href={"/events/upcoming"}>
                  <Button
                    variant="outline"
                        className="rounded-full px-8 py-3 text-base font-semibold *uppercase border-[1.5px] transition-all bg-transparent text-primary border-primary hover:bg-primary"
                    // className="rounded-full px-6 py-3 w-full md:w-auto text-base font-semibold transition-transform"
                    // style={{
                    //   borderColor: "var(--primary)",
                    //   color: "var(--primary)",
                    // }}
                  >
                    Voir les détails
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
