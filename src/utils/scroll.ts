/**
 * Helpers de navegacao por ancora (rolagem suave respeitando reduced-motion).
 */

/** Rola suavemente ate o elemento com o id informado (sem o "#"). */
export function scrollToId(id: string): void {
  const target = document.getElementById(id.replace(/^#/, ''))
  if (!target) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

/** Rola para o topo da pagina. */
export function scrollToTop(): void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

/** Handler para links de ancora internos (#secao) com rolagem suave. */
export function handleAnchorClick(
  event: { preventDefault: () => void },
  href: string,
): void {
  if (href.startsWith('#')) {
    event.preventDefault()
    scrollToId(href)
  }
}
