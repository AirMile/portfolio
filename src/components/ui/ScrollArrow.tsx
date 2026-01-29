import { useEffect, useRef, useState } from 'react'

const SECTION_ORDER = ['hero', 'about', 'projects', 'skills', 'contact']
const ARROW_BOTTOM = 144 // bottom-36 = 9rem = 144px
const MOBILE_BREAKPOINT = 768

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
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY
      const arrowScreenY = viewportHeight - ARROW_BOTTOM

      // Find which section is currently most visible
      let currentIndex = 0
      for (let i = SECTION_ORDER.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_ORDER[i])
        if (el && el.offsetTop <= scrollY + viewportHeight * 0.5) {
          currentIndex = i
          break
        }
      }

      // Target is the next section
      const nextIndex = currentIndex + 1
      if (nextIndex < SECTION_ORDER.length) {
        setTargetId(SECTION_ORDER[nextIndex])
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
          for (let i = 0; i < SECTION_ORDER.length - 1; i++) {
            const nextEl = document.getElementById(SECTION_ORDER[i + 1])
            if (!nextEl) continue
            const boundaryScreenY = nextEl.getBoundingClientRect().top
            const key = `${SECTION_ORDER[i]}→${SECTION_ORDER[i + 1]}`
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

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      ref={ref}
      href={`#${targetId}`}
      className="fixed bottom-36 left-1/2 z-20 -translate-x-1/2 pb-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="size-6 animate-bounce text-neutral-500 hover:text-neutral-300"
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
