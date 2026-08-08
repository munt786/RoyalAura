/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d4af37', /* Primary Royal Gold */
          600: '#b8860b',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
          glow: '#ffd700',
          accent: '#e5a93c'
        },
        dark: {
          950: '#050505',
          900: '#0a0a0a',
          850: '#111111',
          800: '#18181b',
          700: '#27272a'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        royal: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif']
      }
    }
  },
  plugins: [],
}
