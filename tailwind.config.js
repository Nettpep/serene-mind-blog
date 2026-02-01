/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sarabun', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      colors: {
        zen: {
          bg: '#FDFBF7',      // Off-white/Paper
          surface: '#FFFFFF', // Pure white
          text: '#334155',    // Slate 700
          muted: '#94a3b8',   // Slate 400
          accent: '#b45309',  // Amber 700 (Warm wood/Gold)
          'accent-light': '#fef3c7', // Amber 100
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
