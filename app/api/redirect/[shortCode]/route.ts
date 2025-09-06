import { NextRequest, NextResponse } from 'next/server'
import { getUrlMapping, incrementClicks } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  try {
    const { shortCode } = params

    if (!shortCode) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // 获取URL映射
    const mapping = await getUrlMapping(shortCode)

    if (!mapping) {
      // 短链不存在，重定向到首页
      return NextResponse.redirect(new URL('/', request.url))
    }

    // 异步增加点击次数（不阻塞重定向）
    incrementClicks(shortCode).catch(console.error)

    // 重定向到原始URL
    return NextResponse.redirect(mapping.originalUrl, 302)
  } catch (error) {
    console.error('Redirect error:', error)
    return NextResponse.redirect(new URL('/', request.url))
  }
}
