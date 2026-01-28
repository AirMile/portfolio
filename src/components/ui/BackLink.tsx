import { Link } from 'react-router-dom'

interface BackLinkProps {
  to: string
  children: string
}

export function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-neutral-400 transition-colors hover:text-white"
    >
      <span className="transition-transform group-hover:-translate-x-1">←</span>
      {children}
    </Link>
  )
}
