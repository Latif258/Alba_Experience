import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"

// Lazy load below-the-fold sections for faster initial paint
const PortfolioSection = dynamic(() => import("@/components/portfolio-section").then(mod => mod.PortfolioSection))
const AboutSection = dynamic(() => import("@/components/about-section").then(mod => mod.AboutSection))
const GalleriesSection = dynamic(() => import("@/components/galleries-section").then(mod => mod.GalleriesSection))
const ReviewsSection = dynamic(() => import("@/components/reviews-section").then(mod => mod.ReviewsSection))
const ServicesSection = dynamic(() => import("@/components/services-section").then(mod => mod.ServicesSection))
const BookingSection = dynamic(() => import("@/components/booking-section").then(mod => mod.BookingSection))
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => mod.ContactSection))
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer))

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <PortfolioSection />
      <AboutSection />
      <GalleriesSection />
      <ReviewsSection />
      <ServicesSection />
      <BookingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
