import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeNoticeBarComponent from './src/notice-bar'
import { dynamicApp } from '../dynamics'

export const VxeNoticeBar = Object.assign({}, VxeNoticeBarComponent, {
  install (app: App) {
    app.component(VxeNoticeBarComponent.name as string, VxeNoticeBarComponent)
  }
})

dynamicApp.use(VxeNoticeBar)
VxeUI.component(VxeNoticeBarComponent)

export const NoticeBar = VxeNoticeBar
export default VxeNoticeBar
