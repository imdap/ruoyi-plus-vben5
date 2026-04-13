import { h, ref, Ref, computed, reactive, inject, nextTick, watch, onMounted, onBeforeUnmount, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, getIcon, getI18n, globalEvents, GLOBAL_EVENT_KEYS, createEvent, useSize, renderEmptyElement } from '../../ui'
import { getFuncText, eqEmptyValue, isEnableConf } from '../../ui/src/utils'
import { hasClass, getEventTargetNode, hasControlKey } from '../../ui/src/dom'
import { getSlotVNs } from '../../ui/src/vn'
import { handleNumber, toFloatValueFixed } from './util'

import type { VxeNumberInputConstructor, NumberInputInternalData, VxeNumberInputEmits, VxeNumberInputPrivateComputed, NumberInputReactData, NumberInputMethods, VxeNumberInputPropTypes, InputPrivateRef, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines, ValueOf } from '../../../types'

export default defineVxeComponent({
  name: 'VxeNumberInput',
  props: {
    modelValue: [String, Number] as PropType<VxeNumberInputPropTypes.ModelValue>,
    immediate: {
      type: Boolean as PropType<VxeNumberInputPropTypes.Immediate>,
      default: true
    },
    name: String as PropType<VxeNumberInputPropTypes.Name>,
    type: {
      type: String as PropType<VxeNumberInputPropTypes.Type>,
      default: 'number'
    },
    clearable: {
      type: Boolean as PropType<VxeNumberInputPropTypes.Clearable>,
      default: () => getConfig().numberInput.clearable
    },
    readonly: {
      type: Boolean as PropType<VxeNumberInputPropTypes.Readonly>,
      default: null
    },
    disabled: {
      type: Boolean as PropType<VxeNumberInputPropTypes.Disabled>,
      default: null
    },
    placeholder: String as PropType<VxeNumberInputPropTypes.Placeholder>,
    maxLength: {
      type: [String, Number] as PropType<VxeNumberInputPropTypes.MaxLength>,
      default: () => getConfig().numberInput.maxLength
    },
    autoComplete: {
      type: String as PropType<VxeNumberInputPropTypes.AutoComplete>,
      default: 'off'
    },
    align: String as PropType<VxeNumberInputPropTypes.Align>,
    form: String as PropType<VxeNumberInputPropTypes.Form>,
    className: String as PropType<VxeNumberInputPropTypes.ClassName>,
    size: {
      type: String as PropType<VxeNumberInputPropTypes.Size>,
      default: () => getConfig().numberInput.size || getConfig().size
    },

    // number、integer、float
    min: {
      type: [String, Number] as PropType<VxeNumberInputPropTypes.Min>,
      default: null
    },
    max: {
      type: [String, Number] as PropType<VxeNumberInputPropTypes.Max>,
      default: null
    },
    step: [String, Number] as PropType<VxeNumberInputPropTypes.Step>,
    exponential: {
      type: Boolean as PropType<VxeNumberInputPropTypes.Exponential>,
      default: () => getConfig().numberInput.exponential
    },
    showCurrency: {
      type: Boolean as PropType<VxeNumberInputPropTypes.ShowCurrency>,
      default: () => getConfig().numberInput.showCurrency
    },
    currencySymbol: {
      type: String as PropType<VxeNumberInputPropTypes.CurrencySymbol>,
      default: () => getConfig().numberInput.currencySymbol
    },
    controlConfig: Object as PropType<VxeNumberInputPropTypes.ControlConfig>,

    // float
    digits: {
      type: [String, Number] as PropType<VxeNumberInputPropTypes.Digits>,
      default: null
    },
    autoFill: {
      type: Boolean as PropType<VxeNumberInputPropTypes.AutoFill>,
      default: () => getConfig().numberInput.autoFill
    },
    editable: {
      type: Boolean as PropType<VxeNumberInputPropTypes.Editable>,
      default: true
    },

    plusIcon: String as PropType<VxeNumberInputPropTypes.PlusIcon>,
    minusIcon: String as PropType<VxeNumberInputPropTypes.MinusIcon>,
    prefixIcon: String as PropType<VxeNumberInputPropTypes.PrefixIcon>,
    prefixConfig: Object as PropType<VxeNumberInputPropTypes.PrefixConfig>,
    suffixIcon: String as PropType<VxeNumberInputPropTypes.SuffixIcon>,
    suffixConfig: Object as PropType<VxeNumberInputPropTypes.SuffixConfig>,

    // 已废弃
    controls: {
      type: Boolean as PropType<VxeNumberInputPropTypes.Controls>,
      default: null
    },
    // 已废弃
    maxlength: [String, Number] as PropType<VxeNumberInputPropTypes.Maxlength>,
    // 已废弃
    autocomplete: String as PropType<VxeNumberInputPropTypes.Autocomplete>
  },
  emits: [
    'update:modelValue',
    'input',
    'change',
    'keydown',
    'keyup',
    'wheel',
    'click',
    'focus',
    'blur',
    'clear',
    'lazy-change',
    'plus-number',
    'minus-number',
    'prefix-click',
    'suffix-click',

    // 已废弃
    'prev-number',
    'next-number'
  ] as VxeNumberInputEmits,

  setup (props, context) {
    const { slots, emit } = context
    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<NumberInputReactData>({
      isFocus: false,
      isActivated: false,
      inputValue: ''
    })

    const internalData: NumberInputInternalData = {
      // dnTimeout: undefined,
      // ainTimeout: undefined,
      // isMouseDown: undefined,
      // isUM: undefined
    }

    const refElem = ref() as Ref<HTMLDivElement>
    const refInputTarget = ref() as Ref<HTMLInputElement>
    const refInputPanel = ref() as Ref<HTMLDivElement>

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

    const computeDigitsValue = computed(() => {
      const { type, digits } = props
      let defDigits: any = digits
      if (defDigits === null) {
        defDigits = getConfig().numberInput.digits
        if (defDigits === null) {
          if (type === 'amount') {
            defDigits = 2
          }
        }
      }
      return XEUtils.toInteger(defDigits) || 1
    })

    const computeControlOpts = computed(() => {
      return Object.assign({}, getConfig().numberInput.controlConfig, props.controlConfig)
    })

    const computePrefixOpts = computed(() => {
      return Object.assign({}, getConfig().numberInput.prefixConfig, props.prefixConfig)
    })

    const computeSuffixOpts = computed(() => {
      return Object.assign({}, getConfig().numberInput.suffixConfig, props.suffixConfig)
    })

    const computeDecimalsType = computed(() => {
      const { type } = props
      return type === 'float' || type === 'amount'
    })

    const computeStepValue = computed(() => {
      const { type } = props
      const digitsValue = computeDigitsValue.value
      const decimalsType = computeDecimalsType.value
      const step = props.step
      if (type === 'integer') {
        return XEUtils.toInteger(step) || 1
      } else if (decimalsType) {
        return XEUtils.toNumber(step) || (1 / Math.pow(10, digitsValue))
      }
      return XEUtils.toNumber(step) || 1
    })

    const computeIsClearable = computed(() => {
      return props.clearable
    })

    const computeInputReadonly = computed(() => {
      const { editable } = props
      const formReadonly = computeFormReadonly.value
      return formReadonly || !editable
    })

    const computeInpPlaceholder = computed(() => {
      const { placeholder } = props
      if (placeholder) {
        return getFuncText(placeholder)
      }
      const globalPlaceholder = getConfig().numberInput.placeholder
      if (globalPlaceholder) {
        return getFuncText(globalPlaceholder)
      }
      return getI18n('vxe.base.pleaseInput')
    })

    const computeInpMaxLength = computed(() => {
      const { type, maxLength, maxlength, min, max } = props
      const digitsValue = computeDigitsValue.value
      // 数值最大长度默认限制 16 位，包含小数
      const maxDefLen = 16
      if (!eqEmptyValue(min) && !eqEmptyValue(max)) {
        return `${max}`.length + (type === 'integer' ? 0 : (digitsValue + 1)) + (XEUtils.toNumber(min) >= 0 ? 0 : 1)
      }
      if (maxLength || maxlength) {
        return XEUtils.toNumber(maxLength || maxlength)
      }
      return maxDefLen
    })

    const computeInpImmediate = computed(() => {
      const { immediate } = props
      return immediate
    })

    const computeNumValue = computed(() => {
      const { type } = props
      const { inputValue } = reactData
      return type === 'integer' ? XEUtils.toInteger(handleNumber(inputValue)) : XEUtils.toNumber(handleNumber(inputValue))
    })

    const computeNumLabel = computed(() => {
      const { type, showCurrency, currencySymbol, autoFill } = props
      const { inputValue } = reactData
      const digitsValue = computeDigitsValue.value
      if (type === 'amount') {
        const num = XEUtils.toNumber(inputValue)
        let amountLabel = XEUtils.commafy(num, { digits: digitsValue })
        if (!autoFill) {
          const [iStr, dStr] = amountLabel.split('.')
          if (dStr) {
            const dRest = dStr.replace(/0+$/, '')
            amountLabel = dRest ? [iStr, '.', dRest].join('') : iStr
          }
        }
        if (showCurrency) {
          return `${currencySymbol || getI18n('vxe.numberInput.currencySymbol') || ''}${amountLabel}`
        }
        return amountLabel
      }
      return XEUtils.toString(inputValue)
    })

    const computeIsDisabledSubtractNumber = computed(() => {
      const { min } = props
      const { inputValue } = reactData
      const numValue = computeNumValue.value
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && min !== null) {
        return numValue <= XEUtils.toNumber(min)
      }
      return false
    })

    const computeIsDisabledAddNumber = computed(() => {
      const { max } = props
      const { inputValue } = reactData
      const numValue = computeNumValue.value
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && max !== null) {
        return numValue >= XEUtils.toNumber(max)
      }
      return false
    })

    const refMaps: InputPrivateRef = {
      refElem,
      refInput: refInputTarget
    }

    const computeMaps: VxeNumberInputPrivateComputed = {
      computeControlOpts
    }

    const $xeNumberInput = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeNumberInputConstructor

    let numberInputMethods = {} as NumberInputMethods

    const handleNumberString = (val: any) => {
      if (XEUtils.eqNull(val)) {
        return ''
      }
      return `${val}`
    }

    const getNumberValue = (val: any) => {
      const { exponential, autoFill } = props
      const inpMaxLength = computeInpMaxLength.value
      const digitsValue = computeDigitsValue.value
      const decimalsType = computeDecimalsType.value
      let restVal = ''
      if (decimalsType) {
        restVal = toFloatValueFixed(val, digitsValue)
        if (!autoFill) {
          restVal = handleNumberString(XEUtils.toNumber(restVal))
        }
      } else {
        restVal = handleNumberString(val)
      }
      if (exponential && (val === restVal || handleNumberString(val).toLowerCase() === XEUtils.toNumber(restVal).toExponential())) {
        return val
      }
      return restVal.slice(0, inpMaxLength)
    }

    const triggerEvent = (evnt: Event & { type: 'input' | 'change' | 'keydown' | 'keyup' | 'wheel' | 'click' | 'focus' | 'blur' }) => {
      const { inputValue } = reactData
      numberInputMethods.dispatchEvent(evnt.type, { value: inputValue }, evnt)
    }

    const handleChange = (val: number | null, inputValue: string, evnt: Event | { type: string }) => {
      const value = eqEmptyValue(val) ? null : Number(val)
      const isChange = value !== props.modelValue
      if (isChange) {
        internalData.isUM = true
        emit('update:modelValue', value)
      }
      if (reactData.inputValue !== inputValue) {
        nextTick(() => {
          reactData.inputValue = inputValue || ''
        })
      }
      numberInputMethods.dispatchEvent('input', { value }, evnt as Event)
      if (isChange) {
        numberInputMethods.dispatchEvent('change', { value }, evnt as Event)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
        }
      }
    }

    const emitInputEvent = (inputValue: any, evnt: Event) => {
      const inpImmediate = computeInpImmediate.value
      const value = eqEmptyValue(inputValue) ? null : XEUtils.toNumber(inputValue)
      reactData.inputValue = inputValue
      if (inpImmediate) {
        handleChange(value, inputValue, evnt)
      } else {
        numberInputMethods.dispatchEvent('input', { value }, evnt)
      }
    }

    const inputEvent = (evnt: Event & { type: 'input' }) => {
      const inputElem = evnt.target as HTMLInputElement
      const value = inputElem.value
      emitInputEvent(value, evnt)
    }

    const changeEvent = (evnt: Event & { type: 'change' }) => {
      const inpImmediate = computeInpImmediate.value
      if (!inpImmediate) {
        triggerEvent(evnt)
      }
      $xeNumberInput.dispatchEvent('lazy-change', { value: reactData.inputValue }, evnt)
    }

    const focusEvent = (evnt: Event & { type: 'focus' }) => {
      const inputReadonly = computeInputReadonly.value
      if (!inputReadonly) {
        const { inputValue } = reactData
        reactData.inputValue = eqEmptyValue(inputValue) ? '' : `${XEUtils.toNumber(inputValue)}`
        reactData.isFocus = true
        reactData.isActivated = true
        triggerEvent(evnt)
      }
    }

    const clickPrefixEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const { inputValue } = reactData
        numberInputMethods.dispatchEvent('prefix-click', { value: inputValue }, evnt)
      }
    }

    const clearValueEvent = (evnt: Event, value: VxeNumberInputPropTypes.ModelValue) => {
      focus()
      handleChange(null, '', evnt)
      numberInputMethods.dispatchEvent('clear', { value }, evnt)
      $xeNumberInput.dispatchEvent('lazy-change', { value }, evnt)
    }

    const clickSuffixEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const { inputValue } = reactData
        numberInputMethods.dispatchEvent('suffix-click', { value: inputValue }, evnt)
      }
    }

    const updateModel = (val: any) => {
      const { autoFill } = props
      const { inputValue } = reactData
      const digitsValue = computeDigitsValue.value
      const decimalsType = computeDecimalsType.value
      if (eqEmptyValue(val)) {
        reactData.inputValue = ''
      } else {
        let textValue = `${val}`
        if (decimalsType) {
          textValue = toFloatValueFixed(val, digitsValue)
          if (!autoFill) {
            textValue = `${XEUtils.toNumber(textValue)}`
          }
        }
        if (textValue !== inputValue) {
          reactData.inputValue = textValue
        }
      }
    }

    /**
     * 检查初始值
     */
    const initValue = () => {
      const { autoFill } = props
      const { inputValue } = reactData
      const digitsValue = computeDigitsValue.value
      const decimalsType = computeDecimalsType.value
      if (decimalsType) {
        if (inputValue) {
          let textValue = ''
          let validValue: number | null = null
          if (inputValue) {
            textValue = toFloatValueFixed(inputValue, digitsValue)
            validValue = XEUtils.toNumber(textValue)
            if (!autoFill) {
              textValue = `${validValue}`
            }
          }
          if (inputValue !== validValue) {
            handleChange(validValue, textValue, { type: 'init' })
          } else {
            reactData.inputValue = textValue
          }
        }
      }
    }

    const validMaxNum = (num: number | string) => {
      return props.max === null || props.max === '' || XEUtils.toNumber(num) <= XEUtils.toNumber(props.max)
    }

    const validMinNum = (num: number | string) => {
      return props.min === null || props.min === '' || XEUtils.toNumber(num) >= XEUtils.toNumber(props.min)
    }

    const afterCheckValue = () => {
      const { type, min, max, exponential } = props
      const { inputValue } = reactData
      const inputReadonly = computeInputReadonly.value
      if (!inputReadonly) {
        if (eqEmptyValue(inputValue)) {
          let inpNumVal = null
          let inpValue = inputValue
          if (min || min === 0) {
            inpNumVal = XEUtils.toNumber(min)
            inpValue = `${inpNumVal}`
          }
          handleChange(inpNumVal, `${inpValue || ''}`, { type: 'check' })
          return
        }
        if (inputValue || (min || max)) {
          let inpNumVal: number | string = type === 'integer' ? XEUtils.toInteger(handleNumber(inputValue)) : XEUtils.toNumber(handleNumber(inputValue))
          if (!validMinNum(inpNumVal)) {
            inpNumVal = min as number
          } else if (!validMaxNum(inpNumVal)) {
            inpNumVal = max as number
          }
          if (exponential) {
            const inpStringVal = handleNumberString(inputValue).toLowerCase()
            if (inpStringVal === XEUtils.toNumber(inpNumVal).toExponential()) {
              inpNumVal = inpStringVal
            }
          }
          const inpValue = getNumberValue(inpNumVal)
          handleChange(eqEmptyValue(inpValue) ? null : Number(inpValue), inpValue, { type: 'check' })
        }
      }
    }

    const blurEvent = (evnt: Event & { type: 'blur' }) => {
      const { inputValue } = reactData
      const inpImmediate = computeInpImmediate.value
      const value = inputValue ? Number(inputValue) : null
      if (!inpImmediate) {
        handleChange(value, handleNumberString(inputValue), evnt)
      }
      afterCheckValue()
      reactData.isFocus = false
      reactData.isActivated = false
      numberInputMethods.dispatchEvent('blur', { value }, evnt)
      // 自动更新校验状态
      if ($xeForm && formItemInfo) {
        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
      }
    }

    // 数值
    const numberChange = (isPlus: boolean, evnt: Event) => {
      const { min, max, type } = props
      const { inputValue } = reactData
      const stepValue = computeStepValue.value
      const numValue = type === 'integer' ? XEUtils.toInteger(handleNumber(inputValue)) : XEUtils.toNumber(handleNumber(inputValue))
      const newValue = isPlus ? XEUtils.add(numValue, stepValue) : XEUtils.subtract(numValue, stepValue)
      let restNum: number | string
      if (!validMinNum(newValue)) {
        restNum = min as number
      } else if (!validMaxNum(newValue)) {
        restNum = max as number
      } else {
        restNum = newValue
      }
      emitInputEvent(getNumberValue(restNum), evnt as (Event & { type: 'input' }))
    }

    const numberPlusEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      const formReadonly = computeFormReadonly.value
      const isDisabledAddNumber = computeIsDisabledAddNumber.value
      if (!isDisabled && !formReadonly && !isDisabledAddNumber) {
        numberChange(true, evnt)
      }
      reactData.isActivated = true
      numberInputMethods.dispatchEvent('plus-number', { value: reactData.inputValue }, evnt)
      $xeNumberInput.dispatchEvent('lazy-change', { value: reactData.inputValue }, evnt)
      // 已废弃
      numberInputMethods.dispatchEvent('next-number', { value: reactData.inputValue }, evnt)
    }

    const numberMinusEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      const formReadonly = computeFormReadonly.value
      const isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value
      if (!isDisabled && !formReadonly && !isDisabledSubtractNumber) {
        numberChange(false, evnt)
      }
      reactData.isActivated = true
      numberInputMethods.dispatchEvent('minus-number', { value: reactData.inputValue }, evnt)
      $xeNumberInput.dispatchEvent('lazy-change', { value: reactData.inputValue }, evnt)
      // 已废弃
      numberInputMethods.dispatchEvent('prev-number', { value: reactData.inputValue }, evnt)
    }

    const numberKeydownEvent = (evnt: KeyboardEvent) => {
      const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
      const isDwArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
      if (isUpArrow || isDwArrow) {
        evnt.preventDefault()
        if (isUpArrow) {
          numberPlusEvent(evnt)
        } else {
          numberMinusEvent(evnt)
        }
      }
    }

    const keydownEvent = (evnt: KeyboardEvent & { type: 'keydown' }) => {
      const { type, exponential, controls } = props
      const controlOpts = computeControlOpts.value
      const { isArrow } = controlOpts
      const inputReadonly = computeInputReadonly.value
      const isControlKey = hasControlKey(evnt)
      const isShiftKey = evnt.shiftKey
      const isAltKey = evnt.altKey
      const keyCode = evnt.keyCode
      const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
      const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
      const isDwArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
      if (!isControlKey && !isShiftKey && !isAltKey) {
        if (globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.SPACEBAR) || (type === 'integer' && keyCode === 110) || ((!exponential || keyCode !== 69) && (keyCode >= 65 && keyCode <= 90)) || (keyCode >= 186 && keyCode <= 188) || keyCode >= 191) {
          evnt.preventDefault()
        }
      }
      if (isEsc) {
        afterCheckValue()
      } else if (isUpArrow || isDwArrow) {
        if (isEnableConf(controlOpts) && (controls === false ? controls : isArrow) && !inputReadonly) {
          numberKeydownEvent(evnt)
        }
      }
      triggerEvent(evnt)
    }

    const keyupEvent = (evnt: KeyboardEvent & { type: 'keyup' }) => {
      triggerEvent(evnt)
    }

    // 数值
    const stopDown = () => {
      const { dnTimeout } = internalData
      if (dnTimeout) {
        clearTimeout(dnTimeout)
        internalData.dnTimeout = undefined
      }
    }

    const stopAutoIncrement = () => {
      const { ainTimeout } = internalData
      if (ainTimeout) {
        clearTimeout(ainTimeout)
        internalData.ainTimeout = undefined
      }
    }

    const numberDownMinusEvent = (evnt: Event) => {
      numberStopAll()
      internalData.ainTimeout = setTimeout(() => {
        numberMinusEvent(evnt)
        numberDownMinusEvent(evnt)
      }, 60)
    }

    const numberDownPlusEvent = (evnt: Event) => {
      numberStopAll()
      internalData.ainTimeout = setTimeout(() => {
        numberPlusEvent(evnt)
        numberDownPlusEvent(evnt)
      }, 60)
    }

    const numberStopAll = () => {
      stopDown()
      stopAutoIncrement()
    }

    const numberClickEvent = (evnt: MouseEvent) => {
      if (internalData.isMouseDown) {
        internalData.isMouseDown = false
      } else {
        numberStopAll()
        const isAddNumber = hasClass(evnt.currentTarget, 'is--plus')
        if (isAddNumber) {
          numberPlusEvent(evnt)
        } else {
          numberMinusEvent(evnt)
        }
      }
    }

    const numberMousedownEvent = (evnt: MouseEvent) => {
      numberStopAll()
      internalData.isMouseDown = true
      if (evnt.button === 0) {
        const isAddNumber = hasClass(evnt.currentTarget, 'is--plus')
        if (isAddNumber) {
          numberPlusEvent(evnt)
        } else {
          numberMinusEvent(evnt)
        }
        internalData.dnTimeout = setTimeout(() => {
          if (isAddNumber) {
            numberDownPlusEvent(evnt)
          } else {
            numberDownMinusEvent(evnt)
          }
        }, 500)
      }
    }

    const wheelEvent = (evnt: WheelEvent) => {
      const { controls } = props
      const controlOpts = computeControlOpts.value
      const { isWheel } = controlOpts
      const inputReadonly = computeInputReadonly.value
      if (isEnableConf(controlOpts) && (controls === false ? controls : isWheel) && !inputReadonly) {
        if (reactData.isActivated) {
          evnt.stopPropagation()
          evnt.preventDefault()
          const delta = evnt.deltaY
          if (delta > 0) {
            // 向下
            numberMinusEvent(evnt)
          } else if (delta < 0) {
            // 向上
            numberPlusEvent(evnt)
          }
        }
      }
      triggerEvent(evnt as WheelEvent & { type: 'wheel' })
    }

    const clickEvent = (evnt: Event & { type: 'click' }) => {
      triggerEvent(evnt)
    }

    // 全局事件
    const handleGlobalMousedownEvent = (evnt: Event) => {
      const { isActivated } = reactData
      const el = refElem.value
      const panelElem = refInputPanel.value
      const isDisabled = computeIsDisabled.value
      const inputReadonly = computeInputReadonly.value
      const inpImmediate = computeInpImmediate.value
      if (!isDisabled && !inputReadonly && isActivated) {
        reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelElem).flag
        if (!reactData.isActivated) {
          if (!inpImmediate) {
            const { inputValue } = reactData
            const value = inputValue ? Number(inputValue) : null
            handleChange(value, handleNumberString(inputValue), evnt)
          }
          afterCheckValue()
        }
      }
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const { clearable } = props
      const isDisabled = computeIsDisabled.value
      const inputReadonly = computeInputReadonly.value
      if (!isDisabled && !inputReadonly) {
        const isTab = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.TAB)
        const isDel = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.DELETE)
        let isActivated = reactData.isActivated
        if (isTab) {
          if (isActivated) {
            afterCheckValue()
          }
          isActivated = false
          reactData.isActivated = isActivated
        }
        if (isDel && clearable) {
          if (isActivated) {
            clearValueEvent(evnt, null)
          }
        }
      }
    }

    const handleGlobalBlurEvent = () => {
      const { isActivated } = reactData
      if (isActivated) {
        afterCheckValue()
      }
    }

    const dispatchEvent = (type: ValueOf<VxeNumberInputEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $numberInput: $xeNumberInput }, params))
    }

    numberInputMethods = {
      dispatchEvent,

      focus () {
        const inputReadonly = computeInputReadonly.value
        if (!inputReadonly) {
          const inputElem = refInputTarget.value
          reactData.isActivated = true
          inputElem.focus()
        }
        return nextTick()
      },
      blur () {
        const inputElem = refInputTarget.value
        inputElem.blur()
        reactData.isActivated = false
        return nextTick()
      },
      select () {
        const inputElem = refInputTarget.value
        inputElem.select()
        reactData.isActivated = false
        return nextTick()
      }
    }

    Object.assign($xeNumberInput, numberInputMethods)

    const renderPrefixIcon = () => {
      const { prefixIcon } = props
      const prefixOpts = computePrefixOpts.value
      const prefixSlot = slots.prefix
      const preIcon = prefixIcon || prefixOpts.icon
      const sufContent = prefixOpts.content
      return prefixSlot || preIcon || sufContent
        ? h('div', {
          class: 'vxe-number-input--prefix',
          onClick: clickPrefixEvent
        }, [
          h('div', {
            class: 'vxe-number-input--prefix-icon'
          }, prefixSlot
            ? getSlotVNs(prefixSlot({}))
            : [
                preIcon
                  ? h('i', {
                    class: preIcon
                  })
                  : renderEmptyElement($xeNumberInput),
                sufContent
                  ? h('span', {
                    class: 'vxe-prefix-input--suffix-text'
                  }, `${sufContent}`)
                  : renderEmptyElement($xeNumberInput)
              ])
        ])
        : renderEmptyElement($xeNumberInput)
    }

    const renderSuffixIcon = () => {
      const { suffixIcon } = props
      const { inputValue } = reactData
      const suffixSlot = slots.suffix
      const suffixOpts = computeSuffixOpts.value
      const isDisabled = computeIsDisabled.value
      const isClearable = computeIsClearable.value
      const sufIcon = suffixIcon || suffixOpts.icon
      const sufContent = suffixOpts.content
      return h('div', {
        class: ['vxe-number-input--suffix', {
          'is--clear': isClearable && !isDisabled && !(inputValue === '' || XEUtils.eqNull(inputValue))
        }]
      }, [
        isClearable
          ? h('div', {
            class: 'vxe-number-input--clear-icon',
            onClick: clearValueEvent
          }, [
            h('i', {
              class: getIcon().INPUT_CLEAR
            })
          ])
          : renderEmptyElement($xeNumberInput),
        suffixSlot || sufIcon || sufContent
          ? h('div', {
            class: 'vxe-number-input--suffix-icon',
            onClick: clickSuffixEvent
          }, suffixSlot
            ? getSlotVNs(suffixSlot({}))
            : [
                sufIcon
                  ? h('i', {
                    class: sufIcon
                  })
                  : renderEmptyElement($xeNumberInput),
                sufContent
                  ? h('span', {
                    class: 'vxe-number-input--suffix-text'
                  }, `${sufContent}`)
                  : renderEmptyElement($xeNumberInput)
              ])
          : renderEmptyElement($xeNumberInput)
      ])
    }

    const renderInput = () => {
      const { type, name, autocomplete, autoComplete } = props
      const { inputValue, isFocus } = reactData
      const isDisabled = computeIsDisabled.value
      const numLabel = computeNumLabel.value
      const inputReadonly = computeInputReadonly.value
      const inpMaxLength = computeInpMaxLength.value
      const inpPlaceholder = computeInpPlaceholder.value
      return h('div', {
        key: 'ni',
        class: 'vxe-number-input--input-wrapper'
      }, [
        renderPrefixIcon(),
        h('div', {
          class: 'vxe-number-input--input-inner'
        }, [
          h('input', {
            ref: refInputTarget,
            class: 'vxe-number-input--input',
            value: !isFocus && type === 'amount' ? numLabel : inputValue,
            name,
            type: 'text',
            placeholder: inpPlaceholder,
            maxlength: inpMaxLength,
            readonly: inputReadonly,
            disabled: isDisabled,
            autocomplete: autoComplete || autocomplete,
            onKeydown: keydownEvent,
            onKeyup: keyupEvent,
            onClick: clickEvent,
            onInput: inputEvent,
            onChange: changeEvent,
            onFocus: focusEvent,
            onBlur: blurEvent
          })
        ]),
        renderSuffixIcon()
      ])
    }

    const renderMinusBtn = () => {
      const { minusIcon } = props
      const isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value
      return h('button', {
        key: 'prev',
        class: ['vxe-number-input--minus-btn is--minus', {
          'is--disabled': isDisabledSubtractNumber
        }],
        type: 'button',
        onClick: numberClickEvent,
        onMousedown: numberMousedownEvent,
        onMouseup: numberStopAll,
        onMouseleave: numberStopAll
      }, [
        h('i', {
          class: minusIcon || getIcon().NUMBER_INPUT_MINUS_NUM
        })
      ])
    }

    const renderPlusBtn = () => {
      const { plusIcon } = props
      const isDisabledAddNumber = computeIsDisabledAddNumber.value
      return h('button', {
        key: 'next',
        class: ['vxe-number-input--plus-btn is--plus', {
          'is--disabled': isDisabledAddNumber
        }],
        type: 'button',
        onClick: numberClickEvent,
        onMousedown: numberMousedownEvent,
        onMouseup: numberStopAll,
        onMouseleave: numberStopAll
      }, [
        h('i', {
          class: plusIcon || getIcon().NUMBER_INPUT_PLUS_NUM
        })
      ])
    }

    const renderSideControl = () => {
      return h('div', {
        key: 'cplr',
        class: 'vxe-number-input--side-control'
      }, [
        renderPlusBtn(),
        renderMinusBtn()
      ])
    }

    const renderVN = () => {
      const { className, controls, type, align, prefixIcon, suffixIcon } = props
      const { inputValue, isActivated } = reactData
      const vSize = computeSize.value
      const controlOpts = computeControlOpts.value
      const { layout, showButton } = controlOpts
      const isDisabled = computeIsDisabled.value
      const formReadonly = computeFormReadonly.value
      const numLabel = computeNumLabel.value
      const prefixSlot = slots.prefix
      const suffixSlot = slots.suffix
      if (formReadonly) {
        return h('div', {
          ref: refElem,
          class: ['vxe-number-input--readonly', `type--${type}`, className]
        }, numLabel)
      }
      const inputReadonly = computeInputReadonly.value
      const isClearable = computeIsClearable.value
      const isControls = isEnableConf(controlOpts) && (controls === false ? controls : showButton)
      return h('div', {
        ref: refElem,
        class: ['vxe-number-input', `type--${type}`, `ctl--${layout === 'right' || layout === 'left' ? layout : 'default'}`, className, {
          [`size--${vSize}`]: vSize,
          [`is--${align}`]: align,
          'is--controls': isControls && !inputReadonly,
          'is--prefix': !!prefixSlot || prefixIcon,
          'is--suffix': !!suffixSlot || suffixIcon,
          'is--disabled': isDisabled,
          'is--active': isActivated,
          'show--clear': isClearable && !isDisabled && !(inputValue === '' || XEUtils.eqNull(inputValue))
        }],
        spellcheck: false
      }, isControls
        ? (layout === 'right'
            ? [
                renderInput(),
                renderSideControl()
              ]
            : (layout === 'left'
                ? [
                    renderSideControl(),
                    renderInput()
                  ]
                : [
                    renderMinusBtn(),
                    renderInput(),
                    renderPlusBtn()
                  ]))
        : [
            renderInput()
          ])
    }

    $xeNumberInput.renderVN = renderVN

    watch(() => props.modelValue, (val) => {
      if (!internalData.isUM) {
        updateModel(val)
      }
      internalData.isUM = false
    })

    watch(() => props.type, () => {
      // 切换类型是重置内置变量
      Object.assign(reactData, {
        inputValue: props.modelValue
      })
      initValue()
    })

    onMounted(() => {
      updateModel(props.modelValue)
      const targetElem = refInputTarget.value
      if (targetElem) {
        targetElem.addEventListener('wheel', wheelEvent, { passive: false })
      }
      globalEvents.on($xeNumberInput, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeNumberInput, 'keydown', handleGlobalKeydownEvent)
      globalEvents.on($xeNumberInput, 'blur', handleGlobalBlurEvent)
    })

    onBeforeUnmount(() => {
      reactData.isFocus = false
      numberStopAll()
      afterCheckValue()
      const targetElem = refInputTarget.value
      if (targetElem) {
        targetElem.removeEventListener('wheel', wheelEvent)
      }
      globalEvents.off($xeNumberInput, 'mousedown')
      globalEvents.off($xeNumberInput, 'keydown')
      globalEvents.off($xeNumberInput, 'blur')
    })

    initValue()

    return $xeNumberInput
  },
  render () {
    return this.renderVN()
  }
})
