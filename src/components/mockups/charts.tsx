import { motion, useReducedMotion } from 'framer-motion'
import { useId } from 'react'

import styles from './charts.module.css'

/* ------------------------------------------------------------------ BarChart */
interface BarChartProps {
  data: number[]
  labels?: string[]
  height?: number
}
export function BarChart({ data, labels, height = 120 }: BarChartProps) {
  const reduce = useReducedMotion()
  const max = Math.max(...data, 1)
  return (
    <div className={styles.bars} style={{ height }}>
      {data.map((v, i) => (
        <div className={styles.barCol} key={i}>
          <motion.div
            className={styles.bar}
            style={{ height: `${(v / max) * 100}%` }}
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
          {labels && <span className={styles.barLabel}>{labels[i]}</span>}
        </div>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------- LineChart */
interface LineChartProps {
  data: number[]
  width?: number
  height?: number
  showArea?: boolean
}
export function LineChart({ data, width = 260, height = 110, showArea = true }: LineChartProps) {
  const reduce = useReducedMotion()
  const id = useId().replace(/:/g, '')
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pad = 6
  const step = (width - pad * 2) / (data.length - 1)
  const points = data.map((v, i) => {
    const x = pad + i * step
    const y = pad + (1 - (v - min) / range) * (height - pad * 2)
    return [x, y] as const
  })
  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${points[points.length - 1][0].toFixed(1)} ${height - pad} L${points[0][0].toFixed(1)} ${height - pad} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`line-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(79,141,247,0.35)" />
          <stop offset="1" stopColor="rgba(79,141,247,0)" />
        </linearGradient>
        <linearGradient id={`stroke-${id}`} x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F8DF7" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {showArea && <path d={area} fill={`url(#line-${id})`} />}
      <motion.path
        d={line}
        stroke={`url(#stroke-${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#22D3EE" />
      ))}
    </svg>
  )
}

/* ----------------------------------------------------------------- DonutChart */
interface DonutSegment {
  value: number
  color: string
  label?: string
}
interface DonutChartProps {
  segments: DonutSegment[]
  size?: number
  thickness?: number
  centerLabel?: string
  centervalue?: string
}
export function DonutChart({
  segments,
  size = 140,
  thickness = 16,
  centerLabel,
  centervalue,
}: DonutChartProps) {
  const reduce = useReducedMotion()
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  let offset = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={thickness} />
      {segments.map((seg, i) => {
        const len = (seg.value / total) * c
        const dash = `${len} ${c - len}`
        const el = (
          <motion.circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={dash}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          />
        )
        offset += len
        return el
      })}
      {(centervalue || centerLabel) && (
        <>
          <text
            x="50%"
            y="47%"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight="700"
            fontSize={size * 0.2}
            fill="var(--text)"
          >
            {centervalue}
          </text>
          <text
            x="50%"
            y="62%"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize={size * 0.08}
            fill="var(--text-subtle)"
          >
            {centerLabel}
          </text>
        </>
      )}
    </svg>
  )
}

/* --------------------------------------------------------------------- Gauge */
interface GaugeProps {
  value: number // 0-100
  size?: number
  label?: string
  display?: string
}
export function Gauge({ value, size = 150, label, display }: GaugeProps) {
  const reduce = useReducedMotion()
  const id = useId().replace(/:/g, '')
  const r = size / 2 - 12
  const cx = size / 2
  const cy = size / 2
  const semi = Math.PI * r
  const pct = Math.max(0, Math.min(100, value)) / 100

  return (
    <svg width={size} height={size / 2 + 24} viewBox={`0 0 ${size} ${size / 2 + 24}`} aria-hidden="true">
      <defs>
        <linearGradient id={`gauge-${id}`} x1="0" y1="0" x2={size} y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1366E0" />
          <stop offset="0.5" stopColor="#6E56F7" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="var(--surface-3)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <motion.path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={`url(#gauge-${id})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={semi}
        initial={reduce ? false : { strokeDashoffset: semi }}
        whileInView={{ strokeDashoffset: semi * (1 - pct) }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <text
        x="50%"
        y={cy - 2}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="700"
        fontSize={size * 0.16}
        fill="var(--text)"
      >
        {display ?? `${value}%`}
      </text>
      {label && (
        <text
          x="50%"
          y={cy + 16}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={size * 0.07}
          fill="var(--text-subtle)"
        >
          {label}
        </text>
      )}
    </svg>
  )
}

/* ----------------------------------------------------------------- Sparkline */
export function Sparkline({ data, width = 96, height = 30 }: { data: number[]; width?: number; height?: number }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)
  const d = data
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)} ${(height - ((v - min) / range) * height).toFixed(1)}`)
    .join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
      <path d={d} stroke="var(--cyan-500)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
