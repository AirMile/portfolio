import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { SPRING_DEFAULT } from '@/lib/animation'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  to?: string
  state?: object
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const motionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: SPRING_DEFAULT,
}

export function Button({
  children,
  href,
  to,
  state,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors'
  const variants = {
    primary: 'bg-white text-neutral-950 hover:bg-neutral-200',
    secondary:
      'bg-transparent border border-neutral-700 text-white hover:border-neutral-500',
  }
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const styles = `${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`

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
        <Link to={to} state={state} className={styles}>
          {children}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
