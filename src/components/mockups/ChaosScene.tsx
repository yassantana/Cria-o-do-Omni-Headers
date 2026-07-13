import { motion, useReducedMotion } from 'framer-motion'

import { ChannelGlyph } from '@components/icons'
import type { ChannelId } from '@app-types'
import styles from './ChaosScene.module.css'

interface Bubble {
  channel: ChannelId
  text: string
  unread: number
  x: string
  y: string
  rot: number
}

const bubbles: Bubble[] = [
  { channel: 'whatsapp', text: 'Alguem viu minha mensagem??', unread: 7, x: '2%', y: '8%', rot: -6 },
  { channel: 'instagram', text: 'Oi, tem alguem ai?', unread: 3, x: '52%', y: '0%', rot: 5 },
  { channel: 'email', text: 'Aguardo retorno urgente', unread: 12, x: '60%', y: '40%', rot: -4 },
  { channel: 'facebook', text: 'Ninguem respondeu ainda', unread: 5, x: '6%', y: '52%', rot: 7 },
  { channel: 'telegram', text: 'Cade o atendimento?', unread: 2, x: '36%', y: '62%', rot: -8 },
  { channel: 'webchat', text: 'Vou desistir...', unread: 1, x: '30%', y: '26%', rot: 3 },
]

/** Cena ilustrativa do "antes": mensagens espalhadas e sem resposta (caos). */
export function ChaosScene() {
  const reduce = useReducedMotion()
  return (
    <div className={styles.scene} aria-hidden="true">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={styles.bubble}
          style={{ left: b.x, top: b.y, rotate: `${b.rot}deg` }}
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className={styles.ch}>
            <ChannelGlyph channel={b.channel} size={16} />
          </span>
          <span className={styles.text}>{b.text}</span>
          <span className={styles.badge}>{b.unread}</span>
        </motion.div>
      ))}
      <div className={styles.overload}>
        <span>+48</span>
        <small>nao lidas</small>
      </div>
    </div>
  )
}
