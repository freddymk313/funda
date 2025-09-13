"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Facebook, MessageCircle, Youtube, Linkedin, Mail, MapPin, Phone, Send, ChevronRight, Heart, Sparkles, ArrowUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const columnsRef = useRef<HTMLDivElement[]>([])
  const particlesRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

useEffect(() => {
  if (!footerRef.current) return;

  const createParticles = () => {
    if (!particlesRef.current) return [];
    const colors = ['#4DCFE0', '#0096B2', '#006F82', '#0799ba'];
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full opacity-20';
      particle.style.width = `${Math.random() * 8 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 4}s`;
      particle.style.filter = 'blur(1px)';
      particlesRef.current.appendChild(particle);
      particles.push(particle);
    }
    return particles;
  };

  const particles = createParticles();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: footerRef.current,
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });

  tl.fromTo(particles, { scale: 0, opacity: 0, y: 20 }, { scale: 1, opacity: 0.3, y: 0, duration: 1.5, stagger: 0.02, ease: "back.out(1.8)" })
    .fromTo(".footer-logo", { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }, "-=1")
    .fromTo(".footer-column", { y: 50, opacity: 0, stagger: 0.15 }, { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.6)" }, "-=0.8")
    .fromTo(".footer-bottom", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

  gsap.to(particles, { y: (i) => i % 2 === 0 ? -10 : 10, x: (i) => i % 3 === 0 ? -8 : 8, rotation: 20, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".scroll-top", { scrollTrigger: { trigger: footerRef.current, start: "top 50%", toggleActions: "play none none none" }, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (particlesRef.current) particlesRef.current.innerHTML = '';
  };
}, []);


  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setEmail("")
        setIsSubscribed(false)
      }, 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-[var(--foreground)] to-[#023642] text-white overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--foreground)] to-transparent opacity-50"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary/20 rounded-full blur-4xl opacity-20"></div>
      <div className="absolute top-20 left-20 w-48 h-48 bg-accent/20 rounded-full blur-4xl opacity-15"></div>

      <div className="container mx-auto px-4 md:px-16 lg:px-20 pt-16 md:pt-20 pb-8 relative z-10">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {/* Colonne 1 - Logo et description */}
          <div className="footer-logo footer-column lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo/logo-3.png"
                  alt="Funda Logo"
                  width={50}
                  height={50}
                  className="hover:scale-110 transition-transform duration-300"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent">
                  FUNDA
                </span>
              </div>
            </Link>
            <p className="mb-6 text-white/80 leading-relaxed text-sm md:text-base">
              Plateforme numérique guidant les nouveaux apprenants en informatique vers 
              l'excellence grâce à des formations adaptées et un mentorat personnalisé.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook", color: "hover:text-blue-400" },
                { icon: MessageCircle, label: "WhatsApp", color: "hover:text-green-400" },
                { icon: Youtube, label: "YouTube", color: "hover:text-red-400" },
                { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-500" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div className="footer-column space-y-5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--accent)]" />
              Liens rapides
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Accueil", href: "/" },
                { label: "Événements", href: "/events/upcoming" },
                { label: "Blog", href: "/blog" },
                { label: "Ressources", href: "/resources" },
                { label: "Contact", href: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 group text-white/80 hover:text-white transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4 text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Contact */}
          <div className="footer-column space-y-5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[var(--accent)]" />
              Contactez-nous
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                <span className="text-white/80 group-hover:text-white transition-colors text-sm">
                  15, chaussée de Kasenga,<br />Bel air, Lubumbashi, RDC
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                <a
                  href="mailto:info@funda-online.com"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  info@funda-online.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                <a
                  href="tel:+243973900363"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  +243 973 900 363
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 - Newsletter */}
          <div className="footer-column space-y-5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-[var(--accent)]" />
              Newsletter
            </h3>
            <p className="text-white/80 text-sm mb-4">
              Restez informé de nos dernières actualités et événements.
            </p>
            
            {isSubscribed ? (
              <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">Merci pour votre abonnement !</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 pr-12 py-3 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                    required
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute top-1/2 right-1 -translate-y-1/2 rounded-xl p-2 bg-[var(--accent)] hover:bg-[var(--primary)] transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-white/60 text-xs">
                  Nous respectons votre vie privée. Aucun spam.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bas du footer */}
        <div className="footer-bottom border-t border-white/20 mt-12 md:mt-16 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-[var(--accent)] fill-current" />
              <span>by Funda Team</span>
            </div>
            
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
              <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                Conditions
              </Link>
              <Link href="/cookies" className="text-white/70 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
            
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} Funda. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>

      {/* Bouton scroll to top */}
      <button
        onClick={scrollToTop}
        className="scroll-top fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white p-3 rounded-xl shadow-2xl hover:scale-110 transition-all duration-300 opacity-0 translate-y-10 z-50"
        aria-label="Remonter en haut"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Styles globaux pour les animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-8px) rotate(2deg);
          }
        }
      `}</style>
    </footer>
  )
}