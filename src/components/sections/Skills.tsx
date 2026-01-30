import { useTranslation } from 'react-i18next'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'

const SKILL_KEYS = ['ux', 'frontend', 'ideaToProduct', 'fullstack'] as const

export function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('skills.heading')}
          </h2>
        </FadeIn>
        <StaggerContainer
          className="mt-12 space-y-8"
          staggerDelay={0.1}
          delayChildren={0.15}
        >
          {SKILL_KEYS.map((key) => (
            <StaggerItem key={key}>
              <h3 className="mb-3 text-sm font-medium tracking-wider text-neutral-500 uppercase">
                {t(`skills.${key}.title`)}
              </h3>
              <p className="text-base leading-relaxed text-neutral-300">
                {t(`skills.${key}.description`)}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
