import { motion, useReducedMotion } from 'framer-motion'

import { HeroOperacaoScene } from '@components/mockups'
import { Icon, type IconName } from '@components/icons'
import { Button, Container, Reveal } from '@components/ui'
import { ROUTES, SECTION_IDS, whatsappLink } from '@constants'
import { useContent } from '@i18n'
import styles from './HeroSection.module.css'

const stepIcons: IconName[] = ['rocket', 'gear', 'plug', 'graduation', 'headset']

/**
 * Hero — a vitrine. Uma operacao viva funcionando ao vivo: todos os canais numa
 * caixa so, com uma narrativa continua (IA respondendo, atendentes assumindo,
 * etiquetas, notas, encerramentos, indicadores). O visual explica em 5s.
 */
export function HeroSection() {
  const c = useContent()
  const reduce = useReducedMotion()

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section id={SECTION_IDS.inicio} className={styles.hero}>
      <div className={styles.bg} />

      <Container width="wide">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <motion.span className={styles.eyebrow} {...rise(0)}>
              {c.hero.eyebrow}
            </motion.span>
            <motion.h1 className={styles.title} {...rise(0.08)}>
              {c.hero.title}
            </motion.h1>
            <motion.p className={styles.subtitle} {...rise(0.16)}>
              {c.hero.subtitle}
            </motion.p>
            <motion.div className={styles.actions} {...rise(0.24)}>
              <Button to={ROUTES.scheduleDemo} size="lg" iconRight={<Icon name="arrowRight" size={18} />}>
                {c.cta.primary}
              </Button>
              <Button href={whatsappLink()} external variant="secondary" size="lg">
                {c.cta.whatsapp}
              </Button>
            </motion.div>
          </div>

          <motion.div
            className={styles.visual}
            initial={reduce ? {} : { opacity: 0, y: 26, scale: 0.98 }}
            animate={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.visualGlow} />
            <HeroOperacaoScene inboxTitle={c.hero.inboxTitle} />
          </motion.div>
        </div>

        {/* A Headers: voce contrata um time, nao so um software */}
        <Reveal delay={0.1}>
          <div className={styles.headers}>
            <span className={styles.headersLabel}>{c.hero.headersLabel}</span>
            <div className={styles.headersSteps}>
              {c.hero.headersSteps.map((step, i) => (
                <span key={step} className={styles.headersStep}>
                  <Icon name={stepIcons[i]} size={15} />
                  {step}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
