"use client"

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const ContactPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start: "top 70%",
    //     toggleActions: "play none none none"
    //   }
    // })

    // tl.from(sectionRef.current?.querySelector("h1")!, {
    //   y: 50,
    //   opacity: 0,
    //   duration: 0.8,
    //   ease: "power3.out"
    // })
    // .from(sectionRef.current?.querySelector("p")!, {
    //   y: 30,
    //   opacity: 0,
    //   duration: 0.6,
    //   ease: "power3.out"
    // }, "-=0.4")
    // .from(formRef.current, {
    //   x: -30,
    //   opacity: 0,
    //   duration: 0.7,
    //   ease: "back.out(1.2)"
    // }, "-=0.3")
    // .from(infoRef.current, {
    //   x: 30,
    //   opacity: 0,
    //   duration: 0.7,
    //   ease: "back.out(1.2)"
    // }, "-=0.5")

    // return () => { tl.kill(); }
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Section Hero */}
      <section
        className="relative py-28 px-6 text-center bg-gradient-to-br from-[var(--primary)] to-[var(--foreground)] text-white"
      >
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Nous sommes là pour répondre à vos questions et vous accompagner dans votre apprentissage.
          </p>
        </div>

        {/* Éléments décoratifs */}
        {/* <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-white animate-float-1"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-white animate-float-2"></div>
        </div> */}
      </section>

      {/* Section principale */}
      <section
        // ref={sectionRef}
        className="relative py-20 *px-6 bg-[var(--muted)]"
      >
        <div className="container mx-auto px-4 md:px-16 lg:px-20 *max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <form
              ref={formRef}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
                Envoyez-nous un message
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                      Nom complet *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      style={{ borderColor: "var(--border)" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                      Email *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition-all"
                      style={{ borderColor: "var(--border)" }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                    Sujet *
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition-all"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition-all"
                    style={{ borderColor: "var(--border)" }}
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full uppercase *absolute flex items-center rounded-full px-6 py-5 text-sm font-medium"
                  // className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium transition-all hover:gap-3"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)"
                  }}
                >
                  <span>Envoyer le message</span>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>

            {/* Informations de contact */}
            <div
              ref={infoRef}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
                  Nos informations
                </h2>
                <p className="opacity-80" style={{ color: "var(--muted-foreground)" }}>
                  Notre équipe est disponible pour répondre à vos questions et vous aider dans votre parcours d'apprentissage.
                </p>
              </div>

              <div className="space-y-6">
                {/* Carte de localisation */}
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/map-placeholder.jpg"
                    alt="Localisation de Funda"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: "var(--primary)" }} />
                      <span className="font-medium" style={{ color: "var(--foreground)" }}>
                        123 Rue de l'Innovation, 75000 Paris
                      </span>
                    </div>
                  </div>
                </div>

                {/* Informations de contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                    <Mail className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "var(--primary)" }} />
                    <div>
                      <h3 className="font-medium mb-1" style={{ color: "var(--foreground)" }}>Email</h3>
                      <a
                        href="mailto:contact@funda.fr"
                        className="text-sm opacity-80 hover:opacity-100 hover:underline transition-all"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        contact@funda.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                    <Phone className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "var(--primary)" }} />
                    <div>
                      <h3 className="font-medium mb-1" style={{ color: "var(--foreground)" }}>Téléphone</h3>
                      <a
                        href="tel:+33123456789"
                        className="text-sm opacity-80 hover:opacity-100 hover:underline transition-all"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                    <Clock className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "var(--primary)" }} />
                    <div>
                      <h3 className="font-medium mb-1" style={{ color: "var(--foreground)" }}>Horaires</h3>
                      <p className="text-sm opacity-80" style={{ color: "var(--muted-foreground)" }}>
                        Lundi - Vendredi<br />
                        9h00 - 18h00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                    <div className="w-6 h-6 mt-1 flex-shrink-0 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1" style={{ color: "var(--foreground)" }}>Réseaux sociaux</h3>
                      <div className="flex gap-3 mt-2">
                        {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social, index) => (
                          <a
                            key={index}
                            href="#"
                            aria-label={social}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                            style={{ color: "var(--primary)" }}
                          >
                            {social.charAt(0)}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-20 -z-10"></div>
      </section>

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
    </div>
  )
}

export default ContactPage