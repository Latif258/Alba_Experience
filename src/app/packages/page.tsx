"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Data Structure for Packages
const mainPackages = [
    {
        name: "One Time Experience",
        price: "GHS 30,000",
        image: "/wedding-1.jpg",
        description: "The ultimate premium package covering every detail of your journey.",
        coverage: [
            "Three photographers + 1 Creative director",
            "Unlimited hours Engagement & Wedding coverage",
            "Three days photography coverage",
            "Groom & Bridal preparation",
            "Pre-event consultation & Couple exclusives",
            "Destination Pre-wedding (30 images)",
            "Same day editing (Trend)",
            "Social media reels posted on page"
        ],
        deliverables: [
            "2 weeks delivery",
            "All raw files shared for selection",
            "1000 standard photos (Online gallery)",
            "A2 Photobook (350 photos)",
            "70 retouched images",
            "2 frames",
            "Pictures on Pen drive",
            "Alba premium card"
        ]
    },
    {
        name: "True Romance",
        price: "GHS 20,000",
        image: "/wedding-5.jpg",
        description: "Extensive coverage for both traditional and white wedding ceremonies.",
        coverage: [
            "Three Photographers",
            "10 hours (traditional coverage)",
            "12 hours (wedding coverage)",
            "Bridal & Groom Preparation",
            "Couple exclusives",
            "Pre-event Consultation",
            "Pre-wedding (30 images)"
        ],
        deliverables: [
            "All raw files shared for selection",
            "A3 Photobook (200 photos)",
            "700 standard photos (Online gallery)",
            "Pictures on Pendrive",
            "Two frames"
        ]
    },
    {
        name: "Love Story",
        price: "GHS 15,000",
        image: "/modern-couple-first-look.jpg",
        description: "Perfect for capturing the essence of your love story.",
        coverage: [
            "Two Photographers",
            "8 hours traditional coverage",
            "10 hours Wedding coverage",
            "Bridal preparation & Main Ceremony",
            "Couple exclusives",
            "Pre-wedding (20 Images)"
        ],
        deliverables: [
            "All raw files shared for selection",
            "A4 pro-photobook (150 photos)",
            "500 standard photos (Online Gallery)",
            "40 retouched images",
            "Pendrive"
        ]
    },
    {
        name: "Brief Encounter",
        price: "GHS 10,000",
        image: "/wedding-3.jpg",
        description: "Essential coverage for intimate celebrations.",
        coverage: [
            "Two Photographer",
            "Traditional 6-hour coverage",
            "Wedding 8 hours coverage",
            "Bridal preparation",
            "Couple exclusives",
            "Photography coverage of the Ceremony"
        ],
        deliverables: [
            "All raw files shared for selection",
            "250 standard photos on Online gallery",
            "25 retouched images"
        ]
    }
]

const engagementPackages = [
    {
        name: "Gold",
        price: "GHS 12,000",
        image: "/traditional-couple.jpg",
        coverage: [
            "Three photographers",
            "10 hours photography coverage",
            "Groom and Bridal preparation",
            "Ceremony and reception",
            "Couple exclusives",
            "Pre wedding (15 images)"
        ],
        deliverables: [
            "All raw files shared for selection",
            "A4 photobook (150 images)",
            "450 standard photos (Online Gallery)",
            "40 retouched images"
        ]
    },
    {
        name: "Silver",
        price: "GHS 7,000",
        image: "/traditional-couple-2.jpg",
        coverage: [
            "One photographer",
            "6 hours Coverage",
            "Bridal preparation",
            "Ceremony and reception",
            "Couple exclusives"
        ],
        deliverables: [
            "All raw files shared for selection",
            "Online Gallery",
            "350 soft copies on google drive",
            "25 retouched images"
        ]
    }
]

const weddingOnlyPackages = [
    {
        name: "Gold",
        price: "GHS 12,000",
        image: "/wedding-2.jpg",
        coverage: [
            "Three photographers",
            "12 hours coverage",
            "Groom AND Bridal preperation",
            "Ceremony AND reception",
            "Couple exclusives",
            "Pre wedding (20 images)"
        ],
        deliverables: [
            "All raw files shared for selection",
            "A4 photobook (150img)",
            "450 standard photos (Online gallery)",
            "40 retouched images"
        ]
    },
    {
        name: "Silver",
        price: "GHS 7,000",
        image: "/first-look.jpg",
        coverage: [
            "One photograper",
            "8 hours coverage",
            "Bridal preperation",
            "Couple exclusives"
        ],
        deliverables: [
            "All raw files shared for selection",
            "350 soft copies on google drive",
            "Pictures on pen drive",
            "15 retouched images"
        ]
    }
]

const photoVideoPackages = [
    {
        name: "Mega",
        price: "GHS 32,000",
        image: "/bridesmaids-group.jpg",
        description: "Comprehensive photo and video photojournalism.",
        coverage: [
            "Two photographers + Three videographers",
            "Drone Coverage",
            "Bridal & Groom prep",
            "Reception & Exclusives session",
            "Pre wedding (30 images)",
            "Consultation for couple"
        ],
        deliverables: [
            "A3 big size photobook (200 images)",
            "2 frames",
            "50 retouched images",
            "800 soft copies on pendrive",
            "Video trailer & Full length video on pendrive"
        ]
    },
    {
        name: "Masterpiece",
        price: "GHS 25,000",
        image: "/couple-stone-wall.jpg",
        description: "A perfect blend of motion and stills.",
        coverage: [
            "2 photographers + 2 videographers",
            "Bridal prep & Reception",
            "Exclusive shoot",
            "Pre wedding in the studio (two outfits maximum)"
        ],
        deliverables: [
            "Small size photo book 150 images(A4)",
            "30 retouch images",
            "Video Trailer & Full length video on pen drive",
            "All raw files shared for selection"
        ]
    },
    {
        name: "Precious Moment",
        price: "GHS 20,000",
        image: "/bridesmaids-yellow.jpg",
        description: "Capture the precious moments in high definition.",
        coverage: [
            "Two photographer + Two videographers",
            "Bridal prep",
            "Exlusive session",
            "Reception"
        ],
        deliverables: [
            "400 soft copies on pen drive",
            "Video trailer",
            "Full video on pendrive",
            "All raw files shared for selection"
        ]
    }
]

const extras = [
    { item: "Extra Photographer", price: "GHS 2,000" },
    { item: "Drone (One day)", price: "GHS 1,500" },
    { item: "Drone (Two days)", price: "GHS 2,200" },
    { item: "Photobook (8x20)", price: "GHS 2,000" },
    { item: "Photobook (10x28)", price: "GHS 2,700" },
    { item: "Frame (10x12)", price: "GHS 300" },
    { item: "Frame (12x16)", price: "GHS 450" },
    { item: "Frame (16x20)", price: "GHS 550" },
    { item: "Laptop Rentage", price: "Contact for price" }, // Placeholder if needed
]

const prePostWedding = [
    { item: "2 looks (Photos only) - Studio or Outdoor", price: "GHS 2,000" },
    { item: "3 looks (Photos only) - Studio or Outdoor", price: "GHS 3,500" },
    { item: "4 looks (Photos only) - Both Studio & Outdoor", price: "GHS 4,000" }, // Inferred from page 11
    { item: "Bachelorette (2 hours)", price: "GHS 2,000" },
    { item: "Thanksgiving (2 hours Max - Photos only)", price: "GHS 3,000" },
    { item: "Sunday Lunch (3 hours - Photos only)", price: "GHS 3,000" },
    { item: "Christening (2 hours - Photos only)", price: "GHS 2,500" },
]

function PackageCard({ pkg }: { pkg: any }) {
    return (
        <Card className="flex flex-col h-full border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 group">
            <div className="relative h-48 w-full overflow-hidden">
                {pkg.image && (
                    <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
            <CardHeader>
                <div className="mb-2">
                    <CardTitle className="text-2xl font-light text-primary">{pkg.name}</CardTitle>
                    <div className="text-2xl font-bold mt-1 text-foreground">{pkg.price}</div>
                </div>
                {pkg.description && <CardDescription className="text-base line-clamp-3">{pkg.description}</CardDescription>}
            </CardHeader>
            <CardContent className="flex-1 space-y-8">
                <div>
                    <h4 className="flex items-center gap-2 font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                        <Info className="w-5 h-5" /> Coverage
                    </h4>
                    <ul className="space-y-3">
                        {pkg.coverage.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-base text-foreground/90">
                                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">Deliverables</h4>
                    <ul className="space-y-3">
                        {pkg.deliverables.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-base text-foreground/90">
                                <span className="w-2 h-2 rounded-full bg-primary/40 mt-2 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full" size="lg">
                    <Link
                        href={`https://wa.me/233530458823?text=${encodeURIComponent(`Hi Alba Experience, I'm interested in booking the ${pkg.name} package. Could you please provide more information?`)}`}
                        target="_blank"
                    >
                        Book This Package
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function PackagesPage() {
    return (
        <main className="min-h-screen flex flex-col pt-0 bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[60vh] min-h-[300px] md:min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/wedding-2.jpg"
                        alt="Alba Experience Packages"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <p className="text-primary-foreground/90 tracking-[0.3em] uppercase text-sm mb-4">
                        Investment Guide
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground mb-6">
                        Packages & Services
                    </h1>
                    <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                        Transparent pricing tailored to your unique needs. Choose the perfect collection for your special occasion.
                    </p>
                </div>
            </section>

            <section className="flex-1 py-16 px-6">
                <div className="max-w-7xl mx-auto space-y-12">

                    <Tabs defaultValue="wedding" className="w-full">
                        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
                            <TabsList className="h-auto p-1 bg-muted/50 rounded-full">
                                <TabsTrigger value="wedding" className="px-6 py-3 rounded-full text-base">Full Wedding</TabsTrigger>
                                <TabsTrigger value="photo-video" className="px-6 py-3 rounded-full text-base">Photo + Video</TabsTrigger>
                                <TabsTrigger value="engagement" className="px-6 py-3 rounded-full text-base">Engagement Only</TabsTrigger>
                                <TabsTrigger value="wedding-only" className="px-6 py-3 rounded-full text-base">Wedding Only</TabsTrigger>
                                <TabsTrigger value="extras" className="px-6 py-3 rounded-full text-base">Extras & Add-ons</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="wedding" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                {mainPackages.map((pkg) => (
                                    <PackageCard key={pkg.name} pkg={pkg} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="photo-video" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {photoVideoPackages.map((pkg) => (
                                    <PackageCard key={pkg.name} pkg={pkg} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="engagement" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {engagementPackages.map((pkg) => (
                                    <PackageCard key={pkg.name} pkg={pkg} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="wedding-only" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {weddingOnlyPackages.map((pkg) => (
                                    <PackageCard key={pkg.name} pkg={pkg} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="extras" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-light">Extras & Adjustments</CardTitle>
                                        <CardDescription>Add-ons to customize your package</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-6">
                                            {extras.map((extra, i) => (
                                                <li key={i} className="flex justify-between items-center border-b border-border/50 pb-3 last:border-0 last:pb-0">
                                                    <span className="text-base text-foreground/90">{extra.item}</span>
                                                    <span className="text-lg font-medium text-primary">{extra.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-light">Pre / Post Wedding & Events</CardTitle>
                                        <CardDescription className="text-base">Rates for additional sessions and events</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-6">
                                            {prePostWedding.map((item, i) => (
                                                <li key={i} className="flex justify-between items-center border-b border-border/50 pb-3 last:border-0 last:pb-0">
                                                    <span className="text-base text-foreground/90">{item.item}</span>
                                                    <span className="text-lg font-medium text-primary">{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="max-w-4xl mx-auto mt-8 text-center bg-secondary/50 p-6 rounded-lg">
                                <p className="text-muted-foreground">
                                    <strong>Please note:</strong> Outdoor locations will attract transportation costs.
                                    Prices are subject to change. Please contact us for the most accurate quote tailored to your requirements.
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>

                </div>
            </section>

            <Footer />
        </main>
    )
}
