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
          900: '#242424', // Main
          800: '#4D4D4D',
          700: '#6D6D6D',
          600: '#909090',
          500: '#ACACAC', // Placeholder + Mixed Text + Gray Text
          400: '#C0C0C0', // Inactive Buttons + Icons
          300: '#D5D5D5', // Borders + Gray Lines
          200: '#EAEAEA', // Background Hover
          100: '#F5F5F5', // Light Background
        },
        main: {
          // 900: '#219ebc',
          // 900: '#242424',
          // 900: '#84a98c',
          900: '#40916c',
        },
      },
    },
  },
  plugins: [
  ],
};
