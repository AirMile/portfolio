export interface ParticleConfig {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  opacity: number
  hue: number
  pulseSpeed: number
}

export interface ConstellationConfig {
  particleCount: number
  connectionDistance: number
  mouseInfluenceRadius: number
  repulsionForce: number
  springStiffness: number
  damping: number
}

export const DEFAULT_CONFIG: ConstellationConfig = {
  particleCount: 40,
  connectionDistance: 120,
  mouseInfluenceRadius: 150,
  repulsionForce: 0.3,
  springStiffness: 0.1,
  damping: 0.85,
}
