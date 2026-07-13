import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'

import { ChannelGlyph, Icon, OmniMark } from '@components/icons'
import s from './CaptainIAScene.module.css'

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

const KNOWS = [
  'Horários de atendimento',
  'Preços e planos',
  'Disponibilidade de produtos',
  'Políticas de frete e troca',
]
const ESCALATES = ['Cancelamentos e pedidos', 'Dúvidas financeiras e pagamentos']

/**
 * Cena animada que responde a objecao "Posso confiar na IA?".
 * Mostra: Captain responde o que sabe (horarios) -> cliente pede cancelamento ->
 * Captain escalona graciosamente para Ana. Painel lateral mostra quem controla o
 * que ela sabe — e o topico acende em sincronia com a conversa.
 */
export function CaptainIAScene() {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [step, setStep] = useState<Step>(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) { setStep(7); return }
    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setStep(1), 500))
    t.push(setTimeout(() => setStep(2), 1100))
    t.push(setTimeout(() => setStep(3), 2700))
    t.push(setTimeout(() => setStep(4), 4400))
    t.push(setTimeout(() => setStep(5), 4900))
    t.push(setTimeout(() => setStep(6), 6500))
    t.push(setTimeout(() => setStep(7), 7400))
    return () => t.forEach(clearTimeout)
  }, [inView, reduced])

  const activeKnows    = step >= 3 && step <= 3 ? 0 : -1
  const activeEscalate = step >= 6 ? 0 : -1

  return (
    <div ref={ref} className={s.scene} aria-hidden="true">

      {/* ════════ SIDEBAR ════════ */}
      <aside className={s.sb}>
        <OmniMark size={22} />
        <div className={s.sbSep} />
        <span className={`${s.sbBtn} ${s.sbActive}`}><Icon name="inbox" size={15} /></span>
        <span className={s.sbBtn}><Icon name="barChart" size={15} /></span>
        <span className={s.sbBtn}><Icon name="gear" size={15} /></span>
        <div className={s.sbFoot}>
          <span className={s.sbIa}>✦</span>
        </div>
      </aside>

      {/* ════════ LIST ════════ */}
      <div className={s.lst}>
        <div className={s.lstHead}>
          <span className={s.lstTitle}>Conversas</span>
          <span className={s.lstBadge}>3</span>
        </div>
        <div className={s.lstBody}>

          {/* Pedro Souza — Captain IA ativa */}
          <div className={`${s.lstRow} ${s.lstActive}`}>
            <div className={s.lstAvt} style={{ background: 'var(--obbg)', color: 'var(--obbt)', fontSize: '12px' }}>
              ✦
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Pedro Souza</span>
              <span className={s.lstPrev}>Qual o horário de atend...</span>
            </div>
            <span className={s.lstIaBadge}>✦ IA</span>
          </div>

          <div className={s.lstRow}>
            <div className={s.lstAvt} style={{ background: '#7c3aed' }}>
              MA
              <span className={s.lstAvtCh}><ChannelGlyph channel="whatsapp" size={9} /></span>
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Mariana Sousa</span>
              <span className={s.lstPrev}>Preciso de ajuda com...</span>
            </div>
          </div>

          <div className={s.lstRow}>
            <div className={s.lstAvt} style={{ background: '#f59e0b' }}>
              CF
              <span className={s.lstAvtCh}><ChannelGlyph channel="instagram" size={9} /></span>
            </div>
            <div className={s.lstInfo}>
              <span className={s.lstName}>Carlos V.</span>
              <span className={s.lstPrev}>Boa tarde, tenho uma...</span>
            </div>
          </div>

        </div>
      </div>

      {/* ════════ CHAT COLUMN ════════ */}
      <div className={s.chat}>
        <div className={s.chatHead}>
          <div className={s.captainAvt}>✦</div>
          <div className={s.captainInfo}>
            <span className={s.captainName}>Captain</span>
            <span className={s.captainRole}>Agente de IA · Pedro Souza</span>
          </div>
          <span className={s.iaBadge}>IA ativa</span>
        </div>

        <div className={s.chatBody}>
          <AnimatePresence mode="sync">
            {step >= 1 && (
              <motion.div
                key="c1"
                className={`${s.bbl} ${s.bblIn}`}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22 }}
              >
                Qual o horário de atendimento de vocês?
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="t1"
                className={`${s.bbl} ${s.bblBot} ${s.typing}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <i /><i /><i />
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                key="ia1"
                className={`${s.bbl} ${s.bblBot}`}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22 }}
              >
                Atendemos de segunda a sexta, das 9h às 18h, e sábado das 9h às 13h! 😊
                <span className={s.bblLabel}>respondida pela IA</span>
              </motion.div>
            )}

            {step >= 4 && (
              <motion.div
                key="c2"
                className={`${s.bbl} ${s.bblIn}`}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22 }}
              >
                Preciso cancelar meu pedido
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="t2"
                className={`${s.bbl} ${s.bblBot} ${s.typing}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <i /><i /><i />
              </motion.div>
            )}

            {step >= 6 && (
              <motion.div
                key="ia2"
                className={`${s.bbl} ${s.bblBot} ${s.bblEsc}`}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22 }}
              >
                Cancelamento precisa da atenção da nossa equipe. Já chamei a Ana pra te ajudar! 🙏
                <span className={`${s.bblLabel} ${s.bblLabelEsc}`}>encaminhado para atendente</span>
              </motion.div>
            )}

            {step >= 7 && (
              <motion.div
                key="entered"
                className={s.agentRow}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                <div className={s.agentAvt}>A</div>
                <span>Ana entrou na conversa</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ════════ KNOWLEDGE PANEL ════════ */}
      <div className={s.know}>
        <div className={s.knowHead}>
          <span className={s.knowTitle}>Captain · base de conhecimento</span>
          <span className={s.knowSub}>você define o que ela sabe</span>
        </div>

        <div className={s.knowBlock}>
          <span className={s.knowLabel}>Responde com segurança</span>
          {KNOWS.map((topic, i) => (
            <motion.div
              key={topic}
              layout
              className={`${s.knowRow} ${activeKnows === i ? s.knowRowActive : ''}`}
            >
              <span className={s.knowCheck}>✓</span>
              <span className={s.knowText}>{topic}</span>
            </motion.div>
          ))}
        </div>

        <div className={s.knowBlock}>
          <span className={s.knowLabel}>Quando não sabe</span>
          {ESCALATES.map((topic, i) => (
            <motion.div
              key={topic}
              layout
              className={`${s.knowRow} ${s.knowRowEsc} ${activeEscalate === i ? s.knowRowEscActive : ''}`}
            >
              <span className={s.knowArrow}>→</span>
              <span className={s.knowText}>{topic}</span>
              <span className={s.escPill}>equipe</span>
            </motion.div>
          ))}
        </div>

        <div className={s.knowFoot}>
          nunca inventa · nunca mente
        </div>
      </div>

    </div>
  )
}
