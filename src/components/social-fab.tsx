"use client"

import { Instagram, Mail, MessageCircle, Plus } from "lucide-react"
import Link from "next/link"

export function SocialFAB() {
    return (
        <div className="social-buttons-container">
            <div className="social-buttons group">
                {/* Email Button */}
                <Link
                    href="mailto:albaexperiencestudios@gmail.com"
                    className="social-button email-button"
                    aria-label="Email Us"
                >
                    <Mail className="h-5 w-5" />
                </Link>

                {/* WhatsApp Button */}
                <Link
                    href="https://wa.me/233530458823"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button whatsapp-button"
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircle className="h-5 w-5" />
                </Link>

                {/* Instagram Button */}
                <Link
                    href="https://www.instagram.com/alba_experience?igsh=ZG1vMGh1dnR5Z2xy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button instagram-button"
                    aria-label="Follow on Instagram"
                >
                    <Instagram className="h-5 w-5" />
                </Link>

                {/* Main Button */}
                <button className="social-main-button" aria-label="Social Links">
                    <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
                </button>
            </div>
        </div>
    )
}
