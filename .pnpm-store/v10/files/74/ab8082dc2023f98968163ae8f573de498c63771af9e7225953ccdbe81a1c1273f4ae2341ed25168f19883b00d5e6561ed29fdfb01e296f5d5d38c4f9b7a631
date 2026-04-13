import { h, computed, inject, PropType, reactive } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getFuncText } from '../../ui/src/utils'
import { getConfig, createEvent, useSize, getIcon } from '../../ui'

import type { VxeRadioPropTypes, VxeRadioConstructor, VxeRadioEmits, RadioReactData, RadioPrivateMethods, VxeRadioGroupConstructor, VxeRadioGroupPrivateMethods, RadioMethods, VxeFormConstructor, ValueOf, VxeFormPrivateMethods, VxeFormDefines } from '../../../types'

export default defineVxeComponent({
  name: 'VxeRadio',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeRadioPropTypes.ModelValue>,
    checkedValue: {
      type: [String, Number, Boolean] as PropType<VxeRadioPropTypes.CheckedValue>,
      default: undefined
    },
    title: [String, Number] as PropType<VxeRadioPropTypes.Title>,
    content: [String, Number] as PropType<VxeRadioPropTypes.Content>,
    disabled: {
      type: Boolean as PropType<VxeRadioPropTypes.Disabled>,
      default: null
    },
    name: String as PropType<VxeRadioPropTypes.Name>,
    strict: {
      type: Boolean as PropType<VxeRadioPropTypes.Strict>,
      default: () => getConfig().radio.strict
    },
    size: {
      type: String as PropType<VxeRadioPropTypes.Size>,
      default: () => getConfig().radio.size || getConfig().size
    },

    /**
     * 已废弃，被 checkedValue 替换
     */
    label: {
      type: [String, Number, Boolean] as PropType<VxeRadioPropTypes.Label>,
      default: null
    }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeRadioEmits,
  setup (props, context) {
    const { slots, emit } = context

    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)
    const $xeRadioGroup = inject<(VxeRadioGroupConstructor & VxeRadioGroupPrivateMethods) | null>('$xeRadioGroup', null)

    const xID = XEUtils.uniqueId()

    const reactData = reactive<RadioReactData>({
    })

    const $xeRadio = {
      xID,
      props,
      context,
      reactData
    } as unknown as VxeRadioConstructor

    const { computeSize } = useSize(props)

    const computeIsDisabled = computed(() => {
      const { disabled } = props
      if (disabled === null) {
        if ($xeRadioGroup) {
          const { computeIsDisabled } = $xeRadioGroup.getComputeMaps()
          return computeIsDisabled.value
        }
      }
      return disabled
    })

    const computeName = computed(() => {
      return $xeRadioGroup ? $xeRadioGroup.name : props.name
    })

    const computeStrict = computed(() => {
      return $xeRadioGroup ? $xeRadioGroup.props.strict : props.strict
    })

    const computeChecked = computed(() => {
      const { label, checkedValue } = props
      const radioValue = XEUtils.isUndefined(checkedValue) ? label : checkedValue
      return $xeRadioGroup ? $xeRadioGroup.props.modelValue === radioValue : props.modelValue === radioValue
    })

    const handleValue = (checkedValue: VxeRadioPropTypes.CheckedValue, evnt: Event) => {
      const { content } = props
      if ($xeRadioGroup) {
        $xeRadioGroup.handleChecked({ label: checkedValue, checkedValue, checkedLabel: content }, evnt)
      } else {
        emit('update:modelValue', checkedValue)
        dispatchEvent('change', { value: checkedValue, label: checkedValue, checkedValue, checkedLabel: content }, evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, checkedValue)
        }
      }
    }

    const changeEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const { label, checkedValue } = props
        const radioValue = XEUtils.isUndefined(checkedValue) ? label : checkedValue
        handleValue(radioValue, evnt)
      }
    }

    const clickEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      const isStrict = computeStrict.value
      if (!isDisabled && !isStrict) {
        const { label, checkedValue } = props
        const radioValue = XEUtils.isUndefined(checkedValue) ? label : checkedValue
        if (radioValue === ($xeRadioGroup ? $xeRadioGroup.props.modelValue : props.modelValue)) {
          handleValue(null, evnt)
        }
      }
    }

    const dispatchEvent = (type: ValueOf<VxeRadioEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $radio: $xeRadio }, params))
    }

    const radioMethods: RadioMethods = {
      dispatchEvent
    }

    const radioPrivateMethods: RadioPrivateMethods = {
    }

    Object.assign($xeRadio, radioMethods, radioPrivateMethods)

    const renderVN = () => {
      const { label, checkedValue } = props
      const radioValue = XEUtils.isUndefined(checkedValue) ? label : checkedValue
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const name = computeName.value
      const isChecked = computeChecked.value
      return h('label', {
        key: radioValue,
        class: ['vxe-radio vxe-radio--default', {
          [`size--${vSize}`]: vSize,
          'is--checked': isChecked,
          'is--disabled': isDisabled
        }],
        title: props.title
      }, [
        h('input', {
          class: 'vxe-radio--input',
          type: 'radio',
          name,
          checked: isChecked,
          disabled: isDisabled,
          onChange: changeEvent,
          onClick: clickEvent
        }),
        h('span', {
          class: ['vxe-radio--icon', isChecked ? getIcon().RADIO_CHECKED : (isDisabled ? getIcon().RADIO_DISABLED_UNCHECKED : getIcon().RADIO_UNCHECKED)]
        }),
        h('span', {
          class: 'vxe-radio--label'
        }, slots.default ? slots.default({}) : getFuncText(props.content))
      ])
    }

    $xeRadio.renderVN = renderVN

    return $xeRadio
  },
  render () {
    return this.renderVN()
  }
})
