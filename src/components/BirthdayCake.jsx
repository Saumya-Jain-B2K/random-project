/** Hand-drawn style cake. Flames flicker with CSS (paused for reduced motion). */
export default function BirthdayCake({ className = '' }) {
  const candles = [
    { x: 78, c: '#C9D8EA' },
    { x: 120, c: '#F7E5A7' },
    { x: 162, c: '#D9CEE9' },
  ]
  return (
    <svg viewBox="0 0 240 230" className={className} role="img" aria-label="A birthday cake with three lit candles">
      {/* plate */}
      <ellipse cx="120" cy="206" rx="108" ry="14" fill="#C9D8EA" stroke="#70574C" strokeWidth="2" />
      {/* bottom tier */}
      <path d="M36 205V138a10 10 0 0110-10h148a10 10 0 0110 10v67z" fill="#F8DDE0" stroke="#70574C" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M36 150c10 12 16 12 24 0 8 12 16 12 24 0 8 12 16 12 24 0 8 12 16 12 24 0 8 12 16 12 24 0 8 12 16 12 24 0v-12a10 10 0 00-10-10H46a10 10 0 00-10 10z" fill="#FFFDF8" stroke="#70574C" strokeWidth="2.5" strokeLinejoin="round" />
      {/* top tier */}
      <path d="M62 128V92a10 10 0 0110-10h96a10 10 0 0110 10v36z" fill="#F4C6C3" stroke="#70574C" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M62 100c9 11 14 11 22 0 8 11 14 11 22 0 8 11 14 11 22 0 8 11 14 11 22 0 8 11 14 11 22 0v-8a10 10 0 00-10-10H72a10 10 0 00-10 10z" fill="#FFFDF8" stroke="#70574C" strokeWidth="2.5" strokeLinejoin="round" />
      {/* sprinkles */}
      {[[56, 175, '#F7E5A7'], [96, 188, '#C9DCC5'], [140, 172, '#C9D8EA'], [184, 186, '#F7E5A7'], [86, 118, '#C9DCC5'], [150, 118, '#F7E5A7']].map(([x, y, c], i) => (
        <rect key={i} x={x} y={y} width="9" height="4" rx="2" fill={c} transform={`rotate(${i * 37} ${x} ${y})`} />
      ))}
      {/* candles + flames */}
      {candles.map((c, i) => (
        <g key={c.x}>
          <rect x={c.x - 5} y="46" width="10" height="38" rx="3" fill={c.c} stroke="#70574C" strokeWidth="2" />
          <line x1={c.x} y1="46" x2={c.x} y2="40" stroke="#70574C" strokeWidth="2" strokeLinecap="round" />
          <g className="flame" style={{ animationDelay: `${i * 0.25}s` }}>
            <path d={`M${c.x} 16c8 8 9 16 0 24-9-8-8-16 0-24z`} fill="#F7C873" stroke="#70574C" strokeWidth="1.5" strokeLinejoin="round" />
            <path d={`M${c.x} 26c3 3 3 8 0 11-3-3-3-8 0-11z`} fill="#FFF8ED" />
          </g>
        </g>
      ))}
    </svg>
  )
}
