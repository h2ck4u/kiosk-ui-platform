import React from 'react'
import { KioskButton } from '../kiosk-button/kiosk-button'
import { pointsAssets } from '../../assets/asset-map'
import type { DisplayMode, Locale, PointsVariant } from '../../types/kiosk'

const LABELS: Record<PointsVariant, Record<Locale, string>> = {
  yes: { ko: '예', en: 'Yes', ja: 'はい', zh: '是' },
  no: { ko: '아니요', en: 'No', ja: 'いいえ', zh: '否' },
}

export interface PointsButtonProps {
  variant: PointsVariant
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function PointsButton({
  variant,
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onClick,
  className,
}: PointsButtonProps) {
  return (
    <KioskButton
      assets={pointsAssets[variant]}
      label={LABELS[variant]}
      locale={locale}
      mode={mode}
      disabled={disabled}
      onClick={onClick}
      className={className}
    />
  )
}
