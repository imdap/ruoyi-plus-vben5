import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeContextMenuComponent from './src/context-menu'
import { dynamicApp, dynamicStore, checkDynamic } from '../dynamics'

import type { VxeContextMenuDefines } from '../../types'

export const VxeContextMenu = Object.assign({}, VxeContextMenuComponent, {
  install (app: App) {
    app.component(VxeContextMenuComponent.name as string, VxeContextMenuComponent)
  }
})

function openMenu (opts: VxeContextMenuDefines.ContextMenuOpenOptions, x: number, y :number) {
  dynamicStore.globalContextMenu = {
    modelValue: true,
    options: opts.options,
    className: opts.className,
    size: opts.size,
    zIndex: opts.zIndex,
    x,
    y,
    position: 'fixed',
    destroyOnClose: true,
    transfer: false,
    events: opts.events
  }
  checkDynamic()
}

export const ContextMenuController = {
  open (options: VxeContextMenuDefines.ContextMenuOpenOptions) {
    const opts = Object.assign({ x: 0, y: 0 }, options)
    openMenu(opts, opts.x, opts.y)
  },
  openByEvent (evnt: MouseEvent, options: VxeContextMenuDefines.ContextMenuEventOpenOptions) {
    evnt.preventDefault()
    evnt.stopPropagation()
    const opts = Object.assign({}, options)
    const x = evnt.clientX + 1
    const y = evnt.clientY + 1
    openMenu(opts, x, y)
  },
  close () {
    dynamicStore.globalContextMenu = null
  }
}

dynamicApp.use(VxeContextMenu)
VxeUI.component(VxeContextMenuComponent)
VxeUI.contextMenu = ContextMenuController

export const ContextMenu = VxeContextMenu
export default VxeContextMenu
