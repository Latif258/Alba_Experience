"use client"

import CircularGallery from "./circular-gallery"

const galleryData = [
    {
        text: "ETHEL'S WEDDING",
        link: "https://alba-experience.client-gallery.com/gallery/ethel-wedding",
        image: "/galleries/Ethel Engagement and Wedding_84.avif"
    },
    {
        text: "ANGELA & PRINCE",
        link: "https://alba-experience.client-gallery.com/gallery/angela-and-prince-wedding",
        image: "/galleries/Angela & Prince wedding.avif"
    },
    {
        text: "PORTIA & JACOB",
        link: "https://alba-experience.client-gallery.com/gallery/portia-and-jacob",
        image: "/galleries/Portia & Jacob wedding.avif"
    },
    {
        text: "TRUDY'S PORTRAIT",
        link: "https://alba-experience.client-gallery.com/gallery/trudyportrait1",
        image: "/galleries/TrudyPortrait.avif"
    },
    {
        text: "FAITH'S MATERNITY",
        link: "https://alba-experience.client-gallery.com/gallery/faith-pregnancy",
        image: "/galleries/Faith Pregnancy_10.avif"
    },
    {
        text: "ABIGAIL & GILLES",
        link: "https://alba-experience.client-gallery.com/gallery/abigail-and-gilles",
        image: "/galleries/Abigail&Gilles_2.avif"
    },
    {
        text: "ARABA'S MOMENTS",
        link: "https://alba-experience.client-gallery.com/gallery/araba-extra",
        image: "/galleries/araba.avif"
    },
    {
        text: "AFFUA & AGYIMAN",
        link: "https://alba-experience.client-gallery.com/gallery/affua-and-agyiman",
        image: "/galleries/Efuah & Agyemang.avif"
    },
    {
        text: "NANA AMA & NANA",
        link: "https://alba-experience.client-gallery.com/gallery/nana-ama-wedding",
        image: "/galleries/Nana Ama & Agyemang Badu.avif"
    },
    {
        text: "ETHEL & PARTNER",
        link: "https://alba-experience.client-gallery.com/gallery/ethelprewedding",
        image: "/galleries/EthelPreWeddingreal_8.avif"
    },
    {
        text: "PREWEDDING MAGIC",
        link: "https://alba-experience.client-gallery.com/gallery/preweddingl",
        image: "/galleries/PreWeddingN_4.avif"
    },
    {
        text: "TURQUOISE GLAM",
        link: "https://alba-experience.client-gallery.com/gallery/planshootturquiose",
        image: "/galleries/PlanshootTurquiose_18.avif"
    },
    {
        text: "SEEDBRIDE SPECIAL",
        link: "https://alba-experience.client-gallery.com/gallery/seedbridewedding",
        image: "/galleries/SeedbrideWed_27.avif"
    },
    {
        text: "EKOW (TRADITIONAL)",
        link: "https://alba-experience.client-gallery.com/gallery/ekow-traditional-ceremony",
        image: "/galleries/ekow traditional.avif"
    },
    {
        text: "EKOW & BRIDE",
        link: "https://alba-experience.client-gallery.com/gallery/ekowwedding",
        image: "/galleries/ekow wedding.avif"
    },
    {
        text: "AGYEIWAA & MITCH",
        link: "https://alba-experience.client-gallery.com/gallery/agyeiwaa-and-mich",
        image: "/galleries/Agyeiwaa & Mich.avif"
    },
    {
        text: "EMERFA & ARTHUR",
        link: "https://alba-experience.client-gallery.com/gallery/emerfa-and-arthurengagement",
        image: "/galleries/Emefa & Arthur.avif"
    },
    {
        text: "TURQUOISE COUTURE",
        link: "https://alba-experience.client-gallery.com/gallery/turquoisecouture",
        image: "/galleries/TurquoiseCouture_23.avif"
    },
    {
        text: "PORTIA'S PORTRAITS",
        link: "https://alba-experience.client-gallery.com/gallery/portia",
        image: "/galleries/Portia.avif"
    },
    {
        text: "FIRSTBANK STAFF AWARDS",
        link: "https://alba-experience.client-gallery.com/gallery/firstbank-staff-awards",
        image: "/galleries/firstbank_staff_awards.avif"
    },
    {
        text: "GOLF FBN BANK",
        link: "https://alba-experience.client-gallery.com/gallery/golf-fbn-bank",
        image: "/galleries/golf_fbn_bank.avif"
    },
    {
        text: "FBN NYC",
        link: "https://alba-experience.client-gallery.com/gallery/fbn-nyc",
        image: "/galleries/fbn_nyc.avif"
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
