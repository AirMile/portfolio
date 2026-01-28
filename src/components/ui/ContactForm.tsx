import { useState, type FormEvent } from 'react'
import { Button } from './Button'
import { FormInput } from './FormInput'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      company_fax: formData.get('company_fax') as string, // honeypot
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Er ging iets mis')
      }

      setStatus('success')
      form.reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Er ging iets mis'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
          <svg
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-white">Bedankt voor je bericht!</p>
        <p className="mt-2 text-sm text-neutral-400">
          Ik neem zo snel mogelijk contact met je op.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-neutral-400 underline hover:text-white"
        >
          Nog een bericht sturen
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field - hidden from users, bots will fill this */}
      <input
        type="text"
        name="company_fax"
        tabIndex={-1}
        autoComplete="nope"
        className="absolute -left-[9999px] opacity-0"
        aria-hidden="true"
      />
      <FormInput id="name" name="name" placeholder="Naam" required />
      <FormInput
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
      <FormInput
        as="textarea"
        id="message"
        name="message"
        placeholder="Je bericht..."
        rows={4}
        required
      />

      {status === 'error' && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <Button type="submit" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Verzenden...' : 'Verstuur bericht'}
      </Button>
    </form>
  )
}
