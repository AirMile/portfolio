import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
  direction?: number // 1 = forward (slide left), -1 = back (slide right)
}

const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? '100%' : '-100%',
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? '-100%' : '100%',
  }),
}

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.4,
}

export function PageTransition({
  children,
  className,
  direction = 1,
}: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      custom={direction}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}
