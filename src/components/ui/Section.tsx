import type { ReactNode } from 'react'

import type { WithChildren, WithClassName } from '@app-types'
import { cn } from '@utils'
import styles from './Section.module.css'

interface SectionProps extends WithChildren, WithClassName {
  id?: string
  /** Faixa alternada de fundo. */
  tone?: 'base' | 'elevated'
  /** Elementos decorativos absolutos (auras, grids) renderizados atras. */
  decoration?: ReactNode
}

/** Bloco semantico de pagina, com ritmo vertical e camada decorativa opcional. */
export function Section({ id, children, className, tone = 'base', decoration }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('section', styles.section, tone === 'elevated' && styles.elevated, className)}
    >
      {decoration && <div className={styles.decoration}>{decoration}</div>}
      <div className={styles.body}>{children}</div>
    </section>
  )
}
