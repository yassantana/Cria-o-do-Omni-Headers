import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import styles from './GestaoEquipeScene.module.css'

type Step = 0 | 1 | 2 | 3 | 4 | 5

/** Numero animado: faz um "flip" vertical quando o valor muda. */
function LiveNum({ value, warn, accent }: { value: string; warn?: boolean; accent?: boolean }) {
  return (
    <span className={`${styles.liveNum} ${warn ? styles.liveNumWarn : ''} ${accent ? styles.liveNumAccent : ''}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{ display: 'block' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

interface AgentRowProps {
  initials: string
  color: string
  name: string
  role: string
  status: 'online' | 'pausa'
  conversas: number
  time: string
  sla: number
  warn?: boolean
  badge?: string
  flash?: boolean
}

function AgentRow({ initials, color, name, role, status, conversas, time, sla, warn, badge, flash }: AgentRowProps) {
  const slaColor = sla >= 90 ? 'good' : sla >= 75 ? 'warn' : 'bad'
  return (
    <motion.div
      layout
      className={`${styles.row} ${warn ? styles.rowWarn : ''} ${flash ? styles.rowFlash : ''}`}
    >
      <div className={styles.agent}>
        <div className={styles.avatar} style={{ background: color }}>
          {initials}
          <i className={`${styles.dot} ${status === 'online' ? styles.dotOnline : styles.dotPausa}`} />
        </div>
        <div className={styles.agentInfo}>
          <span className={styles.agentName}>{name}</span>
          <span className={styles.agentRole}>{role}</span>
        </div>
      </div>

      <div className={styles.cell}>
        <LiveNum value={String(conversas)} />
        <span className={styles.cellLabel}>abertas</span>
      </div>

      <div className={styles.cell}>
        <LiveNum value={time} warn={warn} />
        <span className={styles.cellLabel}>1ª resposta</span>
      </div>

      <div className={`${styles.slaCell} ${styles[`sla${slaColor.charAt(0).toUpperCase() + slaColor.slice(1)}`]}`}>
        <LiveNum value={status === 'pausa' ? '—' : `${sla}%`} />
        <span className={styles.cellLabel}>SLA</span>
      </div>

      <div className={styles.badgeCell}>
        <AnimatePresence>
          {badge && (
            <motion.span
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {badge}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/**
 * Cena de gestao de equipe em tempo real. Mostra: gestor ve quem esta online,
 * quantas conversas cada atendente tem, tempo de resposta e SLA ao vivo. Quando
 * o SLA de um atendente cai, o painel avisa — antes que o cliente perceba.
 */
export function GestaoEquipeScene() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [step, setStep] = useState<Step>(0)

  useEffect(() => {
    if (!inView) return
    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setStep(1), 350))   // rows appear
    t.push(setTimeout(() => setStep(2), 2000))  // Mariana +1 conversa
    t.push(setTimeout(() => setStep(3), 3600))  // Carlos SLA cai
    t.push(setTimeout(() => setStep(4), 4800))  // badge "SLA em risco"
    t.push(setTimeout(() => setStep(5), 6400))  // Captain +3 resolvidas
    return () => t.forEach(clearTimeout)
  }, [inView])

  const marianaConversas = step >= 2 ? 4 : 3
  const carlosConversas  = step >= 3 ? 8 : 6
  const carlosSla        = step >= 3 ? 65 : 72
  const carlosTime       = step >= 3 ? '4m 51s' : '4m 30s'
  const iaResolved       = step >= 5 ? 15 : 12
  const slaMedia         = step >= 3 ? '81%' : '87%'
  const totalOpen        = marianaConversas + carlosConversas + 1

  return (
    <div ref={ref} className={styles.scene}>
      {/* ── Cabeçalho do painel ── */}
      <div className={styles.panelHead}>
        <div className={styles.panelLeft}>
          <span className={styles.panelTitle}>Equipe · ao vivo</span>
          <span className={styles.live}><i />LIVE</span>
        </div>
        <div className={styles.kpiRow}>
          <div className={styles.kpi}>
            <LiveNum value="3" />
            <span className={styles.kpiLabel}>online</span>
          </div>
          <div className={styles.kpiDiv} />
          <div className={styles.kpi}>
            <LiveNum value={String(totalOpen)} />
            <span className={styles.kpiLabel}>conversas abertas</span>
          </div>
          <div className={styles.kpiDiv} />
          <div className={styles.kpi}>
            <LiveNum value={slaMedia} warn={step >= 3} />
            <span className={styles.kpiLabel}>SLA médio</span>
          </div>
          <div className={styles.kpiDiv} />
          <div className={styles.kpi}>
            <LiveNum value={String(iaResolved)} accent />
            <span className={styles.kpiLabel}>resolvidas pela IA</span>
          </div>
        </div>
      </div>

      {/* ── Cabeçalho da tabela ── */}
      <div className={styles.tableHead}>
        <span className={styles.thAgent}>Atendente</span>
        <span className={styles.th}>Conversas</span>
        <span className={styles.th}>1ª resposta</span>
        <span className={styles.th}>SLA</span>
        <span className={styles.thBadge} />
      </div>

      {/* ── Linhas de agente ── */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            className={styles.tableBody}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            >
              <AgentRow
                initials="MA" color="linear-gradient(135deg,#6E56F7,#9F7AEA)"
                name="Mariana A." role="Atendente sênior"
                status="online"
                conversas={marianaConversas}
                time="1m 20s"
                sla={98}
                flash={step === 2}
              />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            >
              <AgentRow
                initials="CF" color="linear-gradient(135deg,#F59E0B,#FBBF24)"
                name="Carlos F." role="Atendente"
                status="online"
                conversas={carlosConversas}
                time={carlosTime}
                sla={carlosSla}
                warn={step >= 3}
                badge={step >= 4 ? 'SLA em risco' : undefined}
              />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            >
              <AgentRow
                initials="RS" color="linear-gradient(135deg,#10B981,#34D399)"
                name="Rafaela S." role="Atendente"
                status="pausa"
                conversas={1}
                time="—"
                sla={100}
              />
            </motion.div>

            {/* Linha da Captain IA */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className={styles.iaRow}>
                <div className={styles.agent}>
                  <div className={styles.iaAvatar}>✦</div>
                  <div className={styles.agentInfo}>
                    <span className={styles.agentName}>Captain · IA</span>
                    <span className={styles.agentRole}>Agente de inteligência artificial</span>
                  </div>
                </div>
                <div className={styles.cell}>
                  <LiveNum value={String(iaResolved)} accent />
                  <span className={styles.cellLabel}>resolvidas</span>
                </div>
                <div className={styles.cell}>
                  <LiveNum value="45s" />
                  <span className={styles.cellLabel}>1ª resposta</span>
                </div>
                <div className={`${styles.slaCell} ${styles.slaGood}`}>
                  <LiveNum value="100%" />
                  <span className={styles.cellLabel}>SLA</span>
                </div>
                <div className={styles.badgeCell}>
                  <span className={styles.iaBadge}>IA ativa</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
