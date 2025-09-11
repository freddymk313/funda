"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Pagination, Navigation, Autoplay } from "swiper/modules"
import Image from "next/image"
import { Play } from "lucide-react"
import "swiper/css"
import "swiper/css/effect-cards"
import { urlFor } from "@/sanity/lib/image"

export default function ConferenceSwiper({ events }: { events: any[] }) {
  return (
    <div className="w-[300px] md:w-[400px] h-[480px] mx-auto">
      <Swiper
        effect="cards"
        grabCursor
        modules={[EffectCards, Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="mySwiper h-full"
      >
        {events.map((ev) => (
          <SwiperSlide
            key={ev._id}
            className="relative rounded-2xl overflow-hidden shadow-xl bg-white"
          >
            {/* Image */}
            {ev.image && (
              <Image
                src={urlFor(ev.image).url()}
                alt={ev.title}
                fill
                className="object-cover"
                quality={90}
              />
            )}

            {/* Overlay avec infos */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 text-white">
              <h3 className="text-lg font-semibold line-clamp-2">
                {ev.title}
              </h3>
              <p className="text-sm opacity-80 line-clamp-3">
                {ev.excerpt}
              </p>
            </div>

            {/* Bouton lecture (optionnel) */}
            {ev.replayUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={ev.replayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition"
                >
                  <Play className="w-8 h-8 text-white" fill="white" />
                </a>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
