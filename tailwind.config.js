/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8ED',
        blush: '#F4C6C3',
        petal: '#F8DDE0',
        butter: '#F7E5A7',
        sage: '#C9DCC5',
        powder: '#C9D8EA',
        lavender: '#D9CEE9',
        cocoa: '#70574C',
        ink: '#493D38',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        hand: ['Caveat', '"Comic Sans MS"', 'cursive'],
        letter: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
