import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

import { DashboardMockup } from './DashboardMockup'
import s from './DashboardScene.module.css'

export function DashboardScene() {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (inView || reduced) setVisible(true)
  }, [inView, reduced])

  return (
    <motion.div
      ref={ref}
      className={s.scene}
      aria-hidden="true"
      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 14 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <DashboardMockup />
    </motion.div>
  )
}
