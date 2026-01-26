import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Projecten</h2>
        <p className="mt-4 text-neutral-400">
          Een selectie van mijn beste werk. Klik op een project voor meer
          details.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
