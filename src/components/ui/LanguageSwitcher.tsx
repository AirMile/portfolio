import { useLocation, useNavigate } from 'react-router-dom'
import { SUPPORTED_LOCALES } from '@/lib/constants'

function getLocaleFromPath(pathname: string) {
  const segment = pathname.split('/')[1]
  if (segment && (SUPPORTED_LOCALES as readonly string[]).includes(segment)) {
    return segment as (typeof SUPPORTED_LOCALES)[number]
  }
  return null
}

export function LanguageSwitcher() {
  const location = useLocation()
  const navigate = useNavigate()

  const locale = getLocaleFromPath(location.pathname)
  if (!locale) return null

  const otherLocale = SUPPORTED_LOCALES.find((l) => l !== locale)!

  const switchLocale = () => {
    const newPath = location.pathname.replace(`/${locale}`, `/${otherLocale}`)
    navigate(newPath, { replace: true })
  }

  return (
    <button
      onClick={switchLocale}
      className="fixed top-5 right-6 z-50 flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1.5 text-xs font-medium tracking-wide text-neutral-400 backdrop-blur-sm transition-colors hover:border-neutral-500 hover:text-white"
      aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Nederlands'}`}
    >
      <span className={locale === 'en' ? 'text-white' : ''}>EN</span>
      <span className="text-neutral-600">/</span>
      <span className={locale === 'nl' ? 'text-white' : ''}>NL</span>
    </button>
  )
}
