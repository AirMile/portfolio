import { type ReactNode } from 'react'

interface SocialIconButtonProps {
  href: string
  label: string
  children: ReactNode
}

export function SocialIconButton({
  href,
  label,
  children,
}: SocialIconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
      aria-label={label}
    >
      {children}
    </a>
  )
}
