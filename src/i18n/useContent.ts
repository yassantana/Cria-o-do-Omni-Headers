import { useContext } from 'react'

import { LocaleContext } from './LocaleProvider'

/** Acessa o dicionario de conteudo do locale ativo. Ex.: `const c = useContent(); c.hero.title`. */
export function useContent() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useContent precisa estar dentro de <LocaleProvider>')
  }
  return ctx.content
}

/** Acessa o locale atual e o setter (para um futuro seletor de idioma). */
export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale precisa estar dentro de <LocaleProvider>')
  }
  return { locale: ctx.locale, setLocale: ctx.setLocale }
}
