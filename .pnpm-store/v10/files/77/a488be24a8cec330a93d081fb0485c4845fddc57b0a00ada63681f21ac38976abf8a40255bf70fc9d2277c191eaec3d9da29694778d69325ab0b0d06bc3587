import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams } from '@vxe-ui/core'
import { VxeAnchorPropTypes } from './anchor'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeAnchorLink: DefineVxeComponentApp<VxeAnchorLinkProps, VxeAnchorLinkEventProps, VxeAnchorLinkSlots, VxeAnchorLinkMethods>
export type VxeAnchorLinkComponent = DefineVxeComponentOptions<VxeAnchorLinkProps, VxeAnchorLinkEventProps>

export type VxeAnchorLinkInstance = DefineVxeComponentInstance<VxeAnchorLinkProps, VxeAnchorLinkConstructor>

export interface VxeAnchorLinkConstructor extends VxeComponentBaseOptions, VxeAnchorLinkMethods {
  props: VxeAnchorLinkProps
  context: SetupContext<VxeAnchorLinkEmits>
  reactData: AnchorLinkReactData
  linkConfig: VxeAnchorLinkDefines.LinkConfig
  getRefMaps(): AnchorLinkPrivateRef
  getComputeMaps(): AnchorLinkPrivateComputed
  renderVN: RenderFunction
}

export interface AnchorLinkPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeAnchorLinkPrivateRef extends AnchorLinkPrivateRef { }

export namespace VxeAnchorLinkPropTypes {
  export type Content = string | number
  export type Title = string | number
  export type Href = string
}

export type VxeAnchorLinkProps = {
  content?: VxeAnchorLinkPropTypes.Content
  title?: VxeAnchorLinkPropTypes.Title
  href?: VxeAnchorLinkPropTypes.Href

  children?: VxeAnchorLinkProps[]
}

export interface AnchorLinkPrivateComputed {
}
export interface VxeAnchorLinkPrivateComputed extends AnchorLinkPrivateComputed { }

export interface AnchorLinkReactData {
}

export interface AnchorLinkMethods {
}
export interface VxeAnchorLinkMethods extends AnchorLinkMethods { }

export interface AnchorLinkPrivateMethods { }
export interface VxeAnchorLinkPrivateMethods extends AnchorLinkPrivateMethods { }

export type VxeAnchorLinkEmits = []

export namespace VxeAnchorLinkDefines {
  export interface LinkConfig {
    id: string
    href: VxeAnchorPropTypes.ModelValue | undefined
    children: LinkConfig[]
  }

  export interface AnchorLinkEventParams extends VxeComponentEventParams {
    $anchorLink: VxeAnchorLinkConstructor
  }
}

export type VxeAnchorLinkEventProps = {}

export interface VxeAnchorLinkListeners { }

export namespace VxeAnchorLinkEvents { }

export namespace VxeAnchorLinkSlotTypes {
  export interface DefaultSlotParams {}
  export interface SubSlotParams {}
}
export interface VxeAnchorLinkSlots {
  /**
   * 自定义显示内容模板
   */
  default?: (params: VxeAnchorLinkSlotTypes.DefaultSlotParams) => any
  /**
   * 自定义子项模板
   */
  sub?: (params: VxeAnchorLinkSlotTypes.SubSlotParams) => any
}

export const AnchorLink: typeof VxeAnchorLink
export default VxeAnchorLink
