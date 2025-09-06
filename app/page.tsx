'use client'

import { useState } from 'react'
import { CheckIcon, CopyIcon, SparklesIcon } from '@/components/icons'
import { trackEvent } from '@/components/analytics'
import { StructuredData } from '@/components/structured-data'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate short link')
      }

      const data = await response.json()
      setShortUrl(data.shortUrl)
      
      // 跟踪短链创建事件
      trackEvent('short_link_created', {
        event_category: 'engagement',
        event_label: 'url_shortened'
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
      // 跟踪复制事件
      trackEvent('copy_to_clipboard', {
        event_category: 'engagement',
        event_label: 'link_copied'
      })
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const reset = () => {
    setUrl('')
    setShortUrl('')
    setError('')
    setCopied(false)
  }

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <main className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-lg">
            <SparklesIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            B2L
          </h1>
          <p className="text-xl text-gray-600 font-medium">Transform long URLs into short, shareable links</p>
          <p className="text-sm text-gray-500 mt-2">Fast, secure, and completely free</p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-2xl">
          {!shortUrl ? (
            // Input Form
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-3">
                    Enter your long URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/very/long/url/that/needs/shortening"
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !url}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    'Create Short Link'
                  )}
                </button>
              </form>
            </div>
          ) : (
            // Result Display
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-6 shadow-lg">
                    <CheckIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Link Created Successfully!</h3>
                  <p className="text-gray-600">Your short link is ready to share</p>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Your Short Link</p>
                      <p className="text-xl font-mono text-gray-900 truncate bg-white px-4 py-2 rounded-xl border">{shortUrl}</p>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="ml-4 p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-gray-200 hover:border-blue-200"
                      title={copied ? 'Copied!' : 'Copy link'}
                    >
                      {copied ? (
                        <CheckIcon className="w-6 h-6 text-green-600" />
                      ) : (
                        <CopyIcon className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Original URL</p>
                  <p className="text-sm text-gray-700 break-all bg-white px-4 py-2 rounded-xl border">{url}</p>
                </div>

                <button
                  onClick={reset}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                >
                  Create Another Link
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-500">
            Built with ❤️ for the modern web
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Secure • Fast • Reliable
          </p>
        </div>
      </main>
      </div>
    </>
  )
}
