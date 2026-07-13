import { CTAFinalScene } from '@components/mockups'
import { Container } from '@components/ui'
import styles from './FinalCTASection.module.css'

export function FinalCTASection() {
  return (
    <section className={styles.section}>
      <Container>
        <p className={styles.eyebrow}>a próxima conversa é a sua</p>
        <CTAFinalScene />
      </Container>
    </section>
  )
}
