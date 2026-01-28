import { motion, type Variants } from 'motion/react'
import { type ReactNode } from 'react'
import { DURATION_NORMAL, EASE_DEFAULT } from '@/lib/animation'

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_DEFAULT,
    },
  },
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
