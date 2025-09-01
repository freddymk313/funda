"use client";

import { Button } from "../ui/button";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation d'entrée
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
      .fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        buttonsRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      );

    // Animation de parallaxe au scroll
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        y: 50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative py-4 px-4 md:px-16 lg:px-20 flex flex-col items-center justify-center text-center pt-20 md:pt-32 pb-20 min-h-[90vh] overflow-hidden"
      style={{
        backgroundImage: "url('/img/1.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 opacity-0"
      ></div>

      {/* Éléments décoratifs */}
      {/* <div className="absolute inset-0 overflow-hidden opacity-30">
         <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--primary)] animate-float-1"></div>
         <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-[var(--accent)] animate-float-2"></div>
         <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-[var(--ring)] animate-float-3"></div>
       </div> */}

      <div className="container relative z-10 max-w-4xl mx-auto">
        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white"
        >
          Apprenez l'informatique{" "}
          <span className="relative inline-block text-[var(--accent)]">
            <span className="relative z-10">et transformez</span>
            {/* <span
              className="absolute bottom-0 left-0 w-full h-2 bg-[var(--accent)] opacity-40"
              style={{ transform: "skewX(-15deg)" }}
            ></span> */}
          </span>{" "}
          votre avenir !
        </h1>

        <p
          ref={textRef}
          className="mt-4 text-lg *md:text-xl max-w-2xl mx-auto text-gray-100"
        >
          Bienvenue sur Funda, votre plateforme d'apprentissage en informatique.
          Explorez nos ressources, événements et articles pour vous aider à
          débuter votre carrière dans le domaine technologique.
        </p>

        {/* Boutons CTA */}
        <div ref={buttonsRef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/events/past" className="cursor-pointer">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 *text-sm font-semibold *uppercase border-[1.5px] border-primary transition-all *hover:scale-105"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Découvrir les webinaires
            </Button>
          </Link>
          <Link href="/events/upcoming" className="cursor-pointer">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold *uppercase border-[1.5px] transition-all *hover:scale-105 bg-transparent text-white border-white hover:bg-white/10"
            >
              Voir les événements
            </Button>
          </Link>
        </div>
      </div>

      {/* Styles globaux pour les animations */}
      <style jsx global>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(5deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, 15px) rotate(-3deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -10px) rotate(2deg); }
        }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 12s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;