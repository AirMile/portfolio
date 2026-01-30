import { useNavigate, useLocation } from 'react-router-dom'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/constants'
import type { Locale } from '@/lib/constants'

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  nl: 'NL',
}

export function LanguageSwitcher() {
  const navigate = useNavigate()
  const location = useLocation()
  const segment = location.pathname.split('/')[1]
  const locale = (SUPPORTED_LOCALES as readonly string[]).includes(segment)
    ? (segment as Locale)
    : DEFAULT_LOCALE

  function switchLocale(newLocale: Locale) {
    if (newLocale === locale) return
    const newPath = location.pathname.replace(`/${locale}`, `/${newLocale}`)
    navigate(newPath, { replace: true })
  }

  return (
    <div className="flex gap-1 text-sm">
      {SUPPORTED_LOCALES.map((lng) => (
        <button
          key={lng}
          onClick={() => switchLocale(lng)}
          className={`cursor-pointer rounded px-2 py-1 transition-colors ${
            lng === locale
              ? 'font-medium text-white'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
          aria-label={`Switch to ${lng === 'nl' ? 'Dutch' : 'English'}`}
          aria-current={lng === locale ? 'true' : undefined}
        >
          {LOCALE_LABELS[lng]}
        </button>
      ))}
    </div>
  )
}
