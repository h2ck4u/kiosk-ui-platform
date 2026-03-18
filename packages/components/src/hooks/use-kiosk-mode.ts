import { useKiosk } from '../providers/kiosk-provider'
import type { DisplayMode } from '../types/kiosk'

export function useKioskMode(): [DisplayMode, (mode: DisplayMode) => void] {
  const { mode, setMode } = useKiosk()
  return [mode, setMode]
}
