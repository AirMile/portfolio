export class ShootingStar {
  private x: number = 0
  private y: number = 0
  private angle: number = 0
  private speed: number = 8
  private length: number = 80
  private lifetime: number = 60
  private age: number = 0
  private active: boolean = false

  get isActive(): boolean {
    return this.active
  }

  spawn(viewportWidth: number, viewportHeight: number): void {
    // Spawn from top or right edge
    const fromTop = Math.random() > 0.5

    if (fromTop) {
      this.x = Math.random() * viewportWidth
      this.y = -10
      // Angle between -120 and -150 degrees (downward-left diagonal)
      this.angle = (-120 - Math.random() * 30) * (Math.PI / 180)
    } else {
      this.x = viewportWidth + 10
      this.y = Math.random() * (viewportHeight * 0.5)
      // Angle between -150 and -180 degrees (leftward-down)
      this.angle = (-150 - Math.random() * 30) * (Math.PI / 180)
    }

    this.speed = 6 + Math.random() * 6
    this.length = 60 + Math.random() * 40
    this.lifetime = 40 + Math.random() * 40
    this.age = 0
    this.active = true
  }

  update(): boolean {
    if (!this.active) return false

    this.age++

    // Move in the direction of the angle
    this.x += Math.cos(this.angle) * this.speed
    this.y -= Math.sin(this.angle) * this.speed

    // Deactivate when lifetime is reached
    if (this.age >= this.lifetime) {
      this.active = false
      return false
    }

    return true
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return

    const progress = this.age / this.lifetime
    const opacity = 1 - progress

    // Calculate trail end point
    const tailX = this.x - Math.cos(this.angle) * this.length
    const tailY = this.y + Math.sin(this.angle) * this.length

    // Create gradient for the trail
    const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY)
    gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(tailX, tailY)
    ctx.strokeStyle = gradient
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.stroke()

    // Draw bright head
    ctx.beginPath()
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.fill()
  }

  reset(): void {
    this.active = false
    this.age = 0
  }
}
