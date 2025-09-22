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
import { useState, useEffect, useRef } from "react"
import { FaWhatsapp } from "react-icons/fa6"
import { TbMenu } from "react-icons/tb"

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
  const [isAnimating, setIsAnimating] = useState(false)

  // ref pour mesurer la hauteur de la navbar
  const headerRef = useRef<HTMLElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number>(0)

  useEffect(() => {
    const update = () => {
      const h = headerRef.current?.getBoundingClientRect().height ?? 0
      setHeaderHeight(Math.round(h))
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Fermer le menu quand on change de page
  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Empêcher le scroll du body quand le menu est ouvert (et gérer l'animation de sortie)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
      setIsAnimating(true)
    } else {
      document.body.style.overflow = "unset"
      const timer = setTimeout(() => setIsAnimating(false), 300) // durée CSS de l'animation
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    // header garde z élevé pour rester au dessus du menu mobile
    <header ref={headerRef} className="shadow-sm sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-16 lg:px-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src={"/logo/logo-3.png"} alt="logo" width={48} height={48} />
        </Link>

        <div className="flex items-center gap-6">
          {/* Menu desktop */}
          <NavigationMenu className="hidden md:flex gap-6 ml-6 font-semibold text-base text-gray-700 items-center">
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationMenuItem key={link.label}>
                  {link.children ? (
                    <>
                      <NavigationMenuTrigger
                        className={`px-3 text-base ${
                          pathname === link.href ? "text-primary" : "hover:text-primary"
                        }`}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-2 bg-white shadow-white">
                        <ul className="flex flex-col gap-2 w-48">
                          {link.children.map((sublink) => (
                            <li key={sublink.label}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={sublink.href}
                                  className="block px-2 py-2 rounded-md text-base hover:bg-gray-100"
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
                    <NavigationMenuLink asChild className="text-base">
                      <Link
                        href={link.href}
                        className={`px-3 ${
                          pathname === link.href ? "text-primary" : "hover:text-primary"
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

          {/* Boutons + menu mobile */}
          <div className="flex flex-row items-center gap-1">
            {/* Bouton WhatsApp desktop */}
            <a
              href="https://whatsapp.com/channel/0029Vaq7xx82Jl8IT3kiwg36"
              target="_blank"
              rel="noopener noreferrer"
              // className="hidden sm:block"
            >
              <Button className="*hidden *md:flex rounded-full py-[22.5px] text-base font-semibold">
                <FaWhatsapp className="h-6 w-6 md:h-7 md:w-7" />
                <span>Rejoindre</span>
              </Button>

              {/* <button
              // onClick={handleShare}
              className="md:hidden flex items-center gap-1 md:gap-2 px-6 py-2.5 md:py-3 border border-primary bg-primary rounded-full text-white hover:text-white hover:bg-primary transition-all"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span className="text-sm font-semibold">Rejoindre</span>
            </button> */}
            </a>

            {/* Burger menu */}
            <div className="flex md:hidden items-center justify-between">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                {/* {isMenuOpen ? <X size={24} /> : <TbMenu size={24} />} */}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------
          MENU MOBILE (fixed, sous la navbar)
          - md:hidden pour n'afficher que sur mobile
          - header a z-50 ; menu z-40 ; overlay z-30
         ------------------------- */}
      {(isMenuOpen || isAnimating) && (
        <>
          {/* Overlay sombre — sous la navbar (z-30) */}
          <div
            className={`md:hidden fixed inset-0 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            style={{ zIndex: 30 }}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Panneau mobile fixé — commence à top = headerHeight px, ne pousse pas la page */}
          <div
            // fixed afin de ne pas pousser le contenu, top calculé pour coller sous la navbar
            className={`md:hidden fixed left-0 right-0 transition-transform duration-300 ease-out`}
            style={{
              top: `${headerHeight}px`,
              zIndex: 40,
              transform: isMenuOpen ? "translateY(0)" : "translateY(-100%)",
              maxHeight: `calc(100vh - ${headerHeight}px)`,
            }}
          >
            <div className="bg-background shadow-lg overflow-y-auto">
              <ul className="flex flex-col px-4 py-4 gap-1">
                {links.map((link) => (
                  <li key={link.label} className="w-full">
                    {link.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setOpenDropdown(openDropdown === link.label ? null : link.label)
                          }
                          className={`w-full flex justify-between items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                            openDropdown === link.label
                              ? "*bg-accent *text-accent-foreground"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          {link.label}
                          <ChevronDown
                            size={18}
                            className={`transition-transform ${
                              openDropdown === link.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openDropdown === link.label && (
                          <ul className="mx-4 mb-2 flex flex-col gap-1 border-t border-foreground/20 pt-3">
                            {link.children.map((sublink) => (
                              <li key={sublink.label}>
                                <Link
                                  href={sublink.href}
                                  className="block px-4 py-2.5 text-base rounded-md font-medium hover:bg-muted transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sublink.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={`block w-full px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                          pathname === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
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
        </>
      )}
    </header>
  )
}

export default Navbar