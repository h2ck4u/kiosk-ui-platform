import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import type { LanguageCode } from '../../types/kiosk'
import { LanguageSelector } from './language-selector'

const meta: Meta<typeof LanguageSelector> = {
  title: 'Kiosk/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
  argTypes: {
    language: { control: 'select', options: ['ko', 'en', 'ja', 'zh'], description: '선택 언어 코드' },
    locale:   { control: 'select', options: ['ko', 'en', 'ja', 'zh'], description: 'UI 표시 언어' },
    mode:     { control: 'select', options: ['normal', 'high-contrast', 'low-power'] },
    disabled: { control: 'boolean' },
    onSelect: { action: 'selected' },
  },
  args: { language: 'ko', locale: 'ko', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof LanguageSelector>

export const Korean: Story = { args: { language: 'ko' } }
export const English: Story = { args: { language: 'en' } }
export const Japanese: Story = { args: { language: 'ja' } }
export const Chinese: Story = { args: { language: 'zh' } }
export const Disabled: Story = { args: { language: 'ko', disabled: true } }
export const HighContrast: Story = { args: { language: 'ko', mode: 'high-contrast' } }
export const LowPower: Story = { args: { language: 'ko', mode: 'low-power' } }

export const AllLanguages: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['ko', 'en', 'ja', 'zh'] as const).map((lang) => (
        <div key={lang} style={{ textAlign: 'center' }}>
          <LanguageSelector {...args} language={lang} />
          <p style={{ fontSize: 11, marginTop: 6 }}>{lang}</p>
        </div>
      ))}
    </div>
  ),
}

export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['normal', 'high-contrast', 'low-power'] as const).map((mode) => (
        <div key={mode}>
          <p style={{ fontSize: 11, marginBottom: 8, color: '#777' }}>mode: {mode}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            {(['ko', 'en', 'ja', 'zh'] as const).map((lang) => (
              <LanguageSelector key={lang} {...args} language={lang} mode={mode} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

/** 인터랙티브 언어 선택 — 클릭 시 상태 변화 확인 */
export const Interactive: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<LanguageCode>('ko')
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 14, marginBottom: 16, color: '#555' }}>
          현재 언어: <strong>{selected}</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {(['ko', 'en', 'ja', 'zh'] as const).map((lang) => (
            <LanguageSelector
              key={lang}
              {...args}
              language={lang}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>
    )
  },
}
