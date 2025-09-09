"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, Mail, Bell, Sparkles, CheckCircle, Shield } from "lucide-react"
import Image from "next/image"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    // Création des particules décoratives
    const createParticles = () => {
      if (!particlesRef.current) return [];
      
      const particles = [];
      const colors = ['var(--primary)', 'var(--accent)', 'var(--ring)', '#4DCFE0'];
      
      for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full opacity-40';
        particle.style.width = `${Math.random() * 12 + 4}px`;
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 8 + 4}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.style.filter = 'blur(2px)';
        
        particlesRef.current.appendChild(particle);
        particles.push(particle);
      }
      
      return particles;
    };

    const particles = createParticles();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })

    tl.fromTo(particles, 
      { scale: 0, opacity: 0, y: 20 },
      { 
        scale: 1, 
        opacity: 0.4, 
        y: 0,
        duration: 1.2, 
        stagger: 0.03,
        ease: "back.out(1.8)"
      }
    )
    .fromTo(textRef.current, {
      x: -40,
      opacity: 0,
      filter: "blur(10px)"
    }, {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .fromTo(imageRef.current, {
      x: 40,
      opacity: 0,
      scale: 1.1,
      rotationY: 5
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .fromTo(formRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.95
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.8)"
    }, "-=0.4")

    // Animation continue des particules
    gsap.to(particles, {
      y: (i) => i % 2 === 0 ? -15 : 15,
      x: (i) => i % 3 === 0 ? -10 : 10,
      rotation: 25,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Animation de pulsation pour le badge
    gsap.to(".newsletter-badge", {
      scale: 1.05,
      boxShadow: "0 0 0 6px rgba(0, 150, 178, 0.15)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    })

    return () => { 
      tl.kill();
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      // Simuler l'envoi de l'email
      setTimeout(() => {
        setEmail("")
        setIsSubscribed(false)
      }, 3000)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10"
    >
      {/* Éléments décoratifs */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
      
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary/20 rounded-full blur-4xl opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/20 rounded-full blur-4xl opacity-25"></div>

      <div className="container mx-auto px-4 md:px-16 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu image */}
          <div
            ref={imageRef}
            className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden group"
          >
            <Image
              src="/img/news.jpg"
              alt="Personne lisant une newsletter"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              quality={100}
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Éléments décoratifs sur l'image */}
            <div className="absolute top-6 left-6 newsletter-badge bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <Mail className="w-8 h-8 text-primary mb-2" />
              <div className="text-sm font-semibold text-foreground">+2.5K abonnés</div>
            </div>

            <div className="absolute bottom-6 right-6 bg-primary/90 text-primary-foreground rounded-2xl px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium">Contenu exclusif</span>
            </div>
          </div>

          {/* Contenu texte */}
          <div ref={textRef} className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="newsletter-badge flex items-center gap-2 bg-primary/15 backdrop-blur-sm border border-primary/25 rounded-full px-4 py-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary">Newsletter Exclusive</span>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-foreground/90">Ne manquez plus</span>{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    nos actualités
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 blur-xl -z-10"></span>
                </span>
              </h2>

              <p className="text-lg text-muted-foreground/80 leading-relaxed">
                Recevez chaque semaine des ressources exclusives, des invitations à des événements 
                privés et des conseils d'experts pour accélérer votre apprentissage en informatique.
              </p>
            </div>

            {/* Avantages */}
            <div className="space-y-3">
              {[
                { icon: Sparkles, text: "Contenu exclusif et early access" },
                { icon: CheckCircle, text: "Ressources pratiques téléchargeables" },
                { icon: Shield, text: "Zero spam - Désabonnement instantané" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Formulaire */}
            {isSubscribed ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">Félicitations !</h3>
                <p className="text-green-700">Vous êtes maintenant abonné à notre newsletter</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre adresse email"
                    className="w-full py-6 px-6 text-base rounded-2xl border-2 border-border/50 bg-white/95 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="absolute right-2 top-2 rounded-xl px-6 py-4 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300 hover:shadow-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    S'abonner
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground/70 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Nous respectons votre vie privée. Vous pouvez vous désabonner à tout moment.
                </p>
              </form>
            )}

            {/* Statistiques */}
            <div className="flex items-center gap-6 pt-4 border-t border-border/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2.5K+</div>
                <div className="text-sm text-muted-foreground">Abonnés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Spam</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles globaux pour les animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-12px) rotate(3deg);
          }
        }
        
        .newsletter-badge {
          transition: all 0.3s ease;
        }
        
        .newsletter-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 150, 178, 0.2);
        }
      `}</style>
    </section>
  )
}