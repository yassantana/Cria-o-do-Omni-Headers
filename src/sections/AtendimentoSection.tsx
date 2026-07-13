import { AtendimentoColaborativoScene } from '@components/mockups'
import { Container, NumberedHeading, Reveal, Section } from '@components/ui'
import { SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './AtendimentoSection.module.css'

/**
 * Cena · Atendimento colaborativo. Responde "como minha equipe atende junto?".
 * Mostra uma conversa em profundidade: historico do cliente, nota interna entre
 * colegas e a IA sugerindo a resposta — todos no mesmo numero.
 */
export function AtendimentoSection() {
  const c = useContent()
  return (
    <Section id={SECTION_IDS.solucao} tone="elevated">
      <Container width="wide">
        <NumberedHeading
          number={c.equipe.number}
          eyebrow={c.equipe.eyebrow}
          title={c.equipe.title}
          intro={c.equipe.intro}
          align="center"
          className={styles.head}
        />
        <Reveal className={styles.visual}>
          <AtendimentoColaborativoScene />
        </Reveal>
      </Container>
    </Section>
  )
}
