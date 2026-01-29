import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
const TITLE = 'Miles Zeilstra'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const letters = titleRef.current?.querySelectorAll('.hero-letter')
      if (!letters) return

      const rest = [descriptionRef.current, scrollRef.current]

      // Kill any existing ScrollTriggers on these elements
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) {
          st.kill()
        }
      })

      gsap.set(letters, { opacity: 0, y: 40, x: 0 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 })
      gsap.set(rest, { opacity: 0, y: 30 })

      // Intro animatie (delay voor page transition)
      const tl = gsap.timeline({
        delay: 0.4,
        defaults: {
          ease: 'power3.out',
          duration: 0.8,
        },
        onComplete: () => {
          // Scroll lift-off animatie - alleen activeren NA intro animatie
          gsap.fromTo(
            letters,
            { y: 0, opacity: 1 },
            {
              y: -150,
              opacity: 0,
              ease: 'power2.in',
              stagger: 0.02,
              immediateRender: false,
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '40% top',
                scrub: 1,
              },
            }
          )

          gsap.to(scrollRef.current, {
            opacity: 0,
            y: -150,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '35% top',
              scrub: 1,
            },
          })
        },
      })

      tl.to(letters, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.03,
      })
        .to(subtitleRef.current, { opacity: 1, y: 0 }, '-=0.5')
        .to(rest, { opacity: 1, y: 0 }, '-=0.4')
    },
    { scope: containerRef }
  )

  return (
    <section
      id="hero"
      ref={containerRef}
      className="flex h-screen flex-col items-center px-6 pb-36"
    >
      <div className="flex-1" />
      <div className="max-w-3xl text-center">
        <h1
          ref={titleRef}
          className="text-5xl font-bold tracking-tight text-white md:text-7xl"
        >
          {TITLE.split('').map((char, i) => (
            <span
              key={i}
              className="hero-letter inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-4 text-xl text-neutral-400 md:text-2xl"
        >
          Fullstack Developer
        </p>
        <p
          ref={descriptionRef}
          className="mx-auto mt-6 max-w-xl text-neutral-500"
        >
          Bringing ideas to life.
        </p>
      </div>
      <div ref={scrollRef} className="flex flex-1 items-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="size-6 animate-bounce text-neutral-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </div>
    </section>
  )
}
