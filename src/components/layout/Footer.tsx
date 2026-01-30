import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-800 px-6 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <p className="text-sm text-neutral-500">
          {t('footer.copyright', { year: currentYear })}
        </p>
        <LanguageSwitcher />
      </div>
    </footer>
  )
}
