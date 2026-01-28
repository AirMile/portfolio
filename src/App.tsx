import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { LenisProvider, useLenis } from '@/components/providers/LenisProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Starfield } from '@/components/background'
import { PageTransition } from '@/components/animation/PageTransition'
import { Home } from '@/pages/Home'
import { ProjectDetail } from '@/pages/ProjectDetail'

function AnimatedRoutes() {
  const location = useLocation()
  const { lenis } = useLenis()
  const prevPathRef = useRef<string | null>(null)
  const directionRef = useRef(1)

  // Calculate direction before render, update ref after
  if (
    prevPathRef.current !== null &&
    prevPathRef.current !== location.pathname
  ) {
    // Going to home = back (-1), going deeper = forward (1)
    directionRef.current = location.pathname === '/' ? -1 : 1
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
            <PageTransition direction={direction}>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <PageTransition direction={direction}>
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
          <Header />
          <main className="relative z-10 overflow-x-hidden pt-16">
            <AnimatedRoutes />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </LenisProvider>
    </BrowserRouter>
  )
}

export default App
