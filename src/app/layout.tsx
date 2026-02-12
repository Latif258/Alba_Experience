import React from "react"
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SocialFAB } from "@/components/social-fab"


const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'Alba Experience | Premium Photography in Ghana',
  description: 'Capturing timeless moments with an elegant, authentic touch. Specialist in Wedding, Prewedding, Traditional Engagement, Graduation, and Portrait photography in Ghana.',
  keywords: ['Photography Ghana', 'Wedding Photographer Accra', 'Alba Experience', 'Prewedding Photography', 'Ghanaian Wedding', 'Event Photography Ghana'],
  authors: [{ name: 'Alba Experience' }],
  openGraph: {
    title: 'Alba Experience | Premium Photography in Ghana',
    description: 'Elegant and authentic photography capturing your most precious moments.',
    url: 'https://albaexperience.com',
    siteName: 'Alba Experience',
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alba Experience | Premium Photography in Ghana',
    description: 'Elegant and authentic photography capturing your most precious moments.',
  },
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className={`${cormorant.className} antialiased`}>
        {children}
        <SocialFAB />
        <Analytics />
      </body>
    </html>
  )
}
