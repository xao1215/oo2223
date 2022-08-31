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
      dropShadow: {
        'custom-b': '0 5px 3px rgba(0, 0, 0, 0.4)',
        'custom': '5px 5px 3px rgba(0, 0, 0, 0.4)',
        'text': '5px 5px 2px rgba(0, 0, 0, 0.25)',
      },
      transitionDelay: {
        '0': '0ms',
      },
      colors: {
        custom: {
          'blue': '#111421',
          800: '#1e1f24',
          900: '#101317',
          100: '#09090a' //pause
        },
      }
    },
  },
  plugins: [],
}
