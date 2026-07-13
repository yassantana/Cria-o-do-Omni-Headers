import type { ReactNode } from 'react'

import { cn } from '@utils'
import styles from './Badge.module.css'

interface BadgeProps {
  children: ReactNode
  icon?: ReactNode
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'iris'
  className?: string
}

/** Pill compacto para rotulos, status e chips. */
export function Badge({ children, icon, tone = 'neutral', className }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[tone], className)}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  )
}
