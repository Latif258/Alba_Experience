"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroBackground } from "./hero-background"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [heroTheme, setHeroTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      setHeroTheme(e.detail.theme)
    }
    window.addEventListener("heroThemeChange" as any, handleThemeChange)
    return () => window.removeEventListener("heroThemeChange" as any, handleThemeChange)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <HeroBackground
        images={[
          "/hero/1.avif",
          { src: "/hero/2.avif", theme: "light" },
          { src: "/hero/3.avif", className: "object-top", theme: "light" },
          { src: "/hero/4.jpeg", theme: "light" },
          "/hero/5.avif",
          { src: "/hero/6.avif", className: "object-[center_20%]" },
          "/hero/7.avif",
          "/hero/9.avif",
          { src: "/hero/10.avif", className: "object-center", theme: "light" },
          "/hero/11.jpeg",
          "/hero/12.jpeg",
        ]}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <p
          className={cn(
            "transition-all duration-700 font-bold tracking-[0.5em] uppercase text-sm sm:text-base md:text-lg mb-8 transition-opacity",
            heroTheme === "light"
              ? "text-[#6f4e37] drop-shadow-[0_2px_10px_rgba(255,255,255,1)]"
              : "text-[#ff9d4d] drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
          )}
        >
        </p>
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Capturing Your Most Precious Moments
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Elegant, timeless, and authentic. From weddings to portraits and special events, we capture the emotions that define your story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#portfolio" className="premium-button">
            <div className="bg-gradient" />
            <div className="bg-spin" />
            <div className="bg" />
            <div className="button-text-state">
              <p>
                {"VIEW PORTFOLIO".split("").map((char, i) => (
                  <span key={i} style={{ "--i": i } as any}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </p>
            </div>
          </Link>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 tracking-widest uppercase text-xs px-10 py-7 rounded-xl bg-transparent backdrop-blur-sm"
          >
            <Link href="https://wa.me/233530458823" target="_blank" rel="noopener noreferrer">Book via WhatsApp</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-primary-foreground/50 animate-pulse" />
      </div>
    </section>
  )
}
