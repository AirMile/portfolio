import { useTranslation } from 'react-i18next'
import { FadeIn } from '@/components/animation'

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('about.heading')}
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <FadeIn delay={0.1} direction="left">
            <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-800">
              <img
                src="/images/profile.webp"
                alt={t('about.profileAlt')}
                loading="lazy"
                className="h-full w-full object-cover brightness-[0.85]"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="right">
            <div className="flex flex-col justify-center">
              <p className="text-lg text-neutral-300">
                {t('about.paragraph1')}
              </p>
              <p className="mt-4 text-neutral-400">{t('about.paragraph2')}</p>
              <p className="mt-4 text-neutral-400">{t('about.paragraph3')}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
