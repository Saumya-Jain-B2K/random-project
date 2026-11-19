import { useCallback, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { AudioProvider, useAudio } from './hooks/useAudio.js'
import FloatingDecorations from './components/FloatingDecorations.jsx'
import SceneTransition from './components/SceneTransition.jsx'
import Envelope from './components/Envelope.jsx'
import BirthdayLetter from './components/BirthdayLetter.jsx'
import ScrapbookIntro from './components/ScrapbookIntro.jsx'
import MemoryGallery from './components/MemoryGallery.jsx'
import AppreciationWall from './components/AppreciationWall.jsx'
import FinalBirthday from './components/FinalBirthday.jsx'
import SiteHeader from './components/SiteHeader.jsx'

function BirthdayExperience({ audio }) {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    if (!unlocked) return
    // The letter is the first page revealed after the envelope opens.
    requestAnimationFrame(() => {
      document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [unlocked])

  const goTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const replay = useCallback(() => {
    audio.calm()
    setUnlocked(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [audio])

  return (
    <MotionConfig reducedMotion="user">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_15%,#FFF8ED_0%,#F8F0E6_58%,#F8DDE0_100%)]" aria-hidden="true" />
      <FloatingDecorations count={unlocked ? 13 : 16} opacity={0.75} />

      <div className="relative z-10">
        <SiteHeader locked={!unlocked} />
        {!unlocked ? (
          <main id="open" className="min-h-[calc(100svh-76px)]">
            <SceneTransition className="min-h-[calc(100svh-76px)]">
              <Envelope onOpened={() => setUnlocked(true)} />
            </SceneTransition>
          </main>
        ) : (
          <main className="birthday-page">
            <div id="letter" className="scroll-section">
              <BirthdayLetter onNext={() => goTo('scrapbook')} />
            </div>

            <div id="scrapbook" className="scroll-section">
              <ScrapbookIntro onNext={() => goTo('memories')} />
            </div>

            <div id="memories" className="scroll-section">
              <MemoryGallery onNext={() => goTo('notes')} />
            </div>

            <div id="notes" className="scroll-section">
              <AppreciationWall onNext={() => goTo('birthday')} />
            </div>

            <div id="birthday" className="scroll-section">
              <FinalBirthday onReplay={replay} />
            </div>
          </main>
        )}
      </div>
    </MotionConfig>
  )
}

export default function App() {
  const audio = useAudio()
  return (
    <AudioProvider value={audio}>
      <BirthdayExperience audio={audio} />
    </AudioProvider>
  )
}
