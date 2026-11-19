import { motion } from 'framer-motion'
import { useAudioContext } from '../hooks/useAudio.js'

const TONES = {
  pink: 'bg-blush text-ink border-cocoa/30',
  yellow: 'bg-butter text-ink border-cocoa/30',
  lavender: 'bg-lavender text-ink border-cocoa/30',
  sage: 'bg-sage text-ink border-cocoa/30',
}

/** The one button style used for every primary action. */
export default function SurpriseButton({ children, onClick, tone = 'pink', className = '', disabled = false }) {
  const { sfx } = useAudioContext()
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        sfx('click')
        onClick?.(e)
      }}
      whileHover={{ scale: 1.05, rotate: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={`min-h-[52px] rounded-full border-2 px-7 py-3 font-sans text-base font-bold shadow-[0_5px_0_rgba(112,87,76,0.25)] disabled:opacity-60 sm:text-lg ${TONES[tone]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
