"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Instagram, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#about", label: "About" },
  { href: "/#galleries", label: "Galleries" },
  { href: "/packages", label: "Packages" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
  { href: "/faq", label: "FAQ/Terms" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [heroTheme, setHeroTheme] = useState<"light" | "dark">("dark")

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: 'light' | 'dark' }>;
      setHeroTheme(customEvent.detail.theme)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("heroThemeChange", handleThemeChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("heroThemeChange", handleThemeChange)
    }
  }, [])

  // Use light-colored text/logo if on a dark background (Hero with dark theme)
  // Use dark-colored text/logo if scrolled or on a light background (Hero with light theme)
  const isDarkContent = isScrolled || heroTheme === "light"

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "top-4 left-4 right-4 md:left-6 md:right-6 bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/20 shadow-2xl py-3"
          : "top-0 left-0 right-0 bg-transparent py-6"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative h-10 w-32 md:h-12 md:w-44 transition-all duration-500 hover:scale-105 active:scale-95">
            <Image
              src="/logo.png"
              alt="Alba Experience"
              fill
              className={cn(
                "object-contain transition-all duration-500 drop-shadow-md",
                !isDarkContent ? "brightness-0 invert-100" : "" // Invert if on dark background
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs tracking-[0.2em] uppercase transition-all duration-300 font-semibold hover:opacity-70",
                  isDarkContent
                    ? "text-foreground drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]"
                    : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Trigger */}
          {mounted && (
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-xl transition-colors",
                      isDarkContent
                        ? "text-foreground hover:bg-black/5"
                        : "text-white hover:bg-white/10 drop-shadow-md"
                    )}
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md bg-background/98 backdrop-blur-xl border-none shadow-2xl flex flex-col p-8 z-[100]">
                  {/* Mobile Menu Content (Keep existing logic but styled consistently) */}
                  <div className="flex flex-col h-full">
                    <div className="mb-12">
                      <Link href="/" className="relative h-12 w-40 block" onClick={() => setIsOpen(false)}>
                        <Image
                          src="/logo.png"
                          alt="Alba Experience"
                          fill
                          className="object-contain object-left"
                        />
                      </Link>
                    </div>

                    <div className="flex flex-col gap-8 flex-1 justify-center items-center text-center">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex flex-col items-center"
                        >
                          <span className="text-2xl font-light tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-all duration-300">
                            {link.label}
                          </span>
                          <span className="h-px w-0 bg-primary group-hover:w-full transition-all duration-500 mt-2" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-auto pt-10 border-t border-border/50">
                      <div className="flex flex-col items-center gap-8">
                        <div className="flex gap-8">
                          <Link href="https://www.instagram.com/alba_experience" target="_blank" className="p-3 bg-secondary rounded-full text-foreground hover:text-primary transition-colors">
                            <Instagram className="h-6 w-6" />
                          </Link>
                          <Link href="https://wa.me/233530458823" target="_blank" className="p-3 bg-secondary rounded-full text-foreground hover:text-primary transition-colors">
                            <MessageCircle className="h-6 w-6" />
                          </Link>
                          <Link href="mailto:jettasamoah@gmail.com" className="p-3 bg-secondary rounded-full text-foreground hover:text-primary transition-colors" title="Email (Primary)">
                            <Mail className="h-6 w-6" />
                          </Link>
                          <Link href="mailto:albaexperiencestudios@gmail.com" className="p-3 bg-secondary rounded-full text-foreground hover:text-primary transition-colors" title="Email (Backup)">
                            <Mail className="h-6 w-6" />
                          </Link>
                        </div>

                        <Button asChild className="w-full py-7 text-sm tracking-[0.2em] uppercase rounded-xl">
                          <Link href="https://wa.me/233530458823" target="_blank" onClick={() => setIsOpen(false)}>
                            Book Your Session
                          </Link>
                        </Button>

                        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
                          © {new Date().getFullYear()} Alba Experience
                        </p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
