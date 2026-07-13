/**
 * Tipos compartilhados em toda a aplicacao.
 */
import type { ReactNode } from 'react'

/* ---- Utilitarios ---- */
export interface WithChildren {
  children: ReactNode
}
export interface WithClassName {
  className?: string
}
export type Nullable<T> = T | null
export type ValueOf<T> = T[keyof T]

/* ---- Navegacao ---- */
export interface NavItem {
  label: string
  href: string
  external?: boolean
}

/* ---- Dominio ---- */
export type ChannelId = 'whatsapp' | 'instagram' | 'facebook' | 'telegram' | 'email' | 'webchat'

export type SegmentId = 'varejo' | 'ecommerce' | 'saude' | 'servicos' | 'educacao' | 'franquias'

/** Status de uma conversa nos mockups. */
export type ConversationStatus = 'aberta' | 'pendente' | 'resolvida' | 'ia'

/** Mensagem usada nos mockups de inbox. */
export interface MockMessage {
  from: 'cliente' | 'agente' | 'ia'
  text: string
  time: string
}

/** Conversa usada nos mockups de inbox. */
export interface MockConversation {
  id: string
  name: string
  channel: ChannelId
  preview: string
  time: string
  status: ConversationStatus
  unread?: number
}
