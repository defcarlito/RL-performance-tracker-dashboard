import type { Metadata } from "next"
import { Geist, Geist_Mono, Oxanium } from "next/font/google"
import "./globals.css"

const oxSans = Oxanium({
  subsets: ["latin"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "RL Stats Dashboard",
  description: "View BrickBoned's match log.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={oxSans.className}>
      <body>{children}</body>
    </html>
  )
}
