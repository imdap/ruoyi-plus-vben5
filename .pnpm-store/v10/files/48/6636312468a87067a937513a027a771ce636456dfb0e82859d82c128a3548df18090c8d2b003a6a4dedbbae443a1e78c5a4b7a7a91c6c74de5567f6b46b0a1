import { ref, h, computed, PropType, reactive } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent, useSize, renderEmptyElement } from '../../ui'
import { toCssUnit } from '../../ui/src/dom'

import type { AvatarReactData, VxeAvatarEmits, AvatarMethods, VxeAvatarPropTypes, VxeComponentStyleType, AvatarPrivateMethods, ValueOf, AvatarPrivateRef, VxeAvatarPrivateComputed, VxeAvatarConstructor, VxeAvatarPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeAvatar',
  props: {
    count: [String, Number] as PropType<VxeAvatarPropTypes.Count>,
    dot: Boolean as PropType<VxeAvatarPropTypes.Dot>,
    content: [String, Number] as PropType<VxeAvatarPropTypes.Content>,
    icon: String as PropType<VxeAvatarPropTypes.Icon>,
    src: String as PropType<VxeAvatarPropTypes.Src>,
    width: [String, Number] as PropType<VxeAvatarPropTypes.Width>,
    height: [String, Number] as PropType<VxeAvatarPropTypes.Height>,
    circle: {
      type: Boolean as PropType<VxeAvatarPropTypes.Circle>,
      default: () => getConfig().avatar.circle
    },
    status: {
      type: String as PropType<VxeAvatarPropTypes.Status>,
      default: () => getConfig().avatar.status
    },
    size: {
      type: String as PropType<VxeAvatarPropTypes.Size>,
      default: () => getConfig().avatar.size || getConfig().size
    }
  },
  emits: [
  ] as VxeAvatarEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<AvatarReactData>({
    })

    const refMaps: AvatarPrivateRef = {
      refElem
    }

    const computeAvatarStyle = computed(() => {
      const { width, height } = props
      const stys: VxeComponentStyleType = {}
      if (width) {
        stys.width = toCssUnit(width)
      }
      if (height) {
        stys.height = toCssUnit(height)
      }
      return stys
    })

    const computeCountNum = computed(() => {
      const { count } = props
      return count ? XEUtils.toNumber(count) : 0
    })

    const computeMaps: VxeAvatarPrivateComputed = {
    }

    const $xeAvatar = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeAvatarConstructor & VxeAvatarPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeAvatarEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $avatar: $xeAvatar }, params))
    }

    const collapsePaneMethods: AvatarMethods = {
      dispatchEvent
    }

    const collapsePanePrivateMethods: AvatarPrivateMethods = {
    }

    Object.assign($xeAvatar, collapsePaneMethods, collapsePanePrivateMethods)

    const renderContent = () => {
      const { icon, content, src } = props
      if (icon) {
        return h('span', {
          class: 'vxe-avatar--icon'
        }, [
          h('i', {
            class: icon
          })
        ])
      }
      if (content) {
        return h('span', {
          class: 'vxe-avatar--content'
        }, `${content}`)
      }
      if (src) {
        return h('img', {
          class: 'vxe-avatar--img',
          src
        })
      }
      return renderEmptyElement($xeAvatar)
    }

    const renderVN = () => {
      const { circle, dot, status } = props
      const vSize = computeSize.value
      const countNum = computeCountNum.value
      const avatarStyle = computeAvatarStyle.value
      return h('div', {
        ref: refElem,
        class: ['vxe-avatar', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--circle': circle,
          'is--dot': dot
        }],
        style: avatarStyle
      }, [
        renderContent(),
        countNum
          ? h('span', {
            class: 'vxe-avatar--count'
          }, countNum > 99 ? '99+' : `${countNum}`)
          : renderEmptyElement($xeAvatar)
      ])
    }

    $xeAvatar.renderVN = renderVN

    return $xeAvatar
  },
  render () {
    return this.renderVN()
  }
})
