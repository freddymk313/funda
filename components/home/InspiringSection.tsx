"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { CheckCircle2 } from "lucide-react"

export default function InspiringSection() {
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
    <section ref={ref} className="py-20 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Texte */}
        <div>
          <h2 className="text-3xl font-heading font-bold mb-4">
            Inspiring <br /> Découvrez nos conférences & vidéos
          </h2>
          <p className="text-gray-600 mb-6">
            Explorez une variété de contenus inspirants pour enrichir vos connaissances.
          </p>

          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="text-primary" /> Conférences interactives
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="text-primary" /> Vidéos exclusives
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="text-primary" /> Ressources téléchargeables
            </li>
          </ul>
        </div>

        {/* Image */}
        <div className="w-full h-72 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">[Image Placeholder]</span>
        </div>
      </div>
    </section>
  )
}
