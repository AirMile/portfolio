import { lazy, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { LenisProvider, useLenis } from '@/components/providers/LenisProvider'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Starfield, triggerWarp } from '@/components/background'
import { PageTransition } from '@/components/animation/PageTransition'
const Home = lazy(() =>
  import('@/pages/Home').then((m) => ({ default: m.Home }))
)
const ProjectDetail = lazy(() =>
  import('@/pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail }))
)

function AnimatedRoutes() {
  const location = useLocation()
  const { lenis } = useLenis()
  const prevPathRef = useRef<string | null>(null)
  const directionRef = useRef(1)
  const isInitialLoad = prevPathRef.current === null

  // Calculate direction before render, update ref after
  if (
    prevPathRef.current !== null &&
    prevPathRef.current !== location.pathname
  ) {
    // Going to home = back (-1), going deeper = forward (1)
    const newDirection = location.pathname === '/' ? -1 : 1
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
    // Only scroll to top if not navigating to a hash anchor
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
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition direction={direction} skipInitial={isInitialLoad}>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <PageTransition direction={direction} skipInitial={isInitialLoad}>
              <ProjectDetail />
            </PageTransition>
          }
        />
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
          <main className="relative z-10 overflow-x-hidden pt-16">
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
