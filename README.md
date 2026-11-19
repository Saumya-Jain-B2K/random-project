# A Little Piece of Us 💌
An interactive birthday surprise: envelope → letter → scrapbook → memory gallery → appreciation wall → birthday finale.
Frontend only (React + Vite + Tailwind + Framer Motion). No backend, no database.

## Run it
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
npm run preview   # try the production build locally
```

## 1. Personalise (the only files you need to edit)
| What | File |
|---|---|
| His nickname, your signature name, final personal message | `src/data/config.js` |
| The letter (one string per paragraph) | `src/data/letter.js` |
| Photos, screenshots, captions, chapter headings, layouts | `src/data/memories.js` |
| The four appreciation notes | `src/data/appreciation.js` |

`config.js` ships with `[NICKNAME]`, `[YOUR NICKNAME]` and `[INSERT MY FINAL PERSONAL MESSAGE HERE]` so you can spot anything you haven't replaced.

## 2. Add your own files
```
public/images/photos/photo-01.jpg … photo-13.jpg     ← his photos
public/images/screenshots/chat-01.jpg … chat-04.jpg  ← chat screenshots
public/audio/birthday-piano.mp3                      ← background piano (use music you have the rights to)
```
- Until a file exists, the site shows a placeholder card with the exact path to use, so nothing breaks.
- To use different filenames or more/fewer items, edit the arrays in `src/data/memories.js`.
- Screenshots are never cropped; tapping one opens a full-size lightbox.
- Screenshots stay on your machine/host: nothing is uploaded to any other service.
- If `birthday-piano.mp3` is missing, the music button shows as unavailable and everything else works.

### Gallery layouts (`layout:` in memories.js)
`scatter` · `strip` · `stack` · `highlight` · `cards` · `screenshots`

## 3. Deploy to Vercel
1. Push the folder to GitHub.
2. On vercel.com choose **Add New → Project**, import the repo.
3. Vercel detects Vite automatically (build command `npm run build`, output `dist`). Click **Deploy**.

Or with the CLI: `npx vercel` then `npx vercel --prod`.

## Notes
- Music only starts after the first tap on the opening screen (browsers block autoplay). Sound effects are tiny synthesized tones, no extra files.
- `prefers-reduced-motion` is respected (Framer Motion transforms and CSS animations are toned down; confetti is skipped).
- Mind the audio file size; a 2–4 MB mp3 loads fine on mobile.

## Structure
```
src/
  App.jsx                 scene state machine + backgrounds
  components/             one file per scene/piece (Envelope, BirthdayLetter, ScrapbookIntro,
                          MemoryGallery, AppreciationWall, FinalBirthday, Polaroid, ...)
  data/                   all editable content
  hooks/useAudio.js       music + sound effects (shared through context)
```


## Updated page flow

The experience now uses a continuous, scrollable layout inspired by the supplied reference recording:

1. **Open** — the envelope is the entry gate. The letter and all other sections stay hidden until the envelope has been opened.
2. **Letter** — a wide stationery-style letter with the original copy, fonts, and gentle reveal animations.
3. **Scrapbook** — an editorial two-column introduction with layered Polaroid placeholders.
4. **Memories / Photo booth** — the original Polaroid and conversation-screenshot gallery is preserved, including the screenshot lightbox and the different collage layouts.
5. **Notes** — the appreciation cards are presented as a horizontal pastel note wall on desktop and a responsive grid on mobile.
6. **Birthday** — the animated cake, confetti, final message, and replay control.

A sticky navigation bar appears above the envelope. Until the envelope is opened, the other section links are disabled. Once opened, the navigation becomes active and can scroll to each section. The music control stays in the header; background music still starts from a user interaction and the sound effects remain optional.

## Where to customize

- `src/data/config.js` — friend name, your name, and final message.
- `src/data/letter.js` — letter paragraphs and transition text.
- `src/data/memories.js` — photo booth chapters, image paths, layouts, and captions.
- `src/data/appreciation.js` — the four appreciation notes.
- `public/images/photos/` — add actual photographs.
- `public/images/screenshots/` — add conversation screenshots.
- `public/audio/birthday-piano.mp3` — optional background piano track.

Run `npm install`, then `npm run dev`. Before deploying, run `npm run build`.
