import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kiosk: ['"Noto Sans KR"', '"Noto Sans CJK KR"', 'sans-serif'],
      },
      fontSize: {
        'kiosk-xs': ['20px', { lineHeight: '1.4' }],
        'kiosk-sm': ['24px', { lineHeight: '1.4' }],
        'kiosk-base': ['30px', { lineHeight: '1.4' }],
        'kiosk-lg': ['34px', { lineHeight: '1.4', fontWeight: '700' }],
        'kiosk-xl': ['40px', { lineHeight: '1.3', fontWeight: '700' }],
      },
      borderRadius: {
        kiosk: '15px',
      },
      colors: {
        kiosk: {
          text: '#0A0A0A',
          'text-secondary': '#212121',
          border: '#B4B4B4',
          bg: '#FFFFFF',
          'bg-hover': '#F5F5F5',
          'bg-disabled': '#E0E0E0',
          'text-disabled': '#9E9E9E',
        },
      },
    },
  },
  plugins: [],
}

export default config
