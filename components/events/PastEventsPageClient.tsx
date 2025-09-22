"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Clock, Play, Facebook, Youtube, Download, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const PastEventsPageClient = ({ events }: { events: any[] }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedPlatform, setSelectedPlatform] = useState("Toutes")
  const sectionRef = useRef<HTMLDivElement>(null)

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "Tous" || event.category === selectedCategory
    const matchesPlatform =
      selectedPlatform === "Toutes" ||
      (selectedPlatform === "Facebook" && event.platform === "facebook") ||
      (selectedPlatform === "YouTube" && event.platform === "youtube")

    return matchesSearch && matchesCategory && matchesPlatform
  })

  const getPlatformIcon = (platform: string) =>
    platform === "facebook" ? <Facebook className="w-4 h-4" /> : <Youtube className="w-4 h-4" />

  const getPlatformName = (platform: string) =>
    platform === "facebook" ? "Facebook" : "YouTube"

  const getYoutubeId = (url: string) => {
  const reg = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/;
  return url.match(reg)?.[1] || "";
};

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 md:py-28 px-4 text-center text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/img/past-1.png"
            alt="Événements passés"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <Link
            href="/events/upcoming"
            className="inline-flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux événements à venir
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements Passés</h1>
          <p className="md:text-lg opacity-90">
            Revivez nos événements passés grâce aux replays et ressources disponibles
          </p>
        </div>
      </section>

      {/* Liste des événements */}
      <section ref={sectionRef} className="relative py-12 md:py-20 bg-[var(--muted)]">
        <div className="container mx-auto px-4 md:px-16 lg:px-20 max-w-7xl">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event._id} className="event-card group">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                  {/* Vidéo / Image */}
                  <div className="relative h-48 overflow-hidden">
                    {event.platform === "youtube" ? (
                      <a href={event.replayUrl} target="_blank" rel="noopener noreferrer">
    <Image
      src={`https://img.youtube.com/vi/${getYoutubeId(event.replayUrl)}/hqdefault.jpg`}
      alt={event.title}
      fill
      className="object-cover"
    />
  </a>
                    ) : (
                      <a
                        href={event.replayUrl}
                        // title={event.title}
                        className="w-full h-full"
                        // allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        // allowFullScreen
                      ></a>
                    )}

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-sm text-white bg-primary font-medium">
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{event.description}</p>

                    {/* Métadonnées */}
                    <div className="space-y-2 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div>
                        <span className="font-medium">Intervenant :</span> {event.speaker}
                      </div>
                    </div>

                    {/* Plateforme */}
                    <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-[var(--secondary)]">
                      {getPlatformIcon(event.platform)}
                      <span className="text-sm">Replay sur {getPlatformName(event.platform)}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto pt-4 space-y-3">
                      <a
                        href={event.replayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium transition-all hover:gap-3"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--primary-foreground)",
                        }}
                      >
                        <Play className="w-4 h-4" />
                        <span>Voir le replay</span>
                      </a>

                      {event.slidesUrl && (
                        <a
                          href={event.slidesUrl}
                          download
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border-2 transition-all hover:gap-3"
                          style={{
                            borderColor: "var(--primary)",
                            color: "var(--primary)",
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
              <h3 className="text-xl font-semibold mb-2">Aucun événement trouvé</h3>
              <p>Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default PastEventsPageClient
