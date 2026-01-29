import { FadeIn } from '@/components/animation'

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Over mij
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <FadeIn delay={0.1} direction="left">
            <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-800">
              <img
                src="/images/profile.jpg"
                alt="Profielfoto"
                className="h-full w-full object-cover brightness-[0.85]"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="right">
            <div className="flex flex-col justify-center">
              <p className="text-lg text-neutral-300">
                Ik ben Miles, tweedejaars CMGT-student aan Hogeschool Rotterdam.
                Wat mij drijft is de creatieve vrijheid die development biedt,
                een idee bedenken en het zelf tot leven brengen.
              </p>
              <p className="mt-4 text-neutral-400">
                Van fullstack webapplicaties tot games in Godot: ik ben buiten
                de lessen net zo vaak aan het bouwen als ervoor. Ik leer het
                liefst door te maken.
              </p>
              <p className="mt-4 text-neutral-400">
                Ik zoek een stage waar ik kan groeien tussen gedreven developers
                die hun vak serieus nemen en openstaan voor nieuwe tools zoals
                AI.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
