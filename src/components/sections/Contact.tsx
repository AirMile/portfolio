import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/animation'

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Contact</h2>
          <p className="mt-4 text-neutral-400">
            Geïnteresseerd in samenwerking of heb je een vraag? Neem gerust
            contact op.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="mailto:zeilstramiles@gmail.com">Email</Button>
            <Button href="https://github.com/AirMile" variant="secondary">
              GitHub
            </Button>
            <Button
              href="https://linkedin.com/in/miles-zeilstra"
              variant="secondary"
            >
              LinkedIn
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
