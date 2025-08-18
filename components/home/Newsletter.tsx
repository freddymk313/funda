"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Newsletter() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.from(ref.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
    }
  }, [])

  return (
    <section ref={ref} className="py-16 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Texte et formulaire */}
        <div>
          <h2 className="text-2xl font-heading mb-4">
            Restez informés de nos actualités
          </h2>
          <p className="text-gray-600 mb-6">
            Inscrivez-vous pour recevoir nos dernières nouvelles et événements.
          </p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Votre email"
              className="flex-1"
            />
            <Button>S'inscrire →</Button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-60 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">[Image Placeholder]</span>
        </div>
      </div>
    </section>
  )
}
