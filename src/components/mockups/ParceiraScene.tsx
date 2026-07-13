import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import styles from './ParceiraScene.module.css'

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6

const TEAM = [
  { initials: 'CH', color: 'linear-gradient(135deg,#6E56F7,#9F7AEA)' },
  { initials: 'MR', color: 'linear-gradient(135deg,#10B981,#34D399)' },
  { initials: 'TS', color: 'linear-gradient(135deg,#F59E0B,#FBBF24)' },
  { initials: 'LP', color: 'linear-gradient(135deg,#EF4444,#F87171)' },
]

interface MsgProps {
  text: React.ReactNode
  time: string
}

function Msg({ text, time }: MsgProps) {
  return (
    <div className={styles.msg}>
      <div className={styles.msgAvatar}>C</div>
      <div className={styles.msgBody}>
        <div className={styles.msgMeta}>
          <span className={styles.msgSender}>Carol H. · Headers</span>
          <span className={styles.msgTime}>{time}</span>
        </div>
        <div className={styles.msgText}>{text}</div>
      </div>
    </div>
  )
}

function DateSep({ label }: { label: string }) {
  return (
    <div className={styles.dateSep}>
      <span className={styles.dateLine} />
      <span className={styles.dateLabel}>{label}</span>
      <span className={styles.dateLine} />
    </div>
  )
}

/**
 * Cena de parceria Headers. Mostra o relacionamento real entre a equipe Headers
 * e o cliente — do primeiro contato ao acompanhamento continuo. Nao e um
 * onboarding. E o inicio de uma parceria que nao tem data para terminar.
 */
export function ParceiraScene() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [step, setStep] = useState<Step>(0)

  useEffect(() => {
    if (!inView) return
    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setStep(1), 350))   // channel header
    t.push(setTimeout(() => setStep(2), 950))   // dia 0 + msg 1
    t.push(setTimeout(() => setStep(3), 2400))  // 3 dias + msg 2
    t.push(setTimeout(() => setStep(4), 3900))  // 1 semana + go-live + metric
    t.push(setTimeout(() => setStep(5), 5500))  // mês 1 + msg 4
    t.push(setTimeout(() => setStep(6), 6800))  // footer: Carol digitando
    return () => t.forEach(clearTimeout)
  }, [inView])

  return (
    <div ref={ref} className={styles.scene}>
      {/* ── Cabeçalho do canal ── */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            className={styles.channelHead}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.teamAvatars}>
              {TEAM.map((m) => (
                <div key={m.initials} className={styles.teamAvatar} style={{ background: m.color }}>
                  {m.initials}
                </div>
              ))}
              <span className={styles.teamMore}>+8</span>
            </div>
            <div className={styles.channelInfo}>
              <span className={styles.channelName}>Seu canal de parceria · Headers</span>
              <span className={styles.channelSub}>equipe especializada · disponível para você</span>
            </div>
            <span className={styles.onlinePill}><i />online</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Feed de mensagens ── */}
      <div className={styles.feed}>
        <AnimatePresence>

          {/* Dia 0 */}
          {step >= 2 && (
            <motion.div key="d0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
              <DateSep label="Ontem você assinou" />
              <Msg
                time="09:14"
                text={
                  <>
                    Oi! Sou a Carol, sua especialista aqui na Headers. 👋 Já analisei a operação de vocês e preparei o plano de implantação. Quando quiser começar, é só falar!
                  </>
                }
              />
            </motion.div>
          )}

          {/* 3 dias depois */}
          {step >= 3 && (
            <motion.div key="d3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
              <DateSep label="3 dias depois" />
              <Msg
                time="14:32"
                text={
                  <>
                    Tudo no ar! ✅ Plataforma configurada, WhatsApp conectado e automações prontas. O treinamento da equipe está agendado para <strong>sexta às 14h</strong>. Posso confirmar com vocês?
                  </>
                }
              />
            </motion.div>
          )}

          {/* Primeira semana — go-live */}
          {step >= 4 && (
            <motion.div key="d7" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
              <DateSep label="Primeira semana · go-live" />
              <Msg
                time="08:07"
                text={
                  <>
                    🎉 <strong>Vocês estão no ar!</strong> Olha o que aconteceu nas primeiras 4 horas:
                    <div className={styles.metricCard}>
                      <div className={styles.metric}>
                        <span className={styles.metricValue}>83</span>
                        <span className={styles.metricLabel}>conversas atendidas</span>
                      </div>
                      <div className={styles.metricDiv} />
                      <div className={styles.metric}>
                        <span className={styles.metricValue}>31</span>
                        <span className={styles.metricLabel}>resolvidas pela IA</span>
                      </div>
                      <div className={styles.metricDiv} />
                      <div className={styles.metric}>
                        <span className={styles.metricValue}>1m 12s</span>
                        <span className={styles.metricLabel}>tempo médio de resposta</span>
                      </div>
                    </div>
                    Estou aqui se precisar de qualquer ajuste. 🙌
                  </>
                }
              />
            </motion.div>
          )}

          {/* Mês 1 */}
          {step >= 5 && (
            <motion.div key="d30" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
              <DateSep label="Mês 1" />
              <Msg
                time="10:00"
                text={
                  <>
                    Primeiro mês incrível: <strong>2.847 conversas</strong>, SLA em 94%, e a IA já resolvendo 38% das filas sozinha. Agendei nossa revisão mensal — quero entender onde podemos evoluir juntos. 🚀
                  </>
                }
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Footer: Carol está aqui ── */}
      <AnimatePresence>
        {step >= 6 && (
          <motion.div
            className={styles.footer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.footerAvatar}>C</div>
            <div className={styles.footerText}>
              <span className={styles.footerName}>Carol H. está digitando</span>
              <span className={styles.footerSub}>sua especialista Headers · sempre disponível</span>
            </div>
            <div className={styles.typingDots}>
              <i /><i /><i />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
