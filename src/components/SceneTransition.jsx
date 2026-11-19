import { motion } from 'framer-motion'

/**
 * Wraps every scene so they all enter/leave the same way, which is what makes
 * the six scenes feel like one continuous experience.
 */
export default function SceneTransition({ children, className = '' }) {
  return (
    <motion.div
      className={`relative z-10 min-h-full ${className}`}
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.97 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
