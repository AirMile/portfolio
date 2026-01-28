import { useEffect, useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import { useLenis } from '@/components/providers/LenisProvider'
import { Star } from './starfield/Star'
import { ShootingStar } from './starfield/ShootingStar'
import { DEFAULT_CONFIG } from './starfield/types'

interface StarfieldProps {
  starCount?: number
  parallaxIntensity?: number
}

export function Starfield({
  starCount = DEFAULT_CONFIG.starCount,
  parallaxIntensity = DEFAULT_CONFIG.parallaxIntensity,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const scrollYRef = useRef(0)
  const dimensionsRef = useRef({ width: 0, height: 0 })

  const { lenis } = useLenis()

  // Initialize stars
  const initStars = useCallback(() => {
    const { width, height } = dimensionsRef.current
    if (width === 0 || height === 0) return

    starsRef.current = Array.from({ length: starCount }, () =>
      Star.createRandom(
        width,
        height,
        DEFAULT_CONFIG.minRadius,
        DEFAULT_CONFIG.maxRadius,
        DEFAULT_CONFIG.minOpacity,
        DEFAULT_CONFIG.maxOpacity,
        DEFAULT_CONFIG.minTwinkleSpeed,
        DEFAULT_CONFIG.maxTwinkleSpeed
      )
    )

    // Initialize shooting star pool
    shootingStarsRef.current = Array.from(
      { length: DEFAULT_CONFIG.maxShootingStars },
      () => new ShootingStar()
    )
  }, [starCount])

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const width = window.innerWidth
    const height = window.innerHeight

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }

    dimensionsRef.current = { width, height }
    initStars()
  }, [initStars])

  // Spawn shooting star
  const spawnShootingStar = useCallback(() => {
    const { width, height } = dimensionsRef.current
    const availableStar = shootingStarsRef.current.find((s) => !s.isActive)
    if (availableStar) {
      availableStar.spawn(width, height)
    }
  }, [])

  // Setup canvas and event listeners
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  // Subscribe to Lenis scroll for parallax
  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      scrollYRef.current = lenis.scroll
    }

    lenis.on('scroll', handleScroll)
    return () => lenis.off('scroll', handleScroll)
  }, [lenis])

  // GSAP ticker for render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastPeriodicSpawnTime = Date.now()
    let nextPeriodicInterval = 8000 + Math.random() * 7000 // 8-15 seconds

    const tick = (time: number) => {
      const { width, height } = dimensionsRef.current
      if (width === 0 || height === 0) return

      const now = Date.now()

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Update and draw stars
      const timeInSeconds = time / 1000
      for (const star of starsRef.current) {
        star.update(
          timeInSeconds,
          scrollYRef.current,
          parallaxIntensity,
          height
        )
        star.draw(ctx)
      }

      // Periodic shooting star spawn (every 8-15 seconds)
      if (now - lastPeriodicSpawnTime > nextPeriodicInterval) {
        spawnShootingStar()
        lastPeriodicSpawnTime = now
        nextPeriodicInterval = 8000 + Math.random() * 7000
      }

      // Update and draw shooting stars
      for (const shootingStar of shootingStarsRef.current) {
        if (shootingStar.isActive) {
          shootingStar.update()
          shootingStar.draw(ctx)
        }
      }
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [parallaxIntensity, spawnShootingStar])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
