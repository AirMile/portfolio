import { motion } from 'motion/react'
import { ReactNode } from 'react'
import { DURATION_FAST, EASE_DEFAULT } from '@/lib/animation'

interface PageTransitionProps {
  children: ReactNode
  className?: string
  direction?: number // 1 = forward (slide left), -1 = back (slide right)
  skipInitial?: boolean // Skip initial animation on fresh page load
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
  ease: EASE_DEFAULT,
  duration: DURATION_FAST,
}

export function PageTransition({
  children,
  className,
  direction = 1,
  skipInitial = false,
}: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      custom={direction}
      variants={pageVariants}
      initial={skipInitial ? false : 'initial'}
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}
