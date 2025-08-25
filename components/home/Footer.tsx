"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const columnsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    })

    tl.from(footerRef.current?.querySelector(".footer-logo")!, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    // .from(columnsRef.current, {
    //   y: 40,
    //   opacity: 0,
    //   stagger: 0.15,
    //   duration: 0.6,
    //   ease: "power3.out"
    // }, "-=0.4")
    .from(footerRef.current?.querySelector(".footer-bottom")!, {
      y: 20,
      opacity: 0,
      duration: 0.5
    }, "-=0.3")

    return () => { tl.kill(); }
  }, [])

  return (
    <footer 
      ref={footerRef}
      className="relative bg-[var(--foreground)] text-white overflow-hidden"
    >
      {/* Éléments décoratifs */}
      {/* <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--primary)] animate-float-1"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-[var(--accent)] animate-float-2"></div>
      </div> */}

      <div className="container mx-auto px-4 md:px-16 lg:px-20 pt-16 relative z-10">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Colonne 1 - Logo et description */}
          <div 
            ref={el => { columnsRef.current[0] = el as HTMLDivElement }}
            className="footer-logo"
          >
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/logo/logo-2.webp" 
                alt="Funda Logo" 
                width={47} 
                height={47}
              />
            </Link>
            <p className="mb-6 opacity-80">
              Funda accompagne les nouveaux apprenants en informatique avec des 
              ressources pédagogiques de qualité et une communauté bienveillante.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div 
            ref={el => { columnsRef.current[1] = el as HTMLDivElement }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              {[
                { label: "Accueil", href: "/" },
                { label: "Événements", href: "/events" },
                { label: "Blog", href: "/blog" },
                { label: "Ressources", href: "/resources" },
                { label: "Contact", href: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="opacity-80 hover:opacity-100 hover:underline transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Ressources */}
          <div 
            ref={el => { columnsRef.current[2] = el as HTMLDivElement }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Ressources</h3>
            <ul className="space-y-3">
              {[
                { label: "Documentation", href: "/docs" },
                { label: "Tutoriels", href: "/tutorials" },
                { label: "FAQ", href: "/faq" },
                { label: "Mentors", href: "/mentors" },
                { label: "Forum", href: "/forum" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="opacity-80 hover:opacity-100 hover:underline transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div 
            ref={el => { columnsRef.current[3] = el as HTMLDivElement }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Contactez-nous</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="opacity-80">
                  123 Av. Lumumba,<br />
                  Lubumbashi, Haut katanga, RDC
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <a 
                  href="mailto:contact@funda.fr" 
                  className="opacity-80 hover:opacity-100 hover:underline transition-all"
                >
                  contact@funda.cd
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <a 
                  href="tel:+243990000000" 
                  className="opacity-80 hover:opacity-100 hover:underline transition-all"
                >
                  +243 990 000 000
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">NEWSLETTER</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 bg-white/10 relative border border-white/20 rounded-full px-4 py-2 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
                <Button 
                  className="absolute rounded-full"
                  aria-label="S'abonner à la newsletter"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="footer-bottom border-t border-white/10 mt-16 py-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-70">
              © {new Date().getFullYear()} Funda. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm opacity-70 hover:opacity-100 transition-all">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-sm opacity-70 hover:opacity-100 transition-all">
                Conditions d'utilisation
              </Link>
              <Link href="/cookies" className="text-sm opacity-70 hover:opacity-100 transition-all">
                Préférences cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Styles d'animation */}
      <style jsx global>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 15px) rotate(3deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, 15px) rotate(-3deg); }
        }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
      `}</style>
    </footer>
  )
}