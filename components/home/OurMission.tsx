"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "../ui/button";

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger);

const OurMission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation au scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(
      textRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      imageRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative container px-4 md:px-16 lg:px-20 mx-auto grid md:grid-cols-2 gap-12 items-center py-24 overflow-hidden"
    >
      {/* Fond décoratif */}
      {/* <div className="absolute -top-20 -right-24 w-64 h-64 rounded-full bg-[var(--accent)] opacity-10 blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -left-24 w-64 h-64 rounded-full bg-[var(--primary)] opacity-10 blur-3xl -z-10"></div> */}

      {/* Contenu texte */}
      <div
        ref={textRef}
        className="space-y-6"
      >
        <h2
          className="text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight"
          style={{ color: "var(--foreground)" }}
        >
          Donner du pouvoir à la prochaine génération des{' '}
          <span
            className="relative inline-block text-3xl md:text-4xl uppercase"
            style={{ color: "var(--primary)" }}
          >
            leaders technologiques
            {/* <span 
              className="absolute bottom-1 left
                backgroundColor: "var(--accent)",
                transform: "skewX(-15deg)"
              }}
            ></span> */}
          </span>
        </h2>

        <div className="space-y-4">
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Chez Funda, nous pensons que tout le monde mérite d'avoir accès à une
            formation de qualité.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Notre mission est d'accompagner les jeunes, étudiants et passionnés
            dans leur apprentissage de l'informatique.
          </p>
        </div>

        {/* <div className="pt-4"> */}
          <Button 
          size="lg"
            className="rounded-full *px-8 py-6 text-sm font-semibold border border-primary uppercase *shadow-lg *hover:shadow-xl transition-all"
          >
            Découvrir notre approche
          </Button>
          {/* <button 
            className="group relative inline-flex items-center px-6 py-3 rounded-full font-medium transition-all"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)"
            }}
          >
            <span className="relative z-10">Découvrir notre approche</span>
            <span 
              className="absolute right-4 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: "var(--primary-foreground)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                backgroundColor: "var(--accent)",
                boxShadow: "0 0 0 2px var(--accent)"
              }}
            ></span>
          </button> */}
        {/* </div> */}
      </div>

      {/* Contenu image */}
      <div
        ref={imageRef}
        className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden *shadow-xl"
      >
        {/* Placeholder remplacé par une image réelle */}
        <div className="absolute inset-0 *bg-gradient-to-br *from-[var(--primary)] *to-[var(--accent)] bg-primary *opacity-20"></div>
        <Image
          src="/img/our.jpg"
          alt="Étudiants en informatique"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Élément décoratif */}
        {/* <div
          className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full"
          style={{ backgroundColor: "var(--accent)", opacity: 0.3 }}
        ></div> */}
      </div>
    </section>
  );
};

export default OurMission;