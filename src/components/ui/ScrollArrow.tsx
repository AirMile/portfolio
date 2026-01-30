import { useEffect, useRef, useState } from 'react'
import { SECTIONS, MOBILE_BREAKPOINT } from '@/lib/constants'
import { gsap, useGSAP } from '@/lib/gsap'

const ARROW_BOTTOM = 144 // bottom-36 = 9rem = 144px

// Visibility zones: arrow shows in the padding gap between sections
// Per-transition zone offsets from the section boundary
// On mobile, sections are much taller so zones are skipped (always visible)
const ZONE_CONFIG: Record<string, { above: number; below: number }> = {
  'hero→about': { above: 350, below: 200 },
  'about→projects': { above: 80, below: 200 },
  'projects→skills': { above: 80, below: 200 },
  'skills→contact': { above: 80, below: 120 },
}

export function ScrollArrow() {
  const [targetId, setTargetId] = useState('about')
  const [visible, setVisible] = useState(true)
  const [bouncing, setBouncing] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Intro animatie die aansluit bij de hero tekst timeline
  useGSAP(() => {
    if (!svgRef.current) return
    gsap.set(svgRef.current, { opacity: 0, y: 20 })
    gsap.to(svgRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 2.2,
      ease: 'power3.out',
      onComplete: () => {
        gsap.set(svgRef.current!, { clearProps: 'all' })
        setBouncing(true)
      },
    })
  })

  // Cache DOM element references to avoid repeated queries during scroll
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map())
  const rafRef = useRef(0)

  useEffect(() => {
    // Cache section elements once at mount
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) elementsRef.current.set(id, el)
    })

    const update = () => {
      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY
      const arrowScreenY = viewportHeight - ARROW_BOTTOM

      // Find which section is currently most visible
      let currentIndex = 0
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = elementsRef.current.get(SECTIONS[i])
        if (el && el.offsetTop <= scrollY + viewportHeight * 0.5) {
          currentIndex = i
          break
        }
      }

      // Target is the next section
      const nextIndex = currentIndex + 1
      if (nextIndex < SECTIONS.length) {
        setTargetId(SECTIONS[nextIndex])
        setVisible(true)
      } else {
        setVisible(false)
      }

      // Check if arrow is inside any visibility zone
      // On mobile, only show between hero → about
      if (ref.current) {
        const isMobile = window.innerWidth < MOBILE_BREAKPOINT
        let inZone = false

        if (isMobile) {
          // Only hero → about on mobile
          inZone = currentIndex === 0 && nextIndex === 1
        } else {
          for (let i = 0; i < SECTIONS.length - 1; i++) {
            const nextEl = elementsRef.current.get(SECTIONS[i + 1])
            if (!nextEl) continue
            const boundaryScreenY = nextEl.getBoundingClientRect().top
            const key = `${SECTIONS[i]}→${SECTIONS[i + 1]}`
            const config = ZONE_CONFIG[key] ?? { above: 80, below: 200 }
            const start = boundaryScreenY - config.above
            const end = boundaryScreenY + config.below
            if (arrowScreenY >= start && arrowScreenY <= end) {
              inZone = true
              break
            }
          }
        }
        ref.current.style.opacity = inZone ? '1' : '0'
        ref.current.style.pointerEvents = inZone ? 'auto' : 'none'
      }
    }

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        update()
        rafRef.current = 0
      })
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <a
      ref={ref}
      href={`#${targetId}`}
      aria-label="Scroll naar volgende sectie"
      className="fixed bottom-36 left-1/2 z-20 -translate-x-1/2 pb-4"
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className={`size-6 text-neutral-500 hover:text-neutral-300 ${bouncing ? 'animate-bounce' : ''}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        />
      </svg>
    </a>
  )
}
