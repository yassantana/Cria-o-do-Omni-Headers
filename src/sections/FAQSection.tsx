import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { Icon } from '@components/icons'
import { Button, Container, Reveal, Section, SectionHeading } from '@components/ui'
import { SECTION_IDS, whatsappLink } from '@constants'
import { useContent } from '@i18n'
import styles from './FAQSection.module.css'

export function FAQSection() {
  const c = useContent()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id={SECTION_IDS.faq}>
      <Container width="narrow">
        <SectionHeading eyebrow={c.faq.eyebrow} title={c.faq.title} />

        <div className={styles.list}>
          {c.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                  <button
                    className={styles.question}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className={styles.toggle}>
                      <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className={styles.answerWrap}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className={styles.answer}>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div className={styles.help}>
            <span>Ainda com duvida?</span>
            <Button href={whatsappLink()} external variant="whatsapp" size="md">
              {c.cta.whatsapp}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
