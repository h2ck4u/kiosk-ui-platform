import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import type { LanguageCode } from '../../types/kiosk'
import { LanguageRadioButton } from './language-radio-button'

const meta: Meta<typeof LanguageRadioButton> = {
  title: 'Language/LanguageRadioButton',
  component: LanguageRadioButton,
  tags: ['autodocs'],
  argTypes: {
    language: { control: 'select', options: ['ko', 'en', 'ja', 'zh'], description: '표시할 언어' },
    selected: { control: 'boolean', description: '현재 선택된 언어 여부' },
    locale:   { control: 'select', options: ['ko', 'en', 'ja', 'zh'] },
    mode:     { control: 'select', options: ['normal', 'high-contrast', 'low-power'] },
    disabled: { control: 'boolean' },
  },
  args: { language: 'ko', selected: false, locale: 'ko', mode: 'normal', disabled: false },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof LanguageRadioButton>

/** 한국어 버튼 — 미선택 상태 */
export const Korean: Story = { args: { language: 'ko' } }

/** 영어 버튼 */
export const English: Story = { args: { language: 'en' } }

/** 일본어 버튼 */
export const Japanese: Story = { args: { language: 'ja' } }

/** 중국어 버튼 */
export const Chinese: Story = { args: { language: 'zh' } }

/** 선택된(active) 상태 */
export const Selected: Story = { args: { language: 'ko', selected: true } }

/** 비활성화 */
export const Disabled: Story = { args: { language: 'ko', disabled: true } }

/** 저전력 모드 */
export const LowPower: Story = { args: { language: 'ko', mode: 'low-power' } }

/** 저전력 + 선택 상태 */
export const LowPowerSelected: Story = { args: { language: 'ko', mode: 'low-power', selected: true } }

/** 4개 언어 전체 — 미선택 */
export const AllLanguages: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['ko', 'en', 'ja', 'zh'] as const).map((lang) => (
        <div key={lang} style={{ textAlign: 'center' }}>
          <LanguageRadioButton {...args} language={lang} />
          <p style={{ fontSize: 11, marginTop: 4 }}>{lang}</p>
        </div>
      ))}
    </div>
  ),
}

/** 인터랙티브 언어 선택 그룹 — 실제 무인 단말기 UX */
export const InteractiveGroup: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<LanguageCode>('ko')
    return (
      <div>
        <p style={{ fontSize: 14, marginBottom: 12, textAlign: 'center', color: '#555' }}>
          선택된 언어: <strong>{selected}</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {(['ko', 'en', 'ja', 'zh'] as const).map((lang) => (
            <LanguageRadioButton
              key={lang}
              {...args}
              language={lang}
              selected={selected === lang}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>
    )
  },
}

/** 3개 모드 비교 */
export const AllModes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['normal', 'high-contrast', 'low-power'] as const).map((mode) => (
        <div key={mode}>
          <p style={{ fontSize: 11, marginBottom: 6, color: '#888' }}>{mode}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['ko', 'en', 'ja', 'zh'] as const).map((lang) => (
              <LanguageRadioButton key={lang} {...args} language={lang} mode={mode} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

/** 선택/미선택 나란히 비교 */
export const SelectedVsUnselected: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <LanguageRadioButton {...args} language="ko" selected={false} />
        <p style={{ fontSize: 12, marginTop: 4 }}>미선택</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LanguageRadioButton {...args} language="ko" selected />
        <p style={{ fontSize: 12, marginTop: 4 }}>선택됨</p>
      </div>
    </div>
  ),
}
