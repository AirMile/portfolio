import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SECTIONS } from '@/lib/constants'
import { gsap, useGSAP } from '@/lib/gsap'

// The arrow is a "scroll to begin" hint on the hero only.
// It fades out once the user scrolls away from the top.
const HIDE_AFTER = 80 // px scrolled before the hint fades out

export function ScrollArrow() {
  const { t } = useTranslation()
  const [hidden, setHidden] = useState(false)
  const [bouncing, setBouncing] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  // First real section after the hero — order-independent.
  const targetId = SECTIONS[1]

  // Intro animatie die aansluit bij de hero tekst timeline
  useGSAP(() => {
    if (!svgRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(svgRef.current!, { opacity: 0, y: 20 })
      gsap.to(svgRef.current!, {
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

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(svgRef.current!, { opacity: 1, y: 0 })
    })

    return () => mm.revert()
  })

  // Fade the hint out as soon as the user scrolls past the hero
  useEffect(() => {
    const update = () => setHidden(window.scrollY > HIDE_AFTER)
    let raf = 0
    const handleScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        update()
        raf = 0
      })
    }
    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <a
      href={`#${targetId}`}
      aria-label={t('a11y.scrollToNextSection')}
      className={`fixed bottom-36 left-1/2 z-20 -translate-x-1/2 pb-4 transition-opacity duration-500 ${hidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
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
