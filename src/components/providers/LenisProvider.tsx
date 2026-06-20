import { useEffect, useRef, createContext, useContext, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

type LenisContextType = {
  lenis: Lenis | null
  scrollToTop: () => void
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollToTop: () => {},
})

export function useLenis() {
  return useContext(LenisContext)
}

type LenisProviderProps = {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  // Initialize Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      anchors: true,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Handle route changes: scroll to anchor or top
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    // Check for hash anchor on route change
    const hash = location.hash
    const pathChanged = prevPathRef.current !== location.pathname
    prevPathRef.current = location.pathname

    if (hash && pathChanged) {
      // Stop Lenis temporarily
      lenis.stop()

      const scrollToHash = (attempts = 0) => {
        const element = document.querySelector(hash) as HTMLElement | null
        if (element) {
          // Use native scrollIntoView for reliability
          element.scrollIntoView({ behavior: 'instant' })
          lenis.start()
        } else if (attempts < 20) {
          // Retry if element not found yet
          setTimeout(() => scrollToHash(attempts + 1), 50)
        } else {
          // Give up, restart Lenis
          lenis.start()
        }
      }

      // Wait for React to render the new page
      setTimeout(scrollToHash, 50)
    }
  }, [location.pathname, location.hash])

  // Scroll to top function
  const scrollToTop = () => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollToTop }}>
      {children}
    </LenisContext.Provider>
  )
}
