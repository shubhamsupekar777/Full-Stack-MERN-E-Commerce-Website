/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",              // ✅ Important for Vite
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ All React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
