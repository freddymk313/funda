"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2, PlayCircle, Download, Video, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import ConferenceSwiper from "./ConferenceSwiper"

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function InspiringSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const listItemsRef = useRef<HTMLLIElement[]>([])
  const headingRef = useRef<HTMLHeadingElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Création des particules décoratives
    const createParticles = () => {
      if (!particlesRef.current) return [];
      
      const particles = [];
      const colors = ['var(--primary)', 'var(--accent)', 'var(--ring)', '#4DCFE0'];
      
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full opacity-30';
        particle.style.width = `${Math.random() * 16 + 4}px`;
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 8 + 4}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        
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
        toggleActions: "play none none none",
        markers: false
      }
    })

    tl.fromTo(particles, 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.3, duration: 1, stagger: 0.1 }
    )
    .fromTo(headingRef.current, {
      y: 40,
      opacity: 0,
      filter: "blur(10px)"
    }, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out"
    }, "-=0.5")
    .fromTo(textRef.current, {
      x: -30,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .fromTo(".feature-item", {
      y: 20,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.15,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .fromTo(".conference-swiper", {
      x: 30,
      opacity: 0,
      rotationY: -5
    }, {
      x: 0,
      opacity: 1,
      rotationY: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")

    // Animation continue des particules
    gsap.to(particles, {
      y: (i) => i % 2 === 0 ? -15 : 15,
      x: (i) => i % 3 === 0 ? -10 : 10,
      rotation: 45,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    return () => { 
      tl.kill();
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-28 overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Éléments décoratifs */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>
      
      <div className="absolute top-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto max-w-7xl px-4 md:px-16 lg:px-20 relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Contenu exclusif</span>
          </div>
          <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="block mb-2 text-foreground">Découvrez nos</span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Conférences & Vidéos
              </span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 blur-md -z-10"></span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explorez une variété de contenus inspirants pour enrichir vos connaissances et 
            développer vos compétences en informatique.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu texte */}
          <div ref={textRef} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                Des ressources de qualité pour votre apprentissage
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Accédez à du contenu exclusif créé par des experts du domaine, 
                conçu pour vous accompagner dans votre parcours d'apprentissage.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                { 
                  icon: <PlayCircle className="w-6 h-6" />, 
                  text: "Conférences interactives avec experts",
                  description: "Des sessions live avec des professionnels expérimentés"
                },
                { 
                  icon: <Video className="w-6 h-6" />, 
                  text: "Vidéos exclusives et tutoriels",
                  description: "Du contenu pratique et facile à suivre"
                },
                { 
                  icon: <Download className="w-6 h-6" />, 
                  text: "Ressources téléchargeables",
                  description: "Documents, présentations et supports de cours"
                }
              ].map((item, index) => (
                <li 
                  key={index}
                  className="feature-item group p-4 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-primary">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.text}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="pt-4">
              <button className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Explorer tout le contenu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Contenu image - ConferenceSwiper */}
          <div className="conference-swiper relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ConferenceSwiper />
            </div>
            
            {/* Élément décoratif */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
            <div className="absolute -z-10 -top-6 -left-6 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
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
        
        .feature-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 150, 178, 0.15);
        }
      `}</style>
    </section>
  )
}