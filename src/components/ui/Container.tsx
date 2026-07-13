import type { WithChildren, WithClassName } from '@app-types'
import { cn } from '@utils'

interface ContainerProps extends WithChildren, WithClassName {
  width?: 'default' | 'wide' | 'narrow'
}

/** Centraliza o conteudo com largura maxima padronizada. */
export function Container({ children, className, width = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'container',
        width === 'wide' && 'container--wide',
        width === 'narrow' && 'container--narrow',
        className,
      )}
    >
      {children}
    </div>
  )
}
