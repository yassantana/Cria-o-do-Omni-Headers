import type { ReactNode } from 'react'

import { cn } from '@utils'
import styles from './Marquee.module.css'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  className?: string
}

/** Faixa de rolagem infinita (logos, chips). Duplica o conteudo para loop continuo. */
export function Marquee({ children, speed = 36, className }: MarqueeProps) {
  return (
    <div className={cn(styles.wrap, className)}>
      <div className={styles.track} style={{ animationDuration: `${speed}s` }}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
