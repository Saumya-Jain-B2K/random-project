import { motion } from 'framer-motion'
import { Doodle } from './FloatingDecorations.jsx'
import SurpriseButton from './SurpriseButton.jsx'
import { appreciation } from '../data/appreciation.js'

const BG = { pink: '#F8DDE0', yellow: '#F7E5A7', sage: '#C9DCC5', powder: '#C9D8EA', lavender: '#D9CEE9' }
const ROT = [-1.8, 1.2, -1.2, 1.8]

export default function AppreciationWall({ onNext }) {
  return (
    <section className="mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex items-start justify-between gap-5">
        <div>
          <span className="section-kicker">05 / 06 · LITTLE THINGS TO KEEP</span>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] text-ink sm:text-6xl">
            A few things I hope <em className="text-[#B87983]">you never forget...</em>
          </h2>
        </div>
        <Doodle type="heart" size={32} color="#D79AA2" className="mt-8 hidden sm:block" />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {appreciation.cards.map((card, i) => (
          <motion.div
            key={i}
            className="note-card relative flex min-h-[235px] flex-col items-start justify-between p-7 shadow-[0_12px_28px_rgba(73,61,56,0.10)] sm:min-h-[270px] sm:p-8"
            style={{ background: BG[card.color] || BG.pink }}
            initial={{ opacity: 0, y: 38, rotate: ROT[i % 4] + 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: ROT[i % 4] }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 85, damping: 15, delay: i * 0.1 }}
            whileHover={{ y: -7, rotate: 0 }}
          >
            <span className="font-sans text-[10px] tracking-[0.22em] text-cocoa/65">0{i + 1}</span>
            <Doodle type={card.decor} size={25} color="#B87983" />
            <p className="font-hand text-3xl leading-snug text-ink sm:text-[2rem]">{card.text}</p>
            <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full border-4 border-cream/80 bg-[#C58A91]" aria-hidden="true" />
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <SurpriseButton onClick={onNext} tone="pink">{appreciation.button}</SurpriseButton>
      </div>
    </section>
  )
}
