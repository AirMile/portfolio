import { motion } from 'motion/react'

interface TagProps {
  children: string
  animated?: boolean
  animationDelay?: number
}

const tagStyles =
  'rounded-full bg-neutral-800 px-3 py-1 text-sm text-neutral-300'

export function Tag({
  children,
  animated = false,
  animationDelay = 0,
}: TagProps) {
  if (animated) {
    return (
      <motion.span
        className={tagStyles}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: animationDelay }}
      >
        {children}
      </motion.span>
    )
  }

  return <span className={tagStyles}>{children}</span>
}
