import { accessibilityAssets } from '../../assets/asset-map'
import type { DisplayMode, Locale } from '../../types/kiosk'
import { KioskButton } from '../kiosk-button/kiosk-button'

const LABELS: Record<Locale, string> = {
  ko: '접근성',
  en: 'Accessibility',
  ja: 'アクセシビリティ',
  zh: '无障碍',
}

export interface AccessibilityButtonProps {
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function AccessibilityButton({
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onClick,
  className,
}: AccessibilityButtonProps) {
  return (
    <KioskButton
      assets={accessibilityAssets}
      label={LABELS}
      locale={locale}
      mode={mode}
      disabled={disabled}
      onClick={onClick}
      className={className}
      width="var(--kiosk-btn-width-sm)"
      height="var(--kiosk-btn-height-sm)"
    />
  )
}
