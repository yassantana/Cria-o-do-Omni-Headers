/**
 * Junta classNames condicionais em uma unica string, ignorando valores
 * falsy. Substituto leve para `clsx` enquanto nao houver dependencia extra.
 *
 * @example
 * cn('btn', isActive && 'btn--active', undefined) // 'btn btn--active'
 */
export type ClassValue = string | number | null | undefined | false

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
