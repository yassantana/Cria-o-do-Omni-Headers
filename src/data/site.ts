/**
 * Conteudo estatico/config do site. Centraliza textos e dados que alimentam
 * as secoes, mantendo os componentes livres de strings hard-coded.
 *
 * Por enquanto contem apenas o minimo; sera populado ao construir as paginas.
 */
import type { NavItem } from '@app-types'

export interface SiteConfig {
  name: string
  tagline: string
  nav: NavItem[]
}

export const siteConfig: SiteConfig = {
  name: 'Omni Headers',
  tagline: '',
  nav: [],
}
