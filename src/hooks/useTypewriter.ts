import { useEffect, useRef, useState } from 'react'

interface Options {
  /** ms por caractere ao digitar. */
  typeSpeed?: number
  /** pausa (ms) ao terminar de digitar antes de apagar. */
  pause?: number
  /** se deve apagar e repetir em loop. */
  loop?: boolean
  /** desativa a animacao (mostra o texto completo). */
  disabled?: boolean
}

/**
 * Efeito maquina de escrever. Digita `phrases` em sequencia.
 * Com `disabled` (ex.: reduced-motion) mostra a primeira frase completa.
 */
export function useTypewriter(phrases: string[], opts: Options = {}): string {
  const { typeSpeed = 38, pause = 1600, loop = true, disabled = false } = opts
  const [text, setText] = useState(disabled ? (phrases[0] ?? '') : '')
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (disabled) {
      setText(phrases[0] ?? '')
      return
    }
    let phrase = 0
    let char = 0
    let deleting = false

    const tick = () => {
      const current = phrases[phrase] ?? ''
      if (!deleting) {
        char++
        setText(current.slice(0, char))
        if (char >= current.length) {
          if (!loop && phrase === phrases.length - 1) return
          deleting = true
          timer.current = setTimeout(tick, pause)
          return
        }
      } else {
        char--
        setText(current.slice(0, char))
        if (char <= 0) {
          deleting = false
          phrase = (phrase + 1) % phrases.length
        }
      }
      timer.current = setTimeout(tick, deleting ? typeSpeed / 2 : typeSpeed)
    }

    timer.current = setTimeout(tick, 400)
    return () => clearTimeout(timer.current)
  }, [phrases, typeSpeed, pause, loop, disabled])

  return text
}
