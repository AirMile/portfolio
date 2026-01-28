import type { StarConfig } from './types'

export class Star {
  private x: number
  private y: number
  private baseY: number
  private radius: number
  private baseOpacity: number
  private twinkleSpeed: number
  private twinklePhase: number
  private currentOpacity: number

  constructor(config: StarConfig) {
    this.x = config.x
    this.y = config.y
    this.baseY = config.y
    this.radius = config.radius
    this.baseOpacity = config.baseOpacity
    this.twinkleSpeed = config.twinkleSpeed
    this.twinklePhase = config.twinklePhase
    this.currentOpacity = config.baseOpacity
  }

  // Only update twinkle effect, keep position fixed
  updateTwinkle(time: number): void {
    const twinkle = Math.sin(time * this.twinkleSpeed + this.twinklePhase)
    this.currentOpacity = this.baseOpacity * (0.3 + 0.7 * ((twinkle + 1) / 2))
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
}
