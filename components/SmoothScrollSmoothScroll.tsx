"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let body = document.body
    let height = body.clientHeight

    // Proxy du scroll
    gsap.to({}, {
      scrollTrigger: {
        trigger: body,
        start: "top top",
        end: height,
        scrub: 1,
        onUpdate: (self) => {
          window.scrollTo({
            top: self.scroll(),
            behavior: "smooth",
          })
        },
      },
    })
  }, [])

  return <>{children}</>
}
