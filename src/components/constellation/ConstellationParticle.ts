import type { ParticleConfig } from './types'

export class ConstellationParticle {
  private x: number
  private y: number
  private baseX: number
  private baseY: number
  private radius: number
  private opacity: number
  private hue: number

  private vx: number = 0
  private vy: number = 0
  private targetX: number
  private targetY: number

  private pulsePhase: number
  private pulseSpeed: number

  constructor(config: ParticleConfig) {
    this.x = config.x
    this.y = config.y
    this.baseX = config.baseX
    this.baseY = config.baseY
    this.radius = config.radius
    this.opacity = config.opacity
    this.hue = config.hue
    this.pulseSpeed = config.pulseSpeed

    this.targetX = this.baseX
    this.targetY = this.baseY
    this.pulsePhase = Math.random() * Math.PI * 2
  }

  updateMouseInteraction(
    mouseX: number,
    mouseY: number,
    influenceRadius: number,
    repulsionForce: number
  ): void {
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < influenceRadius && distance > 0) {
      const force = (1 - distance / influenceRadius) * repulsionForce
      this.targetX = this.baseX - dx * force
      this.targetY = this.baseY - dy * force
    } else {
      this.targetX = this.baseX
      this.targetY = this.baseY
    }
  }

  update(deltaTime: number, springStiffness: number, damping: number): void {
    this.vx += (this.targetX - this.x) * springStiffness
    this.vy += (this.targetY - this.y) * springStiffness
    this.vx *= damping
    this.vy *= damping

    this.x += this.vx
    this.y += this.vy

    this.pulsePhase += this.pulseSpeed * deltaTime
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8
    const finalRadius = this.radius * pulse

    ctx.beginPath()
    ctx.arc(this.x, this.y, finalRadius, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${this.hue}, 70%, 80%, ${this.opacity})`
    ctx.fill()
  }

  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y }
  }

  static createGridDistribution(
    count: number,
    width: number,
    height: number
  ): ConstellationParticle[] {
    const particles: ConstellationParticle[] = []
    const aspectRatio = width / height
    const cols = Math.ceil(Math.sqrt(count * aspectRatio))
    const rows = Math.ceil(count / cols)
    const cellWidth = width / cols
    const cellHeight = height / rows

    let created = 0

    for (let row = 0; row < rows && created < count; row++) {
      for (let col = 0; col < cols && created < count; col++) {
        const jitterX = (Math.random() - 0.5) * cellWidth * 0.6
        const jitterY = (Math.random() - 0.5) * cellHeight * 0.6
        const x = (col + 0.5) * cellWidth + jitterX
        const y = (row + 0.5) * cellHeight + jitterY

        particles.push(
          new ConstellationParticle({
            x,
            y,
            baseX: x,
            baseY: y,
            radius: 2 + Math.random() * 2,
            opacity: 0.5 + Math.random() * 0.3,
            hue: 200 + Math.random() * 40,
            pulseSpeed: 0.5 + Math.random() * 1.5,
          })
        )
        created++
      }
    }

    return particles
  }
}
