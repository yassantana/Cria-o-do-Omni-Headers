import { motion } from 'framer-motion'

import { ChannelGlyph, Icon, OmniMark } from '@components/icons'
import { mockConversations, mockThread, statusColor } from '@data'
import styles from './InboxMockup.module.css'

const navIcons = ['inbox', 'bot', 'flow', 'barChart', 'users'] as const

/** Mockup da caixa de entrada unificada do Omni Headers (UI ilustrativa). */
export function InboxMockup() {
  const active = mockConversations[0]

  return (
    <div className={styles.inbox}>
      {/* Rail de navegacao do app */}
      <aside className={styles.nav}>
        <OmniMark size={26} />
        <div className={styles.navIcons}>
          {navIcons.map((name, i) => (
            <button key={name} className={`${styles.navBtn} ${i === 0 ? styles.navActive : ''}`} tabIndex={-1}>
              <Icon name={name} size={18} />
            </button>
          ))}
        </div>
        <button className={styles.navBtn} tabIndex={-1}>
          <Icon name="gear" size={18} />
        </button>
      </aside>

      {/* Lista de conversas */}
      <div className={styles.list}>
        <div className={styles.listHead}>
          <span className={styles.listTitle}>Conversas</span>
          <span className={styles.allChip}>Todos os canais</span>
        </div>
        <div className={styles.convs}>
          {mockConversations.map((c, i) => (
            <motion.button
              key={c.id}
              className={`${styles.conv} ${i === 0 ? styles.convActive : ''}`}
              tabIndex={-1}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
            >
              <span className={styles.avatar}>
                {c.name.charAt(0)}
                <span className={styles.avatarCh}>
                  <ChannelGlyph channel={c.channel} size={13} />
                </span>
              </span>
              <span className={styles.convBody}>
                <span className={styles.convTop}>
                  <span className={styles.convName}>{c.name}</span>
                  <span className={styles.convTime}>{c.time}</span>
                </span>
                <span className={styles.convPreview}>{c.preview}</span>
              </span>
              {c.unread ? <span className={styles.unread}>{c.unread}</span> : null}
              <span className={styles.statusDot} style={{ background: statusColor[c.status] }} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Thread */}
      <div className={styles.thread}>
        <div className={styles.threadHead}>
          <span className={styles.avatar}>
            {active.name.charAt(0)}
            <span className={styles.avatarCh}>
              <ChannelGlyph channel={active.channel} size={13} />
            </span>
          </span>
          <div>
            <div className={styles.threadName}>{active.name}</div>
            <div className={styles.threadMeta}>
              <span className={styles.online} /> WhatsApp · online
            </div>
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>VIP</span>
            <span className={styles.tag}>Agendamento</span>
          </div>
        </div>

        <div className={styles.messages}>
          {mockThread.map((m, i) => (
            <motion.div
              key={i}
              className={`${styles.msgRow} ${m.from === 'cliente' ? styles.left : styles.right}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.18, duration: 0.4 }}
            >
              <div className={`${styles.bubble} ${styles[m.from]}`}>
                {m.from === 'ia' && <span className={styles.iaTag}>Captain · IA</span>}
                {m.text}
                <span className={styles.msgTime}>{m.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.composer}>
          <div className={styles.suggestion}>
            <Icon name="sparkles" size={14} />
            Captain sugeriu uma resposta
          </div>
          <div className={styles.inputRow}>
            <span className={styles.input}>Digite ou use a sugestao da IA…</span>
            <span className={styles.send}>
              <Icon name="arrowRight" size={16} />
            </span>
          </div>
        </div>
      </div>

      {/* Painel do contato + IA */}
      <aside className={styles.panel}>
        <div className={styles.panelContact}>
          <span className={styles.panelAvatar}>{active.name.charAt(0)}</span>
          <div className={styles.panelName}>{active.name}</div>
          <div className={styles.panelSub}>Cliente desde 2024</div>
        </div>
        <div className={styles.panelCard}>
          <div className={styles.panelLabel}>Resumo da IA</div>
          <p className={styles.panelText}>Cliente quer reservar para hoje as 15h. Sugestao enviada e confirmada.</p>
        </div>
        <div className={styles.panelStats}>
          <div className={styles.panelStat}>
            <span className={styles.panelStatVal}>2min</span>
            <span className={styles.panelStatLbl}>1a resposta</span>
          </div>
          <div className={styles.panelStat}>
            <span className={styles.panelStatVal}>4</span>
            <span className={styles.panelStatLbl}>conversas</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
