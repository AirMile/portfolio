export interface Project {
  slug: string
  title: string
  description: string
  thumbnail: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  context: string
  role: string
  process: string[]
  result: string
}

export const projects: Project[] = [
  {
    slug: 'project-1',
    title: 'Project Titel 1',
    description:
      'Korte beschrijving van het project die op de card verschijnt.',
    thumbnail: '/images/project-1.jpg',
    tags: ['React', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project-1',
    context:
      'Beschrijf hier de context en het probleem dat je oploste. Wat was de aanleiding? Voor wie was dit project?',
    role: 'Beschrijf hier jouw specifieke rol en verantwoordelijkheden in dit project.',
    process: [
      'Eerste stap in het proces',
      'Tweede stap met key decisions',
      'Derde stap en hoe je uitdagingen oploste',
    ],
    result:
      'Beschrijf het eindresultaat en eventuele metrics of feedback die je hebt ontvangen.',
  },
  {
    slug: 'project-2',
    title: 'Project Titel 2',
    description: 'Korte beschrijving van het tweede project.',
    thumbnail: '/images/project-2.jpg',
    tags: ['Unity', 'C#', 'Game Dev'],
    githubUrl: 'https://github.com/username/project-2',
    context: 'Context voor project 2.',
    role: 'Jouw rol in project 2.',
    process: ['Stap 1', 'Stap 2', 'Stap 3'],
    result: 'Resultaat van project 2.',
  },
  {
    slug: 'project-3',
    title: 'Project Titel 3',
    description: 'Korte beschrijving van het derde project.',
    thumbnail: '/images/project-3.jpg',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    liveUrl: 'https://example.com/project-3',
    context: 'Context voor project 3.',
    role: 'Jouw rol in project 3.',
    process: ['Stap 1', 'Stap 2', 'Stap 3'],
    result: 'Resultaat van project 3.',
  },
]
