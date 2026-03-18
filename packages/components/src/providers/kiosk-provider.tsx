import React, { createContext, useContext, useState, useEffect } from 'react'
import type { DisplayMode, KioskContextValue, Locale } from '../types/kiosk'

const KioskContext = createContext<KioskContextValue | null>(null)

export interface KioskProviderProps {
  children: React.ReactNode
  defaultMode?: DisplayMode
  defaultLocale?: Locale
}

export function KioskProvider({
  children,
  defaultMode = 'normal',
  defaultLocale = 'ko',
}: KioskProviderProps) {
  const [mode, setModeState] = useState<DisplayMode>(defaultMode)
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  const setMode = (newMode: DisplayMode) => {
    setModeState(newMode)
  }

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-kiosk-mode', mode)
    root.setAttribute('lang', locale)
  }, [mode, locale])

  return (
    <KioskContext.Provider value={{ mode, locale, setMode, setLocale }}>
      <div data-kiosk-mode={mode} lang={locale}>
        {children}
      </div>
    </KioskContext.Provider>
  )
}

export function useKiosk(): KioskContextValue {
  const ctx = useContext(KioskContext)
  if (!ctx) {
    throw new Error('useKiosk must be used within a KioskProvider')
  }
  return ctx
}
