"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Instagram, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "jettasamoah@gmail.com",
    href: "mailto:jettasamoah@gmail.com",
  },
  {
    icon: Mail,
    label: "Email (Backup)",
    value: "albaexperiencestudios@gmail.com",
    href: "mailto:albaexperiencestudios@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+233 53 045 8823 / +233 50 741 0938",
    href: "https://wa.me/233530458823",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Fotospace, Dome-Christian Village",
    href: null,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@alba_experience",
    href: "https://www.instagram.com/alba_experience?igsh=ZG1vMGh1dnR5Z2xy",
  },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <section id="contact" className="py-24 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <p className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-8">
              Get in Touch
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              Whether you are planning a wedding or simply have a question, I would
              be delighted to hear from you. Every inquiry receives a thoughtful response.
            </p>

            <div className="space-y-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <item.icon className="h-6 w-6 text-primary mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm tracking-wider uppercase text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-lg text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <p className="text-lg text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Message */}
          <div className="bg-card p-8 md:p-12 border border-border">
            <div className="mb-8 p-6 bg-primary/5 border border-primary/20 text-center">
              <h3 className="text-xl font-light text-foreground mb-4">
                Message us on WhatsApp
              </h3>
              <Button
                asChild
                className="w-full bg-[#25D366] text-white hover:bg-[#25D366]/90 tracking-widest uppercase text-sm py-4"
              >
                <Link href="https://wa.me/233530458823" target="_blank">
                  Open WhatsApp Chat
                </Link>
              </Button>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 animate-in fade-in duration-500">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-light text-foreground mb-4">Message Sent</h3>
                <p className="text-muted-foreground">Thank you! We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-light text-foreground mb-6">
                  Send a Quick Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm tracking-wider uppercase text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm tracking-wider uppercase text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm tracking-wider uppercase text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-border bg-background focus:border-primary focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-widest uppercase text-sm py-4 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
