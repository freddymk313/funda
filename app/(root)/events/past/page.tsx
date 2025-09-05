"use client"

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Clock, MapPin, Users, Play, Facebook, Youtube, Download, Filter, Search, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Données d'exemple pour les événements passés
const pastEvents = [
  {
    id: 1,
    title: "Introduction à l'Intelligence Artificielle",
    description: "Découvrez les concepts fondamentaux de l'IA et ses applications pratiques dans le monde réel.",
    image: "/img/8.jpg",
    date: "15 Décembre 2024",
    time: "14:00 - 16:00",
    location: "En ligne",
    speaker: "Dr. Maria AI",
    attendees: "85 participants",
    category: "Webinaire",
    replayUrl: "https://facebook.com/watch/?v=123456789",
    platform: "facebook",
    slidesUrl: "/slides/ia-intro.pdf",
    resources: ["Slides", "Code source", "Documentation"]
  },
  {
    id: 2,
    title: "Hackathon Innovation 2024",
    description: "24 heures de codage intensif pour développer des solutions innovantes aux défis technologiques.",
    image: "/img/6.jpg",
    date: "10-11 Novembre 2024",
    time: "24 heures",
    location: "Espace Innovation",
    speaker: "Équipe Funda",
    attendees: "15 équipes",
    category: "Hackathon",
    replayUrl: "https://youtu.be/v-KZ3cEW7Bo?si=0pdhjeNP_OVM0Zir",
    platform: "youtube",
    slidesUrl: null,
    resources: ["Photos", "Projets", "Résultats"]
  },
  {
    id: 3,
    title: "Atelier Cloud Computing",
    description: "Apprenez à déployer et manager vos applications dans le cloud avec AWS et Azure.",
    image: "/img/8.jpg",
    date: "5 Novembre 2024",
    time: "10:00 - 17:00",
    location: "Lab Cloud",
    speaker: "Expert Cloud",
    attendees: "30 participants",
    category: "Workshop",
    replayUrl: "https://facebook.com/watch/?v=987654321",
    platform: "facebook",
    slidesUrl: "/slides/cloud-workshop.pdf",
    resources: ["Slides", "Guide pratique", "Tutoriels"]
  },
  {
    id: 4,
    title: "Conférence Blockchain",
    description: "Explorez les technologies blockchain et leurs applications au-delà des cryptomonnaies.",
    image: "/img/6.jpg",
    date: "28 Octobre 2024",
    time: "18:00 - 20:00",
    location: "Amphithéâtre Principal",
    speaker: "Blockchain Specialist",
    attendees: "120 participants",
    category: "Conférence",
    replayUrl: "https://youtu.be/v-KZ3cEW7Bo?si=0pdhjeNP_OVM0Zir",
    platform: "youtube",
    slidesUrl: "/slides/blockchain-conf.pdf",
    resources: ["Slides", "Whitepaper", "Liens utiles"]
  },
  {
    id: 5,
    title: "Meetup DevOps",
    description: "Échangez avec la communauté DevOps sur les meilleures pratiques et outils modernes.",
    image: "/img/8.jpg",
    date: "20 Octobre 2024",
    time: "19:00 - 21:00",
    location: "Café Tech",
    speaker: "Communauté DevOps",
    attendees: "45 participants",
    category: "Meetup",
    replayUrl: "https://facebook.com/watch/?v=555555555",
    platform: "facebook",
    slidesUrl: null,
    resources: ["Notes", "Outils", "Communauté"]
  },
  {
    id: 6,
    title: "Formation UX/UI Design",
    description: "Maîtrisez les principes du design d'expérience utilisateur et d'interface moderne.",
    image: "/img/6.jpg",
    date: "12 Octobre 2024",
    time: "09:00 - 17:00",
    location: "Studio Design",
    speaker: "Senior Designer",
    attendees: "25 participants",
    category: "Formation",
    replayUrl: "https://youtu.be/v-KZ3cEW7Bo?si=0pdhjeNP_OVM0Zir",
    platform: "youtube",
    slidesUrl: "/slides/ux-training.pdf",
    resources: ["Slides", "Maquettes", "Resources design"]
  }
]

const eventCategories = [
  { name: "Tous", count: pastEvents.length },
  { name: "Webinaire", count: 1 },
  { name: "Hackathon", count: 1 },
  { name: "Workshop", count: 1 },
  { name: "Conférence", count: 1 },
  { name: "Meetup", count: 1 },
  { name: "Formation", count: 1 }
]

const platforms = ["Toutes", "Facebook", "YouTube"]

const PastEventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedPlatform, setSelectedPlatform] = useState('Toutes')
  const sectionRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top 70%",
  //       toggleActions: "play none none none"
  //     }
  //   })

  //   tl.from(sectionRef.current?.querySelector("h1")!, {
  //     y: 50,
  //     opacity: 0,
  //     duration: 0.8,
  //     ease: "power3.out"
  //   })
  //   .from(sectionRef.current?.querySelector("p")!, {
  //     y: 30,
  //     opacity: 0,
  //     duration: 0.6,
  //     ease: "power3.out"
  //   }, "-=0.4")
  //   .from(".event-filters", {
  //     y: 20,
  //     opacity: 0,
  //     duration: 0.5,
  //     ease: "power3.out"
  //   }, "-=0.3")
  //   .from(".event-card", {
  //     y: 40,
  //     opacity: 0,
  //     stagger: 0.1,
  //     duration: 0.6,
  //     ease: "back.out(1.2)"
  //   }, "-=0.2")

  //   return () => tl.kill()
  // }, [])

  const filteredEvents = pastEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Tous' || event.category === selectedCategory
    const matchesPlatform = selectedPlatform === 'Toutes' ||
      (selectedPlatform === 'Facebook' && event.platform === 'facebook') ||
      (selectedPlatform === 'YouTube' && event.platform === 'youtube')

    return matchesSearch && matchesCategory && matchesPlatform
  })

  const getPlatformIcon = (platform: string) => {
    return platform === 'facebook' ? <Facebook className="w-4 h-4" /> : <Youtube className="w-4 h-4" />
  }

  const getPlatformName = (platform: string) => {
    return platform === 'facebook' ? 'Facebook' : 'YouTube'
  }

  return (
    <div className="relative overflow-hidden">
      {/* Section Hero */}
      <section className="relative py-28 px-6 text-center text-white">
        {/* Image de fond */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/img/past-1.png" // 🔗 ajoute ton image ici
            alt="Événements passés"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto px-4 md:px-16 lg:px-20 max-w-4xl relative z-10">
          <Link
            href="/events/upcoming"
            className="inline-flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux événements à venir
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements Passés</h1>
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">
            Revivez nos événements passés grâce aux replays et ressources disponibles
          </p>
        </div>
      </section>


      {/* Section principale */}
      <section ref={sectionRef} className="relative py-20 *px-6 bg-[var(--muted)]">
        <div className="container mx-auto px-4 md:px-16 lg:px-20 max-w-7xl">
          {/* En-tête et filtres */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Archives des événements
                </h2>
                {/* <p style={{ color: "var(--muted-foreground)" }}>
                  {filteredEvents.length} événement{filteredEvents.length !== 1 ? 's' : ''} archivé{filteredEvents.length !== 1 ? 's' : ''}
                </p> */}
              </div>

              {/* Barre de recherche */}
              {/* <div className="event-filters w-full lg:w-auto">
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
              </div> */}
            </div>

            {/* Filtres */}
            {/* <div className="event-filters flex flex-wrap gap-4"> */}
            {/* Filtre par catégorie */}
            {/* <div className="flex items-center gap-2">
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
              </div> */}

            {/* <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-3 py-2 rounded-lg border-2 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition-all"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
              >
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select> */}
            {/* </div> */}
          </div>

          {/* Grille d'événements */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-card group">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                  {/* Image avec badge replay */}
                  <div className="relative h-48 overflow-hidden">
                    {/* <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    /> */}
                    <div className="relative h-48 overflow-hidden">
                      {event.platform === "youtube" ? (
                        <iframe
                          src={event.replayUrl.replace("watch?v=", "embed/")}
                          title={event.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <iframe
                          src={event.replayUrl}
                          title={event.title}
                          className="w-full h-full"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-sm text-white  bg-primary font-medium *bg-white/90 backdrop-blur-sm"
                      // style={{ color: "var(--muted-foreground)" }}
                      >
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 mx-auto">
                          <Play className="w-8 h-8 text-white" fill="white" />
                        </div>
                        {/* <span className="text-white font-medium">Replay disponible</span> */}
                      </div>
                    </div>
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
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      {/* <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div> */}
                      {/* <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>{event.attendees}</span>
                      </div> */}
                      <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                        <span className="font-medium">Intervenant:</span> {event.speaker}
                      </div>
                    </div>

                    {/* Plateforme */}
                    <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-[var(--secondary)]">
                      {getPlatformIcon(event.platform)}
                      <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                        Replay sur {getPlatformName(event.platform)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto pt-4 space-y-3">
                      {/* Bouton replay */}
                      <a
                        href={event.replayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full *text-sm *uppercase font-medium transition-all hover:gap-3"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--primary-foreground)"
                        }}
                      >
                        <Play className="w-4 h-4" />
                        <span>Voir le replay</span>
                      </a>

                      {/* Ressources supplémentaires */}
                      {event.slidesUrl && (
                        <a
                          href={event.slidesUrl}
                          download
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full *text-sm *uppercase border-2 transition-all hover:gap-3"
                          style={{
                            borderColor: "var(--primary)",
                            color: "var(--primary)"
                          }}
                        >
                          <Download className="w-4 h-4" />
                          <span>Télécharger les slides</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aucun résultat */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📼</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
                Aucun événement trouvé
              </h3>
              <p style={{ color: "var(--muted-foreground)" }}>
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}

          {/* Call to Action */}
          {/* Call to Action / Newsletter */}
          <div className="mt-20 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Ne manquez pas nos prochains événements</h3>
                <p className="opacity-90 mb-6">
                  Inscrivez-vous à notre newsletter pour recevoir les annonces de nos futurs événements
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
                    <span className="text-sm font-semibold">S'abonner</span>
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

export default PastEventsPage