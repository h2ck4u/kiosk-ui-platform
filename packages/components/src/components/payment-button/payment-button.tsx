import React from 'react'
import { KioskButton } from '../kiosk-button/kiosk-button'
import { paymentAssets } from '../../assets/asset-map'
import type { DisplayMode, Locale, PaymentMethod } from '../../types/kiosk'

const LABELS: Record<PaymentMethod, Record<Locale, string>> = {
  card: { ko: '신용카드', en: 'Credit Card', ja: 'クレジットカード', zh: '信用卡' },
  barcode: { ko: '바코드 할인', en: 'Barcode', ja: 'バーコード', zh: '条形码' },
  mobile: { ko: '모바일 쿠폰', en: 'Mobile Coupon', ja: 'モバイルクーポン', zh: '手机优惠券' },
  'samsung-pay': { ko: '페이', en: 'Samsung Pay', ja: 'サムスンペイ', zh: '三星支付' },
  'gift-card': { ko: '기프트 카드', en: 'Gift Card', ja: 'ギフトカード', zh: '礼品卡' },
}

export interface PaymentButtonProps {
  variant: PaymentMethod
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function PaymentButton({
  variant,
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onClick,
  className,
}: PaymentButtonProps) {
  return (
    <KioskButton
      assets={paymentAssets[variant]}
      label={LABELS[variant]}
      locale={locale}
      mode={mode}
      disabled={disabled}
      onClick={onClick}
      className={className}
    />
  )
}
