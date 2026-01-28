export interface Project {
  slug: string
  title: string
  description: string
  metaDescription: string
  thumbnail: string
  images?: string[]
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  context: string
  role: string
  process: string[]
  result: string
}

export const projects: Project[] = [
  {
    slug: 'getcooked',
    title: 'GetCooked',
    description:
      'Een recepten platform waar gebruikers recepten kunnen bekijken, toevoegen en zoeken. Gebouwd met Laravel.',
    metaDescription:
      'GetCooked - Een Laravel recepten platform met zoeken, filteren en gebruikersaccounts. Gebouwd door Miles Zeilstra.',
    thumbnail: '/images/getcooked.png',
    images: [
      '/images/getcooked-2.png',
      '/images/getcooked-3.png',
      '/images/getcooked-4.png',
    ],
    tags: ['Laravel', 'PHP', 'Full Stack'],
    githubUrl: 'https://github.com/AirMile/getcooked',
    context:
      'Solo schoolopdracht waarbij ik een complete recepten website moest bouwen. Gebruikers kunnen recepten bekijken, toevoegen, zoeken en filteren, met een volledig account systeem.',
    role: 'Volledige ontwikkeling van concept tot werkend product. Dit was mijn eerste grote Laravel project.',
    process: [
      'Laravel framework leren en project opzetten',
      'Database design voor recepten, ingrediënten en gebruikers',
      'Authentication systeem implementeren',
      'Zoek- en filterfunctionaliteit bouwen',
    ],
    result:
      'Een volledig werkende recepten applicatie. Door dit project heb ik Laravel onder de knie gekregen en ervaring opgedaan met MVC architectuur.',
  },
  {
    slug: 'natuurmoment',
    title: 'NatuurMoment',
    description:
      'Een interactieve groepsgame die spelers door natuurgebieden leidt met foto-bingo en quizvragen.',
    metaDescription:
      'NatuurMoment - Een interactieve natuurgame met foto-bingo en quizvragen. Laravel/Livewire teamproject door Miles Zeilstra.',
    thumbnail: '/images/natuurmoment.png',
    images: [
      '/images/natuurmoment-2.png',
      '/images/natuurmoment-3.png',
      '/images/natuurmoment-4.png',
    ],
    tags: ['Laravel', 'Livewire', 'Tailwind CSS', 'Team Project'],
    githubUrl: 'https://github.com/HenkHR/NatuurMoment',
    context:
      "Groepsproject voor een interactieve natuurgame. Spelers voltooien bingo-challenges door foto's te maken en beantwoorden meerkeuzevragen over de locatie, terwijl ze strijden om de hoogste score.",
    role: 'Full-stack development met focus op backend. Daarnaast verantwoordelijk voor de styleguide, groot deel van de wireframes en uitwerking van het concept.',
    process: [
      'Concept en idee uitwerking met het team',
      'Styleguide en wireframes ontwerpen in Figma',
      'Backend features implementeren in Laravel',
      'Real-time functionaliteit met Livewire',
    ],
    result:
      'Een volledig werkende game die live heeft gedraaid. Het team heeft succesvol samengewerkt met een moderne Laravel/Livewire stack.',
  },
]
