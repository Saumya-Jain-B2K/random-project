import { motion } from 'framer-motion'
import SafeImage from './SafeImage.jsx'
import { Doodle } from './FloatingDecorations.jsx'

const TAPES = { pink: '#F4C6C3', yellow: '#F7E5A7', sage: '#C9DCC5', powder: '#C9D8EA', lavender: '#D9CEE9' }

/**
 * A Polaroid frame. Pass `item` ({src, caption, alt}) for a real photo, or
 * `blank` for a decorative empty frame (used on the intro screen).
 * `entrance={false}` lets a parent (e.g. the card stack) control the motion.
 */
export default function Polaroid({
  item,
  blank = false,
  blankDoodle = 'heart',
  caption,
  rotate = 0,
  tape = 'pink',
  entrance = true,
  delay = 0,
  className = '',
  onClick,
}) {
  const text = caption ?? item?.caption
  const motionProps = entrance
    ? {
        initial: { opacity: 0, y: 50, rotate: rotate + 10, scale: 0.9 },
        whileInView: { opacity: 1, y: 0, rotate, scale: 1 },
        viewport: { once: true, margin: '-60px' },
        transition: { type: 'spring', stiffness: 90, damping: 14, delay },
        whileHover: { scale: 1.04, rotate: rotate * 0.4, y: -4 },
      }
    : { style: { rotate } }

  return (
    <motion.figure
      {...motionProps}
      onClick={onClick}
      className={`relative m-0 w-full rounded-[3px] bg-[#FFFDF8] p-2.5 pb-3 shadow-[0_8px_22px_rgba(73,61,56,0.22)] sm:p-3 ${className}`}
    >
      <span
        className="absolute -top-3 left-1/2 z-10 block h-6 w-20 -translate-x-1/2 -rotate-3 opacity-80"
        style={{ background: TAPES[tape] || TAPES.pink, clipPath: 'polygon(4% 0,100% 6%,96% 100%,0 92%)' }}
        aria-hidden="true"
      />
      {blank ? (
        <div className="flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-petal via-butter/60 to-powder/70" aria-hidden="true">
          <Doodle type={blankDoodle} size={56} color="#FFFDF8" />
        </div>
      ) : (
        <SafeImage src={item?.src} alt={item?.alt || text || 'A memory'} aspect="4 / 5" />
      )}
      {text && <figcaption className="mt-2.5 px-1 text-center font-hand text-xl leading-snug text-ink sm:text-2xl">{text}</figcaption>}
    </motion.figure>
  )
}
