"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "../../sanity/lib/image"

gsap.registerPlugin(ScrollTrigger)

export default function UpcomingEvent({ event }: { event: any }) {
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
  }, [])

  const dateObj = new Date(event.date)
  const month = dateObj.toLocaleString("fr-FR", { month: "long" })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-[var(--muted)]">
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
              <span className="text-sm font-medium uppercase tracking-wider">{month}</span>
              <span className="text-4xl font-bold mt-1">{day}</span>
              <span className="text-sm mt-2">{year}</span>
            </div>

            {/* Image */}
            <div className="event-image relative w-full md:w-1/2 min-h-[400px]">
              {event.image && (
                <Image
                  src={urlFor(event.image).url()}
                  alt={event.title}
                  fill
                  className="object-cover md:mt-2"
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <h3
                className="event-title text-xl md:text-2xl font-bold mb-5 md:mb-6"
                style={{ color: "var(--foreground)" }}
              >
                {event.title}
              </h3>

              <div className="space-y-2 md:space-y-4">
                <div className="event-detail flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[var(--primary)]" />
                  <span className="text-[var(--muted-foreground)] text-base">{event.time}</span>
                </div>

                <div className="event-detail flex items-center gap-3">
                  <User className="w-5 h-5 text-[var(--primary)]" />
                  <span className="text-[var(--muted-foreground)] text-base">{event.speaker}</span>
                </div>
              </div>

              <div className="mt-5 md:mt-8 flex flex-col sm:flex-row gap-4">
                {event.registrationLink && (
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="rounded-full px-6 py-[22px] w-full md:w-auto text-base font-semibold border-[1.5px] transition-all"
                      style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                    >
                      S'inscrire maintenant
                    </Button>
                  </a>
                )}
                <Link href={`/events/${event.slug.current}`}>
                  <Button variant="outline" className="rounded-full w-full md:w-auto px-8 py-3 text-base font-semibold border-[1.5px] bg-transparent text-primary border-primary hover:bg-primary hover:text-white">
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
