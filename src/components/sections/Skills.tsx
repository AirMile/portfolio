import type { ReactNode } from 'react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'

const skillCategories: { title: string; description: ReactNode }[] = [
  {
    title: 'Gebruikerservaring',
    description: (
      <>
        Ik denk vanuit de gebruiker. Hoe voelt iets aan, wat verwacht je op dit
        moment, waar loop je vast? Dat kritisch bekijken en verbeteren is waar
        ik goed in ben.
      </>
    ),
  },
  {
    title: 'Frontend',
    description: (
      <>
        Een goede interface voel je. Ik bouw met aandacht voor hoe iets beweegt,
        reageert en aanvoelt. Van layout tot animatie.
      </>
    ),
  },
  {
    title: 'Van idee tot product',
    description: (
      <>
        Ik neem een idee en bouw het uit tot iets compleets. Features toevoegen,
        design aanscherpen, itereren tot het een product is waar ik trots op
        ben.
      </>
    ),
  },
  {
    title: 'Full-stack',
    description: (
      <>
        Ik bouw complete web applicaties en word steeds breder. Frontend is mijn
        basis, maar ik werk net zo graag aan API's, databases en de rest van de
        stack.
      </>
    ),
  },
]

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Skills</h2>
        </FadeIn>
        <StaggerContainer
          className="mt-12 space-y-8"
          staggerDelay={0.1}
          delayChildren={0.15}
        >
          {skillCategories.map((category) => (
            <StaggerItem key={category.title}>
              <h3 className="mb-3 text-sm font-medium tracking-wider text-neutral-500 uppercase">
                {category.title}
              </h3>
              <p className="text-base leading-relaxed text-neutral-300 [&>strong]:font-medium [&>strong]:text-white">
                {category.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
