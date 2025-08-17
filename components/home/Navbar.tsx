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

// Définition des liens
const links = [
  { label: "Accueil", href: "/" },
  {
    label: "Événements",
    children: [
      { label: "À venir", href: "/events/upcoming" },
      { label: "Passés", href: "/events/past" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const Navbar = () => {
  return (
    <header className="shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-16 lg:px-20">
        {/* Logo */}
        <Link href="/">
          <Image src={"/logo/logo.png"} alt="logo" width={47} height={47} />
        </Link>

        {/* Menu */}
         <NavigationMenu className="hidden md:flex gap-6 font-medium text-gray-700 items-center">
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.label}>
                {link.children ? (
                  <>
                    <NavigationMenuTrigger className="text-lg">{link.label}</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4">
                      <ul className="flex flex-col gap-2 w-48">
                        {link.children.map((sublink) => (
                          <li key={sublink.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={sublink.href}
                                className="block px-3 py-2 rounded-md hover:bg-gray-100"
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
                  <NavigationMenuLink asChild className="text-base gap-4">
                    <Link href={link.href}>
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Bouton */}
        <Button className="rounded-full">
          S'inscrire
        </Button>
      </div>
    </header>
  )
}

export default Navbar
