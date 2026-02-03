import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">

        {/* Content */}
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4">
            The Photographer
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-10">
            AlbaExperience
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg max-w-2xl">
            <p>
              Rooted in the vibrant heart of Ghana, photography is more than an art form to me—it is a way of honoring our rich heritage and the timeless beauty of love. I believe that every wedding is a tapestry woven with emotions, colors, and traditions unique to your story.
            </p>
            <p>
              My approach is grounded in authenticity and grace. From the quiet, intimate glances to the jubilant energy of the dance floor, I seek to capture the soul of your celebration. I observe rather than direct, allowing the true spirit of the day to unfold naturally before my lens.
            </p>
            <p>
              Based in Ghana and inspired by the warmth of our people, I am dedicated to crafting a visual legacy that you will cherish for generations. It is a profound privilege to document these singular moments with the elegance and professionalism they deserve.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 tracking-widest uppercase text-sm px-8 py-6"
            >
              <Link href="#booking">Work With Me</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 tracking-widest uppercase text-sm px-8 py-6 bg-transparent"
            >
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
