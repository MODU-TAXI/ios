/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './AppInner.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        DEFAULT: 'black',
        basic: '#FF7A00',
        error: '#FF3131',
        disabled: '#C0C0C0',
        kakaoyellow: '#FEE500',
      },
    },
  },
  plugins: [],
};
