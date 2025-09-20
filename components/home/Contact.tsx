"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react"

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })

    tl.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
      .from(formRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.4)"
      }, "-=0.4")
      .from(infoRef.current, {
        x: 30,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.4)"
      }, "-=0.4")

    // Animation du bouton
    gsap.to(".contact-button", {
      y: -2,
      boxShadow: "0 6px 12px rgba(0, 150, 178, 0.25)",
      repeat: -1,
      yoyo: true,
      duration: 1.8,
      ease: "sine.inOut"
    })

    return () => { tl.kill(); }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-12 md:py-24 overflow-hidden bg-gradient-to-b from-background to-muted/30"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-16 lg:px-20 *max-w-5xl relative z-10">
        {/* En-tête */}
        <div ref={titleRef} className="text-center mb-8 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="text-foreground">Contactez</span>{' '}
            <span className="text-primary relative">
              -nous
              {/* <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/40 rounded-full"></span> */}
            </span>
          </h2>
          <p 
          className="text-base md:text-lg"
                      style={{ color: "var(--muted-foreground)" }} >
            Une question, un projet ou simplement envie d'échanger ? Notre équipe est à votre écoute pour vous accompagner.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Formulaire de contact */}
          <div ref={formRef} className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
            <h3 className="text-2xl font-semibold mb-8 text-foreground flex items-center gap-3">
              <div className="p-3 bg-primary rounded-lg">
                <Send className="w-6 h-6 text-white" />
              </div>
              Envoyez-nous un message
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                    Votre nom <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    // className="w-full rounded-lg"
                    className="w-full py-2 px-4 rounded-xl border border-border focus:border-primary focus:ring-primary transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                    Votre email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    // className="w-full rounded-lg"
                    className="w-full py-2 px-4 rounded-xl border border-border focus:border-primary focus:ring-primary transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground/80">
                  Sujet <span className="text-primary">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                    // className="w-full rounded-lg border-border focus:border-primary focus:ring-primary"
                  className="w-full py-2 px-4 rounded-xl border border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                  Votre message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full py-3 px-4 rounded-xl border border-border focus:border-primary focus:ring-primary transition-all duration-200 resize-none"
                />
              </div>
              
              <Button 
                className="contact-button w-full md:py-[22px] rounded-full text-base font-semibold transition-all duration-300 *hover:shadow-lg"
              >
                <Send className="w-5 h-5 mr-3" />
                Envoyer le message
              </Button>
            </form>
          </div>

          {/* Informations de contact */}
          <div ref={infoRef} className="space-y-8">
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
              <h3 className="text-2xl font-semibold mb-8 text-foreground flex items-center gap-3">
                <div className="p-3 bg-primary rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                Nos coordonnées
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground mt-1">info@funda-online.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg mr-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Téléphone</p>
                    <p className="text-muted-foreground mt-1">+243 973 900 363</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Adresse</p>
                    <p className="text-muted-foreground mt-1">
                      15, chaussée de Kasenga<br />
                      Bel air, Lubumbashi, RDC
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg mr-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Horaires</p>
                    <p className="text-muted-foreground mt-1">Lun-Ven: 8h-17h<br />Sam: 9h-13h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte de localisation simplifiée */}
            {/* <div className="bg-card p-6 rounded-2xl shadow-lg border border-border/50">
              <h4 className="font-semibold mb-4 text-foreground">Nous trouver</h4>
              <div className="bg-muted/30 rounded-xl h-48 flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-10 h-10 mx-auto mb-2 text-primary/60" />
                  <p className="text-sm">Lubumbashi, RDC</p>
                  <p className="text-xs mt-1">15, chaussée de Kasenga, Bel air</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  )
}