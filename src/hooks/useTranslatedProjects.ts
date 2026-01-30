import { useTranslation } from 'react-i18next'
import { projectsBase } from '@/data/projects'
import type { Project } from '@/data/projects'

export function useTranslatedProjects(): Project[] {
  const { t } = useTranslation()
  return projectsBase.map((p) => {
    const key = `projectData.${p.slug}` as const
    return {
      ...p,
      // Dynamic keys lose type safety — slug is runtime data
      description: t(`${key}.description` as never) as string,
      metaDescription: t(`${key}.metaDescription` as never) as string,
      context: t(`${key}.context` as never) as string,
      role: t(`${key}.role` as never) as string,
      process: t(`${key}.process` as never, {
        returnObjects: true,
      }) as unknown as string[],
      result: t(`${key}.result` as never) as string,
    }
  })
}
