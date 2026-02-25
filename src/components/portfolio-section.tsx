"use client"

import { useState, useRef, useLayoutEffect, useEffect } from "react"
import Image from "next/image"
import { portfolioImages, type PortfolioImage } from "@/data/portfolio"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, ChevronDown, X, Heart, Sparkles, Camera, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const mainCategories = ["All", "Weddings", "Events", "Portraits", "Corporate"]
const weddingSubCategories = ["Traditional/Engagement", "Prewedding", "Wedding"]
const portraitSubCategories = ["Fashion", "Family", "Studio"]

const AnimButton = ({
  category,
  isActive,
  onClick,
  type,
  hasSubcategories,
}: {
  category: string
  isActive: boolean
  onClick: () => void
  type: string
  hasSubcategories?: boolean
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
    <span className="button__text flex items-center justify-center gap-2">
      {category}
      {hasSubcategories && (
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300 opacity-70",
            isActive ? "rotate-180" : "rotate-0"
          )}
        />
      )}
    </span>
    <div className="button__drow1"></div>
    <div className="button__drow2"></div>
  </button>
)

const subCategoryMeta: Record<string, { icon: React.ReactNode; label: string; description: string }> = {
  "Wedding": {
    icon: <Camera className="w-3 h-3" />,
    label: "Wedding",
    description: "The Ceremony",
  },
  "Traditional/Engagement": {
    icon: <Heart className="w-3 h-3" />,
    label: "Traditional",
    description: "Engagement",
  },
  "Prewedding": {
    icon: <Sparkles className="w-3 h-3" />,
    label: "Prewedding",
    description: "Before the Day",
  },
  "Fashion": {
    icon: <Star className="w-3 h-3" />,
    label: "Fashion",
    description: "Style & Glamour",
  },
  "Family": {
    icon: <Users className="w-3 h-3" />,
    label: "Family",
    description: "Generations",
  },
  "Studio": {
    icon: <Camera className="w-3 h-3" />,
    label: "Studio",
    description: "Controlled Light",
  },
}

const SubCategoryButton = ({
  category,
  isActive,
  onClick,
  onRef,
}: {
  category: string
  isActive: boolean
  onClick: () => void
  onRef?: (el: HTMLButtonElement | null) => void
}) => {
  const meta = subCategoryMeta[category]
  return (
    <button
      ref={onRef}
      onClick={onClick}
      className={cn(
        "relative z-10 flex flex-col items-center gap-1 px-5 py-3 transition-all duration-500 outline-none",
        "min-w-[80px] sm:min-w-[100px] md:min-w-[110px]",
        isActive ? "text-foreground" : "text-muted-foreground/60 hover:text-muted-foreground"
      )}
    >
      {/* Icon circle - scales up when active */}
      <span className={cn(
        "flex items-center justify-center w-6 h-6 rounded-full transition-all duration-500",
        isActive
          ? "text-[#8B6914] bg-[#c8a96e]/10 scale-110"
          : "text-muted-foreground/50 bg-transparent scale-100"
      )}>
        {meta?.icon}
      </span>

      {/* Label - magnifies when active */}
      <span className={cn(
        "font-serif text-[10px] sm:text-[11px] tracking-[0.15em] uppercase leading-none transition-all duration-500 mt-1 origin-center",
        isActive ? "font-semibold text-foreground scale-125 translate-y-0.5" : "scale-100"
      )}>
        {meta?.label || category}
      </span>

      {/* Sub-description */}
      <span className={cn(
        "text-[8px] tracking-[0.15em] uppercase leading-none transition-all duration-500 hidden sm:block mt-0.5",
        isActive ? "text-[#c8a96e] opacity-100 translate-y-0.5" : "text-transparent opacity-0 -translate-y-2"
      )}>
        {meta?.description}
      </span>
    </button>
  )
}

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeSubCategory, setActiveSubCategory] = useState("Traditional/Engagement")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [direction, setDirection] = useState(0)
  const [showSwipeHint, setShowSwipeHint] = useState(false)

  // Refs for sliding indicator
  const tabsRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (activeCategory === "Weddings" || activeCategory === "Portraits") {
      const subCategories = activeCategory === "Weddings" ? weddingSubCategories : portraitSubCategories
      const idx = subCategories.indexOf(activeSubCategory)
      const activeButton = buttonRefs.current[idx]
      const indicator = indicatorRef.current
      if (activeButton && tabsRef.current && indicator) {
        const { offsetLeft, offsetWidth } = activeButton
        indicator.style.transform = `translate3d(${offsetLeft}px, 0, 0)`
        indicator.style.width = `${offsetWidth}px`
      }
    }
  }, [activeCategory, activeSubCategory])

  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      const hintSeen = sessionStorage.getItem("portfolio_swipe_hint_seen")
      if (!hintSeen) {
        setShowSwipeHint(true)
        const timer = setTimeout(() => {
          setShowSwipeHint(false)
          sessionStorage.setItem("portfolio_swipe_hint_seen", "true")
        }, 3500)
        return () => clearTimeout(timer)
      }
    }
  }, [isOpen])

  // no longer needed - removed pill measurement refs

  const filteredImages = (() => {
    // 1. If All is selected, show only non-exclusive images
    if (activeCategory === "All") {
      return (portfolioImages as PortfolioImage[]).filter(img => !img.isSubExclusive)
    }

    const categoryImages = (portfolioImages as PortfolioImage[]).filter(img => img.category === activeCategory)

    // 2. If Weddings is selected
    if (activeCategory === "Weddings") {
      // If "Wedding" is selected, show all non-exclusive wedding images AND exclusive "Wedding" images
      // (This effectively makes the Wedding tab show EVERYTHING except other categories' exclusives)
      if (activeSubCategory === "Wedding") {
        return categoryImages.filter(img => !img.isSubExclusive || img.subCategory === "Wedding")
      }
      // If a specific sub-category (Traditional or Prewedding) is selected, show only its exclusive images
      return categoryImages.filter(img => img.subCategory === activeSubCategory && img.isSubExclusive)
    }

    // 3. If Portraits is selected
    if (activeCategory === "Portraits") {
      return categoryImages.filter(img => img.subCategory === activeSubCategory && img.isSubExclusive)
    }

    return categoryImages
  })()

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    if (category === "Weddings") {
      setActiveSubCategory("Traditional/Engagement")
    } else if (category === "Portraits") {
      setActiveSubCategory("Fashion")
    } else {
      setActiveSubCategory("")
    }
    setSelectedIndex(0)
  }

  const handleSubCategoryChange = (subCategory: string) => {
    setActiveSubCategory(subCategory)
    setSelectedIndex(0)
  }

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setDirection(-1)
    setSelectedIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
  }

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setDirection(1)
    setSelectedIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="portfolio" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
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
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-12 mb-20 lg:mb-24"
        >
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
            {mainCategories.map((category, index) => {
              const types = ["type--A", "type--B", "type--C"]
              const type = types[index % types.length]
              return (
                <AnimButton
                  key={category}
                  category={category}
                  isActive={activeCategory === category}
                  onClick={() => handleCategoryChange(category)}
                  type={type}
                  hasSubcategories={category === "Weddings" || category === "Portraits"}
                />
              )
            })}
          </div>

          {/* Sub-category Filter for Weddings & Portraits — Editorial Tabs */}
          {(activeCategory === "Weddings" || activeCategory === "Portraits") && (
            <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-700 w-full">

              {/* Decorative label row */}
              <div className="flex items-center gap-4 w-full max-w-sm">
                <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c8a96e]/40" />
                <p className="font-serif text-[10px] tracking-[0.35em] uppercase text-[#c8a96e]/80 whitespace-nowrap">
                  Browse by Style
                </p>
                <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c8a96e]/40" />
              </div>

              {/* Tab cards row */}
              <div
                ref={tabsRef}
                className="relative flex overflow-x-auto no-scrollbar justify-start sm:justify-center p-2 rounded-[30px] bg-secondary border border-border backdrop-blur-sm max-w-full"
              >
                {/* Sliding Glass Pill Indicator */}
                <div
                  ref={indicatorRef}
                  className="absolute top-1.5 bottom-1.5 rounded-[24px] bg-background shadow-sm border border-border transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0"
                >
                  {/* Internal shine/highlight for extra glass effect */}
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-white/40 to-transparent opacity-50" />
                </div>

                {(activeCategory === "Weddings" ? weddingSubCategories : portraitSubCategories).map((sub, idx) => (
                  <SubCategoryButton
                    key={sub}
                    category={sub}
                    isActive={activeSubCategory === sub}
                    onClick={() => handleSubCategoryChange(sub)}
                    onRef={(el) => (buttonRefs.current[idx] = el)}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Gallery Grid - Masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              className="break-inside-avoid"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.5) }}
            >
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
                      priority={index < 6}
                      className={cn(
                        "object-cover transition-transform duration-700 group-hover:scale-105",
                        image.objectPosition || "object-center"
                      )}
                      quality={90}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent
                  showCloseButton={false}
                  className="!max-w-none !w-screen !h-screen fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 p-0 m-0 bg-black/20 backdrop-blur-md border-none shadow-none flex flex-col justify-center items-center overflow-hidden rounded-none z-[100]"
                >
                  <DialogHeader className="sr-only">
                    <DialogTitle>
                      {filteredImages[selectedIndex]?.alt || "Portfolio Image"}
                    </DialogTitle>
                    <DialogDescription>
                      Full-size view of portfolio image
                    </DialogDescription>
                  </DialogHeader>

                  {/* Image Container with Swipe */}
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.div
                        key={selectedIndex}
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500
                          if (swipe && offset.x > 0) {
                            handlePrevious()
                          } else if (swipe && offset.x < 0) {
                            handleNext()
                          }
                        }}
                        className="absolute inset-0 flex items-center justify-center p-6 md:p-12 lg:p-20 touch-none"
                      >
                        <Image
                          src={filteredImages[selectedIndex]?.src || "/assets/placeholders/placeholder.svg"}
                          alt={filteredImages[selectedIndex]?.alt || "Portfolio Image"}
                          fill
                          className="object-contain pointer-events-none"
                          quality={95}
                          sizes="100vw"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Swipe Hint Overlay */}
                    <AnimatePresence>
                      {showSwipeHint && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 pointer-events-none"
                        >
                          <div className="flex flex-col items-center gap-4 text-white">
                            <motion.div
                              animate={{ x: [-20, 20, -20] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                                <ChevronRight className="w-6 h-6" />
                              </div>
                            </motion.div>
                            <p className="text-sm tracking-widest uppercase font-medium">Swipe to Navigate</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Controls - Desktop ONLY, Far Edges */}
                  <div className="hidden md:block">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handlePrevious(e)}
                      className="fixed left-8 lg:left-16 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full h-20 w-20 group transition-all"
                    >
                      <ChevronLeft className="h-10 w-10 transition-transform group-hover:-translate-x-1" />
                      <span className="sr-only">Previous image</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleNext(e)}
                      className="fixed right-8 lg:right-16 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full h-20 w-20 group transition-all"
                    >
                      <ChevronRight className="h-10 w-10 transition-transform group-hover:translate-x-1" />
                      <span className="sr-only">Next image</span>
                    </Button>
                  </div>

                  {/* Top Bar - Close Button Only */}
                  <div className="fixed top-0 right-0 p-8 z-[110]">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full h-14 w-14 transition-all shadow-xl"
                    >
                      <X className="h-8 w-8" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-white/80 text-xs tracking-widest z-30">
                    {selectedIndex + 1} / {filteredImages.length}
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
