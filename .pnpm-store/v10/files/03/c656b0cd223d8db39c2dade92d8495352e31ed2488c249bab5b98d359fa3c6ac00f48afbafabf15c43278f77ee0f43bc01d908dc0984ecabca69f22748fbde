import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTimelineComponent from './src/timeline'
import { dynamicApp } from '../dynamics'

export const VxeTimeline = Object.assign({}, VxeTimelineComponent, {
  install (app: App) {
    app.component(VxeTimelineComponent.name as string, VxeTimelineComponent)
  }
})

dynamicApp.use(VxeTimeline)
VxeUI.component(VxeTimelineComponent)

export const Timeline = VxeTimeline
export default VxeTimeline
