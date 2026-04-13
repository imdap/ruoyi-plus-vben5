import { ref, h, reactive, watch, computed, PropType, onUnmounted, onMounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, getI18n, createEvent, useSize, renderEmptyElement } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'
import VxeTextComponent from '../../text/src/text'
import XEUtils from 'xe-utils'

import type { VxeCountdownPropTypes, CountdownReactData, CountdownInternalData, CountdownPrivateRef, VxeCountdownEmits, VxeCountdownPrivateComputed, VxeCountdownConstructor, VxeCountdownPrivateMethods, ValueOf, CountdownMethods, CountdownPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeCountdown',
  props: {
    modelValue: [Number, String] as PropType<VxeCountdownPropTypes.ModelValue>,
    format: String as PropType<VxeCountdownPropTypes.Format>,
    prefixConfig: Object as PropType<VxeCountdownPropTypes.PrefixConfig>,
    suffixConfig: Object as PropType<VxeCountdownPropTypes.SuffixConfig>,
    size: {
      type: String as PropType<VxeCountdownPropTypes.Size>,
      default: () => getConfig().countdown.size || getConfig().size
    }
  },
  emits: [
    'update:modelValue',
    'start',
    'end'
  ] as VxeCountdownEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const reactData = reactive<CountdownReactData>({
      currNum: 0,
      secondNum: 0
    })

    const internalData: CountdownInternalData = {
      dnTimeout: undefined
    }

    const refMaps: CountdownPrivateRef = {
      refElem
    }

    const computeTimeFormats = computed<Array<'yyyy' | 'MM' | 'dd' | 'HH' | 'mm' | 'ss'>>(() => {
      const { secondNum } = reactData
      if (secondNum >= 31622400000) {
        return ['yyyy', 'MM', 'dd', 'HH', 'mm', 'ss']
      }
      if (secondNum >= 2678400000) {
        return ['MM', 'dd', 'HH', 'mm', 'ss']
      }
      if (secondNum >= 86400000) {
        return ['dd', 'HH', 'mm', 'ss']
      }
      if (secondNum >= 3600000) {
        return ['HH', 'mm', 'ss']
      }
      if (secondNum >= 60000) {
        return ['mm', 'ss']
      }
      return ['ss']
    })

    const computeDiffConf = computed(() => {
      const { currNum } = reactData
      const diffRest = XEUtils.getDateDiff(Date.now(), Date.now() + currNum)
      return Object.assign(diffRest, { done: !(XEUtils.isBoolean(diffRest.status) ? diffRest.status : diffRest.done) })
    })

    const computeFormatLabel = computed(() => {
      const { format } = props
      const diffConf = computeDiffConf.value
      let rest = ''
      if (format) {
        rest = `${format}`
        XEUtils.each(diffConf, (val, key) => {
          rest = rest.replace(new RegExp(key, 'g'), XEUtils.padStart(val, key.length, '0'))
        })
        return rest
      }
      return rest
    })

    const computePrefixOpts = computed(() => {
      return Object.assign({}, props.prefixConfig, getConfig().countdown.prefixConfig)
    })

    const computeSuffixOpts = computed(() => {
      return Object.assign({}, props.suffixConfig, getConfig().countdown.suffixConfig)
    })

    const computeMaps: VxeCountdownPrivateComputed = {
      computeSize
    }

    const $xeCountdown = {
      xID,
      props,
      context,
      reactData,
      internalData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeCountdownConstructor & VxeCountdownPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeCountdownEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $carousel: $xeCountdown }, params))
    }

    const updateCount = () => {
      const secondNum = XEUtils.toNumber(props.modelValue || 0)
      reactData.secondNum = secondNum
      reactData.currNum = secondNum
    }

    const handleTime = () => {
      const { currNum } = reactData
      if (currNum > 1000) {
        reactData.currNum -= 1000
        internalData.dnTimeout = setTimeout(() => {
          handleTime()
        }, 1000)
      } else {
        reactData.currNum = 0
        handleStop()
      }
    }

    const countdownMethods: CountdownMethods = {
      dispatchEvent
    }

    const handleStart = () => {
      dispatchEvent('start', {}, null)
      handleTime()
    }

    const handleStop = () => {
      const { dnTimeout } = internalData
      if (dnTimeout) {
        clearTimeout(dnTimeout)
        internalData.dnTimeout = undefined
        dispatchEvent('end', {}, null)
      }
    }

    const countdownPrivateMethods: CountdownPrivateMethods = {
    }

    Object.assign($xeCountdown, countdownMethods, countdownPrivateMethods)

    const renderDefaultContentVNs = () => {
      const { format } = props
      const timeFormats = computeTimeFormats.value
      const diffConf = computeDiffConf.value
      const formatLabel = computeFormatLabel.value

      if (format) {
        return [
          h('div', {
            key: 'format',
            class: 'vxe-countdown--content-format'
          }, formatLabel)
        ]
      }
      return timeFormats.map((key, index) => {
        return h('div', {
          key: index,
          class: 'vxe-countdown--content-item'
        }, [
          h('div', {
            class: 'vxe-countdown--content-num'
          }, `${diffConf[key] || 0}`),
          h('div', {
            class: 'vxe-countdown--content-unit'
          }, getI18n(`vxe.countdown.formats.${key}`))
        ])
      })
    }

    const renderVN = () => {
      const { prefixConfig, suffixConfig } = props
      const { currNum } = reactData
      const vSize = computeSize.value
      const diffConf = computeDiffConf.value
      const prefixOpts = computePrefixOpts.value
      const suffixOpts = computeSuffixOpts.value
      const prefixSlot = slots.prefix
      const suffixSlot = slots.suffix
      const defaultSlot = slots.default

      return h('div', {
        ref: refElem,
        class: ['vxe-countdown', diffConf.done ? 'is--progress' : 'is-end', {
          [`size--${vSize}`]: vSize
        }]
      }, [
        prefixSlot || prefixConfig
          ? h('div', {
            class: 'vxe-countdown--prefix'
          }, prefixSlot
            ? getSlotVNs(prefixSlot({ currentValue: currNum, diffConf }))
            : [
                h(VxeTextComponent, {
                  content: prefixOpts.content,
                  icon: prefixOpts.icon,
                  status: prefixOpts.status
                })
              ])
          : renderEmptyElement($xeCountdown),
        h('div', {
          class: 'vxe-countdown--content'
        }, defaultSlot
          ? getSlotVNs(defaultSlot({ currentValue: currNum, diffConf }))
          : renderDefaultContentVNs()
        ),
        suffixSlot || suffixConfig
          ? h('div', {
            class: 'vxe-countdown--suffix'
          }, suffixSlot
            ? getSlotVNs(suffixSlot({ currentValue: currNum, diffConf }))
            : [
                h(VxeTextComponent, {
                  content: suffixOpts.content,
                  icon: suffixOpts.icon,
                  status: suffixOpts.status
                })
              ])
          : renderEmptyElement($xeCountdown)
      ])
    }

    watch(() => props.modelValue, () => {
      updateCount()
      handleStop()
      handleStart()
    })

    onUnmounted(() => {
      handleStop()
    })

    onMounted(() => {
      handleStart()
    })

    updateCount()

    $xeCountdown.renderVN = renderVN

    return $xeCountdown
  },
  render () {
    return this.renderVN()
  }
})
