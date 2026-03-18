import React from 'react'
import { KioskButton } from '../kiosk-button/kiosk-button'
import { confirmAssets } from '../../assets/asset-map'
import type { ConfirmVariant, DisplayMode, Locale } from '../../types/kiosk'

const LABELS: Record<ConfirmVariant, Record<Locale, string>> = {
  yes: { ko: '예', en: 'Yes', ja: 'はい', zh: '是' },
  no: { ko: '아니요', en: 'No', ja: 'いいえ', zh: '否' },
  select: { ko: '선택', en: 'Select', ja: '選択', zh: '选择' },
}

export interface ConfirmButtonProps {
  variant: ConfirmVariant
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function ConfirmButton({
  variant,
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onClick,
  className,
}: ConfirmButtonProps) {
  return (
    <KioskButton
      assets={confirmAssets[variant]}
      label={LABELS[variant]}
      locale={locale}
      mode={mode}
      disabled={disabled}
      onClick={onClick}
      className={className}
    />
  )
}
