export interface ProjectBase {
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
]
