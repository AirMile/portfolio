import type { StarConfig } from './types'

export class Star {
  private x: number
  private y: number
  private baseY: number
  private radius: number
  private baseOpacity: number
  private currentOpacity: number

  // Realistic twinkling state
  private nextTwinkleTime: number
  private twinkleIntensity: number // How much this star twinkles (0-1)
  private isTwinkling: boolean
  private twinkleEndTime: number

  constructor(config: StarConfig) {
    this.x = config.x
    this.y = config.y
    this.baseY = config.y
    this.radius = config.radius
    this.baseOpacity = config.baseOpacity
    this.currentOpacity = config.baseOpacity

    // Initialize realistic twinkling
    // Smaller stars twinkle more (atmospheric scintillation)
    this.twinkleIntensity = 0.25 + (1 - config.radius / 2) * 0.2
    this.nextTwinkleTime = Math.random() * 5
    this.isTwinkling = false
    this.twinkleEndTime = 0
  }

  // Realistic twinkle: mostly stable, occasional brief flicker
  updateTwinkle(time: number): void {
    if (this.isTwinkling) {
      // During twinkle: quick brightness variation
      if (time > this.twinkleEndTime) {
        this.isTwinkling = false
        this.currentOpacity = this.baseOpacity
        // Schedule next twinkle (3-8 seconds)
        this.nextTwinkleTime = time + 3 + Math.random() * 5
      } else {
        // Brief brightness flash (star gets brighter, not dimmer)
        const twinkleDuration = 0.3
        const progress =
          (time - (this.twinkleEndTime - twinkleDuration)) / twinkleDuration
        // Smooth pulse up and down using sine
        const flash = Math.sin(progress * Math.PI) * this.twinkleIntensity
        // Increase brightness, capped at 0.85 to stay subtle
        this.currentOpacity = Math.min(0.85, this.baseOpacity + flash)
      }
    } else {
      // Stable state - check if should start twinkling
      if (time > this.nextTwinkleTime) {
        this.isTwinkling = true
        this.twinkleEndTime = time + 0.25 + Math.random() * 0.15 // 250-400ms twinkle
      }
      this.currentOpacity = this.baseOpacity
    }
  }

  update(
    time: number,
    scrollY: number,
    parallaxIntensity: number,
    viewportHeight: number
  ): void {
    // Twinkle effect using sine wave
    this.updateTwinkle(time)

    // Parallax effect - stars move slower than scroll
    const parallaxOffset = scrollY * parallaxIntensity
    this.y = this.baseY - parallaxOffset

    // Wrap around when star goes off screen
    if (this.y < -10) {
      this.y = viewportHeight + 10
      this.baseY = this.y + parallaxOffset
    } else if (this.y > viewportHeight + 10) {
      this.y = -10
      this.baseY = this.y + parallaxOffset
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.arc(Math.floor(this.x), Math.floor(this.y), this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.currentOpacity})`
    ctx.fill()
  }

  // Getters for warp effect
  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y }
  }

  getOpacity(): number {
    return this.currentOpacity
  }

  getRadius(): number {
    return this.radius
  }

  // Adjust baseY to compensate for scroll jumps (keeps visual position stable)
  adjustBaseY(delta: number): void {
    this.baseY += delta
    this.y += delta
  }

  static createRandom(
    viewportWidth: number,
    viewportHeight: number,
    minRadius: number,
    maxRadius: number,
    minOpacity: number,
    maxOpacity: number,
    minTwinkleSpeed: number,
    maxTwinkleSpeed: number
  ): Star {
    return new Star({
      x: Math.random() * viewportWidth,
      y: Math.random() * viewportHeight,
      radius: minRadius + Math.random() * (maxRadius - minRadius),
      baseOpacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
      twinkleSpeed:
        minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
      twinklePhase: Math.random() * Math.PI * 2,
    })
  }

  // Create stars with jittered grid distribution to prevent clustering
  static createDistributed(
    count: number,
    viewportWidth: number,
    viewportHeight: number,
    minRadius: number,
    maxRadius: number,
    minOpacity: number,
    maxOpacity: number,
    minTwinkleSpeed: number,
    maxTwinkleSpeed: number
  ): Star[] {
    const stars: Star[] = []

    // Calculate grid dimensions for roughly even distribution
    const aspectRatio = viewportWidth / viewportHeight
    const cols = Math.ceil(Math.sqrt(count * aspectRatio))
    const rows = Math.ceil(count / cols)
    const cellWidth = viewportWidth / cols
    const cellHeight = viewportHeight / rows

    let created = 0
    for (let row = 0; row < rows && created < count; row++) {
      for (let col = 0; col < cols && created < count; col++) {
        // Random position within cell with 80% jitter
        const jitterX = (Math.random() - 0.5) * cellWidth * 0.8
        const jitterY = (Math.random() - 0.5) * cellHeight * 0.8
        const x = (col + 0.5) * cellWidth + jitterX
        const y = (row + 0.5) * cellHeight + jitterY

        stars.push(
          new Star({
            x: Math.max(0, Math.min(viewportWidth, x)),
            y: Math.max(0, Math.min(viewportHeight, y)),
            radius: minRadius + Math.random() * (maxRadius - minRadius),
            baseOpacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
            twinkleSpeed:
              minTwinkleSpeed +
              Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
            twinklePhase: Math.random() * Math.PI * 2,
          })
        )
        created++
      }
    }

    return stars
  }
}
