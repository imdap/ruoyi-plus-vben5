import { ref, h, reactive, PropType, watch } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, getIcon, createEvent, useSize, renderEmptyElement } from '../../ui'

import type { VxeTagPropTypes, TagReactData, TagPrivateRef, VxeTagEmits, VxeTagPrivateComputed, TagMethods, TagPrivateMethods, VxeTagConstructor, VxeTagPrivateMethods, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeTag',
  props: {
    border: {
      type: Boolean as PropType<VxeTagPropTypes.Border>,
      default: () => getConfig().tag.border
    },
    visible: {
      type: Boolean as PropType<VxeTagPropTypes.Visible>,
      default: null
    },
    status: String as PropType<VxeTagPropTypes.Status>,
    title: [String, Number] as PropType<VxeTagPropTypes.Title>,
    icon: String as PropType<VxeTagPropTypes.Icon>,
    closeIcon: {
      type: String as PropType<VxeTagPropTypes.CloseIcon>,
      default: () => getConfig().tag.closeIcon
    },
    content: [String, Number] as PropType<VxeTagPropTypes.Content>,
    round: Boolean as PropType<VxeTagPropTypes.Round>,
    closable: {
      type: Boolean as PropType<VxeTagPropTypes.Closable>,
      default: () => getConfig().tag.closable
    },
    color: String as PropType<VxeTagPropTypes.Color>,
    loading: Boolean as PropType<VxeTagPropTypes.Loading>,
    size: {
      type: String as PropType<VxeTagPropTypes.Size>,
      default: () => getConfig().tag.size || getConfig().size
    }
  },
  emits: [
    'click',
    'dblclick',
    'close',
    'update:visible'
  ] as VxeTagEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<TagReactData>({
      showTag: props.visible !== false
    })

    const refMaps: TagPrivateRef = {
      refElem
    }

    const computeMaps: VxeTagPrivateComputed = {
    }

    const $xeTag = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeTagConstructor & VxeTagPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeTagEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $tag: $xeTag }, params))
    }

    const tagMethods: TagMethods = {
      dispatchEvent
    }

    const tagPrivateMethods: TagPrivateMethods = {
    }

    const updateVisible = () => {
      reactData.showTag = props.visible !== false
    }

    const clickEvent = (evnt: MouseEvent) => {
      const { loading } = props
      if (!loading) {
        dispatchEvent('click', {}, evnt)
      }
    }

    const dblclickEvent = (evnt: MouseEvent) => {
      const { loading } = props
      if (!loading) {
        dispatchEvent('dblclick', {}, evnt)
      }
    }

    const closeEvent = (evnt: MouseEvent) => {
      const { loading } = props
      if (!loading) {
        const visible = !reactData.showTag
        reactData.showTag = visible
        emit('update:visible', visible)
        dispatchEvent('close', { visible }, evnt)
      }
    }

    Object.assign($xeTag, tagMethods, tagPrivateMethods)

    const renderContent = () => {
      const { icon, content, closable, closeIcon, loading } = props
      const defaultSlot = slots.default
      const iconSlot = slots.icon
      const closeIconSlot = slots.closeIcon || slots['close-icon']
      return [
        iconSlot || icon
          ? h('span', {
            class: 'vxe-tag--icon'
          }, iconSlot
            ? iconSlot({})
            : [
                h('i', {
                  class: icon
                })
              ])
          : renderEmptyElement($xeTag),
        h('span', {
          class: 'vxe-tag--content'
        }, defaultSlot ? defaultSlot({}) : XEUtils.toValueString(content)),
        loading || closable
          ? h('span', {
            class: loading ? 'vxe-tag--loading' : 'vxe-tag--close',
            onClick: closeEvent
          }, !loading && closeIconSlot
            ? closeIconSlot({})
            : [
                h('i', {
                  class: loading ? getIcon().TAG_LOADING : (closeIcon || getIcon().TAG_CLOSE)
                })
              ])
          : renderEmptyElement($xeTag)
      ]
    }

    const renderVN = () => {
      const { status, color, title, round, border, loading } = props
      const { showTag } = reactData
      const vSize = computeSize.value
      if (!showTag) {
        return renderEmptyElement($xeTag)
      }
      return h('span', {
        ref: refElem,
        class: ['vxe-tag', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status && !color,
          [`color--${color}`]: color && !status,
          'is--round': round,
          'is--border': border,
          'is--loading': loading
        }],
        title,
        onClick: clickEvent,
        onDblclick: dblclickEvent
      }, renderContent())
    }

    watch(() => props.visible, () => {
      updateVisible()
    })

    updateVisible()

    $xeTag.renderVN = renderVN

    return $xeTag
  },
  render () {
    return this.renderVN()
  }
})
