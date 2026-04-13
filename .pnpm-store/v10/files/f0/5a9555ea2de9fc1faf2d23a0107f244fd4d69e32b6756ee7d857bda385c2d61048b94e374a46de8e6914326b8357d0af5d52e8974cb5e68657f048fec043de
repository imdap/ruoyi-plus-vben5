import { ref, h, reactive, PropType, provide } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent, renderEmptyElement } from '../../ui'
import { printHtml, trimHtml } from './util'
import { getSlotVNs } from '../../ui/src/vn'

import type { VxePrintPropTypes, PrintReactData, PrintPrivateRef, VxePrintEmits, PrintPrivateMethods, ValueOf, VxePrintPrivateComputed, VxePrintConstructor, VxePrintPrivateMethods, PrintMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxePrint',
  props: {
    align: {
      type: String as PropType<VxePrintPropTypes.Align>,
      default: () => getConfig().print.align
    },
    title: String as PropType<VxePrintPropTypes.Title>,
    headerAlign: {
      type: String as PropType<VxePrintPropTypes.HeaderAlign>,
      default: () => getConfig().print.headerAlign
    },
    footerAlign: {
      type: String as PropType<VxePrintPropTypes.FooterAlign>,
      default: () => getConfig().print.footerAlign
    },
    showPageNumber: {
      type: Boolean as PropType<VxePrintPropTypes.ShowPageNumber>,
      default: () => getConfig().print.showPageNumber
    },
    customLayout: Boolean as PropType<VxePrintPropTypes.CustomLayout>,
    pageBreaks: Array as PropType<VxePrintPropTypes.PageBreaks>,
    content: String as PropType<VxePrintPropTypes.Content>,
    html: String as PropType<VxePrintPropTypes.Html>,
    headerHtml: String as PropType<VxePrintPropTypes.HeaderHtml>,
    footerHtml: String as PropType<VxePrintPropTypes.FooterHtml>,
    leftHtml: String as PropType<VxePrintPropTypes.LeftHtml>,
    rightHtml: String as PropType<VxePrintPropTypes.RightHtml>,
    showAllPageTitle: {
      type: Boolean as PropType<VxePrintPropTypes.ShowAllPageTitle>,
      default: () => getConfig().print.showAllPageTitle
    },
    pageStyle: {
      type: Object as PropType<VxePrintPropTypes.PageStyle>,
      default: () => getConfig().print.pageStyle
    },
    customStyle: {
      type: String as PropType<VxePrintPropTypes.CustomStyle>,
      default: () => getConfig().print.customStyle
    },
    styleUrls: {
      type: Array as PropType<VxePrintPropTypes.StyleUrls>,
      default: () => getConfig().print.styleUrls
    },
    beforeMethod: Function as PropType<VxePrintPropTypes.BeforeMethod>
  },
  emits: [] as VxePrintEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<PrintReactData>({
      staticPageBreaks: []
    })

    const refMaps: PrintPrivateRef = {
      refElem
    }

    const computeMaps: VxePrintPrivateComputed = {
    }

    const $xePrint = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxePrintConstructor & VxePrintPrivateMethods

    const dispatchEvent = (type: ValueOf<VxePrintEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $print: $xePrint }, params))
    }

    const printMethods: PrintMethods = {
      dispatchEvent,
      print () {
        const { align, title, headerAlign, footerAlign, showPageNumber, customLayout, pageBreaks, content, headerHtml, footerHtml, leftHtml, rightHtml, showAllPageTitle, pageStyle, customStyle, styleUrls, beforeMethod } = props
        const elem = refElem.value
        return printHtml(Object.assign({}, {
          align,
          title,
          headerAlign,
          footerAlign,
          showPageNumber,
          customLayout,
          pageBreaks,
          content,
          headerHtml,
          footerHtml,
          leftHtml,
          rightHtml,
          showAllPageTitle,
          pageStyle,
          customStyle,
          styleUrls,
          beforeMethod
        }, {
          _pageBreaks: !!reactData.staticPageBreaks.length,
          html: trimHtml(elem ? elem.outerHTML : '') || props.html || props.content || ''
        }))
      }
    }

    const printPrivateMethods: PrintPrivateMethods = {
    }

    Object.assign($xePrint, printMethods, printPrivateMethods)

    const renderPageConfigLayouts = () => {
      const { title, showPageNumber, showAllPageTitle, align, headerAlign, footerAlign } = props
      const pageBreaks = props.pageBreaks || []
      const pageCount = pageBreaks.length

      return pageBreaks.map((item, index) => {
        const bodyHtml = item.bodyHtml
        const headerHtml = item.headerHtml || props.headerHtml
        const footerHtml = item.footerHtml || props.footerHtml
        const leftHtml = item.leftHtml || props.leftHtml
        const rightHtml = item.rightHtml || props.rightHtml
        const currentPage = index + 1
        const params = {
          currentPage,
          pageCount
        }
        return h('div', {
          class: ['vxe-print-page-break', align ? `align--${align}` : '']
        }, [
          h('div', {
            class: ['vxe-print-page-break--header', headerAlign ? `align--${headerAlign}` : '']
          }, headerHtml
            ? `${XEUtils.isFunction(headerHtml) ? headerHtml(params) : (headerHtml || '')}`
            : [
                title && (showAllPageTitle || !index)
                  ? h('div', {
                    class: 'vxe-print-page-break--header-title'
                  }, `${title || ''}`)
                  : renderEmptyElement($xePrint)
              ]),
          h('div', {
            class: 'vxe-print-page-break--body'
          }, [
            h('div', {
              class: 'vxe-print-page-break--left'
            }, `${XEUtils.isFunction(leftHtml) ? leftHtml(params) : (leftHtml || '')}`),
            h('div', {
              class: 'vxe-print-page-break--content'
            }, `${XEUtils.isFunction(bodyHtml) ? bodyHtml(params) : (bodyHtml || '')}`),
            h('div', {
              class: 'vxe-print-page-break--right'
            }, `${XEUtils.isFunction(rightHtml) ? rightHtml(params) : (rightHtml || '')}`)
          ]),
          h('div', {
            class: ['vxe-print-page-break--footer', footerAlign ? `align--${footerAlign}` : '']
          }, footerHtml
            ? `${XEUtils.isFunction(footerHtml) ? footerHtml(params) : (footerHtml || '')}`
            : [
                showPageNumber
                  ? h('div', {
                    class: 'vxe-print-page-break--footer-page-number'
                  }, `${currentPage}/${pageCount}`)
                  : renderEmptyElement($xePrint)
              ])
        ])
      })
    }

    const renderPageStaticLayouts = () => {
      const { title, showPageNumber, showAllPageTitle, align, headerAlign, footerAlign } = props
      const { staticPageBreaks } = reactData
      const pageCount = staticPageBreaks.length

      return staticPageBreaks.map((item, index) => {
        const itemSlots = item.slots || {}
        const currentPage = index + 1
        const defaultSlot = itemSlots.default
        const headerSlot = itemSlots.header || slots.header
        const footerSlot = itemSlots.footer || slots.footer
        const leftSlot = itemSlots.left || slots.left
        const rightSlot = itemSlots.right || slots.right

        const params = {
          currentPage,
          pageCount
        }
        return h('div', {
          class: ['vxe-print-page-break', align ? `align--${align}` : '']
        }, [
          h('div', {
            class: ['vxe-print-page-break--header', headerAlign ? `align--${headerAlign}` : '']
          }, headerSlot
            ? getSlotVNs(headerSlot(params))
            : [
                title && (showAllPageTitle || !index)
                  ? h('div', {
                    class: 'vxe-print-page-break--header-title'
                  }, `${title || ''}`)
                  : renderEmptyElement($xePrint)
              ]),
          h('div', {
            class: 'vxe-print-page-break--body'
          }, [
            h('div', {
              class: 'vxe-print-page-break--left'
            }, leftSlot ? getSlotVNs(leftSlot(params)) : []),
            h('div', {
              class: 'vxe-print-page-break--content'
            }, defaultSlot ? getSlotVNs(defaultSlot(params)) : []),
            h('div', {
              class: 'vxe-print-page-break--right'
            }, rightSlot ? getSlotVNs(rightSlot(params)) : [])
          ]),
          h('div', {
            class: ['vxe-print-page-break--footer', footerAlign ? `align--${footerAlign}` : '']
          }, footerSlot
            ? getSlotVNs(footerSlot(params))
            : [
                showPageNumber
                  ? h('div', {
                    class: 'vxe-print-page-break--footer-page-number'
                  }, `${currentPage}/${pageCount}`)
                  : renderEmptyElement($xePrint)
              ])
        ])
      })
    }

    const renderVN = () => {
      const { customLayout } = props
      const { staticPageBreaks } = reactData
      const defaultSlot = slots.default
      return h('div', {
        ref: refElem,
        class: ['vxe-print']
      }, customLayout
        ? (defaultSlot ? getSlotVNs(defaultSlot({})) : [])
        : ([
            h('div', {
              key: 'slot',
              class: 'vxe-print-slots'
            }, defaultSlot ? getSlotVNs(defaultSlot({})) : [])
          ].concat(
            staticPageBreaks.length
              ? renderPageStaticLayouts()
              : renderPageConfigLayouts()
          )))
    }

    $xePrint.renderVN = renderVN

    provide('$xePrint', $xePrint)

    return $xePrint
  },
  render () {
    return this.renderVN()
  }
})
