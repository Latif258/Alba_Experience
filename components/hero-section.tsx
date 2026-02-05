import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/wedding-5.jpg"
          alt="AlbaExperience - Professional photography for weddings, graduations, and events"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-primary-foreground/80 tracking-[0.3em] uppercase text-sm mb-6">
          AlbaExperience
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground mb-6 leading-tight text-balance">
          Capturing Your Most Precious Moments
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Elegant, timeless, and authentic. From weddings and graduations to portraits and special events, we capture the emotions that define your story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 tracking-widest uppercase text-sm px-8 py-6"
          >
            <Link href="#portfolio">View Portfolio</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 tracking-widest uppercase text-sm px-8 py-6 bg-transparent"
          >
            <Link href="https://wa.me/233530458823" target="_blank">Book via WhatsApp</Link>
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
