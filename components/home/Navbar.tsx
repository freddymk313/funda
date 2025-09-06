"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const links = [
  { label: "Accueil", href: "/" },
  {
    label: "Événements",
    children: [
      { label: "Événements à venir", href: "/events/upcoming" },
      { label: "Événements passés", href: "/events/past" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuContainerRef = useRef<HTMLUListElement>(null)
  const dropdownRefs = useRef<{[key: string]: HTMLUListElement | null}>({})

  // Animation de la navbar au scroll
  useEffect(() => {
    if (!headerRef.current) return

    const header = headerRef.current
    const headerHeight = header.offsetHeight

    // Initialiser la position hors écran
    gsap.set(header, { y: -headerHeight })

    // Animation d'entrée au scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const scrollY = self.scroll()
        
        if (scrollY > 100 && !isScrolled) {
          setIsScrolled(true)
          // Animation d'entrée depuis le haut
          gsap.to(header, {
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true
          })
        } else if (scrollY <= 100 && isScrolled) {
          setIsScrolled(false)
          // Animation de sortie vers le haut
          gsap.to(header, {
            y: -headerHeight,
            duration: 0.4,
            ease: "power2.in",
            overwrite: true
          })
        }

        // Effet de réduction légère de la hauteur et opacité lors du scroll
        if (scrollY > 50) {
          gsap.to(header, {
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            duration: 0.3,
            ease: "power2.out"
          })
        } else {
          gsap.to(header, {
            paddingTop: "1rem",
            paddingBottom: "1rem",
            duration: 0.3,
            ease: "power2.out"
          })
        }
      }
    })

    // Nettoyage
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isScrolled])

  // Animation d'ouverture/fermeture du menu mobile
  useEffect(() => {
    if (!menuRef.current || !menuContainerRef.current) return

    const menuItems = menuContainerRef.current.querySelectorAll("li")
    
    if (isMenuOpen) {
      // Ouverture du menu avec animation
      gsap.to(menuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })

      // Animation des items en séquence
      gsap.fromTo(menuItems, 
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.1
        }
      )
    } else {
      // Fermeture du menu avec animation
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in"
      })
    }
  }, [isMenuOpen])

  // Animation des dropdowns
  useEffect(() => {
    if (openDropdown && dropdownRefs.current[openDropdown]) {
      const dropdown = dropdownRefs.current[openDropdown]
      if (dropdown) {
        gsap.fromTo(dropdown, 
          {
            height: 0,
            opacity: 0
          },
          {
            height: "auto",
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          }
        )
      }
    }

    // Fermeture des dropdowns
    Object.keys(dropdownRefs.current).forEach(key => {
      if (key !== openDropdown && dropdownRefs.current[key]) {
        const dropdown = dropdownRefs.current[key]
        if (dropdown) {
          gsap.to(dropdown, {
            height: 0,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in"
          })
        }
      }
    })
  }, [openDropdown])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      setOpenDropdown(null)
    }
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <header 
      ref={headerRef}
      className="shadow-sm bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 fixed top-0 w-full z-50 transition-all duration-300"
      style={{ transform: 'translateY(-100%)' }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-16 lg:px-20 transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image 
            src={"/logo/logo-3.png"} 
            alt="logo" 
            width={48} 
            height={48}
            className="hover:scale-105 transition-transform duration-200"
          />
        </Link>

        <div className="flex items-center gap-6">
          {/* Menu desktop */}
          <NavigationMenu className="hidden md:flex gap-6 ml-6 font-semibold text-base items-center">
            <NavigationMenuList className="gap-1">
              {links.map((link) => (
                <NavigationMenuItem key={link.label}>
                  {link.children ? (
                    <>
                      <NavigationMenuTrigger
                        className={`px-3 py-2 text-base transition-colors hover:text-primary data-[state=open]:text-primary ${
                          pathname.startsWith(link.href || "/events")
                            ? "text-primary"
                            : "text-foreground/90"
                        }`}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-2 bg-background border shadow-lg rounded-lg">
                        <ul className="flex flex-col gap-1 w-48">
                          {link.children.map((sublink) => (
                            <li key={sublink.label}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={sublink.href}
                                  className={`block px-3 py-2 rounded-md text-base transition-colors hover:bg-accent hover:text-accent-foreground ${
                                    pathname === sublink.href
                                      ? "bg-accent text-accent-foreground"
                                      : ""
                                  }`}
                                >
                                  {sublink.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={`px-3 py-2 rounded-md text-base transition-colors hover:text-primary ${
                          pathname === link.href
                            ? "text-primary"
                            : "text-foreground/90"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Bouton + menu mobile */}
          <div className="flex flex-row items-center gap-4">
            <a
              href="https://wa.me/243991040032"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Button 
                className="rounded-full py-5 px-6 text-base font-semibold transition-all hover:scale-105 hover:shadow-lg"
                size="lg"
              >
                Rejoindre
              </Button>
            </a>

            <div className="flex md:hidden items-center">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-foreground" />
                ) : (
                  <Menu size={24} className="text-foreground" />
                )}
              </button>

              {/* Menu mobile avec animation GSAP */}
              <div
                ref={menuRef}
                className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <ul ref={menuContainerRef} className="flex flex-col px-6 py-4 gap-2">
                  <li className="sm:hidden mb-2">
                    <a
                      href="https://wa.me/243991040032"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full rounded-full py-4 text-base font-semibold">
                        Rejoindre
                      </Button>
                    </a>
                  </li>
                  
                  {links.map((link) => (
                    <li key={link.label} className="w-full">
                      {link.children ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(link.label)}
                            className={`w-full flex justify-between items-center px-4 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ${
                              openDropdown === link.label
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground hover:bg-accent/50"
                            }`}
                          >
                            {link.label}
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-200 ${
                                openDropdown === link.label ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <ul
                            ref={el => dropdownRefs.current[link.label] = el}
                            className="ml-4 overflow-hidden"
                            style={{ height: 0 }}
                          >
                            {link.children.map((sublink) => (
                              <li key={sublink.label}>
                                <Link
                                  href={sublink.href}
                                  className={`block px-4 py-3 text-base rounded-lg transition-colors duration-200 hover:bg-accent hover:text-accent-foreground ${
                                    pathname === sublink.href
                                      ? "bg-accent text-accent-foreground font-medium"
                                      : "text-foreground/90"
                                  }`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sublink.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className={`block w-full px-4 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 ${
                            pathname === link.href
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground hover:bg-accent/50"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar