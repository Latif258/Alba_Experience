"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const portfolioImages = [
  {
    src: "/wedding-1.jpg",
    alt: "Lovely couple portrait",
    category: "Couples",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/wedding-2.jpg",
    alt: "Ceremonial elegance with sword arch",
    category: "Ceremony",
    aspect: "aspect-[4/3]"
  },
  {
    src: "/wedding-3.jpg",
    alt: "Reflective beauty, bride mirror shot",
    category: "Preparation",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/wedding-4.jpg",
    alt: "Artistic angles, overhead composition",
    category: "Reception",
    aspect: "aspect-[4/3]"
  },
  {
    src: "/wedding-5.jpg",
    alt: "Staircase elegance, bride portrait",
    category: "Portraits",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/traditional-couple.jpg",
    alt: "Traditional Ghanaian Wedding - Regal couple in kente cloth",
    category: "Weddings",
    aspect: "aspect-[4/5]"
  },
  {
    src: "/first-look.jpg",
    alt: "Modern wedding first look moment outdoors",
    category: "Weddings",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/bridesmaids-yellow.jpg",
    alt: "Joyful bridesmaids in gold and yellow traditional attire",
    category: "Weddings",
    aspect: "aspect-[4/3]"
  },
  {
    src: "/groomsmen.jpg",
    alt: "Groomsmen in suits standing in formation outdoors",
    category: "Weddings",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/bridesmaids-fans.jpg",
    alt: "Elegant bridesmaids seated with fans",
    category: "Weddings",
    aspect: "aspect-[4/3]"
  },
  {
    src: "/traditional-couple-2.jpg",
    alt: "Vibrant traditional Ghanaian wedding couple",
    category: "Weddings",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/modern-couple-first-look.jpg",
    alt: "Emotional first look moment in white",
    category: "Weddings",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/bridesmaids-group.jpg",
    alt: "Joyful bridal party group portrait",
    category: "Events",
    aspect: "aspect-[16/9]"
  },
  {
    src: "/groomsmen-overhead.jpg",
    alt: "Creative overhead shot of groomsmen",
    category: "Portraits",
    aspect: "aspect-[4/3]"
  },
  {
    src: "/couple-stone-wall.jpg",
    alt: "Dramatic couple portrait by ancient wall",
    category: "Portraits",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/images/graduation-1.jpg",
    alt: "Authentic Ghanaian graduation portrait",
    category: "Graduations",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/images/graduation-3.jpg",
    alt: "Graduation ceremony at Ghana International School",
    category: "Graduations",
    aspect: "aspect-[4/3]"
  },
  {
    src: "/images/graduation-4.jpg",
    alt: "Elegant graduation portrait with floral accents",
    category: "Graduations",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/images/graduation-5.jpg",
    alt: "Professional graduation studio portrait",
    category: "Graduations",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/images/graduation-6.jpg",
    alt: "Graduation group celebration on stage",
    category: "Graduations",
    aspect: "aspect-[4/3]"
  },
  {
    src: "/images/graduation-7.jpg",
    alt: "Elegant graduation portrait with red dress",
    category: "Graduations",
    aspect: "aspect-[3/4]"
  },
  {
    src: "/images/family-moment-1.jpg",
    alt: "Joyful family celebration at wedding reception",
    category: "Family",
    aspect: "aspect-[4/3]"
  },
  {
    src: "/images/family-moment-2.jpg",
    alt: "Candid family moment during celebration",
    category: "Family",
    aspect: "aspect-[4/3]"
  },
  {
    src: "/images/family-moment-3.jpg",
    alt: "Solemn family prayer and blessing ceremony",
    category: "Family",
    aspect: "aspect-[4/3]"
  },
  {
    src: "/images/family-moment-4.jpg",
    alt: "Traditional family gathering and ceremony",
    category: "Family",
    aspect: "aspect-[3/4]"
  },
]

const categories = ["All", "Weddings", "Graduations", "Family", "Events", "Portraits"]

const AnimButton = ({
  category,
  isActive,
  onClick,
  type,
}: {
  category: string
  isActive: boolean
  onClick: () => void
  type: string
}) => (
  <button
    onClick={onClick}
    className={cn(
      "anim-button",
      type,
      isActive && "is-active"
    )}
  >
    <div className="button__line"></div>
    <div className="button__line"></div>
    <span className="button__text">{category}</span>
    <div className="button__drow1"></div>
    <div className="button__drow2"></div>
  </button>
)

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const filteredImages = activeCategory === "All"
    ? portfolioImages
    : portfolioImages.filter(img => img.category === activeCategory)

  // Reset index when category changes to prevent out-of-bounds access
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setSelectedIndex(0)
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="portfolio" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collection of moments that speak to the heart of each celebration.
            Every image tells a story of love, joy, and connection.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 mb-20 lg:mb-24">
          {categories.map((category, index) => {
            const types = ["type--A", "type--B", "type--C"]
            const type = category === activeCategory ? "type--active" : types[index % types.length]
            return (
              <AnimButton
                key={category}
                category={category}
                isActive={activeCategory === category}
                onClick={() => handleCategoryChange(category)}
                type={type}
              />
            )
          })}
        </div>

        {/* Gallery Grid - Masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image, index) => (
            <div key={image.src} className="break-inside-avoid">
              <Dialog open={isOpen && selectedIndex === index} onOpenChange={(open) => {
                setIsOpen(open)
                if (open) setSelectedIndex(index)
              }}>
                <DialogTrigger asChild>
                  <div className={`group relative ${image.aspect || 'aspect-[4/5]'} overflow-hidden cursor-pointer rounded-2xl shadow-sm hover:shadow-neu-raised transition-all duration-500`}>
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-primary-foreground text-sm tracking-widest uppercase">
                        {image.category}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-5xl h-[90vh] p-0 bg-foreground/95 border-none">
                  <DialogHeader className="sr-only">
                    <DialogTitle>
                      {filteredImages[selectedIndex]?.alt || "Portfolio Image"}
                    </DialogTitle>
                    <DialogDescription>
                      {filteredImages[selectedIndex]?.category || "Photography"} photography by AlbaExperience
                    </DialogDescription>
                  </DialogHeader>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={filteredImages[selectedIndex]?.src || "/placeholder.svg"}
                      alt={filteredImages[selectedIndex]?.alt || "Portfolio Image"}
                      fill
                      className="object-contain"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 text-primary-foreground hover:bg-primary-foreground/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePrevious()
                      }}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 text-primary-foreground hover:bg-primary-foreground/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNext()
                      }}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
