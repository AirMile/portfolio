import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { projects } from '@/data/projects'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { BackLink } from '@/components/ui/BackLink'
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
      if (e.key === 'ArrowRight' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev! + 1) % allImages.length)
      }
      if (e.key === 'ArrowLeft' && lightboxIndex !== null) {
        setLightboxIndex(
          (prev) => (prev! - 1 + allImages.length) % allImages.length
        )
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
    <article className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn direction="none">
          <BackLink to="/#projects">Terug naar projecten</BackLink>
        </FadeIn>

        <FadeIn delay={0.1}>
          <header className="mt-8">
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
              {allImages.length > 1 && (
                <button
                  className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex(
                      (prev) =>
                        (prev! - 1 + allImages.length) % allImages.length
                    )
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
                className="max-h-[90vh] max-w-[90vw] cursor-zoom-out rounded-lg object-contain"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              />

              {/* Next button */}
              {allImages.length > 1 && (
                <button
                  className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prev) => (prev! + 1) % allImages.length)
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
                className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
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

            <div className="mt-8">
              <BackLink to="/#projects">Terug naar projecten</BackLink>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </article>
  )
}
