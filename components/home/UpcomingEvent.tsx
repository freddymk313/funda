"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export default function UpcomingEvent() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
    }
  }, [])

  return (
    <section className="py-16 px-6">
      <h2 className="text-2xl font-heading text-center mb-8">
        Arrive bientôt
      </h2>
      <div
        ref={cardRef}
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 flex items-center gap-6"
      >
        {/* Date */}
        <div className="flex flex-col items-center justify-center bg-primary text-white rounded-lg px-4 py-2">
          <span className="text-sm">JAN</span>
          <span className="text-2xl font-bold">25</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">
            Atelier de programmation Python
          </h3>
          <p className="text-gray-600 text-sm mb-1">📍 Apprenons</p>
          <p className="text-gray-600 text-sm mb-1">🕒 14h00 - 16h00 HNB</p>
          <p className="text-gray-600 text-sm">👨‍🏫 Dr. Jonas MUBISA</p>
        </div>

        {/* CTA */}
        <Button variant="outline">Inscrivez-vous maintenant</Button>
      </div>
    </section>
  )
}
