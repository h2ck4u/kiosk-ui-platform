import type { Preview } from '@storybook/react'
import '../src/tokens/tokens.css'

const preview: Preview = {
  globalTypes: {
    kioskMode: {
      description: 'Kiosk display mode',
      defaultValue: 'normal',
      toolbar: {
        title: 'Mode',
        icon: 'contrast',
        items: [
          { value: 'normal', title: 'Normal', left: '⚪' },
          { value: 'high-contrast', title: 'High Contrast', left: '⬛' },
          { value: 'low-power', title: 'Low Power', left: '🌑' },
        ],
        dynamicTitle: true,
      },
    },
    kioskLocale: {
      description: 'Kiosk language locale',
      defaultValue: 'ko',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'ko', title: '한국어', left: '🇰🇷' },
          { value: 'en', title: 'English', left: '🇺🇸' },
          { value: 'ja', title: '日本語', left: '🇯🇵' },
          { value: 'zh', title: '中文', left: '🇨🇳' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.kioskMode ?? 'normal'
      const locale = context.globals.kioskLocale ?? 'ko'
      const el = document.documentElement
      el.setAttribute('data-kiosk-mode', mode)
      el.setAttribute('lang', locale)
      return Story()
    },
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'centered',
    backgrounds: {
      default: 'kiosk-light',
      values: [
        { name: 'kiosk-light', value: '#f8f8f8' },
        { name: 'kiosk-dark', value: '#000000' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
}

export default preview
