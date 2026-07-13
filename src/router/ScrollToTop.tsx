import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Rola para o topo a cada troca de rota (ignora navegacao por ancora #). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, hash])
  return null
}
