"use client"

import { useState, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const portfolioImages = [
    // --- Main Portfolio (Visible in "All" and default main categories) ---
    {
        src: "/wedding-highlight-2.jpg",
        alt: "Stunning wedding portrait - Groom at piano",
        category: "Weddings",
        subCategory: "Wedding",
        aspect: "aspect-[4/5]"
    },
    {
        src: "/wedding-new-feature.jpg",
        alt: "Beautiful wedding celebration moment",
        category: "Weddings",
        subCategory: "Wedding",
        aspect: "aspect-[4/3]"
    },
    {
        src: "/traditional-couple.jpg",
        alt: "Traditional Ghanaian Wedding - Regal couple in kente cloth",
        category: "Weddings",
        subCategory: "Traditional/Engagement",
        aspect: "aspect-[4/5]"
    },
    {
        src: "/first-look.jpg",
        alt: "Modern wedding first look moment outdoors",
        category: "Weddings",
        subCategory: "Wedding",
        aspect: "aspect-[3/4]"
    },
    {
        src: "/bridesmaids-yellow.jpg",
        alt: "Joyful bridesmaids in gold and yellow traditional attire",
        category: "Weddings",
        subCategory: "Traditional/Engagement",
        aspect: "aspect-[4/3]"
    },
    {
        src: "/groomsmen.jpg",
        alt: "Groomsmen in suits standing in formation outdoors",
        category: "Weddings",
        subCategory: "Wedding",
        aspect: "aspect-[3/4]"
    },
    {
        src: "/bridesmaids-fans.jpg",
        alt: "Elegant bridesmaids seated with fans",
        category: "Weddings",
        subCategory: "Traditional/Engagement",
        aspect: "aspect-[4/3]"
    },
    {
        src: "/traditional-couple-2.jpg",
        alt: "Vibrant traditional Ghanaian wedding couple",
        category: "Weddings",
        subCategory: "Traditional/Engagement",
        aspect: "aspect-[3/4]"
    },
    {
        src: "/modern-couple-first-look.jpg",
        alt: "Emotional first look moment in white",
        category: "Weddings",
        subCategory: "Wedding",
        aspect: "aspect-[3/4]"
    },
    {
        src: "/wedding-1.jpg",
        alt: "Lovely couple portrait",
        category: "Weddings",
        subCategory: "Prewedding",
        aspect: "aspect-[3/4]"
    },
    {
        src: "/wedding-2.jpg",
        alt: "Ceremonial elegance with sword arch",
        category: "Weddings",
        subCategory: "Wedding",
        aspect: "aspect-[4/3]"
    },
    {
        src: "/wedding-3.jpg",
        alt: "Reflective beauty, bride mirror shot",
        category: "Weddings",
        subCategory: "Wedding",
        aspect: "aspect-[3/4]"
    },
    {
        src: "/wedding-4.jpg",
        alt: "Artistic angles, overhead composition",
        category: "Weddings",
        subCategory: "Wedding",
        aspect: "aspect-[4/3]"
    },
    {
        src: "/wedding-5.jpg",
        alt: "Staircase elegance, bride portrait",
        category: "Weddings",
        subCategory: "Wedding",
        aspect: "aspect-[3/4]"
    },
    {
        src: "/images/family-portrait-new.jpeg",
        alt: "New beautiful family portrait",
        category: "Family",
        aspect: "aspect-[3/4]"
    },
    {
        src: "/images/family-moment-1.jpg",
        alt: "Joyful multi-generational family portrait",
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
    {
        src: "/bridesmaids-group.jpg",
        alt: "Joyful bridal party group portrait",
        category: "Events",
        aspect: "aspect-[16/9]"
    },
    {
        src: "/groomsmen-overhead.jpg",
        alt: "Creative overhead shot of groomsmen",
        category: "Events",
        aspect: "aspect-[4/3]"
    },
    {
        src: "/couple-stone-wall.jpg",
        alt: "Dramatic couple portrait by ancient wall",
        category: "Portraits",
        aspect: "aspect-[3/4]"
    },
    {
        src: "/hero/6.jpg",
        alt: "Beautiful portrait moment",
        category: "Portraits",
        aspect: "aspect-[4/3]",
        objectPosition: "object-top"
    },
    {
        src: "/hero/3.jpg",
        alt: "Elegant portrait",
        category: "Portraits",
        aspect: "aspect-[3/4]"
    },
    {
        src: "/hero/2.jpg",
        alt: "Professional portrait",
        category: "Portraits",
        aspect: "aspect-[4/3]"
    },

    // --- Sub-Category Exclusive Images (Reserved for specific wedding sub-tabs) ---
    // Traditional / Engagement Folder
    { src: "/portfolio/weddings/traditional-engagement/Traditional (1).jpeg", alt: "Traditional 1", category: "Weddings", subCategory: "Traditional/Engagement", isSubExclusive: true, aspect: "aspect-[4/5]" },
    { src: "/portfolio/weddings/traditional-engagement/Traditional (2).jpeg", alt: "Traditional 2", category: "Weddings", subCategory: "Traditional/Engagement", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/traditional-engagement/Traditional (3).jpeg", alt: "Traditional 3", category: "Weddings", subCategory: "Traditional/Engagement", isSubExclusive: true, aspect: "aspect-[4/3]" },
    { src: "/portfolio/weddings/traditional-engagement/Traditional (4).jpeg", alt: "Traditional 4", category: "Weddings", subCategory: "Traditional/Engagement", isSubExclusive: true, aspect: "aspect-[3/4]" },

    // Prewedding Folder
    { src: "/portfolio/weddings/prewedding/prewedding (1).jpg", alt: "Prewedding 1", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/prewedding/prewedding (2).jpg", alt: "Prewedding 2", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[4/5]" },
    { src: "/portfolio/weddings/prewedding/prewedding (3).jpg", alt: "Prewedding 3", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/prewedding/prewedding (4).jpg", alt: "Prewedding 4", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[4/3]" },
    { src: "/portfolio/weddings/prewedding/prewedding (5).jpg", alt: "Prewedding 5", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/prewedding/prewedding (6).jpg", alt: "Prewedding 6", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[4/5]" },
    { src: "/portfolio/weddings/prewedding/prewedding (7).jpg", alt: "Prewedding 7", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/prewedding/prewedding (8).jpg", alt: "Prewedding 8", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[4/3]" },
    { src: "/portfolio/weddings/prewedding/prewedding (9).jpg", alt: "Prewedding 9", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/prewedding/prewedding (10).jpg", alt: "Prewedding 10", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[4/3]" },
    { src: "/portfolio/weddings/prewedding/prewedding (11).jpg", alt: "Prewedding 11", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/prewedding/prewedding (12).jpg", alt: "Prewedding 12", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[4/3]" },
    { src: "/portfolio/weddings/prewedding/prewedding (13).jpg", alt: "Prewedding 13", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/prewedding/prewedding (14).jpg", alt: "Prewedding 14", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[4/5]" },
    { src: "/portfolio/weddings/prewedding/prewedding (15).jpg", alt: "Prewedding 15", category: "Weddings", subCategory: "Prewedding", isSubExclusive: true, aspect: "aspect-[3/4]" },

    // Wedding Folder
    { src: "/portfolio/weddings/wedding/wedding (1).jpg", alt: "Wedding 1", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/wedding/wedding (2).jpg", alt: "Wedding 2", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[4/5]" },
    { src: "/portfolio/weddings/wedding/wedding (3).jpg", alt: "Wedding 3", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[4/3]" },
    { src: "/portfolio/weddings/wedding/wedding (4).jpg", alt: "Wedding 4", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/wedding/wedding (5).jpg", alt: "Wedding 5", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[4/3]" },
    { src: "/portfolio/weddings/wedding/wedding (6).jpg", alt: "Wedding 6", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/wedding/wedding (7).jpg", alt: "Wedding 7", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[4/3]" },
    { src: "/portfolio/weddings/wedding/wedding (8).jpg", alt: "Wedding 8", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/wedding/wedding (9).jpg", alt: "Wedding 9", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[4/3]" },
    { src: "/portfolio/weddings/wedding/wedding (10).jpg", alt: "Wedding 10", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/wedding/wedding (11).jpg", alt: "Wedding 11", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[4/3]" },
    { src: "/portfolio/weddings/wedding/wedding (12).jpg", alt: "Wedding 12", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[3/4]" },
    { src: "/portfolio/weddings/wedding/mosesbliss9.jpg.jpeg", alt: "Moses Bliss Wedding", category: "Weddings", subCategory: "Wedding", isSubExclusive: true, aspect: "aspect-[4/3]", objectPosition: "object-top" },
]

const mainCategories = ["All", "Weddings", "Family", "Events", "Portraits"]
const weddingSubCategories = ["All Weddings", "Traditional/Engagement", "Prewedding", "Wedding"]

interface PortfolioImage {
    src: string
    alt: string
    category: string
    subCategory?: string
    isSubExclusive?: boolean
    aspect?: string
    objectPosition?: string
}

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

const SubCategoryButton = ({
    category,
    isActive,
    onClick,
    buttonRef,
}: {
    category: string
    isActive: boolean
    onClick: () => void
    buttonRef?: (el: HTMLButtonElement | null) => void
}) => (
    <button
        ref={buttonRef}
        onClick={onClick}
        className={cn(
            "relative px-6 py-2.5 rounded-full text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 z-10 whitespace-nowrap",
            isActive
                ? "text-background font-medium"
                : "text-muted-foreground hover:text-foreground transition-all duration-300"
        )}
    >
        {category}
    </button>
)

export function PortfolioSection() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [activeSubCategory, setActiveSubCategory] = useState("All Weddings")
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    // Refs for dynamic pill measurement
    const tabsRef = useRef<HTMLDivElement>(null)
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 })

    useLayoutEffect(() => {
        if (activeCategory === "Weddings") {
            const idx = weddingSubCategories.indexOf(activeSubCategory)
            const activeButton = buttonRefs.current[idx]
            if (activeButton && tabsRef.current) {
                const { offsetLeft, offsetWidth } = activeButton
                setPillStyle({
                    left: offsetLeft,
                    width: offsetWidth,
                    opacity: 1
                })
            }
        } else {
            setPillStyle(prev => ({ ...prev, opacity: 0 }))
        }
    }, [activeCategory, activeSubCategory])

    const filteredImages = (() => {
        // 1. If All is selected, show only non-exclusive images
        if (activeCategory === "All") {
            return (portfolioImages as PortfolioImage[]).filter(img => !img.isSubExclusive)
        }

        const categoryImages = (portfolioImages as PortfolioImage[]).filter(img => img.category === activeCategory)

        // 2. If Weddings is selected
        if (activeCategory === "Weddings") {
            // If "All Weddings" (default), show only non-exclusive wedding images
            if (activeSubCategory === "All Weddings") {
                return categoryImages.filter(img => !img.isSubExclusive)
            }
            // If a specific sub-category is selected, show only images for that sub-category
            // These are the exclusive high-quality images provided by the user
            return categoryImages.filter(img => img.subCategory === activeSubCategory && img.isSubExclusive)
        }

        return categoryImages
    })()

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category)
        setActiveSubCategory("All Weddings")
        setSelectedIndex(0)
    }

    const handleSubCategoryChange = (subCategory: string) => {
        setActiveSubCategory(subCategory)
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
                <div className="space-y-12 mb-20 lg:mb-24">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
                        {mainCategories.map((category, index) => {
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

                    {/* Sub-category Filter for Weddings - FLAWLESS DYNAMIC PILL */}
                    {activeCategory === "Weddings" && (
                        <div className="flex justify-center px-4 animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-700">
                            <div
                                ref={tabsRef}
                                className="relative p-1.5 bg-foreground/[0.03] backdrop-blur-2xl rounded-full flex items-center border border-foreground/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden"
                            >
                                {/* Dynamic Sliding Background */}
                                <div
                                    className="absolute h-[calc(100%-0.75rem)] bg-foreground rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                    style={{
                                        left: `${pillStyle.left}px`,
                                        width: `${pillStyle.width}px`,
                                        opacity: pillStyle.opacity,
                                    }}
                                />

                                {weddingSubCategories.map((sub, idx) => (
                                    <SubCategoryButton
                                        key={sub}
                                        category={sub}
                                        buttonRef={(el) => (buttonRefs.current[idx] = el)}
                                        isActive={activeSubCategory === sub}
                                        onClick={() => handleSubCategoryChange(sub)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Gallery Grid - Masonry */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {filteredImages.map((image, index) => (
                        <div key={`${image.src}-${index}`} className="break-inside-avoid">
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
                                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-primary-foreground text-sm tracking-widest uppercase">
                                                {image.category}{image.subCategory ? ` / ${image.subCategory}` : ''}
                                            </p>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-5xl w-[95vw] sm:w-full h-[80vh] sm:h-[90vh] p-0 bg-foreground/95 border-none">
                                    <DialogHeader className="sr-only">
                                        <DialogTitle>
                                            {filteredImages[selectedIndex]?.alt || "Portfolio Image"}
                                        </DialogTitle>
                                        <DialogDescription>
                                            Full-size view of portfolio image
                                        </DialogDescription>
                                    </DialogHeader>

                                    {/* Image Container */}
                                    <div className="relative w-full h-full flex items-center justify-center p-4">
                                        <Image
                                            src={filteredImages[selectedIndex]?.src || "/placeholder.svg"}
                                            alt={filteredImages[selectedIndex]?.alt || "Portfolio Image"}
                                            fill
                                            className="object-contain"
                                            quality={95}
                                            sizes="95vw"
                                        />
                                    </div>

                                    {/* Navigation Controls */}
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none z-10">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={handlePrevious}
                                            className="pointer-events-auto bg-background/10 hover:bg-background/20 text-primary-foreground backdrop-blur-sm rounded-full h-12 w-12"
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                            <span className="sr-only">Previous image</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={handleNext}
                                            className="pointer-events-auto bg-background/10 hover:bg-background/20 text-primary-foreground backdrop-blur-sm rounded-full h-12 w-12"
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                            <span className="sr-only">Next image</span>
                                        </Button>
                                    </div>

                                    {/* Close Button */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsOpen(false)}
                                        className="absolute top-4 right-4 bg-background/10 hover:bg-background/20 text-primary-foreground backdrop-blur-sm rounded-full h-10 w-10 z-10"
                                    >
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Close</span>
                                    </Button>

                                    {/* Image Counter */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground text-sm z-10">
                                        {selectedIndex + 1} / {filteredImages.length}
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
