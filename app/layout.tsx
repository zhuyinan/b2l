import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'B2L - Free URL Shortener | Create Short Links Instantly',
    template: '%s | B2L - Free URL Shortener'
  },
  description: 'Transform long URLs into short, shareable links with B2L. Fast, secure, and completely free URL shortening service. No registration required.',
  keywords: [
    'url shortener',
    'short links', 
    'link shortener',
    'B2L',
    'url shortening',
    'free url shortener',
    'short url generator',
    'link shortener tool',
    'url compressor',
    'short link service'
  ],
  authors: [{ name: 'B2L Team' }],
  creator: 'B2L',
  publisher: 'B2L',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://b2l.me'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'B2L - Free URL Shortener | Create Short Links Instantly',
    description: 'Transform long URLs into short, shareable links with B2L. Fast, secure, and completely free URL shortening service.',
    url: 'https://b2l.me',
    siteName: 'B2L',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'B2L - Free URL Shortener | Create Short Links Instantly',
    description: 'Transform long URLs into short, shareable links with B2L. Fast, secure, and completely free.',
    creator: '@b2l_me',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '0rbPHVjxPWo6aw88Z2viKWVNNdWsls8mw20D9QqyFDc',
  },
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
