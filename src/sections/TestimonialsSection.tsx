import { Icon } from '@components/icons'
import { Container, Reveal, Section, SectionHeading } from '@components/ui'
import { useContent } from '@i18n'
import styles from './TestimonialsSection.module.css'

export function TestimonialsSection() {
  const c = useContent()
  return (
    <Section tone="elevated">
      <Container width="wide">
        <SectionHeading
          eyebrow={c.testimonials.eyebrow}
          title={c.testimonials.title}
          subtitle={c.testimonials.subtitle}
        />

        <div className={styles.grid}>
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 0.1}>
              {/* placeholder elegante — substituir por depoimento real */}
              <article className={styles.card}>
                <Icon name="quote" size={28} className={styles.quote} />
                <div className={styles.lines}>
                  <span className={styles.line} />
                  <span className={styles.line} style={{ width: '92%' }} />
                  <span className={styles.line} style={{ width: '70%' }} />
                </div>
                <div className={styles.author}>
                  <span className={styles.avatar} />
                  <div>
                    <span className={styles.name}>{c.testimonials.placeholder}</span>
                    <span className={styles.role}>{c.testimonials.placeholderRole}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
