import type { ReactNode } from 'react'

import { cn } from '@utils'
import { Reveal } from './Reveal'
import styles from './NumberedHeading.module.css'

interface NumberedHeadingProps {
  /** Numero da secao no roteiro (ex.: "01"). */
  number?: string
  eyebrow: string
  title: ReactNode
  /** Texto introdutorio (padrao Cloud Bridge — em enfase suave). */
  intro?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

/** Cabecalho de secao no padrao consultivo Headers/Cloud Bridge: numero + rotulo + titulo. */
export function NumberedHeading({
  number,
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: NumberedHeadingProps) {
  return (
    <div className={cn(styles.head, align === 'center' ? styles.center : styles.left, className)}>
      <Reveal>
        <span className={styles.label}>
          {number && <span className={styles.number}>{number}</span>}
          <span className={styles.eyebrow}>{eyebrow}</span>
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className={styles.title}>{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className={styles.intro}>{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
