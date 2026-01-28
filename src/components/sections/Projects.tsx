import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Projecten
          </h2>
          <p className="mt-4 text-neutral-400">
            Een selectie van mijn beste werk. Klik op een project voor meer
            details.
          </p>
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
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-neutral-900/30 p-8 text-center">
              <span className="text-4xl text-neutral-600">+</span>
              <p className="mt-4 text-neutral-500">Meer projecten volgen</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
