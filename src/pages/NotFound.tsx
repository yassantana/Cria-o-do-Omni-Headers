import { OmniMark } from '@components/icons'
import { Button } from '@components/ui'
import { ROUTES } from '@constants'
import { useDocumentTitle } from '@hooks'
import { useContent } from '@i18n'
import styles from './NotFound.module.css'

export default function NotFound() {
  const c = useContent()
  useDocumentTitle('404 · Omni Headers')

  return (
    <main className={styles.page}>
      <span className="aura" style={{ width: 420, height: 420, top: '10%', left: '50%', marginLeft: -210, background: 'var(--iris-400)' }} />
      <div className={styles.inner}>
        <OmniMark size={48} />
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>{c.notFound.title}</h1>
        <p className={styles.subtitle}>{c.notFound.subtitle}</p>
        <Button to={ROUTES.home} size="lg">
          {c.notFound.back}
        </Button>
      </div>
    </main>
  )
}
