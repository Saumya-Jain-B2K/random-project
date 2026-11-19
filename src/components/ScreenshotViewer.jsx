import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

/** Full-screen lightbox. Image keeps its natural aspect ratio (object-contain). */
export default function ScreenshotViewer({ item, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption || 'Conversation screenshot'}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-3 bg-ink/80 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close screenshot"
        className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink shadow-lg"
        style={{ marginTop: 'env(safe-area-inset-top)' }}
      >
        <X size={22} />
      </button>
      <motion.img
        src={item.src}
        alt={item.alt || item.caption || 'Conversation screenshot'}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] max-w-full rounded-xl border-4 border-cream bg-cream object-contain shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      />
      {item.caption && <p className="font-hand text-2xl text-cream">{item.caption}</p>}
    </motion.div>
  )
}
