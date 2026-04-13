import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf } from '@vxe-ui/core'
import { VxeColumnPropTypes, VxeColumnSlotTypes } from './column'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeColgroup: DefineVxeComponentApp<VxeColgroupProps, VxeColgroupEventProps, VxeColgroupSlots, VxeColgroupMethods>
export type VxeColgroupComponent = DefineVxeComponentOptions<VxeColgroupProps, VxeColgroupEventProps>

export type VxeColgroupInstance = DefineVxeComponentInstance<VxeColgroupProps, VxeColgroupConstructor>

export interface VxeColgroupConstructor extends VxeComponentBaseOptions, VxeColgroupMethods {
  props: VxeColgroupProps
  context: SetupContext<VxeColgroupEmits>
  reactData: ColgroupReactData
  getRefMaps(): ColgroupPrivateRef
  getComputeMaps(): ColgroupPrivateComputed
  renderVN: RenderFunction
}

export interface ColgroupPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeColgroupPrivateRef extends ColgroupPrivateRef { }

export namespace VxeColgroupPropTypes {
}

export type VxeColgroupProps = {
  /**
   * 渲染类型
   */
  type?: VxeColumnPropTypes.Type
  /**
   * 列字段名
   */
  field?: VxeColumnPropTypes.Field
  /**
   * 列标题
   */
  title?: VxeColumnPropTypes.Title
  /**
   * 列宽度
   */
  width?: VxeColumnPropTypes.Width
  /**
   * 列最小宽度，把剩余宽度按比例分配
   */
  minWidth?: VxeColumnPropTypes.MinWidth
  /**
   * 是否允许拖动列宽调整大小
   */
  resizable?: VxeColumnPropTypes.Resizable
  /**
   * 将列固定在左侧或者右侧
   */
  fixed?: VxeColumnPropTypes.Fixed
  /**
   * 列对齐方式
   */
  align?: VxeColumnPropTypes.Align
  /**
   * 表头对齐方式
   */
  headerAlign?: VxeColumnPropTypes.HeaderAlign
  /**
   * 当内容过长时显示为省略号
   */
  showOverflow?: VxeColumnPropTypes.ShowOverflow
  /**
   * 当表头内容过长时显示为省略号
   */
  showHeaderOverflow?: VxeColumnPropTypes.ShowHeaderOverflow
  /**
   * 给单元格附加 className
   */
  className?: VxeColumnPropTypes.ClassName
  /**
   * 给表头单元格附加 className
   */
  headerClassName?: VxeColumnPropTypes.HeaderClassName
  /**
   * 是否可视
   */
  visible?: VxeColumnPropTypes.Visible
  /**
   * 额外的参数
   */
  params?: VxeColumnPropTypes.Params
}

export interface ColgroupPrivateComputed {
}
export interface VxeColgroupPrivateComputed extends ColgroupPrivateComputed { }

export interface ColgroupReactData {
}

export interface ColgroupMethods {
  dispatchEvent(type: ValueOf<VxeColgroupEmits>, params: Record<string, any>, evnt: Event | null): void
}
export interface VxeColgroupMethods extends ColgroupMethods { }

export interface ColgroupPrivateMethods { }
export interface VxeColgroupPrivateMethods extends ColgroupPrivateMethods { }

export type VxeColgroupEmits = []

export namespace VxeColgroupDefines {
  export interface ColgroupEventParams extends VxeComponentEventParams {
    $colgroup: VxeColgroupConstructor
  }
}

export type VxeColgroupEventProps = {}

export interface VxeColgroupListeners { }

export namespace VxeColgroupEvents { }

export namespace VxeColgroupSlotTypes {
  export interface DefaultSlotParams {}
}

export interface VxeColgroupSlots<D = any> {
  /**
   * 自定义表头内容的模板
   */
  header?: (params: VxeColumnSlotTypes.HeaderSlotParams<D>) => any
  /**
   * 只对 type=checkbox,radio 有效，自定义标题模板
   */
  title?: (params: VxeColumnSlotTypes.HeaderSlotParams<D>) => any
}

export const Colgroup: typeof VxeColgroup
export default VxeColgroup
