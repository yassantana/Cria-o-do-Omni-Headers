import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Icon, OmniLogo } from '@components/icons'
import { Button } from '@components/ui'
import { NAV_ITEMS, ROUTES, whatsappLink } from '@constants'
import { useLockBodyScroll, useScrolled, useScrollSpy } from '@hooks'
import { useContent } from '@i18n'
import { cn, handleAnchorClick, scrollToTop } from '@utils'
import styles from './Header.module.css'

const navIds = NAV_ITEMS.map((i) => i.href.replace('#', ''))

export function Header() {
  const c = useContent()
  const scrolled = useScrolled(20)
  const [open, setOpen] = useState(false)
  const activeId = useScrollSpy(navIds)
  const navigate = useNavigate()
  const location = useLocation()
  useLockBodyScroll(open)

  const onHome = location.pathname === ROUTES.home

  /** Navega para uma ancora — volta para a Home antes, se necessario. */
  const goToAnchor = (href: string) => {
    setOpen(false)
    if (!onHome) {
      navigate(ROUTES.home + href)
    } else {
      handleAnchorClick({ preventDefault: () => {} }, href)
    }
  }

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      <div className={cn('container container--wide', styles.bar)}>
        <button
          className={styles.logo}
          onClick={() => (onHome ? scrollToTop() : navigate(ROUTES.home))}
          aria-label="Omni Headers — inicio"
        >
          <OmniLogo size={30} />
        </button>

        <nav className={styles.nav} aria-label="Navegacao principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(styles.link, activeId === item.href.replace('#', '') && styles.active)}
              onClick={(e) => {
                e.preventDefault()
                goToAnchor(item.href)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            className={styles.waBtn}
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.cta.whatsapp}
          >
            <Icon name="message" size={18} />
          </a>
          <Button to={ROUTES.scheduleDemo} size="md" className={styles.cta}>
            {c.cta.primary}
          </Button>
          <button
            className={styles.burger}
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            className={styles.scrim}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
        {open && (
          <motion.div
            key="drawer"
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
          >
              <nav className={styles.drawerNav}>
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={styles.drawerLink}
                    onClick={(e) => {
                      e.preventDefault()
                      goToAnchor(item.href)
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    {item.label}
                    <Icon name="chevronRight" size={16} />
                  </motion.a>
                ))}
              </nav>
              <div className={styles.drawerActions}>
                <Button to={ROUTES.scheduleDemo} fullWidth size="lg" onClick={() => setOpen(false)}>
                  {c.cta.primary}
                </Button>
                <Button href={whatsappLink()} external variant="whatsapp" fullWidth size="lg">
                  {c.cta.whatsapp}
                </Button>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
