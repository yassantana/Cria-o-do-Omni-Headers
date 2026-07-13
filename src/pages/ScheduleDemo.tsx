import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon, OmniMark } from '@components/icons'
import { Button } from '@components/ui'
import { ROUTES } from '@constants'
import { useDocumentTitle } from '@hooks'
import { useContent } from '@i18n'
import styles from './ScheduleDemo.module.css'

/** Pagina de captura de lead — destino do CTA primario "Agendar demonstracao". */
export default function ScheduleDemo() {
  const c = useContent()
  const navigate = useNavigate()
  useDocumentTitle(`${c.demoPage.title} · Omni Headers`)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    navigate(ROUTES.thankYou)
  }

  const f = c.demoPage.fields

  return (
    <main className={styles.page}>
      <span className="aura" style={{ width: 480, height: 480, top: '-10%', left: '-10%', background: 'rgba(31, 147, 255, 0.15)' }} />
      <div className="container container--wide">
        <div className={styles.grid}>
          <aside className={styles.aside}>
            <button className={styles.back} onClick={() => navigate(ROUTES.home)}>
              <Icon name="arrowRight" size={16} className={styles.backIcon} /> Voltar
            </button>
            <OmniMark size={44} />
            <span className={`eyebrow ${styles.eyebrow}`}>{c.demoPage.eyebrow}</span>
            <h1 className={styles.title}>{c.demoPage.title}</h1>
            <p className={styles.subtitle}>{c.demoPage.subtitle}</p>
            <ul className={styles.benefits}>
              {c.demoPage.aside.map((b) => (
                <li key={b}>
                  <Icon name="check" size={16} /> {b}
                </li>
              ))}
            </ul>
          </aside>

          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.label}>{f.name}</span>
                <input name="name" className={styles.input} required placeholder="Ex.: Ana Silva" />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>{f.company}</span>
                <input name="company" className={styles.input} required placeholder="Ex.: Minha Empresa" />
              </label>
            </div>
            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.label}>{f.email}</span>
                <input name="email" className={styles.input} type="email" required placeholder="voce@empresa.com" />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>{f.phone}</span>
                <input name="phone" className={styles.input} required placeholder="(85) 9 0000-0000" />
              </label>
            </div>
            <label className={styles.field}>
              <span className={styles.label}>{f.segment}</span>
              <select name="segment" className={styles.input} defaultValue="">
                <option value="" disabled>
                  Selecione…
                </option>
                {c.segments.items.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span className={styles.label}>{f.message}</span>
              <textarea name="message" className={styles.input} rows={3} placeholder="..." />
            </label>

            <Button type="submit" size="lg" fullWidth iconRight={<Icon name="arrowRight" size={18} />}>
              {submitting ? 'Enviando…' : c.demoPage.submit}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
