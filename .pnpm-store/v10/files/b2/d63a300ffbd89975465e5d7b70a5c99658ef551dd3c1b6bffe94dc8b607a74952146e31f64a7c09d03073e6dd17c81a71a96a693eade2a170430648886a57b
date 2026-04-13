import { ref, h, reactive, PropType, computed, onMounted, watch, onBeforeUnmount, inject } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, useSize, createEvent, globalEvents, renderEmptyElement } from '../../ui'
import { toCssUnit } from '../../ui/src/dom'

import type { VxeNoticeBarPropTypes, NoticeBarReactData, NoticeBarPrivateRef, NoticeBarMethods, NoticeBarPrivateMethods, VxeNoticeBarEmits, VxeNoticeBarPrivateComputed, VxeNoticeBarConstructor, VxeNoticeBarPrivateMethods, ValueOf, VxeTabsConstructor, VxeTabsPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeNoticeBar',
  props: {
    duration: [String, Number] as PropType<VxeNoticeBarPropTypes.Duration>,
    direction: {
      type: String as PropType<VxeNoticeBarPropTypes.Direction>,
      default: () => getConfig().noticeBar.direction
    },
    speed: {
      type: String as PropType<VxeNoticeBarPropTypes.Speed>,
      default: () => getConfig().noticeBar.speed
    },
    content: String as PropType<VxeNoticeBarPropTypes.Content>,
    vertical: Boolean as PropType<VxeNoticeBarPropTypes.Vertical>,
    loop: {
      type: Boolean as PropType<VxeNoticeBarPropTypes.Loop>
    },
    size: {
      type: String as PropType<VxeNoticeBarPropTypes.Size>,
      default: () => getConfig().noticeBar.size || getConfig().size
    }
  },
  emits: [
    'start',
    'end'
  ] as VxeNoticeBarEmits,
  setup (props, context) {
    const { slots, emit } = context

    const $xeTabs = inject<(VxeTabsConstructor & VxeTabsPrivateMethods) | null>('$xeTabs', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()
    const refContentElem = ref<HTMLDivElement>()

    const reactData = reactive<NoticeBarReactData>({
      animationStatus: false,
      animationDuration: 0
    })

    const refMaps: NoticeBarPrivateRef = {
      refElem
    }

    const computeNoticeText = computed(() => {
      const { content } = props
      return `${content || ''}`
    })

    const computeTabsResizeFlag = computed(() => {
      return $xeTabs ? $xeTabs.reactData.resizeFlag : null
    })

    const computeMaps: VxeNoticeBarPrivateComputed = {
    }

    const $xeNoticeBar = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeNoticeBarConstructor & VxeNoticeBarPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeNoticeBarEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $noticeBar: $xeNoticeBar }, params))
    }

    const noticeBarMethods: NoticeBarMethods = {
      dispatchEvent
    }

    const noticeBarPrivateMethods: NoticeBarPrivateMethods = {
    }

    const updateAnimationStyle = () => {
      const { speed } = props
      const contEl = refContentElem.value
      if (contEl) {
        let sRate = 46
        if (speed === 'fast') {
          sRate = 118
        } else if (speed === 'slow') {
          sRate = 18
        }
        reactData.animationDuration = Math.ceil(contEl.scrollWidth / sRate)
      }
    }

    const animationStartEvent = (evnt: AnimationEvent) => {
      reactData.animationStatus = true
      dispatchEvent('start', { status: true }, evnt)
    }

    const animationEndEvent = (evnt: AnimationEvent) => {
      reactData.animationStatus = false
      dispatchEvent('end', { status: false }, evnt)
    }

    Object.assign($xeNoticeBar, noticeBarMethods, noticeBarPrivateMethods)

    const renderVN = () => {
      const { vertical, duration, direction, loop } = props
      const { animationDuration, animationStatus } = reactData
      const vSize = computeSize.value
      const noticeText = computeNoticeText.value
      const defaultSlot = slots.default
      const prefixSlot = slots.prefix
      const suffixSlot = slots.suffix

      return h('div', {
        ref: refElem,
        class: ['vxe-notice-bar', `is--${vertical ? 'vertical' : 'horizontal'}`, `dir--${direction || 'left'}`, {
          [`size--${vSize}`]: vSize,
          'is--loop': loop
        }]
      }, [
        prefixSlot
          ? h('div', {
            class: 'vxe-notice-bar--prefix'
          }, prefixSlot({}))
          : renderEmptyElement($xeNoticeBar),
        h('div', {
          class: 'vxe-notice-bar--content'
        }, [
          h('div', {
            ref: refContentElem,
            class: 'vxe-notice-bar--inner'
          }, [
            h('div', {
              class: ['vxe-notice-bar--wrapper', `is--${animationStatus ? 'progress' : 'end'}`],
              style: {
                animationDuration: duration ? toCssUnit(duration, 's') : `${animationDuration}s`
              },
              onAnimationstart: animationStartEvent,
              onAnimationend: animationEndEvent
            }, defaultSlot ? defaultSlot({}) : noticeText)
          ])
        ]),
        suffixSlot
          ? h('div', {
            class: 'vxe-notice-bar--suffix'
          }, suffixSlot({}))
          : renderEmptyElement($xeNoticeBar)
      ])
    }

    watch(computeTabsResizeFlag, () => {
      updateAnimationStyle()
    })

    onMounted(() => {
      globalEvents.on($xeNoticeBar, 'resize', updateAnimationStyle)
      updateAnimationStyle()
    })

    onBeforeUnmount(() => {
      globalEvents.off($xeNoticeBar, 'resize')
    })

    $xeNoticeBar.renderVN = renderVN

    return $xeNoticeBar
  },
  render () {
    return this.renderVN()
  }
})
