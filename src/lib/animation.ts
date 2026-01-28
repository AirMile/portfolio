// Easing curves
export const EASE_DEFAULT = [0.25, 0.1, 0.25, 1] as const

// Spring configurations
export const SPRING_DEFAULT = {
  type: 'spring',
  stiffness: 400,
  damping: 20,
} as const

export const SPRING_SOFT = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
} as const

// Timing
export const DURATION_FAST = 0.4
export const DURATION_NORMAL = 0.5
