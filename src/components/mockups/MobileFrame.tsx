import { ChannelGlyph } from '@components/icons'
import styles from './MobileFrame.module.css'

const chat = [
  { from: 'cliente', text: 'Oi, queria confirmar meu horario 😊' },
  { from: 'ia', text: 'Claro! Seu horario e hoje as 15h. Confirmado ✅' },
  { from: 'cliente', text: 'Perfeito, obrigada!' },
]

/** Frame de celular mostrando uma conversa (atendimento no bolso). */
export function MobileFrame() {
  return (
    <div className={styles.phone} aria-hidden="true">
      <span className={styles.notch} />
      <div className={styles.screen}>
        <div className={styles.header}>
          <span className={styles.ch}>
            <ChannelGlyph channel="whatsapp" size={18} />
          </span>
          <div>
            <div className={styles.name}>Omni Headers</div>
            <div className={styles.status}>online</div>
          </div>
        </div>
        <div className={styles.body}>
          {chat.map((m, i) => (
            <div
              key={i}
              className={`${styles.bubble} ${m.from === 'cliente' ? styles.left : styles.right} ${
                m.from === 'ia' ? styles.ia : ''
              }`}
            >
              {m.text}
            </div>
          ))}
          <div className={`${styles.bubble} ${styles.left} ${styles.typing}`}>
            <i /> <i /> <i />
          </div>
        </div>
      </div>
    </div>
  )
}
