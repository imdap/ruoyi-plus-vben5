import { ref, h, reactive, provide, PropType, watch, nextTick, onMounted, computed, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, getIcon, createEvent, renderEmptyElement } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'
import { toCssUnit } from '../../ui/src/dom'
import VxeLoadingComponent from '../../loading/src/loading'
import XEUtils from 'xe-utils'

import type { CarouselReactData, CarouselPrivateRef, VxeCarouselPropTypes, CarouselInternalData, CarouselMethods, CarouselPrivateMethods, VxeCarouselEmits, VxeCarouselDefines, VxeCarouselPrivateComputed, VxeCarouselConstructor, ValueOf, VxeCarouselPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeCarousel',
  props: {
    modelValue: [String, Number] as PropType<VxeCarouselPropTypes.ModelValue>,
    options: Array as PropType<VxeCarouselPropTypes.Options>,
    loading: Boolean as PropType<VxeCarouselPropTypes.Loading>,
    height: {
      type: [Number, String] as PropType<VxeCarouselPropTypes.Height>,
      default: () => getConfig().carousel.height
    },
    width: {
      type: [Number, String] as PropType<VxeCarouselPropTypes.Width>,
      default: () => getConfig().carousel.width
    },
    autoPlay: {
      type: Boolean as PropType<VxeCarouselPropTypes.AutoPlay>,
      default: () => getConfig().carousel.autoPlay
    },
    interval: {
      type: [Number, String] as PropType<VxeCarouselPropTypes.Interval>,
      default: () => getConfig().carousel.interval
    },
    loop: {
      type: Boolean as PropType<VxeCarouselPropTypes.Loop>,
      default: () => getConfig().carousel.loop
    },
    vertical: {
      type: Boolean as PropType<VxeCarouselPropTypes.Vertical>,
      default: () => getConfig().carousel.vertical
    },
    showIndicators: {
      type: Boolean as PropType<VxeCarouselPropTypes.ShowIndicators>,
      default: () => getConfig().carousel.showIndicators
    }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeCarouselEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()
    const refWrapperElem = ref<HTMLDivElement>()

    const reactData = reactive<CarouselReactData>({
      activeName: '',
      staticItems: [],
      itemWidth: 0,
      itemHeight: 0
    })

    const internalData: CarouselInternalData = {
      apTimeout: undefined,
      stopFlag: false
    }

    const refMaps: CarouselPrivateRef = {
      refElem
    }

    const computeListStyle = computed(() => {
      const { vertical, options } = props
      const { activeName, itemWidth, itemHeight, staticItems } = reactData
      const list = (staticItems && staticItems.length ? staticItems : options) || []
      const activeIndex = Math.max(0, XEUtils.findIndexOf(list, item => item.name === activeName))
      const stys: Record<string, any> = {}
      if (vertical) {
        stys.transform = `translateY(-${activeIndex * itemHeight}px)`
      } else {
        stys.width = `${itemWidth * list.length}px`
        stys.transform = `translateX(-${activeIndex * itemWidth}px)`
      }
      return stys
    })

    const computeMaps: VxeCarouselPrivateComputed = {
    }

    const $xeCarousel = {
      xID,
      props,
      context,
      reactData,
      internalData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeCarouselConstructor & VxeCarouselPrivateMethods

    const updateStyle = () => {
      nextTick(() => {
        const wrapperElem = refWrapperElem.value
        if (wrapperElem) {
          reactData.itemWidth = wrapperElem.clientWidth
          reactData.itemHeight = wrapperElem.clientHeight
        }
      })
    }

    const clickItemEvent = (evnt: Event, item: VxeCarouselDefines.ItemConfig | VxeCarouselPropTypes.Option) => {
      const value = item.name
      reactData.activeName = item.name
      emit('update:modelValue', value)
      emit('change', { value }, evnt)
      updateStyle()
    }

    const initDefaultActive = (list?: VxeCarouselDefines.ItemConfig[] | VxeCarouselPropTypes.Options) => {
      let activeName: VxeCarouselPropTypes.ModelValue | undefined = null
      if (list && list.length) {
        let validVal = false
        activeName = props.modelValue
        list.forEach((item) => {
          if (activeName === item.name) {
            validVal = true
          }
        })
        if (!validVal) {
          activeName = list[0].name
          emit('update:modelValue', activeName)
        }
      }
      reactData.activeName = activeName
    }

    const dispatchEvent = (type: ValueOf<VxeCarouselEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $carousel: $xeCarousel }, params))
    }

    const handlePrevNext = (isNext: boolean) => {
      const { options, loop } = props
      const { activeName, staticItems } = reactData
      const list = (staticItems && staticItems.length ? staticItems : options) || []
      const index = Math.max(0, XEUtils.findIndexOf(list, item => item.name === activeName))
      if (index > -1) {
        let item: VxeCarouselDefines.ItemConfig | VxeCarouselPropTypes.Option | null = null
        if (isNext) {
          if (index < list.length - 1) {
            item = list[index + 1]
          } else {
            if (loop) {
              item = list[0]
            }
          }
        } else {
          if (index > 0) {
            item = list[index - 1]
          } else {
            if (loop) {
              item = list[list.length - 1]
            }
          }
        }
        if (item) {
          const name = item.name
          const value = name
          reactData.activeName = name
          emit('update:modelValue', value)
          return true
        }
      }
      return false
    }

    const carouselMethods: CarouselMethods = {
      dispatchEvent,
      prev () {
        if (handlePrevNext(false)) {
          handleAutoPlay()
        }
        return nextTick()
      },
      next () {
        if (handlePrevNext(true)) {
          handleAutoPlay()
        }
        return nextTick()
      }
    }

    const prevEvent = (evnt: Event) => {
      if (handlePrevNext(false)) {
        const value = reactData.activeName
        emit('change', { value }, evnt)
      }
    }

    const nextEvent = (evnt: Event) => {
      if (handlePrevNext(true)) {
        const value = reactData.activeName
        emit('change', { value }, evnt)
      }
    }

    const stopAutoPlay = () => {
      const { apTimeout } = internalData
      internalData.stopFlag = true
      if (apTimeout) {
        clearTimeout(apTimeout)
        internalData.apTimeout = undefined
      }
    }

    const handleAutoPlay = () => {
      const { autoPlay, interval } = props
      const { stopFlag } = internalData
      stopAutoPlay()
      if (autoPlay) {
        internalData.stopFlag = false
        internalData.apTimeout = setTimeout(() => {
          if (!stopFlag) {
            handlePrevNext(true)
          }
        }, XEUtils.toNumber(interval) || 300)
      }
    }

    const mouseenterEvent = () => {
      stopAutoPlay()
    }

    const mouseleaveEvent = () => {
      handleAutoPlay()
    }

    const carouselPrivateMethods: CarouselPrivateMethods = {
    }

    const callSlot = (slotFunc: any, params: any) => {
      if (slotFunc) {
        if (XEUtils.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc(params))
        }
      }
      return []
    }

    Object.assign($xeCarousel, carouselMethods, carouselPrivateMethods)

    const renderItemWrapper = (list: VxeCarouselDefines.ItemConfig[] | VxeCarouselPropTypes.Options) => {
      const { height } = props
      const { activeName } = reactData
      const listStyle = computeListStyle.value

      return h('div', {
        class: 'vxe-carousel--list',
        style: listStyle
      }, list.map(item => {
        const { name, url, slots } = item
        const defaultSlot = slots ? slots.default : null
        return h('div', {
          key: `${name}`,
          class: ['vxe-carousel--item-inner', {
            'is--active': activeName === name
          }],
          style: height
            ? {
                height: toCssUnit(height)
              }
            : null
        }, defaultSlot
          ? callSlot(defaultSlot, {})
          : [
              h('img', {
                class: 'vxe-carousel--item-img',
                src: url
              })
            ])
      }))
    }

    const renderIndicators = (list: VxeCarouselDefines.ItemConfig[] | VxeCarouselPropTypes.Options) => {
      const { activeName } = reactData
      return h('div', {
        class: 'vxe-carousel--indicators'
      }, list.map((item) => {
        const { name } = item
        return h('div', {
          key: `${name}`,
          class: ['vxe-carousel--indicators-item', {
            'is--active': activeName === name
          }],
          onClick (evnt) {
            clickItemEvent(evnt, item)
          }
        })
      }))
    }

    const renderVN = () => {
      const { loading, height, width, showIndicators, vertical, options } = props
      const { staticItems } = reactData
      const defaultSlot = slots.default
      const list = (staticItems && staticItems.length ? staticItems : options) || []

      return h('div', {
        ref: refElem,
        class: ['vxe-carousel', `is--${vertical ? 'vertical' : 'horizontal'}`],
        style: width
          ? {
              width: toCssUnit(width)
            }
          : null,
        onMouseenter: mouseenterEvent,
        onMouseleave: mouseleaveEvent
      }, [
        h('div', {
          class: 'vxe-carousel--slots'
        }, defaultSlot ? defaultSlot({}) : []),
        h('div', {
          ref: refWrapperElem,
          class: 'vxe-carousel--item-wrapper',
          style: height
            ? {
                height: toCssUnit(height)
              }
            : null
        }, [
          renderItemWrapper(list)
        ]),
        showIndicators ? renderIndicators(list) : renderEmptyElement($xeCarousel),
        h('div', {
          class: 'vxe-carousel--btn-wrapper'
        }, [
          h('div', {
            class: 'vxe-carousel--previous-btn',
            onClick: prevEvent
          }, [
            h('i', {
              class: vertical ? getIcon().CAROUSEL_VERTICAL_PREVIOUS : getIcon().CAROUSEL_HORIZONTAL_PREVIOUS
            })
          ]),
          h('div', {
            class: 'vxe-carousel--next-btn',
            onClick: nextEvent
          }, [
            h('i', {
              class: vertical ? getIcon().CAROUSEL_VERTICAL_NEXT : getIcon().CAROUSEL_HORIZONTAL_NEXT
            })
          ])
        ]),
        /**
         * 加载中
         */
        h(VxeLoadingComponent, {
          class: 'vxe-carousel--loading',
          modelValue: loading
        })
      ])
    }

    const optsFlag = ref(0)
    watch(() => props.options ? props.options.length : -1, () => {
      optsFlag.value++
    })
    watch(() => props.options, () => {
      optsFlag.value++
    })
    watch(optsFlag, () => {
      initDefaultActive(props.options)
    })

    const stFlag = ref(0)
    watch(() => reactData.staticItems ? reactData.staticItems.length : -1, () => {
      stFlag.value++
    })
    watch(() => reactData.staticItems, () => {
      stFlag.value++
    })
    watch(stFlag, () => {
      initDefaultActive(reactData.staticItems)
    })

    watch(() => props.autoPlay, () => {
      handleAutoPlay()
    })

    initDefaultActive(reactData.staticItems.length ? reactData.staticItems : props.options)

    onMounted(() => {
      handleAutoPlay()
      updateStyle()
    })

    onUnmounted(() => {
      stopAutoPlay()
    })

    provide('$xeCarousel', $xeCarousel)

    $xeCarousel.renderVN = renderVN

    return $xeCarousel
  },
  render () {
    return this.renderVN()
  }
})
