/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#343A40', // Main
          800: '#5C6166',
          700: '#85888C',
          600: '#C1C3C5', // Gray Text + Inactive Buttons
          500: '#D6D7D9', // Inactive Text Buttons
          400: '#E0E1E2', // Gray Lines
          300: '#EAEBEB',
          200: '#F4F5F5', // Background Hover
          100: '#F8F9F9', // Main Background
        },
        orange: {
          900: '#FD7670',
        },
      },
    },
  },
  plugins: [],
};
