import { lazy, Suspense, useEffect, useRef } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useParams,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { LenisProvider, useLenis } from '@/components/providers/LenisProvider'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Starfield, triggerWarp } from '@/components/background'
import { PageTransition } from '@/components/animation/PageTransition'
import { LanguageRedirect } from '@/components/routing/LanguageRedirect'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/lib/constants'

const Home = lazy(() =>
  import('@/pages/Home').then((m) => ({ default: m.Home }))
)
const ProjectDetail = lazy(() =>
  import('@/pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail }))
)

function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>()
  const { i18n } = useTranslation()

  const isValid =
    locale && (SUPPORTED_LOCALES as readonly string[]).includes(locale)

  useEffect(() => {
    if (isValid && i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
    if (isValid) {
      document.documentElement.lang = locale!
    }
  }, [locale, i18n, isValid])

  if (!isValid) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />
  }

  return <Outlet />
}

function stripLocale(path: string): string {
  const segments = path.split('/')
  if (
    segments[1] &&
    (SUPPORTED_LOCALES as readonly string[]).includes(segments[1])
  ) {
    return '/' + segments.slice(2).join('/')
  }
  return path
}

function AnimatedRoutes() {
  const location = useLocation()
  const { lenis } = useLenis()
  const prevPathRef = useRef<string | null>(null)
  const directionRef = useRef(1)
  const isInitialLoad = prevPathRef.current === null

  const strippedPath = stripLocale(location.pathname)
  const prevStripped = prevPathRef.current
    ? stripLocale(prevPathRef.current)
    : null

  // Calculate direction before render, skip locale-only changes
  if (prevStripped !== null && prevStripped !== strippedPath) {
    // Going to home = back (-1), going deeper = forward (1)
    const isHomePage = !strippedPath.includes('/projects/')
    const newDirection = isHomePage ? -1 : 1
    directionRef.current = newDirection
    // Trigger warp effect for page transition in slide direction
    triggerWarp(newDirection)
  }

  // Update previous path after direction is calculated
  useEffect(() => {
    prevPathRef.current = location.pathname
  }, [location.pathname])

  const direction = directionRef.current

  // Scroll to top after exit animation completes (before enter animation)
  const handleExitComplete = () => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo
    // Skip scroll-to-top when target page will handle scrolling
    if (scrollTo) return
    if (!location.hash) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }
  }

  return (
    <AnimatePresence
      mode="wait"
      custom={direction}
      onExitComplete={handleExitComplete}
    >
      <Routes location={location} key={strippedPath}>
        <Route path="/" element={<LanguageRedirect />} />
        <Route path="/:locale" element={<LocaleLayout />}>
          <Route
            index
            element={
              <PageTransition direction={direction} skipInitial={isInitialLoad}>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="projects/:slug"
            element={
              <PageTransition direction={direction} skipInitial={isInitialLoad}>
                <ProjectDetail />
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <div className="min-h-screen bg-neutral-950 text-white">
          <Starfield />
          <main className="relative z-10 min-h-screen overflow-x-hidden pt-16">
            <Suspense fallback={<div className="min-h-screen" />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </LenisProvider>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  )
}

export default App
