import { DashboardScene } from '@components/mockups'
import { Icon } from '@components/icons'
import { Container, Reveal, Section } from '@components/ui'
import { SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './DashboardSection.module.css'

export function DashboardSection() {
  const c = useContent()
  return (
    <Section id={SECTION_IDS.dashboards} tone="elevated">
      <Container width="wide" className={styles.grid}>
        <div className={styles.content}>
          <Reveal>
            <span className={`eyebrow ${styles.eyebrow}`}>{c.dashboards.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={styles.title}>{c.dashboards.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.subtitle}>{c.dashboards.subtitle}</p>
          </Reveal>

          <ul className={styles.kpis}>
            {c.dashboards.kpis.map((kpi, i) => (
              <Reveal as="li" key={kpi.label} delay={0.12 + i * 0.06}>
                <span className={styles.kpi}>
                  <span className={styles.kpiIcon}>
                    <Icon name="gauge" size={16} />
                  </span>
                  <span>
                    <span className={styles.kpiLabel}>{kpi.label}</span>
                    <span className={styles.kpiHint}>{kpi.hint}</span>
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <DashboardScene />
        </div>
      </Container>
    </Section>
  )
}
