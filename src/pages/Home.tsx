import { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { ScrollArrow } from '@/components/ui/ScrollArrow'
import { useSEO } from '@/hooks/useSEO'
import { useStructuredData } from '@/hooks/useStructuredData'
import { useLocale } from '@/hooks/useLocale'
import { BASE_URL } from '@/lib/constants'

export function Home() {
  const { t } = useTranslation()
  const locale = useLocale()
  const location = useLocation()

  useLayoutEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (scrollTo) {
      const el = document.getElementById(scrollTo)
      if (el) {
        el.scrollIntoView({ behavior: 'instant' })
      }
    }
  }, [location.state])

  useSEO({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    url: `${BASE_URL}/${locale}`,
    locale,
  })

  useStructuredData([
    {
      '@type': 'Person',
      name: 'Miles Zeilstra',
      jobTitle: 'Creative Developer',
      url: `${BASE_URL}/${locale}`,
    },
    {
      '@type': 'WebSite',
      name: 'Miles Zeilstra Portfolio',
      url: `${BASE_URL}/${locale}`,
      inLanguage: locale,
    },
  ])

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <ScrollArrow />
    </>
  )
}
