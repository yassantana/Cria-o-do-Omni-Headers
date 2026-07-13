import { useNavigate } from 'react-router-dom'

import { Icon, OmniLogo } from '@components/icons'
import { Button } from '@components/ui'
import { APP_NAME, CONTACT, ROUTES, whatsappLink } from '@constants'
import { useContent } from '@i18n'
import { handleAnchorClick, scrollToTop } from '@utils'
import styles from './Footer.module.css'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v1.764" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Footer() {
  const c = useContent()
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer id="contato" className={styles.footer}>
      <div className="container container--wide">
        <div className={styles.top}>
          <div className={styles.brand}>
            <OmniLogo size={32} />
            <p className={styles.tagline}>{c.footer.tagline}</p>
            <div className={styles.contact}>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <Icon name="message" size={16} /> WhatsApp
              </a>
              <a href={`mailto:${CONTACT.email}`} className={styles.contactItem}>
                <Icon name="mail" size={16} /> {CONTACT.email}
              </a>
              <span className={styles.contactItem}>
                <Icon name="building" size={16} /> {CONTACT.city}
              </span>
            </div>
            <div className={styles.socials}>
              <a href={CONTACT.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.social}>
                <InstagramIcon />
              </a>
              <a href={CONTACT.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.social}>
                <LinkedInIcon />
              </a>
              <a href={CONTACT.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.social}>
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div className={styles.cols}>
            {c.footer.columns.map((col) => (
              <div key={col.title} className={styles.col}>
                <span className={styles.colTitle}>{col.title}</span>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={styles.colLink}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}

            <div className={styles.ctaCol}>
              <span className={styles.colTitle}>Pronto para começar?</span>
              <Button to={ROUTES.scheduleDemo} size="md">
                {c.cta.primary}
              </Button>
              <Button href={whatsappLink()} external variant="ghost" size="md">
                {c.cta.secondary}
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {year} {APP_NAME}. {c.footer.rights}
          </span>
          <div className={styles.legal}>
            {c.footer.legal.map((l) => (
              <a
                key={l}
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(l)}`}
                className={styles.legalLink}
              >
                {l}
              </a>
            ))}
          </div>
          <div className={styles.madeBy}>
            <span className={styles.madeDot} />
            {c.footer.madeBy}
          </div>
          <button className={styles.toTop} onClick={() => (navigate(ROUTES.home), scrollToTop())} aria-label="Voltar ao topo">
            <Icon name="arrowDown" size={16} className={styles.toTopIcon} />
          </button>
        </div>
      </div>
    </footer>
  )
}
