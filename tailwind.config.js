/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      transitionDelay: {
        '0': '0ms',
      },

      colors: {
        custom: {
          // 50: '#fdf8f6',
          // 100: '#f2e8e5',
          // 200: '#eaddd7',
          // 300: '#e0cec7',
          // 400: '#d2bab0',
          // 500: '#bfa094',
          // 600: '#a18072',
          // 700: '#977669',
          800: '#1e1f24',
          900: '#101317',
          100: '#09090a' //pause
        },
      }
    },
  },
  plugins: [],
}
