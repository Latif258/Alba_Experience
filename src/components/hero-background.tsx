"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeroBackgroundProps {
    images: (string | { src: string; className?: string; theme?: "light" | "dark" })[]
    interval?: number
}

export function HeroBackground({ images, interval = 5000 }: HeroBackgroundProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        // Only broadcast if we have images
        if (!images || images.length === 0) return

        const currentItem = images[currentIndex]
        const theme = typeof currentItem === "object" ? currentItem.theme || "dark" : "dark"

        // Dispatch custom event for Navigation to listen to
        window.dispatchEvent(new CustomEvent("heroThemeChange", { detail: { theme } }))
    }, [currentIndex, images])

    useEffect(() => {
        if (images.length <= 1) return

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, interval)

        return () => clearInterval(timer)
    }, [images.length, interval])

    return (
        <div className="absolute inset-0 z-0 bg-black">
            {images.map((item, index) => {
                const src = typeof item === 'string' ? item : item.src
                const customClass = typeof item === 'string' ? undefined : item.className

                return (
                    <div
                        key={src}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <Image
                            src={src}
                            alt={`Hero background ${index + 1}`}
                            fill
                            className={cn(
                                "object-cover",
                                customClass || "object-[center_25%]"
                            )}
                            priority={index === 0}
                            quality={90}
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-foreground/20" />
                    </div>
                )
            })}
        </div>
    )
}
