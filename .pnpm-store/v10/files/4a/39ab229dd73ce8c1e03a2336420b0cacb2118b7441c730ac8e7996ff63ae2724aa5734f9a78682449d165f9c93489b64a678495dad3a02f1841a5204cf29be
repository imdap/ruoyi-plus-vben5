import { createRequire } from 'node:module'
let cachedImport
let hasTriedLoadingTypescript = false
function getTypescriptImport() {
  if (cachedImport) {
    return cachedImport
  }
  if (hasTriedLoadingTypescript) {
    return null
  }
  hasTriedLoadingTypescript = true
  try {
    cachedImport = createRequire(import.meta.url)('typescript')
  } catch (_error) {
    return null
  }
  return cachedImport
}
export { getTypescriptImport }
