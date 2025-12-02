/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cafe-pink': '#fdf2f8',
        'cafe-rose': '#fb7185',
        'cafe-gold': '#fbbf24',
        'cafe-brown': '#78350f',
        'cafe-cream': '#fffbeb',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}
