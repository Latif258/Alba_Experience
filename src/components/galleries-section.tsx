"use client"

import CircularGallery from "./circular-gallery"

const galleryData = [
    {
        text: "ETHEL'S WEDDING",
        link: "https://alba-experience.client-gallery.com/gallery/ethel-wedding",
        image: "/galleries/Ethel Engagement and Wedding_84.jpg"
    },
    {
        text: "ANGELA & PRINCE",
        link: "https://alba-experience.client-gallery.com/gallery/angela-and-prince-wedding",
        image: "/galleries/Angela & Prince wedding.jpg"
    },
    {
        text: "PORTIA & JACOB",
        link: "https://alba-experience.client-gallery.com/gallery/portia-and-jacob",
        image: "/galleries/Portia & Jacob wedding.jpg"
    },
    {
        text: "TRUDY'S PORTRAIT",
        link: "https://alba-experience.client-gallery.com/gallery/trudyportrait1",
        image: "/galleries/TrudyPortrait.jpg"
    },
    {
        text: "FAITH'S MATERNITY",
        link: "https://alba-experience.client-gallery.com/gallery/faith-pregnancy",
        image: "/galleries/Faith Pregnancy_10.jpg"
    },
    {
        text: "ABIGAIL & GILLES",
        link: "https://alba-experience.client-gallery.com/gallery/abigail-and-gilles",
        image: "/galleries/Abigail&Gilles_2.jpg"
    },
    {
        text: "ARABA'S MOMENTS",
        link: "https://alba-experience.client-gallery.com/gallery/araba-extra",
        image: "/galleries/araba.jpg"
    },
    {
        text: "AFFUA & AGYIMAN",
        link: "https://alba-experience.client-gallery.com/gallery/affua-and-agyiman",
        image: "/galleries/Efuah & Agyemang.jpg"
    },
    {
        text: "NANA AMA & NANA",
        link: "https://alba-experience.client-gallery.com/gallery/nana-ama-wedding",
        image: "/galleries/Nana Ama & Agyemang Badu.jpg"
    },
    {
        text: "ETHEL & PARTNER",
        link: "https://alba-experience.client-gallery.com/gallery/ethelprewedding",
        image: "/galleries/EthelPreWeddingreal_8.jpg"
    },
    {
        text: "PREWEDDING MAGIC",
        link: "https://alba-experience.client-gallery.com/gallery/preweddingl",
        image: "/galleries/PreWeddingN_4.jpg"
    },
    {
        text: "TURQUOISE GLAM",
        link: "https://alba-experience.client-gallery.com/gallery/planshootturquiose",
        image: "/galleries/PlanshootTurquiose_18.jpg"
    },
    {
        text: "SEEDBRIDE SPECIAL",
        link: "https://alba-experience.client-gallery.com/gallery/seedbridewedding",
        image: "/galleries/SeedbrideWed_27.jpg"
    },
    {
        text: "EKOW (TRADITIONAL)",
        link: "https://alba-experience.client-gallery.com/gallery/ekow-traditional-ceremony",
        image: "/galleries/ekow traditional.jpg"
    },
    {
        text: "EKOW & BRIDE",
        link: "https://alba-experience.client-gallery.com/gallery/ekowwedding",
        image: "/galleries/ekow wedding.jpg"
    },
    {
        text: "AGYEIWAA & MITCH",
        link: "https://alba-experience.client-gallery.com/gallery/agyeiwaa-and-mich",
        image: "/galleries/Agyeiwaa & Mich.jpg"
    },
    {
        text: "EMERFA & ARTHUR",
        link: "https://alba-experience.client-gallery.com/gallery/emerfa-and-arthurengagement",
        image: "/galleries/Emefa & Arthur.jpg"
    },
    {
        text: "TURQUOISE COUTURE",
        link: "https://alba-experience.client-gallery.com/gallery/turquoisecouture",
        image: "/galleries/TurquoiseCouture_23.jpg"
    },
    {
        text: "PORTIA'S PORTRAITS",
        link: "https://alba-experience.client-gallery.com/gallery/portia",
        image: "/galleries/Portia.jpg"
    }
]

export function GalleriesSection() {
    return (
        <section id="galleries" className="py-24 bg-background/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="text-center">
                    <p className="text-[#8b5e3c] font-medium tracking-[0.4em] uppercase text-xs sm:text-sm mb-4">
                        Full Collections
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                        Client Galleries
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Experience the full narrative. Drag or scroll horizontally to explore our complete wedding and event collections.
                    </p>
                </div>
            </div>

            <div className="h-[500px] sm:h-[600px] md:h-[700px] relative w-full translate-y-[-50px]">
                <CircularGallery
                    items={galleryData}
                    bend={1.5}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.05}
                    scrollSpeed={2.5}
                />
            </div>

            <div className="flex justify-center mt-12 px-6">
                <p className="text-sm text-muted-foreground tracking-widest uppercase animate-pulse">
                    Drag to explore • Click to View Full Story
                </p>
            </div>
        </section>
    )
}
