import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const COLORS = ['#F4C6C3', '#F7E5A7', '#C9DCC5', '#C9D8EA', '#D9CEE9', '#F8DDE0']

function rng(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * mode="burst": one pop from the middle of the screen (parent unmounts it).
 * mode="rain" : a gentle, endless fall of paper pieces.
 */
export default function Confetti({ mode = 'burst', count = 36, seed = 3 }) {
  const reduce = useReducedMotion()
  const pieces = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: COLORS[Math.floor(r() * COLORS.length)],
      w: 6 + r() * 8,
      h: 6 + r() * 10,
      round: r() > 0.6,
      x: (r() - 0.5) * (mode === 'burst' ? 420 : 0),
      left: r() * 100,
      up: 120 + r() * 200,
      drift: (r() - 0.5) * 120,
      spin: (r() - 0.5) * 720,
      dur: mode === 'burst' ? 1.8 + r() * 1.2 : 7 + r() * 6,
      delay: mode === 'burst' ? r() * 0.15 : r() * 8,
    }))
  }, [count, mode, seed])

  if (reduce) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p) =>
        mode === 'burst' ? (
          <motion.span
            key={p.id}
            className="absolute left-1/2 top-1/2 block"
            style={{ width: p.w, height: p.h, background: p.color, borderRadius: p.round ? '50%' : 2 }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: p.x, y: [0, -p.up, 360], opacity: [1, 1, 0], rotate: p.spin }}
            transition={{ duration: p.dur, delay: p.delay, ease: 'easeOut', times: [0, 0.35, 1] }}
          />
        ) : (
          <motion.span
            key={p.id}
            className="absolute block"
            style={{ left: `${p.left}%`, top: -20, width: p.w, height: p.h, background: p.color, borderRadius: p.round ? '50%' : 2, opacity: 0.85 }}
            animate={{ y: '110vh', x: p.drift, rotate: p.spin }}
            transition={{ duration: p.dur, delay: p.delay, ease: 'linear', repeat: Infinity }}
          />
        ),
      )}
    </div>
  )
}
