import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'

const TITLE = 'Miles Zeilstra'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const letters = titleRef.current?.querySelectorAll('.hero-letter')
      if (!letters) return

      const rest = [descriptionRef.current]

      // Kill any existing ScrollTriggers on these elements
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) {
          st.kill()
        }
      })

      gsap.set(letters, {
        opacity: 0,
        y: 40,
        x: 0,
        willChange: 'transform, opacity',
      })
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
          // Clear transforms to prevent sub-pixel jitter
          gsap.set(letters, { clearProps: 'transform,willChange' })

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

          gsap.fromTo(
            subtitleRef.current,
            { y: 0, opacity: 1 },
            {
              y: -100,
              opacity: 0,
              ease: 'power2.in',
              immediateRender: false,
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '35% top',
                scrub: 1,
              },
            }
          )

          gsap.fromTo(
            descriptionRef.current,
            { y: 0, opacity: 1 },
            {
              y: -100,
              opacity: 0,
              ease: 'power2.in',
              immediateRender: false,
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '35% top',
                scrub: 1,
              },
            }
          )
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
      className="flex h-screen items-center justify-center px-6"
    >
      <div className="-mt-16 max-w-3xl text-center">
        <p
          ref={subtitleRef}
          className="mb-6 text-sm font-medium tracking-widest text-neutral-500 uppercase md:text-base"
        >
          Fullstack Developer
        </p>
        <h1
          ref={titleRef}
          className="mt-4 text-5xl font-bold tracking-tight text-white md:text-7xl"
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
          ref={descriptionRef}
          className="mt-10 text-xl text-neutral-400 italic md:text-2xl"
        >
          Bringing ideas to life.
        </p>
      </div>
    </section>
  )
}
