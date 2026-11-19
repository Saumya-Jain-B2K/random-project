import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

// 🎵 Put your piano track at public/audio/birthday-piano.mp3
const AUDIO_SRC = '/audio/birthday-piano.m4a'
const BASE_VOLUME = 0.4
const SWELL_VOLUME = 0.7

const AudioCtx = createContext(null)

/**
 * One audio engine for the whole app:
 *  - background music (created once, never restarted on re-render)
 *  - tiny synthesized sound effects (no extra files needed)
 * If the mp3 is missing, everything else keeps working.
 */
export function useAudio() {
  const audioRef = useRef(null)
  const ctxRef = useRef(null)
  const fadeRef = useRef(null)
  const startedRef = useRef(false)
  const soundOnRef = useRef(true)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio(AUDIO_SRC)
      a.loop = true
      a.preload = 'auto'
      a.volume = 0
      a.addEventListener('error', () => {
        setAvailable(false)
        setPlaying(false)
      })
      audioRef.current = a
    }
    return audioRef.current
  }, [])

  const fadeTo = useCallback((target, ms = 1500, done) => {
    const a = audioRef.current
    if (!a) return
    clearInterval(fadeRef.current)
    const from = a.volume
    const steps = Math.max(1, Math.round(ms / 50))
    let i = 0
    fadeRef.current = setInterval(() => {
      i += 1
      a.volume = Math.min(1, Math.max(0, from + ((target - from) * i) / steps))
      if (i >= steps) {
        clearInterval(fadeRef.current)
        done?.()
      }
    }, 50)
  }, [])

  const play = useCallback(() => {
    const a = getAudio()
    soundOnRef.current = true
    return a
      .play()
      .then(() => {
        setPlaying(true)
        fadeTo(BASE_VOLUME, 2500)
      })
      .catch(() => {
        // Missing file or blocked playback: fail quietly.
        setAvailable(false)
        setPlaying(false)
      })
  }, [fadeTo, getAudio])

  /** Call once after the first user interaction (the opening screen). */
  const start = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    play()
  }, [play])

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!startedRef.current || !a) {
      startedRef.current = true
      play()
      return
    }
    if (!a.paused) {
      soundOnRef.current = false
      setPlaying(false)
      fadeTo(0, 400, () => a.pause())
    } else {
      play()
    }
  }, [fadeTo, play])

  const swell = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) fadeTo(SWELL_VOLUME, 4000)
  }, [fadeTo])

  const calm = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) fadeTo(BASE_VOLUME, 2000)
  }, [fadeTo])

  const sfx = useCallback((name) => {
    if (!soundOnRef.current) return
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return
      if (!ctxRef.current) ctxRef.current = new AC()
      const ctx = ctxRef.current
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime
      const tone = (freq, at, dur, vol = 0.035, type = 'sine') => {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = type
        o.frequency.value = freq
        g.gain.setValueAtTime(0.0001, t + at)
        g.gain.exponentialRampToValueAtTime(vol, t + at + 0.015)
        g.gain.exponentialRampToValueAtTime(0.0001, t + at + dur)
        o.connect(g).connect(ctx.destination)
        o.start(t + at)
        o.stop(t + at + dur + 0.05)
      }
      if (name === 'open') {
        // soft paper rustle: filtered noise
        const len = Math.floor(ctx.sampleRate * 0.35)
        const buf = ctx.createBuffer(1, len, ctx.sampleRate)
        const d = buf.getChannelData(0)
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len)
        const src = ctx.createBufferSource()
        const f = ctx.createBiquadFilter()
        const g = ctx.createGain()
        f.type = 'bandpass'
        f.frequency.value = 2400
        g.gain.value = 0.05
        src.buffer = buf
        src.connect(f).connect(g).connect(ctx.destination)
        src.start(t)
      } else if (name === 'click') {
        tone(660, 0, 0.09, 0.025)
      } else if (name === 'pop') {
        tone(880, 0, 0.1, 0.02)
        tone(1320, 0.05, 0.12, 0.015)
      } else if (name === 'celebrate') {
        ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.12, 0.5, 0.03, 'triangle'))
      }
    } catch {
      /* sound effects are optional */
    }
  }, [])

  useEffect(
    () => () => {
      clearInterval(fadeRef.current)
      audioRef.current?.pause()
      ctxRef.current?.close?.()
    },
    [],
  )

  return useMemo(
    () => ({ playing, available, start, toggle, swell, calm, sfx }),
    [playing, available, start, toggle, swell, calm, sfx],
  )
}

export function AudioProvider({ value, children }) {
  return createElement(AudioCtx.Provider, { value }, children)
}

export function useAudioContext() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudioContext must be used inside <AudioProvider>')
  return ctx
}
