/**
 * fetch-tokens.ts
 * Calls Figma Variables REST API and saves raw response to raw-figma-tokens.json
 *
 * Usage:
 *   FIGMA_API_TOKEN=figd_xxx FIGMA_FILE_KEY=Iew4yIdKQmrrxxGbJHj97l tsx fetch-tokens.ts
 */

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '.env') })

// Allow self-signed certificates (corporate proxy environments)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const API_TOKEN = process.env.FIGMA_API_TOKEN
const FILE_KEY = process.env.FIGMA_FILE_KEY ?? 'Iew4yIdKQmrrxxGbJHj97l'

if (!API_TOKEN) {
  console.error('❌ FIGMA_API_TOKEN environment variable is required')
  console.error('   export FIGMA_API_TOKEN=figd_your_token_here')
  process.exit(1)
}

const API_URL = `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`

async function fetchFigmaVariables() {
  console.log(`📡 Fetching Figma variables from file: ${FILE_KEY}`)

  const response = await fetch(API_URL, {
    headers: {
      'X-Figma-Token': API_TOKEN,
    },
  })

  if (!response.ok) {
    const text = await response.text()
    console.error(`❌ Figma API error ${response.status}: ${text}`)
    if (response.status === 403 && text.includes('file_variables:read')) {
      console.error('\n💡 Fix: Regenerate your Figma token with the "file_variables:read" scope.')
      console.error('   Go to: https://www.figma.com/settings → Personal access tokens')
      console.error('   → Add token → enable "File content" → Variables (read)')
    }
    process.exit(1)
  }

  const data = await response.json()

  const outputPath = resolve(__dirname, 'raw-figma-tokens.json')
  writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8')
  console.log(`✅ Raw tokens saved to: raw-figma-tokens.json`)

  // Summary
  const meta = data.meta
  if (meta) {
    const variableCount = Object.keys(meta.variables ?? {}).length
    const collectionCount = Object.keys(meta.variableCollections ?? {}).length
    console.log(`   Collections: ${collectionCount}, Variables: ${variableCount}`)
  }
}

fetchFigmaVariables().catch((err) => {
  console.error('❌ Unexpected error:', err)
  process.exit(1)
})
