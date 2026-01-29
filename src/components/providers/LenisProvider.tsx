import { useEffect, useRef, createContext, useContext, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Snap from 'lenis/snap'

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
  const snapRef = useRef<Snap | null>(null)
  const snapRemoversRef = useRef<(() => void)[]>([])
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  // Initialize Lenis and Snap once
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

    // Track previous scroll position to detect direction at snap time
    let prevScroll = 0

    // Snap for section transitions (downward only)
    const snap = new Snap(lenis, {
      type: 'proximity',
      onSnapStart: (snapItem) => {
        // Only allow snap when coming from above (scrolling down into snap point)
        // Cancel if already past the snap point (prevents snapping back up)
        if (prevScroll >= snapItem.value) {
          lenis.stop()
          lenis.start()
        }
      },
    })
    snapRef.current = snap

    // Track scroll position
    lenis.on('scroll', () => {
      prevScroll = lenis.scroll
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Update snap points on resize
    const handleResize = () => {
      updateSnapPoints()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      snap.destroy()
      lenis.destroy()
      lenisRef.current = null
      snapRef.current = null
    }
  }, [])

  // Update snap points function
  const updateSnapPoints = () => {
    const snap = snapRef.current
    if (!snap) return

    // Clear existing snap points
    snapRemoversRef.current.forEach((remove) => remove())
    snapRemoversRef.current = []

    // No snap on mobile
    if (window.innerWidth < 768) return

    // Only add snap points on homepage
    const aboutEl = document.getElementById('about')
    if (!aboutEl) return

    // Hero → About (viewport height)
    snapRemoversRef.current.push(snap.add(window.innerHeight))

    // About → Projects
    const projectsEl = document.getElementById('projects')
    if (projectsEl) {
      snapRemoversRef.current.push(snap.add(projectsEl.offsetTop))
    }

    // Projects → Skills
    const skillsEl = document.getElementById('skills')
    if (skillsEl) {
      snapRemoversRef.current.push(snap.add(skillsEl.offsetTop))
    }

    // Skills → Contact
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      snapRemoversRef.current.push(snap.add(contactEl.offsetTop))
    }
  }

  // Initialize snap points on first load
  useEffect(() => {
    // Delay to ensure DOM is ready after initial render
    const timer = setTimeout(updateSnapPoints, 100)
    return () => clearTimeout(timer)
  }, [])

  // Handle route changes: scroll to anchor or top, and update snap points
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    // Check for hash anchor on route change
    const hash = location.hash
    const pathChanged = prevPathRef.current !== location.pathname
    prevPathRef.current = location.pathname

    if (hash && pathChanged) {
      // Clear snap points to prevent interference with hash scroll
      snapRemoversRef.current.forEach((remove) => remove())
      snapRemoversRef.current = []

      // Stop Lenis temporarily
      lenis.stop()

      const scrollToHash = (attempts = 0) => {
        const element = document.querySelector(hash) as HTMLElement | null
        if (element) {
          // Use native scrollIntoView for reliability
          element.scrollIntoView({ behavior: 'instant' })
          // Restart Lenis and restore snap points
          lenis.start()
          requestAnimationFrame(updateSnapPoints)
        } else if (attempts < 20) {
          // Retry if element not found yet
          setTimeout(() => scrollToHash(attempts + 1), 50)
        } else {
          // Give up, restart Lenis
          lenis.start()
          requestAnimationFrame(updateSnapPoints)
        }
      }

      // Wait for React to render the new page
      setTimeout(scrollToHash, 50)
    } else if (pathChanged) {
      // Don't scroll here - let AnimatePresence handle scroll timing
      // Update snap points after DOM is ready
      setTimeout(updateSnapPoints, 500)
    }
  }, [location.pathname, location.hash])

  // Scroll to top function that bypasses snap
  const scrollToTop = () => {
    const lenis = lenisRef.current
    if (lenis) {
      // Clear snap points temporarily to prevent interference
      snapRemoversRef.current.forEach((remove) => remove())
      snapRemoversRef.current = []

      // Track if snap points have been restored
      let restored = false
      const restoreSnapPoints = () => {
        if (restored) return
        restored = true
        requestAnimationFrame(updateSnapPoints)
      }

      // Stop current animation and scroll smoothly
      lenis.stop()
      lenis.start()
      lenis.scrollTo(0, {
        duration: 1.2,
        onComplete: restoreSnapPoints,
      })

      // Backup: restore snap points after duration + buffer
      setTimeout(restoreSnapPoints, 1500)
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
