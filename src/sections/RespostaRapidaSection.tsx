import { AIComposer } from '@components/mockups'
import { Icon } from '@components/icons'
import { Container, NumberedHeading, Reveal, Section } from '@components/ui'
import { SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './RespostaRapidaSection.module.css'

/**
 * 03 · Transformacao — Capacidade 2: a operacao do cliente passa a responder
 * na hora (IA + automacao). Protagonista = a operacao dele ganhando velocidade;
 * a IA e o meio.
 */
export function RespostaRapidaSection() {
  const c = useContent()
  return (
    <Section
      id={SECTION_IDS.ia}
      tone="elevated"
      decoration={
        <span
          className="aura"
          style={{ width: 520, height: 520, top: '5%', left: '-8%', background: 'rgba(109, 40, 217, 0.18)' }}
        />
      }
    >
      <Container width="wide" className={styles.grid}>
        <Reveal className={styles.visual} from="right">
          <div className={styles.glow} />
          <AIComposer />
        </Reveal>

        <div className={styles.copy}>
          <NumberedHeading
            number={c.fast.number}
            eyebrow={c.fast.eyebrow}
            title={c.fast.title}
            intro={c.fast.intro}
          />

          <ul className={styles.outcomes}>
            {c.fast.outcomes.map((o, i) => (
              <Reveal as="li" key={o.title} delay={0.1 + i * 0.08}>
                <div className={styles.outcome}>
                  <span className={styles.check}>
                    <Icon name="check" size={15} />
                  </span>
                  <div>
                    <span className={styles.outcomeTitle}>{o.title}</span>
                    <span className={styles.outcomeDesc}>{o.desc}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
