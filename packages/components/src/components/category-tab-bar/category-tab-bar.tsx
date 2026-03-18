import React from 'react'
import type { DisplayMode } from '../../types/kiosk'

export interface CategoryTab {
  id: string
  label: string
}

export interface CategoryTabBarProps {
  tabs: CategoryTab[]
  activeTab: string
  onTabChange: (id: string) => void
  mode?: DisplayMode
  className?: string
}

/**
 * CategoryTabBar — 카테고리 탭 바
 *
 * kioskux.com 증명서 선택 화면의 수평 탭 네비게이션 재현.
 * 어두운 배경 + 텍스트 탭, 활성 탭 강조.
 */
export function CategoryTabBar({
  tabs,
  activeTab,
  onTabChange,
  mode = 'normal',
  className,
}: CategoryTabBarProps) {
  const bg = mode === 'high-contrast' ? '#000' : '#5a5a6e'
  const activeBg = mode === 'high-contrast' ? '#333' : '#444460'

  return (
    <div
      role="tablist"
      className={`kiosk-category-tab-bar ${className ?? ''}`.trim()}
      data-mode={mode}
      style={{
        display: 'flex',
        width: '100%',
        background: bg,
        overflowX: 'auto',
      }}
    >
      {tabs.map(tab => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              minWidth: 0,
              height: 80,
              background: isActive ? activeBg : 'transparent',
              border: 'none',
              borderBottom: isActive ? '4px solid #7ec8f0' : '4px solid transparent',
              cursor: 'pointer',
              fontFamily: 'Noto Sans CJK KR, Noto Sans KR, sans-serif',
              fontSize: 28,
              fontWeight: isActive ? 700 : 400,
              color: '#ffffff',
              padding: '0 8px',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
