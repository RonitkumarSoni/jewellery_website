/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf9f4',
          100: '#f5f0e3',
          200: '#ebdcb9',
          300: '#dfc489',
          400: '#d2ab5c',
          500: '#b88934',
          600: '#9b6c28',
          700: '#7a5122',
        },
        burgundy: {
          800: '#54151a',
          900: '#461115',
          950: '#340a0e',
        },
        champagne: '#FBF7F0',
        richmaroon: '#59161B',
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-cormorant)', 'Cinzel', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

