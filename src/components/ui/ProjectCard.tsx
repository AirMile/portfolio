import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900"
      >
        <div className="aspect-video overflow-hidden bg-neutral-800">
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          <p className="mt-2 flex-1 text-neutral-400">{project.description}</p>
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
        </div>
      </Link>
    </motion.div>
  )
}
