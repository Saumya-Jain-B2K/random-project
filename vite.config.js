import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plain Vite + React config. Assets in /public are served from the site root
// (e.g. public/audio/birthday-piano.mp3 -> /audio/birthday-piano.mp3).
export default defineConfig({
  plugins: [react()],
})
