import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Polaroid from './Polaroid.jsx'
import SafeImage from './SafeImage.jsx'
import ScreenshotViewer from './ScreenshotViewer.jsx'
import SurpriseButton from './SurpriseButton.jsx'
import { Doodle } from './FloatingDecorations.jsx'
import { gallery } from '../data/memories.js'
import { useAudioContext } from '../hooks/useAudio.js'

const ROT = [-4, 3, -2, 5, -3, 2, 4, -5]
const TAPE = ['pink', 'yellow', 'sage', 'powder', 'lavender']
const rot = (i) => ROT[i % ROT.length]
const tape = (i) => TAPE[i % TAPE.length]

/* ---------- screenshot card: never cropped, opens a lightbox ---------- */
function ScreenshotCard({ item, index, onOpen }) {
  return (
    <motion.figure
      className="m-0 mb-6 break-inside-avoid"
      initial={{ opacity: 0, y: 40, rotate: rot(index) + 6 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot(index) * 0.5 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 15, delay: (index % 3) * 0.08 }}
      whileHover={{ scale: 1.03, rotate: 0 }}
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`Enlarge screenshot${item.caption ? `: ${item.caption}` : ''}`}
        className="block w-full rounded-2xl border-2 border-cocoa/20 bg-[#FFFDF8] p-2 text-left shadow-[0_8px_20px_rgba(73,61,56,0.18)]"
      >
        <SafeImage src={item.src} alt={item.alt || item.caption || 'Conversation screenshot'} natural className="rounded-lg" />
      </button>
      {item.caption && <figcaption className="mt-2 px-1 text-center font-hand text-xl text-ink sm:text-2xl">{item.caption}</figcaption>}
    </motion.figure>
  )
}

/* Renders either a Polaroid or a screenshot card depending on item.type */
function Memory({ item, index, onOpen, className }) {
  if (item.type === 'screenshot') return <ScreenshotCard item={item} index={index} onOpen={onOpen} />
  return <Polaroid item={item} rotate={rot(index)} tape={tape(index)} delay={(index % 3) * 0.08} className={className} />
}

/* ---------- layouts ---------- */
function Scatter({ items, onOpen }) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item, i) => (
        <div key={item.src + i} className={`mx-auto w-full max-w-[280px] ${i % 2 === 1 ? 'md:mt-12' : ''}`}>
          <Memory item={item} index={i} onOpen={onOpen} />
        </div>
      ))}
    </div>
  )
}

function Strip({ items, onOpen }) {
  return (
    <div className="relative">
      <p className="mb-2 text-center font-hand text-xl text-cocoa sm:hidden" aria-hidden="true">swipe →</p>
      <div
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto bg-cocoa/10 px-6 py-10 sm:justify-center"
        tabIndex={0}
        role="region"
        aria-label="Horizontal strip of memories"
      >
        {items.map((item, i) => (
          <div key={item.src + i} className="w-56 shrink-0 snap-center sm:w-60">
            <Memory item={item} index={i} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Stack({ items }) {
  const [order, setOrder] = useState(() => items.map((_, i) => i))
  const next = () => setOrder((o) => [...o.slice(1), o[0]])
  return (
    <div className="flex flex-col items-center gap-6 px-6">
      <div className="relative h-[22rem] w-[15rem] sm:h-[24rem] sm:w-[16.5rem]">
        {items.map((item, i) => {
          const pos = order.indexOf(i)
          return (
            <motion.div
              key={item.src + i}
              className="absolute inset-0"
              animate={{ x: pos * 12, y: pos * 10, rotate: pos === 0 ? 0 : rot(i) * 1.2, zIndex: items.length - pos, scale: 1 - pos * 0.03 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            >
              <Polaroid item={item} entrance={false} tape={tape(i)} className={pos === 0 ? 'cursor-pointer' : ''} onClick={pos === 0 ? next : undefined} />
            </motion.div>
          )
        })}
      </div>
      <button type="button" onClick={next} className="rounded-full border-2 border-cocoa/30 bg-butter px-5 py-2 font-hand text-2xl text-ink shadow active:scale-95">
        Next photo ↻
      </button>
    </div>
  )
}

function Highlight({ items }) {
  const item = items[0]
  if (!item) return null
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 md:flex-row">
      <div className="w-full max-w-md md:w-3/5">
        <Polaroid item={item} rotate={-2} tape="yellow" />
      </div>
      <motion.div
        className="md:w-2/5"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Doodle type="heart" size={30} color="#F4C6C3" />
        <p className="mt-2 font-hand text-3xl leading-snug text-ink">{item.note || item.caption}</p>
      </motion.div>
    </div>
  )
}

function Cards({ items }) {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-5 px-6">
      {items.map((item, i) => (
        <motion.figure
          key={item.src + i}
          className="float-slow m-0 w-36 rounded-2xl bg-[#FFFDF8] p-1.5 shadow-[0_6px_16px_rgba(73,61,56,0.18)] sm:w-44"
          style={{ '--dur': `${7 + i}s`, '--delay': `${-i}s`, '--r': `${rot(i)}deg` }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.1 }}
        >
          <SafeImage src={item.src} alt={item.alt || item.caption || 'A memory'} aspect="1 / 1" className="rounded-xl" />
          {item.caption && <figcaption className="px-1 py-1.5 text-center font-hand text-lg leading-tight text-ink">{item.caption}</figcaption>}
        </motion.figure>
      ))}
    </div>
  )
}

function Screenshots({ items, onOpen }) {
  return (
    <div className="mx-auto max-w-4xl columns-1 gap-6 px-6 sm:columns-2 md:columns-3">
      {items.map((item, i) => (
        <ScreenshotCard key={item.src + i} item={{ ...item, type: 'screenshot' }} index={i} onOpen={onOpen} />
      ))}
    </div>
  )
}

const LAYOUTS = { scatter: Scatter, strip: Strip, stack: Stack, highlight: Highlight, cards: Cards, screenshots: Screenshots }

const ACCENT = ['#C9D8EA', '#F7E5A7', '#C9DCC5']

export default function MemoryGallery({ onNext }) {
  const [viewing, setViewing] = useState(null)
  const { sfx } = useAudioContext()
  const open = (item) => {
    sfx('pop')
    setViewing(item)
  }

  return (
    <section className="mx-auto max-w-7xl pb-28 pt-16 sm:pb-32 sm:pt-24">
      <div className="mb-5 text-center">
        <span className="section-kicker">04 / 06 · THE PHOTO BOOTH</span>
      </div>
      <motion.h2
        className="px-6 text-center font-display text-4xl font-bold text-ink sm:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        {gallery.heading}
      </motion.h2>

      {gallery.chapters.map((chapter, ci) => (
        <div key={chapter.id} className="mt-20 sm:mt-28">
          <motion.header
            className="mx-auto mb-12 max-w-2xl px-6 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block -rotate-2 px-4 py-1 font-hand text-2xl text-ink" style={{ background: ACCENT[ci % ACCENT.length] }}>
              {chapter.label}: {chapter.name}
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold leading-snug text-ink sm:text-4xl">{chapter.heading}</h3>
          </motion.header>

          <div className="space-y-20">
            {chapter.sections.map((section, si) => {
              const Layout = LAYOUTS[section.layout]
              if (!Layout) return null
              return <Layout key={si} items={section.items} onOpen={open} />
            })}
          </div>
        </div>
      ))}

      <div className="mt-24 flex justify-center px-6">
        <SurpriseButton onClick={onNext} tone="sage">
          {gallery.button}
        </SurpriseButton>
      </div>

      <AnimatePresence>{viewing && <ScreenshotViewer item={viewing} onClose={() => setViewing(null)} />}</AnimatePresence>
    </section>
  )
}
