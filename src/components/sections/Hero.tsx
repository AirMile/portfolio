import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
          Miles Zeilstra
        </h1>
        <p className="mt-4 text-xl text-neutral-400 md:text-2xl">
          Creative Developer
        </p>
        <p className="mx-auto mt-6 max-w-xl text-neutral-500">
          Ik bouw interactieve web experiences en games. Van idee tot werkend
          product — altijd op zoek naar de creatieve oplossing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/#projects">Bekijk mijn werk</Button>
          <Button href="#contact" variant="secondary">
            Neem contact op
          </Button>
        </div>
      </div>
    </section>
  )
}
