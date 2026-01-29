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
      'Solo schoolopdracht waarbij ik een complete recepten website moest bouwen. Gebruikers kunnen private recepten uploaden of submitten voor public review. Verified users kunnen direct public posten. Een admin panel beheert submissions en gebruikersrechten.',
    role: 'Volledige ontwikkeling van concept tot werkend product. Dit was mijn eerste grote Laravel project.',
    process: [
      'ERD ontwerp en user stories uitwerken',
      'Role-based authentication met admin panel',
      'Recipe status workflow (private, pending, approved, rejected)',
      'Verified users systeem en spam preventie',
      'Zoek- en filtersysteem met query scopes',
      'Notificatiesysteem voor status updates',
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
      '/images/natuurmoment-5.png',
      '/images/natuurmoment-6.png',
      '/images/natuurmoment-7.png',
      '/images/natuurmoment-8.png',
    ],
    tags: ['Laravel', 'Tailwind CSS', 'Figma', 'Team Project'],
    githubUrl: 'https://github.com/HenkHR/NatuurMoment',
    context:
      "Groepsproject voor een interactieve natuurgame. Spelers voltooien bingo-challenges door foto's te maken en beantwoorden meerkeuzevragen over de locatie, terwijl ze strijden om de hoogste score.",
    role: 'Full-stack development met focus op backend in een team van 5. Verantwoordelijk voor de styleguide, wireframes en conceptuitwerking. Bouwde het complete admin panel, organisator dashboard en kernfunctionaliteiten.',
    process: [
      'Concept uitwerking en styleguide/wireframes ontwerpen in Figma',
      'Role-based systeem: speler, organisator en admin',
      'Quiz systeem met meerkeuzevragen en score berekening',
      'Organisator dashboard: games aanmaken, spelers beheren, live monitoren',
      'Admin panel met content beheer en statistieken (ratings, leeftijdsverdeling, trends)',
    ],
    result:
      'Een volledig werkende game die live heeft gedraaid met echte gebruikers. Het statistieken dashboard toonde engagement metrics zoals gemiddelde ratings per locatie en leeftijdsverdeling.',
  },
]
