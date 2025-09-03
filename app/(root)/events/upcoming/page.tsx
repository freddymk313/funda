"use client"

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Clock, MapPin, Users, ArrowRight, Search, Filter, BookOpen, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Données d'exemple pour les événements
const upcomingEvents = [
  {
    id: 1,
    title: "Atelier d'initiation à Python",
    description: "Découvrez les bases de la programmation Python avec des exercices pratiques et interactifs. Parfait pour les débutants.",
    image: "/images/events/python-workshop.jpg",
    date: "25 Janvier 2025",
    time: "14:00 - 16:00",
    location: "En ligne (Zoom)",
    speaker: "Dr. Jonas MUBISA",
    capacity: "50 participants",
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

  return (
    <div className="relative overflow-hidden">
      {/* Section Hero */}
      <section className="relative py-28 px-6 text-center bg-gradient-to-br from-[var(--primary)] to-[var(--foreground)] text-white">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements à Venir</h1>
          <p className="md:text-lg opacity-90 max-w-2xl mx-auto">
            Découvrez nos prochains événements, conférences et ateliers pour développer vos compétences
          </p>
        </div>
      </section>

      {/* Section principale */}
      <section ref={sectionRef} className="py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 md:px-16 lg:px-20 max-w-7xl">
          {/* Grille d'événements */}
          <div className="bg-white rounded-xl">

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Image ou affiche */}
              <div className="relative w-full *h-80 rounded-xl overflow-hidden">
                <Image
                  src="/img/meet.jpg"
                  alt={filteredEvents[0].title}
                  // fill
                  width={1280}
                  height={720}
                  className="object-cover"
                />
              </div>

              {/* Infos principales */}
              <div>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                  {filteredEvents[0].title}
                </h2>
                <p className="text-lg text-[var(--muted-foreground)] mb-6">
                  {filteredEvents[0].description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[var(--primary)]" />
                    <span>{filteredEvents[0].date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[var(--primary)]" />
                    <span>{filteredEvents[0].time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[var(--primary)]" />
                    <span>{filteredEvents[0].location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[var(--primary)]" />
                    <span>Intervenant : {filteredEvents[0].speaker}</span>
                  </div>
                </div>

                {/* Bouton d'inscription */}
                <Link
                  href={filteredEvents[0].registrationLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-2.5 w-full  rounded-full font-medium transition-all *hover:gap-3"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)"
                  }}
                >
                  <span className='text-center'>Rejoindre l’événement</span>
                  {/* <ArrowRight className="w-4 h-4" /> */}
                </Link>
              </div>
            </div>
          </div>


          {/* Newsletter */}
          <div className="mt-20 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Ne manquez aucun événement</h3>
                <p className="opacity-90 mb-6">
                  Inscrivez-vous à notre newsletter pour recevoir les annonces de nos prochains événements
                </p>
              </div>
              <div className="space-y-4">
                <div className="relative w-full mt-8">
                  <Input
                    type="email"
                    placeholder="Votre adresse email"
                    className="w-full py-[22px] pl-4 pr-28 rounded-full bg-white/20 border border-primary/30 placeholder:text-white/70 text-white focus:border-[var(--primary)]"
                    style={{ borderColor: "var(--border)" }}
                  />
                  <Button
                    size="lg"
                    className="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-white text-[var(--primary)] px-5 py-2 font-medium hover:bg-gray-100 transition-all"
                    aria-label="S'abonner à la newsletter"
                  >
                    <span className="*uppercase text-sm font-semibold">S'abonner</span>
                  </Button>
                </div>

                <p className="text-sm opacity-70 text-center">
                  Vous pouvez vous désabonner à tout moment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-20 -z-10"></div> */}
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