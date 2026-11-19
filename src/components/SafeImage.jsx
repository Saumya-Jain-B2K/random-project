import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

/**
 * Local image with a graceful placeholder when the file hasn't been added yet.
 * `fit="contain"`/natural height is used for screenshots so they are never cropped.
 */
export default function SafeImage({ src, alt = '', aspect = '4 / 5', natural = false, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`flex w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-petal via-lavender/60 to-powder/70 p-3 text-center text-cocoa ${className}`}
        style={{ aspectRatio: natural ? '9 / 16' : aspect }}
        role="img"
        aria-label={alt || 'Photo placeholder'}
      >
        <ImageIcon size={26} aria-hidden="true" />
        {/* <span className="font-hand text-lg leading-tight">add your photo</span> */}
        <code className="break-all rounded bg-cream/80 px-1.5 py-0.5 text-[10px] leading-tight">{src ? src.replace(/^\//, 'public/') : 'no src set'}</code>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={natural ? `block h-auto w-full ${className}` : `block w-full object-cover ${className}`}
      style={natural ? undefined : { aspectRatio: aspect }}
    />
  )
}
