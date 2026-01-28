import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Star } from './starfield/Star'
import { ShootingStar } from './starfield/ShootingStar'
import { DEFAULT_CONFIG } from './starfield/types'

// Module-level state to persist stars across re-renders and route changes
let stars: Star[] = []
let shootingStars: ShootingStar[] = []
let lastDimensions = { width: 0, height: 0 }

interface StarfieldProps {
  starCount?: number
}

export function Starfield({
  starCount = DEFAULT_CONFIG.starCount,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Setup canvas once on mount, only listen for resize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1

    const setupCanvas = (isResize = false) => {
      const width = window.innerWidth
      const height = window.innerHeight

      // Check if this is an actual resize
      const sizeChanged =
        Math.abs(lastDimensions.width - width) > 50 ||
        Math.abs(lastDimensions.height - height) > 50

      // Only reinitialize stars on significant resize, not on initial setup
      const shouldReinitStars = isResize && sizeChanged && stars.length > 0

      // Always update canvas size
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Reset transform before scaling to prevent accumulation
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)
      }

      lastDimensions = { width, height }

      // Only create stars if they don't exist
      if (stars.length === 0) {
        stars = Array.from({ length: starCount }, () =>
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
      } else if (shouldReinitStars) {
        // Only reinit on actual window resize
        stars = Array.from({ length: starCount }, () =>
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
      }

      if (shootingStars.length === 0) {
        shootingStars = Array.from(
          { length: DEFAULT_CONFIG.maxShootingStars },
          () => new ShootingStar()
        )
      }
    }

    // Initial setup (not a resize)
    setupCanvas(false)

    // Resize handler
    const handleResize = () => setupCanvas(true)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [starCount])

  // GSAP ticker for render loop - only setup once
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let lastPeriodicSpawnTime = Date.now()
    let nextPeriodicInterval = 8000 + Math.random() * 7000

    const tick = (time: number) => {
      const { width, height } = lastDimensions
      if (width === 0 || height === 0) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const now = Date.now()

      // Clear canvas (use canvas dimensions, not logical dimensions)
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      // Update and draw stars (fixed positions, only twinkle)
      const timeInSeconds = time / 1000
      for (const star of stars) {
        star.updateTwinkle(timeInSeconds)
        star.draw(ctx)
      }

      // Periodic shooting star spawn
      if (now - lastPeriodicSpawnTime > nextPeriodicInterval) {
        const availableStar = shootingStars.find((s) => !s.isActive)
        if (availableStar) {
          availableStar.spawn(width, height)
        }
        lastPeriodicSpawnTime = now
        nextPeriodicInterval = 8000 + Math.random() * 7000
      }

      // Update and draw shooting stars
      for (const shootingStar of shootingStars) {
        if (shootingStar.isActive) {
          shootingStar.update()
          shootingStar.draw(ctx)
        }
      }
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
