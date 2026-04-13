import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentStyleType, VxeComponentSlotType } from '@vxe-ui/core'
import { VxeFormDefines, VxeFormConstructor, VxeFormPropTypes } from './form'
import { VxeGridConstructor } from './grid'
import { VxeTooltipDefines } from './tooltip'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeFormItem: DefineVxeComponentApp<VxeFormItemProps, VxeFormItemEventProps, VxeFormItemSlots, VxeFormItemMethods>
export type VxeFormItemComponent = DefineVxeComponentOptions<VxeFormItemProps, VxeFormItemEventProps>

export interface VxeFormItemConstructor extends VxeComponentBaseOptions, VxeFormItemMethods {
  props: VxeFormItemProps
  context: SetupContext<VxeFormItemEmits>
  reactData: FormItemReactData
  getRefMaps(): FormItemPrivateRef
  getComputeMaps(): FormItemPrivateComputed
  renderVN: RenderFunction
}

export interface FormItemPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeFormItemPrivateRef extends FormItemPrivateRef { }

export namespace VxeFormItemPropTypes {
  export type Title = string
  export type Field = string
  export type Span = VxeFormPropTypes.Span
  export type Align = VxeFormPropTypes.Align
  export type VerticalAlign = VxeFormPropTypes.VerticalAlign
  export type TitleBackground = boolean
  export type TitleBold = VxeFormPropTypes.TitleBold
  export type TitleAlign = VxeFormPropTypes.TitleAlign
  export type TitleWidth = VxeFormPropTypes.TitleWidth
  export type TitleColon = VxeFormPropTypes.TitleColon
  export type TitleAsterisk = VxeFormPropTypes.TitleAsterisk
  export type ShowTitle = boolean
  export type Vertical = boolean
  export type Padding = boolean

  interface ClassNameParams {
    $form: VxeFormConstructor
    data: any
    item: VxeFormDefines.ItemInfo
    field: string
    /**
     * @deprecated
     */
    property: string
  }
  export type ClassName = string | ((params: ClassNameParams) => string)

  interface ContentClassNameParams extends ClassNameParams{}
  export type ContentClassName = string | ((params: ContentClassNameParams) => string)

  interface ContentStyleParams extends ClassNameParams{}
  export type ContentStyle = VxeComponentStyleType | ((params: ContentStyleParams) => VxeComponentStyleType)

  interface TitleClassNameParams extends ClassNameParams{}
  export type TitleClassName = string | ((params: TitleClassNameParams) => string)

  interface TitleStyleParams extends ClassNameParams{}
  export type TitleStyle = VxeComponentStyleType | ((params: TitleStyleParams) => VxeComponentStyleType)

  export type Readonly = boolean

  export type TitlePrefix = VxeTooltipDefines.TooltipHelperOption
  export type TitleSuffix = VxeTooltipDefines.TooltipHelperOption

  export type TitleOverflow = VxeFormPropTypes.TitleOverflow

  export type Formatter<D = any> = string | ((params: {
    $grid: VxeGridConstructor | null | undefined
    $form: VxeFormConstructor<D>
    data: D
    item: VxeFormDefines.ItemInfo
    field: string
    itemValue: any
  }) => string | number)

  export type ResetValue = string | number | any[] | object | RegExp | null | undefined | ((params: {
    $grid: VxeGridConstructor | null | undefined
    $form: VxeFormConstructor
    data: any
    item: VxeFormDefines.ItemInfo
    field: string
  }) => any)
  export type Visible = boolean
  export type VisibleMethod = (params: FormItemVisibleParams) => boolean
  export type ShowContent = boolean
  export type Folding = boolean
  export type CollapseNode = boolean
  export interface ItemRender<D = any, P = Record<string, any>> {
    name?: string
    props?: P
    attrs?: Record<string, any>
    events?: Record<string, (itemParams: VxeFormItemSlotTypes.DefaultSlotParams<D>, ...args: any[]) => any>
    /**
     * 是否在 change 时触发提交
     */
    changeToSubmit?: boolean
    /**
     * 下拉选项列表（需要渲染器支持）
     */
    options?: any[]
    /**
     * 下拉选项属性参数配置（需要渲染器支持）
     */
    optionProps?: {
      value?: string
      label?: string
      disabled?: string
      children?: string
      hasChild?: string
      parent?: string
    }
    /**
     * 下拉分组选项列表（需要渲染器支持）
     */
    optionGroups?: any[]
    /**
     * 下拉分组选项属性参数配置（需要渲染器支持）
     */
    optionGroupProps?: {
      options?: string
      label?: string
      key?: string
    }
    children?: any[]

    startField?: string
    endField?: string

    /**
     * 渲染组件的内容（需要渲染器支持）
     */
    content?: string
    autoFocus?: string | boolean
    defaultValue?: ((params: { item: VxeFormItemProps }) => any) | null | undefined | string | number | RegExp | object | any[] | Date

    /**
     * 已废弃，请使用 autoFocus
     * @deprecated
     */
    autofocus?: string | boolean
  }
  export type Rules<D = any> = VxeFormDefines.FormRule<D>[]
  export type Slots = {
    title?: string | ((params: VxeFormItemSlotTypes.TitleSlotParams) => VxeComponentSlotType | VxeComponentSlotType[]) | null
    default?: string | ((params: VxeFormItemSlotTypes.DefaultSlotParams) => VxeComponentSlotType | VxeComponentSlotType[]) | null
    valid?: string | ((params: VxeFormItemSlotTypes.ValidSlotParams) => VxeComponentSlotType | VxeComponentSlotType[]) | null
    prefix?: string | ((params: VxeFormItemSlotTypes.PrefixSlotParams) => VxeComponentSlotType | VxeComponentSlotType[]) | null
    suffix?: string | ((params: VxeFormItemSlotTypes.SuffixSlotParams) => VxeComponentSlotType | VxeComponentSlotType[]) | null
    /**
     * 已废弃，请使用 suffix
     * @deprecated
     */
    extra?: string | ((params: VxeFormItemSlotTypes.SuffixSlotParams) => VxeComponentSlotType | VxeComponentSlotType[]) | null
  }

  /**
   * 额外的参数
   */
  export type Params = any
}

export interface VxeFormItemProps<D = any> {
  /**
   * 标题
   */
  title?: VxeFormItemPropTypes.Title
  /**
   * 字段名
   */
  field?: VxeFormItemPropTypes.Field
  /**
   * 栅格占据的列数（共 24 分栏）
   */
  span?: VxeFormItemPropTypes.Span
  /**
   * 内容对齐方式
   */
  align?: VxeFormItemPropTypes.Align
  verticalAlign?: VxeFormItemPropTypes.VerticalAlign
  /**
   * 标题加背景
   */
  titleBackground?: VxeFormItemPropTypes.TitleBackground
  /**
   * 标题加粗
   */
  titleBold?: VxeFormItemPropTypes.TitleBold
  /**
   * 标题对齐方式
   */
  titleAlign?: VxeFormItemPropTypes.TitleAlign
  /**
   * 标题宽度
   */
  titleWidth?: VxeFormItemPropTypes.TitleWidth
  /**
   * 是否显示标题冒号
   */
  titleColon?: VxeFormItemPropTypes.TitleColon
  /**
   * 是否显示必填字段的红色星号
   */
  titleAsterisk?: VxeFormItemPropTypes.TitleAsterisk
  /**
   * 是否显示标题
   */
  showTitle?: VxeFormItemPropTypes.ShowTitle
  /**
   * 使用垂直布局
   */
  vertical?: VxeFormItemPropTypes.Vertical
  padding?: VxeFormItemPropTypes.Padding
  /**
   * 给表单项附加 className
   */
  className?: VxeFormItemPropTypes.ClassName
  /**
   * 给表单项内容附加 className
   */
  contentClassName?: VxeFormItemPropTypes.ContentClassName
  /**
   * 给表单项内容附加样式
   */
  contentStyle?: VxeFormItemPropTypes.ContentStyle
  /**
   * 给表单项标题附加 className
   */
  titleClassName?: VxeFormItemPropTypes.TitleClassName
  /**
   * 给表单项标题附加样式
   */
  titleStyle?: VxeFormItemPropTypes.TitleStyle
  /**
   * 前缀配置项
   */
  titlePrefix?: VxeFormItemPropTypes.TitlePrefix
  /**
   * 后缀配置项
   */
  titleSuffix?: VxeFormItemPropTypes.TitleSuffix
  titleOverflow?: VxeFormItemPropTypes.TitleOverflow
  /**
   * 格式化显示内容
   */
  formatter?: VxeFormItemPropTypes.Formatter
  /**
   * 重置时的默认值
   */
  resetValue?: VxeFormItemPropTypes.ResetValue
  /**
   * 是否显示
   */
  visible?: VxeFormItemPropTypes.Visible
  /**
   * 该方法的返回值用来决定该项是否显示
   */
  visibleMethod?: VxeFormItemPropTypes.VisibleMethod
  /**
   * 是否显示内容
   */
  showContent?: VxeFormItemPropTypes.ShowContent
  /**
   * 默认收起
   */
  folding?: VxeFormItemPropTypes.Folding
  /**
   * 折叠节点
   */
  collapseNode?: VxeFormItemPropTypes.CollapseNode
  /**
   * 项渲染配置项
   */
  itemRender?: VxeFormItemPropTypes.ItemRender
  Rules?: VxeFormItemPropTypes.Rules<D>
  slots?: VxeFormItemPropTypes.Slots
  children?: VxeFormItemProps<D>[]

  /**
   * 额外的参数
   */
  params?: VxeFormItemPropTypes.Params
}

export interface FormItemPrivateComputed {
}
export interface VxeFormItemPrivateComputed extends FormItemPrivateComputed { }

export interface FormItemReactData {
}

export interface FormItemMethods {
}
export interface VxeFormItemMethods extends FormItemMethods { }

export interface FormItemPrivateMethods { }
export interface VxeFormItemPrivateMethods extends FormItemPrivateMethods { }

export type VxeFormItemEmits = []

export namespace VxeFormItemDefines {
  export interface FormItemEventParams extends VxeComponentEventParams {
    $formItem: VxeFormItemConstructor
  }
}

/**
 * 项内容渲染参数
 */
export interface FormItemContentRenderParams {
  $form: VxeFormConstructor
  $grid: VxeGridConstructor | null | undefined
  data: any
  item: VxeFormDefines.ItemInfo
  disabled: boolean | undefined
  readonly: boolean | undefined
  field: string
  /**
   * @deprecated
   */
  property: string
}

/**
 * 项可视方法参数
 */
export interface FormItemVisibleParams {
  $form: VxeFormConstructor
  $grid: VxeGridConstructor | null | undefined
  data: any
  item: VxeFormDefines.ItemInfo
  field: string
  /**
   * @deprecated
   */
  property: string
}

/**
 * 项重置方法参数
 */
export interface FormItemResetParams {
  $form: VxeFormConstructor
  $grid: VxeGridConstructor | null | undefined
  data: any
  item: VxeFormDefines.ItemInfo
  field: string
  /**
   * @deprecated
   */
  property: string
}

export type VxeFormItemEventProps = {}

export interface VxeFormItemListeners { }

export namespace VxeFormItemEvents { }

export namespace VxeFormItemSlotTypes {
  export interface DefaultSlotParams<D = any> {
    $form: VxeFormConstructor<D>
    $grid: VxeGridConstructor | null | undefined
    data: D
    item: VxeFormDefines.ItemInfo
    disabled: boolean | undefined
    readonly: boolean | undefined
    field: string
    /**
     * @deprecated
     */
    property: string
  }
  export interface ValidSlotParams<D = any> {
    $form: VxeFormConstructor<D>
    $grid: VxeGridConstructor | null | undefined
    field: string
    rule: VxeFormDefines.FormRule<D>
  }
  export interface TitleSlotParams<D = any> extends DefaultSlotParams<D> {}
  export interface PrefixSlotParams<D = any> extends DefaultSlotParams<D> {}
  export interface SuffixSlotParams<D = any> extends DefaultSlotParams<D> {}
}

export interface VxeFormItemSlots {
  /**
   * 自定义内容模板
   */
  default: (params: VxeFormItemSlotTypes.DefaultSlotParams) => any
  /**
   * 自定义标题模板
   */
  title: (params: VxeFormItemSlotTypes.TitleSlotParams) => any
  valid: (params: VxeFormItemSlotTypes.ValidSlotParams) => any
  prefix: (params: VxeFormItemSlotTypes.PrefixSlotParams) => any
  suffix: (params: VxeFormItemSlotTypes.SuffixSlotParams) => any

  /**
   * 已废弃，请使用 suffix
   * @deprecated
   */
  extra: (params: VxeFormItemSlotTypes.SuffixSlotParams) => any
}

export const FormItem: typeof VxeFormItem
export default VxeFormItem
