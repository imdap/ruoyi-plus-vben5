import { RenderFunction, SetupContext, Ref } from 'vue'
import { DefineVxeComponentApp, DefineVxeComponentOptions, DefineVxeComponentInstance, VxeComponentBaseOptions, VxeComponentEventParams, VxeComponentSizeType, ValueOf } from '@vxe-ui/core'
import { VxeSelectPropTypes } from './select'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxePager: DefineVxeComponentApp<VxePagerProps, VxePagerEventProps, VxePagerSlots, VxePagerMethods>
export type VxePagerComponent = DefineVxeComponentOptions<VxePagerProps, VxePagerEventProps>

export type VxePagerInstance = DefineVxeComponentInstance<VxePagerProps, VxePagerConstructor>

export interface VxePagerConstructor extends VxeComponentBaseOptions, VxePagerMethods {
  props: VxePagerProps
  context: SetupContext<VxePagerEmits>
  reactData: PagerReactData
  getRefMaps(): PagerPrivateRef
  getComputeMaps(): PagerPrivateComputed
  renderVN: RenderFunction
}

export interface PagerPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxePagerPrivateRef extends PagerPrivateRef { }

export type PageSizeItemType = number | {
  label?: number | string
  value?: number | string
}

export namespace VxePagerPropTypes {
  export type Size = VxeComponentSizeType
  export type Layouts = Array<'Home' | 'PrevJump' | 'PrevPage' | 'Number' | 'JumpNumber' | 'NextPage' | 'NextJump' | 'End' | 'Sizes' | 'Jump' | 'FullJump' | 'PageCount' | 'Total'>
  export type CurrentPage = number
  export type Loading = boolean
  export type PageSize = number
  export type Total = number
  export type PagerCount = number
  export type PageSizes = PageSizeItemType[]
  export type Align = string
  export type Border = boolean
  export type Background = boolean
  export type Perfect = boolean
  export type AutoHidden = boolean
  export type Transfer = boolean
  export type ClassName = string | ((params: {
    $pager: VxePagerConstructor
  }) => string)
  export type PageSizePlacement = VxeSelectPropTypes.Placement
  export type IconPrevPage = string
  export type IconJumpPrev = string
  export type IconJumpNext = string
  export type IconNextPage = string
  export type IconJumpMore = string
  export type IconHomePage = string
  export type IconEndPage = string
}

export interface VxePagerProps {
  size?: VxePagerPropTypes.Size
  /**
   * 自定义布局
   */
  layouts?: VxePagerPropTypes.Layouts
  /**
   * 当前页
   */
  currentPage?: VxePagerPropTypes.CurrentPage
  /**
   * 加载中
   */
  loading?: VxePagerPropTypes.Loading
  /**
   * 每页大小
   */
  pageSize?: VxePagerPropTypes.PageSize
  /**
   * 总条数
   */
  total?: VxePagerPropTypes.Total
  /**
   * 显示页码按钮的数量
   */
  pagerCount?: VxePagerPropTypes.PagerCount
  /**
   * 每页大小选项列表
   */
  pageSizes?: VxePagerPropTypes.PageSizes
  /**
   * 列对齐方式
   */
  align?: VxePagerPropTypes.Align
  /**
   * 带边框
   */
  border?: VxePagerPropTypes.Border
  /**
   * 带背景颜色
   */
  background?: VxePagerPropTypes.Background
  /**
   * 配套的样式
   */
  perfect?: VxePagerPropTypes.Perfect
  /**
   * 当只有一页时隐藏
   */
  autoHidden?: VxePagerPropTypes.AutoHidden
  transfer?: VxePagerPropTypes.Transfer
  className?: VxePagerPropTypes.ClassName
  pageSizePlacement?: VxePagerPropTypes.PageSizePlacement
  /**
   * 自定义图标
   */
  iconPrevPage?: VxePagerPropTypes.IconPrevPage
  iconJumpPrev?: VxePagerPropTypes.IconJumpPrev
  iconJumpNext?: VxePagerPropTypes.IconJumpNext
  iconNextPage?: VxePagerPropTypes.IconNextPage
  iconJumpMore?: VxePagerPropTypes.IconJumpMore
  iconHomePage?: VxePagerPropTypes.IconHomePage
  iconEndPage?: VxePagerPropTypes.IconEndPage
}

export interface PagerPrivateComputed {
}
export interface VxePagerPrivateComputed extends PagerPrivateComputed { }

export interface PagerReactData {
  inpCurrPage: string | number
}

export interface PagerMethods {
  dispatchEvent(type: ValueOf<VxePagerEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 修改每页大小
   */
  setPageSize(pageSize: number | string | null | undefined): Promise<any>
  setPageSizeByEvent(evnt: Event, pageSize: number | string | null | undefined): void
  /**
   * 首页
   */
  homePage(): Promise<any>
  homePageByEvent(evnt: Event): void
  /**
   * 末页
   */
  endPage(): Promise<any>
  endPageByEvent(evnt: Event): void
  /**
   * 上一页
   */
  prevPage(): Promise<any>
  prevPageByEvent(evnt: Event): void
  /**
   * 下一页
   */
  nextPage(): Promise<any>
  nextPageByEvent(evnt: Event): void
  /**
   * 向上翻页
   */
  prevJump(): Promise<any>
  prevJumpByEvent(evnt: Event): void
  /**
   * 向下翻页
   */
  nextJump(): Promise<any>
  nextJumpByEvent(evnt: Event): void
  /**
   * 修改每当前页数
   */
  setCurrentPage(currentPage: number | string | null | undefined): Promise<any>
  setCurrentPageByEvent(evnt: Event, currentPage: number | string | null | undefined): void

  /**
   * 已废弃，被 setCurrentPage 替换
   * @deprecated
   */
  jumpPage(currentPage: number | string | null | undefined): Promise<any>
}
export interface VxePagerMethods extends PagerMethods { }

export interface PagerPrivateMethods {
  handlePrevPage(evnt: Event): void
  handleNextPage(evnt: Event): void
  handlePrevJump(evnt: Event): void
  handleNextJump(evnt: Event): void
}
export interface VxePagerPrivateMethods extends PagerPrivateMethods { }

export type VxePagerEmits = [
  'update:pageSize',
  'update:currentPage',
  'page-change'
]

export namespace VxePagerDefines {
  export interface PagerEventParams extends VxeComponentEventParams {
    $pager: VxePagerConstructor
  }

  export type PageChangeParams = {
    type: 'current' | 'size'
    pageSize: number
    currentPage: number
  }
  export interface PageChangeEventParams extends PagerEventParams, PageChangeParams { }
}

export type VxePagerEventProps = {
  'onUpdate:pageSize'?: VxePagerEvents.UpdatePageSizeValue
  'onUpdate:currentPage'?: VxePagerEvents.UpdateCurrentPageValue
  onPageChange?: VxePagerEvents.PageChange
}

export interface VxePagerListeners {
  'update:pageSize'?: VxePagerEvents.UpdatePageSizeValue
  'update:currentPage'?: VxePagerEvents.UpdateCurrentPageValue
  pageChange?: VxePagerEvents.PageChange
}

export namespace VxePagerEvents {
  export type UpdatePageSizeValue = (modelValue: VxePagerPropTypes.PageSize) => void
  export type UpdateCurrentPageValue = (modelValue: VxePagerPropTypes.CurrentPage) => void
  export type PageChange = (params: VxePagerDefines.PageChangeEventParams) => void
}

export namespace VxePagerSlotTypes {
  export interface DefaultSlotParams {
    [key: string]: any
  }
  export interface LeftSlotParams {}
  export interface RightSlotParams {}
  export interface HomeSlotParams {
    currentPage: number
    total: number
    pageCount: number
  }
  export interface PrevPageSlotParams {
    currentPage: number
    total: number
    pageCount: number
  }
  export interface PrevJumpSlotParams {
    currentPage: number
    total: number
    pageCount: number
  }
  export interface NextJumpSlotParams {
    currentPage: number
    total: number
    pageCount: number
  }
  export interface NextPageSlotParams {
    currentPage: number
    total: number
    pageCount: number
  }
  export interface EndSlotParams {
    currentPage: number
    total: number
    pageCount: number
  }
  export interface NumberJumpSlotParams {
    numList: number[]
    currentPage: number
    total: number
    pageCount: number
  }
  export interface SizesSlotParams {
    currentPage: number
    total: number
    pageCount: number
    pageSize: number
    options: {
      label: number | string
      value: number | string
    }[]
  }
  export interface FullJumpSlotParams {
    currentPage: number
    total: number
    pageCount: number
  }
  export interface PageCountSlotParams {
    currentPage: number
    total: number
    pageCount: number
  }
  export interface TotalSlotParams {
    currentPage: number
    total: number
    pageCount: number
  }
}

export interface VxePagerSlots {
  left?: (params: VxePagerSlotTypes.LeftSlotParams) => any

  right?: (params: VxePagerSlotTypes.RightSlotParams) => any

  home?: (params: VxePagerSlotTypes.HomeSlotParams) => any

  prevPage?: (params: VxePagerSlotTypes.PrevPageSlotParams) => any
  'prev-page'?: (params: VxePagerSlotTypes.PrevPageSlotParams) => any

  prevJump?: (params: VxePagerSlotTypes.PrevJumpSlotParams) => any
  'prev-jump'?: (params: VxePagerSlotTypes.PrevJumpSlotParams) => any

  nextJump?: (params: VxePagerSlotTypes.NextJumpSlotParams) => any
  'next-jump'?: (params: VxePagerSlotTypes.NextJumpSlotParams) => any

  nextPage?: (params: VxePagerSlotTypes.NextPageSlotParams) => any
  'next-page'?: (params: VxePagerSlotTypes.NextPageSlotParams) => any

  end?: (params: VxePagerSlotTypes.EndSlotParams) => any

  number?: (params: VxePagerSlotTypes.NumberJumpSlotParams) => any
  numberJump?: (params: VxePagerSlotTypes.NumberJumpSlotParams) => any
  'number-jump'?: (params: VxePagerSlotTypes.NumberJumpSlotParams) => any

  sizes?: (params: VxePagerSlotTypes.SizesSlotParams) => any

  fullJump?: (params: VxePagerSlotTypes.FullJumpSlotParams) => any
  'full-jump'?: (params: VxePagerSlotTypes.FullJumpSlotParams) => any
  jump?: (params: VxePagerSlotTypes.FullJumpSlotParams) => any

  pageCount?: (params: VxePagerSlotTypes.PageCountSlotParams) => any
  'page-count'?: (params: VxePagerSlotTypes.PageCountSlotParams) => any

  total?: (params: VxePagerSlotTypes.TotalSlotParams) => any
}

export const Pager: typeof VxePager
export default VxePager
