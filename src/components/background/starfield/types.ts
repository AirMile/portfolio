export interface StarConfig {
  x: number
  y: number
  radius: number
  baseOpacity: number
  twinkleSpeed: number
  twinklePhase: number
}

export interface ShootingStarConfig {
  startX: number
  startY: number
  angle: number
  speed: number
  length: number
  lifetime: number
}

export interface StarfieldConfig {
  starCount: number
  minRadius: number
  maxRadius: number
  minOpacity: number
  maxOpacity: number
  minTwinkleSpeed: number
  maxTwinkleSpeed: number
  parallaxIntensity: number
  velocityThreshold: number
  maxShootingStars: number
}

export const DEFAULT_CONFIG: StarfieldConfig = {
  starCount: 100,
  minRadius: 0.5,
  maxRadius: 2,
  minOpacity: 0.3,
  maxOpacity: 0.8,
  minTwinkleSpeed: 0.5,
  maxTwinkleSpeed: 2,
  parallaxIntensity: 0.1,
  velocityThreshold: 1.5,
  maxShootingStars: 3,
}
