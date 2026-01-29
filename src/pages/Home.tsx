import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { ScrollArrow } from '@/components/ui/ScrollArrow'
import { useSEO } from '@/hooks/useSEO'
import { useStructuredData } from '@/hooks/useStructuredData'
import { BASE_URL } from '@/lib/constants'

export function Home() {
  useSEO({
    title: 'Miles Zeilstra | Creative Developer',
    description:
      'Portfolio van Miles Zeilstra - Creative Developer gespecialiseerd in React, TypeScript en interactieve web ervaringen.',
  })

  useStructuredData([
    {
      '@type': 'Person',
      name: 'Miles Zeilstra',
      jobTitle: 'Creative Developer',
      url: BASE_URL,
    },
    {
      '@type': 'WebSite',
      name: 'Miles Zeilstra Portfolio',
      url: BASE_URL,
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
