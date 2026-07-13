import { useEffect } from 'react'

/** Trava o scroll do body enquanto `locked` for true (ex.: drawer mobile aberto). */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}
