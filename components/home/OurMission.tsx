"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Users, GraduationCap, Heart } from "lucide-react";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const OurMission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Création des particules décoratives
    const createParticles = () => {
      if (!particlesRef.current) return [];
      
      const particles = [];
      const colors = ['var(--primary)', 'var(--accent)', 'var(--ring)', '#4DCFE0'];
      
      for (let i = 0; i < 18; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full opacity-30';
        particle.style.width = `${Math.random() * 14 + 4}px`;
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
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(particles, 
      { scale: 0, opacity: 0, y: 20 },
      { 
        scale: 1, 
        opacity: 0.4, 
        y: 0,
        duration: 1.2, 
        stagger: 0.04,
        ease: "back.out(1.8)"
      }
    )
    .fromTo(textRef.current, {
      x: -50,
      opacity: 0,
      filter: "blur(12px)",
      scale: 0.95
    }, {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: 1.1,
      ease: "power3.out"
    }, "-=0.8")
    .fromTo(".mission-badge", {
      y: -20,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .fromTo(".mission-heading", {
      y: 40,
      opacity: 0,
      filter: "blur(10px)"
    }, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "power3.out"
    }, "-=0.5")
    .fromTo(".mission-text", {
      y: 30,
      opacity: 0,
      stagger: 0.15
    }, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "back.out(1.6)"
    }, "-=0.4")
    .fromTo(imageRef.current, {
      x: 60,
      opacity: 0,
      rotationY: 8,
      scale: 1.1
    }, {
      x: 0,
      opacity: 1,
      rotationY: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.4")
    .fromTo(".mission-button", {
      y: 25,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.8)"
    }, "-=0.3");

    // Animation continue des particules
    gsap.to(particles, {
      y: (i) => i % 2 === 0 ? -20 : 20,
      x: (i) => i % 3 === 0 ? -15 : 15,
      rotation: 35,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Animation de pulsation pour le badge
    gsap.to(".mission-badge", {
      scale: 1.05,
      boxShadow: "0 0 0 6px rgba(0, 150, 178, 0.15)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });

    return () => {
      tl.kill();
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10"
    >
      {/* Éléments décoratifs */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
      
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary/20 rounded-full blur-4xl opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/20 rounded-full blur-4xl opacity-25"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-ring/15 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 md:px-16 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu texte */}
          <div
            ref={textRef}
            className="space-y-8 lg:space-y-10"
          >
            <div className="space-y-2">
              <div className="mission-badge inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm border border-primary/25 rounded-full px-5 py-2.5 mb-6">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Notre Mission</span>
              </div>

              <h2 className="mission-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground/90">Donner du pouvoir à la</span>{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-ring bg-clip-text text-transparent">
                    prochaine génération
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-4 bg-primary/20 blur-xl -z-10"></span>
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="mission-text text-xl text-muted-foreground/80 leading-relaxed">
                Chez Funda, nous croyons passionnément que <strong className="text-primary">tout le monde mérite d'avoir accès</strong> à une formation de qualité en informatique, 
                indépendamment de son background ou de ses ressources.
              </p>
              
              <p className="mission-text text-xl text-muted-foreground/80 leading-relaxed">
                Notre mission est d'<strong className="text-accent">accompagner les jeunes, étudiants et passionnés</strong> dans leur apprentissage de l'informatique, 
                en leur fournissant les outils, ressources et communautés nécessaires pour réussir.
              </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { icon: Users, value: "500+", label: "Étudiants" },
                { icon: GraduationCap, value: "50+", label: "Formations" },
                { icon: Heart, value: "98%", label: "Satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Bouton CTA */}
            <div className="pt-6">
              <Link href="/events/upcoming" className="mission-button group inline-block">
                <Button
                  size="lg"
                  className="group relative overflow-hidden px-8 py-6 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300"
                  style={{
                    background: "linear-gradient(45deg, var(--primary), var(--accent))",
                    color: "var(--primary-foreground)",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Voir nos événements
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Contenu image */}
          <div
            ref={imageRef}
            className="relative w-full h-96 lg:h-[550px] rounded-3xl overflow-hidden group"
          >
            <Image
              src="/img/our.jpg"
              alt="Étudiants en informatique collaborant sur un projet"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              quality={100}
              priority
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            
            {/* Éléments décoratifs sur l'image */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <Sparkles className="w-6 h-6 text-primary mb-1" />
              <div className="text-sm font-semibold text-foreground">Apprentissage collaboratif</div>
            </div>

            <div className="absolute bottom-6 right-6 bg-primary/90 text-primary-foreground rounded-2xl px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium">Communauté active</span>
            </div>

            {/* Élément décoratif */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-accent/30 rounded-full blur-3xl"></div>
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
            transform: translateY(-15px) rotate(3deg);
          }
        }
        
        .mission-badge {
          transition: all 0.3s ease;
        }
        
        .mission-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 150, 178, 0.2);
        }
      `}</style>
    </section>
  );
};

export default OurMission;