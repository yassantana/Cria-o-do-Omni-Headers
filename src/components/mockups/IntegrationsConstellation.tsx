import { useReducedMotion } from 'framer-motion'

import { Icon, OmniMark } from '@components/icons'
import styles from './IntegrationsConstellation.module.css'

/** Diagrama hub-and-spoke: Omni Headers no centro, sistemas integrados ao redor. */
export function IntegrationsConstellation({ categories }: { categories: readonly string[] }) {
  const reduce = useReducedMotion()
  const items = categories.slice(0, 6)
  const positions = items.map((_, i) => {
    const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2
    return { x: 50 + 38 * Math.cos(angle), y: 50 + 40 * Math.sin(angle) }
  })

  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg className={styles.lines} viewBox="0 0 100 100" preserveAspectRatio="none">
        {positions.map((p, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={p.x}
            y2={p.y}
            stroke="url(#int-grad)"
            strokeWidth="0.5"
            strokeDasharray="1.5 1.5"
            className={reduce ? undefined : styles.flow}
          />
        ))}
        <defs>
          <linearGradient id="int-grad" x1="0" y1="0" x2="100" y2="100">
            <stop stopColor="#4F8DF7" stopOpacity="0.6" />
            <stop offset="1" stopColor="#22D3EE" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.hub}>
        <OmniMark size={40} />
      </div>

      {items.map((label, i) => (
        <div
          key={label}
          className={styles.node}
          style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
        >
          <Icon name="plug" size={16} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
