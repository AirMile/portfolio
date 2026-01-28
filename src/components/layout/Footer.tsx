export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-800 px-6 py-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm text-neutral-500">
          © {currentYear} Miles Zeilstra. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  )
}
