import { h, Teleport, ref, Ref, computed, provide, reactive, inject, nextTick, watch, PropType, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, getIcon, getI18n, commands, createEvent, globalEvents, GLOBAL_EVENT_KEYS, useSize, renderEmptyElement } from '../../ui'
import { getFuncText, getLastZIndex, nextZIndex, isEnableConf } from '../../ui/src/utils'
import { updatePanelPlacement, getEventTargetNode } from '../../ui/src/dom'
import { getSlotVNs } from '../../ui/src/vn'
import { parseDateObj, parseDateValue, getDateByCode, handleValueFormat, hasDateValueType, hasTimestampValueType } from '../../date-panel/src/util'
import { errLog } from '../../ui/src/log'
import VxeDatePanelComponent from '../../date-panel/src/date-panel'
import VxeButtonComponent from '../../button/src/button'
import VxeButtonGroupComponent from '../../button/src/button-group'

import type { VxeDatePickerConstructor, VxeDatePickerEmits, DatePickerInternalData, DatePickerReactData, DatePickerMethods, VxeDatePickerPropTypes, DatePickerPrivateRef, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines, ValueOf, VxeModalConstructor, VxeDrawerConstructor, VxeModalMethods, VxeDrawerMethods, VxeDatePickerDefines, VxeButtonGroupEvents, VxeDatePanelConstructor } from '../../../types'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types/components/table'

export default defineVxeComponent({
  name: 'VxeDatePicker',
  props: {
    modelValue: [String, Number, Date] as PropType<VxeDatePickerPropTypes.ModelValue>,
    immediate: {
      type: Boolean as PropType<VxeDatePickerPropTypes.Immediate>,
      default: true
    },
    name: String as PropType<VxeDatePickerPropTypes.Name>,
    type: {
      type: String as PropType<VxeDatePickerPropTypes.Type>,
      default: 'date'
    },
    clearable: {
      type: Boolean as PropType<VxeDatePickerPropTypes.Clearable>,
      default: () => getConfig().datePicker.clearable
    },
    readonly: {
      type: Boolean as PropType<VxeDatePickerPropTypes.Readonly>,
      default: null
    },
    disabled: {
      type: Boolean as PropType<VxeDatePickerPropTypes.Disabled>,
      default: null
    },
    placeholder: String as PropType<VxeDatePickerPropTypes.Placeholder>,
    autoComplete: {
      type: String as PropType<VxeDatePickerPropTypes.AutoComplete>,
      default: 'off'
    },
    form: String as PropType<VxeDatePickerPropTypes.Form>,
    className: String as PropType<VxeDatePickerPropTypes.ClassName>,
    zIndex: Number as PropType<VxeDatePickerPropTypes.ZIndex>,
    size: {
      type: String as PropType<VxeDatePickerPropTypes.Size>,
      default: () => getConfig().datePicker.size || getConfig().size
    },
    multiple: Boolean as PropType<VxeDatePickerPropTypes.Multiple>,
    limitCount: {
      type: [String, Number] as PropType<VxeDatePickerPropTypes.LimitCount>,
      default: () => getConfig().datePicker.limitCount
    },

    // date、week、month、quarter、year
    startDate: {
      type: [String, Number, Date] as PropType<VxeDatePickerPropTypes.StartDate>,
      default: () => getConfig().datePicker.startDate
    },
    endDate: {
      type: [String, Number, Date] as PropType<VxeDatePickerPropTypes.EndDate>,
      default: () => getConfig().datePicker.endDate
    },
    defaultDate: [String, Number, Date] as PropType<VxeDatePickerPropTypes.DefaultDate>,
    defaultTime: [String, Number, Date] as PropType<VxeDatePickerPropTypes.DefaultTime>,
    minDate: [String, Number, Date] as PropType<VxeDatePickerPropTypes.MinDate>,
    maxDate: [String, Number, Date] as PropType<VxeDatePickerPropTypes.MaxDate>,
    startDay: {
      type: [String, Number] as PropType<VxeDatePickerPropTypes.StartDay>,
      default: () => getConfig().datePicker.startDay
    },
    labelFormat: String as PropType<VxeDatePickerPropTypes.LabelFormat>,
    valueFormat: String as PropType<VxeDatePickerPropTypes.ValueFormat>,
    timeFormat: String as PropType<VxeDatePickerPropTypes.TimeFormat>,
    editable: {
      type: Boolean as PropType<VxeDatePickerPropTypes.Editable>,
      default: true
    },
    festivalMethod: {
      type: Function as PropType<VxeDatePickerPropTypes.FestivalMethod>,
      default: () => getConfig().datePicker.festivalMethod
    },
    disabledMethod: {
      type: Function as PropType<VxeDatePickerPropTypes.DisabledMethod>,
      default: () => getConfig().datePicker.disabledMethod
    },

    // week
    selectDay: {
      type: [String, Number] as PropType<VxeDatePickerPropTypes.SelectDay>,
      default: () => getConfig().datePicker.selectDay
    },
    showClearButton: {
      type: Boolean as PropType<VxeDatePickerPropTypes.ShowClearButton>,
      default: () => getConfig().datePicker.showClearButton
    },
    showConfirmButton: {
      type: Boolean as PropType<VxeDatePickerPropTypes.ShowConfirmButton>,
      default: () => getConfig().datePicker.showConfirmButton
    },
    autoClose: {
      type: Boolean as PropType<VxeDatePickerPropTypes.AutoClose>,
      default: () => getConfig().datePicker.autoClose
    },

    prefixIcon: String as PropType<VxeDatePickerPropTypes.PrefixIcon>,
    suffixIcon: String as PropType<VxeDatePickerPropTypes.SuffixIcon>,
    placement: String as PropType<VxeDatePickerPropTypes.Placement>,
    transfer: {
      type: Boolean as PropType<VxeDatePickerPropTypes.Transfer>,
      default: null
    },

    timeConfig: Object as PropType<VxeDatePickerPropTypes.TimeConfig>,
    popupConfig: Object as PropType<VxeDatePickerPropTypes.PopupConfig>,
    shortcutConfig: Object as PropType<VxeDatePickerPropTypes.ShortcutConfig>,

    // 已废弃 startWeek，被 startDay 替换
    startWeek: Number as PropType<VxeDatePickerPropTypes.StartDay>
  },
  emits: [
    'update:modelValue',
    'input',
    'change',
    'keydown',
    'keyup',
    'click',
    'focus',
    'blur',
    'clear',
    'confirm',
    'prefix-click',
    'suffix-click',
    'date-prev',
    'date-today',
    'date-next',
    'shortcut-click'
  ] as VxeDatePickerEmits,
  setup (props, context) {
    const { slots, emit } = context

    const $xeModal = inject<(VxeModalConstructor & VxeModalMethods) | null>('$xeModal', null)
    const $xeDrawer = inject<(VxeDrawerConstructor & VxeDrawerMethods) | null>('$xeDrawer', null)
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)
    const $xeForm = inject<(VxeFormConstructor & VxeFormPrivateMethods) | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<DatePickerReactData>({
      initialized: false,
      panelIndex: 0,
      visiblePanel: false,
      isAniVisible: false,
      panelStyle: {},
      panelPlacement: '',
      isActivated: false,
      inputValue: '',
      inputLabel: ''
    })

    const internalData: DatePickerInternalData = {
      hpTimeout: undefined
    }

    const refElem = ref() as Ref<HTMLDivElement>
    const refInputTarget = ref() as Ref<HTMLInputElement>
    const refInputPanel = ref<HTMLDivElement>()
    const refPanelWrapper = ref<HTMLDivElement>()

    const refDatePanel = ref<VxeDatePanelConstructor>()

    const refMaps: DatePickerPrivateRef = {
      refElem,
      refInput: refInputTarget
    }

    const $xeDatePicker = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    } as unknown as VxeDatePickerConstructor

    const computeBtnTransfer = computed(() => {
      const { transfer } = props
      const popupOpts = computePopupOpts.value
      if (XEUtils.isBoolean(popupOpts.transfer)) {
        return popupOpts.transfer
      }
      if (transfer === null) {
        const globalTransfer = getConfig().datePicker.transfer
        if (XEUtils.isBoolean(globalTransfer)) {
          return globalTransfer
        }
        if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
          return true
        }
      }
      return transfer
    })

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

    const computeIsDateTimeType = computed(() => {
      const { type } = props
      return type === 'time' || type === 'datetime'
    })

    const computeIsDatePickerType = computed(() => {
      const isDateTimeType = computeIsDateTimeType.value
      return isDateTimeType || ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1
    })

    const computeIsClearable = computed(() => {
      return props.clearable
    })

    const computeInputReadonly = computed(() => {
      const { type, editable, multiple } = props
      const formReadonly = computeFormReadonly.value
      return formReadonly || multiple || !editable || type === 'week' || type === 'quarter'
    })

    const computeInpPlaceholder = computed(() => {
      const { placeholder } = props
      if (placeholder) {
        return getFuncText(placeholder)
      }
      const globalPlaceholder = getConfig().datePicker.placeholder
      if (globalPlaceholder) {
        return getFuncText(globalPlaceholder)
      }
      return getI18n('vxe.base.pleaseSelect')
    })

    const computeInpImmediate = computed(() => {
      const { immediate } = props
      return immediate
    })

    const computeTimeOpts = computed(() => {
      return Object.assign({}, getConfig().datePicker.timeConfig, props.timeConfig)
    })

    const computePopupOpts = computed(() => {
      return Object.assign({}, getConfig().datePicker.popupConfig, props.popupConfig)
    })

    const computeShortcutOpts = computed(() => {
      return Object.assign({}, getConfig().datePicker.shortcutConfig, props.shortcutConfig)
    })

    const computeShortcutList = computed(() => {
      const shortcutOpts = computeShortcutOpts.value
      const { options } = shortcutOpts
      if (options) {
        return options.map((option, index) => {
          return Object.assign({
            name: `${option.name || option.code || index}`
          }, option)
        })
      }
      return []
    })

    const computeDateLabelFormat = computed(() => {
      const { labelFormat } = props
      return labelFormat || getI18n(`vxe.input.date.labelFormat.${props.type}`)
    })

    const computeDateValueFormat = computed(() => {
      const { type, valueFormat } = props
      return handleValueFormat(type, valueFormat)
    })

    const computeFirstDayOfWeek = computed(() => {
      const { startDay } = props
      return XEUtils.toNumber(startDay) as VxeDatePickerPropTypes.StartDay
    })

    const computePanelLabel = computed(() => {
      const { type, multiple } = props
      const { inputValue } = reactData
      const dateLabelFormat = computeDateLabelFormat.value
      const dateValueFormat = computeDateValueFormat.value
      const firstDayOfWeek = computeFirstDayOfWeek.value
      const vals: string[] = inputValue ? (multiple ? inputValue.split(',') : [inputValue]) : []
      return vals.map(val => {
        const dateObj = parseDateObj(val, type, {
          valueFormat: dateValueFormat,
          labelFormat: dateLabelFormat,
          firstDay: firstDayOfWeek
        })
        return dateObj.label
      }).join(', ')
    })

    const updateModelValue = () => {
      const { modelValue } = props
      let val: any = ''
      if (modelValue) {
        if (XEUtils.isNumber(modelValue) && /^[0-9]{11,15}$/.test(`${modelValue}`)) {
          val = new Date(modelValue)
        } else {
          val = modelValue
        }
      }
      reactData.inputValue = val
    }

    const triggerEvent = (evnt: Event & { type: 'input' | 'change' | 'keydown' | 'keyup' | 'click' | 'focus' | 'blur' }) => {
      const { inputValue } = reactData
      dispatchEvent(evnt.type, { value: inputValue }, evnt)
    }

    const handleChange = (value: string | number | Date, evnt: Event | { type: string }) => {
      const { type, modelValue, valueFormat } = props
      const dateValueFormat = computeDateValueFormat.value
      reactData.inputValue = value
      if (hasTimestampValueType(valueFormat)) {
        const dateVal = parseDateValue(value, type, { valueFormat: dateValueFormat })
        const timeNum = dateVal ? dateVal.getTime() : null
        emit('update:modelValue', timeNum)
        if (modelValue !== timeNum) {
          dispatchEvent('change', { value: timeNum }, evnt as Event)
          // 自动更新校验状态
          if ($xeForm && formItemInfo) {
            $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, timeNum)
          }
        }
      } else if (hasDateValueType(valueFormat)) {
        const dateVal = parseDateValue(value, type, { valueFormat: dateValueFormat })
        emit('update:modelValue', dateVal)
        if (modelValue && dateVal ? XEUtils.toStringDate(modelValue).getTime() !== dateVal.getTime() : modelValue !== dateVal) {
          dispatchEvent('change', { value: dateVal }, evnt as Event)
          // 自动更新校验状态
          if ($xeForm && formItemInfo) {
            $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, dateVal)
          }
        }
      } else {
        emit('update:modelValue', value)
        if (XEUtils.toValueString(modelValue) !== value) {
          dispatchEvent('change', { value }, evnt as Event)
          // 自动更新校验状态
          if ($xeForm && formItemInfo) {
            $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
          }
        }
      }
    }

    const inputEvent = (evnt: Event & { type: 'input' }) => {
      const inputElem = evnt.target as HTMLInputElement
      const value = inputElem.value
      reactData.inputLabel = value
      dispatchEvent('input', { value }, evnt)
    }

    const changeEvent = (evnt: Event & { type: 'change' }) => {
      const inpImmediate = computeInpImmediate.value
      if (!inpImmediate) {
        triggerEvent(evnt)
      }
    }

    const focusEvent = (evnt: Event & { type: 'focus' }) => {
      reactData.isActivated = true
      const isDatePickerType = computeIsDatePickerType.value
      if (isDatePickerType) {
        datePickerOpenEvent(evnt)
      }
      triggerEvent(evnt)
    }

    const clickPrefixEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const { inputValue } = reactData
        dispatchEvent('prefix-click', { value: inputValue }, evnt)
      }
    }

    const hidePanel = () => {
      return new Promise<void>(resolve => {
        reactData.visiblePanel = false
        internalData.hpTimeout = setTimeout(() => {
          reactData.isAniVisible = false
          resolve()
        }, 350)
      })
    }

    const clearValueEvent = (evnt: Event, value: VxeDatePickerPropTypes.ModelValue) => {
      const isDatePickerType = computeIsDatePickerType.value
      if (isDatePickerType) {
        hidePanel()
      }
      handleChange('', evnt)
      dispatchEvent('clear', { value }, evnt)
    }

    const clickSuffixEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const { inputValue } = reactData
        dispatchEvent('suffix-click', { value: inputValue }, evnt)
      }
    }

    const blurEvent = (evnt: Event & { type: 'blur' }) => {
      const $datePanel = refDatePanel.value
      const { inputValue } = reactData
      const inpImmediate = computeInpImmediate.value
      const value = inputValue
      if (!inpImmediate) {
        handleChange(value, evnt)
      }
      if (!reactData.visiblePanel) {
        reactData.isActivated = false
        // 未打开面板时才校验
        if ($datePanel) {
          $datePanel.checkValue(reactData.inputLabel)
        }
      }
      dispatchEvent('blur', { value }, evnt)
      // 自动更新校验状态
      if ($xeForm && formItemInfo) {
        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
      }
    }

    const keydownEvent = (evnt: KeyboardEvent & { type: 'keydown' }) => {
      triggerEvent(evnt)
    }

    const keyupEvent = (evnt: KeyboardEvent & { type: 'keyup' }) => {
      triggerEvent(evnt)
    }

    const confirmEvent = (evnt: MouseEvent) => {
      const $datePanel = refDatePanel.value
      if ($datePanel) {
        $datePanel.confirmByEvent(evnt)
      }
      hidePanel()
    }

    const panelChangeEvent = (params: VxeDatePickerDefines.ChangeEventParams) => {
      const { multiple, autoClose } = props
      const { value, $event } = params
      const isDateTimeType = computeIsDateTimeType.value
      handleChange(value, $event)
      if (!multiple && !isDateTimeType) {
        if (autoClose) {
          hidePanel()
        }
      }
    }

    const panelConfirmEvent = (params: VxeDatePickerDefines.ConfirmEventParams) => {
      dispatchEvent('confirm', params, params.$event)
    }

    // 全局事件
    const handleGlobalMousedownEvent = (evnt: Event) => {
      const $datePanel = refDatePanel.value
      const { visiblePanel, isActivated } = reactData
      const el = refElem.value
      const panelWrapperElem = refPanelWrapper.value
      const isDisabled = computeIsDisabled.value
      if (!isDisabled && isActivated) {
        reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelWrapperElem).flag
        if (!reactData.isActivated) {
          if (visiblePanel) {
            hidePanel()
            if ($datePanel) {
              $datePanel.checkValue(reactData.inputLabel)
            }
          }
        }
      }
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const { visiblePanel } = reactData
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const isTab = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.TAB)
        const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
        if (isTab) {
          reactData.isActivated = false
        }
        if (visiblePanel) {
          if (isEsc || isTab) {
            hidePanel()
          }
        }
      }
    }

    const handleGlobalMousewheelEvent = (evnt: Event) => {
      const { visiblePanel } = reactData
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        if (visiblePanel) {
          const panelWrapperElem = refPanelWrapper.value
          if (getEventTargetNode(evnt, panelWrapperElem).flag) {
            updatePlacement()
          } else {
            hidePanel()
          }
        }
      }
    }

    const handleGlobalBlurEvent = () => {
      const $datePanel = refDatePanel.value
      const { isActivated, visiblePanel } = reactData
      if (visiblePanel) {
        hidePanel()
      }
      if (isActivated) {
        reactData.isActivated = false
      }
      if (visiblePanel || isActivated) {
        if ($datePanel) {
          $datePanel.checkValue(reactData.inputLabel)
        }
        const targetElem = refInputTarget.value
        if (targetElem) {
          targetElem.blur()
        }
      }
    }

    const handleGlobalResizeEvent = () => {
      const { visiblePanel } = reactData
      if (visiblePanel) {
        updatePlacement()
      }
    }

    // 弹出面板
    const updateZindex = () => {
      const popupOpts = computePopupOpts.value
      const customZIndex = popupOpts.zIndex || props.zIndex
      if (customZIndex) {
        reactData.panelIndex = XEUtils.toNumber(customZIndex)
      } else if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex()
      }
    }

    const updatePlacement = () => {
      const { placement } = props
      const { panelIndex } = reactData
      const targetElem = refInputTarget.value
      const panelElem = refInputPanel.value
      const btnTransfer = computeBtnTransfer.value
      const popupOpts = computePopupOpts.value
      const handleStyle = () => {
        const ppObj = updatePanelPlacement(targetElem, panelElem, {
          placement: popupOpts.placement || placement,
          defaultPlacement: popupOpts.defaultPlacement,
          teleportTo: btnTransfer
        })
        const panelStyle: { [key: string]: string | number } = Object.assign(ppObj.style, {
          zIndex: panelIndex
        })
        reactData.panelStyle = panelStyle
        reactData.panelPlacement = ppObj.placement
      }
      handleStyle()
      return nextTick().then(handleStyle)
    }

    const showPanel = () => {
      const { visiblePanel } = reactData
      const isDisabled = computeIsDisabled.value
      if (!isDisabled && !visiblePanel) {
        if (!reactData.initialized) {
          reactData.initialized = true
        }
        if (internalData.hpTimeout) {
          clearTimeout(internalData.hpTimeout)
          internalData.hpTimeout = undefined
        }
        reactData.isActivated = true
        reactData.isAniVisible = true
        setTimeout(() => {
          reactData.visiblePanel = true
          updatePlacement()
        }, 10)
        updateZindex()
        return updatePlacement()
      }
      return nextTick()
    }

    const datePickerOpenEvent = (evnt: Event) => {
      const formReadonly = computeFormReadonly.value
      if (!formReadonly) {
        evnt.preventDefault()
        showPanel()
      }
    }

    const clickEvent = (evnt: Event & { type: 'click' }) => {
      triggerEvent(evnt)
    }

    const handleShortcutEvent: VxeButtonGroupEvents.Click = ({ option, $event }) => {
      const { type } = props
      const { inputValue } = reactData
      const shortcutOpts = computeShortcutOpts.value
      const { autoClose } = shortcutOpts
      const { code, clickMethod } = option as VxeDatePickerDefines.ShortcutOption
      let value = inputValue
      const shortcutParams = {
        $datePicker: $xeDatePicker,
        option,
        value,
        code
      }
      if (!clickMethod && code) {
        const gCommandOpts = commands.get(code)
        const dpCommandMethod = gCommandOpts ? gCommandOpts.datePickerCommandMethod : null
        if (dpCommandMethod) {
          dpCommandMethod(shortcutParams)
        } else {
          const dateValueFormat = computeDateValueFormat.value
          const firstDayOfWeek = computeFirstDayOfWeek.value
          switch (code) {
            case 'now':
            case 'prev':
            case 'next':
            case 'minus':
            case 'plus': {
              const restObj = getDateByCode(code, value, type, {
                valueFormat: dateValueFormat,
                firstDay: firstDayOfWeek
              })
              value = restObj.value
              shortcutParams.value = value
              handleChange(value, $event)
              break
            }
            default:
              errLog('vxe.error.notCommands', [`[date-picker] ${code}`])
              break
          }
        }
      } else {
        const optClickMethod = clickMethod || shortcutOpts.clickMethod
        if (optClickMethod) {
          optClickMethod(shortcutParams)
        }
      }
      if (autoClose) {
        hidePanel()
      }
      dispatchEvent('shortcut-click', shortcutParams, $event)
    }

    const dispatchEvent = (type: ValueOf<VxeDatePickerEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $datePicker: $xeDatePicker }, params))
    }

    const datePickerMethods: DatePickerMethods = {
      dispatchEvent,

      setModelValue (value) {
        reactData.inputValue = value
        emit('update:modelValue', value)
      },
      setModelValueByEvent (evnt, value) {
        handleChange(value || '', evnt)
      },
      focus () {
        const inputElem = refInputTarget.value
        reactData.isActivated = true
        inputElem.focus()
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
      },
      showPanel,
      hidePanel,
      updatePlacement
    }

    Object.assign($xeDatePicker, datePickerMethods)

    const renderShortcutBtn = (pos: 'top' | 'bottom' | 'left' | 'right' | 'header' | 'footer', isVertical?: boolean) => {
      const shortcutOpts = computeShortcutOpts.value
      const { position, align, mode } = shortcutOpts
      const shortcutList = computeShortcutList.value
      if (isEnableConf(shortcutOpts) && shortcutList.length && (position || 'left') === pos) {
        return h('div', {
          class: `vxe-date-picker--layout-${pos}-wrapper`
        }, [
          h(VxeButtonGroupComponent, {
            options: shortcutList,
            mode,
            align,
            vertical: isVertical,
            onClick: handleShortcutEvent
          })
        ])
      }
      return renderEmptyElement($xeDatePicker)
    }

    const renderPanel = () => {
      const { type, multiple, showClearButton, showConfirmButton } = props
      const { initialized, isAniVisible, visiblePanel, panelPlacement, panelStyle, inputValue } = reactData
      const vSize = computeSize.value
      const btnTransfer = computeBtnTransfer.value
      const shortcutOpts = computeShortcutOpts.value
      const isClearable = computeIsClearable.value
      const isDateTimeType = computeIsDateTimeType.value
      const shortcutList = computeShortcutList.value
      const timeOpts = computeTimeOpts.value
      const popupOpts = computePopupOpts.value
      const { position } = shortcutOpts
      const headerSlot = slots.header
      const footerSlot = slots.footer
      const topSlot = slots.top
      const bottomSlot = slots.bottom
      const leftSlot = slots.left
      const rightSlot = slots.right
      const ppClassName = popupOpts.className
      const hasShortcutBtn = shortcutList.length > 0
      const showConfirmBtn = (showConfirmButton === null ? (isDateTimeType || multiple) : showConfirmButton)
      const showClearBtn = (showClearButton === null ? (isClearable && showConfirmBtn && type !== 'time') : showClearButton)
      return h(Teleport, {
        to: 'body',
        disabled: btnTransfer ? !initialized : true
      }, [
        h('div', {
          ref: refInputPanel,
          class: ['vxe-table--ignore-clear vxe-date-picker--panel', `type--${type}`, ppClassName ? (XEUtils.isFunction(ppClassName) ? ppClassName({ $datePicker: $xeDatePicker }) : ppClassName) : '', {
            [`size--${vSize}`]: vSize,
            'is--transfer': btnTransfer,
            'ani--leave': isAniVisible,
            'ani--enter': visiblePanel,
            'show--top': !!(topSlot || headerSlot || (hasShortcutBtn && (position === 'top' || position === 'header'))),
            'show--bottom': !!(bottomSlot || footerSlot || (hasShortcutBtn && (position === 'bottom' || position === 'footer'))),
            'show--left': !!(leftSlot || (hasShortcutBtn && position === 'left')),
            'show--right': !!(rightSlot || (hasShortcutBtn && position === 'right'))
          }],
          placement: panelPlacement,
          style: panelStyle
        }, initialized && (visiblePanel || isAniVisible)
          ? [
              h('div', {
                ref: refPanelWrapper,
                class: ['vxe-date-picker--layout-all-wrapper', `type--${type}`, {
                  [`size--${vSize}`]: vSize
                }]
              }, [
                topSlot
                  ? h('div', {
                    class: 'vxe-date-picker--layout-top-wrapper'
                  }, topSlot({}))
                  : renderShortcutBtn('top'),
                h('div', {
                  class: 'vxe-date-picker--layout-body-layout-wrapper'
                }, [
                  leftSlot
                    ? h('div', {
                      class: 'vxe-date-picker--layout-left-wrapper'
                    }, leftSlot({}))
                    : renderShortcutBtn('left', true),
                  h('div', {
                    class: 'vxe-date-picker--layout-body-content-wrapper'
                  }, [
                    headerSlot
                      ? h('div', {
                        class: 'vxe-date-picker--layout-header-wrapper'
                      }, headerSlot({}))
                      : renderShortcutBtn('header'),
                    h('div', {
                      class: 'vxe-date-picker--layout-body-wrapper'
                    }, [
                      h(VxeDatePanelComponent, {
                        ref: refDatePanel,
                        modelValue: reactData.inputValue,
                        type: props.type,
                        className: props.className,
                        multiple: props.multiple,
                        limitCount: props.limitCount,
                        startDate: props.startDate,
                        endDate: props.endDate,
                        defaultDate: props.defaultDate,
                        defaultTime: props.defaultTime,
                        minDate: props.minDate,
                        maxDate: props.maxDate,
                        startDay: props.startDay,
                        labelFormat: props.labelFormat,
                        valueFormat: props.valueFormat,
                        timeFormat: props.timeFormat,
                        timeConfig: timeOpts,
                        festivalMethod: props.festivalMethod,
                        disabledMethod: props.disabledMethod,
                        selectDay: props.selectDay,
                        onChange: panelChangeEvent,
                        onConfirm: panelConfirmEvent
                      })
                    ]),
                    h('div', {
                      class: 'vxe-date-picker--layout-footer-wrapper'
                    }, [
                      h('div', {
                        class: 'vxe-date-picker--layout-footer-custom'
                      }, footerSlot ? footerSlot({}) : [renderShortcutBtn('footer')]),
                      showClearBtn || showConfirmBtn
                        ? h('div', {
                          class: 'vxe-date-picker--layout-footer-btns'
                        }, [
                          showClearBtn
                            ? h(VxeButtonComponent, {
                              size: 'mini',
                              disabled: inputValue === '' || XEUtils.eqNull(inputValue),
                              content: getI18n('vxe.button.clear'),
                              onClick: clearValueEvent
                            })
                            : renderEmptyElement($xeDatePicker),
                          showConfirmBtn
                            ? h(VxeButtonComponent, {
                              size: 'mini',
                              status: 'primary',
                              content: getI18n('vxe.button.confirm'),
                              onClick: confirmEvent
                            })
                            : renderEmptyElement($xeDatePicker)
                        ])
                        : renderEmptyElement($xeDatePicker)
                    ])
                  ]),
                  rightSlot
                    ? h('div', {
                      class: 'vxe-date-picker--layout-right-wrapper'
                    }, rightSlot({}))
                    : renderShortcutBtn('right', true)
                ]),
                bottomSlot
                  ? h('div', {
                    class: 'vxe-date-picker--layout-bottom-wrapper'
                  }, bottomSlot({}))
                  : renderShortcutBtn('bottom')
              ])
            ]
          : [])
      ])
    }

    const renderPrefixIcon = () => {
      const { prefixIcon } = props
      const prefixSlot = slots.prefix
      return prefixSlot || prefixIcon
        ? h('div', {
          class: 'vxe-date-picker--prefix',
          onClick: clickPrefixEvent
        }, [
          h('div', {
            class: 'vxe-date-picker--prefix-icon'
          }, prefixSlot
            ? getSlotVNs(prefixSlot({}))
            : [
                h('i', {
                  class: prefixIcon
                })
              ])
        ])
        : null
    }

    const renderSuffixIcon = () => {
      const { suffixIcon } = props
      const { inputValue } = reactData
      const suffixSlot = slots.suffix
      const isDisabled = computeIsDisabled.value
      const isClearable = computeIsClearable.value
      return h('div', {
        class: ['vxe-date-picker--suffix', {
          'is--clear': isClearable && !isDisabled && !(inputValue === '' || XEUtils.eqNull(inputValue))
        }]
      }, [
        isClearable
          ? h('div', {
            class: 'vxe-date-picker--clear-icon',
            onClick: clearValueEvent
          }, [
            h('i', {
              class: getIcon().INPUT_CLEAR
            })
          ])
          : renderEmptyElement($xeDatePicker),
        renderExtraSuffixIcon(),
        suffixSlot || suffixIcon
          ? h('div', {
            class: 'vxe-date-picker--suffix-icon',
            onClick: clickSuffixEvent
          }, suffixSlot
            ? getSlotVNs(suffixSlot({}))
            : [
                h('i', {
                  class: suffixIcon
                })
              ])
          : renderEmptyElement($xeDatePicker)
      ])
    }

    const renderExtraSuffixIcon = () => {
      return h('div', {
        class: 'vxe-date-picker--control-icon',
        onClick: datePickerOpenEvent
      }, [
        h('i', {
          class: ['vxe-date-picker--date-picker-icon', getIcon().DATE_PICKER_DATE]
        })
      ])
    }

    const renderVN = () => {
      const { className, type, name, autoComplete } = props
      const { inputValue, inputLabel, visiblePanel, isActivated } = reactData
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const formReadonly = computeFormReadonly.value
      const panelLabel = computePanelLabel.value
      if (formReadonly) {
        return h('div', {
          ref: refElem,
          class: ['vxe-date-picker--readonly', `type--${type}`, className]
        }, panelLabel)
      }
      const inputReadonly = computeInputReadonly.value
      const inpPlaceholder = computeInpPlaceholder.value
      const isClearable = computeIsClearable.value
      const prefix = renderPrefixIcon()
      const suffix = renderSuffixIcon()
      return h('div', {
        ref: refElem,
        class: ['vxe-date-picker', `type--${type}`, className, {
          [`size--${vSize}`]: vSize,
          'is--prefix': !!prefix,
          'is--suffix': !!suffix,
          'is--visible': visiblePanel,
          'is--disabled': isDisabled,
          'is--active': isActivated,
          'show--clear': isClearable && !isDisabled && !(inputValue === '' || XEUtils.eqNull(inputValue))
        }],
        spellcheck: false
      }, [
        prefix || renderEmptyElement($xeDatePicker),
        h('div', {
          class: 'vxe-date-picker--wrapper'
        }, [
          h('input', {
            ref: refInputTarget,
            class: 'vxe-date-picker--inner',
            value: inputLabel,
            name,
            type: 'text',
            placeholder: inpPlaceholder,
            readonly: inputReadonly,
            disabled: isDisabled,
            autocomplete: autoComplete,
            onKeydown: keydownEvent,
            onKeyup: keyupEvent,
            onClick: clickEvent,
            onInput: inputEvent,
            onChange: changeEvent,
            onFocus: focusEvent,
            onBlur: blurEvent
          })
        ]),
        suffix || renderEmptyElement($xeDatePicker),
        // 下拉面板
        renderPanel()
      ])
    }

    watch(computePanelLabel, (val) => {
      reactData.inputLabel = val
    })

    watch(() => props.modelValue, () => {
      updateModelValue()
    })

    nextTick(() => {
      globalEvents.on($xeDatePicker, 'mousewheel', handleGlobalMousewheelEvent)
      globalEvents.on($xeDatePicker, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeDatePicker, 'keydown', handleGlobalKeydownEvent)
      globalEvents.on($xeDatePicker, 'blur', handleGlobalBlurEvent)
      globalEvents.on($xeDatePicker, 'resize', handleGlobalResizeEvent)
    })

    onUnmounted(() => {
      globalEvents.off($xeDatePicker, 'mousewheel')
      globalEvents.off($xeDatePicker, 'mousedown')
      globalEvents.off($xeDatePicker, 'blur')
      globalEvents.off($xeDatePicker, 'resize')
    })

    updateModelValue()

    provide('$xeDatePicker', $xeDatePicker)

    $xeDatePicker.renderVN = renderVN

    return $xeDatePicker
  },
  render () {
    return this.renderVN()
  }
})
