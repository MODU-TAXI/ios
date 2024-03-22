/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './AppInner.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        DEFAULT: 'black',
        basic: '#FF7A00',
        kakaoyellow: '#FEE500',
        error: '#FF0000',
        disable: '#C0C0C0',
      },
    },
  },
  plugins: [],
};
