/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: {
            50: '#F7FEE7',
            100: '#ECFCCB',
            200: '#D9F99D',
            300: '#BFF549',  // Primary brand color
            400: '#A4E635',
            500: '#84CC16',
            600: '#65A30D',
            DEFAULT: '#BFF549', // Maintain backwards compatibility
          },
          accent: {
            purple: '#A78BFA',
            teal: '#2DD4BF',
            coral: '#FB7185',
            yellow: '#FCD34D',
          },
          black: '#000000',
          white: '#FFFFFF',
          gray: '#F5F5F5',
          dark: '#111111'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    }
  },
  plugins: [],
}
