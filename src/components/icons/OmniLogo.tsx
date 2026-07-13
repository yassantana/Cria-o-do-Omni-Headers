import { useId } from 'react'

interface OmniMarkProps {
  size?: number
  className?: string
  /** Anima a orbita (girando lentamente). */
  spinning?: boolean
}

/** Simbolo "omni": canais orbitando um nucleo central (a caixa de entrada unica). */
export function OmniMark({ size = 32, className, spinning = false }: OmniMarkProps) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`omni-${id}`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F8DF7" />
          <stop offset="0.55" stopColor="#6E56F7" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* nucleo */}
      <circle cx="24" cy="24" r="6" fill={`url(#omni-${id})`} />
      <circle cx="24" cy="24" r="9.5" stroke={`url(#omni-${id})`} strokeWidth="1.5" opacity="0.45" />
      {/* orbitas + canais */}
      <g
        stroke={`url(#omni-${id})`}
        strokeWidth="2"
        style={
          spinning
            ? { transformOrigin: '24px 24px', animation: 'omni-spin 14s linear infinite' }
            : undefined
        }
      >
        <ellipse cx="24" cy="24" rx="20" ry="9" opacity="0.7" />
        <ellipse cx="24" cy="24" rx="20" ry="9" opacity="0.7" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="9" opacity="0.7" transform="rotate(120 24 24)" />
      </g>
      <circle cx="44" cy="24" r="2.6" fill="#22D3EE" />
      <circle cx="14" cy="6.7" r="2.6" fill="#6E56F7" />
      <circle cx="14" cy="41.3" r="2.6" fill="#4F8DF7" />
    </svg>
  )
}

interface OmniLogoProps {
  size?: number
  className?: string
  withText?: boolean
}

/** Logotipo completo: simbolo + "Omni Headers". */
export function OmniLogo({ size = 30, className, withText = true }: OmniLogoProps) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, lineHeight: 1 }}
    >
      <OmniMark size={size} />
      {withText && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: size * 0.62,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          <span className="gradient-text">Omni</span> Headers
        </span>
      )}
    </span>
  )
}
