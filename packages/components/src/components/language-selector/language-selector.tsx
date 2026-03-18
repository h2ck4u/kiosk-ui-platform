import { languageAssets } from '../../assets/asset-map'
import type { DisplayMode, LanguageCode, Locale } from '../../types/kiosk'
import { KioskButton } from '../kiosk-button/kiosk-button'

const LABELS: Record<LanguageCode, Record<Locale, string>> = {
  ko: { ko: '한국어', en: 'Korean', ja: '韓国語', zh: '韩语' },
  en: { ko: 'English', en: 'English', ja: 'English', zh: 'English' },
  ja: { ko: '日本語', en: 'Japanese', ja: '日本語', zh: '日语' },
  zh: { ko: '中文', en: 'Chinese', ja: '中国語', zh: '中文' },
}

export interface LanguageSelectorProps {
  /** Language to display/select */
  language: LanguageCode
  /** Current UI locale */
  locale?: Locale
  mode?: DisplayMode
  disabled?: boolean
  /** Called when user selects this language */
  onSelect?: (language: LanguageCode) => void
  className?: string
}

export function LanguageSelector({
  language,
  locale = 'ko',
  mode = 'normal',
  disabled = false,
  onSelect,
  className,
}: LanguageSelectorProps) {
  return (
    <KioskButton
      assets={languageAssets[language]}
      label={LABELS[language]}
      locale={locale}
      mode={mode}
      disabled={disabled}
      onClick={() => onSelect?.(language)}
      className={className}
      width="var(--kiosk-btn-width-sm)"
      height="var(--kiosk-btn-height-sm)"
    />
  )
}
