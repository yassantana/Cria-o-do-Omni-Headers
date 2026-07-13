import { WhatsAppOficialScene } from '@components/mockups'
import { Container, NumberedHeading, Reveal, Section } from '@components/ui'
import { SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './WhatsAppSection.module.css'

/**
 * Cena · Objecao. Responde "preciso trocar de numero? e o WhatsApp oficial e
 * seguro?". Mostra: cliente no WhatsApp normal -> mesmo numero (selo oficial) ->
 * equipe no Omni. Elimina a duvida e aumenta a confianca.
 */
export function WhatsAppSection() {
  const c = useContent()
  return (
    <Section id={SECTION_IDS.canais}>
      <Container width="wide">
        <NumberedHeading
          number={c.whatsapp.number}
          eyebrow={c.whatsapp.eyebrow}
          title={c.whatsapp.title}
          intro={c.whatsapp.intro}
          align="center"
          className={styles.head}
        />
        <Reveal className={styles.visual}>
          <WhatsAppOficialScene />
        </Reveal>
      </Container>
    </Section>
  )
}
