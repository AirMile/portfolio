import { useEffect, useRef, createContext, useContext, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Snap from 'lenis/snap'

type LenisContextType = Lenis | null

const LenisContext = createContext<LenisContextType>(null)

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
  }

  // Handle route changes: scroll to top and update snap points
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    // Scroll to top immediately on route change
    lenis.scrollTo(0, { immediate: true })

    // Update snap points after DOM is ready
    requestAnimationFrame(updateSnapPoints)
  }, [location.pathname])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
