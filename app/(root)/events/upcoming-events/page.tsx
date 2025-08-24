"use client"

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Clock, MapPin, Users, ArrowRight, Search, Filter, BookOpen, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
  {
    id: 2,
    title: "Conférence sur l'IA Générative",
    description: "Explorez les dernières avancées en intelligence artificielle générative et leurs applications pratiques.",
    image: "/images/events/ai-conference.jpg",
    date: "28 Janvier 2025",
    time: "18:00 - 20:00",
    location: "Campus Principal",
    speaker: "Prof. Sarah TECH",
    capacity: "100 participants",
    category: "Conférence",
    level: "Intermediaire",
    registrationLink: "#"
  },
  {
    id: 3,
    title: "Hackathon Web Development",
    description: "24 heures de codage intensif pour développer des solutions web innovantes. Nourriture et boissons incluses.",
    image: "/images/events/hackathon.jpg",
    date: "2-3 Février 2025",
    time: "09:00 - 09:00",
    location: "Espace Innovation",
    speaker: "Équipe Funda",
    capacity: "30 équipes",
    category: "Hackathon",
    level: "Avancé",
    registrationLink: "#"
  },
  {
    id: 4,
    title: "Webinaire Cybersécurité",
    description: "Apprenez les bonnes pratiques pour protéger vos données et systèmes contre les cybermenaces.",
    image: "/images/events/cybersecurity.jpg",
    date: "5 Février 2025",
    time: "16:00 - 17:30",
    location: "En ligne (Microsoft Teams)",
    speaker: "Expert Security",
    capacity: "200 participants",
    category: "Webinaire",
    level: "Tous niveaux",
    registrationLink: "#"
  },
  {
    id: 5,
    title: "Meetup React.js",
    description: "Rencontrez d'autres développeurs React et partagez vos expériences sur les meilleures pratiques.",
    image: "/images/events/react-meetup.jpg",
    date: "8 Février 2025",
    time: "19:00 - 21:00",
    location: "Café Tech",
    speaker: "Communauté React",
    capacity: "40 participants",
    category: "Meetup",
    level: "Intermediaire",
    registrationLink: "#"
  },
  {
    id: 6,
    title: "Formation Docker & Kubernetes",
    description: "Maîtrisez la containerisation et l'orchestration de vos applications avec Docker et Kubernetes.",
    image: "/images/events/docker-training.jpg",
    date: "12 Février 2025",
    time: "10:00 - 17:00",
    location: "Lab Informatique",
    speaker: "DevOps Engineer",
    capacity: "25 participants",
    category: "Formation",
    level: "Avancé",
    registrationLink: "#"
  }
]

const eventCategories = [
  { name: "Tous", count: upcomingEvents.length },
  { name: "Workshop", count: 1 },
  { name: "Conférence", count: 1 },
  { name: "Hackathon", count: 1 },
  { name: "Webinaire", count: 1 },
  { name: "Meetup", count: 1 },
  { name: "Formation", count: 1 }
]

const eventLevels = ["Tous niveaux", "Débutant", "Intermediaire", "Avancé"]

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
    .from(sectionRef.current?.querySelector("p")!, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(".event-filters", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.3")
    .from(".event-card", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, "-=0.2")

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
      <section className="relative py-28 px-6 text-center bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements à Venir</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Découvrez nos prochains événements, conférences et ateliers pour développer vos compétences
          </p>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-white animate-float-1"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-white animate-float-2"></div>
        </div>
      </section>

      {/* Section principale */}
      <section ref={sectionRef} className="relative py-20 px-6 bg-[var(--muted)]">
        <div className="container mx-auto max-w-7xl">
          {/* En-tête et filtres */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Nos prochains événements
                </h2>
                <p style={{ color: "var(--muted-foreground)" }}>
                  {filteredEvents.length} événement{filteredEvents.length !== 1 ? 's' : ''} programmé{filteredEvents.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Barre de recherche */}
              <div className="event-filters w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: "var(--muted-foreground)" }} />
                  <input
                    type="text"
                    placeholder="Rechercher un événement..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full lg:w-80 pl-10 pr-4 py-3 rounded-lg border-2 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition-all"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="event-filters flex flex-wrap gap-4">
              {/* Filtre par catégorie */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-lg border-2 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
                >
                  {eventCategories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtre par niveau */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 rounded-lg border-2 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition-all"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
              >
                {eventLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grille d'événements */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-card group">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--primary-foreground)"
                        }}
                      >
                        {getCategoryIcon(event.category)}
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {event.level}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 mb-4 flex-1" style={{ color: "var(--muted-foreground)" }}>
                      {event.description}
                    </p>

                    {/* Métadonnées */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>{event.capacity}</span>
                      </div>
                      <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                        <span className="font-medium">Intervenant:</span> {event.speaker}
                      </div>
                    </div>

                    {/* Bouton d'inscription */}
                    <div className="mt-auto pt-4">
                      <Link
                        href={event.registrationLink}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:gap-3"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--primary-foreground)"
                        }}
                      >
                        <span>S'inscrire</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aucun résultat */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
                Aucun événement trouvé
              </h3>
              <p style={{ color: "var(--muted-foreground)" }}>
                Essayez de modifier vos critères de recherche ou consultez nos événements passés
              </p>
              <Link
                href="/events/past"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg font-medium transition-all hover:gap-3"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)"
                }}
              >
                <span>Voir les événements passés</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

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
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white"
                  />
                  <button className="bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all">
                    S'abonner
                  </button>
                </div>
                <p className="text-sm opacity-70">
                  Vous pouvez vous désabonner à tout moment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-20 -z-10"></div>
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