import { useTranslation } from 'react-i18next'
import { useTranslatedProjects } from '@/hooks/useTranslatedProjects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'

export function Projects() {
  const { t } = useTranslation()
  const projects = useTranslatedProjects()

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('projects.heading')}
          </h2>
          <p className="mt-4 text-neutral-400">{t('projects.description')}</p>
        </FadeIn>
        <StaggerContainer
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.15}
          delayChildren={0.2}
        >
          {projects.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
