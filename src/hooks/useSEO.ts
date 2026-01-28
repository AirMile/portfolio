import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  url?: string
  image?: string
  type?: 'website' | 'article'
}

const BASE_URL = 'https://portfolio-sooty-xi-pbtugrdf2f.vercel.app'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export function useSEO({
  title,
  description,
  url = BASE_URL,
  image = DEFAULT_IMAGE,
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
