import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeTimeline: DefineVxeComponentApp<VxeTimelineProps, VxeTimelineEventProps, VxeTimelineSlots, VxeTimelineMethods>
export type VxeTimelineComponent = DefineVxeComponentOptions<VxeTimelineProps, VxeTimelineEventProps>

export type VxeTimelineInstance = DefineVxeComponentInstance<VxeTimelineProps, VxeTimelineConstructor>

export interface VxeTimelineConstructor extends VxeComponentBaseOptions, VxeTimelineMethods {
  props: VxeTimelineProps
  context: SetupContext<VxeTimelineEmits>
  reactData: TimelineReactData
  getRefMaps(): TimelinePrivateRef
  getComputeMaps(): TimelinePrivateComputed
  renderVN: RenderFunction
}

export interface TimelinePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeTimelinePrivateRef extends TimelinePrivateRef { }

export namespace VxeTimelinePropTypes {
  export type Size = VxeComponentSizeType
}

export type VxeTimelineProps = {
  size?: VxeTimelinePropTypes.Size
}

export interface TimelinePrivateComputed {
}
export interface VxeTimelinePrivateComputed extends TimelinePrivateComputed { }

export interface TimelineReactData {
}

export interface TimelineMethods {
  dispatchEvent(type: ValueOf<VxeTimelineEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeTimelineMethods extends TimelineMethods { }

export interface TimelinePrivateMethods { }
export interface VxeTimelinePrivateMethods extends TimelinePrivateMethods { }

export type VxeTimelineEmits = [
]

export namespace VxeTimelineDefines {
  export interface TimelineEventParams extends VxeComponentEventParams {
    $timeline: VxeTimelineConstructor
  }

  export interface ClickEventParams extends TimelineEventParams { }
  export interface CloseEventParams extends TimelineEventParams { }
}

export type VxeTimelineEventProps = {
}

export interface VxeTimelineListeners {
}

export namespace VxeTimelineEvents {
}

export namespace VxeTimelineSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeTimelineSlots {
}

export const Timeline: typeof VxeTimeline
export default VxeTimeline
