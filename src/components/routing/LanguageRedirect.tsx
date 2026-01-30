import { Navigate } from 'react-router-dom'
import { DEFAULT_LOCALE } from '@/lib/constants'
import type { Locale } from '@/lib/constants'

function detectLocale(): Locale {
  // If Dutch appears anywhere in browser languages, show Dutch
  const languages = navigator.languages ?? [navigator.language]
  const codes = languages.map((lang) => lang.split('-')[0])
  if (codes.includes('nl')) return 'nl'
  return DEFAULT_LOCALE
}

export function LanguageRedirect() {
  const locale = detectLocale()
  return <Navigate to={`/${locale}`} replace />
}
