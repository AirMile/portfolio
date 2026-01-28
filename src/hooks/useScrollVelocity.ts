import { useState, useEffect, useRef } from 'react'
import { useLenis } from '@/components/providers/LenisProvider'

interface ScrollVelocityState {
  velocity: number
  scrollY: number
  direction: 'up' | 'down' | 'idle'
}

export function useScrollVelocity(): ScrollVelocityState {
  const { lenis } = useLenis()
  const [state, setState] = useState<ScrollVelocityState>({
    velocity: 0,
    scrollY: 0,
    direction: 'idle',
  })
  const prevScrollRef = useRef(0)

  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      const currentScroll = lenis.scroll
      const velocity = Math.abs(lenis.velocity)
      const direction =
        currentScroll > prevScrollRef.current
          ? 'down'
          : currentScroll < prevScrollRef.current
            ? 'up'
            : 'idle'

      prevScrollRef.current = currentScroll

      setState({
        velocity,
        scrollY: currentScroll,
        direction,
      })
    }

    lenis.on('scroll', handleScroll)

    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis])

  return state
}
