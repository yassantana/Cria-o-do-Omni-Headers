import { BotFlow } from '@components/mockups'
import { Icon } from '@components/icons'
import { Container, Reveal, Section, SectionHeading } from '@components/ui'
import { SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './AutomationSection.module.css'

export function AutomationSection() {
  const c = useContent()
  return (
    <Section id={SECTION_IDS.automacoes}>
      <Container width="wide">
        <SectionHeading eyebrow={c.automation.eyebrow} title={c.automation.title} subtitle={c.automation.subtitle} />

        <Reveal>
          <div className={styles.flowWrap}>
            <BotFlow nodes={c.automation.flow} />
          </div>
        </Reveal>

        <div className={styles.perks}>
          {c.automation.perks.map((perk, i) => (
            <Reveal key={perk} delay={i * 0.07}>
              <span className={styles.perk}>
                <Icon name="check" size={15} />
                {perk}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
