import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { m, AnimatePresence } from 'motion/react'
import { useLenis } from '@/components/providers/LenisProvider'

export function ScrollToTop() {
  const { t } = useTranslation()
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)
  const { lenis } = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      // Show once the user has scrolled past the projects section. The hero is
      // just a name splash, so projects is the most useful place to jump back to.
      const projects = document.getElementById('projects')
      if (projects) {
        const projectsBottom = projects.offsetTop + projects.offsetHeight
        setIsVisible(window.scrollY > projectsBottom - window.innerHeight * 0.5)
      } else {
        setIsVisible(window.scrollY > 400)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // The detail page is short; this jump-to-projects button is only useful on the
  // long, multi-section home page.
  const isProjectDetail = /^\/[^/]+\/projects\/[^/]+/.test(location.pathname)
  if (isProjectDetail) return null

  const scrollToProjects = () => {
    if (lenis) {
      lenis.scrollTo('#projects', { duration: 1.2 })
    } else {
      document
        .getElementById('projects')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={scrollToProjects}
          className="fixed right-6 bottom-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600 bg-neutral-800 text-neutral-300 transition-colors hover:border-neutral-400 hover:text-white"
          aria-label={t('a11y.scrollToProjects')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </m.button>
      )}
    </AnimatePresence>
  )
}
