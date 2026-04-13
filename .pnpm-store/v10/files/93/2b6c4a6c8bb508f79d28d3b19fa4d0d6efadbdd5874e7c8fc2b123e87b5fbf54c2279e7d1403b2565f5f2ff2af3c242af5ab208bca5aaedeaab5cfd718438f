import { h, computed, inject, PropType, reactive } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getFuncText } from '../../ui/src/utils'
import { getConfig, createEvent, useSize, getIcon } from '../../ui'

import type { VxeCheckboxConstructor, VxeCheckboxGroupConstructor, CheckboxReactData, VxeCheckboxEmits, ValueOf, VxeCheckboxGroupPrivateMethods, CheckboxMethods, VxeCheckboxPropTypes, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines } from '../../../types'

export default defineVxeComponent({
  name: 'VxeCheckbox',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeCheckboxPropTypes.ModelValue>,
    label: {
      type: [String, Number] as PropType<VxeCheckboxPropTypes.Label>,
      default: null
    },
    indeterminate: Boolean as PropType<VxeCheckboxPropTypes.Indeterminate>,
    title: [String, Number] as PropType<VxeCheckboxPropTypes.Title>,
    checkedValue: {
      type: [String, Number, Boolean] as PropType<VxeCheckboxPropTypes.CheckedValue>,
      default: true
    },
    uncheckedValue: {
      type: [String, Number, Boolean] as PropType<VxeCheckboxPropTypes.UncheckedValue>,
      default: false
    },
    content: [String, Number] as PropType<VxeCheckboxPropTypes.Content>,
    disabled: {
      type: Boolean as PropType<VxeCheckboxPropTypes.Disabled>,
      default: null
    },
    size: {
      type: String as PropType<VxeCheckboxPropTypes.Size>,
      default: () => getConfig().checkbox.size || getConfig().size
    }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeCheckboxEmits,
  setup (props, context) {
    const { slots, emit } = context

    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)
    const $xeCheckboxGroup = inject<(VxeCheckboxGroupConstructor & VxeCheckboxGroupPrivateMethods) | null>('$xeCheckboxGroup', null)

    const xID = XEUtils.uniqueId()

    const reactData: CheckboxReactData = reactive({
    })

    const $xeCheckbox = {
      xID,
      props,
      context,
      reactData
    } as unknown as VxeCheckboxConstructor

    let checkboxMethods = {} as CheckboxMethods

    const { computeSize } = useSize(props)

    const computeIsChecked = computed(() => {
      if ($xeCheckboxGroup) {
        return XEUtils.includes($xeCheckboxGroup.props.modelValue, props.label)
      }
      return props.modelValue === props.checkedValue
    })

    const computeIsDisabled = computed(() => {
      const { disabled } = props
      const isChecked = computeIsChecked.value
      if (disabled === null) {
        if ($xeCheckboxGroup) {
          const { computeIsDisabled: computeIsGroupDisabled, computeIsMaximize: computeIsGroupMaximize } = $xeCheckboxGroup.getComputeMaps()
          const isGroupDisabled = computeIsGroupDisabled.value
          const isGroupMaximize = computeIsGroupMaximize.value
          return isGroupDisabled || (isGroupMaximize && !isChecked)
        }
      }
      return disabled
    })

    const changeEvent = (evnt: Event & { target: { checked: boolean } }) => {
      const { checkedValue, uncheckedValue } = props
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const checked = evnt.target.checked
        const value = checked ? checkedValue : uncheckedValue
        const params = { checked, value, label: props.label }
        if ($xeCheckboxGroup) {
          $xeCheckboxGroup.handleChecked(params, evnt)
        } else {
          emit('update:modelValue', value)
          checkboxMethods.dispatchEvent('change', params, evnt)
          // 自动更新校验状态
          if ($xeForm && formItemInfo) {
            $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
          }
        }
      }
    }

    const dispatchEvent = (type: ValueOf<VxeCheckboxEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $checkbox: $xeCheckbox }, params))
    }

    checkboxMethods = {
      dispatchEvent
    }

    Object.assign($xeCheckbox, checkboxMethods)

    const renderVN = () => {
      const { label } = props
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const isChecked = computeIsChecked.value
      const indeterminate = !isChecked && props.indeterminate
      return h('label', {
        key: label,
        class: ['vxe-checkbox vxe-checkbox--default', {
          [`size--${vSize}`]: vSize,
          'is--indeterminate': indeterminate,
          'is--disabled': isDisabled,
          'is--checked': isChecked
        }],
        title: props.title
      }, [
        h('input', {
          class: 'vxe-checkbox--input',
          type: 'checkbox',
          disabled: isDisabled,
          checked: isChecked,
          onChange: changeEvent
        }),
        h('span', {
          class: ['vxe-checkbox--icon', indeterminate ? getIcon().CHECKBOX_INDETERMINATE : (isChecked ? getIcon().CHECKBOX_CHECKED : (isDisabled ? getIcon().CHECKBOX_DISABLED_UNCHECKED : getIcon().CHECKBOX_UNCHECKED))]
        }),
        h('span', {
          class: 'vxe-checkbox--label'
        }, slots.default ? slots.default({}) : getFuncText(props.content))
      ])
    }

    $xeCheckbox.renderVN = renderVN

    return $xeCheckbox
  },
  render () {
    return this.renderVN()
  }
})
