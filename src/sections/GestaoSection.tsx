import { GestaoEquipeScene } from '@components/mockups'
import { Container, NumberedHeading, Reveal, Section } from '@components/ui'
import { SECTION_IDS } from '@constants'
import { useContent } from '@i18n'
import styles from './GestaoSection.module.css'

/**
 * Cena · Objecao. Responde "Como acompanho minha equipe? Quem esta online?
 * Quanto tempo demorou?". Mostra o painel de gestao ao vivo: SLA, conversas
 * abertas, tempo de resposta por atendente — e o alerta antes que o cliente
 * perceba o atraso.
 */
export function GestaoSection() {
  const c = useContent()
  return (
    <Section id={SECTION_IDS.dashboards} tone="elevated">
      <Container width="wide">
        <NumberedHeading
          number={c.gestao.number}
          eyebrow={c.gestao.eyebrow}
          title={c.gestao.title}
          intro={c.gestao.intro}
          align="center"
          className={styles.head}
        />
        <Reveal className={styles.visual}>
          <GestaoEquipeScene />
        </Reveal>
      </Container>
    </Section>
  )
}
