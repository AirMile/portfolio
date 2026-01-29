import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { projects } from '@/data/projects'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { FadeIn } from '@/components/animation/FadeIn'
import { StaggerContainer } from '@/components/animation/StaggerContainer'
import { StaggerItem } from '@/components/animation/StaggerItem'
import { useSEO } from '@/hooks/useSEO'
import { useStructuredData } from '@/hooks/useStructuredData'

const BASE_URL = 'https://portfolio-sooty-xi-pbtugrdf2f.vercel.app'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Combine thumbnail with additional images for lightbox
  const allImages = project
    ? [project.thumbnail, ...(project.images || [])]
    : []
  const isLightboxOpen = lightboxIndex !== null

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (
        e.key === 'ArrowRight' &&
        lightboxIndex !== null &&
        lightboxIndex < allImages.length - 1
      ) {
        setLightboxIndex((prev) => prev! + 1)
      }
      if (
        e.key === 'ArrowLeft' &&
        lightboxIndex !== null &&
        lightboxIndex > 0
      ) {
        setLightboxIndex((prev) => prev! - 1)
      }
    }
    if (isLightboxOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen, lightboxIndex, allImages.length])

  useSEO(
    project
      ? {
          title: `${project.title} | Miles Zeilstra`,
          description: project.metaDescription,
          url: `${BASE_URL}/projects/${project.slug}`,
          image: `${BASE_URL}${project.thumbnail}`,
          type: 'article',
        }
      : {
          title: 'Project niet gevonden | Miles Zeilstra',
          description: 'Dit project bestaat niet of is verwijderd.',
        }
  )

  useStructuredData(
    project
      ? {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.metaDescription,
          url: `${BASE_URL}/projects/${project.slug}`,
          image: `${BASE_URL}${project.thumbnail}`,
          keywords: project.tags,
          author: {
            '@type': 'Person',
            name: 'Miles Zeilstra',
          },
        }
      : {
          '@type': 'WebSite',
          name: 'Miles Zeilstra Portfolio',
          url: BASE_URL,
        }
  )

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
    <article className="px-6 pt-10 pb-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn delay={0.1}>
          <header>
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Tag key={tag} animated animationDelay={0.3 + index * 0.05}>
                  {tag}
                </Tag>
              ))}
            </div>
          </header>
        </FadeIn>

        {/* Hero Image */}
        <FadeIn delay={0.2}>
          <div
            className="relative mt-12 aspect-video cursor-zoom-in overflow-hidden rounded-2xl bg-neutral-800"
            onClick={() => !imageError && setLightboxIndex(0)}
          >
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
                className={`h-full w-full object-cover brightness-[0.85] transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </FadeIn>

        {/* Lightbox */}
        <AnimatePresence>
          {isLightboxOpen && lightboxIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
            >
              {/* Previous button */}
              {lightboxIndex > 0 && (
                <button
                  className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prev) => prev! - 1)
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}

              <motion.img
                key={lightboxIndex}
                src={allImages[lightboxIndex]}
                alt={`${project.title} screenshot ${lightboxIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] cursor-pointer rounded-lg object-contain"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
                onClick={(e) => {
                  e.stopPropagation()
                  if (lightboxIndex < allImages.length - 1) {
                    setLightboxIndex((prev) => prev! + 1)
                  } else {
                    setLightboxIndex(null)
                  }
                }}
              />

              {/* Next button */}
              {lightboxIndex < allImages.length - 1 && (
                <button
                  className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prev) => prev! + 1)
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}

              {/* Image counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  {lightboxIndex + 1} / {allImages.length}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <StaggerContainer className="mt-8 space-y-12" staggerDelay={0.15}>
          {/* View all images button */}
          {project.images && project.images.length > 0 && (
            <StaggerItem>
              <button
                onClick={() => setLightboxIndex(0)}
                className="flex cursor-pointer items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Bekijk alle afbeeldingen ({allImages.length})
              </button>
            </StaggerItem>
          )}

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
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button to="/#projects" variant="secondary">
                <span className="mr-2">←</span>
                Terug naar projecten
              </Button>
              <div className="flex flex-wrap items-center gap-4">
                {project.liveUrl && (
                  <Button href={project.liveUrl}>Bekijk live</Button>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="inline-flex items-center justify-center rounded-lg border border-neutral-700 p-3 text-white transition-colors hover:border-neutral-500"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Bekijk op GitHub"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </article>
  )
}
