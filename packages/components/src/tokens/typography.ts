/** Typography tokens from kioskui.or.kr XFrame5 components */
export const typography = {
  fontFamily: 'var(--kiosk-font-family)',
  fontSize: {
    xs: 'var(--kiosk-font-size-xs)',    // 20px
    sm: 'var(--kiosk-font-size-sm)',    // 24px
    base: 'var(--kiosk-font-size-base)', // 30px
    lg: 'var(--kiosk-font-size-lg)',    // 34px - primary button text
    xl: 'var(--kiosk-font-size-xl)',    // 40px
  },
  fontWeight: {
    normal: 'var(--kiosk-font-weight-normal)',
    bold: 'var(--kiosk-font-weight-bold)',
  },
} as const
