/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Amiri', 'serif'],
        body: ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
