/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#05204A',
          dark: '#031533',
          light: '#0A2F5F',
        },
        secondary: {
          DEFAULT: '#D4A017',
          dark: '#B8890F',
          light: '#E5B634',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}