import { h, ref, Ref, computed, reactive, nextTick, PropType, inject } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, createEvent, useSize, renderEmptyElement } from '../../ui'
import { getFuncText } from '../../ui/src/utils'

import type { VxeSwitchPropTypes, VxeSwitchConstructor, VxeSwitchEmits, SwitchInternalData, ValueOf, SwitchReactData, SwitchMethods, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines } from '../../../types'

export default defineVxeComponent({
  name: 'VxeSwitch',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeSwitchPropTypes.ModelValue>,
    disabled: {
      type: Boolean as PropType<VxeSwitchPropTypes.Disabled>,
      default: null
    },
    readonly: {
      type: Boolean as PropType<VxeSwitchPropTypes.Readonly>,
      default: null
    },
    size: {
      type: String as PropType<VxeSwitchPropTypes.Size>,
      default: () => getConfig().switch.size || getConfig().size
    },
    openLabel: String as PropType<VxeSwitchPropTypes.OpenLabel>,
    closeLabel: String as PropType<VxeSwitchPropTypes.CloseLabel>,
    openValue: {
      type: [String, Number, Boolean] as PropType<VxeSwitchPropTypes.OpenValue>,
      default: true
    },
    closeValue: {
      type: [String, Number, Boolean] as PropType<VxeSwitchPropTypes.CloseValue>,
      default: false
    },
    openIcon: String as PropType<VxeSwitchPropTypes.OpenIcon>,
    closeIcon: String as PropType<VxeSwitchPropTypes.CloseIcon>,
    openActiveIcon: String as PropType<VxeSwitchPropTypes.OpenActiveIcon>,
    closeActiveIcon: String as PropType<VxeSwitchPropTypes.CloseActiveIcon>
  },
  emits: [
    'update:modelValue',
    'change',
    'focus',
    'blur'
  ] as VxeSwitchEmits,
  setup (props, context) {
    const { emit } = context
    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<SwitchReactData>({
      isActivated: false,
      hasAnimat: false,
      offsetLeft: 0
    })

    const internalData: SwitchInternalData = {
    }

    const $xeSwitch = {
      xID,
      props,
      context,
      reactData,
      internalData
    } as unknown as VxeSwitchConstructor

    const refButton = ref() as Ref<HTMLButtonElement>

    let switchMethods = {} as SwitchMethods

    const computeIsDisabled = computed(() => {
      const { disabled } = props
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.readonly || $xeForm.props.disabled
        }
        return false
      }
      return disabled
    })

    const computeIsReadonly = computed(() => {
      const { readonly } = props
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly || $xeForm.props.disabled
        }
        return false
      }
      return readonly
    })

    const computeOnShowLabel = computed(() => {
      return getFuncText(props.openLabel)
    })

    const computeOffShowLabel = computed(() => {
      return getFuncText(props.closeLabel)
    })

    const computeIsChecked = computed(() => {
      return props.modelValue === props.openValue
    })

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const clickEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      const isReadonly = computeIsReadonly.value
      if (!(isDisabled || isReadonly)) {
        const isChecked = computeIsChecked.value
        clearTimeout(internalData.atTimeout)
        const value = isChecked ? props.closeValue : props.openValue
        reactData.hasAnimat = true
        emitModel(value)
        switchMethods.dispatchEvent('change', { value }, evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
        }
        internalData.atTimeout = setTimeout(() => {
          reactData.hasAnimat = false
          internalData.atTimeout = undefined
        }, 400)
      }
    }

    const dispatchEvent = (type: ValueOf<VxeSwitchEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $switch: $xeSwitch }, params))
    }

    const focusEvent = (evnt: Event) => {
      reactData.isActivated = true
      switchMethods.dispatchEvent('focus', { value: props.modelValue }, evnt)
    }

    const blurEvent = (evnt: Event) => {
      reactData.isActivated = false
      switchMethods.dispatchEvent('blur', { value: props.modelValue }, evnt)
    }

    switchMethods = {
      dispatchEvent,
      focus () {
        const btnElem = refButton.value
        reactData.isActivated = true
        if (btnElem) {
          btnElem.focus()
        }
        return nextTick()
      },
      blur () {
        const btnElem = refButton.value
        if (btnElem) {
          btnElem.blur()
        }
        reactData.isActivated = false
        return nextTick()
      }
    }

    Object.assign($xeSwitch, switchMethods)

    const renderVN = () => {
      const { openIcon, closeIcon, openActiveIcon, closeActiveIcon } = props
      const vSize = computeSize.value
      const isChecked = computeIsChecked.value
      const onShowLabel = computeOnShowLabel.value
      const offShowLabel = computeOffShowLabel.value
      const isDisabled = computeIsDisabled.value
      const isReadonly = computeIsReadonly.value

      return h('div', {
        class: ['vxe-switch', isChecked ? 'is--on' : 'is--off', {
          [`size--${vSize}`]: vSize,
          'is--disabled': isDisabled,
          'is--readonly': isReadonly,
          'is--animat': reactData.hasAnimat
        }]
      }, [
        h('button', {
          ref: refButton,
          class: 'vxe-switch--button',
          type: 'button',
          disabled: isDisabled || isReadonly,
          onClick: clickEvent,
          onFocus: focusEvent,
          onBlur: blurEvent
        }, [
          h('span', {
            class: 'vxe-switch--label vxe-switch--label-on'
          }, [
            openIcon
              ? h('i', {
                class: ['vxe-switch--label-icon', openIcon]
              })
              : renderEmptyElement($xeSwitch),
            onShowLabel
          ]),
          h('span', {
            class: 'vxe-switch--label vxe-switch--label-off'
          }, [
            closeIcon
              ? h('i', {
                class: ['vxe-switch--label-icon', closeIcon]
              })
              : renderEmptyElement($xeSwitch),
            offShowLabel
          ]),
          h('span', {
            class: ['vxe-switch--icon']
          }, openActiveIcon || closeActiveIcon
            ? [
                h('i', {
                  class: isChecked ? openActiveIcon : closeActiveIcon
                })
              ]
            : [])
        ])
      ])
    }

    $xeSwitch.renderVN = renderVN

    return $xeSwitch
  },
  render () {
    return this.renderVN()
  }
})
