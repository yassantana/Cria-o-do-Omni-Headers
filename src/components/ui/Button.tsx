import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { cn, handleAnchorClick } from '@utils'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  iconLeft?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

interface ButtonAsButton extends BaseProps {
  to?: undefined
  href?: undefined
  onClick?: () => void
  type?: 'button' | 'submit'
}
interface ButtonAsLink extends BaseProps {
  to: string
  href?: undefined
  onClick?: () => void
}
interface ButtonAsAnchor extends BaseProps {
  href: string
  to?: undefined
  onClick?: () => void
  /** Para links externos (abre em nova aba). */
  external?: boolean
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

/** Botao polimorfico: vira <button>, <Link> (rota interna) ou <a> (ancora/externo). */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    fullWidth,
    className,
    children,
  } = props

  const classes = cn(
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth && styles.full,
    className,
  )

  const inner = (
    <>
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </>
  )

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {inner}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const isAnchor = props.href.startsWith('#')
    const external = 'external' in props && props.external
    return (
      <a
        href={props.href}
        className={classes}
        onClick={(e) => {
          if (isAnchor) handleAnchorClick(e, props.href)
          props.onClick?.()
        }}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }

  const { onClick, type = 'button' } = props as ButtonAsButton
  return (
    <button type={type} className={classes} onClick={onClick}>
      {inner}
    </button>
  )
}
