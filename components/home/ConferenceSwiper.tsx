"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Pagination, Navigation, Autoplay } from "swiper/modules"
import Image from "next/image"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function ConferenceSwiper() {
  const slides = [
    { src: "/img/meet.jpg", title: "Conférence IA 2024" },
    { src: "/img/meet-2.jpg", title: "Développement Web" },
    { src: "/img/meet-3.jpg", title: "Cloud & Cybersécurité" },
    { src: "/img/meet-4.jpg", title: "Big Data & IA" },
  ]

  return (
    <div className="w-[300px] md:w-[400px] h-[420px] md:h-[500px] mx-auto">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards, Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="mySwiper h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={i}
            className="relative flex items-center justify-center bg-white rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              className="object-cover"
              quality={90}
            />

            {/* Overlay avec titre */}
            <div className="absolute bottom-0 w-full bg-black/50 text-white p-4 text-center">
              <h3 className="text-lg font-semibold">{slide.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
