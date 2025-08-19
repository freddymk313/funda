"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MessageCircle, ChevronRight, Phone } from "lucide-react"

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function WhatsAppCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })

    tl.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(buttonsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")

    // Animation continue pour le bouton WhatsApp
    gsap.to(".whatsapp-pulse", {
      scale: 1.05,
      boxShadow: "0 0 0 10px rgba(37, 211, 102, 0.2)",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut"
    })

    return () => { tl.kill(); }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden"
      style={{ backgroundColor: "var(--muted)" }}
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[var(--primary)] animate-float-1"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-[var(--accent)] animate-float-2"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-8 leading-tight"
          style={{ color: "var(--foreground)" }}
        >
          Prêt à commencer votre <span 
            className="relative inline-block"
            style={{ color: "var(--primary)" }}
          >
            parcours en informatique ?
            <span 
              className="absolute bottom-1 left-0 w-full h-1 rounded-full"
              style={{ backgroundColor: "var(--accent)", opacity: 0.5 }}
            ></span>
          </span>
        </h2>

        <p 
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: "var(--muted-foreground)" }}
        >
          Rejoignez notre communauté sur WhatsApp pour des conseils, des ressources 
          exclusives et un accompagnement personnalisé.
        </p>

        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="whatsapp-pulse flex items-center gap-3 rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
            style={{
              backgroundColor: "#25D366",
              color: "white"
            }}
          >
            <MessageCircle className="w-6 h-6" />
            <span>Rejoindre sur WhatsApp</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-lg font-medium border-2 transition-all group"
            style={{
              borderColor: "var(--primary)",
              color: "var(--primary)"
            }}
          >
            <Phone className="w-5 h-5 mr-2" />
            <span>Nous appeler</span>
            <ChevronRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
          </Button>
        </div>

        <p 
          className="text-sm mt-8 opacity-80"
          style={{ color: "var(--muted-foreground)" }}
        >
          Réponse garantie sous 24 heures
        </p>
      </div>

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
    </section>
  )
}