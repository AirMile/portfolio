import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  to?: string
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
      >
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  )
}
