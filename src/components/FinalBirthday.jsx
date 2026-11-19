import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BirthdayCake from './BirthdayCake.jsx'
import Confetti from './Confetti.jsx'
import SurpriseButton from './SurpriseButton.jsx'
import { Doodle } from './FloatingDecorations.jsx'
import { config } from '../data/config.js'
import { useAudioContext } from '../hooks/useAudio.js'

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

export default function FinalBirthday({ onReplay }) {
  const { swell, calm, sfx } = useAudioContext()
  const [burst, setBurst] = useState(true)

  useEffect(() => {
    swell() // the music reaches its highlight
    const t1 = setTimeout(() => sfx('celebrate'), 700)
    const t2 = setTimeout(() => setBurst(false), 3500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      calm()
    }
  }, [swell, calm, sfx])

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-5 py-24 text-center sm:py-32">
      {burst && <Confetti mode="burst" count={50} seed={21} />}
      <Confetti mode="rain" count={16} seed={5} />

      <motion.div
        className="relative w-52 sm:w-64"
        initial={{ opacity: 0, scale: 0.6, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 12, delay: 0.3 }}
      >
        <BirthdayCake />
        <Doodle type="star" size={26} color="#F7E5A7" className="float-slow absolute -left-6 top-4" />
        <Doodle type="sparkle" size={22} color="#D9CEE9" className="float-slow absolute -right-5 top-10" />
      </motion.div>

      <motion.h2
        {...fade(1.2)}
        className="mt-8 max-w-3xl break-words font-display text-4xl font-bold uppercase leading-tight tracking-wide text-ink sm:text-6xl"
      >
        Happy Birthday, {config.friendName}!
      </motion.h2>

      <motion.p {...fade(1.9)} className="mt-6 max-w-xl font-letter text-xl font-medium leading-relaxed text-cocoa sm:text-2xl">
        Cheers to more laughter, more memories, more random conversations, more of my RR and forever cheers for this beautiful friendship.
      </motion.p>

      <motion.p {...fade(2.6)} className="mt-8 max-w-xl whitespace-pre-line font-hand text-3xl leading-snug text-ink sm:text-4xl">
        {config.finalMessage}
      </motion.p>

      <motion.p {...fade(3.3)} className="mt-10 font-hand text-2xl text-cocoa sm:text-3xl">
        Here's to many more chapters of this story. And i hope that you are going to love this as a small present from me on your birthday's forever ♡
      </motion.p>

      <motion.div {...fade(3.8)} className="mt-8">
        <SurpriseButton onClick={onReplay} tone="lavender">
          Replay our little story ↻
        </SurpriseButton>
      </motion.div>
    </section>
  )
}
