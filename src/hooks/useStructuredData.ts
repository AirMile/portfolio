import { useEffect } from 'react'

type StructuredData =
  | PersonSchema
  | CreativeWorkSchema
  | WebSiteSchema
  | WithContextSchema

interface WithContextSchema {
  '@context': string
  '@type': string
  [key: string]: unknown
}

interface PersonSchema {
  '@type': 'Person'
  name: string
  jobTitle?: string
  url?: string
  sameAs?: string[]
}

interface CreativeWorkSchema {
  '@type': 'CreativeWork'
  name: string
  description: string
  url?: string
  image?: string
  author?: PersonSchema
  dateCreated?: string
  keywords?: string[]
}

interface WebSiteSchema {
  '@type': 'WebSite'
  name: string
  url: string
  author?: PersonSchema
}

const SCRIPT_ID = 'structured-data'

export function useStructuredData(data: StructuredData | StructuredData[]) {
  useEffect(() => {
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null

    if (!script) {
      script = document.createElement('script')
      script.id = SCRIPT_ID
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    const dataWithContext = Array.isArray(data)
      ? data.map((item) => ({ '@context': 'https://schema.org', ...item }))
      : { '@context': 'https://schema.org', ...data }

    script.textContent = JSON.stringify(dataWithContext)

    return () => {
      const existingScript = document.getElementById(SCRIPT_ID)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [data])
}
