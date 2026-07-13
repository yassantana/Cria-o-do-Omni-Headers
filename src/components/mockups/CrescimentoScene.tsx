import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { ChannelGlyph, Icon, OmniMark } from '@components/icons'
import s from './CrescimentoScene.module.css'

type CH = 'whatsapp' | 'instagram' | 'telegram' | 'facebook' | 'webchat' | 'email'

interface ConvRow {
  key:        string
  name:       string
  channel:    CH
  preview:    string
  agent:      string
  agentColor: string
  ia:         boolean
  phase:      number
}

const ROWS: ConvRow[] = [
  // Phase 0 — só WhatsApp
  { key:'r0', name:'Mariana Sousa', channel:'whatsapp',  preview:'Olá! Quando chega meu pedido?', agent:'MA', agentColor:'#7C3AED', ia:false, phase:0 },
  { key:'r1', name:'Carlos V.',     channel:'whatsapp',  preview:'Boa tarde, preciso de ajuda',   agent:'CF', agentColor:'#F59E0B', ia:false, phase:0 },
  { key:'r2', name:'Ana Lima',      channel:'whatsapp',  preview:'Qual o prazo de entrega?',      agent:'MA', agentColor:'#7C3AED', ia:false, phase:0 },
  // Phase 1 — Captain IA entra
  { key:'r3', name:'Fernanda R.',   channel:'whatsapp',  preview:'Quero cancelar meu pedido',     agent:'',   agentColor:'',        ia:true,  phase:1 },
  { key:'r4', name:'Bruno M.',      channel:'whatsapp',  preview:'Produto chegou diferente',      agent:'',   agentColor:'',        ia:true,  phase:1 },
  // Phase 2 — novos canais
  { key:'r5', name:'Sofia R.',      channel:'instagram', preview:'Vi no story e quero comprar',   agent:'RS', agentColor:'#10B981', ia:false, phase:2 },
  { key:'r6', name:'Rafael M.',     channel:'telegram',  preview:'Têm disponibilidade hoje?',     agent:'LM', agentColor:'#0EA5E9', ia:false, phase:2 },
  { key:'r7', name:'Pedro H.',      channel:'facebook',  preview:'Como faço para pedir?',         agent:'PT', agentColor:'#EC4899', ia:false, phase:2 },
  // Phase 3 — operação plena
  { key:'r8', name:'Lúcia F.',      channel:'email',     preview:'Solicito orçamento para lote',  agent:'AD', agentColor:'#6366F1', ia:false, phase:3 },
  { key:'r9', name:'Gabriel N.',    channel:'webchat',   preview:'Quero conhecer os planos',      agent:'',   agentColor:'',        ia:true,  phase:3 },
]

const PHASE_CHANNELS: CH[][] = [
  ['whatsapp'],
  ['whatsapp'],
  ['whatsapp', 'instagram', 'telegram', 'facebook'],
  ['whatsapp', 'instagram', 'telegram', 'facebook', 'webchat', 'email'],
]

const METRICS = [
  { convs: 12,   ia: 0,  agents: 2, sla: 0  },
  { convs: 1240, ia: 12, agents: 4, sla: 91 },
  { convs: 3800, ia: 28, agents: 6, sla: 93 },
  { convs: 8420, ia: 42, agents: 9, sla: 94 },
]

const AG_COLORS = ['#7C3AED', '#F59E0B', '#10B981', '#0EA5E9', '#EC4899', '#6366F1', '#EF4444', '#14B8A6']
const AG_INITS  = ['MA', 'CF', 'RS', 'LM', 'PT', 'AD', 'JV', 'BF']

function FlipVal({ n, suffix = '', dim }: { n: number; suffix?: string; dim?: boolean }) {
  if (n === 0 && dim) return <span className={s.metDim}>—</span>
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={n}
        className={s.metNum}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'inline-block' }}
      >
        {n.toLocaleString('pt-BR')}{suffix}
      </motion.span>
    </AnimatePresence>
  )
}

/**
 * Cena 08 — A plataforma que cresce com você.
 * Mostra o inbox real do Omni Headers evoluindo fase a fase:
 * canais aparecem no sidebar, conversas crescem na lista,
 * KPIs sobem no painel de métricas.
 */
export function CrescimentoScene() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState(-1)

  useEffect(() => {
    if (!inView) return
    const timers = [
      setTimeout(() => setPhase(0), 500),
      setTimeout(() => setPhase(1), 2200),
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 5800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [inView])

  const cur      = phase >= 0 ? METRICS[phase] : null
  const rows     = ROWS.filter(r => r.phase <= phase)
  const channels = phase >= 0 ? PHASE_CHANNELS[phase] : []

  const spring = { type: 'spring' as const, stiffness: 420, damping: 22 }

  return (
    <div ref={ref} className={s.scene} aria-hidden="true">
      <div className={s.inbox}>

        {/* ════════ SIDEBAR ════════ */}
        <aside className={s.sb}>
          <OmniMark size={22} />
          <div className={s.sbSep} />

          {/* Navigation */}
          <span className={`${s.sbBtn} ${s.sbActive}`}>
            <Icon name="inbox" size={15} />
          </span>
          <span className={s.sbBtn}>
            <Icon name="barChart" size={15} />
          </span>

          <div className={s.sbSep} />

          {/* Channels — appear per phase */}
          <div className={s.sbChs}>
            <AnimatePresence>
              {channels.map(ch => (
                <motion.span
                  key={ch}
                  className={`${s.sbCh} ${ch === 'whatsapp' ? s.sbChWa : ''}`}
                  initial={reduce ? {} : { opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={spring}
                >
                  <ChannelGlyph channel={ch} size={13} />
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Agents — grow per phase, pushed to bottom */}
          <div className={s.sbAgts}>
            <AnimatePresence>
              {Array.from({ length: cur?.agents ?? 0 }).map((_, i) => (
                <motion.span
                  key={AG_INITS[i]}
                  className={s.sbAgt}
                  style={{ background: AG_COLORS[i] }}
                  initial={reduce ? {} : { opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...spring, delay: i * 0.04 }}
                >
                  {AG_INITS[i]}
                </motion.span>
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {phase >= 1 && (
                <motion.span
                  key="ia"
                  className={s.sbIa}
                  initial={reduce ? {} : { opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={spring}
                >
                  ✦
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* ════════ LIST ════════ */}
        <div className={s.lst}>
          <div className={s.lstHead}>
            <span className={s.lstTitle}>Caixa de entrada</span>
            <AnimatePresence mode="popLayout">
              {phase >= 0 && (
                <motion.span
                  key={`b${phase}`}
                  className={s.lstBadge}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {cur!.convs.toLocaleString('pt-BR')}/mês
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className={s.lstBody}>
            <AnimatePresence>
              {rows.map(row => (
                <motion.div
                  key={row.key}
                  className={s.lstRow}
                  layout
                  initial={reduce ? {} : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <span
                    className={s.lstAvt}
                    style={{ background: row.ia ? '#6d28d9' : (row.agentColor || '#ccc') }}
                  >
                    {row.ia ? '✦' : row.agent}
                    <span className={s.lstAvtCh}>
                      <ChannelGlyph channel={row.channel} size={9} />
                    </span>
                  </span>

                  <span className={s.lstInfo}>
                    <span className={s.lstName}>{row.name}</span>
                    <span className={s.lstPrev}>{row.preview}</span>
                  </span>

                  {row.ia ? (
                    <span className={s.lstIaBadge}>✦ IA</span>
                  ) : (
                    <span className={s.lstAgtBadge} style={{ color: row.agentColor }}>
                      {row.agent}
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {phase < 0 && <span className={s.lstEmpty}>—</span>}
          </div>
        </div>

        {/* ════════ DETAIL: metrics overview ════════ */}
        <div className={s.det}>
          <div className={s.detHead}>
            <span className={s.detTitle}>Visão geral · hoje</span>
            {phase >= 3 && (
              <motion.span
                className={s.detLive}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className={s.liveDot} /> ao vivo
              </motion.span>
            )}
          </div>

          {phase < 0 ? (
            <div className={s.detEmpty}>A operação ainda não começou</div>
          ) : (
            <>
              {/* 2 × 2 KPI grid */}
              <div className={s.metGrid}>
                <div className={s.met}>
                  <span className={s.metVal}><FlipVal n={cur!.convs} /></span>
                  <span className={s.metLabel}>conversas / mês</span>
                </div>
                <div className={s.met}>
                  <span className={s.metVal}><FlipVal n={cur!.ia} suffix="%" dim /></span>
                  <span className={s.metLabel}>resolvidas pela IA</span>
                </div>
                <div className={s.met}>
                  <span className={s.metVal}><FlipVal n={cur!.agents} /></span>
                  <span className={s.metLabel}>atendentes online</span>
                </div>
                <div className={s.met}>
                  <span className={s.metVal}><FlipVal n={cur!.sla} suffix="%" dim /></span>
                  <span className={s.metLabel}>SLA no prazo</span>
                </div>
              </div>

              {/* Active channels */}
              <div className={s.metChs}>
                <span className={s.metChsLabel}>Canais ativos</span>
                <div className={s.metChsRow}>
                  <AnimatePresence>
                    {channels.map(ch => (
                      <motion.span
                        key={ch}
                        className={s.metCh}
                        initial={reduce ? {} : { opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={spring}
                      >
                        <ChannelGlyph channel={ch} size={16} />
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {phase >= 3 && (
                <motion.div
                  className={s.metClosing}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  Sem recomeçar do zero —{' '}
                  <strong>a plataforma cresceu junto</strong>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
