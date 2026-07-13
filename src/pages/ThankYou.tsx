import { motion } from 'framer-motion'

import { Icon, OmniMark } from '@components/icons'
import { Button } from '@components/ui'
import { ROUTES, whatsappLink } from '@constants'
import { useDocumentTitle } from '@hooks'
import { useContent } from '@i18n'
import styles from './ThankYou.module.css'

export default function ThankYou() {
  const c = useContent()
  useDocumentTitle(`${c.thankYou.title} · Omni Headers`)

  return (
    <main className={styles.page}>
      <span className="aura" style={{ width: 460, height: 460, top: '-10%', left: '50%', marginLeft: -230, background: 'var(--brand-400)' }} />
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className={styles.check}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 14 }}
        >
          <Icon name="check" size={36} />
        </motion.span>
        <OmniMark size={36} />
        <h1 className={styles.title}>{c.thankYou.title}</h1>
        <p className={styles.subtitle}>{c.thankYou.subtitle}</p>
        <div className={styles.actions}>
          <Button href={whatsappLink()} external variant="whatsapp" size="lg">
            {c.thankYou.whatsappCta}
          </Button>
          <Button to={ROUTES.home} variant="secondary" size="lg">
            {c.thankYou.back}
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
