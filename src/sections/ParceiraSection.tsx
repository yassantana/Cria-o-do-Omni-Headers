import { ParceiraScene } from '@components/mockups'
import { Container, NumberedHeading, Reveal, Section } from '@components/ui'
import { SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './ParceiraSection.module.css'

/**
 * Cena · Objecao. Responde "Como implantamos isso? Vou ficar sozinho depois?".
 * Mostra a jornada de parceria com a equipe Headers: do primeiro contato ao
 * acompanhamento continuo. Nao e um onboarding — e o inicio de uma parceria.
 */
export function ParceiraSection() {
  const c = useContent()
  return (
    <Section id={SECTION_IDS.headers}>
      <Container width="wide">
        <NumberedHeading
          number={c.parceria.number}
          eyebrow={c.parceria.eyebrow}
          title={c.parceria.title}
          intro={c.parceria.intro}
          align="center"
          className={styles.head}
        />
        <Reveal className={styles.visual}>
          <ParceiraScene />
        </Reveal>
      </Container>
    </Section>
  )
}
