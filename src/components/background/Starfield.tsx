import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Star } from './starfield/Star'
import { ShootingStar } from './starfield/ShootingStar'
import { DEFAULT_CONFIG } from './starfield/types'

// Module-level state to persist stars across re-renders and route changes
let stars: Star[] = []
let shootingStars: ShootingStar[] = []
let lastDimensions = { width: 0, height: 0 }

// Warp state
let isWarping = false
let warpProgress = 0 // 0 to 1
let warpStartTime = 0
let warpDirection = 1 // 1 = forward (left), -1 = back (right)
const WARP_DURATION = 400 // ms, matches page transition

// Parallax state
let lastScrollY = 0
const PARALLAX_INTENSITY = 0.15

// Trigger warp effect (called from outside)
// direction: 1 = forward (stars streak left), -1 = back (stars streak right)
export function triggerWarp(direction: number = 1) {
  isWarping = true
  warpProgress = 0
  warpStartTime = Date.now()
  warpDirection = direction
}

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

      const sizeChanged =
        Math.abs(lastDimensions.width - width) > 50 ||
        Math.abs(lastDimensions.height - height) > 50

      const shouldReinitStars = isResize && sizeChanged && stars.length > 0

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)
      }

      lastDimensions = { width, height }

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

    setupCanvas(false)

    const handleResize = () => setupCanvas(true)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [starCount])

  // GSAP ticker for render loop
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

      // Update warp progress
      if (isWarping) {
        warpProgress = Math.min(1, (now - warpStartTime) / WARP_DURATION)
        if (warpProgress >= 1) {
          isWarping = false
          warpProgress = 0
        }
      }

      // Clear canvas
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      // Parallax effect based on scroll
      const scrollY = window.scrollY
      const scrollDelta = scrollY - lastScrollY

      // Detect scroll jumps (e.g., page transition resets scroll to 0)
      // If jump is large, compensate stars' baseY to maintain visual position
      if (Math.abs(scrollDelta) > 100) {
        const compensation = scrollDelta * PARALLAX_INTENSITY
        for (const star of stars) {
          star.adjustBaseY(compensation)
        }
      }
      lastScrollY = scrollY

      // Update and draw stars
      const timeInSeconds = time / 1000
      for (const star of stars) {
        star.update(timeInSeconds, scrollY, PARALLAX_INTENSITY, height)
        const pos = star.getPosition()

        if (isWarping && warpProgress > 0) {
          // Warp effect: draw star streaks in slide direction
          // Use easeInExpo for acceleration feel
          const eased = warpProgress * warpProgress * warpProgress

          // Streak length increases with warp progress
          // warpDirection: 1 = forward (streak left/negative x), -1 = back (streak right/positive x)
          const streakLength = width * eased * 0.3

          // Calculate streak start and end points (horizontal streaks)
          const startX = pos.x
          const startY = pos.y
          // Forward = content slides left, so stars streak left (negative direction)
          // Back = content slides right, so stars streak right (positive direction)
          const endX = pos.x - warpDirection * streakLength
          const endY = pos.y

          // Draw streak with gradient (subtle blue tint)
          const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
          const baseOpacity = star.getOpacity()
          gradient.addColorStop(0, `rgba(180, 200, 255, ${baseOpacity * 0.9})`)
          gradient.addColorStop(
            0.5,
            `rgba(140, 170, 230, ${baseOpacity * 0.6})`
          )
          gradient.addColorStop(1, `rgba(100, 140, 200, 0)`)

          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          ctx.strokeStyle = gradient
          ctx.lineWidth = star.getRadius() * (1 + eased)
          ctx.lineCap = 'round'
          ctx.stroke()

          // Also draw a point at the star position
          ctx.beginPath()
          ctx.arc(
            startX,
            startY,
            star.getRadius() * (1 + eased * 0.5),
            0,
            Math.PI * 2
          )
          ctx.fillStyle = `rgba(200, 215, 255, ${Math.min(0.9, baseOpacity * (1 + eased * 0.5))})`
          ctx.fill()
        } else {
          // Normal star drawing
          star.draw(ctx)
        }
      }

      // Shooting stars (skip during warp)
      if (!isWarping) {
        if (now - lastPeriodicSpawnTime > nextPeriodicInterval) {
          const availableStar = shootingStars.find((s) => !s.isActive)
          if (availableStar) {
            availableStar.spawn(width, height)
          }
          lastPeriodicSpawnTime = now
          nextPeriodicInterval = 8000 + Math.random() * 7000
        }

        for (const shootingStar of shootingStars) {
          if (shootingStar.isActive) {
            shootingStar.update()
            shootingStar.draw(ctx)
          }
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
