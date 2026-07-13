import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import s from './TransformacaoScene.module.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type Ch = 'whatsapp' | 'instagram' | 'email'

const CH_META: Record<Ch, { label: string; color: string }> = {
  whatsapp:  { label: 'WA', color: '#25D366' },
  instagram: { label: 'IG', color: '#E1306C' },
  email:     { label: 'EM', color: '#6B7280' },
}

interface ConvDef {
  id: string
  name: string
  topic: string
  channel: Ch
  chaosLabel: string
  severity: 'crit' | 'warn'
  agentInitials?: string
  agentColor?: string
  isIA?: boolean
  activeLabel: string
  resolvedLabel: string
  resolvedIsIA?: boolean
  resolvedIsActive?: boolean
  highlight?: boolean
}

// ─── Static data ──────────────────────────────────────────────────────────────

const CONVS: ConvDef[] = [
  {
    id: 'c1',
    name: 'Ana Silva',
    topic: 'Prazo de entrega',
    channel: 'whatsapp',
    chaosLabel: '2 dias sem resposta',
    severity: 'crit',
    agentInitials: 'MA',
    agentColor: '#7C3AED',
    activeLabel: 'Mariana A. está digitando...',
    resolvedLabel: 'respondida há 2 min',
    highlight: true,
  },
  {
    id: 'c2',
    name: 'Carlos M.',
    topic: 'Preço do produto',
    channel: 'instagram',
    chaosLabel: 'aguardando há 4h',
    severity: 'warn',
    isIA: true,
    activeLabel: 'Captain IA respondendo...',
    resolvedLabel: 'Captain IA · resolvida em 45s',
    resolvedIsIA: true,
  },
  {
    id: 'c3',
    name: 'Pedro Souza',
    topic: 'Solicitação de orçamento',
    channel: 'email',
    chaosLabel: 'nunca respondido',
    severity: 'crit',
    agentInitials: 'CF',
    agentColor: '#F59E0B',
    activeLabel: 'Carlos F. · em andamento',
    resolvedLabel: 'em andamento',
    resolvedIsActive: true,
  },
  {
    id: 'c4',
    name: 'Luciana B.',
    topic: 'Problema na entrega',
    channel: 'whatsapp',
    chaosLabel: 'atendente ocupada',
    severity: 'warn',
    agentInitials: 'RS',
    agentColor: '#10B981',
    activeLabel: 'Rafaela S. está digitando...',
    resolvedLabel: 'respondida ✓',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function AgentMini({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className={s.agentMini}
      style={{ '--av': color } as React.CSSProperties}
    >
      {initials}
    </span>
  )
}

function ConvRow({ conv, phase }: { conv: ConvDef; phase: number }) {
  const showChaos    = phase === 0
  const showWaiting  = phase === 1
  const showActive   = phase === 2
  const showResolved = phase >= 3

  const isResolvedIA     = showResolved && !!conv.resolvedIsIA
  const isResolvedActive = showResolved && !!conv.resolvedIsActive
  const isResolvedGreen  = showResolved && !conv.resolvedIsIA && !conv.resolvedIsActive

  const rowClass = [
    s.convRow,
    showChaos && conv.severity === 'crit' ? s.rowCrit : '',
    showChaos && conv.severity === 'warn' ? s.rowWarn : '',
    isResolvedGreen && conv.highlight    ? s.rowHighlight   : '',
    isResolvedGreen && !conv.highlight   ? s.rowResolved    : '',
    isResolvedIA                         ? s.rowResolvedIA  : '',
    isResolvedActive                     ? s.rowActive      : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rowClass}>
      {/* Canal — surge na fase 1 */}
      <div className={s.chSlot}>
        <AnimatePresence>
          {phase >= 1 && (
            <motion.span
              key="ch"
              className={s.chBadge}
              style={{ '--ch': CH_META[conv.channel].color } as React.CSSProperties}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            >
              {CH_META[conv.channel].label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className={s.convInfo}>
        <span className={s.convName}>{conv.name}</span>
        <span className={s.convTopic}>{conv.topic}</span>
      </div>

      {/* Status — transiciona com AnimatePresence */}
      <div className={s.statusSlot}>
        <AnimatePresence mode="wait">
          {showChaos && (
            <motion.span
              key="chaos"
              className={`${s.chip} ${conv.severity === 'crit' ? s.chipCrit : s.chipWarn}`}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              ⚠ {conv.chaosLabel}
            </motion.span>
          )}

          {showWaiting && (
            <motion.span
              key="wait"
              className={`${s.chip} ${s.chipNeutral}`}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              aguardando atribuição
            </motion.span>
          )}

          {showActive && (
            <motion.span
              key="active"
              className={`${s.chip} ${conv.isIA ? s.chipIA : s.chipBlue}`}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              {conv.isIA ? (
                <><i className={s.iaDot} /> {conv.activeLabel}</>
              ) : (
                <>{conv.agentInitials && <AgentMini initials={conv.agentInitials} color={conv.agentColor!} />} {conv.activeLabel}</>
              )}
            </motion.span>
          )}

          {showResolved && (
            <motion.span
              key="resolved"
              className={`${s.chip} ${
                isResolvedIA                              ? s.chipIA        :
                isResolvedActive                         ? s.chipBlue      :
                isResolvedGreen && conv.highlight        ? s.chipHighlight :
                                                           s.chipGreen
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {isResolvedIA && (
                <><i className={s.iaDot} /> {conv.resolvedLabel}</>
              )}
              {isResolvedActive && conv.agentInitials && (
                <><AgentMini initials={conv.agentInitials} color={conv.agentColor!} /> {conv.resolvedLabel}</>
              )}
              {isResolvedGreen && (
                <>✓ {conv.resolvedLabel}</>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

/**
 * Cena 09 — A culminacao da narrativa.
 * Mostra a transformacao real da operacao: conversas em caos sendo respondidas,
 * atendentes atribuidos, IA resolvendo, gestor informado. O visitante ve a
 * empresa dele ficando organizada diante dos olhos.
 */
export function TransformacaoScene() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [phase, setPhase] = useState(-1)

  useEffect(() => {
    if (!inView) return
    const t = [
      setTimeout(() => setPhase(0), 400),   // estado caos
      setTimeout(() => setPhase(1), 2200),  // centralizacao
      setTimeout(() => setPhase(2), 3800),  // atribuicao
      setTimeout(() => setPhase(3), 5400),  // resolucao
      setTimeout(() => setPhase(4), 7200),  // visibilidade total
    ]
    return () => t.forEach(clearTimeout)
  }, [inView])

  return (
    <div ref={ref} className={s.scene}>
      <motion.div
        className={s.panel}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* ── Barra de status ── */}
        <div className={s.statusBar}>
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div key="s0" className={s.statusRow}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className={`${s.dot} ${s.dotRed}`} />
                <span className={s.statusText}>47 mensagens não lidas</span>
                <span className={`${s.badge} ${s.badgeRed}`}>sem controle</span>
              </motion.div>
            )}

            {phase === 1 && (
              <motion.div key="s1" className={s.statusRow}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className={`${s.dot} ${s.dotBlue}`} />
                <span className={s.statusText}>Canais centralizados · 8 conversas ativas</span>
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div key="s2" className={s.statusRow}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className={`${s.dot} ${s.dotBlue}`} />
                <span className={s.statusText}>Equipe atribuída</span>
                <div className={s.statusAgents}>
                  <AgentMini initials="MA" color="#7C3AED" />
                  <AgentMini initials="CF" color="#F59E0B" />
                  <AgentMini initials="RS" color="#10B981" />
                  <span className={s.iaSmall}>✦</span>
                </div>
              </motion.div>
            )}

            {phase >= 3 && (
              <motion.div key="s3" className={s.statusRow}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className={`${s.dot} ${s.dotGreen}`} />
                <span className={s.statusText}>12 conversas hoje</span>
                <span className={`${s.badge} ${s.badgeGreen}`}>SLA 94%</span>
                <span className={`${s.badge} ${s.badgeIris}`}>4 pela IA</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Lista de conversas ── */}
        <div className={s.convList}>
          {phase >= 0 && CONVS.map((conv, i) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <ConvRow conv={conv} phase={phase} />
            </motion.div>
          ))}
        </div>

        {/* ── Barra de KPIs — estado final ── */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              className={s.kpiBar}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className={s.kpiItem}>
                <span className={s.kpiVal}>8.420</span>
                <span className={s.kpiLabel}>conversas/mês</span>
              </div>
              <div className={s.kpiSep} />
              <div className={s.kpiItem}>
                <span className={s.kpiVal}>42%</span>
                <span className={s.kpiLabel}>resolvidas pela IA</span>
              </div>
              <div className={s.kpiSep} />
              <div className={s.kpiItem}>
                <span className={s.kpiVal}>94%</span>
                <span className={s.kpiLabel}>SLA no prazo</span>
              </div>
              <div className={s.kpiSep} />
              <div className={s.kpiItem}>
                <span className={s.kpiVal}>1m 12s</span>
                <span className={s.kpiLabel}>tempo médio</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Linha de fechamento ── */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.p
            className={s.closing}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            Sem adivinhação. Sem esquecimento. <strong>Sem cliente perdido.</strong>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
