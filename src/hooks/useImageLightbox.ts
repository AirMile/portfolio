import { useState, useEffect } from 'react'

export function useImageLightbox(images: string[]) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const isOpen = lightboxIndex !== null

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight' && lightboxIndex < images.length - 1) {
        setLightboxIndex(lightboxIndex + 1)
      }
      if (e.key === 'ArrowLeft' && lightboxIndex > 0) {
        setLightboxIndex(lightboxIndex - 1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, lightboxIndex, images.length])

  return {
    lightboxIndex,
    isOpen,
    open: (index: number) => setLightboxIndex(index),
    close: () => setLightboxIndex(null),
    next: () => {
      if (lightboxIndex !== null && lightboxIndex < images.length - 1) {
        setLightboxIndex(lightboxIndex + 1)
      }
    },
    prev: () => {
      if (lightboxIndex !== null && lightboxIndex > 0) {
        setLightboxIndex(lightboxIndex - 1)
      }
    },
    hasNext: lightboxIndex !== null && lightboxIndex < images.length - 1,
    hasPrev: lightboxIndex !== null && lightboxIndex > 0,
  }
}
