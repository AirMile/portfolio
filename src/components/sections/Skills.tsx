import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'

const skillCategories = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'PHP', 'GDScript'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Tailwind CSS', 'GSAP', 'Motion'],
  },
  {
    title: 'Backend',
    skills: ['Laravel', 'Node.js', 'Express', 'MySQL'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'VS Code', 'Figma', 'Godot'],
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
              <h3 className="mb-4 text-sm font-medium tracking-wider text-neutral-500 uppercase">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
