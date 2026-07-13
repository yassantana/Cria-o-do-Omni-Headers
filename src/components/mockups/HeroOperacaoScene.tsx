import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import { ChannelGlyph } from '@components/icons'
import type { ChannelId } from '@app-types'
import styles from './HeroOperacaoScene.module.css'

/* ─── Avatar & agent colors ─────────────────────────────────── */
const AV: Record<string, string> = {
  F: '#10b981', L: '#3b82f6', A: '#f59e0b', B: '#ef4444',
  S: '#8b5cf6', R: '#06b6d4', M: '#ec4899', C: '#0891b2',
}
const avColor = (name: string) => AV[name[0]] ?? '#6b7280'

const AGENT_COLORS: Record<string, string> = {
  CA: '#8b5cf6',   // Camila A.
  MA: '#0891b2',   // Marcos
  PS: '#ef4444',   // Pedro Suporte
  AL: '#10b981',   // Ana Lima
}
const AGENT_NAMES: Record<string, string> = {
  CA: 'Camila A.',
  MA: 'Marcos',
  PS: 'Pedro (Suporte)',
  AL: 'Ana Lima',
}
const CONV_REF: Record<string, string> = {
  a: '#4518', b: '#4521', c: '#4525', d: '#4529', e: '#4533', f: '#4537',
}

/* ─── Types ─────────────────────────────────────────────────── */
type Status = 'waiting' | 'progress' | 'resolved'
type AiState = 'typing' | 'done' | 'suggest' | 'intent' | 'summary'
type MsgType = 'in' | 'bot' | 'agent' | 'note' | 'event'
type ScriptAction =
  | 'in' | 'ai-typing' | 'ai-done' | 'ai-suggest'
  | 'assign' | 'tag' | 'close' | 'note'

interface ConvRow {
  key: string
  id: number
  name: string
  channel: ChannelId
  text: string
  time: string
  unread?: boolean
  status?: Status
  ai?: AiState
  agent?: string
  tag?: string
  tagColor?: string
  closed?: boolean
}

interface Msg {
  id: string
  type: MsgType
  text: string
  label?: string
  labelColor?: string
  ts: string
}

type ConvMsgs = Record<string, Msg[]>

interface ScriptStep {
  key: string
  action: ScriptAction
  agent?: string
  tag?: string
  tagColor?: string
  msg?: Omit<Msg, 'id'>
  act: string
  delay: number  // ms to wait before THIS step fires
}

/* ─── Conversation base data (6 channels, 6 distinct profiles) ─ */
const BASE: Omit<ConvRow, 'id' | 'status' | 'unread'>[] = [
  // a — Fernanda, WhatsApp, rastreio de pedido (resolvida pela IA como hero story)
  { key: 'a', name: 'Fernanda', channel: 'whatsapp', text: 'Faz 5 dias e o pedido não chegou 😟', time: '2m' },
  // b — Lucas, Instagram, lead de vendas
  { key: 'b', name: 'Lucas', channel: 'instagram', text: 'Vi o post de vocês! Qual o plano mensal?', time: '11m' },
  // c — Ana Clara, E-mail, renovação de contrato B2B
  { key: 'c', name: 'Ana Clara', channel: 'email', text: 'Gostaria de renovar nosso contrato.', time: '35m' },
  // d — Bruno, Telegram, pagamento travado (URGENTE)
  { key: 'd', name: 'Bruno', channel: 'telegram', text: 'App travou no pagamento! R$890 sumiu!', time: '48m' },
  // e — Sofia, Facebook, agendamento de consulta
  { key: 'e', name: 'Sofia', channel: 'facebook', text: 'Gostaria de agendar uma consulta', time: '1h' },
  // f — Rodrigo, Webchat, lead enterprise (VIP)
  { key: 'f', name: 'Rodrigo', channel: 'webchat', text: 'Nossa empresa tem 200 colaboradores', time: '1h22m' },
]

const INITIAL_ROWS: ConvRow[] = [
  { ...BASE[0], id: 0, ai: 'done', status: 'resolved' },
  { ...BASE[1], id: 1, agent: 'CA', tag: 'orçamento', tagColor: '#f59e0b', status: 'progress' },
  { ...BASE[2], id: 2, agent: 'MA', tag: 'renovação', tagColor: '#8b5cf6', status: 'progress' },
  { ...BASE[3], id: 3, agent: 'PS', tag: 'urgente',   tagColor: '#ef4444', status: 'progress' },
  { ...BASE[4], id: 4, status: 'waiting' },
  { ...BASE[5], id: 5, agent: 'MA', tag: 'vip',       tagColor: '#0891b2', status: 'progress' },
]

/* ─── Initial message threads ────────────────────────────────── */
const INITIAL_MSGS: ConvMsgs = {
  // Fernanda — WhatsApp — HERO STORY: mostra o fluxo completo (IA consulta ERP e resolve)
  a: [
    { id:'a0', type:'in',  text:'Olá! Fiz um pedido semana passada (código #89234) e até agora não chegou. Pode verificar pra mim?', ts:'4m' },
    { id:'a1', type:'bot', label:'Captain · IA', text:'Olá Fernanda! Já estou consultando seu pedido. Um momento 🔍', ts:'4m' },
    { id:'a2', type:'event', text:'Captain IA consultou ERP · Pedido #89234 localizado', ts:'3m' },
    { id:'a3', type:'bot', label:'Captain · IA', text:'Seu pedido foi despachado em 10/jun via Jadlog 🚚 Código de rastreio: JD00498123. A previsão de entrega é hoje até 18h.', ts:'3m' },
    { id:'a4', type:'in',  text:'Ai que alívio! Muito obrigada, tava com o coração na mão kk 😅', ts:'2m' },
    { id:'a5', type:'event', text:'Conversa encerrada · Captain IA · tempo médio: 1m22s', ts:'2m' },
  ],
  // Lucas — Instagram — Lead de vendas, em atendimento com Camila
  b: [
    { id:'b0', type:'in',   text:'Oi! Vi o post de vocês no Instagram. Qual o valor do plano mensal?', ts:'11m' },
    { id:'b1', type:'event', text:'Captain IA identificou: intenção de orçamento', ts:'11m' },
    { id:'b2', type:'event', text:'Camila A. assumiu · Em atendimento', ts:'10m' },
    { id:'b3', type:'agent', label:'Camila A.', labelColor: AGENT_COLORS.CA, text:'Olá Lucas! Nossos planos começam em R$99/mês. Posso te enviar a tabela com todos os recursos inclusos?', ts:'9m' },
    { id:'b4', type:'in',   text:'Pode sim! Tem contrato de fidelidade?', ts:'8m' },
    { id:'b5', type:'agent', label:'Camila A.', labelColor: AGENT_COLORS.CA, text:'Sem fidelidade! Cancela quando quiser. Já te enviei a tabela no e-mail. Ficou alguma dúvida?', ts:'8m' },
  ],
  // Ana Clara — E-mail — Renovação B2B, cliente VIP (Marcos)
  c: [
    { id:'c0', type:'in',   text:'Prezados, gostaria de renovar nosso contrato, que vence em 30/jun. Poderiam enviar a proposta atualizada?', ts:'35m' },
    { id:'c1', type:'bot',  label:'Captain · IA · Resumo', text:'Ana Clara Neves · cliente desde mar/2022 · plano Pro R$1.200/mês · 3ª renovação consecutiva · score 9.8/10 · 0 chamados abertos', ts:'35m' },
    { id:'c2', type:'event', text:'Marcos assumiu · Em atendimento', ts:'33m' },
    { id:'c3', type:'agent', label:'Marcos', labelColor: AGENT_COLORS.MA, text:'Olá, Ana Clara! Fico muito feliz em ter você conosco por mais um ciclo. Vou preparar uma proposta especial. Pode aguardar até amanhã cedo?', ts:'32m' },
    { id:'c4', type:'in',   text:'Claro, obrigada Marcos! Se puder incluir o comparativo de planos e o histórico de uso, seria ótimo.', ts:'30m' },
  ],
  // Bruno — Telegram — Urgente: pagamento travado (Pedro Suporte)
  d: [
    { id:'d0', type:'in',   text:'URGENTE — o app travou durante o pagamento de R$890. O pedido não confirmou mas o valor foi debitado!', ts:'48m' },
    { id:'d1', type:'bot',  label:'Captain · IA', text:'Bruno, entendo a urgência. Já estou verificando sua transação agora.', ts:'48m' },
    { id:'d2', type:'event', text:'Captain IA consultou ERP · Transação #TRX-77291 — status: PENDENTE', ts:'47m' },
    { id:'d3', type:'note', label:'Nota interna', text:'Transação #TRX-77291 com timeout no gateway de pagamento. Valor de R$890 em limbo. Acionar equipe de financeiro imediatamente — cliente aguardando.', ts:'47m' },
    { id:'d4', type:'event', text:'Pedro (Suporte) assumiu · Prioridade alta', ts:'46m' },
    { id:'d5', type:'agent', label:'Pedro (Suporte)', labelColor: AGENT_COLORS.PS, text:'Bruno, localizei o problema — foi um timeout no gateway. O valor NÃO será cobrado. Já processamos o estorno. Em até 3 dias úteis no seu cartão. Desculpe o susto!', ts:'40m' },
  ],
  // Sofia — Facebook — Agendamento de consulta
  e: [
    { id:'e0', type:'in',  text:'Bom dia! Gostaria de agendar uma consulta para a próxima semana.', ts:'1h' },
    { id:'e1', type:'bot', label:'Captain · IA', text:'Bom dia, Sofia! Temos os seguintes horários disponíveis: Seg às 10h ou 15h, Ter às 11h ou 14h, Qui às 9h ou 16h. Qual prefere?', ts:'1h' },
  ],
  // Rodrigo — Webchat — Lead enterprise VIP (Marcos)
  f: [
    { id:'f0', type:'in',   text:'Bom dia! Nossa empresa tem cerca de 200 colaboradores e estamos buscando uma solução de atendimento. Vocês têm plano enterprise?', ts:'1h22m' },
    { id:'f1', type:'bot',  label:'Captain · IA · Lead VIP', text:'Lead enterprise detectado · empresa de médio porte · potencial estimado: R$4.800–8.000/mês · encaminhar para executivo sênior', ts:'1h22m' },
    { id:'f2', type:'event', text:'Marcos assumiu · Atendimento prioritário', ts:'1h20m' },
    { id:'f3', type:'agent', label:'Marcos', labelColor: AGENT_COLORS.MA, text:'Olá, Rodrigo! Trabalhamos com empresas do seu porte. Posso te mostrar um case de uma empresa com 180 colaboradores que reduziu 40% do tempo médio de atendimento com a gente?', ts:'1h18m' },
    { id:'f4', type:'in',   text:'Seria ótimo! Quais canais vocês suportam? Hoje usamos WhatsApp, e-mail e chat no site.', ts:'1h15m' },
    { id:'f5', type:'agent', label:'Marcos', labelColor: AGENT_COLORS.MA, text:'Todos esses e mais: Instagram, Facebook, Telegram — tudo na mesma caixa de entrada com IA nativa. Posso agendar uma demo esta semana?', ts:'1h12m' },
  ],
}

/* ─── Animation script — operação viva, timing variável ─────── */
// delay = ms a esperar ANTES deste passo disparar
const SCRIPT: ScriptStep[] = [
  // Lucas manda nova mensagem
  { key:'b', action:'in', delay:2000,
    msg:{ type:'in', text:'Tem suporte incluído? E como funciona o onboarding?', ts:'agora' },
    act:'Nova mensagem · Instagram · Lucas Santos' },
  // IA digita rapidamente
  { key:'b', action:'ai-typing', delay:750, act:'Captain IA analisando...' },
  // IA responde
  { key:'b', action:'ai-done', delay:1150,
    msg:{ type:'bot', label:'Captain · IA', text:'Todos os planos incluem suporte 24h por chat. O plano Pro vem com onboarding dedicado e SLA de 2h.', ts:'agora' },
    act:'Captain IA respondeu Lucas' },
  // Ana Clara manda email de follow-up
  { key:'c', action:'in', delay:2400,
    msg:{ type:'in', text:'Obrigada, Marcos! Pode incluir o relatório de uso dos últimos 6 meses junto com a proposta?', ts:'agora' },
    act:'Nova mensagem · E-mail · Ana Clara Neves' },
  // Marcos deixa nota interna
  { key:'c', action:'note', delay:1500,
    msg:{ type:'note', label:'Marcos', text:'Solicitar relatório de uso ao setor de BI. Prazo: hoje às 17h. Ana Clara aguarda proposta para manhã.', ts:'agora' },
    act:'Marcos registrou nota interna' },
  // Bruno é resolvido
  { key:'d', action:'close', delay:1900,
    msg:{ type:'event', text:'Transação #TRX-77291 estornada · Conversa encerrada por Pedro (Suporte)', ts:'agora' },
    act:'Atendimento de Bruno encerrado com sucesso' },
  // Rodrigo manda nova pergunta via webchat
  { key:'f', action:'in', delay:1700,
    msg:{ type:'in', text:'Quantos usuários simultâneos vocês suportam? E tem plano por volume de mensagens?', ts:'agora' },
    act:'Nova mensagem · Chat do Site · Rodrigo Melo' },
  // IA prepara sugestão de resposta
  { key:'f', action:'ai-typing', delay:800, act:'Captain IA preparando resposta...' },
  { key:'f', action:'ai-done', delay:1050,
    msg:{ type:'bot', label:'Captain · IA · Sugestão', text:'"Usuários ilimitados simultâneos. Planos por volume disponíveis a partir de 50k mensagens/mês."', ts:'agora' },
    act:'Captain IA sugeriu resposta para Rodrigo' },
  // Marcos assume e responde diretamente
  { key:'f', action:'assign', agent:'MA', delay:1300,
    msg:{ type:'agent', label:'Marcos', labelColor: AGENT_COLORS.MA, text:'Rodrigo, nossa arquitetura escala sem limites. Já atendemos empresas com 500+ usuários simultâneos. Posso enviar a ficha técnica com os benchmarks?', ts:'agora' },
    act:'Marcos assumiu atendimento de Rodrigo' },
  // Sofia confirma agendamento
  { key:'e', action:'in', delay:2200,
    msg:{ type:'in', text:'Prefiro terça às 14h! Me chamo Sofia Andrade, da XLogística.', ts:'agora' },
    act:'Nova mensagem · Facebook · Sofia Andrade' },
  // IA confirma e encerra
  { key:'e', action:'ai-done', delay:850,
    msg:{ type:'bot', label:'Captain · IA', text:'Confirmado, Sofia! Terça às 14h ✓ Você receberá o link da reunião no e-mail cadastrado em instantes.', ts:'agora' },
    act:'Captain IA confirmou agendamento com Sofia' },
  { key:'e', action:'close', delay:1350,
    msg:{ type:'event', text:'Conversa encerrada · Captain IA · agendamento confirmado', ts:'agora' },
    act:'Sofia — agendamento confirmado e encerrado pela IA' },
  // Fernanda volta com update
  { key:'a', action:'in', delay:2100,
    msg:{ type:'in', text:'O rastreio continua mostrando "em rota de entrega". Já são 19h 😟', ts:'agora' },
    act:'Nova mensagem · WhatsApp · Fernanda Rocha' },
  { key:'a', action:'ai-typing', delay:700, act:'Captain IA consultando Jadlog...' },
  { key:'a', action:'ai-done', delay:1250,
    msg:{ type:'bot', label:'Captain · IA', text:'Fernanda, consultei a Jadlog agora. Houve um atraso na triagem de Guarulhos. Já acionamos o reagendamento automático — entrega garantida em até 24h com prioridade. Pedimos desculpas pelo inconveniente!', ts:'agora' },
    act:'Captain IA atualizou Fernanda sobre a entrega' },
  // Lucas converte — tag confirmada
  { key:'b', action:'tag', delay:1700, tag:'orçamento', tagColor:'#f59e0b',
    act:'Etiqueta "orçamento" confirmada · Lucas Santos' },
]

/* ─── Sidebar icon helper ────────────────────────────────────── */
function SbIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    inbox: (
      <path d="M3 5h14v9H3V5zm0 5.5h3l1.5 2h5l1.5-2H17"
        stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinejoin="round" />
    ),
    chat: (
      <path d="M4 4h12v9.5H9L4 17V4z"
        stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinejoin="round" />
    ),
    robot: (
      <>
        <rect x="5" y="5" width="10" height="9" rx="2" stroke="currentColor" strokeWidth="1.35" fill="none" />
        <path d="M7.5 9.5h1.5m3.5 0H11m-3 3h6M9.5 5V3h1v2"
          stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinecap="round" />
      </>
    ),
    person: (
      <>
        <circle cx="10" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.35" fill="none" />
        <path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6"
          stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinecap="round" />
      </>
    ),
    chart: (
      <path d="M4 15h2V9H4v6zm4 0h2V6H8v9zm4 0h2v-5h-2v5z"
        stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinejoin="round" />
    ),
    megaphone: (
      <path d="M5 9h7l3-3v8l-3-3H5V9zm0 0l-1.5 5"
        stroke="currentColor" strokeWidth="1.35" fill="none"
        strokeLinejoin="round" strokeLinecap="round" />
    ),
    config: (
      <>
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.35" fill="none" />
        <path d="M10 4v1.5m0 9V16M4 10H2.5m13 0H17M5.5 5.5l1 1m7 7 1 1M5.5 14.5l1-1m7-7 1-1"
          stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </>
    ),
    help: (
      <>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.35" fill="none" />
        <path d="M8 8a2 2 0 1 1 2 2v2"
          stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinecap="round" />
        <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
      </>
    ),
  }
  return (
    <svg viewBox="0 0 20 20" width="15" height="15" style={{ flexShrink: 0 }}>
      {paths[name]}
    </svg>
  )
}

/* ─── Status helpers ─────────────────────────────────────────── */
function statusLabel(s?: Status) {
  if (s === 'progress') return 'Em atendimento'
  if (s === 'resolved') return 'Resolvida'
  return 'Aguardando'
}
function statusCls(s?: Status) {
  const base = styles.detailChip
  if (s === 'progress') return `${base} ${styles.chipProgress}`
  if (s === 'resolved') return `${base} ${styles.chipResolved}`
  return `${base} ${styles.chipWaiting}`
}

/* ─── Main component ─────────────────────────────────────────── */
export function HeroOperacaoScene({ inboxTitle }: { inboxTitle: string }) {
  const reduce = useReducedMotion()
  const [rows, setRows] = useState<ConvRow[]>(INITIAL_ROWS)
  const [convMsgs, setConvMsgs] = useState<ConvMsgs>(INITIAL_MSGS)
  const [activity, setActivity] = useState('Operação ao vivo · Captain IA ativo')
  const [selectedKey, setSelectedKey] = useState('a')
  const [badge, setBadge] = useState(4)
  const bodyRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const step = useRef(0)
  const nextId = useRef(INITIAL_ROWS.length)
  const nextMsgId = useRef(300)

  // Clear unread when switching conversations
  useEffect(() => {
    setRows(prev => prev.map(r => r.key === selectedKey ? { ...r, unread: false } : r))
  }, [selectedKey])

  // Scroll detail to bottom on new messages
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [convMsgs])

  // Scroll instantly when switching conversations
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'instant' })
  }, [selectedKey])

  // Variable-timing animation script
  useEffect(() => {
    if (reduce) return

    function runStep() {
      const s = SCRIPT[step.current % SCRIPT.length]
      step.current++

      // Append message to thread
      if (s.msg) {
        const msgId = `m${nextMsgId.current++}`
        setConvMsgs(prev => ({
          ...prev,
          [s.key]: [...(prev[s.key] ?? []), { ...s.msg!, id: msgId }],
        }))
      }

      // Update conversation rows
      setRows(prev => {
        if (s.action === 'in') {
          const base = BASE.find(b => b.key === s.key)!
          const existing = prev.find(r => r.key === s.key)
          const newRow: ConvRow = {
            ...base,
            id: nextId.current++,
            unread: true,
            status: existing?.status === 'resolved' ? 'waiting' : (existing?.status ?? 'waiting'),
            agent: existing?.agent,
            tag: existing?.tag,
            tagColor: existing?.tagColor,
          }
          return [newRow, ...prev.filter(r => r.key !== s.key)]
        }

        const idx = prev.findIndex(r => r.key === s.key)
        if (idx < 0) return prev
        const next = [...prev]
        const row = { ...next[idx] }

        switch (s.action) {
          case 'ai-typing':  row.ai = 'typing';  break
          case 'ai-done':    row.ai = 'done';    break
          case 'ai-suggest': row.ai = 'suggest'; break
          case 'assign':
            row.agent = s.agent
            row.ai = undefined
            row.status = 'progress'
            break
          case 'tag':
            row.tag = s.tag
            row.tagColor = s.tagColor
            break
          case 'close':
            row.closed = true
            row.status = 'resolved'
            row.ai = undefined
            break
          case 'note':
            break
        }

        next[idx] = row
        if (s.action === 'assign') return [next[idx], ...next.filter((_, i) => i !== idx)]
        return next
      })

      // Side effects outside setRows
      if (s.action === 'in') {
        setSelectedKey(s.key)
        setBadge(prev => prev + 1)
      }
      if (s.action === 'close') {
        setBadge(prev => Math.max(0, prev - 1))
      }

      setActivity(s.act)

      // Schedule next step with its own delay
      const nextStep = SCRIPT[step.current % SCRIPT.length]
      timerRef.current = setTimeout(runStep, nextStep.delay)
    }

    timerRef.current = setTimeout(runStep, SCRIPT[0].delay)
    return () => { if (timerRef.current != null) clearTimeout(timerRef.current) }
  }, [reduce])

  const selectedRow = rows.find(r => r.key === selectedKey)
  const selectedMsgs = convMsgs[selectedKey] ?? []

  return (
    <div className={styles.scene} aria-hidden="true">

      {/* ═══ SIDEBAR ══════════════════════════════════════════════ */}
      <aside className={styles.sb}>
        <div className={styles.sbHead}>
          <div className={styles.workspace}>
            <span className={styles.wsLogo}>
              <svg viewBox="0 0 20 20" width="13" height="13">
                <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="10" cy="10" r="3.5" fill="currentColor" />
              </svg>
            </span>
            <span className={styles.wsName}>{inboxTitle}</span>
            <svg viewBox="0 0 10 10" width="9" height="9" className={styles.wsArrow}>
              <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className={styles.sbSearch}>
            <svg viewBox="0 0 16 16" width="12" height="12">
              <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.4" fill="none" />
              <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span>Pesquisar...</span>
          </div>
        </div>

        <nav className={styles.sbNav}>
          <div className={styles.sbItem}>
            <SbIcon name="inbox" />
            <span>Caixa de Entrada</span>
            <motion.span
              className={styles.sbBadge}
              key={badge}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.18 }}
            >
              {badge}
            </motion.span>
          </div>

          <div className={`${styles.sbItem} ${styles.sbItemActive}`}>
            <SbIcon name="chat" />
            <span>Conversas</span>
            <svg viewBox="0 0 10 10" width="8" height="8" style={{ marginLeft: 'auto', opacity: 0.55 }}>
              <path d="M2 7l3-3 3 3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className={`${styles.sbSub} ${styles.sbSubActive}`}>Todas as conversas</div>
          <div className={styles.sbSub}>Não atendidas</div>
          <div className={styles.sbSub}>Menções</div>

          <div className={styles.sbSection}>Times</div>
          <div className={styles.sbSub}>suporte</div>
          <div className={styles.sbSub}>vendas</div>
          <div className={styles.sbSub}>financeiro</div>

          <div className={styles.sbSection}>Canais</div>
          <div className={styles.sbSub}>
            <ChannelGlyph channel="whatsapp" size={11} />WhatsApp Business
          </div>
          <div className={styles.sbSub}>
            <ChannelGlyph channel="instagram" size={11} />Instagram
          </div>
          <div className={styles.sbSub}>
            <ChannelGlyph channel="webchat" size={11} />Chat do Site
          </div>

          <div className={styles.sbSection}>Etiquetas</div>
          {([
            ['#f59e0b', 'orçamento'],
            ['#ef4444', 'urgente'],
            ['#8b5cf6', 'renovação'],
            ['#0891b2', 'vip'],
            ['#10b981', 'agendamento'],
          ] as const).map(([c, l]) => (
            <div key={l} className={styles.sbSub}>
              <i className={styles.sbLabelDot} style={{ '--lc': c } as CSSProperties} />
              {l}
            </div>
          ))}

          <div className={styles.sbItem}><SbIcon name="robot" /><span>Capitão</span></div>
          <div className={styles.sbItem}><SbIcon name="person" /><span>Contatos</span></div>
          <div className={styles.sbItem}><SbIcon name="chart" /><span>Relatórios</span></div>
          <div className={styles.sbItem}><SbIcon name="megaphone" /><span>Campanhas</span></div>
          <div className={styles.sbItem}><SbIcon name="help" /><span>Central de Ajuda</span></div>
          <div className={styles.sbItem}><SbIcon name="config" /><span>Configurações</span></div>
        </nav>

        <div className={styles.sbUser}>
          <div className={styles.sbUserAv} style={{ '--av-c': '#059669' } as CSSProperties}>YS</div>
          <div className={styles.sbUserInfo}>
            <span className={styles.sbUserName}>Yasmin S.</span>
            <span className={styles.sbUserEmail}>yasmin@headers.com</span>
          </div>
          <span className={styles.sbUserDot} />
        </div>
      </aside>

      {/* ═══ CONVERSATION LIST ════════════════════════════════════ */}
      <div className={styles.list}>
        <div className={styles.listHead}>
          <span className={styles.listTitle}>Conversas</span>
          <span className={styles.listCount}>{rows.length + 200}</span>
          <span className={styles.listLive}>
            <i className={styles.listLiveDot} />
            Em tempo real
          </span>
        </div>
        <div className={styles.listBody}>
          <AnimatePresence>
            {rows.map(row => (
              <motion.div
                layout={!reduce}
                key={row.key}
                className={[
                  styles.listRow,
                  row.key === selectedKey && styles.listRowActive,
                  row.unread && styles.listRowUnread,
                  row.closed && styles.listRowClosed,
                ].filter(Boolean).join(' ')}
                transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                onClick={() => setSelectedKey(row.key)}
              >
                {row.unread && <i className={styles.listUnreadDot} />}
                <div className={styles.listAv} style={{ '--av-c': avColor(row.name) } as CSSProperties}>
                  {row.name[0]}
                  <span className={styles.listAvCh}>
                    <ChannelGlyph channel={row.channel} size={9} />
                  </span>
                </div>
                <div className={styles.listInfo}>
                  <div className={styles.listTop}>
                    <span className={styles.listName}>{row.name}</span>
                    <span className={styles.listTime}>{row.time}</span>
                  </div>
                  {row.ai === 'typing' ? (
                    <div className={styles.listPreview}>
                      <span className={styles.listTyping}>
                        <i /><i /><i /> Captain IA
                      </span>
                    </div>
                  ) : (
                    <div className={styles.listPreview}>{row.text}</div>
                  )}
                  {(row.agent || row.tag) && (
                    <div className={styles.listMeta}>
                      {row.agent && (
                        <span
                          className={styles.listAgent}
                          style={{ '--av-c': AGENT_COLORS[row.agent] ?? '#6b7280' } as CSSProperties}
                          title={AGENT_NAMES[row.agent]}
                        >
                          {row.agent}
                        </span>
                      )}
                      {row.tag && (
                        <span
                          className={styles.listTag}
                          style={{ '--tc': row.tagColor ?? '#6b7280' } as CSSProperties}
                        >
                          {row.tag}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ CONVERSATION DETAIL ══════════════════════════════════ */}
      <div className={styles.detail}>
        {/* Tab bar */}
        <div className={styles.detailTabs}>
          <span className={`${styles.detailTab} ${styles.detailTabActive}`}>
            {CONV_REF[selectedKey] ?? '#4521'} ×
          </span>
          <span className={styles.detailTab}>#4512 ×</span>
        </div>

        {/* Header */}
        <div className={styles.detailHead}>
          <svg viewBox="0 0 16 16" width="13" height="13" style={{ opacity: 0.35, flexShrink: 0 }}>
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <div className={styles.detailAv} style={{ '--av-c': avColor(selectedRow?.name ?? 'F') } as CSSProperties}>
            {selectedRow?.name?.[0] ?? 'F'}
            <span className={styles.detailAvCh}>
              {selectedRow && <ChannelGlyph channel={selectedRow.channel} size={8} />}
            </span>
          </div>
          <div className={styles.detailNameArea}>
            <span className={styles.detailName}>{selectedRow?.name ?? 'Fernanda'}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={selectedRow?.status}
                className={statusCls(selectedRow?.status)}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {statusLabel(selectedRow?.status)}
              </motion.span>
            </AnimatePresence>
          </div>
          {selectedRow?.agent && (
            <div
              className={styles.detailAgentAv}
              style={{ '--av-c': AGENT_COLORS[selectedRow.agent] ?? '#6b7280' } as CSSProperties}
              title={AGENT_NAMES[selectedRow.agent]}
            >
              {selectedRow.agent}
            </div>
          )}
          <button
            className={[
              styles.resolveBtn,
              selectedRow?.status === 'resolved' && styles.resolveBtnDone,
            ].filter(Boolean).join(' ')}
          >
            {selectedRow?.status === 'resolved' ? (
              <>Resolvida ✓</>
            ) : (
              <>
                Resolver
                <svg viewBox="0 0 12 12" width="9" height="9">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Message thread */}
        <div className={styles.detailBody} ref={bodyRef}>
          <div className={styles.actLine}>
            <i className={styles.actDot} />
            <AnimatePresence mode="wait">
              <motion.span
                key={activity}
                className={styles.actText}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {activity}
              </motion.span>
            </AnimatePresence>
          </div>

          <AnimatePresence initial={false}>
            {selectedMsgs.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                {msg.type === 'in' && (
                  <div className={styles.msgIn}>
                    <div className={styles.msgInAv} style={{ '--av-c': avColor(selectedRow?.name ?? 'F') } as CSSProperties}>
                      {selectedRow?.name?.[0] ?? 'F'}
                    </div>
                    <div className={styles.msgInBubble}>{msg.text}</div>
                  </div>
                )}
                {msg.type === 'bot' && (
                  <div className={styles.msgBot}>
                    <div className={styles.msgBotBubble}>
                      <span className={styles.msgBotLabel}>{msg.label ?? 'Captain · IA'}</span>
                      <p className={styles.msgBotText}>{msg.text}</p>
                    </div>
                  </div>
                )}
                {msg.type === 'agent' && (
                  <div className={styles.msgOut}>
                    <div className={styles.msgOutBubble}>
                      <span className={styles.msgOutLabel} style={{ color: msg.labelColor }}>
                        {msg.label}
                      </span>
                      <p className={styles.msgOutText}>{msg.text}</p>
                    </div>
                    <div className={styles.msgOutAv} style={{ '--av-c': msg.labelColor ?? '#6b7280' } as CSSProperties}>
                      {msg.label?.[0] ?? 'A'}
                    </div>
                  </div>
                )}
                {msg.type === 'note' && (
                  <div className={styles.msgNote}>
                    <div className={styles.msgNoteBubble}>
                      <span className={styles.msgNoteLabel}>🔒 {msg.label}</span>
                      <p className={styles.msgNoteText}>{msg.text}</p>
                    </div>
                  </div>
                )}
                {msg.type === 'event' && (
                  <div className={styles.msgEvent}>
                    <span>{msg.text}</span>
                    <span className={styles.msgEventTs}>{msg.ts}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {selectedRow?.ai === 'typing' && (
              <motion.div
                key="typing"
                className={styles.msgBot}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.22 }}
              >
                <div className={styles.msgBotBubble}>
                  <span className={styles.msgBotLabel}>Captain · IA</span>
                  <span className={styles.typingDots}><i /><i /><i /></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reply area */}
        <div className={styles.detailReply}>
          <div className={styles.replyTabs}>
            <span className={`${styles.replyTab} ${styles.replyTabActive}`}>Responder</span>
            <span className={styles.replyTab}>Mensagem Privada</span>
          </div>
          <div className={styles.replyInput}>
            Shift + enter para nova linha. Digite '/' para selecionar uma Resposta Pronta.
          </div>
          <div className={styles.replyBar}>
            <div className={styles.replyBtns}>
              {[...Array(5)].map((_, i) => <div key={i} className={styles.replyBtn} />)}
            </div>
            <button className={styles.sendBtn}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
