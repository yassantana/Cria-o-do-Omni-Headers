import { RealidadeHojeScene } from '@components/mockups'
import { Container, NumberedHeading, Reveal, Section } from '@components/ui'
import { SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './OperacaoHojeSection.module.css'

/**
 * Momento 1 · Reconhecimento. O visitante ve a propria operacao HOJE — mensagens
 * chegando de todo lado, algumas sem resposta, o contador subindo — e pensa
 * "e exatamente assim". Uma frase; o resto e visual. Nenhum produto ainda.
 */
export function OperacaoHojeSection() {
  const c = useContent()
  return (
    <Section id={SECTION_IDS.problema} tone="elevated">
      <Container width="wide">
        <NumberedHeading
          number={c.today.number}
          eyebrow={c.today.eyebrow}
          title={c.today.title}
          align="center"
          className={styles.head}
        />

        <Reveal className={styles.visual}>
          <RealidadeHojeScene />
        </Reveal>
      </Container>
    </Section>
  )
}
