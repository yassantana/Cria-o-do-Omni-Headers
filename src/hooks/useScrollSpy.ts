import { useEffect, useState } from 'react'

/**
 * Observa secoes pelo id e retorna o id da que esta ativa no viewport.
 * Usado pelo menu (scroll-spy) para destacar o item correspondente.
 */
export function useScrollSpy(ids: string[], rootMargin = '-45% 0px -50% 0px'): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin, threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, rootMargin])

  return activeId
}
