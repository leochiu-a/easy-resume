import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "../lib/utils/tailwindUtils"

import "./reset.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Easy Resume",
  description: "Create a resume easily",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className,
        )}
      >
        {children}
      </body>
    </html>
  )
}
