import React from 'react'
import type { DisplayMode } from '../../types/kiosk'

/**
 * KioskLayout — 키오스크 화면 3단 레이아웃 쉘 (제네릭)
 *
 * 1080×1920 세로형 키오스크 화면의 공통 구조를 제공합니다.
 * header / content / footer 영역은 소비자가 자유롭게 채웁니다.
 *
 * **mode별 레이아웃 차이:**
 * - normal: 컨텐츠 중앙 정렬
 * - high-contrast: 컨텐츠 중앙 정렬 + 흑백 고대비 색상 (KWCAG 2.2)
 * - low-power: 컨텐츠 **하단 정렬** — 휠체어 사용자가 손이 닿도록 UI를 화면 아래쪽에 배치
 *
 * @example
 * // 무인민원발급기
 * <KioskLayout
 *   mode="normal"
 *   header={<img src={logo} />}
 *   footer={<LanguageSelector ... />}
 * >
 *   <TextButton label="시작하기" intent="primary" size="lg" />
 * </KioskLayout>
 *
 * @example
 * // 음식 주문 키오스크
 * <KioskLayout
 *   header={<BrandLogo />}
 *   subHeader={<StepProgress ... />}
 *   footer={<NavigationBar />}
 * >
 *   <MenuGrid items={menu} />
 * </KioskLayout>
 */

export interface KioskLayoutProps {
  /** 화면 표시 모드 */
  mode?: DisplayMode
  /** 상단 영역 — 로고, 기관명 등 */
  header?: React.ReactNode
  /** 헤더 하단 보조 영역 — 단계표시, 네비게이션 등 */
  subHeader?: React.ReactNode
  /** 메인 컨텐츠 영역 */
  children: React.ReactNode
  /** 하단 영역 — 언어선택, 접근성 버튼 등 */
  footer?: React.ReactNode
  /** 헤더 높이 (기본: 80px) */
  headerHeight?: number
  /** 하단 영역 높이 (기본: 115px) */
  footerHeight?: number
  /** 화면 너비 (기본: 1080px, 스케일은 소비자가 조정) */
  width?: number | string
  /** 화면 높이 (기본: 1920px) */
  height?: number | string
  /** 추가 CSS 클래스 */
  className?: string
  /** scale factor for preview (e.g. 0.25 for Storybook) */
  scale?: number
}

export function KioskLayout({
  mode = 'normal',
  header,
  subHeader,
  children,
  footer,
  headerHeight = 80,
  footerHeight = 115,
  width = 1080,
  height = 1920,
  className,
  scale,
}: KioskLayoutProps) {
  const bgColor = mode === 'low-power' ? '#111111' : mode === 'high-contrast' ? '#ffffff' : '#f1f1f1'
  const borderColor = mode === 'high-contrast' ? '#000000' : '#d6d6d6'

  const inner = (
    <div
      data-mode={mode}
      className={`kiosk-layout ${className ?? ''}`.trim()}
      style={{
        position: 'relative',
        width,
        height,
        background: bgColor,
        border: `1px solid ${borderColor}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'var(--kiosk-font-family)',
      }}
    >
      {/* 상단 공통 영역 */}
      {header && (
        <div
          className="kiosk-layout__header"
          style={{
            width: '100%',
            height: headerHeight,
            flexShrink: 0,
            background: mode === 'low-power' ? '#1a1a1a' : '#fbfbfb',
            borderBottom: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 16px',
          }}
        >
          {header}
        </div>
      )}

      {/* 보조 헤더 (단계표시 등) */}
      {subHeader && (
        <div
          className="kiosk-layout__sub-header"
          style={{
            width: '100%',
            flexShrink: 0,
            background: mode === 'low-power' ? '#1a1a1a' : '#ffffff',
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          {subHeader}
        </div>
      )}

      {/* 메인 컨텐츠 영역 */}
      <div
        className="kiosk-layout__content"
        style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // 낮은화면 모드: 휠체어 사용자가 손이 닿도록 컨텐츠를 하단 정렬
          justifyContent: mode === 'low-power' ? 'flex-end' : 'center',
          padding: 24,
        }}
      >
        {children}
      </div>

      {/* 하단 공통 영역 */}
      {footer && (
        <div
          className="kiosk-layout__footer"
          style={{
            width: '100%',
            height: footerHeight,
            flexShrink: 0,
            background: mode === 'low-power' ? '#1a1a1a' : '#fbfbfb',
            borderTop: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  )

  if (scale) {
    return (
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', display: 'inline-block' }}>
        {inner}
      </div>
    )
  }
  return inner
}
