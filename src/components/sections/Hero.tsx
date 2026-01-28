import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'

const TITLE = 'Miles Zeilstra'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const letters = titleRef.current?.querySelectorAll('.hero-letter')
      if (!letters) return

      const rest = [
        descriptionRef.current,
        ...(buttonsRef.current?.children ?? []),
      ]

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
      className="flex min-h-screen items-center justify-center px-6"
    >
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
          Creative Developer
        </p>
        <p
          ref={descriptionRef}
          className="mx-auto mt-6 max-w-xl text-neutral-500"
        >
          Ik bouw interactieve web experiences en games. Van idee tot werkend
          product — altijd op zoek naar de creatieve oplossing.
        </p>
        <div
          ref={buttonsRef}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button href="#projects">Bekijk mijn werk</Button>
          <Button href="#contact" variant="secondary">
            Neem contact op
          </Button>
        </div>
      </div>
    </section>
  )
}
