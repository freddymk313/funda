"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, Mail } from "lucide-react"
import Image from "next/image"

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    })

    tl.from(textRef.current, {
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(imageRef.current, {
      x: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .from(formRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, "-=0.3")

    // Animation du bouton
    gsap.to(".newsletter-button", {
      scale: 1.05,
      boxShadow: "0 0 0 4px rgba(0, 150, 178, 0.2)",
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
      className="relative py-24 px-6 overflow-hidden"
      style={{ backgroundColor: "var(--muted)" }}
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-[var(--primary)] animate-float-1"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-[var(--accent)] animate-float-2"></div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div ref={textRef} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-8 h-8" style={{ color: "var(--primary)" }} />
              <span 
                className="text-sm font-medium px-3 py-1 rounded-full"
                style={{ 
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)"
                }}
              >
                Newsletter
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              <span style={{ color: "var(--foreground)" }}>Ne manquez plus</span>{' '}
              <span 
                className="relative inline-block"
                style={{ color: "var(--primary)" }}
              >
                nos actualités
                <span 
                  className="absolute bottom-1 left-0 w-full h-1 rounded-full opacity-60"
                  style={{ backgroundColor: "var(--accent)" }}
                ></span>
              </span>
            </h2>

            <p 
              className="text-lg"
              style={{ color: "var(--muted-foreground)" }}
            >
              Recevez directement dans votre boîte mail nos dernières ressources, 
              événements à venir et conseils exclusifs pour votre apprentissage.
            </p>

            {/* Formulaire */}
            <div ref={formRef} className="flex flex-col sm:flex-row gap-3 mt-8">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 py-5 px-4 rounded-xl border-2 focus:border-[var(--primary)]"
                style={{ borderColor: "var(--border)" }}
              />
              <Button 
                className="newsletter-button flex items-center gap-2 rounded-xl px-6 py-5 text-base font-medium"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)"
                }}
              >
                <span>S'abonner</span>
                <Send className="w-5 h-5" />
              </Button>
            </div>

            <p 
              className="text-xs opacity-70"
              style={{ color: "var(--muted-foreground)" }}
            >
              Nous ne partagerons jamais votre email. Désabonnez-vous à tout moment.
            </p>
          </div>

          {/* Contenu image */}
          <div 
            ref={imageRef}
            className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Image réelle */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-20"></div>
            <Image
              src="/images/newsletter.jpg"
              alt="Personne lisant une newsletter"
              fill
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Élément décoratif */}
            <div 
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full"
              style={{ backgroundColor: "var(--accent)", opacity: 0.3 }}
            ></div>
          </div>
        </div>
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