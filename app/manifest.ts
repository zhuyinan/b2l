import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'B2L - Free URL Shortener',
    short_name: 'B2L',
    description: 'Transform long URLs into short, shareable links. Fast, secure, and completely free.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [],
  }
}
