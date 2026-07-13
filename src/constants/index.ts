/**
 * Constantes globais da aplicacao.
 */
import type { ChannelId, NavItem, SegmentId } from '@app-types'

export const APP_NAME = 'Omni Headers'
export const APP_TAGLINE = 'Todo o atendimento da sua empresa em um so lugar.'
export const PARENT_BRAND = 'Headers'

/** Rotas internas. Referencie SEMPRE estas constantes. */
export const ROUTES = {
  home: '/',
  scheduleDemo: '/demonstracao',
  thankYou: '/obrigado',
  notFound: '/404',
} as const

/** Ancoras das secoes da Home (usadas pelo menu + scroll-spy). */
export const SECTION_IDS = {
  inicio: 'inicio',
  problema: 'problema',
  solucao: 'solucao',
  canais: 'canais',
  ia: 'inteligencia-artificial',
  automacoes: 'automacoes',
  dashboards: 'dashboards',
  resultados: 'resultados',
  headers: 'solucao-headers',
  segmentos: 'segmentos',
  faq: 'faq',
  contato: 'contato',
} as const

/** Itens do menu principal -> ancoras da Home. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Sua operação hoje', href: `#${SECTION_IDS.problema}` },
  { label: 'A transformação', href: `#${SECTION_IDS.solucao}` },
  { label: 'Inteligência', href: `#${SECTION_IDS.ia}` },
  { label: 'A Headers', href: `#${SECTION_IDS.headers}` },
]

/** Canais de atendimento suportados (icones/mockups). */
export const CHANNELS: { id: ChannelId; label: string; colorVar: string }[] = [
  { id: 'whatsapp', label: 'WhatsApp', colorVar: 'var(--ch-whatsapp)' },
  { id: 'instagram', label: 'Instagram', colorVar: 'var(--ch-instagram)' },
  { id: 'facebook', label: 'Facebook', colorVar: 'var(--ch-facebook)' },
  { id: 'telegram', label: 'Telegram', colorVar: 'var(--ch-telegram)' },
  { id: 'email', label: 'E-mail', colorVar: 'var(--ch-email)' },
  { id: 'webchat', label: 'Chat do site', colorVar: 'var(--ch-webchat)' },
]

export const SEGMENT_IDS: SegmentId[] = [
  'varejo',
  'ecommerce',
  'saude',
  'servicos',
  'educacao',
  'franquias',
]

export const CONTACT = {
  /** Atendimento direto — botao "Falar no WhatsApp" em todo o site. */
  whatsappNumber: '551151943554',
  whatsappDefaultMessage: 'Olá! Gostaria de tirar algumas dúvidas sobre o Omni Headers.',

  /** Comercial — destino do formulario "Agendar demonstracao". */
  commercialNumber: '5585997058623',
  commercialMessage: 'Olá! Gostaria de agendar uma demonstração do Omni Headers para conhecer melhor a plataforma.',

  email: 'contato@omniheaders.com.br',
  city: 'Fortaleza, CE',
  socials: {
    instagram: '#',
    linkedin: '#',
    facebook: '#',
  },
} as const

/** WhatsApp de atendimento direto — botao "Falar no WhatsApp". */
export function whatsappLink(message: string = CONTACT.whatsappDefaultMessage): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** WhatsApp comercial — formulario "Agendar demonstracao". */
export function whatsappDemoLink(message: string = CONTACT.commercialMessage): string {
  return `https://wa.me/${CONTACT.commercialNumber}?text=${encodeURIComponent(message)}`
}

/** Breakpoints (px). */
export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const
export type Breakpoint = keyof typeof BREAKPOINTS
