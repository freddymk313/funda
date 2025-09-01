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
import { Menu, X } from "lucide-react";
import { useState } from "react"

const links = [
  { label: "Accueil", href: "/" },
  {
    label: "Événements",
    children: [
      { label: "Événements a venir", href: "/events/upcoming" },
      { label: "Événements passés", href: "/events/past" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-16 lg:px-20">
        {/* Logo */}
        <Link href="/">
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
                      <NavigationMenuTrigger className={`px-3 ${pathname === link.href ? 'text-primary' : 'hover:text-primary'
                        }`}>{link.label}</NavigationMenuTrigger>
                      <NavigationMenuContent className="p-2">
                        <ul className="flex flex-col gap-2 w-48">
                          {link.children.map((sublink) => (
                            <li key={sublink.label}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={sublink.href}
                                  className="block px-2 py-2 rounded-md hover:bg-gray-100"
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
                    <NavigationMenuLink asChild className="text-base gap-4 hover:bg-none">
                      <Link href={link.href} className={`px-3 ${pathname === link.href ? 'text-primary' : 'hover:text-primary'
                        }`}>
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Bouton and menu mobile */}
          <div className="flex flex-row items-center gap-1">
            <a href="https://wa.me/243991040032"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="rounded-full *text-base font-semibold *uppercase">
                Rejoindre
              </Button>
            </a>

            <div className="flex md:hidden items-center justify-between">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div>
                {isMenuOpen && (
                  <div
                    className="absolute top-16 left-0 right-0 bg-background border-b border-border z-10 shadow-lg"
                  >
                    <ul className="flex flex-col px-4 py-6 mt-5">
                      {links.map((link, idx) => (
                        <li
                          key={idx}
                          className={`w-full px-4 py-3 text-lg text-left font-semibold rounded-lg transition-colors ${pathname === link.href
                            ? "bg-accent/10 text-accent *font-medium"
                            : "text-muted-foreground hover:bg-muted"
                            }`}
                        >
                          <Link
                            href="/blog"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
