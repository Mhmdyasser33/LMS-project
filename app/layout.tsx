import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import ToastProvider from '@/components/providers/toast-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LMS project',
  description: 'this is my project is specified for learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <ConfettiProvider/>
          <ToastProvider/>
          {children}
          </body>
    </html>
    </ClerkProvider>
  )
}
