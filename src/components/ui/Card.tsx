import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@utils'
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  className?: string
  /** Realce no hover (eleva e ilumina a borda). */
  interactive?: boolean
  /** Brilho de gradiente sutil no topo. */
  glow?: boolean
  style?: CSSProperties
}

/** Card base do design system (superficie, borda, raio). */
export function Card({ children, className, interactive, glow, style }: CardProps) {
  return (
    <div
      className={cn(styles.card, interactive && styles.interactive, glow && styles.glow, className)}
      style={style}
    >
      {children}
    </div>
  )
}
