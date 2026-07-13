import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import { ChannelGlyph } from '@components/icons'
import type { ChannelId } from '@app-types'
import styles from './RealidadeHojeScene.module.css'

/* ─── Avatar colors ──────────────────────────────────────────── */
const AV: Record<string, string> = {
  F: '#ef4444',
  C: '#0891b2',
  A: '#f59e0b',
  S: '#8b5cf6',
  R: '#3b82f6',
  B: '#6b7280',
}

/* ─── Types ──────────────────────────────────────────────────── */
interface ConvRow {
  key: string
  id: number
  initial: string
  name: string
  channel: ChannelId
  lastMsg: string
  waitLabel: string
  waitMinutes: number
  unread: boolean
}

interface Msg {
  id: string
  text: string
  ts: string
}

interface ScriptStep {
  key: string
  msg: Omit<Msg, 'id'>
  delay: number
}

/* ─── Static data ────────────────────────────────────────────── */
const INITIAL_ROWS: ConvRow[] = [
  { key:'a', id:0, initial:'F', name:'Fernanda Rocha', channel:'whatsapp',  lastMsg:'Meu pedido #89234 faz 5 dias e não chegou!!!',  waitLabel:'5h',  waitMinutes:300,  unread:true },
  { key:'b', id:1, initial:'C', name:'Carlos V.',      channel:'webchat',   lastMsg:'To esperando desde ontem, ninguém responde...', waitLabel:'22h', waitMinutes:1320, unread:true },
  { key:'c', id:2, initial:'A', name:'Ana Lima',       channel:'email',     lastMsg:'URGENTE — aguardando retorno há 5 horas',       waitLabel:'5h',  waitMinutes:305,  unread:true },
  { key:'d', id:3, initial:'S', name:'Sofia R.',       channel:'facebook',  lastMsg:'Quando vocês vão responder???',                 waitLabel:'4h',  waitMinutes:240,  unread:true },
  { key:'e', id:4, initial:'R', name:'Rafael M.',      channel:'instagram', lastMsg:'Fiz uma pergunta ontem e até agora nada...',    waitLabel:'3h',  waitMinutes:180,  unread:true },
  { key:'f', id:5, initial:'B', name:'Bruno Matos',    channel:'telegram',  lastMsg:'Já mandei 3 mensagens. Ninguém respondeu.',     waitLabel:'1h',  waitMinutes:65,   unread:true },
]

const BASE_MSGS: Msg[] = [
  { id:'f0', text:'Oi! Fiz um pedido semana passada (código #89234) e até agora não chegou. Pode verificar pra mim?', ts:'08:14' },
  { id:'f1', text:'Alguém pode me ajudar? Faz 5 dias que aguardo...', ts:'09:32' },
  { id:'f2', text:'Oi? Tem alguém aí?', ts:'11:45' },
]

// Messages keep arriving — no response ever follows
const SCRIPT: ScriptStep[] = [
  { key:'a', delay:2400, msg:{ text:'Preciso de uma posição até hoje. Se não me responderem vou cancelar o pedido.', ts:'13:20' } },
  { key:'b', delay:2000, msg:{ text:'Mais de 22 horas esperando... isso é completamente inaceitável', ts:'agora' } },
  { key:'c', delay:2800, msg:{ text:'URGENTE!!! Preciso de retorno AGORA por favor', ts:'agora' } },
  { key:'a', delay:3200, msg:{ text:'Vou fazer uma reclamação no Reclame Aqui 😡', ts:'14:55' } },
  { key:'d', delay:2200, msg:{ text:'Continuam me ignorando. Que empresa é essa?', ts:'agora' } },
  { key:'e', delay:2600, msg:{ text:'Já desisti, vou comprar em outro lugar mesmo', ts:'agora' } },
]

/* ─── Helpers ────────────────────────────────────────────────── */
function waitColor(minutes: number): string {
  if (minutes >= 300) return '#dc2626'
  if (minutes >= 120) return '#d97706'
  return '#b45309'
}

function SbIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    inbox: <path d="M3 5h14v9H3V5zm0 5.5h3l1.5 2h5l1.5-2H17" stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinejoin="round" />,
    chat:  <path d="M4 4h12v9.5H9L4 17V4z" stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinejoin="round" />,
    robot: <><rect x="5" y="5" width="10" height="9" rx="2" stroke="currentColor" strokeWidth="1.35" fill="none" /><path d="M7.5 9.5h1.5m3.5 0H11m-3 3h6M9.5 5V3h1v2" stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinecap="round" /></>,
    person: <><circle cx="10" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.35" fill="none" /><path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinecap="round" /></>,
    chart: <path d="M4 15h2V9H4v6zm4 0h2V6H8v9zm4 0h2v-5h-2v5z" stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinejoin="round" />,
    megaphone: <path d="M5 9h7l3-3v8l-3-3H5V9zm0 0l-1.5 5" stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
    config: <><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.35" fill="none" /><path d="M10 4v1.5m0 9V16M4 10H2.5m13 0H17M5.5 5.5l1 1m7 7 1 1M5.5 14.5l1-1m7-7 1-1" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></>,
    help: <><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.35" fill="none" /><path d="M8 8a2 2 0 1 1 2 2v2" stroke="currentColor" strokeWidth="1.35" fill="none" strokeLinecap="round" /><circle cx="10" cy="14.5" r="0.75" fill="currentColor" /></>,
  }
  return (
    <svg viewBox="0 0 20 20" width="15" height="15" style={{ flexShrink: 0 }}>
      {paths[name]}
    </svg>
  )
}

/* ─── Main component ─────────────────────────────────────────── */
export function RealidadeHojeScene() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  const [rows, setRows] = useState<ConvRow[]>(INITIAL_ROWS)
  const [convMsgs, setConvMsgs] = useState<Record<string, Msg[]>>({ a: BASE_MSGS })
  const [unanswered, setUnanswered] = useState(23)
  const [rowsVisible, setRowsVisible] = useState(0)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stepRef = useRef(0)
  const nextMsgId = useRef(50)
  const nextRowId = useRef(10)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Scroll detail to bottom on new messages
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [convMsgs])

  // Stagger row reveal when in view
  useEffect(() => {
    if (!isInView) return
    INITIAL_ROWS.forEach((_, i) => {
      setTimeout(() => setRowsVisible(v => Math.max(v, i + 1)), i * 100 + 80)
    })
  }, [isInView])

  // Chaos loop — messages arrive but no one responds
  useEffect(() => {
    if (!isInView) return
    if (reduce) { setRowsVisible(INITIAL_ROWS.length); return }

    function runStep() {
      const s = SCRIPT[stepRef.current % SCRIPT.length]
      stepRef.current++

      const id = `cm${nextMsgId.current++}`
      const msg: Msg = { id, ...s.msg }

      // Append message to thread
      setConvMsgs(prev => ({
        ...prev,
        [s.key]: [...(prev[s.key] ?? []), msg],
      }))

      // Move conversation to top of list + mark unread
      setRows(prev => {
        const conv = prev.find(r => r.key === s.key)
        if (!conv) return prev
        const updated: ConvRow = {
          ...conv,
          id: nextRowId.current++,
          lastMsg: s.msg.text.length > 44 ? s.msg.text.slice(0, 44) + '…' : s.msg.text,
          unread: true,
        }
        return [updated, ...prev.filter(r => r.key !== s.key)]
      })

      // Counter goes up — nobody is resolving anything
      setUnanswered(prev => prev + 1)

      const next = SCRIPT[stepRef.current % SCRIPT.length]
      timerRef.current = setTimeout(runStep, next.delay)
    }

    timerRef.current = setTimeout(runStep, SCRIPT[0].delay + 400)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [isInView, reduce])

  const fernandaMsgs = convMsgs['a'] ?? BASE_MSGS

  return (
    <div ref={ref} className={styles.scene} aria-hidden="true">

      {/* ═══ SIDEBAR ═════════════════════════════════════════════ */}
      <aside className={styles.sb}>
        <div className={styles.sbHead}>
          <div className={styles.workspace}>
            <span className={styles.wsLogo}>
              <svg viewBox="0 0 20 20" width="13" height="13">
                <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="10" cy="10" r="3.5" fill="currentColor" />
              </svg>
            </span>
            <span className={styles.wsName}>Minha Empresa</span>
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
              className={`${styles.sbBadge} ${styles.sbBadgeRed}`}
              key={unanswered}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.18 }}
            >
              {unanswered}
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
          <div className={styles.sbSub}><ChannelGlyph channel="whatsapp" size={11} />WhatsApp Business</div>
          <div className={styles.sbSub}><ChannelGlyph channel="instagram" size={11} />Instagram</div>
          <div className={styles.sbSub}><ChannelGlyph channel="webchat" size={11} />Chat do Site</div>

          <div className={styles.sbItem}><SbIcon name="robot" /><span>Capitão</span></div>
          <div className={styles.sbItem}><SbIcon name="person" /><span>Contatos</span></div>
          <div className={styles.sbItem}><SbIcon name="chart" /><span>Relatórios</span></div>
          <div className={styles.sbItem}><SbIcon name="megaphone" /><span>Campanhas</span></div>
          <div className={styles.sbItem}><SbIcon name="help" /><span>Central de Ajuda</span></div>
          <div className={styles.sbItem}><SbIcon name="config" /><span>Configurações</span></div>
        </nav>

        <div className={styles.sbUser}>
          <div className={styles.sbUserAv} style={{ '--av-c': '#6b7280' } as CSSProperties}>YS</div>
          <div className={styles.sbUserInfo}>
            <span className={styles.sbUserName}>Yasmin S.</span>
            <span className={styles.sbUserEmail}>yasmin@empresa.com</span>
          </div>
          <span className={styles.sbUserDotOff} />
        </div>
      </aside>

      {/* ═══ LIST ════════════════════════════════════════════════ */}
      <div className={styles.list}>
        <div className={styles.listHead}>
          <span className={styles.listTitle}>Conversas</span>
          <motion.span
            className={styles.listBadgeRed}
            key={unanswered}
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.18 }}
          >
            {unanswered} sem resposta
          </motion.span>
        </div>

        <div className={styles.listBody}>
          <AnimatePresence>
            {rows.slice(0, rowsVisible).map(row => (
              <motion.div
                layout={!reduce}
                key={row.id}
                className={[
                  styles.listRow,
                  row.key === 'a' && styles.listRowActive,
                  row.unread && styles.listRowUnread,
                  row.waitMinutes >= 240 && styles.listRowCrit,
                ].filter(Boolean).join(' ')}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              >
                <i className={styles.listUnreadDot} />
                <div className={styles.listAv} style={{ '--av-c': AV[row.initial] } as CSSProperties}>
                  {row.initial}
                  <span className={styles.listAvCh}>
                    <ChannelGlyph channel={row.channel} size={9} />
                  </span>
                </div>
                <div className={styles.listInfo}>
                  <div className={styles.listTop}>
                    <span className={styles.listName}>{row.name}</span>
                    <span
                      className={styles.listWait}
                      style={{ '--wc': waitColor(row.waitMinutes) } as CSSProperties}
                    >
                      {row.waitLabel}
                    </span>
                  </div>
                  <div className={styles.listPreview}>{row.lastMsg}</div>
                  <div className={styles.listMeta}>
                    <span className={styles.noAgentBadge}>sem atendente</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ DETAIL — Fernanda Rocha ═════════════════════════════ */}
      <div className={styles.detail}>
        {/* Tab bar */}
        <div className={styles.detailTabs}>
          <span className={`${styles.detailTab} ${styles.detailTabActive}`}>#4518 ×</span>
          <span className={styles.detailTab}>#4512 ×</span>
        </div>

        {/* Header */}
        <div className={styles.detailHead}>
          <svg viewBox="0 0 16 16" width="13" height="13" style={{ opacity: 0.35, flexShrink: 0 }}>
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <div className={styles.detailAv} style={{ '--av-c': AV.F } as CSSProperties}>
            F
            <span className={styles.detailAvCh}>
              <ChannelGlyph channel="whatsapp" size={8} />
            </span>
          </div>
          <div className={styles.detailNameArea}>
            <span className={styles.detailName}>Fernanda Rocha</span>
            <span className={`${styles.detailChip} ${styles.chipChaos}`}>5h sem resposta</span>
          </div>
          <span className={styles.noAgentTag}>sem atendente</span>
          <button className={styles.assignBtn}>
            Atribuir
            <svg viewBox="0 0 12 12" width="9" height="9">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Message thread */}
        <div className={styles.detailBody} ref={bodyRef}>
          {/* Opening event — chaos state indicator */}
          <div className={styles.actLine}>
            <i className={styles.actDotRed} />
            <span className={styles.actText}>Aguardando atendimento · 0 atendentes disponíveis · 08:14</span>
          </div>

          <AnimatePresence initial={false}>
            {fernandaMsgs.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.msgIn}>
                  <div className={styles.msgInAv} style={{ '--av-c': AV.F } as CSSProperties}>F</div>
                  <div className={styles.msgInBubble}>
                    {msg.text}
                    <span className={styles.msgTs}>{msg.ts}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* No response — persistent indicator at end of thread */}
          <div className={styles.msgEvent}>
            <span>Nenhuma resposta enviada</span>
          </div>
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
