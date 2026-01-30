import { useLocale } from './useLocale'

export function useLocalePath() {
  const locale = useLocale()
  return (path: string) =>
    `/${locale}${path.startsWith('/') ? path : `/${path}`}`
}
