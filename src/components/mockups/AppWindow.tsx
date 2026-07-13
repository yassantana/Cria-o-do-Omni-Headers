import type { ReactNode } from 'react'

import { cn } from '@utils'
import styles from './AppWindow.module.css'

interface AppWindowProps {
  children: ReactNode
  /** Texto da barra de endereco / titulo. */
  title?: string
  className?: string
  /** Remove o padding interno (para conteudo edge-to-edge). */
  flush?: boolean
}

/** Moldura de janela de app (chrome) para envolver mockups da plataforma. */
export function AppWindow({ children, title = 'app.omniheaders.com', className, flush }: AppWindowProps) {
  return (
    <div className={cn(styles.window, className)}>
      <div className={styles.bar}>
        <span className={styles.dots}>
          <i /> <i /> <i />
        </span>
        <span className={styles.address}>{title}</span>
        <span className={styles.spacer} />
      </div>
      <div className={cn(styles.content, flush && styles.flush)}>{children}</div>
    </div>
  )
}
