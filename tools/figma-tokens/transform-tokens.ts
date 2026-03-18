/**
 * transform-tokens.ts
 * Transforms raw Figma Variables JSON into Style Dictionary token format.
 * Maps Figma modes (Normal/HighContrast/LowPower) to kiosk display modes.
 *
 * Usage: tsx transform-tokens.ts
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const INPUT = resolve(__dirname, 'raw-figma-tokens.json')
const OUTPUT = resolve(__dirname, 'tokens.json')

/** Maps Figma mode names to kiosk display modes */
const MODE_MAP: Record<string, string> = {
  Normal: 'normal',
  'High Contrast': 'high-contrast',
  HighContrast: 'high-contrast',
  'Low Power': 'low-power',
  LowPower: 'low-power',
}

interface FigmaVariable {
  id: string
  name: string
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN'
  valuesByMode: Record<string, unknown>
  description?: string
}

interface FigmaCollection {
  id: string
  name: string
  modes: Array<{ modeId: string; name: string }>
  variableIds: string[]
}

interface StyleDictionaryToken {
  value: unknown
  type: string
  description?: string
  attributes?: Record<string, string>
}

function resolveValue(value: unknown): unknown {
  if (typeof value === 'object' && value !== null && 'r' in value) {
    // Figma RGBA color
    const c = value as { r: number; g: number; b: number; a: number }
    const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0')
    return `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`
  }
  return value
}

function tokenType(resolvedType: string): string {
  switch (resolvedType) {
    case 'COLOR': return 'color'
    case 'FLOAT': return 'dimension'
    case 'STRING': return 'fontFamily'
    default: return 'other'
  }
}

function namePath(name: string): string[] {
  return name.split('/').map((s) => s.trim().replace(/\s+/g, '-').toLowerCase())
}

function setNested(obj: Record<string, unknown>, path: string[], value: unknown): void {
  let cur = obj
  for (let i = 0; i < path.length - 1; i++) {
    if (!(path[i] in cur)) cur[path[i]] = {}
    cur = cur[path[i]] as Record<string, unknown>
  }
  cur[path[path.length - 1]] = value
}

function transformTokens() {
  if (!existsSync(INPUT)) {
    console.error('❌ raw-figma-tokens.json not found. Run fetch-tokens.ts first.')
    process.exit(1)
  }

  const raw = JSON.parse(readFileSync(INPUT, 'utf-8'))
  const meta = raw.meta ?? {}
  const variables: Record<string, FigmaVariable> = meta.variables ?? {}
  const collections: Record<string, FigmaCollection> = meta.variableCollections ?? {}

  const result: Record<string, Record<string, unknown>> = {
    normal: {},
    'high-contrast': {},
    'low-power': {},
    global: {},
  }

  for (const collection of Object.values(collections)) {
    const modeIdToName: Record<string, string> = {}
    for (const mode of collection.modes) {
      modeIdToName[mode.modeId] = MODE_MAP[mode.name] ?? mode.name.toLowerCase()
    }

    for (const varId of collection.variableIds) {
      const variable = variables[varId]
      if (!variable) continue

      const path = namePath(variable.name)
      const type = tokenType(variable.resolvedType)

      for (const [modeId, rawValue] of Object.entries(variable.valuesByMode)) {
        const modeName = modeIdToName[modeId] ?? 'global'
        const target = result[modeName] ?? result.global

        const token: StyleDictionaryToken = {
          value: resolveValue(rawValue),
          type,
          ...(variable.description ? { description: variable.description } : {}),
        }

        setNested(target, path, token)
      }
    }
  }

  writeFileSync(OUTPUT, JSON.stringify(result, null, 2), 'utf-8')
  console.log('✅ tokens.json written')

  const counts = Object.entries(result).map(([mode, tokens]) => {
    const count = JSON.stringify(tokens).match(/"value"/g)?.length ?? 0
    return `${mode}: ${count}`
  })
  console.log('   Tokens by mode:', counts.join(', '))
}

transformTokens()
