import { Music, VolumeX } from 'lucide-react'
import { useAudioContext } from '../hooks/useAudio.js'

export default function MusicPlayer({ compact = false }) {
  const { playing, available, toggle } = useAudioContext()
  const label = !available
    ? 'Music unavailable'
    : playing
      ? 'Pause background music'
      : 'Play background music'

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!available}
      aria-label={label}
      aria-pressed={playing}
      title={available ? label : 'Add public/audio/birthday-piano.mp3 to enable music'}
      className={`${compact
        ? 'flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 bg-cream/80 text-cocoa transition hover:bg-petal hover:scale-105 disabled:opacity-40 sm:h-11 sm:w-11'
        : 'fixed right-3 top-3 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-cocoa/20 bg-cream/90 text-cocoa shadow-md backdrop-blur transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:right-5 sm:top-5'}`}
      style={!compact ? { marginTop: 'env(safe-area-inset-top)' } : undefined}
    >
      {!available ? (
        <VolumeX size={19} />
      ) : playing ? (
        <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
          {[0, 0.25, 0.5, 0.15].map((d) => (
            <span key={d} className="eq-bar block h-full w-[3px] rounded-full bg-cocoa" style={{ animationDelay: `${d}s` }} />
          ))}
        </span>
      ) : (
        <Music size={19} />
      )}
    </button>
  )
}
