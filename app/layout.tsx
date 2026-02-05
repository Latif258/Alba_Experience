import React from "react"
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { WhatsAppFAB } from "@/components/whatsapp-fab"


const _cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});
const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Alba Experience | Professional Photography in Ghana',
  description: 'Capturing timeless moments for all your celebrations. Wedding, graduation, and portrait photography that tells your unique story.',
  generator: 'v0.app',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <WhatsAppFAB />
        <Analytics />
      </body>
    </html>
  )
}
