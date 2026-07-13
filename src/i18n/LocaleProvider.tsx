import { createContext, useCallback, useMemo, useState } from 'react'

import type { WithChildren } from '@app-types'
import { type Content, DEFAULT_LOCALE, getContent, type Locale } from './config'

interface LocaleContextValue {
  locale: Locale
  content: Content
  setLocale: (locale: Locale) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const LocaleContext = createContext<LocaleContextValue | null>(null)

/**
 * Provedor de i18n. Mantem o locale atual e expoe o dicionario de conteudo.
 * Hoje so pt-BR esta registrado; trocar de locale ja funciona quando houver mais.
 */
export function LocaleProvider({ children }: WithChildren) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)

  const handleSetLocale = useCallback((next: Locale) => {
    setLocale(next)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next
    }
  }, [])

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, content: getContent(locale), setLocale: handleSetLocale }),
    [locale, handleSetLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
