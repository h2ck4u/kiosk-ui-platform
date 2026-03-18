import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FloatingActionButton } from './floating-action-button'

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Layout/FloatingActionButton',
  component: FloatingActionButton,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof FloatingActionButton>

export const Default: Story = { args: {} }
export const HighContrast: Story = { args: { mode: 'high-contrast' } }
export const AllModes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24 }}>
      {(['normal', 'high-contrast'] as const).map(mode => (
        <FloatingActionButton key={mode} mode={mode} />
      ))}
    </div>
  ),
}
