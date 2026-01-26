import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Over mij', href: '/#about' },
  { label: 'Projecten', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
]

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-neutral-950/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-white">
          Logo
        </Link>
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
