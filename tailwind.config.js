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
          700: '#777777',
          600: '#959595', // Mixed Text + Gray Text
          500: '#BABABA', // Icons + Placeholder
          400: '#C5C5C5', // Inactive Buttons
          300: '#DFDFDF', // Borders + Gray Lines
          200: '#EAEAEA', // Background Hover
          100: '#F5F5F5', // Light Background
        },
        main: {
          // 900: '#219ebc',
          // 900: '#242424',
          900: '#84a98c',
          // 900: '#40916c',
        },
      },
    },
  },
  plugins: [
  ],
};
