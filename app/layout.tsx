import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'B2L - Modern URL Shortener',
  description: 'Transform long URLs into short, shareable links. Fast, secure, and completely free.',
  keywords: ['url shortener', 'short links', 'link shortener', 'B2L', 'url shortening'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
}
