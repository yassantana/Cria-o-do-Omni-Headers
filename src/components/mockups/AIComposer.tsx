import { useReducedMotion } from 'framer-motion'

import { Icon } from '@components/icons'
import { useTypewriter } from '@hooks'
import styles from './AIComposer.module.css'

const suggestions = [
  'Oi, Mariana! Temos sim 😊 Posso reservar hoje as 15h?',
  'Claro! Seu pedido sai amanha. Quer o codigo de rastreio?',
  'Perfeito! Ja confirmei seu agendamento. Te espero por aqui 👋',
]

/** Card "Captain": a IA escrevendo uma resposta sugerida (efeito de digitacao). */
export function AIComposer() {
  const reduce = useReducedMotion()
  const typed = useTypewriter(suggestions, { disabled: !!reduce })

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.avatar}>
          <Icon name="sparkles" size={16} />
        </span>
        <div>
          <div className={styles.name}>Captain</div>
          <div className={styles.role}>IA do Omni Headers</div>
        </div>
        <span className={styles.live}>
          <i /> escrevendo
        </span>
      </div>

      <div className={styles.context}>
        <span className={styles.dot} />
        Cliente: “Voces tem horario hoje?”
      </div>

      <div className={styles.suggestion}>
        <span className={styles.sugLabel}>Resposta sugerida</span>
        <p className={styles.sugText}>
          {typed}
          {!reduce && <span className={styles.caret} />}
        </p>
      </div>

      <div className={styles.actions}>
        <span className={styles.primary}>
          <Icon name="check" size={14} /> Inserir
        </span>
        <span className={styles.ghost}>Editar</span>
      </div>
    </div>
  )
}
