import { useEffect } from 'react'

/** Define o title do documento enquanto a pagina estiver montada. */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}
