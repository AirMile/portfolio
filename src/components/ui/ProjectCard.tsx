import { Link } from 'react-router-dom'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-xl bg-neutral-900 transition-transform hover:-translate-y-1"
    >
      <div className="aspect-video overflow-hidden bg-neutral-800">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-neutral-400">{project.description}</p>
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
  )
}
