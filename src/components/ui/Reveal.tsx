import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Atraso em segundos (para stagger manual). */
  delay?: number
  /** Direcao da entrada. */
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  /** Distancia do deslocamento inicial (px). */
  distance?: number
  as?: 'div' | 'li' | 'span'
}

const OFFSET: Record<NonNullable<RevealProps['from']>, { x?: number; y?: number }> = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
  none: {},
}

/** Revela o conteudo ao entrar no viewport (fade + deslocamento). Respeita reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  from = 'up',
  className,
  distance = 28,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion()
  const off = OFFSET[from]
  const MotionTag = motion[as] as typeof motion.div

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: (off.x ?? 0) * distance, y: (off.y ?? 0) * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
