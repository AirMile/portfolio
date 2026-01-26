import { Button } from '@/components/ui/Button'

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Contact</h2>
        <p className="mt-4 text-neutral-400">
          Geïnteresseerd in samenwerking of heb je een vraag? Neem gerust
          contact op.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="mailto:jouw@email.com">Email</Button>
          <Button
            href="https://linkedin.com/in/jouwprofiel"
            variant="secondary"
          >
            LinkedIn
          </Button>
          <Button href="https://github.com/jouwnaam" variant="secondary">
            GitHub
          </Button>
        </div>
        <p className="mt-12 text-sm text-neutral-500">
          Of stuur een email naar:{' '}
          <a
            href="mailto:jouw@email.com"
            className="text-white underline hover:no-underline"
          >
            jouw@email.com
          </a>
        </p>
      </div>
    </section>
  )
}
