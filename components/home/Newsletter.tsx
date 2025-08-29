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
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Éléments décoratifs */}
      {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-[var(--primary)] animate-float-1"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-[var(--accent)] animate-float-2"></div>
      </div> */}

      <div className="container mx-auto px-4 md:px-16 lg:px-20 *max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenu image */}
          <div
            ref={imageRef}
            className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden"
          >
            {/* Image réelle */}
            <div className="absolute inset-0 bg-primary opacity-20"></div>
            <Image
              src="/images/newsletter.jpg"
              alt="Personne lisant une newsletter"
              fill
              className="object-cover"
              quality={90}
            />
            {/* <div className="absolute inset-0 bg-black/20"></div> */}

            {/* Élément décoratif */}
            {/* <div
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full"
              style={{ backgroundColor: "var(--accent)", opacity: 0.3 }}
            ></div> */}
          </div>

          {/* Contenu texte */}
          <div ref={textRef} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-8 h-8" style={{ color: "var(--primary)" }} />
              <span
                className="text-sm font-medium px-3 py-1 rounded-full uppercase"
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
            <div ref={formRef} className="flex flex-col sm:flex-row mt-8">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="relative flex-1 py-5 px-4 rounded-full border-2 focus:border-[var(--primary)]"
                style={{ borderColor: "var(--border)" }}
              />
              {/* <Button
                className="newsletter-button absolute flex items-center rounded-full px-6 py-5 text-sm font-medium"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)"
                }}
              >
                <span className="uppercase">S'abonner</span>
              </Button> */}
              <Button
                size="lg"
                className="absolute top-1/2 right-0.5 -translate-y-1/2 rounded-full py-1.5 px-4 bg-[var(--primary)] *hover:bg-[var(--primary)]/50 transition"
                aria-label="S'abonner à la newsletter"
              >
                <span className="uppercase text-sm font-semibold">S'abonner</span>
              </Button>
            </div>

            {/*  <p 
              className="text-xs opacity-70"
              style={{ color: "var(--muted-foreground)" }}
            >
              Nous ne partagerons jamais votre email. Désabonnez-vous à tout moment.
            </p> */}
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