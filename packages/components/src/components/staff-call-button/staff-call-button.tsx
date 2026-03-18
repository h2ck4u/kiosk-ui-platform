import React from 'react'
import { KioskButton } from '../kiosk-button/kiosk-button'
import { staffCallAssets } from '../../assets/asset-map'
import type { DisplayMode, Locale } from '../../types/kiosk'

const LABELS: Record<Locale, string> = {
  ko: '직원호출',
  en: 'Call Staff',
  ja: 'スタッフ呼出',
  zh: '呼叫员工',
}

export interface StaffCallButtonProps {
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function StaffCallButton({
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onClick,
  className,
}: StaffCallButtonProps) {
  return (
    <KioskButton
      assets={staffCallAssets}
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
