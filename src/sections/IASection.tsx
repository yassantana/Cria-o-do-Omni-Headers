import { CaptainIAScene } from '@components/mockups'
import { Container, NumberedHeading, Reveal, Section } from '@components/ui'
import { SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './IASection.module.css'

/**
 * Cena · Objecao. Responde "Posso confiar na IA? E se ela responder errado?
 * Posso controlar?". Mostra a Captain respondendo o que sabe, escalando o que
 * nao sabe, e o painel de controle que o empresario configura.
 */
export function IASection() {
  const c = useContent()
  return (
    <Section id={SECTION_IDS.ia}>
      <Container width="wide">
        <NumberedHeading
          number={c.ia.number}
          eyebrow={c.ia.eyebrow}
          title={c.ia.title}
          intro={c.ia.intro}
          align="center"
          className={styles.head}
        />
        <Reveal className={styles.visual}>
          <CaptainIAScene />
        </Reveal>
      </Container>
    </Section>
  )
}
