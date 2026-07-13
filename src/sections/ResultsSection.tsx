import { Icon } from '@components/icons'
import { Container, Reveal, Section, SectionHeading } from '@components/ui'
import { SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './ResultsSection.module.css'

export function ResultsSection() {
  const c = useContent()
  return (
    <Section id={SECTION_IDS.resultados}>
      <Container width="wide">
        <SectionHeading eyebrow={c.results.eyebrow} title={c.results.title} subtitle={c.results.subtitle} />

        <div className={styles.grid}>
          {c.results.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <article className={styles.card}>
                <span className={`${styles.trend} ${m.trend === 'up' ? styles.up : styles.down}`}>
                  <Icon name="arrowDown" size={16} className={m.trend === 'up' ? styles.flip : undefined} />
                  {m.caption}
                </span>
                {/* placeholder elegante — numero real entra apos a implantacao */}
                <span className={styles.figure}>
                  <span className={styles.figureValue}>{c.results.placeholderNote}</span>
                </span>
                <span className={styles.label}>{m.label}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
