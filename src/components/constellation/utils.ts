import type { ConstellationParticle } from './ConstellationParticle'

export function findNearbyParticles(
  particles: ConstellationParticle[],
  maxDistance: number
): Array<[number, number, number]> {
  const connections: Array<[number, number, number]> = []

  for (let i = 0; i < particles.length - 1; i++) {
    const p1 = particles[i].getPosition()

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j].getPosition()

      const dx = p2.x - p1.x
      const dy = p2.y - p1.y

      if (Math.abs(dx) > maxDistance || Math.abs(dy) > maxDistance) continue

      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        connections.push([i, j, distance])
      }
    }
  }

  return connections
}

export function drawConnections(
  ctx: CanvasRenderingContext2D,
  particles: ConstellationParticle[],
  connections: Array<[number, number, number]>,
  maxDistance: number
): void {
  for (const [i, j, distance] of connections) {
    const p1 = particles[i].getPosition()
    const p2 = particles[j].getPosition()

    const opacity = (1 - distance / maxDistance) * 0.4

    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`
    ctx.lineWidth = 1
    ctx.stroke()
  }
}
