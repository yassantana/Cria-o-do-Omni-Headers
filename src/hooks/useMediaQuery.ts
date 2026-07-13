import { useEffect, useState } from 'react'

/**
 * Observa uma media query e retorna se ela esta ativa.
 * Hook de infraestrutura reutilizavel — base para layouts responsivos.
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1024px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)

    update()
    mql.addEventListener('change', update)
    // Fallback: alguns ambientes nao disparam o evento 'change' da media query
    // ao redimensionar; o listener de resize garante a reavaliacao.
    window.addEventListener('resize', update)

    return () => {
      mql.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [query])

  return matches
}
