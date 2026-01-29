import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ConstellationParticle } from './ConstellationParticle'
import { findNearbyParticles, drawConnections } from './utils'
import { DEFAULT_CONFIG } from './types'

export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<ConstellationParticle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const connectionCacheRef = useRef<{
    connections: Array<[number, number, number]>
    frameCount: number
  }>({ connections: [], frameCount: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const dpr = window.devicePixelRatio || 1

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      particlesRef.current = ConstellationParticle.createGridDistribution(
        DEFAULT_CONFIG.particleCount,
        width,
        height
      )
    }

    setupCanvas()
    window.addEventListener('resize', setupCanvas)

    return () => {
      window.removeEventListener('resize', setupCanvas)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let lastUpdate = 0
    const THROTTLE_MS = 16

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate < THROTTLE_MS) return
      lastUpdate = now

      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const CACHE_FRAMES = 2

    const tick = (_time: number, deltaTime: number) => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const width = canvas.clientWidth
      const height = canvas.clientHeight

      ctx.clearRect(0, 0, width, height)

      const dt = deltaTime / 1000
      const particles = particlesRef.current

      for (const particle of particles) {
        particle.updateMouseInteraction(
          mouseRef.current.x,
          mouseRef.current.y,
          DEFAULT_CONFIG.mouseInfluenceRadius,
          DEFAULT_CONFIG.repulsionForce
        )
        particle.update(
          dt,
          DEFAULT_CONFIG.springStiffness,
          DEFAULT_CONFIG.damping
        )
      }

      connectionCacheRef.current.frameCount++
      if (connectionCacheRef.current.frameCount >= CACHE_FRAMES) {
        connectionCacheRef.current.connections = findNearbyParticles(
          particles,
          DEFAULT_CONFIG.connectionDistance
        )
        connectionCacheRef.current.frameCount = 0
      }

      drawConnections(
        ctx,
        particles,
        connectionCacheRef.current.connections,
        DEFAULT_CONFIG.connectionDistance
      )

      for (const particle of particles) {
        particle.draw(ctx)
      }
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
