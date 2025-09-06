"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, BookOpen, Calendar, Clock, Code, Eye, Heart, Share2, Sparkles, User } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const articles = [
  {
    id: 1,
    title: "Introduction au développement web moderne",
    excerpt: "Découvrez les fondamentaux du développement web avec les dernières technologies et meilleures pratiques.",
    image: "/img/6.jpeg",
    category: "Développement",
    author: "Dr. Sarah Tech",
    date: "15 Jan 2025",
    readTime: "5 min",
    tags: ["HTML", "CSS", "JavaScript"],
    likes: 42,
    views: 156
  },
  {
    id: 2,
    title: "Python pour la data science : par où commencer ?",
    excerpt: "Un guide complet pour débuter en data science avec Python et ses bibliothèques essentielles.",
    image: "/img/8.jpeg",
    category: "Data Science",
    author: "Prof. Data Analyst",
    date: "12 Jan 2025",
    readTime: "8 min",
    tags: ["Python", "Pandas", "NumPy"],
    likes: 28,
    views: 89
  },
  {
    id: 3,
    title: "Sécurité cloud : meilleures pratiques en 2025",
    excerpt: "Protégez vos infrastructures cloud avec les dernières techniques de sécurité et conformité.",
    image: "/img/5.jpeg",
    category: "Sécurité",
    author: "Expert Cyber",
    date: "10 Jan 2025",
    readTime: "6 min",
    tags: ["Cloud", "Sécurité", "DevOps"],
    likes: 35,
    views: 123
  },
]

export default function ArticlesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const particlesRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    // Création des particules décoratives
    const createParticles = () => {
      if (!particlesRef.current) return [];
      
      const particles = [];
      const colors = ['var(--primary)', 'var(--accent)', 'var(--ring)', '#4DCFE0'];
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full opacity-30';
        particle.style.width = `${Math.random() * 10 + 3}px`;
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
    })

    tl.fromTo(particles, 
      { scale: 0, opacity: 0, y: 20 },
      { 
        scale: 1, 
        opacity: 0.3, 
        y: 0,
        duration: 1.2, 
        stagger: 0.05,
        ease: "back.out(1.8)"
      }
    )
    .fromTo(sectionRef.current?.querySelector("h2")!, {
      y: 50,
      opacity: 0,
      filter: "blur(10px)",
      scale: 0.95
    }, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .fromTo(sectionRef.current?.querySelector("p")!, {
      y: 30,
      opacity: 0,
      filter: "blur(8px)"
    }, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .fromTo(cardsRef.current, {
      y: 60,
      opacity: 0,
      rotationY: -5,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      rotationY: 0,
      scale: 1,
      stagger: 0.2,
      duration: 0.9,
      ease: "back.out(1.8)"
    }, "-=0.4")

    // Animation continue des particules
    gsap.to(particles, {
      y: (i) => i % 2 === 0 ? -15 : 15,
      x: (i) => i % 3 === 0 ? -10 : 10,
      rotation: 25,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Animation au survol des cartes
    cardsRef.current.forEach((card, index) => {
      card.addEventListener('mouseenter', () => setHoveredCard(index))
      card.addEventListener('mouseleave', () => setHoveredCard(null))
    })

    return () => {
      tl.kill();
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent opacity-50 -z-10" />
      
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary/15 rounded-full blur-4xl opacity-30" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/15 rounded-full blur-4xl opacity-25" />

      <div className="container mx-auto px-4 md:px-16 lg:px-20 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm border border-primary/25 rounded-full px-5 py-2.5 mb-6">
            <Sparkles size={18} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Ressources récentes</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block mb-3 text-foreground/90">Explorez nos</span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-ring bg-clip-text text-transparent">
                Articles & Guides
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-primary/20 blur-xl -z-10" />
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-light">
            Découvrez nos dernières publications et ressources expertes pour développer 
            vos compétences en informatique et rester à la pointe de la technologie.
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article 
              key={index}
              ref={el => { if (el) cardsRef.current[index] = el }}
              className="group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-gradient-to-b from-white to-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 h-full flex flex-col border-2 border-white/20">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Badge de catégorie */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md border border-white/20"
                      style={{
                        background: "linear-gradient(45deg, var(--primary), var(--accent))",
                        color: "var(--primary-foreground)"
                      }}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Overlay d'interaction */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500" />
                </div>

                {/* Contenu */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    <Link href={`/blog/${article.id}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-muted-foreground mb-4 flex-1 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full text-xs font-medium border border-border/50 bg-background/50 backdrop-blur-sm"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Métadonnées */}
                  <div className="flex items-center justify-between gap-4 text-sm mb-4 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {article.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {article.views}
                      </div>
                    </div>
                  </div>

                  {/* Footer de carte */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground/80">{article.author}</span>
                    </div>

                    <Link
                      href={`/blog/${article.id}`}
                      className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group/readmore"
                    >
                      <span className="text-sm">Lire</span>
                      <ArrowRight className="w-4 h-4 group-hover/readmore:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Élément décoratif */}
                <div className="absolute -z-10 -bottom-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
              </div>
            </article>
          ))}
        </div>

        {/* Bouton "Voir plus" */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="group relative overflow-hidden px-8 py-6 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300"
            style={{
              background: "linear-gradient(45deg, var(--primary), var(--accent))",
              color: "var(--primary-foreground)",
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Explorer tous les articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </div>

      {/* Styles globaux pour les animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-10px) rotate(2deg);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  )
}