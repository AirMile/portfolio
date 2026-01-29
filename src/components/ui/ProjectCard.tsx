import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Project } from '@/data/projects'
import { DURATION_FAST, EASE_DEFAULT, SPRING_SOFT } from '@/lib/animation'
import { Tag } from './Tag'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -8 }}
      transition={SPRING_SOFT}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900"
      >
        <div className="aspect-video overflow-hidden bg-neutral-800">
          <motion.img
            src={project.thumbnail}
            alt=""
            className="h-full w-full object-cover brightness-[0.85]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: DURATION_FAST, ease: EASE_DEFAULT }}
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          <p className="mt-2 flex-1 text-neutral-400">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
