export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Over mij</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-800">
            <img
              src="/images/profile.jpg"
              alt="Profielfoto"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg text-neutral-300">
              Schrijf hier een korte maar persoonlijke bio. Vertel wie je bent,
              wat je drijft, en wat je zoekt in een stage of baan.
            </p>
            <p className="mt-4 text-neutral-400">
              Voeg hier meer context toe over je achtergrond, je studie (CMGT),
              en wat je onderscheidt van andere kandidaten. Toon persoonlijkheid
              - recruiters willen weten wie je bent beyond je CV.
            </p>
            <p className="mt-4 text-neutral-400">
              Sluit af met wat je zoekt: een stage bij een game studio, creative
              agency, of tech bedrijf.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
