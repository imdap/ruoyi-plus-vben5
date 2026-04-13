import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf, VxeComponentSlotType, VxeComponentSizeType } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeContextMenu: DefineVxeComponentApp<VxeContextMenuProps, VxeContextMenuEventProps, VxeContextMenuSlots, VxeContextMenuMethods>
export type VxeContextMenuComponent = DefineVxeComponentOptions<VxeContextMenuProps, VxeContextMenuEventProps>

export type VxeContextMenuInstance = DefineVxeComponentInstance<VxeContextMenuProps, VxeContextMenuConstructor>

export interface VxeContextMenuConstructor extends VxeComponentBaseOptions, VxeContextMenuMethods {
  props: VxeContextMenuProps
  context: SetupContext<VxeContextMenuEmits>
  internalData: ContextMenuInternalData
  reactData: ContextMenuReactData
  getRefMaps(): ContextMenuPrivateRef
  getComputeMaps(): ContextMenuPrivateComputed
  renderVN: RenderFunction
}

export interface ContextMenuPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeContextMenuPrivateRef extends ContextMenuPrivateRef { }

export namespace VxeContextMenuPropTypes {
  export type ModelValue = boolean
  export type X = string | number
  export type Y = string | number
  export type ClassName = string
  export type Size = VxeComponentSizeType
  export type Options = VxeContextMenuDefines.MenuFirstOption[][]
  export type Position = null | '' | 'absolute' | 'fixed'
  export type AutoLocate = boolean
  export type ZIndex = string | number
  export type DestroyOnClose = boolean
  export type Transfer = boolean
}

export type VxeContextMenuProps = {
  modelValue?: VxeContextMenuPropTypes.ModelValue
  x?: VxeContextMenuPropTypes.X
  y?: VxeContextMenuPropTypes.Y
  className?: VxeContextMenuPropTypes.ClassName
  size?: VxeContextMenuPropTypes.Size
  options?: VxeContextMenuPropTypes.Options
  position?: VxeContextMenuPropTypes.Position
  autoLocate?: VxeContextMenuPropTypes.AutoLocate
  zIndex?: VxeContextMenuPropTypes.ZIndex
  destroyOnClose?: VxeContextMenuPropTypes.DestroyOnClose
  transfer?: VxeContextMenuPropTypes.Transfer
}

export interface ContextMenuPrivateComputed {
}
export interface VxeContextMenuPrivateComputed extends ContextMenuPrivateComputed { }

export interface ContextMenuInternalData {
  leaveTime?: any
}

export interface ContextMenuReactData {
  visible: boolean
  activeOption: any
  activeChildOption: any
  popupStyle: {
    top: string
    left: string
    zIndex: number
  }
  childOffsetX: number
}

export interface ContextMenuMethods {
  dispatchEvent(type: ValueOf<VxeContextMenuEmits>, params: Record<string, any>, evnt: Event | null): void
  open(): Promise<void>
  close(): Promise<void>
}
export interface VxeContextMenuMethods extends ContextMenuMethods { }

export interface ContextMenuPrivateMethods { }
export interface VxeContextMenuPrivateMethods extends ContextMenuPrivateMethods { }

export type VxeContextMenuEmits = [
  'update:modelValue',
  'option-click',
  'change',
  'show',
  'hide'
]

export namespace VxeContextMenuDefines {
  export type ContextMenuOpenOptions = Pick<VxeContextMenuProps, 'options' | 'x' | 'y' | 'className' | 'size' | 'zIndex'> & {
    events?: VxeContextMenuListeners
  }
  export type ContextMenuEventOpenOptions = Omit<ContextMenuOpenOptions, 'x' | 'y'>

  export interface MenuFirstOption {
    /**
     * 菜单唯一编码
     */
    code?: string
    /**
     * 菜单名称
     */
    name?: string
    /**
     * 前缀配置项
     */
    prefixConfig?: {
      icon?: string | ((params: {}) => VxeComponentSlotType[] | VxeComponentSlotType)
      content?: string
      className?: string
    }
    /**
     * 前缀图标 prefixConfig.icon 的简写
     */
    prefixIcon?: string | ((params: {}) => VxeComponentSlotType[] | VxeComponentSlotType)
    /**
     * 后缀配置项
     */
    suffixConfig?: {
      icon?: string | ((params: {}) => VxeComponentSlotType[] | VxeComponentSlotType)
      content?: string
      className?: string
    }
    /**
     * 后缀图标 suffixConfig.icon 的简写
     */
    suffixIcon?: string | ((params: {}) => VxeComponentSlotType[] | VxeComponentSlotType)
    className?: string
    /**
     * 是否加载中
     */
    loading?: boolean
    /**
     * 是否显示
     */
    visible?: boolean
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 二级菜单列表
     */
    children?: MenuChildOption[]
    params?: any
    /**
     * 自定义插槽模板
     */
    slots?: {
      content?: string | ((params: VxeContextMenuSlotTypes.ContentSlotParams) => VxeComponentSlotType | VxeComponentSlotType[])
    }
    [key: string]: any
  }
  export interface MenuChildOption {
    /**
     * 菜单唯一编码
     */
    code?: string
    /**
     * 菜单名称
     */
    name?: string
    /**
     * 前缀配置项
     */
    prefixConfig?: {
      icon?: string | ((params: {}) => VxeComponentSlotType[] | VxeComponentSlotType)
      content?: string
      className?: string
    }
    /**
     * 前缀图标 prefixConfig.icon 的简写
     */
    prefixIcon?: string | ((params: {}) => VxeComponentSlotType[] | VxeComponentSlotType)
    /**
     * 后缀配置项
     */
    suffixConfig?: {
      icon?: string | ((params: {}) => VxeComponentSlotType[] | VxeComponentSlotType)
      content?: string
      className?: string
    }
    /**
     * 后缀图标 suffixConfig.icon 的简写
     */
    suffixIcon?: string | ((params: {}) => VxeComponentSlotType[] | VxeComponentSlotType)
    className?: string
    /**
     * 是否加载中
     */
    loading?: boolean
    /**
     * 是否显示
     */
    visible?: boolean
    /**
     * 是否禁用
     */
    disabled?: boolean
    params?: any
    /**
     * 自定义插槽模板
     */
    slots?: {
      content?: string | ((params: VxeContextMenuSlotTypes.ContentSlotParams) => VxeComponentSlotType | VxeComponentSlotType[])
    }
    [key: string]: any
  }

  export interface ContextMenuEventParams extends VxeComponentEventParams {
    $contextMenu: VxeContextMenuConstructor
  }

  export interface ChangeEventParams extends ContextMenuEventParams {
    value: boolean
  }

  export interface OptionClickEventParams extends ContextMenuEventParams {
    option: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption
  }

  export interface ShowEventParams extends ContextMenuEventParams {
    visible: boolean
  }
  export interface HideEventParams extends ShowEventParams {}
}

export type VxeContextMenuEventProps = {
  'onUpdate:modelValue'?: VxeContextMenuEvents.UpdateModelValue
  onChange?: VxeContextMenuEvents.Change
  onOptionClick?: VxeContextMenuEvents.OptionClick
  onShow?: VxeContextMenuEvents.Show
  onHide?: VxeContextMenuEvents.Hide
}

export interface VxeContextMenuListeners {
  'update:modelValue'?: VxeContextMenuEvents.UpdateModelValue
  change?: VxeContextMenuEvents.Change
  optionClick?: VxeContextMenuEvents.OptionClick
  show?: VxeContextMenuEvents.Show
  hide?: VxeContextMenuEvents.Hide
}

export namespace VxeContextMenuEvents {
  export type UpdateModelValue = (modelValue: VxeContextMenuPropTypes.ModelValue) => void
  export type Change = (params: VxeContextMenuDefines.ChangeEventParams) => void
  export type OptionClick = (params: VxeContextMenuDefines.OptionClickEventParams) => void
  export type Show = (params: VxeContextMenuDefines.ShowEventParams) => void
  export type Hide = (params: VxeContextMenuDefines.HideEventParams) => void
}

export namespace VxeContextMenuSlotTypes {
  export interface DefaultSlotParams {}

  export interface ContentSlotParams {
    option: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption
  }
}

export interface VxeContextMenuSlots {
  [key: string]: ((params: VxeContextMenuSlotTypes.DefaultSlotParams) => any) | undefined
}

/**
 * 全局右键菜单
 */
export interface ContextMenuController {
  /**
   * 通过传 x,y 坐标打开
   * @param options 参数
   */
  open(options: VxeContextMenuDefines.ContextMenuOpenOptions): void
  /**
   * 通过事件打开
   * @param evnt 事件
   * @param options 参数
   */
  openByEvent(evnt: MouseEvent, options: VxeContextMenuDefines.ContextMenuEventOpenOptions): void
  /**
   * 关闭
   */
  close(): void
}

export const ContextMenu: typeof VxeContextMenu
export default VxeContextMenu
