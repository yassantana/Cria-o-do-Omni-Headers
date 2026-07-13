import { AnimatedNumber } from '@components/ui'
import { ChannelGlyph, Icon, type IconName, OmniMark } from '@components/icons'
import { channelVolume } from '@data'
import type { ChannelId } from '@app-types'
import { BarChart, DonutChart, Gauge, LineChart, Sparkline } from './charts'
import styles from './DashboardMockup.module.css'

const channelShort: Record<string, string> = {
  whatsapp: 'Whats',
  instagram: 'Insta',
  webchat: 'Chat',
  email: 'Email',
  telegram: 'Tele',
  facebook: 'Face',
}

const navIcons: IconName[] = ['barChart', 'inbox', 'bot', 'users', 'gear']

interface Kpi {
  label: string
  value?: number
  display?: string
  suffix?: string
  trend: string
  up: boolean
  spark: number[]
}

const kpis: Kpi[] = [
  { label: 'Conversas hoje', value: 127, trend: '+18%', up: true, spark: [4, 6, 5, 8, 7, 9, 11] },
  { label: '1a resposta', display: '2m14s', trend: '-32%', up: true, spark: [9, 7, 8, 5, 4, 3, 2] },
  { label: 'Resolvidas IA', value: 62, suffix: '%', trend: '+9%', up: true, spark: [3, 4, 4, 5, 6, 6, 7] },
  { label: 'SLA cumprido', value: 96, suffix: '%', trend: 'no prazo', up: true, spark: [8, 9, 9, 9, 10, 10, 10] },
]

const activity: { name: string; channel: ChannelId; action: string; time: string; tone: string }[] = [
  { name: 'Mariana Lopes', channel: 'whatsapp', action: 'agendou um horario', time: 'agora', tone: styles.tGreen },
  { name: 'Captain · IA', channel: 'webchat', action: 'resolveu 3 conversas', time: '2 min', tone: styles.tIris },
  { name: 'Pedro Henrique', channel: 'instagram', action: 'novo contato', time: '5 min', tone: styles.tBlue },
]

const agents = ['AC', 'RS', 'JV', 'MP']

/** Mockup do dashboard de metricas do Omni Headers (UI rica, ilustrativa). */
export function DashboardMockup() {
  return (
    <div className={styles.app}>
      <aside className={styles.side}>
        <OmniMark size={24} />
        <div className={styles.sideNav}>
          {navIcons.map((name, i) => (
            <span key={name} className={`${styles.sideBtn} ${i === 0 ? styles.sideActive : ''}`}>
              <Icon name={name} size={17} />
            </span>
          ))}
        </div>
      </aside>

      <div className={styles.dash}>
        <div className={styles.top}>
          <div>
            <div className={styles.title}>
              Painel de atendimento
              <span className={styles.live}>
                <i /> ao vivo
              </span>
            </div>
            <div className={styles.subtitle}>Visao geral · hoje</div>
          </div>
          <div className={styles.topRight}>
            <span className={styles.search}>
              <Icon name="target" size={13} /> Buscar…
            </span>
            <span className={styles.bell}>
              <Icon name="message" size={15} />
              <span className={styles.bellDot} />
            </span>
            <span className={styles.avatar}>AC</span>
          </div>
        </div>

        <div className={styles.kpis}>
          {kpis.map((k) => (
            <div key={k.label} className={styles.kpi}>
              <span className={styles.kpiLabel}>{k.label}</span>
              <span className={styles.kpiValue}>
                {k.display ? k.display : <AnimatedNumber value={k.value!} suffix={k.suffix} />}
              </span>
              <div className={styles.kpiFoot}>
                <span className={`${styles.kpiTrend} ${k.up ? styles.up : styles.down}`}>
                  <Icon name="arrowDown" size={11} className={k.up ? styles.flip : undefined} />
                  {k.trend}
                </span>
                <span className={styles.kpiSpark}>
                  <Sparkline data={k.spark} width={52} height={18} />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.panels}>
          <div className={`${styles.panel} ${styles.pWide}`}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Volume por canal</span>
              <span className={styles.panelTag}>conversas</span>
            </div>
            <BarChart
              data={channelVolume.map((c) => c.value)}
              labels={channelVolume.map((c) => channelShort[c.channel])}
              height={104}
            />
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Satisfacao</span>
            </div>
            <div className={styles.center}>
              <Gauge value={94} label="CSAT" display="94%" size={130} />
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Tempo de resposta</span>
              <span className={styles.panelTag}>7 dias</span>
            </div>
            <LineChart data={[9, 7, 8, 6, 5, 4, 3]} height={104} />
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Distribuicao</span>
            </div>
            <div className={styles.center}>
              <DonutChart
                size={118}
                segments={[
                  { value: 68, color: 'var(--ch-whatsapp)' },
                  { value: 24, color: 'var(--ch-instagram)' },
                  { value: 18, color: 'var(--ch-webchat)' },
                  { value: 12, color: 'var(--ch-email)' },
                ]}
                centervalue="6"
                centerLabel="canais"
              />
            </div>
          </div>

          <div className={`${styles.panel} ${styles.pWide}`}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Atividade recente</span>
              <span className={styles.agents}>
                {agents.map((a, i) => (
                  <span key={a} className={styles.agent} style={{ zIndex: agents.length - i }}>
                    {a}
                  </span>
                ))}
                <span className={styles.agentMore}>+8 online</span>
              </span>
            </div>
            <div className={styles.feed}>
              {activity.map((a) => (
                <div key={a.name} className={styles.feedItem}>
                  <span className={styles.feedCh}>
                    <ChannelGlyph channel={a.channel} size={14} />
                  </span>
                  <span className={styles.feedName}>{a.name}</span>
                  <span className={styles.feedAction}>{a.action}</span>
                  <span className={`${styles.feedTag} ${a.tone}`} />
                  <span className={styles.feedTime}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
