import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ChannelGlyph, OmniMark } from '@components/icons'
import styles from './WhatsAppOficialScene.module.css'

type Side = 'client' | 'agent' | 'ia'
type Msg = { id: string; side: Side; text: string; ts: string }

const INITIAL: Msg[] = [
  { id: 'm0', side: 'client', text: 'Oi! Vocês têm o tênis azul em M?',      ts: '14:21' },
  { id: 'm1', side: 'agent',  text: 'Oi Mariana! Temos sim 😊 Quer reservar?', ts: '14:21' },
  { id: 'm2', side: 'client', text: 'Sim! Dá pra entregar hoje?',              ts: '14:22' },
]

const SCRIPT: { delay: number; msg: Msg }[] = [
  { delay: 2000, msg: { id: 'ia1', side: 'ia',     text: 'Sugestão: "Entregamos até 18h. Posso confirmar o pedido?"', ts: '14:22' } },
  { delay: 1700, msg: { id: 'm3',  side: 'agent',  text: 'Entregamos até 18h. Posso confirmar o pedido?',             ts: '14:22' } },
  { delay: 2200, msg: { id: 'm4',  side: 'client', text: 'Pode confirmar! 🙌',                                        ts: '14:23' } },
  { delay: 1500, msg: { id: 'm5',  side: 'agent',  text: 'Pedido #4821 confirmado ✓  Entrega até 18h!',               ts: '14:23' } },
]

export function WhatsAppOficialScene() {
  const ref        = useRef<HTMLDivElement>(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })
  const reduce     = useReducedMotion()
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL)
  const detBodyRef  = useRef<HTMLDivElement>(null)
  const phoneBodyRef = useRef<HTMLDivElement>(null)
  const stepRef    = useRef(0)
  const timerRef   = useRef<ReturnType<typeof setTimeout>>()

  // Auto-scroll both panels on new message
  useEffect(() => {
    detBodyRef.current?.scrollTo({ top: 9999, behavior: 'smooth' })
    phoneBodyRef.current?.scrollTo({ top: 9999, behavior: 'smooth' })
  }, [msgs])

  // Sequential animation loop
  useEffect(() => {
    if (!inView || reduce) return
    function next() {
      const s = SCRIPT[stepRef.current]
      if (!s) return
      timerRef.current = setTimeout(() => {
        setMsgs(p => [...p, s.msg])
        stepRef.current += 1
        next()
      }, s.delay)
    }
    const boot = setTimeout(next, 2000)
    return () => { clearTimeout(boot); clearTimeout(timerRef.current) }
  }, [inView, reduce])

  const phoneMsgs = msgs.filter(m => m.side !== 'ia')
  const listPreview = phoneMsgs.at(-1)?.text.substring(0, 32) ?? ''

  return (
    <div className={styles.scene} ref={ref} aria-hidden="true">

      {/* ── LEFT: Mariana's phone ─────────────────────── */}
      <div className={styles.phoneCol}>
        <span className={styles.colLabel}>Mariana — WhatsApp pessoal</span>

        <div className={styles.phone}>
          <span className={styles.notch} />
          <div className={styles.screen}>
            {/* WhatsApp header */}
            <div className={styles.waHead}>
              <span className={styles.waAvatar}>M</span>
              <div>
                <div className={styles.waName}>
                  Minha Empresa <span className={styles.waTick}>✓</span>
                </div>
                <div className={styles.waSub}>online</div>
              </div>
              <span className={styles.waGlyph}>
                <ChannelGlyph channel="whatsapp" size={13} />
              </span>
            </div>
            {/* Messages */}
            <div className={styles.waBody} ref={phoneBodyRef}>
              {phoneMsgs.map(m => (
                <motion.span
                  key={m.id}
                  className={`${styles.waBbl} ${m.side === 'client' ? styles.waOut : styles.waIn}`}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22 }}
                >
                  {m.text}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <span className={styles.colSub}>Mesmo número que ela já tem salvo</span>
      </div>

      {/* ── RIGHT: Omni Headers inbox ────────────────── */}
      <div className={styles.inboxCol}>
        <span className={styles.colLabel}>Sua equipe — Omni Headers</span>

        <div className={styles.inbox}>
          {/* Sidebar */}
          <aside className={styles.sb}>
            <OmniMark size={20} />
            <div className={styles.sbSep} />
            <span className={`${styles.sbIcon} ${styles.sbIconWa}`}>
              <ChannelGlyph channel="whatsapp" size={14} />
            </span>
            <span className={styles.sbIcon}>
              <ChannelGlyph channel="instagram" size={14} />
            </span>
            <span className={styles.sbIcon}>
              <ChannelGlyph channel="webchat" size={14} />
            </span>
            <span className={styles.sbIcon}>
              <ChannelGlyph channel="email" size={14} />
            </span>
          </aside>

          {/* Conversation list */}
          <div className={styles.lst}>
            <div className={styles.lstHead}>
              <span className={styles.lstTitle}>WhatsApp</span>
              <span className={styles.lstVerified}>
                <span className={styles.lstTick}>✓</span> Oficial
              </span>
            </div>
            <div className={`${styles.lstRow} ${styles.lstActive}`}>
              <span className={styles.lstAvt}>
                M
                <span className={styles.lstAvtCh}>
                  <ChannelGlyph channel="whatsapp" size={9} />
                </span>
              </span>
              <span className={styles.lstBody}>
                <span className={styles.lstName}>Mariana Sousa</span>
                <span className={styles.lstPreview}>{listPreview}</span>
              </span>
              <span className={styles.lstAgent}>Carol</span>
            </div>
          </div>

          {/* Detail panel */}
          <div className={styles.det}>
            <div className={styles.detHead}>
              <div>
                <span className={styles.detName}>Mariana Sousa</span>
                <span className={styles.detCh}>
                  <ChannelGlyph channel="whatsapp" size={11} /> WhatsApp Business
                </span>
              </div>
              <span className={styles.detAgent}>Carol</span>
            </div>

            <div className={styles.detBody} ref={detBodyRef}>
              {msgs.map(m => {
                if (m.side === 'ia') return (
                  <motion.div
                    key={m.id}
                    className={styles.iaSuggest}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <span className={styles.iaLabel}>✦ Captain IA — sugestão</span>
                    <span className={styles.iaText}>{m.text}</span>
                  </motion.div>
                )
                return (
                  <motion.div
                    key={m.id}
                    className={`${styles.msg} ${m.side === 'client' ? styles.msgIn : styles.msgOut}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {m.side === 'agent' && <span className={styles.msgAgent}>Carol</span>}
                    <span className={styles.msgBbl}>{m.text}</span>
                    <span className={styles.msgTs}>{m.ts}</span>
                  </motion.div>
                )
              })}
            </div>

            <div className={styles.detFoot}>
              <span className={styles.detInput}>Responder Mariana...</span>
              <span className={styles.detSend}>Enviar</span>
            </div>
          </div>
        </div>

        <span className={styles.colSub}>A mesma conversa, do lado de dentro</span>
      </div>
    </div>
  )
}
