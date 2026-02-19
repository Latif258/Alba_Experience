"use client"

import { useState, useEffect } from "react"
import { Star, Quote, Plus, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { testimonials as initialTestimonials, type Testimonial } from "@/data/testimonials"
import { cn } from "@/lib/utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_REVIEWS_FORMSPREE_ID || ""

export function ReviewsSection() {
    const [reviews, setReviews] = useState<Testimonial[]>(initialTestimonials)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [rating, setRating] = useState(5)
    const [isSuccess, setIsSuccess] = useState(false)

    // Load reviews from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("alba_reviews")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                // Merge initial with saved, avoiding duplicates by name/content
                const combined = [...initialTestimonials, ...parsed].filter(
                    (v, i, a) => a.findIndex(t => t.name === v.name && t.content === v.content) === i
                )
                setReviews(combined)
            } catch (e) {
                console.error("Failed to load reviews", e)
            }
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const newReview: Testimonial = {
            name: formData.get("name") as string,
            content: formData.get("content") as string,
            rating: rating,
            date: new Date().toISOString().split('T')[0]
        }

        try {
            // 1. Submit to Formspree if ID is provided
            if (FORMSPREE_FORM_ID) {
                await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
            }

            // 2. Update local state for immediate feedback
            const updatedReviews = [newReview, ...reviews]
            setReviews(updatedReviews)

            // 3. Persist locally
            const saved = localStorage.getItem("alba_reviews")
            const parsedSaved = saved ? JSON.parse(saved) : []
            localStorage.setItem("alba_reviews", JSON.stringify([newReview, ...parsedSaved]))

            setIsSuccess(true)
            setTimeout(() => {
                setIsSuccess(false)
            }, 3000)
        } catch (error) {
            console.error("Submission error:", error)
            alert("There was an issue sending your review. It has been added to the local view.")
            // Still add locally even if Formspree fails (for UX)
            setReviews([newReview, ...reviews])
        } finally {
            setIsSubmitting(false)
            // Reset form if success modal isn't enough
        }
    }

    return (
        <section className="py-24 px-6 bg-secondary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 px-4">
                    <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4 font-medium">
                        Testimonials
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                        Client Experience
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                        Real stories from our wonderful clients. We pride ourselves on creating
                        an environment where you can be your true self.
                    </p>
                </div>

                <div className="relative mb-8 px-4 md:px-0">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-3 md:-ml-4">
                            {reviews.map((testimonial, index) => (
                                <CarouselItem key={index} className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <div className="h-full p-6 bg-background border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 group flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            style={{
                                                                fill: i < testimonial.rating ? "#FFD700" : "transparent",
                                                                color: i < testimonial.rating ? "#FFD700" : "rgba(156, 163, 175, 0.3)"
                                                            }}
                                                            className="w-3.5 h-3.5"
                                                        />
                                                    ))}
                                                </div>
                                                <Quote className="w-5 h-5 text-primary/10 group-hover:text-primary/20 transition-colors" />
                                            </div>

                                            <p className="text-foreground/90 text-[0.8rem] leading-relaxed italic mb-6 line-clamp-4 min-h-[5rem] font-medium tracking-tight">
                                                "{testimonial.content}"
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                            <div>
                                                <h4 className="font-bold text-foreground text-[0.65rem] uppercase tracking-widest">{testimonial.name}</h4>
                                                <p className="text-[0.55rem] text-muted-foreground uppercase tracking-[0.2em] mt-1 font-medium">
                                                    {testimonial.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <div className="flex justify-center gap-6 mt-12 items-center">
                            <CarouselPrevious className="relative h-12 w-12 rounded-full border-border/50 bg-background/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 pointer-events-auto shadow-sm" />
                            <div className="w-12 h-[1px] bg-border/30" />
                            <CarouselNext className="relative h-12 w-12 rounded-full border-border/50 bg-background/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 pointer-events-auto shadow-sm" />
                        </div>
                    </Carousel>
                </div>

                <div className="flex justify-center mt-12">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="lg" className="rounded-full px-12 py-7 h-auto text-sm tracking-[0.25em] uppercase gap-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 bg-primary hover:bg-primary/90">
                                <Plus className="w-4 h-4" />
                                Post a Review
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[450px] border-none shadow-2xl overflow-hidden rounded-3xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                            <DialogHeader className="relative pb-2">
                                <DialogTitle className="text-xl font-light tracking-tight">Share Your Experience</DialogTitle>
                                <DialogDescription className="text-xs">
                                    Your feedback helps us grow and continue providing exceptional experiences.
                                </DialogDescription>
                            </DialogHeader>

                            {isSuccess ? (
                                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">Thank You!</h3>
                                        <p className="text-sm text-muted-foreground px-8 leading-relaxed">
                                            Your review has been posted live and sent for our records.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5 mt-2 relative">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="name" className="text-xs font-medium px-1">Your Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Enter your full name"
                                            required
                                            className="rounded-xl border-border/50 bg-background h-11 text-sm focus-visible:ring-primary/20"
                                        />
                                    </div>

                                    <div className="space-y-2 pt-1">
                                        <Label className="text-xs font-medium px-1">Rating</Label>
                                        <div className="flex gap-1.5 px-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className="transition-all hover:scale-110 active:scale-90"
                                                >
                                                    <Star
                                                        className={cn(
                                                            "w-7 h-7 transition-colors",
                                                            star <= rating
                                                                ? "fill-primary text-primary"
                                                                : "text-muted-foreground/20"
                                                        )}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="content" className="text-xs font-medium px-1">Your Review</Label>
                                        <Textarea
                                            id="content"
                                            name="content"
                                            placeholder="Tell us about your Alba Experience..."
                                            rows={4}
                                            required
                                            className="rounded-xl border-border/50 bg-background resize-none text-sm focus-visible:ring-primary/20"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-5 h-auto rounded-xl text-xs tracking-[0.2em] uppercase transition-all duration-300 mt-2 bg-primary hover:shadow-lg hover:shadow-primary/20"
                                    >
                                        {isSubmitting ? "Sending..." : "Post Review"}
                                    </Button>
                                </form>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </section>
    )
}
