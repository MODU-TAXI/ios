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
        kakaoyellow: '#FEE500',

        basic: '#40CEAC',
        base: '#B3EBDE',

        sub100: '#EBFBF7',
        sub200: '#B3EBDE',
        sub300: '#8CE2CD',
        sub400: '#66D8BD',
        sub500: '#40CEAC',
        sub600: '#33A58A',
        sub700: '#267C67',
        sub800: '#1A5245',
        sub900: '#0D2922',

        box: '#EBEBEB',
        disabled: '#C3C3C3',
        disabled2: '#9C9C9C',
        emphasized: '#5D5D5D',
        mainFont: '#1F1F1F', // 텍스트

        gray100: '#EBEBEB',
        gray200: '#D7D7D7',
        gray300: '#C3C3C3',
        gray400: '#AFAFAF',
        gray500: '#9C9C9C',
        gray600: '#7C7C7C',
        gray700: '#5D5D5D',
        gray800: '#3E3E3E',
        gray900: '#1F1F1F',

        warning: '#FF4949', // 빨강
        notification: '#FFD232', // 노랑
        success: '#10A2F4', // 파랑

        error: '#FF3131',
      },
    },
  },
  plugins: [],
};
