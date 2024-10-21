/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vercel-blue': '#0070f3',
        'vercel-cyan': '#79ffe1',
        'vercel-purple': '#7928ca',
      },
    },
  },
  plugins: [],
};