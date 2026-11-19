import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Doodle } from "./FloatingDecorations.jsx";
import SurpriseButton from "./SurpriseButton.jsx";
import { useAudioContext } from "../hooks/useAudio.js";

// stage: 0 idle · 1 wiggle · 2 flap opens · 3 letter slides up · 4 letter expands → next scene
export default function Envelope({ onOpened }) {
  const { start, sfx } = useAudioContext();
  const [stage, setStage] = useState(0);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = () => {
    if (stage !== 0) return;
    start(); // music begins only after this first interaction
    sfx("open");
    setStage(1);
    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));
    at(650, () => setStage(2));
    at(1500, () => setStage(3));
    at(2500, () => setStage(4));
    at(3300, () => onOpened?.());
  };

  const fading = stage === 4;

  return (
    <section className="flex min-h-[calc(100svh-76px)] flex-col items-center justify-center px-5 py-10 text-center">
      <motion.h1
        className="max-w-xl font-display text-3xl font-bold leading-tight text-ink sm:text-5xl"
        animate={{ opacity: fading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        Psst... I have something for you.
      </motion.h1>
      <motion.p
        className="mt-3 font-hand text-2xl text-cocoa sm:text-3xl"
        animate={{ opacity: fading ? 0 : 1 }}
      >
        Made especially for you ♡
      </motion.p>

      {/* The envelope */}
      <div className="relative mt-14 w-[min(84vw,380px)] sm:mt-18">
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Open the envelope"
          onClick={open}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open())
          }
          className="relative aspect-[4/3] w-full cursor-pointer"
          style={{ perspective: 1000 }}
          animate={
            stage === 1
              ? { rotate: [0, -4, 4, -3, 3, 0] }
              : { rotate: 0, y: stage === 0 ? [0, -6, 0] : 0 }
          }
          transition={
            stage === 1
              ? { duration: 0.65 }
              : stage === 0
                ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
          }
          whileTap={stage === 0 ? { scale: 0.98 } : undefined}
        >
          {/* soft shadow */}
          <div className="absolute -bottom-5 left-[8%] right-[8%] h-6 rounded-full bg-cocoa/20 blur-xl" />
          {/* back */}
          <motion.div
            className="absolute inset-0 rounded-md bg-[#EBC9C1]"
            animate={{ opacity: fading ? 0 : 1 }}
          />

          {/* letter inside */}
          <motion.div
            className="absolute bottom-[7%] left-[7%] right-[7%] top-[12%] rounded-sm bg-[#FFFDF6] p-4 shadow-md"
            style={{ zIndex: 10 }}
            animate={
              stage >= 4
                ? { y: "-28%", scale: 2.4, opacity: 0 }
                : stage === 3
                  ? { y: "-62%", scale: 1.04, opacity: 1 }
                  : { y: 0, scale: 1, opacity: 1 }
            }
            transition={{
              duration: stage >= 4 ? 0.8 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="space-y-2" aria-hidden="true">
              <div className="h-2 w-2/3 rounded bg-blush/70" />
              <div className="h-1.5 w-full rounded bg-cocoa/10" />
              <div className="h-1.5 w-5/6 rounded bg-cocoa/10" />
              <div className="h-1.5 w-full rounded bg-cocoa/10" />
            </div>
          </motion.div>

          {/* front pocket */}
          <motion.div
            className="absolute inset-0 rounded-md"
            style={{
              zIndex: 20,
              clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)",
              background: "linear-gradient(160deg,#F8DDE0,#F4C6C3)",
            }}
            animate={{ opacity: fading ? 0 : 1 }}
          />
          <div
            className="pointer-events-none absolute bottom-[10%] left-0 right-0 text-center font-hand text-2xl text-cocoa/70"
            style={{ zIndex: 21 }}
            aria-hidden="true"
          >
            open it Buddy
          </div>

          {/* flap */}
          <motion.div
            className="absolute left-0 top-0 h-[54%] w-full"
            style={{
              zIndex: stage >= 3 ? 5 : 30,
              transformOrigin: "top center",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg,#F1B9B4,#F8DDE0)",
            }}
            animate={{ rotateX: stage >= 2 ? 180 : 0, opacity: fading ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.45, 0, 0.2, 1] }}
          />

          {/* heart wax seal */}
          {/* <motion.div
            className="absolute left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#C95B6B] shadow-lg"
            style={{ top: 'calc(54% - 24px)', zIndex: 40 }}
            animate={stage >= 2 ? { scale: 0, rotate: 90, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            aria-hidden="true"
          >
            <svg width="30" height="22" viewBox="0 0 24 24">
              <path d="M12 21s-8-5.2-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.8-8 11-8 11z" fill="#FFE3E6" />
            </svg>
          </motion.div> */}

          {/* heart wax seal */}
          <motion.div
            className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-[#C95B6B] shadow-lg"
            style={{
              left: "50%",
              x: "-50%",
              top: "calc(54% - 24px)",
              zIndex: 40,
            }}
            animate={
              stage >= 2
                ? { scale: 0, rotate: 90, opacity: 0 }
                : { scale: 1, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.4 }}
            aria-hidden="true"
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M12 21s-8-5.2-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.8-8 11-8 11z"
                fill="#FFE3E6"
              />
            </svg>
          </motion.div>

          <Doodle
            type="star"
            size={26}
            color="#F7E5A7"
            className="absolute -right-3 -top-3"
            style={{ zIndex: 41 }}
          />
          <Doodle
            type="flower"
            size={30}
            color="#C9DCC5"
            className="absolute -bottom-4 -left-4"
            style={{ zIndex: 41 }}
          />
        </motion.div>
      </div>

      <motion.div className="mt-8" animate={{ opacity: fading ? 0 : 1 }}>
        <SurpriseButton onClick={open} disabled={stage !== 0}>
          Open your surprise 😁
        </SurpriseButton>
      </motion.div>
    </section>
  );
}
