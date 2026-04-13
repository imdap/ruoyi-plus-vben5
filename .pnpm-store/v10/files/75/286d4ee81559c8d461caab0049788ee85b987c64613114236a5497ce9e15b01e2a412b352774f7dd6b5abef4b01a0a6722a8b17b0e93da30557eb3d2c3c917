import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeColComponent from '../row/src/col'
import { dynamicApp } from '../dynamics'

export const VxeCol = Object.assign({}, VxeColComponent, {
  install (app: App) {
    app.component(VxeColComponent.name as string, VxeColComponent)
  }
})

dynamicApp.use(VxeCol)
VxeUI.component(VxeColComponent)

export const Col = VxeCol
export default VxeCol
