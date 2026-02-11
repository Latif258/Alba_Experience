import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/moses-bliss-wedding.jpg"
          alt="Moses Bliss: Nigerian Gospel Singer - AlbaExperience"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <p className="text-primary-foreground/80 tracking-[0.3em] uppercase text-sm mb-6">
          AlbaExperience
        </p>

        {/* Featured Tag */}
        <div className="absolute top-0 right-0 md:top-auto md:bottom-20 md:right-10 z-30 transform translate-x-1/3 -translate-y-1/2 md:translate-x-0 md:translate-y-0 rotate-90 md:rotate-0 origin-bottom-left md:origin-center">
          <div className="bg-black/20 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-lg">
            <p className="text-white/90 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase whitespace-nowrap">
              In Frame: Moses Bliss - Nigerian Gospel Singer
            </p>
          </div>
        </div>
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-light text-primary-foreground mb-6 leading-tight text-balance">
          Capturing Your Most Precious Moments
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Elegant, timeless, and authentic. From weddings and graduations to portraits and special events, we capture the emotions that define your story.
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
