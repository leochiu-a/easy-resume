import type { Metadata } from "next"
import { Inter } from "next/font/google"
import NextTopLoader from "nextjs-toploader"

import { Toaster } from "@/components/ui/toaster"

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
          "bg-background min-h-screen font-sans antialiased",
          inter.className,
        )}
      >
        <NextTopLoader
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <Toaster />

        {children}
      </body>
    </html>
  )
}
