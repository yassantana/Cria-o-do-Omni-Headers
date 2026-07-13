import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { ChannelGlyph, Icon, OmniMark } from '@components/icons'
import { useTypewriter } from '@hooks'
import s from './AtendimentoColaborativoScene.module.css'

const SUGGESTIONS = [
  'Perfeito, Mariana! Já deixei reservado às 15h. Te espero 😊',
  'Prontinho! Confirmado amanhã às 15h. Qualquer coisa, é só chamar.',
]

/**
 * Cena 02 — Atendimento colaborativo dentro do Omni Headers.
 * Mostra: nota interna (só a equipe vê) + sugestão do Captain IA
 * aparecendo no composer — colaboração real, sem sair da plataforma.
 */
export function AtendimentoColaborativoScene() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)

  const typed = useTypewriter(SUGGESTIONS, { disabled: !!reduce || step < 4 })

  useEffect(() => {
    if (!inView) return
    if (reduce) { setStep(4); return }
    const t = [
      setTimeout(() => setStep(1), 400),   // mensagem do cliente
      setTimeout(() => setStep(2), 1900),  // nota interna
      setTimeout(() => setStep(3), 3500),  // resposta do agente
      setTimeout(() => setStep(4), 5200),  // sugestão da IA
    ]
    return () => t.forEach(clearTimeout)
  }, [inView, reduce])

  const msg = (delay = 0) =>
    reduce ? {} : ({
      initial:    { opacity: 0, y: 8 },
      animate:    { opacity: 1, y: 0 },
      transition: { duration: 0.28, delay, ease: [0.16, 1, 0.3, 1] as const },
    })

  return (
    <div ref={ref} className={s.scene} aria-hidden="true">

      {/* ════════ SIDEBAR ════════ */}
      <aside className={s.sb}>
        <OmniMark size={22} />
        <div className={s.sbSep} />
        <span className={`${s.sbBtn} ${s.sbActive}`}><Icon name="inbox" size={15} /></span>
        <span className={s.sbBtn}><Icon name="barChart" size={15} /></span>
        <span className={s.sbBtn}><Icon name="users" size={15} /></span>
        <span className={s.sbBtn}><Icon name="gear" size={15} /></span>
        <div className={s.sbFoot}>
          <span className={s.sbUser} style={{ background: '#10b981' }}>A</span>
        </div>
      </aside>

      {/* ════════ LIST ════════ */}
      <div className={s.lst}>
        <div className={s.lstHead}>
          <span className={s.lstTitle}>Conversas</span>
          <span className={s.lstCount}>3</span>
        </div>
        <div className={s.lstBody}>

          {/* Ativa — Mariana */}
          <div className={`${s.lstRow} ${s.lstActive}`}>
            <div className={s.lstAvt} style={{ background: '#7c3aed' }}>
              M
              <span className={s.lstAvtCh}><ChannelGlyph channel="whatsapp" size={9} /></span>
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Mariana Lopes</span>
              <span className={s.lstPrev}>Queria remarcar meu horário...</span>
            </div>
            <div className={s.lstMeta}>
              <span className={s.lstTime}>09:41</span>
              <span className={s.lstAgent} style={{ color: '#10b981' }}>Ana</span>
            </div>
          </div>

          <div className={s.lstRow}>
            <div className={s.lstAvt} style={{ background: '#f59e0b' }}>
              C
              <span className={s.lstAvtCh}><ChannelGlyph channel="instagram" size={9} /></span>
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Carlos Oliveira</span>
              <span className={s.lstPrev}>Boa tarde, preciso de ajuda</span>
            </div>
            <div className={s.lstMeta}><span className={s.lstTime}>09:38</span></div>
          </div>

          <div className={s.lstRow}>
            <div className={s.lstAvt} style={{ background: '#0ea5e9' }}>
              F
              <span className={s.lstAvtCh}><ChannelGlyph channel="whatsapp" size={9} /></span>
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Fernanda R.</span>
              <span className={s.lstPrev}>Quero cancelar meu pedido</span>
            </div>
            <div className={s.lstMeta}><span className={s.lstTime}>09:35</span></div>
          </div>

        </div>
      </div>

      {/* ════════ DETAIL ════════ */}
      <div className={s.det}>

        {/* Header */}
        <div className={s.detHead}>
          <div className={s.detAvt} style={{ background: '#7c3aed' }}>
            M
            <span className={s.detAvtCh}><ChannelGlyph channel="whatsapp" size={10} /></span>
          </div>
          <div className={s.detInfo}>
            <span className={s.detName}>Mariana Lopes</span>
            <span className={s.detSub}>WhatsApp · cliente VIP desde 2023</span>
          </div>
          <span className={s.detChip}>em andamento</span>
          <span className={s.detResolve}>Resolver</span>
        </div>

        {/* Thread */}
        <div className={s.detBody}>
          <AnimatePresence>

            {step >= 1 && (
              <motion.div key="msg-in" className={`${s.msg} ${s.msgIn}`} {...msg()}>
                <div className={s.msgBbl}>
                  Oi! Queria remarcar meu horário de amanhã.
                </div>
                <span className={s.msgTs}>09:41</span>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div key="note" className={s.note} {...msg()}>
                <span className={s.noteTag}>
                  <Icon name="users" size={10} /> Nota interna · só a equipe vê
                </span>
                <span className={s.noteText}>
                  <b>Ana → Rafa:</b> cliente VIP, pode encaixar às 15h 🙏
                </span>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div key="msg-out" className={`${s.msg} ${s.msgOut}`} {...msg()}>
                <span className={s.msgOutLabel} style={{ color: '#10b981' }}>Ana Costa</span>
                <div className={s.msgBbl}>
                  Claro, Mariana! Consigo te encaixar amanhã às 15h. Confirmo?
                </div>
                <span className={s.msgTs}>09:42</span>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer com sugestão da IA */}
        <div className={s.detFoot}>
          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                key="ia-suggest"
                className={s.iaSuggest}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={s.iaLabel}>
                  <Icon name="sparkles" size={11} /> Captain sugeriu
                </span>
                <p className={s.iaText}>
                  {typed}
                  {!reduce && <span className={s.iaCaret} />}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={s.footActions}>
            <span className={s.footInput}>Escrever resposta…</span>
            {step >= 4 && (
              <motion.span
                className={s.footInsert}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Icon name="check" size={13} /> Inserir
              </motion.span>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
