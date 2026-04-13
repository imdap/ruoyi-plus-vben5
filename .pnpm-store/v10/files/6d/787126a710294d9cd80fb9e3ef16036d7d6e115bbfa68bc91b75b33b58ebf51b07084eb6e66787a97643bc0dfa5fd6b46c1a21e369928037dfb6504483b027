import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeMenuComponent from './src/menu'
import { dynamicApp } from '../dynamics'

export const VxeMenu = Object.assign({}, VxeMenuComponent, {
  install (app: App) {
    app.component(VxeMenuComponent.name as string, VxeMenuComponent)
  }
})

dynamicApp.use(VxeMenu)
VxeUI.component(VxeMenuComponent)

export const Menu = VxeMenu
export default VxeMenu
