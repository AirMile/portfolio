import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { projects } from '@/data/projects'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerContainer } from '@/components/animation/StaggerContainer'
import { StaggerItem } from '@/components/animation/StaggerItem'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <FadeIn>
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
        </FadeIn>
      </div>
    )
  }

  return (
    <motion.article
      className="px-6 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn direction="none">
          <Link
            to="/#projects"
            className="group inline-flex items-center gap-2 text-neutral-400 transition-colors hover:text-white"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Terug naar projecten
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <header className="mt-8">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-neutral-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </header>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative mt-12 aspect-video overflow-hidden rounded-2xl bg-neutral-800">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 animate-pulse bg-neutral-700" />
            )}
            {imageError ? (
              <div className="flex h-full items-center justify-center">
                <span className="text-neutral-500">
                  Afbeelding niet beschikbaar
                </span>
              </div>
            ) : (
              <img
                src={project.thumbnail}
                alt={project.title}
                className={`h-full w-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </FadeIn>

        <StaggerContainer className="mt-16 space-y-12" staggerDelay={0.15}>
          <StaggerItem>
            <section>
              <h2 className="text-2xl font-semibold text-white">Context</h2>
              <p className="mt-4 leading-relaxed text-neutral-300">
                {project.context}
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="text-2xl font-semibold text-white">Mijn rol</h2>
              <p className="mt-4 leading-relaxed text-neutral-300">
                {project.role}
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="text-2xl font-semibold text-white">Proces</h2>
              <ul className="mt-4 space-y-3">
                {project.process.map((step, index) => (
                  <li key={index} className="flex gap-4 text-neutral-300">
                    <span className="font-medium text-neutral-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </section>
          </StaggerItem>

          <StaggerItem>
            <section>
              <h2 className="text-2xl font-semibold text-white">Resultaat</h2>
              <p className="mt-4 leading-relaxed text-neutral-300">
                {project.result}
              </p>
            </section>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <Button href={project.liveUrl}>Bekijk live</Button>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} variant="secondary">
                  GitHub
                </Button>
              )}
            </div>

            <Link
              to="/#projects"
              className="group mt-8 inline-flex items-center gap-2 text-neutral-400 transition-colors hover:text-white"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              Terug naar projecten
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </motion.article>
  )
}
