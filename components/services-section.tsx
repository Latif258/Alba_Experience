import { Camera, Heart, GraduationCap, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const services = [
  {
    icon: Heart,
    title: "Weddings & Unions",
    description: "From intimate elopements to grand celebrations, I document the authentic emotions and timeless moments of your special day.",
    image: "/wedding-1.jpg"
  },
  {
    icon: GraduationCap,
    title: "Graduations",
    description: "Celebrate your academic achievements with professional portraits that capture your pride, joy, and the beginning of a new chapter.",
    image: "/images/graduation-1.jpg"
  },
  {
    icon: Users,
    title: "Family Portraits",
    description: "Timeless family photography that freezes fleeting moments. Perfect for annual cards, maternity, newborn, or generational gatherings.",
    image: "/images/family-moment-1.jpg"
  },
  {
    icon: Camera,
    title: "Corporate & Events",
    description: "Elevate your brand or document your corporate gatherings with crisp, professional imagery that speaks to your organization's excellence.",
    image: "/images/corporate.png"
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4">
            Our Expertise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We offer a comprehensive range of photography services, each tailored to
            honor the unique character of your occasion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-md border border-border bg-card flex flex-col h-full hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-full">
                  <service.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-light text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Note */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Pricing varies based on coverage hours and deliverables.
            <Link href="/packages" className="text-primary hover:underline ml-1 font-medium">
              View our full Packages & Pricing
            </Link> or
            <a href="#contact" className="text-primary hover:underline ml-1">
              Contact us
            </a> for a custom quote.
          </p>
        </div>
      </div>
    </section>
  )
}
