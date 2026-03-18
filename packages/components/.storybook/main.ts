import type { StorybookConfig } from '@storybook/react-vite'
import type { InlineConfig } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    '../src/templates/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config: InlineConfig) {
    // GitHub Pages 배포 시 base path 설정
    // STORYBOOK_BASE_URL 환경변수가 없으면 로컬 개발용 '/'
    config.base = process.env.STORYBOOK_BASE_URL ?? '/'
    return config
  },
}

export default config
