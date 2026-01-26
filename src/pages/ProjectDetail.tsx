import { useParams, Link } from 'react-router-dom'
import { projects } from '@/data/projects'
import { Button } from '@/components/ui/Button'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Project niet gevonden
          </h1>
          <p className="mt-4 text-neutral-400">
            Dit project bestaat niet of is verwijderd.
          </p>
          <Button to="/" className="mt-8">
            Terug naar home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <article className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/#projects"
          className="inline-flex items-center text-neutral-400 transition-colors hover:text-white"
        >
          ← Terug naar projecten
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-12 aspect-video overflow-hidden rounded-2xl bg-neutral-800">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-white">Context</h2>
          <p className="mt-4 text-neutral-300">{project.context}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Mijn rol</h2>
          <p className="mt-4 text-neutral-300">{project.role}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Proces</h2>
          <ul className="mt-4 space-y-3">
            {project.process.map((step, index) => (
              <li key={index} className="flex gap-4 text-neutral-300">
                <span className="text-neutral-500">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Resultaat</h2>
          <p className="mt-4 text-neutral-300">{project.result}</p>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          {project.liveUrl && (
            <Button href={project.liveUrl}>Bekijk live</Button>
          )}
          {project.githubUrl && (
            <Button href={project.githubUrl} variant="secondary">
              GitHub
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
