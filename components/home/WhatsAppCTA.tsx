"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { MessageCircle } from "lucide-react"

export default function WhatsAppCTA() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.from(ref.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
      })
    }
  }, [])

  return (
    <section ref={ref} className="py-16 px-6 bg-gray-50 text-center">
      <h2 className="text-2xl font-heading mb-6">
        Prêt à commencer votre parcours ?
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button
          variant="default"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
        >
          <MessageCircle size={18} /> WhatsApp
        </Button>
        <Button variant="outline">Autre action</Button>
      </div>
    </section>
  )
}
