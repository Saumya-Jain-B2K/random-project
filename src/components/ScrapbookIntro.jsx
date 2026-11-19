import { motion } from 'framer-motion'
import Polaroid from './Polaroid.jsx'
import { Doodle } from './FloatingDecorations.jsx'
import SurpriseButton from './SurpriseButton.jsx'

export default function ScrapbookIntro({ onNext }) {
  return (
    <section className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 overflow-hidden px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
      <div className="relative mx-auto flex h-[340px] w-full max-w-md items-center justify-center sm:h-[440px]">
        <motion.div className="absolute left-[4%] top-[4%] w-44 sm:left-[5%] sm:w-56" initial={{ opacity: 0, x: -35, rotate: -12 }} whileInView={{ opacity: 1, x: 0, rotate: -9 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 75, damping: 14 }}>
          <Polaroid blank caption="little moments" rotate={-9} tape="yellow" blankDoodle="star" />
        </motion.div>
        <motion.div className="absolute bottom-[1%] right-[3%] z-10 w-48 sm:right-[4%] sm:w-60" initial={{ opacity: 0, y: 40, rotate: 12 }} whileInView={{ opacity: 1, y: 0, rotate: 7 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 75, damping: 14, delay: 0.15 }}>
          <Polaroid blank caption="our world" rotate={7} tape="sage" blankDoodle="heart" />
        </motion.div>
        <Doodle type="star" size={30} color="#B9C9A9" className="absolute bottom-5 left-3" />
        <Doodle type="sparkle" size={28} color="#D8B56A" className="absolute right-5 top-2" />
      </div>

      <div className="relative mx-auto max-w-xl text-center lg:text-left">
        <span className="section-kicker">03 / 06 · THE SCRAPBOOK OPENS</span>
        <Doodle type="heart" size={27} color="#D79AA2" className="absolute -right-1 top-0 hidden lg:block" />
        <h2 className="mt-6 font-display text-4xl leading-[1.08] text-ink sm:text-6xl">
          Some friendships deserve their <em className="text-[#B87983]">own little scrapbook.</em>
        </h2>
        <p className="mt-7 max-w-xl font-sans text-lg leading-8 text-cocoa/85 sm:text-xl sm:leading-9">
          So here's a tiny collection of moments, conversations, chaos, and memories, ready for all the real pieces you'll add.
        </p>
        <div className="mt-9">
          <SurpriseButton onClick={onNext} tone="lavender">Let's take a look →</SurpriseButton>
        </div>
      </div>
    </section>
  )
}
