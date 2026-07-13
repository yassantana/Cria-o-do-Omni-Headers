import { motion, useReducedMotion } from 'framer-motion'

import { ChannelGlyph, Icon } from '@components/icons'
import { CHANNELS } from '@constants'
import styles from './ChannelOrbit.module.css'

const SIZE = 380
const CENTER = SIZE / 2
const RADIUS = 150

/** Visual do hero: canais orbitam e se conectam a caixa de entrada central. */
export function ChannelOrbit() {
  const reduce = useReducedMotion()
  const positions = CHANNELS.map((_, i) => {
    const angle = (i / CHANNELS.length) * Math.PI * 2 - Math.PI / 2
    return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) }
  })

  return (
    <div className={styles.wrap} style={{ width: SIZE, height: SIZE }} aria-hidden="true">
      {/* aneis concentricos */}
      <span className={styles.ring} style={{ width: RADIUS * 2, height: RADIUS * 2 }} />
      <span className={styles.ring} style={{ width: RADIUS * 1.36, height: RADIUS * 1.36 }} />

      {/* linhas de conexao */}
      <svg className={styles.lines} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {positions.map((p, i) => (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={p.x}
            y2={p.y}
            stroke="url(#orbit-grad)"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            className={reduce ? undefined : styles.flowLine}
          />
        ))}
        <defs>
          <linearGradient id="orbit-grad" x1="0" y1="0" x2={SIZE} y2={SIZE} gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F8DF7" stopOpacity="0.7" />
            <stop offset="1" stopColor="#22D3EE" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* grupo rotativo com os canais */}
      <motion.div
        className={styles.orbit}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {positions.map((p, i) => (
          <motion.div
            key={CHANNELS[i].id}
            className={styles.bubble}
            style={{ left: p.x, top: p.y }}
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            <ChannelGlyph channel={CHANNELS[i].id} size={26} />
          </motion.div>
        ))}
      </motion.div>

      {/* nucleo central — a caixa de entrada unica */}
      <div className={styles.core}>
        <div className={styles.coreInner}>
          <Icon name="inbox" size={30} />
        </div>
        <span className={styles.coreLabel}>Uma caixa de entrada</span>
        <span className={styles.pulse} />
        <span className={styles.pulse} style={{ animationDelay: '1.4s' }} />
      </div>
    </div>
  )
}
