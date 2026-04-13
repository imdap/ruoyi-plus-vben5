import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSizeType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeMention: DefineVxeComponentApp<VxeMentionProps, VxeMentionEventProps, VxeMentionSlots, VxeMentionMethods>
export type VxeMentionComponent = DefineVxeComponentOptions<VxeMentionProps, VxeMentionEventProps>

export type VxeMentionInstance = DefineVxeComponentInstance<VxeMentionProps, VxeMentionConstructor>

export interface VxeMentionConstructor extends VxeComponentBaseOptions, VxeMentionMethods {
  props: VxeMentionProps
  context: SetupContext<VxeMentionEmits>
  reactData: MentionReactData
  getRefMaps(): MentionPrivateRef
  getComputeMaps(): MentionPrivateComputed
  renderVN: RenderFunction
}

export interface MentionPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeMentionPrivateRef extends MentionPrivateRef { }

export namespace VxeMentionPropTypes {
  export type Size = VxeComponentSizeType
}

export type VxeMentionProps = {
  size?: VxeMentionPropTypes.Size
}

export interface MentionPrivateComputed {
}
export interface VxeMentionPrivateComputed extends MentionPrivateComputed { }

export interface MentionReactData {
}

export interface MentionMethods {
  dispatchEvent(type: ValueOf<VxeMentionEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeMentionMethods extends MentionMethods { }

export interface MentionPrivateMethods { }
export interface VxeMentionPrivateMethods extends MentionPrivateMethods { }

export type VxeMentionEmits = [
]

export namespace VxeMentionDefines {
  export interface MentionEventParams extends VxeComponentEventParams {
    $mention: VxeMentionConstructor
  }

  export interface ClickEventParams extends MentionEventParams { }
  export interface CloseEventParams extends MentionEventParams { }
}

export type VxeMentionEventProps = {
}

export interface VxeMentionListeners {
}

export namespace VxeMentionEvents {
}

export namespace VxeMentionSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeMentionSlots {
}

export const Mention: typeof VxeMention
export default VxeMention
