import { ChannelGlyph } from '@components/icons'
import { Marquee } from '@components/ui'
import { CHANNELS } from '@constants'
import { useContent } from '@i18n'
import styles from './TrustBar.module.css'

export function TrustBar() {
  const c = useContent()
  return (
    <div className={styles.bar}>
      <div className="container container--wide">
        <p className={styles.label}>{c.trust.label}</p>
        <Marquee speed={32}>
          {CHANNELS.map((ch) => (
            <span key={ch.id} className={styles.item}>
              <ChannelGlyph channel={ch.id} size={22} />
              {ch.label}
            </span>
          ))}
          {/* placeholders elegantes para futuros logos de clientes */}
          {[1, 2, 3].map((n) => (
            <span key={`ph-${n}`} className={styles.placeholder}>
              {c.trust.placeholder}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
