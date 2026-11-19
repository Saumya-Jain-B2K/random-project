import { useEffect, useState } from 'react'
import MusicPlayer from './MusicPlayer.jsx'

const LINKS = [
  { id: 'letter', label: 'LETTER' },
  { id: 'scrapbook', label: 'SCRAPBOOK' },
  { id: 'memories', label: 'MEMORIES' },
  { id: 'notes', label: 'NOTES' },
  { id: 'birthday', label: 'BIRTHDAY' },
]

export default function SiteHeader({ locked = false }) {
  const [active, setActive] = useState(locked ? 'open' : 'letter')

  useEffect(() => {
    if (locked) {
      setActive('open')
      return
    }
    const nodes = LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (!('IntersectionObserver' in window) || !nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [locked])

  const goTo = (id) => {
    if (locked) {
      if (id === 'open') window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="site-header sticky top-0 z-50 border-b border-cocoa/10 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-7">
        <button
          type="button"
          onClick={() => goTo(locked ? 'open' : 'letter')}
          className="group flex shrink-0 items-center gap-3 text-left"
          aria-label="Back to the beginning"
        >
          {/* <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/40 font-display text-sm text-cocoa transition group-hover:bg-petal">AP</span> */}
          <span className="max-w-[112px] font-sans text-[10px] font-bold leading-[1.35] tracking-[0.2em] text-cocoa sm:max-w-none sm:text-[11px]">
            SOMETHING SPECIAL FOR<br className="sm:hidden" /> YOU ♡
          </span>
        </button>

        <nav className="no-scrollbar flex min-w-0 flex-1 items-center justify-center gap-4 overflow-x-auto px-1 sm:gap-6 lg:gap-8" aria-label="Birthday website sections">
          <button
            type="button"
            onClick={() => goTo(locked ? 'open' : 'letter')}
            aria-current={active === 'open' ? 'location' : undefined}
            className={`nav-link shrink-0 py-3 font-sans text-[9px] font-medium tracking-[0.15em] transition-colors sm:text-[10px] sm:tracking-[0.18em] ${active === 'open' ? 'text-ink' : locked ? 'text-cocoa/25' : 'text-cocoa/45'}`}
          >
            <span className="mr-2 text-[9px]">{active === 'open' ? '●' : '○'}</span>OPEN
          </button>
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goTo(link.id)}
              disabled={locked}
              aria-current={active === link.id ? 'location' : undefined}
              aria-disabled={locked}
              className={`nav-link relative shrink-0 py-3 font-sans text-[9px] font-medium tracking-[0.15em] transition-colors sm:text-[10px] sm:tracking-[0.18em] ${active === link.id ? 'text-ink' : locked ? 'cursor-not-allowed text-cocoa/25' : 'text-cocoa/55 hover:text-cocoa'}`}
            >
              <span className="mr-2 text-[9px]">{active === link.id ? '●' : '○'}</span>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="shrink-0">
          <MusicPlayer compact />
        </div>
      </div>
    </header>
  )
}
