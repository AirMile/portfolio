import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  to?: string
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

const motionProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 17 },
}

export function Button({
  children,
  href,
  to,
  variant = 'primary',
  className = '',
  onClick,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors'
  const variants = {
    primary: 'bg-white text-neutral-950 hover:bg-neutral-200',
    secondary:
      'bg-transparent border border-neutral-700 text-white hover:border-neutral-500',
  }

  const styles = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.a href={href} className={styles} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  if (to) {
    return (
      <motion.span {...motionProps} className="inline-block">
        <Link to={to} className={styles}>
          {children}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.button onClick={onClick} className={styles} {...motionProps}>
      {children}
    </motion.button>
  )
}
