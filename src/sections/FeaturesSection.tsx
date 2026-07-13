import { Icon, type IconName } from '@components/icons'
import { Container, Reveal, Section, SectionHeading } from '@components/ui'
import { useContent } from '@i18n'
import styles from './FeaturesSection.module.css'

const icons: IconName[] = ['inbox', 'sparkles', 'bot', 'users', 'barChart', 'shield']

export function FeaturesSection() {
  const c = useContent()
  return (
    <Section>
      <Container width="wide">
        <SectionHeading eyebrow={c.features.eyebrow} title={c.features.title} subtitle={c.features.subtitle} />

        <div className={styles.bento}>
          {c.features.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} className={i === 0 ? styles.featured : undefined}>
              <article className={`${styles.card} ${i === 0 ? styles.cardFeatured : ''}`}>
                <span className={styles.icon}>
                  <Icon name={icons[i]} size={22} />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
                {i === 0 && (
                  <div className={styles.miniInbox}>
                    {[0, 1, 2].map((r) => (
                      <span key={r} className={styles.miniRow}>
                        <span className={styles.miniDot} />
                        <span className={styles.miniBar} style={{ width: `${70 - r * 14}%` }} />
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
