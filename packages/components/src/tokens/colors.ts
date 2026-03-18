/** Color tokens extracted from kioskui.or.kr XFrame5 components */
export const colors = {
  text: {
    primary: 'var(--kiosk-color-text-primary)',
    secondary: 'var(--kiosk-color-text-secondary)',
    disabled: 'var(--kiosk-color-text-disabled)',
    inverse: 'var(--kiosk-color-text-inverse)',
  },
  bg: {
    button: 'var(--kiosk-color-bg-button)',
    hover: 'var(--kiosk-color-bg-hover)',
    disabled: 'var(--kiosk-color-bg-disabled)',
    page: 'var(--kiosk-color-bg-page)',
  },
  border: {
    default: 'var(--kiosk-color-border)',
    focus: 'var(--kiosk-color-border-focus)',
    disabled: 'var(--kiosk-color-border-disabled)',
  },
  semantic: {
    confirm: 'var(--kiosk-color-confirm)',
    cancel: 'var(--kiosk-color-cancel)',
  },
} as const

/** Raw hex values from XFrame5 source (for reference) */
export const rawColors = {
  buttonText: '#0a0a0a',
  buttonBorder: '#b4b4b4',
  buttonBorderFocus: '#666e82',
  buttonBg: '#ffffff',
} as const
