import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

/**
 * 무인민원발급기 UI 템플릿 — kioskui.or.kr 공식 레퍼런스
 *
 * 각 스토리는 실제 무인민원발급기 화면 흐름을 보여줍니다.
 * 스크린샷 출처: https://www.kioskui.or.kr (무인정보단말기UI플랫폼)
 *
 * 전체 소스 파일(XFrame5)은 kioskui.or.kr > 템플릿 > 다운로드에서
 * 설문 완료 후 수동으로 다운로드할 수 있습니다.
 * 다운로드 후 docs/08-ui-resources/downloads/templates/{mode}/ 에 저장하세요.
 */

// ── 스크린샷 URL ──────────────────────────────────────────────────────────────
const SCREENS = {
  normal: {
    '시작안내':           'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033910VGsMuL6H',
    '기본선택(증명종류)':  'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033911tBbDpBHJ',
    '기본선택(증명서)':   'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033913VvGpIT5i',
    '본인확인(주민등록번호)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033914DbUHeQx9',
    '본인확인(지문)':     'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033915IAIgjrVs',
    '옵션선택(전체포함)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033916ew2en4aj',
    '옵션선택(전체미포함)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033917nnnParIh',
    '옵션선택(신청부수)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_00000000003391839BIqC23',
    '내역확인':           'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033919LQjHC0K4',
    '내역확인(무료)':     'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033920qZO0rCBi',
    '결제하기(방법선택)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033921Xb2TkH2T',
    '결제하기(결제)':     'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033922Mc6QQoWG',
    '발권':               'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033923dyPmrvot',
    '완료(영수증출력 여부)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033924ns7JqHdQ',
    '완료(영수증출력)':   'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033925hcONQSCg',
    '완료':               'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_0000000000339267kAiD7yo',
  },
  'high-contrast': {
    '시작안내':           'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000032135axBIVgt9',
    '기본선택(증명종류)':  'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000032136A1jjF8r5',
    '기본선택(증명서)':   'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000032137QEav7u8e',
    '본인확인(주민등록번호)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000032138uS7TdmLJ',
    '본인확인(지문)':     'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033927WiavDCbg',
    '옵션선택(전체미포함)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_0000000000339282Na8Zd8F',
    '옵션선택(신청부수)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033929tqLtOsqK',
    '내역확인':           'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033930LVLnLgYF',
    '내역확인(무료)':     'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033931vCYZeHKl',
    '결제하기(방법선택)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033932VaicT2yZ',
    '결제하기(결제)':     'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033933wq0tblFy',
    '발권':               'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033934Ar8p3Vhv',
    '완료(영수증출력 여부)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033935IhLbizvq',
    '완료(영수증출력)':   'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033936zDOA0hRX',
    '완료':               'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033937hUTdhf3e',
  },
  'low-power': {
    '시작안내':              'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033938g7bW5DrI',
    '기본선택(증명종류,1페이지)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033939JIbhBWWW',
    '기본선택(증명종류,2페이지)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033940YAsDjfpd',
    '기본선택(증명서)':      'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033941GlKAfg0P',
    '본인확인(주민등록번호)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_0000000000339429CYdwchN',
    '본인확인(지문)':        'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033943D8guRm8m',
    '옵션선택(전체포함)':    'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_0000000000339444nTLFR25',
    '옵션선택(신청부수)':    'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033945lYKCltdH',
    '내역확인(무료)':        'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_0000000000339461yi8OjHi',
    '결제하기(방법선택,6버튼)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033947cDNw3EUX',
    '결제하기(결제)':        'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033948ArYxntgu',
    '발권':                  'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033949Axz8Hldk',
    '완료(영수증출력 여부)': 'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033950NZcU80q2',
    '완료(영수증출력)':      'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033951BDbnkhqx',
    '완료':                  'https://www.kioskui.or.kr/icms/file/getImage.do?atchFileId=FILE_000000000033952hpUkcz3m',
  },
} as const

// ── 공통 뷰어 컴포넌트 ─────────────────────────────────────────────────────────

function ScreenViewer({
  screens,
  mode,
  fallbackBg,
}: {
  screens: Record<string, string>
  mode: string
  fallbackBg: string
}) {
  const [selected, setSelected] = React.useState<string>(Object.keys(screens)[0])

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', maxWidth: 1100 }}>
      {/* 화면 목록 */}
      <div style={{
        width: 220,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        <p style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>
          mode: <strong>{mode}</strong> | {Object.keys(screens).length}개 화면
        </p>
        {Object.keys(screens).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setSelected(name)}
            style={{
              textAlign: 'left',
              padding: '6px 10px',
              fontSize: 12,
              background: selected === name ? '#1a73e8' : '#f5f5f5',
              color: selected === name ? '#fff' : '#333',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: selected === name ? 700 : 400,
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* 스크린샷 */}
      <div style={{
        flex: 1,
        background: fallbackBg,
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <p style={{
          fontSize: 14,
          fontWeight: 700,
          color: mode === 'low-power' ? '#ccc' : '#333',
          padding: '12px 0 8px',
        }}>
          {selected}
        </p>
        <img
          src={screens[selected as keyof typeof screens]}
          alt={selected}
          style={{ maxWidth: '100%', maxHeight: 600, objectFit: 'contain' }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <p style={{ fontSize: 11, color: '#999', padding: '8px 0', textAlign: 'center' }}>
          출처: kioskui.or.kr | XFrame5 소스 파일은 사이트에서 설문 완료 후 다운로드
        </p>
      </div>
    </div>
  )
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Templates/무인민원발급기',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

// ── 스토리: 3개 모드 ──────────────────────────────────────────────────────────

/**
 * 기본 모드 — 16개 화면
 * 시작안내 → 증명서 선택 → 본인확인 → 옵션 → 내역 → 결제 → 발권 → 완료
 */
export const Normal: Story = {
  name: '기본 (Normal)',
  render: () => (
    <div style={{ padding: 24 }}>
      <ScreenViewer
        screens={SCREENS.normal}
        mode="normal"
        fallbackBg="#f8f8f8"
      />
    </div>
  ),
}

/**
 * 고대비 모드 (KWCAG 2.2) — 15개 화면
 * 색 대비 4.5:1 이상, 흑백 기반 UI
 */
export const HighContrast: Story = {
  name: '고대비 (High Contrast)',
  render: () => (
    <div style={{ padding: 24, background: '#fff' }}>
      <ScreenViewer
        screens={SCREENS['high-contrast']}
        mode="high-contrast"
        fallbackBg="#ffffff"
      />
    </div>
  ),
}

/**
 * 낮은 화면 / 저전력 모드 — 15개 화면
 * 화면 하단에 컨트롤 배치, 다크 배경, 대형 폰트
 */
export const LowPower: Story = {
  name: '낮은 화면 (Low Power)',
  render: () => (
    <div style={{ padding: 24, background: '#111' }}>
      <ScreenViewer
        screens={SCREENS['low-power']}
        mode="low-power"
        fallbackBg="#111111"
      />
    </div>
  ),
}

/**
 * 3가지 모드 나란히 비교 — 시작안내 화면 기준
 */
export const ModeComparison: Story = {
  name: '3가지 모드 비교 (시작안내)',
  render: () => (
    <div style={{ padding: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['normal', 'high-contrast', 'low-power'] as const).map((mode) => (
        <div key={mode} style={{ flex: 1, minWidth: 280 }}>
          <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
            {mode}
          </p>
          <img
            src={SCREENS[mode]['시작안내']}
            alt={`${mode} 시작안내`}
            style={{
              width: '100%',
              borderRadius: 8,
              border: '1px solid #eee',
              background: mode === 'low-power' ? '#111' : '#fff',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.opacity = '0.3'
            }}
          />
        </div>
      ))}
    </div>
  ),
}

/**
 * 전체 발급 흐름 — 기본 모드 모든 화면
 */
export const FullFlow: Story = {
  name: '전체 흐름 (기본 모드)',
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
        무인민원발급기 전체 발급 프로세스 (기본 모드): {Object.keys(SCREENS.normal).length}개 화면
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {Object.entries(SCREENS.normal).map(([name, src]) => (
          <div key={name} style={{ width: 200, textAlign: 'center' }}>
            <p style={{ fontSize: 11, marginBottom: 4, color: '#555' }}>{name}</p>
            <img
              src={src}
              alt={name}
              style={{ width: '100%', borderRadius: 6, border: '1px solid #eee' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = '0.2'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
}
