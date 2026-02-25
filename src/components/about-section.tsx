"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <p className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4">
            About Us
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-10">
            AlbaExperience
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Rooted in the vibrant heart of Ghana, photography is more than an art form to us—it is a way of honoring our rich heritage and the timeless beauty of love. We believe that every wedding is a tapestry woven with emotions, colors, and traditions unique to your story.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Our approach is grounded in authenticity and grace. From the quiet, intimate glances to the jubilant energy of the dance floor, we seek to capture the soul of your celebration. We observe rather than direct, allowing the true spirit of the day to unfold naturally before our lens.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Based in Ghana and inspired by the warmth of our people, we are dedicated to crafting a visual legacy that you will cherish for generations. It is a profound privilege to document these singular moments with the elegance and professionalism they deserve.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              variant="neumorphic-secondary"
              className="tracking-widest uppercase text-xs px-10 py-7 rounded-xl"
            >
              <Link href="#booking">Work With Us</Link>
            </Button>
            <Button
              asChild
              variant="neumorphic"
              className="tracking-widest uppercase text-xs px-10 py-7 rounded-xl text-primary"
            >
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
