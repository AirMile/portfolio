import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './Button'
import { FormInput } from './FormInput'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm({
  onStatusChange,
}: {
  onStatusChange?: (status: FormStatus) => void
}) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function updateStatus(newStatus: FormStatus) {
    setStatus(newStatus)
    onStatusChange?.(newStatus)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    updateStatus('loading')
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
        let errorMsg = t('contact.form.error')
        try {
          const error = await response.json()
          errorMsg = error.error || errorMsg
        } catch {
          // Server returned non-JSON (e.g. Vercel platform error)
        }
        throw new Error(errorMsg)
      }

      updateStatus('success')
      form.reset()
    } catch (error) {
      updateStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : t('contact.form.error')
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
        <p className="text-white">{t('contact.form.success')}</p>
        <p className="mt-2 text-sm text-neutral-400">
          {t('contact.form.successDetail')}
        </p>
        <button
          onClick={() => updateStatus('idle')}
          className="mt-4 text-sm text-neutral-400 underline hover:text-white"
        >
          {t('contact.form.sendAnother')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field - hidden from users, bots will fill this */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="company_fax">Fax</label>
        <input
          type="text"
          id="company_fax"
          name="company_fax"
          tabIndex={-1}
          autoComplete="nope"
        />
      </div>
      <FormInput
        id="name"
        name="name"
        placeholder={t('contact.form.name')}
        required
      />
      <FormInput
        type="email"
        id="email"
        name="email"
        placeholder={t('contact.form.email')}
        required
      />
      <FormInput
        as="textarea"
        id="message"
        name="message"
        placeholder={t('contact.form.message')}
        rows={4}
        required
      />

      {status === 'error' && (
        <div className="text-sm text-red-400">
          <p>{errorMessage}</p>
          <p className="mt-1 text-neutral-400">
            {t('contact.form.fallback')}{' '}
            <a
              href="mailto:zeilstramiles@gmail.com"
              className="text-white underline hover:text-neutral-300"
            >
              zeilstramiles@gmail.com
            </a>
          </p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={status === 'loading'}>
        {status === 'loading'
          ? t('contact.form.sending')
          : t('contact.form.submit')}
      </Button>
    </form>
  )
}
