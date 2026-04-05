interface ProjectBase {
  slug: string
  title: string
  thumbnail: string
  images?: string[]
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface Project extends ProjectBase {
  description: string
  metaDescription: string
  context: string
  role: string
  process: string[]
  result: string
}

export const projectsBase: ProjectBase[] = [
  {
    slug: 'draftgap',
    title: 'DraftGap',
    thumbnail: '/images/draftgap.webp',
    images: [
      '/images/draftgap-2.webp',
      '/images/draftgap-3.webp',
      '/images/draftgap-4.webp',
      '/images/draftgap-5.webp',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    githubUrl: 'https://github.com/AirMile/lol-pool-optimizer',
  },
  {
    slug: 'getcooked',
    title: 'GetCooked',
    thumbnail: '/images/getcooked.webp',
    images: [
      '/images/getcooked-2.webp',
      '/images/getcooked-3.webp',
      '/images/getcooked-4.webp',
    ],
    tags: ['Laravel', 'PHP', 'Full Stack'],
    githubUrl: 'https://github.com/AirMile/getcooked',
  },
  {
    slug: 'natuurmoment',
    title: 'NatuurMoment',
    thumbnail: '/images/natuurmoment.webp',
    images: [
      '/images/natuurmoment-2.webp',
      '/images/natuurmoment-3.webp',
      '/images/natuurmoment-5.webp',
      '/images/natuurmoment-6.webp',
      '/images/natuurmoment-7.webp',
      '/images/natuurmoment-8.webp',
    ],
    tags: ['Laravel', 'Tailwind CSS', 'Figma', 'Team Project'],
    githubUrl: 'https://github.com/HenkHR/NatuurMoment',
  },
  {
    slug: 'sonarpoppy',
    title: 'SonarPoppy',
    thumbnail: '/images/sonarpoppy.webp',
    images: ['/images/sonarpoppy-2.webp'],
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Algorithm'],
    githubUrl: 'https://github.com/Shav0nne/sonarpoppy',
  },
  {
    slug: 'claude-config',
    title: 'Claude Config',
    thumbnail: '/images/claude-config.webp',
    images: [
      '/images/claude-config-2.webp',
      '/images/claude-config-3.webp',
      '/images/claude-config-4.webp',
    ],
    tags: ['AI', 'Prompt Engineering', 'Automation', 'Developer Tools'],
    githubUrl: 'https://github.com/AirMile/claude-config',
  },
]
