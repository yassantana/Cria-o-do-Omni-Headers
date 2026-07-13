import { CrescimentoScene } from '@components/mockups'
import { Container, NumberedHeading, Reveal, Section } from '@components/ui'
import { useContent } from '@i18n'
import styles from './CrescimentoSection.module.css'

/**
 * Cena · Objecao. Responde "A plataforma vai evoluir comigo?".
 * Mostra a operacao crescendo em tempo real: canais, atendentes, Captain IA,
 * automacoes e integracoes acumulando — sem recomecar do zero.
 */
export function CrescimentoSection() {
  const c = useContent()
  return (
    <Section id="crescimento">
      <Container width="wide">
        <NumberedHeading
          number={c.crescimento.number}
          eyebrow={c.crescimento.eyebrow}
          title={c.crescimento.title}
          intro={c.crescimento.intro}
          align="center"
          className={styles.head}
        />
        <Reveal className={styles.visual}>
          <CrescimentoScene />
        </Reveal>
      </Container>
    </Section>
  )
}
