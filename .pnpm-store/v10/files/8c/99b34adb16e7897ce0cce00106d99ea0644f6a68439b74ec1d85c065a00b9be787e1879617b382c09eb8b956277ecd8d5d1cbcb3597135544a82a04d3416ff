import { ref, h, reactive, PropType, watch, onMounted, nextTick, computed, onBeforeUnmount } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, getIcon, createEvent, useSize, renderEmptyElement } from '../../ui'
import { errLog } from '../../ui/src/log'
import { getLastZIndex, nextZIndex } from '../../ui/src/utils'
import { toCssUnit } from '../../ui/src/dom'
import VxeButtonComponent from '../../button'

import type { BacktopInternalData, BacktopReactData, VxeBacktopPropTypes, BacktopPrivateRef, VxeBacktopEmits, VxeComponentStyleType, VxeBacktopPrivateComputed, BacktopMethods, BacktopPrivateMethods, VxeBacktopConstructor, VxeBacktopPrivateMethods, ValueOf } from '../../../types'

function createInternalData (): BacktopInternalData {
  return {
    targetEl: null
  }
}

function createReactData (): BacktopReactData {
  return {
    showBtn: false,
    backtopZindex: 0
  }
}

export default defineVxeComponent({
  name: 'VxeBacktop',
  props: {
    target: String as PropType<VxeBacktopPropTypes.Target>,
    size: {
      type: String as PropType<VxeBacktopPropTypes.Size>,
      default: () => getConfig().backtop.size || getConfig().size
    },
    circle: {
      type: Boolean as PropType<VxeBacktopPropTypes.Circle>,
      default: () => getConfig().backtop.circle
    },
    right: {
      type: [String, Number] as PropType<VxeBacktopPropTypes.Right>,
      default: () => getConfig().backtop.right
    },
    bottom: {
      type: [String, Number] as PropType<VxeBacktopPropTypes.Bottom>,
      default: () => getConfig().backtop.bottom
    },
    status: {
      type: [String, Number] as PropType<VxeBacktopPropTypes.Status>,
      default: () => getConfig().backtop.status
    },
    icon: {
      type: String as PropType<VxeBacktopPropTypes.Icon>,
      default: () => getConfig().backtop.icon
    },
    showIcon: {
      type: Boolean as PropType<VxeBacktopPropTypes.ShowIcon>,
      default: () => getConfig().backtop.showIcon
    },
    content: {
      type: [String, Number] as PropType<VxeBacktopPropTypes.Content>,
      default: () => getConfig().backtop.content
    },
    showContent: {
      type: Boolean as PropType<VxeBacktopPropTypes.ShowContent>,
      default: () => getConfig().backtop.showContent
    },
    showTop: {
      type: Boolean as PropType<VxeBacktopPropTypes.ShowTop>,
      default: () => getConfig().backtop.showTop
    },
    showBottom: {
      type: Boolean as PropType<VxeBacktopPropTypes.ShowBottom>,
      default: () => getConfig().backtop.showBottom
    },
    shadow: {
      type: Boolean as PropType<VxeBacktopPropTypes.Shadow>,
      default: () => getConfig().backtop.shadow
    },
    zIndex: {
      type: [String, Number] as PropType<VxeBacktopPropTypes.ZIndex>,
      default: () => getConfig().backtop.zIndex
    },
    threshold: {
      type: [String, Number] as PropType<VxeBacktopPropTypes.Threshold>,
      default: () => getConfig().backtop.threshold
    },
    position: {
      type: String as PropType<VxeBacktopPropTypes.Position>,
      default: () => getConfig().backtop.position
    }
  },
  emits: [
    'click'
  ] as VxeBacktopEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const internalData = createInternalData()
    const reactData = reactive(createReactData())

    const refMaps: BacktopPrivateRef = {
      refElem
    }

    const computeWrapperStyle = computed(() => {
      const { right, bottom } = props
      const { backtopZindex } = reactData
      const stys: VxeComponentStyleType = {}
      if (right) {
        stys.right = toCssUnit(right)
      }
      if (bottom) {
        stys.bottom = toCssUnit(bottom)
      }
      if (backtopZindex) {
        stys.zIndex = backtopZindex
      }
      return stys
    })

    const computeMaps: VxeBacktopPrivateComputed = {
    }

    const $xeBacktop = {
      xID,
      props,
      context,
      internalData,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeBacktopConstructor & VxeBacktopPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeBacktopEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $backtop: $xeBacktop }, params))
    }

    const updateZIndex = () => {
      const { position, zIndex } = props
      const { backtopZindex } = reactData
      if (zIndex) {
        reactData.backtopZindex = XEUtils.toNumber(zIndex)
      } else if (position === 'fixed') {
        if (backtopZindex < getLastZIndex()) {
          reactData.backtopZindex = nextZIndex()
        }
      }
    }

    const showBacktop = () => {
      updateZIndex()
      reactData.showBtn = true
    }

    const hideBacktop = () => {
      reactData.showBtn = false
    }

    const handleScrollEvent = (evnt: Event) => {
      const { threshold } = props
      const currentEl = evnt.currentTarget as HTMLElement
      const scrollTop = currentEl.scrollTop
      const showBtn = scrollTop > Math.max(1, XEUtils.toNumber(threshold))
      if (showBtn) {
        showBacktop()
      } else {
        hideBacktop()
      }
    }

    const handleToTop = () => {
      const { targetEl } = internalData
      if (!targetEl) {
        return
      }
      const scrollTop = targetEl.scrollTop
      if (scrollTop > 0) {
        requestAnimationFrame(handleToTop)
        const currScrollTop = scrollTop - Math.max(12, scrollTop / 6)
        targetEl.scrollTop = currScrollTop > 10 ? currScrollTop : 0
      }
    }

    const removeScrollEvent = () => {
      const { targetEl } = internalData
      if (targetEl) {
        targetEl.removeEventListener('scroll', handleScrollEvent)
      }
    }

    const addScrollEvent = () => {
      const { targetEl } = internalData
      if (targetEl) {
        targetEl.addEventListener('scroll', handleScrollEvent, { passive: true })
      }
    }

    const handleTargetElement = () => {
      nextTick(() => {
        const { target } = props
        if (!target) {
          removeScrollEvent()
          errLog('vxe.error.reqProp', ['target'])
          return
        }
        if (XEUtils.isString(target)) {
          const tEl = document.querySelector<HTMLElement>(target)
          if (!tEl) {
            errLog('vxe.error.errProp', [`target=${target}`, 'body'])
          }
          const { targetEl } = internalData
          if (targetEl !== tEl) {
            removeScrollEvent()
            internalData.targetEl = tEl
            addScrollEvent()
          }
        }
      })
    }

    const clickEvent = (evnt: MouseEvent) => {
      handleToTop()
      dispatchEvent('click', {}, evnt)
    }

    const tagMethods: BacktopMethods = {
      dispatchEvent
    }

    const tagPrivateMethods: BacktopPrivateMethods = {
    }

    Object.assign($xeBacktop, tagMethods, tagPrivateMethods)

    const renderVN = () => {
      const { circle, position, status, icon, showIcon, content, showContent, showTop, showBottom, shadow } = props
      const { showBtn } = reactData
      const wrapperStyle = computeWrapperStyle.value
      const vSize = computeSize.value
      const defaultSlot = slots.default
      const topSlot = slots.top
      const bottomSlot = slots.bottom
      return h('div', {
        ref: refElem,
        class: ['vxe-backtop', position === 'fixed' ? ('is--' + position) : 'is--absolute', {
          [`size--${vSize}`]: vSize,
          'is--visible': showBtn
        }],
        style: wrapperStyle
      }, [
        showTop && topSlot
          ? h('div', {
            class: 'vxe-backtop--top-wrapper'
          }, topSlot({}))
          : renderEmptyElement($xeBacktop),
        h('div', {
          class: 'vxe-backtop--content-wrapper',
          onClick: clickEvent
        }, [
          defaultSlot
            ? defaultSlot({})
            : [
                h(VxeButtonComponent, {
                  circle,
                  status,
                  shadow,
                  icon: showIcon ? (icon || getIcon().BACKTOP_TOP) : '',
                  content: showContent ? content : ''
                })
              ]
        ]),
        showBottom && bottomSlot
          ? h('div', {
            class: 'vxe-backtop--bottom-wrapper'
          }, bottomSlot({}))
          : renderEmptyElement($xeBacktop)
      ])
    }

    watch(() => props.position, () => {
      updateZIndex()
    })

    watch(() => props.target, () => {
      handleTargetElement()
    })

    onMounted(() => {
      const { showTop } = props
      if (showTop) {
        updateZIndex()
      }
      handleTargetElement()
    })

    onBeforeUnmount(() => {
      removeScrollEvent()
      XEUtils.assign(reactData, createReactData())
      XEUtils.assign(internalData, createInternalData())
    })

    $xeBacktop.renderVN = renderVN

    return $xeBacktop
  },
  render () {
    return this.renderVN()
  }
})
