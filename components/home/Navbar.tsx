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
import { useState, useEffect } from "react"
import { FaWhatsapp } from "react-icons/fa6"

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

  // Fermer le menu quand on change de page
  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Empêcher le défilement du body quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      setIsAnimating(true)
    } else {
      document.body.style.overflow = 'unset'
      // On laisse un petit délai pour l'animation de fermeture
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="shadow-sm sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-16 lg:px-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src={"/logo/logo-3.png"} alt="logo" width={48} height={48} />
        </Link>

        <div className="flex items-center gap-6">
          {/* Menu desktop */}
          <NavigationMenu className="hidden md:flex gap-6 ml-6 font-semibold *text-base text-gray-700 items-center">
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationMenuItem key={link.label}>
                  {link.children ? (
                    <>
                      <NavigationMenuTrigger
                        className={`px-3 text-base ${pathname === link.href
                          ? "text-primary"
                          : "hover:text-primary"
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
                        className={`px-3 ${pathname === link.href
                          ? "text-primary"
                          : "hover:text-primary"
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
          <div className="flex flex-row items-center gap-1">
            <a
              href=" https://whatsapp.com/channel/0029Vaq7xx82Jl8IT3kiwg36"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Button className="rounded-full py-[22.5px] text-base font-semibold">
                <FaWhatsapp className="h-6 w-6 md:h-7 md:w-7" />
                <span>Rejoindre</span>
              </Button>
            </a>

            {/* Version mobile du bouton WhatsApp */}
            <a
              href=" https://whatsapp.com/channel/0029Vaq7xx82Jl8IT3kiwg36"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden mr-2"
            >
              <Button size="icon" className="rounded-full h-10 w-10">
                <FaWhatsapp className="h-5 w-5" />
              </Button>
            </a>

            <div className="flex md:hidden items-center justify-between">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Menu mobile avec animation */}
              {(isMenuOpen || isAnimating) && (
                <>
                  {/* Overlay semi-transparent avec animation */}
                  <div 
                    className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                  />
                  
                  {/* Menu animé qui descend depuis le haut */}
                  <div className={`fixed top-0 left-0 right-0 bg-background z-50 shadow-lg transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="container mx-auto py-4 px-4 flex justify-between items-center border-b">
                      <Link href="/" className="flex-shrink-0">
                        <Image src={"/logo/logo-3.png"} alt="logo" width={40} height={40} />
                      </Link>
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        aria-label="Fermer le menu"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    
                    <div className="overflow-y-auto h-[calc(100vh-76px)]">
                      <ul className="flex flex-col px-4 py-4 gap-1">
                        {links.map((link) => (
                          <li key={link.label} className="w-full">
                            {link.children ? (
                              <div>
                                {/* Lien parent avec dropdown */}
                                <button
                                  onClick={() =>
                                    setOpenDropdown(
                                      openDropdown === link.label ? null : link.label
                                    )
                                  }
                                  className={`w-full flex justify-between items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors ${openDropdown === link.label
                                      ? "bg-accent text-accent-foreground"
                                      : "text-foreground hover:bg-muted"
                                    }`}
                                >
                                  {link.label}
                                  <ChevronDown
                                    size={18}
                                    className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""
                                      }`}
                                  />
                                </button>

                                {/* Sous-liens */}
                                {openDropdown === link.label && (
                                  <ul className="ml-4 mb-2 flex flex-col gap-1 border-l border-muted pl-3">
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
                                className={`block w-full px-4 py-3 text-lg font-medium rounded-lg transition-colors ${pathname === link.href
                                    ? "bg-primary text-primary-foreground"
                                    : "text-foreground hover:bg-muted"
                                  }`}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {link.label}
                              </Link>
                            )}
                          </li>
                        ))}
                        
                        {/* Bouton WhatsApp dans le menu mobile */}
                        <li className="mt-4 px-4">
                          <a
                            href=" https://whatsapp.com/channel/0029Vaq7xx82Jl8IT3kiwg36"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                          >
                            <Button className="w-full rounded-full py-3 text-base font-semibold bg-green-600 hover:bg-green-700">
                              <FaWhatsapp className="h-5 w-5 mr-2" />
                              Rejoindre sur WhatsApp
                            </Button>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar