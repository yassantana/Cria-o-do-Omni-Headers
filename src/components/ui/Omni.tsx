import { createPortal } from 'react-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ROUTES, whatsappLink } from '@constants'
import s from './Omni.module.css'

export function Omni() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const fabRef = useRef<HTMLButtonElement>(null)
  const lpRef = useRef<SVGEllipseElement>(null)
  const rpRef = useRef<SVGEllipseElement>(null)
  const leyeRef = useRef<SVGGElement>(null)
  const reyeRef = useRef<SVGGElement>(null)

  // ── Cursor following ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (reduced) return
    const handleMove = (e: MouseEvent) => {
      const fab = fabRef.current
      if (!fab) return
      const rect = fab.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist < 1) return
      const maxMove = 1.1
      const ratio = Math.min(1, dist / 180)
      const px = (dx / dist) * ratio * maxMove
      const py = (dy / dist) * ratio * maxMove
      lpRef.current?.setAttribute('cx', (7.5 + px).toFixed(2))
      lpRef.current?.setAttribute('cy', (11 + py).toFixed(2))
      rpRef.current?.setAttribute('cx', (14.5 + px).toFixed(2))
      rpRef.current?.setAttribute('cy', (11 + py).toFixed(2))
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [reduced])

  // ── Blinking ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (reduced) return
    let timeout: ReturnType<typeof setTimeout>

    const blink = () => {
      const l = leyeRef.current
      const r = reyeRef.current
      if (l && r) {
        l.style.transform = 'scaleY(0.04)'
        r.style.transform = 'scaleY(0.04)'
        setTimeout(() => {
          if (leyeRef.current) leyeRef.current.style.transform = 'scaleY(1)'
          if (reyeRef.current) reyeRef.current.style.transform = 'scaleY(1)'
        }, 110)
      }
      timeout = setTimeout(blink, 2200 + Math.random() * 3200)
    }

    timeout = setTimeout(blink, 1800 + Math.random() * 1400)
    return () => clearTimeout(timeout)
  }, [reduced])

  // ── Close on Escape or scroll ─────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onScroll = () => setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true, once: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [open])

  const toggle = useCallback(() => setOpen(o => !o), [])
  const close = useCallback(() => setOpen(false), [])

  const cardAnim = {
    initial: { opacity: 0, y: reduced ? 0 : 8, scale: reduced ? 1 : 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: reduced ? 0 : 6, scale: reduced ? 1 : 0.97 },
    transition: { duration: reduced ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] as const },
  }

  return createPortal(
    <>
      {/* Backdrop — closes card when clicking outside */}
      {open && <div className={s.backdrop} onClick={close} aria-hidden="true" />}

      {/* CTA card */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={s.card}
            key="omni-card"
            role="dialog"
            aria-label="Fale com a equipe"
            {...cardAnim}
          >
            <a href={ROUTES.scheduleDemo} className={s.primary} onClick={close}>
              Agendar demonstração
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={s.secondary}
              onClick={close}
            >
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single floating element */}
      <div className={s.fabWrap}>
        <button
          ref={fabRef}
          className={`${s.fab}${open ? ` ${s.fabOpen}` : ''}`}
          onClick={toggle}
          aria-label="Falar com a equipe Omni Headers"
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <svg viewBox="0 0 22 22" width="22" height="22" aria-hidden="true">
            <g ref={leyeRef} className={s.eye}>
              <ellipse cx="7.5" cy="11" rx="2.8" ry="3.2" fill="rgba(255,255,255,0.18)" />
              <ellipse ref={lpRef} cx="7.5" cy="11" rx="1.6" ry="2" fill="white" />
            </g>
            <g ref={reyeRef} className={s.eye}>
              <ellipse cx="14.5" cy="11" rx="2.8" ry="3.2" fill="rgba(255,255,255,0.18)" />
              <ellipse ref={rpRef} cx="14.5" cy="11" rx="1.6" ry="2" fill="white" />
            </g>
          </svg>
        </button>
      </div>
    </>,
    document.body
  )
}
