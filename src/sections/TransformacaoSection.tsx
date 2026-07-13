import { TransformacaoScene } from '@components/mockups'
import { Container, NumberedHeading, Reveal, Section } from '@components/ui'
import { useContent } from '@i18n'
import styles from './TransformacaoSection.module.css'

/**
 * Cena · Culminacao. Responde "O que realmente muda na minha empresa?".
 * Mostra a transformacao da operacao em tempo real: conversas em caos se
 * organizando, atendentes sendo atribuidos, IA resolvendo, gestao surgindo.
 */
export function TransformacaoSection() {
  const c = useContent()
  return (
    <Section id="transformacao" tone="elevated">
      <Container width="wide">
        <NumberedHeading
          number={c.transformacao.number}
          eyebrow={c.transformacao.eyebrow}
          title={c.transformacao.title}
          intro={c.transformacao.intro}
          align="center"
          className={styles.head}
        />
        <Reveal className={styles.visual}>
          <TransformacaoScene />
        </Reveal>
      </Container>
    </Section>
  )
}
