// Site
export const BASE_URL = 'https://mileszeilstra.nl'
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`

// i18n
export const SUPPORTED_LOCALES = ['en', 'nl'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

// Section order used by scroll arrow, snap points, and navigation
export const SECTIONS = [
  'hero',
  'projects',
  'about',
  'skills',
  'contact',
] as const
