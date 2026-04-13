import { ref, h, reactive, PropType, VNode, computed } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI, getConfig, getIcon, getI18n, useSize, createEvent } from '../../ui'

import type { VxeTextPropTypes, TextReactData, TextPrivateRef, VxeTextPrivateComputed, TextMethods, TextPrivateMethods, VxeTextEmits, VxeTextConstructor, ValueOf, VxeTextPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeText',
  props: {
    status: String as PropType<VxeTextPropTypes.Status>,
    title: [String, Number] as PropType<VxeTextPropTypes.Title>,
    icon: String as PropType<VxeTextPropTypes.Icon>,
    prefixIcon: String as PropType<VxeTextPropTypes.PrefixIcon>,
    suffixIcon: String as PropType<VxeTextPropTypes.SuffixIcon>,
    loading: Boolean as PropType<VxeTextPropTypes.Loading>,
    content: [String, Number] as PropType<VxeTextPropTypes.Content>,
    clickToCopy: {
      type: Boolean as PropType<VxeTextPropTypes.ClickToCopy>,
      default: () => getConfig().text.clickToCopy
    },
    copyConfig: Object as PropType<VxeTextPropTypes.CopyConfig>,
    size: {
      type: String as PropType<VxeTextPropTypes.Size>,
      default: () => getConfig().text.size || getConfig().size
    }
  },
  emits: [
    'click',
    'dblclick',
    'prefix-click',
    'suffix-click',
    'copy-success',
    'copy-error'
  ] as VxeTextEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()
    const refContentElem = ref<HTMLSpanElement>()

    const reactData = reactive<TextReactData>({
    })

    const computeCopyOpts = computed(() => {
      return Object.assign({}, getConfig().text.copyConfig, props.copyConfig)
    })

    const refMaps: TextPrivateRef = {
      refElem
    }

    const computeMaps: VxeTextPrivateComputed = {
    }

    const handleCopy = (evnt: MouseEvent) => {
      const { content } = props
      const copyOpts = computeCopyOpts.value
      const { showMessage } = copyOpts
      const contentEl = refContentElem.value
      const copyVal = (contentEl ? contentEl.textContent : '') || content
      if (copyVal) {
        if (VxeUI.clipboard.copy(copyVal)) {
          if (showMessage && VxeUI.modal) {
            VxeUI.modal.message({
              content: getI18n('vxe.text.copySuccess'),
              status: 'success'
            })
          }
          dispatchEvent('copy-success', {}, evnt)
        } else {
          if (showMessage && VxeUI.modal) {
            VxeUI.modal.message({
              content: getI18n('vxe.text.copyError'),
              status: 'error'
            })
          }
          dispatchEvent('copy-error', {}, evnt)
        }
      }
    }

    const clickIconEvent = (evnt: MouseEvent) => {
      const { clickToCopy } = props
      const copyOpts = computeCopyOpts.value
      if (clickToCopy && copyOpts.trigger !== 'dblclick') {
        handleCopy(evnt)
      }
    }

    const dblclickIconEvent = (evnt: MouseEvent) => {
      const { clickToCopy } = props
      const copyOpts = computeCopyOpts.value
      if (clickToCopy && copyOpts.trigger === 'dblclick') {
        handleCopy(evnt)
      }
    }

    const $xeText = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeTextConstructor & VxeTextPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeTextEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $text: $xeText }, params))
    }

    const textMethods: TextMethods = {
      dispatchEvent
    }

    const clickEvent = (evnt : MouseEvent) => {
      const { loading } = props
      if (!loading) {
        dispatchEvent('click', {}, evnt)
      }
    }

    const dblclickEvent = (evnt : MouseEvent) => {
      const { loading } = props
      if (!loading) {
        dispatchEvent('dblclick', {}, evnt)
      }
    }

    const prefixEvent = (evnt : MouseEvent) => {
      const { loading } = props
      if (!loading) {
        dispatchEvent('prefix-click', {}, evnt)
      }
    }

    const suffixEvent = (evnt : MouseEvent) => {
      const { loading } = props
      if (!loading) {
        dispatchEvent('suffix-click', {}, evnt)
      }
    }

    const textPrivateMethods: TextPrivateMethods = {
    }

    Object.assign($xeText, textMethods, textPrivateMethods)

    const renderCopyIcon = () => {
      const copyOpts = computeCopyOpts.value
      const { icon, status } = copyOpts
      return h('span', {
        key: 'ci',
        class: ['vxe-text--copy-icon', {
          [`theme--${status}`]: status
        }],
        onClick: clickIconEvent,
        onDblclick: dblclickIconEvent
      }, [
        h('i', {
          class: icon || getIcon().TEXT_COPY
        })
      ])
    }

    const renderContent = () => {
      const { loading, icon, prefixIcon, suffixIcon, clickToCopy, content } = props
      const copyOpts = computeCopyOpts.value
      const defaultSlot = slots.default
      const prefixIconSlot = slots.prefixIcon || slots['prefix-icon'] || slots.icon
      const suffixIconSlot = slots.suffixIcon || slots['suffix-icon']
      const copyToRight = copyOpts.layout === 'right'
      const contVNs: VNode[] = []
      if (loading) {
        contVNs.push(
          h('span', {
            key: 'lg',
            class: 'vxe-text--loading'
          }, [
            h('i', {
              class: getIcon().TEXT_LOADING
            })
          ])
        )
      } else if (clickToCopy && !copyToRight) {
        contVNs.push(renderCopyIcon())
      }
      if (prefixIcon || icon) {
        contVNs.push(
          h('span', {
            key: 'si',
            class: 'vxe-text--prefix-icon',
            onClick: prefixEvent
          }, prefixIconSlot
            ? prefixIconSlot({})
            : [
                h('i', {
                  class: prefixIcon || icon
                })
              ])
        )
      }
      contVNs.push(
        h('span', {
          key: 'ct',
          ref: refContentElem,
          class: 'vxe-text--content',
          onClick: clickEvent,
          onDblclick: dblclickEvent
        }, defaultSlot ? defaultSlot({}) : XEUtils.toValueString(content))
      )
      if (suffixIcon) {
        contVNs.push(
          h('span', {
            key: 'si',
            class: 'vxe-text--suffix-icon',
            onClick: suffixEvent
          }, suffixIconSlot
            ? suffixIconSlot({})
            : [
                h('i', {
                  class: suffixIcon
                })
              ])
        )
      }
      if (clickToCopy && copyToRight && !loading) {
        contVNs.push(renderCopyIcon())
      }
      return contVNs
    }

    const renderVN = () => {
      const { loading, status, title, clickToCopy } = props
      const vSize = computeSize.value
      return h('span', {
        ref: refElem,
        title,
        class: ['vxe-text', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--copy': clickToCopy,
          'is--loading': loading
        }]
      }, renderContent())
    }

    $xeText.renderVN = renderVN

    return $xeText
  },
  render () {
    return this.renderVN()
  }
})
