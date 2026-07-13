import { motion, useReducedMotion } from 'framer-motion'
import { Fragment } from 'react'

import { Icon, type IconName } from '@components/icons'
import styles from './BotFlow.module.css'

interface FlowNode {
  label: string
  kind: string
}

const KIND_ICON: Record<string, IconName> = {
  start: 'message',
  bot: 'bot',
  decision: 'target',
  ai: 'sparkles',
  route: 'users',
}

const KIND_TONE: Record<string, string> = {
  start: styles.toneStart,
  bot: styles.toneBot,
  decision: styles.toneDecision,
  ai: styles.toneAi,
  route: styles.toneRoute,
}

/** Fluxograma ilustrativo de uma automacao de atendimento. */
export function BotFlow({ nodes }: { nodes: readonly FlowNode[] }) {
  const reduce = useReducedMotion()
  return (
    <div className={styles.flow}>
      {nodes.map((node, i) => (
        <Fragment key={node.label}>
          <motion.div
            className={`${styles.node} ${KIND_TONE[node.kind] ?? ''}`}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.12, duration: 0.45 }}
          >
            <span className={styles.nodeIcon}>
              <Icon name={KIND_ICON[node.kind] ?? 'flow'} size={18} />
            </span>
            <span className={styles.nodeLabel}>{node.label}</span>
            {node.kind === 'decision' && <span className={styles.branchTag}>sim / nao</span>}
          </motion.div>

          {i < nodes.length - 1 && (
            <div className={styles.connector}>
              <span className={reduce ? styles.lineStatic : styles.line} />
              {!reduce && <span className={styles.pulseDot} style={{ animationDelay: `${i * 0.3}s` }} />}
              <Icon name="chevronRight" size={14} className={styles.chevron} />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}
