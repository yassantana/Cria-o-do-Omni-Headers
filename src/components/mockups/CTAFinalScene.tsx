import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'

import { ChannelGlyph, Icon, OmniMark } from '@components/icons'
import { ROUTES, whatsappLink } from '@constants'
import s from './CTAFinalScene.module.css'

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

const WA_MSG = 'Olá! Gostaria de tirar algumas dúvidas sobre o Omni Headers.'

export function CTAFinalScene() {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [step, setStep] = useState<Step>(0)

  const now = useMemo(
    () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    []
  )

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setStep(7)
      return
    }
    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setStep(1), 600))
    t.push(setTimeout(() => setStep(2), 1500))
    t.push(setTimeout(() => setStep(3), 2500))
    t.push(setTimeout(() => setStep(4), 3700))
    t.push(setTimeout(() => setStep(5), 4700))
    t.push(setTimeout(() => setStep(6), 6200))
    t.push(setTimeout(() => setStep(7), 7600))
    return () => t.forEach(clearTimeout)
  }, [inView, reduced])

  return (
    <div ref={ref} className={s.scene}>

      {/* ════════ SIDEBAR ════════ */}
      <aside className={s.sb}>
        <OmniMark size={22} />
        <div className={s.sbSep} />
        <span className={`${s.sbBtn} ${s.sbActive}`}>
          <Icon name="inbox" size={15} />
        </span>
        <span className={s.sbBtn}><Icon name="barChart" size={15} /></span>
        <span className={s.sbBtn}><Icon name="gear" size={15} /></span>
        <div className={s.sbSpacer} />
        <span className={s.sbUser} title="Alexandre H.">A</span>
      </aside>

      {/* ════════ LIST ════════ */}
      <div className={s.lst}>
        <div className={s.lstHead}>
          <span className={s.lstTitle}>Conversas</span>
          <AnimatePresence>
            {step === 1 && (
              <motion.span
                className={s.lstNewBadge}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              >
                1
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className={s.lstBody}>

          {/* "Você" — nova conversa, chega no step 1 */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                className={`${s.lstRow} ${step >= 2 ? s.lstActive : s.lstUnread}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, type: 'spring', stiffness: 280, damping: 22 }}
                layout
              >
                <div className={s.lstAvt} style={{ background: '#1f93ff' }}>
                  V
                  <span className={s.lstAvtCh}>
                    <ChannelGlyph channel="webchat" size={9} />
                  </span>
                </div>
                <div className={s.lstInfo}>
                  <div className={s.lstMeta}>
                    <span className={s.lstName}>Você</span>
                    {step < 2 && <span className={s.lstUnreadDot} />}
                  </div>
                  <span className={s.lstPrev}>Olá, gostaria de conhecer o Omni…</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demais conversas — opacas */}
          <div className={`${s.lstRow} ${s.lstDim}`}>
            <div className={s.lstAvt} style={{ background: '#7c3aed' }}>
              M
              <span className={s.lstAvtCh}><ChannelGlyph channel="whatsapp" size={9} /></span>
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Mariana A.</span>
              <span className={s.lstPrev}>Boa tarde! Posso ajudar?</span>
            </div>
          </div>

          <div className={`${s.lstRow} ${s.lstDim}`}>
            <div className={s.lstAvt} style={{ background: '#f59e0b' }}>
              C
              <span className={s.lstAvtCh}><ChannelGlyph channel="instagram" size={9} /></span>
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Carlos B.</span>
              <span className={s.lstPrev}>Entendido, muito obrigado!</span>
            </div>
          </div>

        </div>
      </div>

      {/* ════════ DETAIL ════════ */}
      <div className={s.det}>

        {/* Header da conversa */}
        <div className={s.detHead}>
          <div className={s.detAvt} style={{ background: '#1f93ff' }}>V</div>
          <div className={s.detInfo}>
            <span className={s.detName}>Você</span>
            <span className={s.detSub}>
              <ChannelGlyph channel="webchat" size={11} />
              Chat do site · {now}
            </span>
          </div>
        </div>

        {/* Thread */}
        <div className={s.detBody}>
          <AnimatePresence>

            {step >= 2 && (
              <motion.div
                key="client"
                className={`${s.bbl} ${s.bblIn}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                Olá, gostaria de conhecer o Omni Headers.
                <span className={s.bblTime}>{now}</span>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                key="ia-note"
                className={s.iaNote}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className={s.iaNoteHead}>
                  <span className={s.iaStar}>✦</span>
                  <span className={s.iaLabel}>Captain IA · Lead identificado</span>
                  <span className={s.iaTag}>Chat do site</span>
                </div>
                <div className={s.iaNoteBody}>
                  Novo contato sem histórico anterior. Intenção clara de conhecer o produto. Recomendar demonstração personalizada.
                </div>
              </motion.div>
            )}

            {step >= 4 && (
              <motion.div
                key="sys"
                className={s.sysLine}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className={s.sysText}>Alexandre H. assumiu a conversa</span>
              </motion.div>
            )}

            {/* Typing dots — Alexandre */}
            {step === 5 && (
              <motion.div
                key="typing"
                className={`${s.bbl} ${s.bblOut}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.18 }}
              >
                <div className={s.bblAgentHead}>
                  <span className={s.agentAvt}>A</span>
                  <span className={s.agentName}>Alexandre H.</span>
                </div>
                <div className={s.typingDots}><i /><i /><i /></div>
              </motion.div>
            )}

            {step >= 6 && (
              <motion.div
                key="alex"
                className={`${s.bbl} ${s.bblOut}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                <div className={s.bblAgentHead}>
                  <span className={s.agentAvt}>A</span>
                  <span className={s.agentName}>Alexandre H.</span>
                </div>
                Olá! Sou o Alexandre, da equipe Headers. Fico feliz em apresentar o Omni para você. A demonstração leva 20 minutos — e você já sai sabendo se faz sentido para a sua operação. Por onde prefere começar?
                <span className={s.bblTime}>{now}</span>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className={s.detFoot}>
          <AnimatePresence mode="wait">

            {step >= 2 && step < 7 && (
              <motion.div
                key="fake-input"
                className={s.fakeInput}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <span className={s.fakeInputText}>Escreva sua resposta…</span>
                <span className={s.sendBtn} aria-hidden="true">
                  <Icon name="arrowRight" size={14} />
                </span>
              </motion.div>
            )}

            {step >= 7 && (
              <motion.div
                key="ctas"
                className={s.ctaWrap}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32 }}
              >
                <div className={s.ctaBtns}>
                  <a href={ROUTES.scheduleDemo} className={s.ctaPrimary}>
                    Agendar demonstração
                    <Icon name="arrowRight" size={13} />
                  </a>
                  <a
                    href={whatsappLink(WA_MSG)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.ctaWa}
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
