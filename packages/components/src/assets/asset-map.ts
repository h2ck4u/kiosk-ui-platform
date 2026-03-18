/**
 * Asset map for @kiosk-ui/components
 * Maps component variants and states to PNG file paths.
 *
 * State suffixes:
 *   normal      - default display
 *   hover       - pressed/focused
 *   disabled    - inactive
 *   high-contrast - KWCAG 2.2 high contrast mode
 */

// ── Confirm ──────────────────────────────────────────────────────────────────
export const confirmAssets = {
  yes: {
    normal: new URL('./confirm/yes_normal.png', import.meta.url).href,
    hover: new URL('./confirm/yes_hover.png', import.meta.url).href,
    disabled: new URL('./confirm/yes_disabled.png', import.meta.url).href,
  },
  no: {
    normal: new URL('./confirm/no_normal.png', import.meta.url).href,
    hover: new URL('./confirm/no_hover.png', import.meta.url).href,
    disabled: new URL('./confirm/no_disabled.png', import.meta.url).href,
    'high-contrast': new URL('./confirm/no_high-contrast.png', import.meta.url).href,
    'high-contrast_hover': new URL('./confirm/no_high-contrast_hover.png', import.meta.url).href,
  },
  select: {
    normal: new URL('./confirm/select_normal.png', import.meta.url).href,
    hover: new URL('./confirm/select_normal.png', import.meta.url).href,
    disabled: new URL('./confirm/select_normal.png', import.meta.url).href,
  },
} as const

// ── Navigation ───────────────────────────────────────────────────────────────
export const navigationAssets = {
  home: {
    normal: new URL('./navigation/home_normal.png', import.meta.url).href,
    hover: new URL('./navigation/home2_hover.png', import.meta.url).href,
    disabled: new URL('./navigation/home_normal.png', import.meta.url).href,
  },
  back: {
    normal: new URL('./navigation/back_normal.png', import.meta.url).href,
    hover: new URL('./navigation/back_normal.png', import.meta.url).href,
    disabled: new URL('./navigation/back_normal.png', import.meta.url).href,
  },
  previous: {
    normal: new URL('./navigation/previous_normal.png', import.meta.url).href,
    hover: new URL('./navigation/previous_normal.png', import.meta.url).href,
    disabled: new URL('./navigation/previous_normal.png', import.meta.url).href,
  },
} as const

// ── Payment ───────────────────────────────────────────────────────────────────
export const paymentAssets = {
  card: {
    normal: new URL('./payment/card_normal.png', import.meta.url).href,
    hover: new URL('./payment/card_hover.png', import.meta.url).href,
    disabled: new URL('./payment/card_normal.png', import.meta.url).href,
  },
  barcode: {
    normal: new URL('./payment/barcode_normal.png', import.meta.url).href,
    hover: new URL('./payment/barcode_hover.png', import.meta.url).href,
    disabled: new URL('./payment/barcode_normal.png', import.meta.url).href,
  },
  mobile: {
    normal: new URL('./payment/mobile_normal.png', import.meta.url).href,
    hover: new URL('./payment/mobile_hover.png', import.meta.url).href,
    disabled: new URL('./payment/mobile_normal.png', import.meta.url).href,
  },
  'samsung-pay': {
    normal: new URL('./payment/samsung-pay_normal.png', import.meta.url).href,
    hover: new URL('./payment/samsung-pay_hover.png', import.meta.url).href,
    disabled: new URL('./payment/samsung-pay_normal.png', import.meta.url).href,
  },
  'gift-card': {
    normal: new URL('./payment/gift-card_normal.png', import.meta.url).href,
    hover: new URL('./payment/gift-card_hover.png', import.meta.url).href,
    disabled: new URL('./payment/gift-card_normal.png', import.meta.url).href,
  },
} as const

// ── Language ──────────────────────────────────────────────────────────────────
// 출처: common_language_*_s / 10307_language_c (kioskui.or.kr)
export const languageAssets = {
  ko: {
    normal:   new URL('./language/ko_normal.png',   import.meta.url).href,
    hover:    new URL('./language/ko_hover.png',    import.meta.url).href,
    disabled: new URL('./language/ko_disabled.png', import.meta.url).href,
  },
  en: {
    normal:   new URL('./language/en_normal.png',   import.meta.url).href,
    hover:    new URL('./language/en_hover.png',    import.meta.url).href,
    disabled: new URL('./language/en_disabled.png', import.meta.url).href,
  },
  ja: {
    normal:   new URL('./language/ja_normal.png',   import.meta.url).href,
    hover:    new URL('./language/ja_hover.png',    import.meta.url).href,
    disabled: new URL('./language/ja_disabled.png', import.meta.url).href,
  },
  zh: {
    normal:   new URL('./language/zh_normal.png',   import.meta.url).href,
    hover:    new URL('./language/zh_hover.png',    import.meta.url).href,
    disabled: new URL('./language/zh_disabled.png', import.meta.url).href,
  },
} as const

// ── Accessibility ─────────────────────────────────────────────────────────────
export const accessibilityAssets = {
  normal: new URL('./accessibility/access_normal.png', import.meta.url).href,
  hover: new URL('./accessibility/access_hover.png', import.meta.url).href,
  disabled: new URL('./accessibility/access_disabled.png', import.meta.url).href,
} as const

// ── Staff Call ────────────────────────────────────────────────────────────────
export const staffCallAssets = {
  normal: new URL('./staff-call/call_normal.png', import.meta.url).href,
  hover: new URL('./staff-call/call_hover.png', import.meta.url).href,
  disabled: new URL('./staff-call/call_disabled.png', import.meta.url).href,
} as const

// ── Points ────────────────────────────────────────────────────────────────────
export const pointsAssets = {
  yes: {
    normal: new URL('./points/yes_normal.png', import.meta.url).href,
    hover: new URL('./points/yes_hover.png', import.meta.url).href,
    disabled: new URL('./points/yes_disabled.png', import.meta.url).href,
  },
  no: {
    normal: new URL('./points/no_normal.png', import.meta.url).href,
    hover: new URL('./points/no_normal.png', import.meta.url).href,
    disabled: new URL('./points/no_normal.png', import.meta.url).href,
  },
} as const

// ── Language Icon (10306_language_lound_k) ────────────────────────────────────
// 70×70px small round icon button — icon only, no text label
export const languageIconAssets = {
  ko: {
    normal: new URL('./language-icon/ko_normal.png', import.meta.url).href,
    hover: new URL('./language-icon/ko_hover.png', import.meta.url).href,
    disabled: new URL('./language-icon/ko_disabled.png', import.meta.url).href,
  },
  generic: {
    normal: new URL('./language-icon/generic_normal.png', import.meta.url).href,
    hover: new URL('./language-icon/generic_hover.png', import.meta.url).href,
    disabled: new URL('./language-icon/generic_normal.png', import.meta.url).href,
  },
} as const

// ── Language Radio (common_language_* + 10307_language_c) ─────────────────────
// 160×100px radio-style button — shared background + text label overlay
export const languageRadioAssets = {
  normal: new URL('./language-radio/normal.png', import.meta.url).href,
  hover: new URL('./language-radio/hover.png', import.meta.url).href,
  disabled: new URL('./language-radio/disabled.png', import.meta.url).href,
} as const
