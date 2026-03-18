import { useKiosk } from '../providers/kiosk-provider'
import type { Locale } from '../types/kiosk'

export function useLocale(): [Locale, (locale: Locale) => void] {
  const { locale, setLocale } = useKiosk()
  return [locale, setLocale]
}
