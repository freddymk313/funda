"use client"

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Données d'exemple pour les articles
const blogPosts = [
  {
    id: 1,
    title: "Introduction au développement web moderne",
    excerpt: "Découvrez les fondamentaux du développement web avec les dernières technologies et meilleures pratiques.",
    image: "/images/blog/web-dev.jpg",
    category: "Développement",
    author: "Dr. Sarah Tech",
    date: "15 Jan 2025",
    readTime: "5 min",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 2,
    title: "Python pour la data science : par où commencer ?",
    excerpt: "Un guide complet pour débuter en data science avec Python et ses bibliothèques essentielles.",
    image: "/images/blog/python-ds.jpg",
    category: "Data Science",
    author: "Prof. Data Analyst",
    date: "12 Jan 2025",
    readTime: "8 min",
    tags: ["Python", "Pandas", "NumPy"]
  },
  {
    id: 3,
    title: "Cybersécurité : les bonnes pratiques essentielles",
    excerpt: "Protégez vos données et systèmes avec ces pratiques de sécurité fondamentales.",
    image: "/images/blog/cybersecurity.jpg",
    category: "Sécurité",
    author: "Expert Security",
    date: "10 Jan 2025",
    readTime: "6 min",
    tags: ["Sécurité", "VPN", "Cryptographie"]
  },
  {
    id: 4,
    title: "React vs Vue : lequel choisir en 2025 ?",
    excerpt: "Comparaison détaillée des deux frameworks JavaScript les plus populaires.",
    image: "/images/blog/react-vue.jpg",
    category: "Frontend",
    author: "Dev Frontend",
    date: "8 Jan 2025",
    readTime: "10 min",
    tags: ["React", "Vue", "JavaScript"]
  },
  {
    id: 5,
    title: "L'IA dans le développement web : tendances 2025",
    excerpt: "Comment l'intelligence artificielle transforme le paysage du développement web.",
    image: "/images/blog/ai-web.jpg",
    category: "IA",
    author: "AI Specialist",
    date: "5 Jan 2025",
    readTime: "7 min",
    tags: ["IA", "Machine Learning", "Web"]
  },
  {
    id: 6,
    title: "Débuter avec Docker : un guide pratique",
    excerpt: "Apprenez à containeriser vos applications avec Docker étape par étape.",
    image: "/images/blog/docker.jpg",
    category: "DevOps",
    author: "DevOps Engineer",
    date: "3 Jan 2025",
    readTime: "9 min",
    tags: ["Docker", "Conteneurs", "DevOps"]
  }
]

const categories = [
  { name: "Développement", count: 12 },
  { name: "Data Science", count: 8 },
  { name: "Sécurité", count: 6 },
  { name: "Frontend", count: 10 },
  { name: "IA", count: 7 },
  { name: "DevOps", count: 5 }
]

const popularTags = [
  "JavaScript", "Python", "React", "Vue", "Node.js", "Docker",
  "Cybersécurité", "IA", "Machine Learning", "Web Design"
]

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    })

    tl.from(sectionRef.current?.querySelector("h1")!, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(sectionRef.current?.querySelector("p")!, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(".blog-search", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.3")
    .from(".blog-post", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, "-=0.2")

    return () => {
      tl.kill();
    }
  }, [])

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="relative overflow-hidden">
      {/* Section Hero */}
      <section className="relative py-28 px-6 text-center bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog Funda</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Découvrez nos articles, tutoriels et actualités pour maîtriser l'informatique
          </p>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-white animate-float-1"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-white animate-float-2"></div>
        </div>
      </section>

      {/* Section principale */}
      <section ref={sectionRef} className="relative py-20 px-6 bg-[var(--muted)]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Barre de recherche */}
              <div className="blog-search bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--foreground)" }}>
                  Rechercher
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: "var(--muted-foreground)" }} />
                  <input
                    type="text"
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition-all"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>
              </div>

              {/* Catégories */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--foreground)" }}>
                  Catégories
                </h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all ${
                        !selectedCategory ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--secondary)]'
                      }`}
                    >
                      Tous les articles
                    </button>
                  </li>
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left py-2 px-3 rounded-lg transition-all flex justify-between items-center ${
                          selectedCategory === category.name ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--secondary)]'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm opacity-70">({category.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags populaires */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--foreground)" }}>
                  Tags populaires
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--muted-foreground)"
                      }}
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-sm opacity-90 mb-4">
                  Recevez les nouveaux articles directement dans votre boîte mail
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white"
                  />
                  <button className="w-full bg-white text-[var(--primary)] py-2 rounded-lg font-medium hover:bg-gray-100 transition-all">
                    S'abonner
                  </button>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-3">
              {/* En-tête */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  {selectedCategory ? `Articles : ${selectedCategory}` : 'Tous les articles'}
                </h2>
                <p style={{ color: "var(--muted-foreground)" }}>
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} trouvé{filteredPosts.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Grille d'articles */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="blog-post group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              backgroundColor: "var(--primary)",
                              color: "var(--primary-foreground)"
                            }}
                          >
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>

                      {/* Contenu */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--primary)] transition-colors">
                          <Link href={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 mb-4 flex-1" style={{ color: "var(--muted-foreground)" }}>
                          {post.excerpt}
                        </p>

                        {/* Métadonnées */}
                        <div className="flex items-center gap-4 text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded text-xs"
                              style={{
                                backgroundColor: "var(--secondary)",
                                color: "var(--muted-foreground)"
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Lire la suite */}
                        <Link
                          href={`/blog/${post.id}`}
                          className="flex items-center gap-2 text-[var(--primary)] font-medium hover:gap-3 transition-all"
                        >
                          <span>Lire l'article</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex gap-2">
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all ${
                          page === 1
                            ? 'bg-[var(--primary)] text-white'
                            : 'bg-white text-gray-600 hover:bg-[var(--secondary)]'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* Aucun résultat */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
                    Aucun article trouvé
                  </h3>
                  <p style={{ color: "var(--muted-foreground)" }}>
                    Essayez de modifier vos critères de recherche
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-20 -z-10"></div>
      </section>

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
    </div>
  )
}

export default BlogPage