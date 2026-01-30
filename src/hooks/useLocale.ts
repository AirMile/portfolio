import { useParams } from 'react-router-dom'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/constants'
import type { Locale } from '@/lib/constants'

export function useLocale(): Locale {
  const { locale } = useParams<{ locale: string }>()
  if (locale && (SUPPORTED_LOCALES as readonly string[]).includes(locale)) {
    return locale as Locale
  }
  return DEFAULT_LOCALE
}
