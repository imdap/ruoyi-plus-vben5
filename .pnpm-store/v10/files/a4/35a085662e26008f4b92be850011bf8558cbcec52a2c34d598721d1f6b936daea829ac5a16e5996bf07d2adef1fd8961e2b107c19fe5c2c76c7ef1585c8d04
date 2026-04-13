import { VxeCore } from './core'
import { themeConfigStore } from './themeStore'

import { VxeGlobalThemeName } from '../../types'

export function setTheme (name?: VxeGlobalThemeName) {
  const theme = !name || name === 'default' ? 'light' : name
  themeConfigStore.theme = theme
  if (typeof document !== 'undefined') {
    const documentElement = document.documentElement
    if (documentElement) {
      documentElement.setAttribute('data-vxe-ui-theme', theme)
    }
  }
  return VxeCore
}

export function getTheme () {
  return themeConfigStore.theme
}
