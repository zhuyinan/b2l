import { kv } from '@vercel/kv'
import { nanoid } from 'nanoid'

export interface UrlMapping {
  id: string
  originalUrl: string
  shortCode: string
  createdAt: string
  clicks: number
}

// 本地开发时的内存存储
const localStorage = new Map<string, UrlMapping>()

// 检查是否在本地开发环境
const isLocalDev = process.env.NODE_ENV === 'development' && !process.env.KV_REST_API_URL

// 生成短码
export function generateShortCode(): string {
  return nanoid(6) // 生成6位短码
}

// 验证URL格式
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

// 保存URL映射
export async function saveUrlMapping(originalUrl: string): Promise<UrlMapping> {
  const shortCode = generateShortCode()
  const mapping: UrlMapping = {
    id: nanoid(),
    originalUrl,
    shortCode,
    createdAt: new Date().toISOString(),
    clicks: 0,
  }

  if (isLocalDev) {
    // 本地开发时使用内存存储
    localStorage.set(`url:${shortCode}`, mapping)
  } else {
    // 生产环境使用Vercel KV
    await kv.set(`url:${shortCode}`, mapping)
  }
  
  return mapping
}

// 获取URL映射
export async function getUrlMapping(shortCode: string): Promise<UrlMapping | null> {
  try {
    if (isLocalDev) {
      // 本地开发时从内存存储读取
      return localStorage.get(`url:${shortCode}`) || null
    } else {
      // 生产环境从Vercel KV读取
      const mapping = await kv.get<UrlMapping>(`url:${shortCode}`)
      return mapping
    }
  } catch {
    return null
  }
}

// 增加点击次数
export async function incrementClicks(shortCode: string): Promise<void> {
  try {
    const mapping = await getUrlMapping(shortCode)
    if (mapping) {
      mapping.clicks += 1
      
      if (isLocalDev) {
        // 本地开发时更新内存存储
        localStorage.set(`url:${shortCode}`, mapping)
      } else {
        // 生产环境更新Vercel KV
        await kv.set(`url:${shortCode}`, mapping)
      }
    }
  } catch (error) {
    console.error('Failed to increment clicks:', error)
  }
}
