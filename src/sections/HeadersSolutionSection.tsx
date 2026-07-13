import { Icon, type IconName, OmniMark } from '@components/icons'
import { Button, Container, Reveal, Section, SectionHeading } from '@components/ui'
import { ROUTES, SECTION_IDS, whatsappLink } from '@constants'
import { useContent } from '@i18n'
import styles from './HeadersSolutionSection.module.css'

const icons: IconName[] = [
  'rocket',
  'gear',
  'target',
  'plug',
  'sparkles',
  'bot',
  'graduation',
  'headset',
  'refresh',
]

export function HeadersSolutionSection() {
  const c = useContent()
  return (
    <Section
      id={SECTION_IDS.headers}
      tone="elevated"
      decoration={
        <>
          <div className="grid-bg" />
          <span
            className="aura"
            style={{ width: 560, height: 560, top: '0%', left: '50%', marginLeft: -280, background: 'var(--brand-400)' }}
          />
        </>
      }
    >
      <Container width="wide">
        <SectionHeading eyebrow={c.headers.eyebrow} title={c.headers.title} subtitle={c.headers.subtitle} />

        <div className={styles.grid}>
          {c.headers.deliverables.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <article className={styles.card}>
                <span className={styles.icon}>
                  <Icon name={icons[i]} size={20} />
                </span>
                <h3 className={styles.cardTitle}>{d.title}</h3>
                <p className={styles.cardDesc}>{d.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className={styles.closing}>
            <OmniMark size={40} />
            <p className={styles.closingText}>{c.headers.closing}</p>
            <div className={styles.closingActions}>
              <Button to={ROUTES.scheduleDemo} size="lg" iconRight={<Icon name="arrowRight" size={18} />}>
                {c.cta.primary}
              </Button>
              <Button href={whatsappLink()} external variant="secondary" size="lg">
                {c.cta.secondary}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
