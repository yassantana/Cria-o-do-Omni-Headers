import { ChannelGlyph, Icon } from '@components/icons'
import { IntegrationsConstellation } from '@components/mockups'
import { Container, Reveal, Section, SectionHeading } from '@components/ui'
import { CHANNELS, SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './ChannelsSection.module.css'

export function ChannelsSection() {
  const c = useContent()
  return (
    <Section id={SECTION_IDS.canais} tone="elevated">
      <Container width="wide">
        <SectionHeading eyebrow={c.channels.eyebrow} title={c.channels.title} subtitle={c.channels.subtitle} />

        <div className={styles.channels}>
          {CHANNELS.map((ch, i) => (
            <Reveal key={ch.id} delay={i * 0.06}>
              <div className={styles.channel}>
                <span className={styles.glyph} style={{ background: `color-mix(in srgb, ${ch.colorVar} 14%, transparent)` }}>
                  <ChannelGlyph channel={ch.id} size={26} />
                </span>
                <span className={styles.chName}>{ch.label}</span>
                <span className={styles.chTag}>
                  <Icon name="check" size={12} /> Oficial
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.integrations}>
          <div className={styles.intText}>
            <Reveal>
              <h3 className={styles.intTitle}>{c.channels.integrations.title}</h3>
            </Reveal>
            <Reveal delay={0.05}>
              <p className={styles.intSub}>{c.channels.integrations.subtitle}</p>
            </Reveal>
            <div className={styles.cats}>
              {c.channels.integrations.categories.map((cat, i) => (
                <Reveal key={cat} delay={0.1 + i * 0.05}>
                  <span className={styles.cat}>
                    <Icon name="plug" size={14} />
                    {cat}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15} from="left" className={styles.intVisual}>
            <IntegrationsConstellation categories={c.channels.integrations.categories} />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
