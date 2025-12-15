import type { Metadata } from "next"
import { Oxanium } from "next/font/google"
import "./globals.css"

const oxSans = Oxanium({
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
