import { redirect } from 'next/navigation'
import { getUrlMapping, incrementClicks } from '@/lib/db'

interface Props {
  params: { shortCode: string }
}

export default async function ShortCodePage({ params }: Props) {
  const { shortCode } = params

  if (!shortCode) {
    redirect('/')
  }

  // 获取URL映射
  const mapping = await getUrlMapping(shortCode)

  if (!mapping) {
    redirect('/')
  }

  // 增加点击次数
  await incrementClicks(shortCode)

  // 重定向到原始URL
  redirect(mapping.originalUrl)
}
