import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Zain"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#F58762',
          mid: '#C95FA0',
          deep: '#432467',
        },
        surface: {
          card: '#FDF8FF',
          soft: '#FCDDD0',
        },
        ink: {
          DEFAULT: '#1a0a2e',
          soft: '#3d2460',
          mute: '#8b7aaa',
        },
        hairline: '#e8daf4',
      },
      borderRadius: {
        pin: '16px',
        'pin-lg': '32px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        float: 'floatAnimation 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        floatAnimation: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #F58762, #C95FA0, #432467)',
        'page-gradient': 'linear-gradient(160deg, #FCDDD0 0%, #FDF8FF 50%, #E5D4F2 100%)',
      },
    },
  },
  plugins: [],
}

export default config
