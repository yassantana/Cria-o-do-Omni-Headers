import type { ChannelId } from '@app-types'

interface ChannelGlyphProps {
  channel: ChannelId
  size?: number
  className?: string
  /** Usa a cor da marca do canal. Se false, herda currentColor. */
  branded?: boolean
}

const BRAND_COLOR: Record<ChannelId, string> = {
  whatsapp: 'var(--ch-whatsapp)',
  instagram: 'var(--ch-instagram)',
  facebook: 'var(--ch-facebook)',
  telegram: 'var(--ch-telegram)',
  email: 'var(--ch-email)',
  webchat: 'var(--ch-webchat)',
}

/** Icones de canal (glyphs proprios e simplificados — nao sao logos oficiais). */
export function ChannelGlyph({ channel, size = 24, className, branded = true }: ChannelGlyphProps) {
  const color = branded ? BRAND_COLOR[channel] : 'currentColor'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={color}
      aria-hidden="true"
      role="img"
    >
      {channel === 'whatsapp' && (
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.6-5.9c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.1-.3.2-.5 0-.7-.3-1.4-.6-2-1.5-.2-.3.2-.3.5-.9.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.3-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.6 4 3.5 1.5.6 2 .7 2.7.5.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z" />
      )}
      {channel === 'instagram' && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5.5" fill="none" stroke={color} strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.2" fill={color} />
        </>
      )}
      {channel === 'facebook' && (
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
      )}
      {channel === 'telegram' && (
        <path d="M21.9 4.4 18.8 19c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-1 .5l.3-4.7L17.4 6c.4-.3-.1-.5-.6-.2L7.2 12 2.6 10.6c-1-.3-1-1 .2-1.5l17.6-6.8c.8-.3 1.6.2 1.5 1.1Z" />
      )}
      {channel === 'email' && (
        <>
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" fill="none" stroke={color} strokeWidth="1.8" />
          <path d="M3.5 6.5 12 12.5l8.5-6" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {channel === 'webchat' && (
        <path d="M12 3C6.8 3 3 6.6 3 11c0 2.4 1.2 4.5 3 6v4l3.7-2.2c.7.1 1.5.2 2.3.2 5.2 0 9-3.6 9-8s-3.8-8-9-8Z" />
      )}
    </svg>
  )
}
