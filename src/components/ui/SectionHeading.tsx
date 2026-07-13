import type { ReactNode } from 'react'

import { cn } from '@utils'
import { Reveal } from './Reveal'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'center' | 'left'
  className?: string
  /** Largura maxima do bloco de texto. */
  width?: 'default' | 'narrow' | 'wide'
}

/** Cabecalho padrao de secao: eyebrow + titulo + subtitulo, com reveal. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  width = 'default',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        styles.head,
        align === 'left' ? styles.left : styles.center,
        styles[width],
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className={cn('eyebrow', styles.eyebrow)}>
            <span className={styles.dot} />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={styles.title}>{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={styles.subtitle}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
