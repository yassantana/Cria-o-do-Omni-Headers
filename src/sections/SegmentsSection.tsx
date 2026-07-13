import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { Icon, type IconName } from '@components/icons'
import { Container, Section, SectionHeading } from '@components/ui'
import { SECTION_IDS } from '@constants'
import type { SegmentId } from '@app-types'
import { useContent } from '@i18n'
import styles from './SegmentsSection.module.css'

const segIcon: Record<SegmentId, IconName> = {
  varejo: 'store',
  ecommerce: 'cart',
  saude: 'health',
  servicos: 'briefcase',
  educacao: 'graduation',
  franquias: 'building',
}

export function SegmentsSection() {
  const c = useContent()
  const [active, setActive] = useState(0)
  const current = c.segments.items[active]

  return (
    <Section id={SECTION_IDS.segmentos}>
      <Container width="wide">
        <SectionHeading eyebrow={c.segments.eyebrow} title={c.segments.title} subtitle={c.segments.subtitle} />

        <div className={styles.layout}>
          <div className={styles.tabs} role="tablist">
            {c.segments.items.map((seg, i) => (
              <button
                key={seg.id}
                role="tab"
                aria-selected={i === active}
                className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.tabIcon}>
                  <Icon name={segIcon[seg.id as SegmentId]} size={18} />
                </span>
                {seg.label}
                <Icon name="chevronRight" size={16} className={styles.tabChevron} />
              </button>
            ))}
          </div>

          <div className={styles.panel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className={styles.panelInner}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <span className={styles.panelIcon}>
                  <Icon name={segIcon[current.id as SegmentId]} size={32} />
                </span>
                <h3 className={styles.panelTitle}>{current.label}</h3>
                <p className={styles.panelGain}>{current.gain}</p>
                <div className={styles.panelTags}>
                  <span className={styles.panelTag}>WhatsApp</span>
                  <span className={styles.panelTag}>IA</span>
                  <span className={styles.panelTag}>Automacao</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  )
}
