"use client";

import { Button } from "../ui/button";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Play, ArrowRight, Sparkles } from "lucide-react";

// Enregistrer les plugins GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const accentTextRef = useRef<HTMLSpanElement>(null);

useEffect(() => {
  if (!heroRef.current) return;

  const hero = heroRef.current;

  // Assurer l'affichage initial
  gsap.set([overlayRef.current, headingRef.current, textRef.current, buttonsRef.current, accentTextRef.current], {
    opacity: 1,
    y: 0,
    scale: 1
  });

  // Création des particules décoratives
  const createParticles = () => {
    if (!particlesRef.current) return [];
    const colors = ['var(--primary)', 'var(--accent)', 'var(--ring)', '#ffffff'];
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full opacity-20';
      particle.style.width = `${Math.random() * 20 + 5}px`;
      particle.style.height = particle.style.width;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particlesRef.current.appendChild(particle);
      particles.push(particle);
    }

    return particles;
  };

  const particles = createParticles();

  // Timeline animée
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(headingRef.current, { y: 40, opacity: 0, duration: 1.2 })
    .from(accentTextRef.current, { scale: 0.8, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(textRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
    .from(buttonsRef.current ? Array.from(buttonsRef.current.children) : [], {
      y: 30,
      opacity: 0,
      scale: 0.9,
      stagger: 0.15,
      duration: 0.6,
      ease: "back.out(1.5)"
    }, "-=0.4");

  // Animation parallaxe et particules au scroll
  gsap.to(hero, {
    y: 50,
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1.5
    }
  });

  gsap.to(particles, {
    y: (i) => i % 2 === 0 ? -30 : 30,
    x: (i) => i % 3 === 0 ? -20 : 20,
    rotation: 180,
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Animation continue du texte accent
  gsap.to(accentTextRef.current, {
    textShadow: "0 0 30px var(--accent), 0 0 60px var(--accent)",
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (particlesRef.current) particlesRef.current.innerHTML = '';
  };
}, []);


  return (
    <section
      ref={heroRef}
      className="relative py-4 px-4 md:px-16 lg:px-20 flex flex-col items-center justify-center text-center pt-12 sm:pt-20 md:pt-32 pb-12 sm:pb-20 min-h-[60vh] md:min-h-[90vh] overflow-hidden"
      style={{
        backgroundImage: "url('/img/1.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay avec dégradé */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 opacity-0"
      ></div>

      {/* Particules décoratives */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Élément décoratif gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-primary/20 via-accent/20 to-ring/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>

      <div className="container relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6 md:mb-8 animate-fade-in">
          <Sparkles size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Rejoignez la communauté</span>
        </div>

        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 text-white"
        >
          Apprenez l'informatique{" "}
          <span className="relative inline-block">
            <span 
              ref={accentTextRef}
              className="relative z-10 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
            >
              et transformez
            </span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/30 blur-md -z-10"></span>
          </span>{" "}
          votre avenir
        </h1>

        <p
          ref={textRef}
          className="mt-4 md:mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-100 leading-relaxed backdrop-blur-sm bg-white/5 rounded-lg p-4"
        >
          Bienvenue sur Funda, votre plateforme d'apprentissage en informatique.
          Explorez nos ressources, événements et articles pour vous aider à
          débuter votre carrière dans le domaine technologique.
        </p>

        {/* Boutons CTA */}
        <div
          ref={buttonsRef}
          className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
        >
          <Link href="/events/past" className="w-full sm:w-auto cursor-pointer group">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-semibold border-2 border-primary group-hover:border-accent transition-all duration-300 group-hover:scale-105 shadow-lg shadow-primary/25 group-hover:shadow-accent/30"
              style={{
                background: "linear-gradient(45deg, var(--primary), var(--ring))",
                color: "var(--primary-foreground)",
              }}
            >
              <Play size={20} className="mr-2 group-hover:scale-110 transition-transform" />
              Découvrir les webinaires
            </Button>
          </Link>

          <Link href="/events/upcoming" className="w-full sm:w-auto cursor-pointer group">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-semibold border-2 border-white/30 group-hover:border-white transition-all duration-300 group-hover:scale-105 backdrop-blur-sm group-hover:bg-white/10"
            >
              Voir les événements
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
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
            transform: translateY(-20px) rotate(5deg); 
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px var(--primary); }
          50% { box-shadow: 0 0 40px var(--accent); }
        }
      `}</style>
    </section>
  );
};

export default Hero;