"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative h-12 w-44">
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
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <div className="flex flex-col gap-8 mt-8">
                <Link href="/" className="relative h-14 w-48" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/logo.png"
                    alt="Alba Experience"
                    fill
                    className="object-contain"
                  />
                </Link>
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
