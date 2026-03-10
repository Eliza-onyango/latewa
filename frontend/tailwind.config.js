/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'brand-red': '#D22730',
        'brand-black': '#000000',
        'brand-white': '#FFFFFF',
        'modern-red': '#D22730',
        'modern-black': '#000000',
        'modern-gray': '#6B7280',
        // Remap commonly used accent palettes to brand-red tints/shades
        // so existing classes like bg-green-700, text-blue-600, etc. use the brand color
        green: {
          50: '#FFE5E7',
          100: '#FECED1',
          200: '#F9A9AE',
          600: '#B71F28',
          700: '#951A21',
        },
        blue: {
          50: '#FFE5E7',
          100: '#FECED1',
          600: '#B71F28',
          800: '#731419',
        },
        red: {
          50: '#FFE5E7',
          100: '#FECED1',
          600: '#B71F28',
          700: '#951A21',
        },
        yellow: {
          200: '#F9A9AE',
          300: '#F27E85',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'hard': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(239, 68, 68, 0.3)',
        'glow-lg': '0 0 40px rgba(239, 68, 68, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(17, 24, 39, 0.8)), url("/images/hero-bg.jpg")',
      },
      backdropBlur: {
        'xs': '2px',
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
        '105': '1.05',
      },
    },
  },
  plugins: [],
}
