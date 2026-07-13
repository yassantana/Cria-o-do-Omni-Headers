import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'

import { ChannelGlyph, Icon, OmniMark } from '@components/icons'
import s from './IntegracoesScene.module.css'

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

const SYSTEMS = [
  { label: 'ERP',        fireAt: 2, color: '#6d28d9' },
  { label: 'CRM',        fireAt: 3, color: '#10B981' },
  { label: 'Financeiro', fireAt: 4, color: '#F59E0B' },
  { label: 'Histórico',  fireAt: 5, color: '#0EA5E9' },
  { label: 'Agenda',     fireAt: -1, color: null },
  { label: 'E-mail',     fireAt: -1, color: null },
]

const DATA = [
  {
    sys: 'ERP', color: '#6d28d9',
    title: 'Pedido #4521',
    sub: 'R$ 847 · Em transporte · Previsão amanhã',
    step: 2,
  },
  {
    sys: 'CRM', color: '#10B981',
    title: 'Ricardo Costa · VIP',
    sub: 'Cliente desde 2021 · 12 atend. · ★ 4.9',
    step: 3,
  },
  {
    sys: 'Financeiro', color: '#F59E0B',
    title: 'Adimplente',
    sub: 'Limite aprovado: R$ 5.000',
    step: 4,
  },
  {
    sys: 'Histórico', color: '#0EA5E9',
    title: '12 atendimentos',
    sub: 'Último há 3 dias · sempre resolvido',
    step: 5,
  },
]

/**
 * Cena de integracoes. Responde "Vou precisar trocar meus sistemas?".
 * Mostra: cliente envia mensagem -> Omni consulta ERP, CRM, Financeiro,
 * Historico em paralelo -> entrega contexto completo ao atendente.
 */
export function IntegracoesScene() {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [step, setStep] = useState<Step>(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) { setStep(7); return }
    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setStep(1), 400))
    t.push(setTimeout(() => setStep(2), 900))
    t.push(setTimeout(() => setStep(3), 1400))
    t.push(setTimeout(() => setStep(4), 1900))
    t.push(setTimeout(() => setStep(5), 2400))
    t.push(setTimeout(() => setStep(6), 3000))
    t.push(setTimeout(() => setStep(7), 3600))
    return () => t.forEach(clearTimeout)
  }, [inView, reduced])

  return (
    <div ref={ref} className={s.scene} aria-hidden="true">

      {/* ════════ SIDEBAR ════════ */}
      <aside className={s.sb}>
        <OmniMark size={22} />
        <div className={s.sbSep} />
        <span className={`${s.sbBtn} ${s.sbActive}`}><Icon name="inbox" size={15} /></span>
        <span className={s.sbBtn}><Icon name="barChart" size={15} /></span>
        <span className={s.sbBtn}><Icon name="gear" size={15} /></span>
      </aside>

      {/* ════════ LIST ════════ */}
      <div className={s.lst}>
        <div className={s.lstHead}>
          <span className={s.lstTitle}>Conversas</span>
        </div>
        <div className={s.lstBody}>

          {/* Ricardo Costa — ativo */}
          <div className={`${s.lstRow} ${s.lstActive}`}>
            <div className={s.lstAvt} style={{ background: '#0ea5e9' }}>
              R
              <span className={s.lstAvtCh}><ChannelGlyph channel="whatsapp" size={9} /></span>
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Ricardo Costa</span>
              <span className={s.lstPrev}>Dúvida sobre meu pedido...</span>
            </div>
          </div>

          <div className={s.lstRow}>
            <div className={s.lstAvt} style={{ background: '#7c3aed' }}>
              M
              <span className={s.lstAvtCh}><ChannelGlyph channel="instagram" size={9} /></span>
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Mariana A.</span>
              <span className={s.lstPrev}>Vi o anúncio e quero...</span>
            </div>
          </div>

          <div className={s.lstRow}>
            <div className={s.lstAvt} style={{ background: '#f59e0b' }}>
              C
              <span className={s.lstAvtCh}><ChannelGlyph channel="whatsapp" size={9} /></span>
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Carlos B.</span>
              <span className={s.lstPrev}>Boa tarde, tenho uma...</span>
            </div>
          </div>

        </div>
      </div>

      {/* ════════ DETAIL (chat + context side by side) ════════ */}
      <div className={s.det}>

        {/* Chat panel */}
        <div className={s.chat}>
          <div className={s.chatHead}>
            <i className={s.waDot} />
            <span className={s.chatTitle}>WhatsApp · Ricardo C.</span>
          </div>

          <div className={s.chatBody}>
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  key="client"
                  className={`${s.bbl} ${s.bblIn}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  Oi, tenho uma dúvida sobre o meu último pedido
                </motion.div>
              )}

              {step >= 1 && step < 6 && (
                <motion.div
                  key="loading"
                  className={s.loadingRow}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <i /><i /><i />
                  <span>Omni buscando contexto…</span>
                </motion.div>
              )}

              {step >= 7 && (
                <motion.div
                  key="agent"
                  className={`${s.bbl} ${s.bblOut}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  Oi, Ricardo! O pedido #4521 está em transporte e chega amanhã. Quer que eu verifique mais alguma coisa? 😊
                  <span className={s.bblTag}>respondido com contexto completo</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Context panel */}
        <div className={s.context}>
          <div className={s.ctxHead}>
            <div className={s.ctxLeft}>
              <span className={s.ctxTitle}>Contexto · carregado automaticamente</span>
              <span className={s.ctxSub}>Omni consultou seus sistemas</span>
            </div>
            <span className={s.hubBadge}>Omni Hub</span>
          </div>

          {/* Integration badges */}
          <div className={s.badges}>
            {SYSTEMS.map((sys) => {
              const fired = sys.fireAt > 0 && step >= sys.fireAt
              return (
                <span
                  key={sys.label}
                  className={`${s.badge} ${fired ? s.badgeFired : ''}`}
                  style={fired && sys.color ? { '--badge-color': sys.color } as React.CSSProperties : undefined}
                >
                  {sys.label}
                </span>
              )
            })}
            <span className={s.badgeMore}>+8 mais</span>
          </div>

          {/* Data cards */}
          <div className={s.cards}>
            <AnimatePresence>
              {DATA.map((d) =>
                step >= d.step ? (
                  <motion.div
                    key={d.sys}
                    className={s.card}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22 }}
                    layout
                  >
                    <span
                      className={s.cardSys}
                      style={{ color: d.color, borderColor: `${d.color}30` }}
                    >
                      {d.sys}
                    </span>
                    <div className={s.cardBody}>
                      <span className={s.cardTitle}>{d.title}</span>
                      <span className={s.cardSub}>{d.sub}</span>
                    </div>
                    <motion.div
                      className={s.cardPulse}
                      style={{ background: d.color }}
                      initial={{ scale: 1.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 0.55 }}
                    />
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>

          {/* Contexto completo */}
          <AnimatePresence>
            {step >= 6 && (
              <motion.div
                className={s.complete}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className={s.completeCheck}>✓</span>
                <span>Contexto completo · atendente pronto para responder</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className={s.ctxFooter}>
            12 sistemas conectados · <strong>nenhum foi substituído</strong>
            <span className={s.techLine}>API REST · Webhooks · LGPD · Dados no Brasil</span>
          </div>
        </div>

      </div>
    </div>
  )
}
