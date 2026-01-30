import { useEffect } from 'react'
import { BASE_URL, DEFAULT_OG_IMAGE, SUPPORTED_LOCALES } from '@/lib/constants'

interface SEOProps {
  title: string
  description: string
  url?: string
  image?: string
  type?: 'website' | 'article'
  locale?: string
}

export function useSEO({
  title,
  description,
  url = BASE_URL,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  locale,
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
      'og:locale': locale === 'nl' ? 'nl_NL' : 'en_US',
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

    // hreflang tags
    document.querySelectorAll('link[hreflang]').forEach((el) => el.remove())

    if (locale) {
      for (const lng of SUPPORTED_LOCALES) {
        const link = document.createElement('link')
        link.rel = 'alternate'
        link.hreflang = lng
        link.href = locale
          ? url.replace(`/${locale}`, `/${lng}`)
          : `${BASE_URL}/${lng}`
        document.head.appendChild(link)
      }

      // x-default points to English version
      const xDefault = document.createElement('link')
      xDefault.rel = 'alternate'
      xDefault.hreflang = 'x-default'
      xDefault.href = url.replace(`/${locale}`, '/en')
      document.head.appendChild(xDefault)
    }
  }, [title, description, url, image, type, locale])
}
