"use client"

import { MessageCircle } from "lucide-react"
import Link from "next/link"

export function WhatsAppFAB() {
    return (
        <Link
            href="https://wa.me/233530458823"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="h-6 w-6" fill="white" />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-foreground px-3 py-1.5 rounded-md text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
                Chat with us
            </span>
        </Link>
    )
}
