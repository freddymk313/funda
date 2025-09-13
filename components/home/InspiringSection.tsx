"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PlayCircle, Video, Download, ArrowRight, Sparkles, Eye, Users, Clock } from "lucide-react"
import ConferenceSwiper from "./ConferenceSwiper"

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function InspiringSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

useEffect(() => {
  if (!sectionRef.current) return;

  const createParticles = () => {
    if (!particlesRef.current) return [];
    const colors = ['var(--primary)', 'var(--accent)', 'var(--ring)', '#4DCFE0', '#0096B2'];
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full';
      particle.style.width = `${Math.random() * 20 + 6}px`;
      particle.style.height = particle.style.width;
      particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;
      particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 4}s`;
      particle.style.filter = 'blur(4px)';
      particlesRef.current.appendChild(particle);
      particles.push(particle);
    }
    return particles;
  };

  const particles = createParticles();

  // Affichage initial pour éviter les flashes
  gsap.set([headingRef.current, textRef.current], { opacity: 1, y: 0, scale: 1 });
  gsap.set(".section-badge, .feature-item, .conference-swiper, .cta-button", { opacity: 1 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 85%",
      toggleActions: "play none none none",
    }
  });

  tl.fromTo(particles, { scale: 0, opacity: 0, y: 20 }, 
            { scale: 1, opacity: 0.4, y: 0, duration: 1.5, stagger: 0.08, ease: "back.out(1.8)" })
    .fromTo(headingRef.current, { y: 60, opacity: 0, filter: "blur(15px)", scale: 0.95 }, 
            { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "power3.out" }, "-=0.8");

  gsap.to(particles, { y: (i) => i % 2 === 0 ? -20 : 20, x: (i) => i % 3 === 0 ? -15 : 15, rotation: 60, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".cta-button", { scale: 1.02, boxShadow: "0 10px 40px rgba(0, 150, 178, 0.3)", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (particlesRef.current) particlesRef.current.innerHTML = '';
  };
}, []);


  const features = [
    { 
      icon: <PlayCircle className="w-6 h-6" />, 
      text: "Conférences interactives avec experts",
      description: "Des sessions live avec des professionnels expérimentés",
      stats: "50+ sessions"
    },
    { 
      icon: <Video className="w-6 h-6" />, 
      text: "Vidéos exclusives et tutoriels",
      description: "Du contenu pratique et facile à suivre",
      stats: "100+ vidéos"
    },
    { 
      icon: <Download className="w-6 h-6" />, 
      text: "Ressources téléchargeables",
      description: "Documents, présentations et supports de cours",
      stats: "200+ ressources"
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Gradient background animé */}
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10 opacity-0"
        style={{
          mask: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 70%)"
        }}
      />

      {/* Éléments décoratifs */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
      
      <div className="absolute top-10% right-15% w-60 h-60 bg-primary/15 rounded-full blur-4xl opacity-40 animate-pulse-slow" />
      <div className="absolute bottom-10% left-15% w-48 h-48 bg-accent/15 rounded-full blur-4xl opacity-30 animate-pulse-slow" />
      <div className="absolute top-30% left-10% w-32 h-32 bg-ring/10 rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto max-w-7xl px-4 md:px-16 lg:px-20 relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="section-badge inline-flex items-center gap-2 bg-primary/15 backdrop-blur-md border border-primary/25 rounded-full px-5 py-2.5 mb-6 shadow-lg">
            <Sparkles size={18} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Contenu Premium</span>
          </div>
          
          <h2 ref={headingRef} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="block mb-3 text-foreground/90">Découvrez nos</span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-ring bg-clip-text text-transparent">
                Conférences & Vidéos
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-primary/20 blur-xl -z-10" />
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed font-light">
            Plongez dans un univers de connaissances avec notre collection exclusive de contenus 
            conçus pour transformer votre apprentissage en informatique.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Contenu texte */}
          <div ref={textRef} className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Excellence pédagogique à portée de main
              </h3>
              
              <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed font-light">
                Notre plateforme vous offre un accès privilégié à des ressources de qualité, 
                créées par des experts passionnés et dédiés à votre réussite.
              </p>
            </div>

            <ul className="space-y-5">
              {features.map((item, index) => (
                <li 
                  key={index}
                  className="feature-item group p-6 rounded-3xl border-2 border-border/30 bg-gradient-to-b from-background/70 to-background/40 backdrop-blur-md hover:border-primary/40 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-primary group-hover:text-accent transition-colors duration-300">
                        {item.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                        {item.text}
                      </h4>
                      <p className="text-muted-foreground/80 mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-primary/80 font-medium">
                        <span className="bg-primary/10 px-3 py-1 rounded-full">
                          {item.stats}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="pt-6">
              <button className="cta-button group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-3">
                  Explorer tout le contenu
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>

          {/* Contenu image - ConferenceSwiper */}
          <div className="conference-swiper relative">
            <div className="relative rounded-4xl overflow-hidden shadow-3xl border-2 border-white/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-md">
              <ConferenceSwiper />
            </div>
            
            {/* Éléments décoratifs */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 bg-accent/25 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -z-10 -top-8 -left-8 w-24 h-24 bg-primary/25 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-ring/10 rounded-full blur-4xl" />
          </div>
        </div>
      </div>

      {/* Styles globaux pour les animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          33% { 
            transform: translateY(-15px) rotate(2deg) scale(1.05);
          }
          66% { 
            transform: translateY(10px) rotate(-2deg) scale(0.95);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .feature-item:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 150, 178, 0.2);
        }
        
        .feature-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, var(--primary)/10, var(--accent)/10);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }
        
        .feature-item:hover::before {
          opacity: 1;
        }
      `}</style>
    </section>
  )
}