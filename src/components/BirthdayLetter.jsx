import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Doodle } from './FloatingDecorations.jsx'
import SurpriseButton from './SurpriseButton.jsx'
import Confetti from './Confetti.jsx'
import { letter } from '../data/letter.js'
import { config } from '../data/config.js'
import { useAudioContext } from '../hooks/useAudio.js'

const fill = (s) => s.replace('{{friend}}', config.friendName).replace('{{you}}', config.yourName)

export default function BirthdayLetter({ onNext }) {
  const { sfx } = useAudioContext()
  const [leaving, setLeaving] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const proceed = () => {
    if (leaving) return
    setLeaving(true)
    sfx('pop')
    timer.current = setTimeout(onNext, 700)
  }

  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-8 sm:pb-32 sm:pt-16">
      <div className="mb-7 flex items-center justify-between gap-4 px-1">
        <span className="section-kicker">02 / 06</span>
        <span className="section-kicker hidden text-right sm:block">THE PART WHERE I TRY TO FIND THE WORDS</span>
      </div>

      {leaving && <Confetti mode="burst" count={24} seed={11} />}

      <motion.article
        className="letter-sheet paper-edge relative mx-auto w-full max-w-5xl bg-[#FFFDF8] px-6 py-10 shadow-[0_18px_55px_rgba(73,61,56,0.12)] sm:px-12 sm:py-14 lg:px-24 lg:py-16"
        initial={{ y: 36, opacity: 0 }}
        whileInView={leaving ? { scale: 0.985, opacity: 0.35, y: -12 } : { y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        <span className="letter-tape" aria-hidden="true" />
        <Doodle type="flower" size={30} color="#F4C6C3" className="absolute -left-3 -top-4" />
        <Doodle type="star" size={26} color="#F7E5A7" className="absolute -right-3 top-8" />

        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-cocoa/15 pb-6">
          <h2 className="font-hand text-4xl font-bold leading-none text-[#A66E76] sm:text-6xl">{fill(letter.greeting)}</h2>
          <span className="pb-1 font-hand text-xl text-cocoa/75 sm:text-2xl">a small message for you ♡</span>
        </div>

        <div className="mt-7 max-w-4xl space-y-5 font-letter text-xl font-semibold leading-[1.8] text-[#594940] sm:mt-9 sm:text-[1.55rem]">
          {letter.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-35px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: Math.min(i * 0.035, 0.2) }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-end border-t border-cocoa/10 pt-8 text-right">
          <p className="font-hand text-2xl text-cocoa sm:text-3xl">{letter.closing}</p>
          <p className="mt-1 font-hand text-3xl font-bold text-[#A66E76] sm:text-4xl">{fill(letter.signature)}</p>
          <span className="mt-4 flex h-20 w-20 rotate-6 items-center justify-center rounded-full border border-dashed border-[#C58A91] text-center font-hand text-sm leading-tight text-[#A66E76]">
            made<br />with<br />care
          </span>
        </div>
      </motion.article>

      <div className="mx-auto mt-14 max-w-2xl px-3 text-center sm:mt-16">
        <p className="font-hand text-3xl text-cocoa sm:text-4xl">{letter.after.line1}</p>
        <p className="mt-2 font-hand text-2xl text-cocoa/80 sm:text-3xl">{letter.after.line2}</p>
        <div className="mt-7">
          <SurpriseButton onClick={proceed} tone="yellow" disabled={leaving}>
            {letter.after.button}
          </SurpriseButton>
        </div>
      </div>
    </section>
  )
}
