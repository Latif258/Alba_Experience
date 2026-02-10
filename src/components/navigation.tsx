"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Instagram, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#about", label: "About" },
  { href: "/packages", label: "Packages" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
  { href: "/faq", label: "FAQ/Terms" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-4 left-4 right-4 md:left-6 md:right-6 z-50 bg-background/90 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm">
      <nav className="mx-auto max-w-7xl px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative h-10 w-32 md:h-12 md:w-44">
            <Image
              src="/logo.png"
              alt="Alba Experience"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="fill" size="icon" className="rounded-xl">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md bg-background/98 backdrop-blur-xl border-none shadow-2xl flex flex-col p-8">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
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

                {/* Mobile Links */}
                <div className="flex flex-col gap-8 flex-1 justify-center items-center text-center">
                  {navLinks.map((link, index) => (
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

                {/* Mobile Footer */}
                <div className="mt-auto pt-10 border-t border-border/50">
                  <div className="flex flex-col items-center gap-8">
                    <div className="flex gap-8">
                      <Link
                        href="https://www.instagram.com/alba_experience?igsh=ZG1vMGh1dnR5Z2xy"
                        target="_blank"
                        className="p-3 bg-secondary rounded-full text-foreground hover:text-primary transition-colors"
                      >
                        <Instagram className="h-6 w-6" />
                      </Link>
                      <Link
                        href="https://wa.me/233530458823"
                        target="_blank"
                        className="p-3 bg-secondary rounded-full text-foreground hover:text-primary transition-colors"
                      >
                        <MessageCircle className="h-6 w-6" />
                      </Link>
                      <Link
                        href="mailto:albaexperiencestudios@gmail.com"
                        className="p-3 bg-secondary rounded-full text-foreground hover:text-primary transition-colors"
                      >
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
      </nav>
    </header>
  )
}
