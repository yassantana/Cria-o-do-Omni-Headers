import { IntegracoesScene } from '@components/mockups'
import { Container, NumberedHeading, Reveal, Section } from '@components/ui'
import { useContent } from '@i18n'
import styles from './IntegracoesSection.module.css'

/**
 * Cena · Objecao. Responde "Vou precisar trocar meus sistemas?".
 * Mostra o Omni Headers como hub central que conecta ERP, CRM, Financeiro e
 * sistemas internos — sem substituir nenhum deles.
 */
export function IntegracoesSection() {
  const c = useContent()
  return (
    <Section id="integracoes" tone="elevated">
      <Container width="wide">
        <NumberedHeading
          number={c.integracoes.number}
          eyebrow={c.integracoes.eyebrow}
          title={c.integracoes.title}
          intro={c.integracoes.intro}
          align="center"
          className={styles.head}
        />
        <Reveal className={styles.visual}>
          <IntegracoesScene />
        </Reveal>
      </Container>
    </Section>
  )
}
