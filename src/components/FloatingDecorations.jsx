import { useMemo } from 'react'

const COLORS = ['#F4C6C3', '#F7E5A7', '#C9DCC5', '#C9D8EA', '#D9CEE9']

/** Small hand-drawn-ish shapes used all over the site. */
export function Doodle({ type = 'heart', size = 24, color = '#F4C6C3', className = '', style }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', className, style, 'aria-hidden': true, focusable: false }
  switch (type) {
    case 'star':
      return (
        <svg {...common}>
          <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.7L12 17.5 6.1 20.8l1.3-6.7L2.5 9.5l6.6-.8z" fill={color} stroke="#70574C" strokeWidth="1" strokeLinejoin="round" opacity="0.9" />
        </svg>
      )
    case 'flower':
      return (
        <svg {...common}>
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="12" cy="6.5" rx="3.2" ry="4.4" fill={color} stroke="#70574C" strokeWidth="0.8" transform={`rotate(${r} 12 12)`} />
          ))}
          <circle cx="12" cy="12" r="2.6" fill="#F7E5A7" stroke="#70574C" strokeWidth="0.8" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg {...common}>
          <path d="M12 2c.8 5.2 3.8 8.2 10 10-6.2 1.8-9.2 4.8-10 10-.8-5.2-3.8-8.2-10-10 6.2-1.8 9.2-4.8 10-10z" fill={color} stroke="#70574C" strokeWidth="0.9" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M12 21s-8-5.2-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.8-8 11-8 11z" fill={color} stroke="#70574C" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      )
  }
}

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

/** Fixed, non-interactive layer of slowly drifting doodles. */
export default function FloatingDecorations({ count = 16, opacity = 1 }) {
  const items = useMemo(() => {
    const r = rng(7)
    const types = ['heart', 'star', 'flower', 'sparkle']
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      type: types[i % types.length],
      color: COLORS[Math.floor(r() * COLORS.length)],
      left: 3 + r() * 92,
      top: 3 + r() * 90,
      size: 14 + r() * 20,
      dur: 8 + r() * 8,
      delay: -r() * 8,
      rot: Math.round(r() * 40 - 20),
      // hide half of them on small screens to keep things calm and fast
      mobileHidden: i % 2 === 1,
    }))
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000" style={{ opacity }} aria-hidden="true">
      {items.map((d) => (
        <Doodle
          key={d.id}
          type={d.type}
          size={d.size}
          color={d.color}
          className={`float-slow absolute ${d.mobileHidden ? 'hidden sm:block' : ''}`}
          style={{ left: `${d.left}%`, top: `${d.top}%`, '--dur': `${d.dur}s`, '--delay': `${d.delay}s`, '--r': `${d.rot}deg` }}
        />
      ))}
    </div>
  )
}
