/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: { xs: '430px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
    extend: {
      colors: {
        brand: { DEFAULT: '#1d4ed8', dark: '#1e3a8a', light: '#eef3ff', glow: '#8fa8ff' },
        navy: { DEFAULT: '#0b1b3a', 800: '#12254d', 900: '#081226', 950: '#050b18' },
        ink: '#161d2e', mute: '#586175', line: '#dfe3ec', paper: '#f6f6f2',
      },
      fontFamily: {
        display: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '1360px' },
      transitionTimingFunction: { premium: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
