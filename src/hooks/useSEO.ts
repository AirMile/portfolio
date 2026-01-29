import { useEffect } from 'react'
import { BASE_URL, DEFAULT_OG_IMAGE } from '@/lib/constants'

interface SEOProps {
  title: string
  description: string
  url?: string
  image?: string
  type?: 'website' | 'article'
}

export function useSEO({
  title,
  description,
  url = BASE_URL,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    document.title = title

    const metaTags: Record<string, string> = {
      description,
      'og:title': title,
      'og:description': description,
      'og:url': url,
      'og:image': image,
      'og:type': type,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    }

    Object.entries(metaTags).forEach(([key, value]) => {
      const isOgOrTwitter = key.startsWith('og:') || key.startsWith('twitter:')
      const selector = isOgOrTwitter
        ? `meta[property="${key}"], meta[name="${key}"]`
        : `meta[name="${key}"]`

      let element = document.querySelector(selector) as HTMLMetaElement | null

      if (!element) {
        element = document.createElement('meta')
        if (key.startsWith('og:')) {
          element.setAttribute('property', key)
        } else {
          element.setAttribute('name', key)
        }
        document.head.appendChild(element)
      }

      element.setAttribute('content', value)
    })

    const canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null
    if (canonical) {
      canonical.href = url
    }
  }, [title, description, url, image, type])
}
