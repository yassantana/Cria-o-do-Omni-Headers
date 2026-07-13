import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { ChannelGlyph, Icon } from '@components/icons'
import { AppWindow } from './AppWindow'
import { InboxMockup } from './InboxMockup'
import { Gauge, Sparkline } from './charts'
import styles from './HeroShowcase.module.css'

interface FloatProps {
  className: string
  delay: number
  children: ReactNode
}

function Float({ className, delay, children }: FloatProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`${styles.float} ${className}`}
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }}
        className={styles.floatInner}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Composicao "viva" do hero: a inbox + cards flutuantes (indicadores, IA, CSAT). */
export function HeroShowcase() {
  return (
    <div className={styles.showcase}>
      <div className={styles.glow} />
      <div className={styles.win}>
        <AppWindow flush title="app.omniheaders.com/inbox">
          <InboxMockup />
        </AppWindow>
      </div>

      {/* Indicador ao vivo */}
      <Float className={styles.stat} delay={0.7}>
        <div className={styles.statHead}>
          <span className={styles.live}>
            <i /> ao vivo
          </span>
        </div>
        <div className={styles.statValue}>2m14s</div>
        <div className={styles.statLabel}>tempo de 1a resposta</div>
        <div className={styles.spark}>
          <Sparkline data={[9, 7, 8, 5, 4, 3, 2]} width={120} height={26} />
        </div>
      </Float>

      {/* IA trabalhando */}
      <Float className={styles.ai} delay={0.95}>
        <span className={styles.aiIcon}>
          <Icon name="sparkles" size={16} />
        </span>
        <div>
          <div className={styles.aiTitle}>Captain · IA</div>
          <div className={styles.aiText}>resolveu 62% sozinho hoje</div>
        </div>
      </Float>

      {/* CSAT */}
      <Float className={styles.csat} delay={1.15}>
        <Gauge value={94} display="94%" label="CSAT" size={104} />
      </Float>

      {/* Integracao */}
      <Float className={styles.integ} delay={1.3}>
        <span className={styles.integIcon}>
          <ChannelGlyph channel="whatsapp" size={16} />
        </span>
        <span className={styles.integText}>WhatsApp API conectado</span>
        <span className={styles.integDot} />
      </Float>
    </div>
  )
}
