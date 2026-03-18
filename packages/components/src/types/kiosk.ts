/** Display mode for the kiosk terminal */
export type DisplayMode = 'normal' | 'high-contrast' | 'low-power'

/** Supported locale codes */
export type Locale = 'ko' | 'en' | 'ja' | 'zh'

/** Payment method variants */
export type PaymentMethod = 'card' | 'barcode' | 'mobile' | 'samsung-pay' | 'gift-card'

/** Confirm button variants */
export type ConfirmVariant = 'yes' | 'no' | 'select'

/** Navigation button variants */
export type NavigationVariant = 'home' | 'back' | 'previous'

/** Points button variants */
export type PointsVariant = 'yes' | 'no'

/** Language code variants */
export type LanguageCode = 'ko' | 'en' | 'ja' | 'zh'

/** Button state */
export type ButtonState = 'normal' | 'hover' | 'disabled'

/** Kiosk context value */
export interface KioskContextValue {
  mode: DisplayMode
  locale: Locale
  setMode: (mode: DisplayMode) => void
  setLocale: (locale: Locale) => void
}

/** i18n labels map */
export type I18nLabels = Record<Locale, string>

/** Component size variants */
export type ComponentSize = 'sm' | 'md' | 'lg'
