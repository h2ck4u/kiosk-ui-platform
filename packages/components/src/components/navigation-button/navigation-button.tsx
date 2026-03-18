import React from 'react'
import { KioskButton } from '../kiosk-button/kiosk-button'
import { navigationAssets } from '../../assets/asset-map'
import type { DisplayMode, Locale, NavigationVariant } from '../../types/kiosk'

const LABELS: Record<NavigationVariant, Record<Locale, string>> = {
  home: { ko: '처음으로', en: 'Home', ja: 'ホーム', zh: '首页' },
  back: { ko: '이전으로', en: 'Back', ja: '戻る', zh: '返回' },
  previous: { ko: '이전', en: 'Previous', ja: '前へ', zh: '上一步' },
}

export interface NavigationButtonProps {
  variant: NavigationVariant
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function NavigationButton({
  variant,
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onClick,
  className,
}: NavigationButtonProps) {
  return (
    <KioskButton
      assets={navigationAssets[variant]}
      label={LABELS[variant]}
      locale={locale}
      mode={mode}
      disabled={disabled}
      onClick={onClick}
      className={className}
      width="var(--kiosk-btn-width-nav)"
      height="var(--kiosk-btn-height-nav)"
    />
  )
}
