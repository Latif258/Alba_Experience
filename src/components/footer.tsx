import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, MessageCircle } from "lucide-react"

const footerLinks = [
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#about", label: "About" },
  { href: "/packages", label: "Packages" },
  { href: "/#services", label: "Services" },
  { href: "/#booking", label: "Booking" },
  { href: "/#contact", label: "Contact" },
]

const socialLinks = [
  { href: "https://www.instagram.com/alba_experience?igsh=ZG1vMGh1dnR5Z2xy", icon: Instagram, label: "Instagram" },
  { href: "https://wa.me/233530458823", icon: MessageCircle, label: "WhatsApp" },
  { href: "mailto:albaexperiencestudios@gmail.com", icon: Mail, label: "Email" },
]

export function Footer() {
  return (
    <footer className="py-10 px-6 bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="relative h-24 w-48 mb-4 block">
              <Image
                src="/assets/branding/footer-logo.png"
                alt="Alba Experience"
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Professional Photography based in Ghana. Capturing moments that last a lifetime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-4 text-primary-foreground/50">
              Links
            </p>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start md:items-end">
            <p className="text-xs tracking-widest uppercase mb-4 text-primary-foreground/50">
              Social
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-background/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-neu-raised hover:shadow-neu transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-primary-foreground/70 group-hover:text-primary-foreground" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} AlbaExperience. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <Link href="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
