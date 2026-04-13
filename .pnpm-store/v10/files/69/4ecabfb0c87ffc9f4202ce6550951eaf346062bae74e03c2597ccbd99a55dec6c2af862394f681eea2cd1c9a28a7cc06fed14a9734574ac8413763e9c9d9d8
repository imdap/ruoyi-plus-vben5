import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTimelineItemComponent from '../timeline/src/timeline-item'
import { dynamicApp } from '../dynamics'

export const VxeTimelineItem = Object.assign({}, VxeTimelineItemComponent, {
  install (app: App) {
    app.component(VxeTimelineItemComponent.name as string, VxeTimelineItemComponent)
  }
})

dynamicApp.use(VxeTimelineItem)
VxeUI.component(VxeTimelineItemComponent)

export const TimelineItem = VxeTimelineItem
export default VxeTimelineItem
