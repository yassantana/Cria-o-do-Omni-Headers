import { useEffect, useState } from 'react'

/**
 * Retorna `true` quando a pagina passou de `threshold` px de scroll.
 * Usado para condensar o header (transparente -> solido).
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
