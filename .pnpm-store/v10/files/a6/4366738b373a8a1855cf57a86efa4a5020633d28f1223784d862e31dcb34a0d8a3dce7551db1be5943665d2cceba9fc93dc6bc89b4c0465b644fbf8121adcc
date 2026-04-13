import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentAlignType, VxeComponentBaseOptions, VxeComponentEventParams } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeWatermark: DefineVxeComponentApp<VxeWatermarkProps, VxeWatermarkEventProps, VxeWatermarkSlots, VxeWatermarkMethods>
export type VxeWatermarkComponent = DefineVxeComponentOptions<VxeWatermarkProps, VxeWatermarkEventProps>

export type VxeWatermarkInstance = DefineVxeComponentInstance<VxeWatermarkProps, VxeWatermarkConstructor>

export interface VxeWatermarkConstructor extends VxeComponentBaseOptions, VxeWatermarkMethods {
  props: VxeWatermarkProps
  context: SetupContext<VxeWatermarkEmits>
  reactData: WatermarkReactData
  getRefMaps(): WatermarkPrivateRef
  getComputeMaps(): WatermarkPrivateComputed
  renderVN: RenderFunction
}

export interface WatermarkPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeWatermarkPrivateRef extends WatermarkPrivateRef { }

export namespace VxeWatermarkPropTypes {
  export type Width = number | string
  export type Height = number | string
  export type ImageUrl = string
  export type Rotate = number | string
  export type Gap = number | string | (number | string)[]
  export type Content = number | string | VxeWatermarkDefines.ContentConf | (number | string | VxeWatermarkDefines.ContentConf)[]
  export type Font = {
    fontSize?: number | string
    color?: string
    align?: VxeComponentAlignType
    fontWeight?: number | 'normal' | 'bolder' | 'bold' | 'lighter'
    fontFamily?: string
    fontStyle?: 'normal' | 'italic' | 'oblique'
  }
  export type Offset = number | string | (number | string)[]
  export type ZIndex = number | string
}

export interface VxeWatermarkProps {
  width?: VxeWatermarkPropTypes.Width
  height?: VxeWatermarkPropTypes.Height
  imageUrl?: VxeWatermarkPropTypes.ImageUrl
  rotate?: VxeWatermarkPropTypes.Rotate
  gap?: VxeWatermarkPropTypes.Gap
  content?: VxeWatermarkPropTypes.Content
  font?: VxeWatermarkPropTypes.Font
  offset?: VxeWatermarkPropTypes.Offset
  zIndex?: VxeWatermarkPropTypes.ZIndex
}

export interface WatermarkPrivateComputed {
}
export interface VxeWatermarkPrivateComputed extends WatermarkPrivateComputed { }

export interface WatermarkReactData {
  markUrl: string
}

export interface WatermarkMethods {
}
export interface VxeWatermarkMethods extends WatermarkMethods { }

export interface WatermarkPrivateMethods { }
export interface VxeWatermarkPrivateMethods extends WatermarkPrivateMethods { }

export type VxeWatermarkEmits = []

export namespace VxeWatermarkDefines {
  export interface WatermarkEventParams extends VxeComponentEventParams {
    $watermark: VxeWatermarkConstructor
  }

  export interface ContentConf {
    font?: VxeWatermarkPropTypes.Font
    textContent: string
  }

  export interface ContentObj {
    text: string
    fontSize: number
    font: VxeWatermarkPropTypes.Font | undefined
    width: number
    height: number
  }
}

export type VxeWatermarkEventProps = {}

export interface VxeWatermarkListeners { }

export namespace VxeWatermarkEvents { }

export namespace VxeWatermarkSlotTypes {
}

export interface VxeWatermarkSlots {
}

/**
   * 全局水印控制器
   */
export interface WatermarkController {
  /**
   * 加载水印
   * @param options 参数
   */
  load(options: VxeWatermarkProps): Promise<any>
  /**
   * 清除水印
   */
  clear(): Promise<any>
}

export const Watermark: typeof VxeWatermark
export default VxeWatermark
