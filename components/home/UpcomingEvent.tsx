"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, MapPin, ArrowRight, Sparkles, Eye, Users, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function UpcomingEvent() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

 useEffect(() => {
  if (!sectionRef.current) return;

  const createParticles = () => {
    if (!particlesRef.current) return [];
    const colors = ['var(--primary)', 'var(--accent)', 'var(--ring)', '#4DCFE0'];
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 15; i++) {
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

  // Affichage initial
  gsap.set([cardRef.current], { opacity: 1, y: 0, scale: 1 });
  gsap.set(".event-date, .event-image, .event-title, .event-detail, .event-button", { opacity: 1 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });

  tl.fromTo(particles, { scale: 0, opacity: 0, y: 20 }, 
            { scale: 1, opacity: 0.4, y: 0, duration: 1.2, stagger: 0.05, ease: "back.out(1.8)" })
    .fromTo(cardRef.current, { opacity: 0, y: 80, rotationY: -5, scale: 0.95 }, 
            { opacity: 1, y: 0, rotationY: 0, scale: 1, duration: 1.1, ease: "power3.out" }, "-=0.8");

  gsap.to(particles, { y: (i) => i % 2 === 0 ? -15 : 15, x: (i) => i % 3 === 0 ? -10 : 10, rotation: 30, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });

  gsap.to(".event-date", { scale: 1.02, boxShadow: "0 8px 25px rgba(0, 150, 178, 0.3)", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (particlesRef.current) particlesRef.current.innerHTML = '';
  };
}, []);


  return (
    <section ref={sectionRef} className="relative py-16 md:py-28 overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary/15 rounded-full blur-4xl opacity-30" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/15 rounded-full blur-4xl opacity-25" />
      
      {/* Particules */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-16 lg:px-20 relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm border border-primary/25 rounded-full px-5 py-2.5 mb-6">
            <Sparkles size={18} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Événement à venir</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ne manquez pas notre prochain événement
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rejoignez-nous pour une session exceptionnelle avec des experts du domaine
          </p>
        </div>

        <div
          ref={cardRef}
          className="max-w-6xl mx-auto bg-gradient-to-br from-white to-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-white/20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Date */}
            <div className="event-date flex flex-col items-center justify-center p-8 lg:p-10 shrink-0 bg-gradient-to-br from-primary to-accent text-primary-foreground relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10"></div>
              <Calendar className="w-10 h-10 mb-3 relative z-10" />
              <span className="text-sm font-semibold uppercase tracking-wider relative z-10">Janvier</span>
              <span className="text-5xl font-bold mt-2 relative z-10">25</span>
              <span className="text-base mt-3 relative z-10">2025</span>
              
              {/* Élément décoratif */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
            </div>

            {/* Image */}
            <div className="event-image relative w-full lg:w-2/5 min-h-[350px] lg:min-h-[450px] overflow-hidden">
              <Image
                src="/img/meet.jpg"
                alt="Atelier de programmation Python"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Badge sur l'image */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                <span className="text-sm font-medium text-primary">En ligne</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center bg-white/5 backdrop-blur-sm">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1 mb-4">
                  <Eye size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Événement spécial</span>
                </div>
                
                <h3 className="event-title text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                  Le rôle du cloud computing dans la transformation numérique
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Une exploration approfondie des technologies cloud et leur impact sur 
                  la transformation digitale des entreprises modernes.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="event-detail flex items-center gap-4 p-3 rounded-xl bg-muted/30">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <span className="text-sm text-muted-foreground">Horaires</span>
                    <p className="font-medium text-foreground">19h00 - 20h00 (GMT+1)</p>
                  </div>
                </div>

                <div className="event-detail flex items-center gap-4 p-3 rounded-xl bg-muted/30">
                  <User className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <span className="text-sm text-muted-foreground">Intervenant</span>
                    <p className="font-medium text-foreground">Albert GUBANJA</p>
                    <p className="text-sm text-muted-foreground">Expert Cloud & DevOps</p>
                  </div>
                </div>

                <div className="event-detail flex items-center gap-4 p-3 rounded-xl bg-muted/30">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <span className="text-sm text-muted-foreground">Lieu</span>
                    <p className="font-medium text-foreground">Plateforme en ligne</p>
                    <p className="text-sm text-muted-foreground">Lien Zoom fourni après inscription</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a 
                  href="https://wa.me/243991040032" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="event-button group flex-1"
                >
                  <Button
                    className="w-full rounded-xl py-6 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 group-hover:shadow-primary/25"
                    size="lg"
                    style={{
                      background: "linear-gradient(45deg, var(--primary), var(--accent))",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    S'inscrire maintenant
                  </Button>
                </a>

                <Link href={"/events/upcoming"} className="event-button flex-1">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl py-6 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Voir les détails
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/30">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users size={16} />
                  <span>42 personnes inscrites</span>
                </div>
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Share2 size={16} />
                  Partager
                </button>
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
        
        .event-date {
          box-shadow: 0 10px 30px rgba(0, 150, 178, 0.25);
        }
        
        .event-image {
          transition: transform 0.7s ease;
        }
        
        .event-image:hover {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}