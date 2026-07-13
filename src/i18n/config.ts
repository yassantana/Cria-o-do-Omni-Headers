/**
 * Configuracao de i18n. pt-BR e o unico locale ativo hoje; a arquitetura ja
 * permite registrar EN/ES exportando um objeto com o mesmo formato (Content).
 */
import ptBR from './locales/pt-BR'

export type Locale = 'pt-BR' | 'en' | 'es'

/** O formato do conteudo e inferido do pt-BR (fonte de verdade). */
export type Content = typeof ptBR

export const DEFAULT_LOCALE: Locale = 'pt-BR'

/** Registro de dicionarios disponiveis. Adicione EN/ES aqui no futuro. */
export const locales: Partial<Record<Locale, Content>> = {
  'pt-BR': ptBR,
}

export function getContent(locale: Locale): Content {
  return locales[locale] ?? ptBR
}
