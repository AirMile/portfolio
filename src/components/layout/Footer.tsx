export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-800 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-neutral-500">
          © {currentYear} Jouw Naam. Alle rechten voorbehouden.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/jouwnaam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jouwprofiel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 transition-colors hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
