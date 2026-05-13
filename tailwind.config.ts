/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B3A5C',
          dark: '#0f2440',
          light: '#244d7a',
        },
        gold: {
          DEFAULT: '#C5981A',
          light: '#d4a721',
          pale: '#F5E6C8',
        },
        text: {
          primary: '#2C3E50',
          secondary: '#6B7B8D',
          muted: '#95A5B0',
        },
        bg: {
          white: '#FFFFFF',
          light: '#F7F9FB',
        },
        border: {
          DEFAULT: '#E0E6ED',
          light: '#D0D8E0',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'Segoe UI', 'Arial', 'sans-serif'],
        body: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'section-label': ['11px', { lineHeight: '1.4', letterSpacing: '3px' }],
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        'section': '80px',
      },
    },
  },
  plugins: [],
}
