/** Spacing tokens */
export const spacing = {
  xs: 'var(--kiosk-spacing-xs)',   // 8px
  sm: 'var(--kiosk-spacing-sm)',   // 16px
  md: 'var(--kiosk-spacing-md)',   // 24px
  lg: 'var(--kiosk-spacing-lg)',   // 32px
  xl: 'var(--kiosk-spacing-xl)',   // 48px
} as const

/** Border radius tokens */
export const radius = {
  button: 'var(--kiosk-radius-button)', // 15px
  sm: 'var(--kiosk-radius-sm)',         // 8px
  lg: 'var(--kiosk-radius-lg)',         // 20px
} as const

/** Button size tokens from XFrame5 spec */
export const buttonSizes = {
  lg: { width: 'var(--kiosk-btn-width)', height: 'var(--kiosk-btn-height)' },            // 285×280px
  md: { width: 'var(--kiosk-btn-width-sm)', height: 'var(--kiosk-btn-height-sm)' },      // 200×196px
  nav: { width: 'var(--kiosk-btn-width-nav)', height: 'var(--kiosk-btn-height-nav)' },   // 240×88px
} as const
