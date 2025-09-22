"use client"

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Clock, MapPin, Users, ArrowRight, Search, Filter, BookOpen, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { client } from "../../../../sanity/lib/client"
import { urlFor } from "../../../../sanity/lib/image"
import Loading from "@/components/Loading";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Données d'exemple pour les événements
const upcomingEvents = [
  {
    id: 1,
    title: "Le role du cloud computing dans la transformation numerique",
    description: "Découvrez les bases de la programmation Python avec des exercices pratiques et interactifs. Parfait pour les débutants.",
    image: "/images/events/python-workshop.jpg",
    date: "25 Janvier 2025",
    time: "14:00 - 16:00",
    location: "En ligne (Google Meet)",
    speaker: "Dr. Jonas MUBISA",
    // capacity: "50 participants",
    category: "Workshop",
    level: "Débutant",
    registrationLink: "#"
  },
]

const UpComingEventPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedLevel, setSelectedLevel] = useState('Tous niveaux')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    })

    tl.from(sectionRef.current?.querySelector("h1")!, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    // .from(sectionRef.current?.querySelector("p")!, {
    //   y: 30,
    //   opacity: 0,
    //   duration: 0.6,
    //   ease: "power3.out"
    // }, "-=0.4")
    // .from(".event-filters", {
    //   y: 20,
    //   opacity: 0,
    //   duration: 0.5,
    //   ease: "power3.out"
    // }, "-=0.3")
    // .from(".event-card", {
    //   y: 40,
    //   opacity: 0,
    //   stagger: 0.1,
    //   duration: 0.6,
    //   ease: "back.out(1.2)"
    // }, "-=0.2")

    return () => {
      tl.kill()
    }
  }, [])

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Tous' || event.category === selectedCategory
    const matchesLevel = selectedLevel === 'Tous niveaux' || event.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Workshop': return <BookOpen className="w-4 h-4" />
      case 'Webinaire': return <Video className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const [event, setEvent] = useState<any | null>(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "event"] | order(date asc)[0]{
          _id,
          title,
          date,
          time,
          speaker,
          image,
          registrationLink,
          slug
        }`
      )
      .then(setEvent)
  }, [])

  if (!event) {
    return <div className="min-h-[80vh] flex items-center justify-center">
    <Loading size={25} color="fill-primary mr-2" />
    <span>Chargement</span>
    </div>
  }

  const dateObj = new Date(event.date)
  const formattedDate = dateObj.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })


  return (
    <div className="relative overflow-hidden">
      {/* Section Hero */}
      {/* Section Hero */}
      <section className="relative py-24 md:py-28 px-4 text-center text-white">
        {/* Image de fond */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/img/past-2.webp" // 🔗 ton image
            alt="Événements à venir"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements à Venir</h1>
          <p className="md:text-lg opacity-90 max-w-2xl mx-auto">
            Découvrez nos prochains événements, conférences et ateliers pour développer vos compétences
          </p>
        </div>
      </section>

      {/* Section principale */}
      <section className="py-12 md:py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 md:px-16 lg:px-20 *max-w-5xl">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Image */}
              <div className="relative w-full *h-full rounded-xl overflow-hidden">
                {event.image && (
                  <Image
                    src={urlFor(event.image).url()}
                    alt={event.title}
                    // fill
                    width={1280} 
                    height={720}
                    className="object-cover"
                  />
                )}
              </div>

              {/* Infos */}
              <div>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                  {event.title}
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[var(--primary)]" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[var(--primary)]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[var(--primary)]" />
                    <span>Intervenant : {event.speaker}</span>
                  </div>
                </div>

                {event.registrationLink && (
                  <Link href={event.registrationLink} target="_blank">
                    <Button
                      className="rounded-full px-6 py-[22px] text-base w-full font-semibold border-[1.5px] transition-all"
                      size="lg"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--primary-foreground)",
                      }}
                    >
                      Rejoindre l’événement
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles d'animation */}
      <style jsx global>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 15px) rotate(3deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, 15px) rotate(-3deg); }
        }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

export default UpComingEventPage