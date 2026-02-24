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

                {/* Facebook Button */}
                <Link
                    href="https://www.facebook.com/collins.sarpong.948/?http_ref=eyJ0cyI6MTc3MTg5MTA5MDAwMCwiciI6IiJ9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button facebook-button"
                    aria-label="Follow on Facebook"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                </Link>

                {/* Threads Button */}
                <Link
                    href="https://www.threads.com/@alba_experience?igshid=NTc4MTIwNjQ2YQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button threads-button"
                    aria-label="Follow on Threads"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                    </svg>
                </Link>

                {/* Main Button */}
                <button className="social-main-button" aria-label="Social Links">
                    <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
                </button>
            </div>
        </div>
    )
}
