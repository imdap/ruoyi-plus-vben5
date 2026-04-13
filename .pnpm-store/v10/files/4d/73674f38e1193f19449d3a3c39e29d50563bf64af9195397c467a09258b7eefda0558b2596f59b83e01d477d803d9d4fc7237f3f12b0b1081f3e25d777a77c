import { ref, h, reactive, PropType, watch, computed, inject, onMounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent, renderEmptyElement, useSize } from '../../ui'

import type { SliderReactData, VxeSliderEmits, VxeSliderPropTypes, SliderMethods, VxeFormDefines, VxeFormConstructor, VxeFormPrivateMethods, SliderPrivateMethods, ValueOf, SliderPrivateRef, VxeSliderPrivateComputed, VxeSliderConstructor, VxeSliderPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeSlider',
  props: {
    modelValue: [String, Number, Array] as PropType<VxeSliderPropTypes.ModelValue>,
    vertical: Boolean as PropType<VxeSliderPropTypes.Vertical>,
    max: {
      type: [String, Number] as PropType<VxeSliderPropTypes.Max>,
      default: () => getConfig().slider.max
    },
    min: {
      type: [String, Number] as PropType<VxeSliderPropTypes.Min>,
      default: () => getConfig().slider.min
    },
    step: {
      type: [String, Number] as PropType<VxeSliderPropTypes.Step>,
      default: () => getConfig().slider.step
    },
    size: {
      type: String as PropType<VxeSliderPropTypes.Size>,
      default: () => getConfig().slider.size || getConfig().size
    },
    range: {
      type: Boolean as PropType<VxeSliderPropTypes.Range>,
      default: () => getConfig().slider.range
    },
    readonly: {
      type: Boolean as PropType<VxeSliderPropTypes.Readonly>,
      default: null
    },
    disabled: {
      type: Boolean as PropType<VxeSliderPropTypes.Disabled>,
      default: null
    }
  },
  emits: [
    'update:modelValue',
    'change',
    'track-dragstart',
    'track-dragover',
    'track-dragend'
  ] as VxeSliderEmits,
  setup (props, context) {
    const { emit } = context

    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()
    const refBarElem = ref<HTMLDivElement>()
    const refTrackElem = ref<HTMLDivElement>()
    const refStartBtnElem = ref<HTMLDivElement>()
    const refEndBtnElem = ref<HTMLDivElement>()

    const reactData = reactive<SliderReactData>({
      startValue: 0,
      endValue: 0
    })

    const refMaps: SliderPrivateRef = {
      refElem
    }

    const computeFormReadonly = computed(() => {
      const { readonly } = props
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly
        }
        return false
      }
      return readonly
    })

    const computeIsDisabled = computed(() => {
      const { disabled } = props
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.disabled
        }
        return false
      }
      return disabled
    })

    const computeMaxNum = computed(() => {
      return XEUtils.toNumber(props.max || 0)
    })

    const computeMinNum = computed(() => {
      return XEUtils.toNumber(props.min || 0)
    })

    const computeMaps: VxeSliderPrivateComputed = {
    }

    const $xeSlider = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeSliderConstructor & VxeSliderPrivateMethods

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const dispatchEvent = (type: ValueOf<VxeSliderEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $slider: $xeSlider }, params))
    }

    const collapsePaneMethods: SliderMethods = {
      dispatchEvent
    }

    const getStartPercent = (startValue: number) => {
      const { range } = props
      const maxNum = computeMaxNum.value
      const minNum = computeMinNum.value
      return range ? XEUtils.floor((startValue - minNum) / XEUtils.toNumber(maxNum - minNum) * 100) : 0
    }

    const getEndPercent = (startValue: number, endValue: number) => {
      const { range } = props
      const maxNum = computeMaxNum.value
      const minNum = computeMinNum.value
      return XEUtils.floor((endValue - (range ? startValue : 0) - minNum) / XEUtils.toNumber(maxNum - minNum) * 100)
    }

    const updateModel = () => {
      const { modelValue } = props
      if (XEUtils.isArray(modelValue)) {
        const [sVal, eVal] = XEUtils.clone(modelValue, true).sort()
        reactData.startValue = XEUtils.floor(XEUtils.toNumber(sVal || 0))
        reactData.endValue = XEUtils.floor(XEUtils.toNumber(eVal || 0))
      } else {
        reactData.startValue = 0
        reactData.endValue = XEUtils.floor(XEUtils.toNumber(modelValue || 0))
      }
    }

    const updateBarStyle = () => {
      const { startValue, endValue } = reactData
      const trackElem = refTrackElem.value
      const startBtnElem = refStartBtnElem.value
      const endBtnElem = refEndBtnElem.value
      let startPercent = 0
      let endPercent = 0
      if (startValue > endValue) {
        startPercent = getStartPercent(endValue)
        endPercent = getEndPercent(endValue, startValue)
      } else {
        startPercent = getStartPercent(startValue)
        endPercent = getEndPercent(startValue, endValue)
      }
      if (trackElem) {
        trackElem.style.left = `${startPercent}%`
        trackElem.style.width = `${endPercent}%`
      }
      if (startBtnElem) {
        startBtnElem.style.left = `${startPercent}%`
      }
      if (endBtnElem) {
        endBtnElem.style.left = `${XEUtils.floor(startPercent + endPercent)}%`
      }
    }

    const changeEvent = (evnt: MouseEvent) => {
      const { range } = props
      const { startValue, endValue } = reactData
      const value = range ? [startValue, endValue].sort() : endValue
      emitModel(value)
      dispatchEvent('change', { value }, evnt)
      // 自动更新校验状态
      if ($xeForm && formItemInfo) {
        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
      }
    }

    const handleMousedownEvent = (evnt: MouseEvent, isEnd: boolean) => {
      const formReadonly = computeFormReadonly.value
      const isDisabled = computeIsDisabled.value
      const maxNum = computeMaxNum.value
      const minNum = computeMinNum.value
      if (!(formReadonly || isDisabled)) {
        evnt.preventDefault()
        document.onmousemove = evnt => {
          evnt.preventDefault()
          const el = refElem.value
          const barElem = refBarElem.value
          if (el && barElem) {
            const barRect = barElem.getBoundingClientRect()
            const trackWidth = (evnt.clientX - barRect.left) / barRect.width
            if (isEnd) {
              reactData.endValue = XEUtils.floor(Math.max(minNum, Math.min(maxNum, trackWidth * (maxNum - minNum) + minNum)))
            } else {
              reactData.startValue = XEUtils.floor(Math.max(minNum, Math.min(maxNum, trackWidth * (maxNum - minNum))))
            }
            dispatchEvent('track-dragover', { startValue: reactData.startValue, endValue: reactData.endValue }, evnt)
          }
          updateBarStyle()
        }
        document.onmouseup = (evnt: MouseEvent) => {
          document.onmousemove = null
          document.onmouseup = null
          dispatchEvent('track-dragend', { startValue: reactData.startValue, endValue: reactData.endValue }, evnt)
          changeEvent(evnt)
          updateBarStyle()
        }
        dispatchEvent('track-dragstart', { startValue: reactData.startValue, endValue: reactData.endValue }, evnt)
      }
    }

    const handleStartMousedownEvent = (evnt: MouseEvent) => {
      const endBtnElem = refEndBtnElem.value
      const startBtnElem = evnt.currentTarget as HTMLDivElement
      handleMousedownEvent(evnt, endBtnElem ? endBtnElem.offsetLeft < startBtnElem.offsetLeft : false)
    }

    const handleEndMousedownEvent = (evnt: MouseEvent) => {
      const startBtnElem = refStartBtnElem.value
      const endBtnElem = evnt.currentTarget as HTMLDivElement
      handleMousedownEvent(evnt, startBtnElem ? endBtnElem.offsetLeft > startBtnElem.offsetLeft : true)
    }

    const collapsePanePrivateMethods: SliderPrivateMethods = {
    }

    Object.assign($xeSlider, collapsePaneMethods, collapsePanePrivateMethods)

    const renderVN = () => {
      const { vertical, range } = props
      const vSize = computeSize.value
      const formReadonly = computeFormReadonly.value
      const isDisabled = computeIsDisabled.value
      return h('div', {
        ref: refElem,
        class: ['vxe-slider', {
          [`size--${vSize}`]: vSize,
          'is--vertical': vertical,
          'is--readonly': formReadonly,
          'is--disabled': isDisabled
        }]
      }, [
        h('div', {
          class: 'vxe-slider--inner'
        }, [
          h('div', {
            ref: refBarElem,
            class: 'vxe-slider--bar-wrapper'
          }),
          h('div', {
            ref: refTrackElem,
            class: 'vxe-slider--bar-track'
          }),
          formReadonly || !range
            ? renderEmptyElement($xeSlider)
            : h('div', {
              ref: refStartBtnElem,
              class: 'vxe-slider--bar-btn vxe-slider--start-btn',
              onMousedown: handleStartMousedownEvent
            }),
          formReadonly
            ? renderEmptyElement($xeSlider)
            : h('div', {
              ref: refEndBtnElem,
              class: 'vxe-slider--bar-btn vxe-slider--end-btn',
              onMousedown: handleEndMousedownEvent
            })
        ])
      ])
    }

    watch(() => props.modelValue, () => {
      updateModel()
    })

    onMounted(() => {
      updateBarStyle()
    })

    updateModel()

    $xeSlider.renderVN = renderVN

    return $xeSlider
  },
  render () {
    return this.renderVN()
  }
})
