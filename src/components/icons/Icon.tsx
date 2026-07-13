import type { ReactNode } from 'react'

export type IconName =
  | 'inbox'
  | 'sparkles'
  | 'bot'
  | 'flow'
  | 'barChart'
  | 'lineChart'
  | 'users'
  | 'shield'
  | 'plug'
  | 'tag'
  | 'clock'
  | 'check'
  | 'arrowRight'
  | 'arrowDown'
  | 'message'
  | 'gauge'
  | 'headset'
  | 'gear'
  | 'rocket'
  | 'graduation'
  | 'handshake'
  | 'store'
  | 'cart'
  | 'health'
  | 'briefcase'
  | 'building'
  | 'plus'
  | 'minus'
  | 'menu'
  | 'close'
  | 'bolt'
  | 'target'
  | 'layers'
  | 'chevronRight'
  | 'star'
  | 'quote'
  | 'globe'
  | 'phone'
  | 'mail'
  | 'refresh'

interface IconProps {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
}

const PATHS: Record<IconName, ReactNode> = {
  inbox: <path d="M3 13h4l2 3h6l2-3h4M5 13V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7l-1.5 4.5a2 2 0 0 1-1.9 1.5H8.4a2 2 0 0 1-1.9-1.5L5 13Z" />,
  sparkles: <path d="M12 3l1.8 4.6L18 9.5l-4.2 1.9L12 16l-1.8-4.6L6 9.5l4.2-1.9L12 3ZM19 14l.9 2.1 2.1.9-2.1.9L19 20l-.9-2.1-2.1-.9 2.1-.9L19 14Z" />,
  bot: <><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 4v4M8 13h.01M16 13h.01M9 16.5h6" /><path d="M2 12v3M22 12v3" /></>,
  flow: <><rect x="3" y="4" width="6" height="5" rx="1.5" /><rect x="15" y="4" width="6" height="5" rx="1.5" /><rect x="9" y="15" width="6" height="5" rx="1.5" /><path d="M6 9v3a2 2 0 0 0 2 2h1M18 9v3a2 2 0 0 1-2 2h-1" /></>,
  barChart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  lineChart: <path d="M3 3v18h18M7 14l3-4 3 2 5-7" />,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0M16 5.2a3.2 3.2 0 0 1 0 6.1M21 20a6 6 0 0 0-5-5.9" /></>,
  shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3ZM9 12l2 2 4-4" />,
  plug: <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0V8ZM12 16v5" />,
  tag: <path d="M3 12 12 3h7a2 2 0 0 1 2 2v7l-9 9-9-9ZM16.5 7.5h.01" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  check: <path d="M4 12.5 9.5 18 20 6" />,
  arrowRight: <path d="M4 12h16M14 6l6 6-6 6" />,
  arrowDown: <path d="M12 4v16M6 14l6 6 6-6" />,
  message: <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z" />,
  gauge: <><path d="M3 14a9 9 0 0 1 18 0" /><path d="M12 14l4-3M3 14h2M19 14h2M12 21a9 9 0 0 0 9-7" /></>,
  headset: <path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 1ZM20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 1ZM17 18a5 5 0 0 1-5 4" />,
  gear: <><circle cx="12" cy="12" r="3.2" /><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
  rocket: <path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5M9 19l-4-4c1-5 5-11 13-12 -1 8-7 12-12 13l-1 3ZM14.5 9.5h.01" />,
  graduation: <path d="M12 4 2 9l10 5 10-5-10-5ZM6 11.5V16c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-4.5" />,
  handshake: <path d="M8 11 5 8l4-3 3 2 3-2 4 3-3 3M8 11l3 3 2-2 3 3-2 2-2-1-2 2-3-3-2 1-2-2 4-3Z" />,
  store: <path d="M4 9 5 4h14l1 5M4 9h16M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9M4 9a2.5 2.5 0 0 0 4 1 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4-1M9 20v-5h6v5" />,
  cart: <path d="M3 4h2l2.2 11a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.8L20 7H6M9 20h.01M17 20h.01" />,
  health: <path d="M9 4h6v3h3v6h-3v3H9v-3H6V7h3V4ZM4 17c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>,
  building: <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17M15 9h3a1 1 0 0 1 1 1v11M3 21h18M8 7h3M8 11h3M8 15h3" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>,
  layers: <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17l9 5 9-5" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  star: <path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8L12 3Z" />,
  quote: <path d="M9 7c-2.5 0-4 2-4 4.5S6.5 16 9 16c0-3 1-4 3-5l-1-2c-1 .2-2 .2-2-2ZM18 7c-2.5 0-4 2-4 4.5S15.5 16 18 16c0-3 1-4 3-5l-1-2c-1 .2-2 .2-2-2Z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21C9.5 18.5 8.5 15 8.5 12S9.5 5.5 12 3Z" /></>,
  phone: <path d="M5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  refresh: <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4" />,
}

/** Icone de linha generico (stroke = currentColor). */
export function Icon({ name, size = 24, className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
