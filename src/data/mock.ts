/**
 * Dados de EXEMPLO para os mockups da plataforma (UI ilustrativa).
 * Nao sao dados reais de clientes — apenas demonstram a interface do produto.
 */
import type { ChannelId, ConversationStatus, MockConversation, MockMessage } from '@app-types'

export const mockConversations: MockConversation[] = [
  { id: 'c1', name: 'Mariana Lopes', channel: 'whatsapp', preview: 'Oi! Voces tem disponivel pra hoje?', time: '09:41', status: 'aberta', unread: 2 },
  { id: 'c2', name: 'Pedro Henrique', channel: 'instagram', preview: 'Vi o post, qual o valor?', time: '09:38', status: 'ia' },
  { id: 'c3', name: 'Loja Centro', channel: 'webchat', preview: 'Preciso de uma 2a via', time: '09:30', status: 'pendente' },
  { id: 'c4', name: 'Carla Souza', channel: 'email', preview: 'Segue o comprovante anexo', time: '09:12', status: 'resolvida' },
  { id: 'c5', name: 'Joao Vitor', channel: 'telegram', preview: 'Obrigado pelo atendimento!', time: '08:55', status: 'resolvida' },
  { id: 'c6', name: 'Amanda Reis', channel: 'facebook', preview: 'Funciona pra minha cidade?', time: '08:47', status: 'aberta', unread: 1 },
]

export const mockThread: MockMessage[] = [
  { from: 'cliente', text: 'Oi! Voces tem disponivel pra hoje?', time: '09:41' },
  { from: 'ia', text: 'Oi, Mariana! Temos sim 😊 Posso reservar pra voce hoje as 15h. Confirmo?', time: '09:41' },
  { from: 'cliente', text: 'Perfeito, pode confirmar!', time: '09:42' },
  { from: 'agente', text: 'Reservado! Te enviei a confirmacao por aqui. Qualquer coisa, e so chamar.', time: '09:43' },
]

export const statusLabel: Record<ConversationStatus, string> = {
  aberta: 'Aberta',
  pendente: 'Pendente',
  resolvida: 'Resolvida',
  ia: 'IA atendendo',
}

export const statusColor: Record<ConversationStatus, string> = {
  aberta: 'var(--brand-400)',
  pendente: 'var(--warning)',
  resolvida: 'var(--success)',
  ia: 'var(--iris-400)',
}

/** Volume ilustrativo por canal (para graficos do dashboard). */
export const channelVolume: { channel: ChannelId; value: number }[] = [
  { channel: 'whatsapp', value: 68 },
  { channel: 'instagram', value: 24 },
  { channel: 'webchat', value: 18 },
  { channel: 'email', value: 12 },
  { channel: 'telegram', value: 9 },
  { channel: 'facebook', value: 7 },
]
