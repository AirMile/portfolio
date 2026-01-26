const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'GDScript', 'PHP', 'HTML', 'CSS'],
  },
  {
    title: 'Frameworks',
    skills: ['React', 'Laravel', 'Godot', 'Node.js', 'Express', 'Tailwind CSS'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'VS Code', 'Figma'],
  },
]

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Skills</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-lg font-semibold text-white">
                {category.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-neutral-400">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
