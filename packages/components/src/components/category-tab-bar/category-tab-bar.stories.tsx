import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CategoryTabBar } from './category-tab-bar'

const CERT_TABS = [
  { id: 'search', label: '증명서찾기' },
  { id: 'quick', label: '간편발급' },
  { id: 'large', label: '큰글씨 보기' },
  { id: 'location', label: '설치장소' },
  { id: 'info', label: '이용안내' },
]

const meta: Meta<typeof CategoryTabBar> = {
  title: 'Layout/CategoryTabBar',
  component: CategoryTabBar,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof CategoryTabBar>

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('search')
    return <CategoryTabBar tabs={CERT_TABS} activeTab={active} onTabChange={setActive} />
  },
}

export const HighContrast: Story = {
  render: () => {
    const [active, setActive] = useState('quick')
    return <CategoryTabBar tabs={CERT_TABS} activeTab={active} onTabChange={setActive} mode="high-contrast" />
  },
}
