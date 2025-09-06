import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { saveUrlMapping, isValidUrl } from '@/lib/db'

const shortenSchema = z.object({
  url: z.string().url('请输入有效的URL'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 验证输入
    const { url } = shortenSchema.parse(body)
    
    // 额外验证URL
    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: '请输入有效的HTTP或HTTPS链接' },
        { status: 400 }
      )
    }

    // 生成短链
    const mapping = await saveUrlMapping(url)
    
    // 构建短链URL
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://b2l.me'
    
    const shortUrl = `${baseUrl}/${mapping.shortCode}`

    return NextResponse.json({
      shortUrl,
      shortCode: mapping.shortCode,
      originalUrl: mapping.originalUrl,
    })
  } catch (error) {
    console.error('Shorten URL error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '服务器内部错误，请稍后重试' },
      { status: 500 }
    )
  }
}
