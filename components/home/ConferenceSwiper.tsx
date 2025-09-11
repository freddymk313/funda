"use client"

import { Swiper, SwiperSlide } from "swiper/react"
// import { EffectCards, Autoplay } from "swiper/modules"
import { EffectCards, Pagination, Navigation, Autoplay } from "swiper/modules"
import Image from "next/image"
import { Play } from "lucide-react"
import "swiper/css"
import "swiper/css/effect-cards"
import { urlFor } from "@/sanity/lib/image"

export default function ConferenceSwiper({ events }: { events: any[] }) {
  return (
    // <div className="w-[300px] md:w-[400px] h-[420px] md:h-[500px] mx-auto">
    //   <Swiper
    //     effect="cards"
    //     grabCursor
    //     modules={[EffectCards, Autoplay]}
    //     autoplay={{ delay: 3000, disableOnInteraction: false }}
    //     className="h-full"
    //   >
    //     {events.map((ev) => (
    //       <SwiperSlide
    //         key={ev._id}
    //         className="relative flex items-center justify-center rounded-2xl overflow-hidden shadow-xl bg-white"
    //       >
    //         {ev.image?.asset?.url && (
    //           <Image
    //             src={ev.image.asset.url}
    //             alt={ev.title}
    //             fill
    //             className="object-cover"
    //             quality={90}
    //           />
    //         )}

    //         <div className="absolute inset-0 flex items-center justify-center">
    //           <a
    //             href={ev.replayUrl}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition"
    //           >
    //             <Play className="w-8 h-8 text-white" fill="white" />
    //           </a>
    //         </div>
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </div>

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
        {events.map((ev) => (
          <SwiperSlide
            key={ev._id}
            className="relative flex items-center justify-center bg-white rounded-2xl overflow-hidden shadow-xl"
            // className="relative flex items-center justify-center rounded-2xl overflow-hidden shadow-xl bg-white"
          >
            {ev.image?.asset?.url && (
              <Image
                // src={ev.image.asset.url}
                src={urlFor(ev.image).url()}
                alt={ev.title}
                fill
                className="object-cover"
                quality={90}
              />
            )}

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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
