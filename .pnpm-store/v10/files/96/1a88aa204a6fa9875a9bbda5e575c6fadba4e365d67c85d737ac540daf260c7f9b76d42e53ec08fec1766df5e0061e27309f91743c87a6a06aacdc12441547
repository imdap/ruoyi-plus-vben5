import { h, Teleport, ref, Ref, computed, reactive, onMounted, inject, nextTick, watch, onBeforeUnmount, PropType, createCommentVNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, getIcon, getI18n, globalEvents, GLOBAL_EVENT_KEYS, createEvent, useSize, renderEmptyElement } from '../../ui'
import { getFuncText, getLastZIndex, nextZIndex, eqEmptyValue } from '../../ui/src/utils'
import { hasClass, getAbsolutePos, getEventTargetNode, hasControlKey } from '../../ui/src/dom'
import { toStringTimeDate, getDateQuarter } from '../../date-panel/src/util'
import { handleNumber, toFloatValueFixed } from '../../number-input/src/util'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog } from '../../ui/src/log'

import type { VxeInputConstructor, VxeInputEmits, InputReactData, InputMethods, ValueOf, InputInternalData, VxeInputPropTypes, InputPrivateRef, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines, VxeDrawerConstructor, VxeDrawerMethods, VxeModalConstructor, VxeModalMethods, VxeDatePanelDefines, VxeSelectConstructor, VxeSelectMethods, VxeTreeSelectConstructor, VxeTreeSelectMethods, VxeComponentStyleType } from '../../../types'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types/components/table'

export default defineVxeComponent({
  name: 'VxeInput',
  props: {
    modelValue: [String, Number, Date] as PropType<VxeInputPropTypes.ModelValue>,
    immediate: {
      type: Boolean as PropType<VxeInputPropTypes.Immediate>,
      default: true
    },
    name: String as PropType<VxeInputPropTypes.Name>,
    title: String as PropType<VxeInputPropTypes.Title>,
    type: {
      type: String as PropType<VxeInputPropTypes.Type>,
      default: 'text'
    },
    clearable: {
      type: Boolean as PropType<VxeInputPropTypes.Clearable>,
      default: () => getConfig().input.clearable
    },
    readonly: {
      type: Boolean as PropType<VxeInputPropTypes.Readonly>,
      default: null
    },
    disabled: {
      type: Boolean as PropType<VxeInputPropTypes.Disabled>,
      default: null
    },
    placeholder: {
      type: String as PropType<VxeInputPropTypes.Placeholder>,
      default: null
    },
    maxLength: {
      type: [String, Number] as PropType<VxeInputPropTypes.MaxLength>,
      default: () => getConfig().input.maxLength
    },
    autoComplete: {
      type: String as PropType<VxeInputPropTypes.AutoComplete>,
      default: 'off'
    },
    autoFocus: {
      type: Boolean as PropType<VxeInputPropTypes.AutoFocus>,
      default: null
    },
    align: String as PropType<VxeInputPropTypes.Align>,
    form: String as PropType<VxeInputPropTypes.Form>,
    className: String as PropType<VxeInputPropTypes.ClassName>,
    size: {
      type: String as PropType<VxeInputPropTypes.Size>,
      default: () => getConfig().input.size || getConfig().size
    },
    multiple: Boolean as PropType<VxeInputPropTypes.Multiple>,

    // text
    showWordCount: Boolean as PropType<VxeInputPropTypes.ShowWordCount>,
    countMethod: Function as PropType<VxeInputPropTypes.CountMethod>,

    // number、integer、float
    min: {
      type: [String, Number] as PropType<VxeInputPropTypes.Min>,
      default: null
    },
    max: {
      type: [String, Number] as PropType<VxeInputPropTypes.Max>,
      default: null
    },
    step: [String, Number] as PropType<VxeInputPropTypes.Step>,
    trim: {
      type: Boolean as PropType<VxeInputPropTypes.Trim>,
      default: () => getConfig().input.trim
    },
    exponential: {
      type: Boolean as PropType<VxeInputPropTypes.Exponential>,
      default: () => getConfig().input.exponential
    },

    // number、integer、float、password
    controls: {
      type: Boolean as PropType<VxeInputPropTypes.Controls>,
      default: () => getConfig().input.controls
    },

    // float
    digits: {
      type: [String, Number] as PropType<VxeInputPropTypes.Digits>,
      default: () => getConfig().input.digits
    },

    // date、week、month、quarter、year
    startDate: {
      type: [String, Number, Date] as PropType<VxeInputPropTypes.MinDate>,
      default: () => getConfig().input.startDate
    },
    endDate: {
      type: [String, Number, Date] as PropType<VxeInputPropTypes.MaxDate>,
      default: () => getConfig().input.endDate
    },
    minDate: [String, Number, Date] as PropType<VxeInputPropTypes.MinDate>,
    maxDate: [String, Number, Date] as PropType<VxeInputPropTypes.MaxDate>,
    // 已废弃 startWeek，被 startDay 替换
    startWeek: Number as PropType<VxeInputPropTypes.StartDay>,
    startDay: {
      type: [String, Number] as PropType<VxeInputPropTypes.StartDay>,
      default: () => getConfig().input.startDay
    },
    labelFormat: String as PropType<VxeInputPropTypes.LabelFormat>,
    valueFormat: String as PropType<VxeInputPropTypes.ValueFormat>,
    editable: {
      type: Boolean as PropType<VxeInputPropTypes.Editable>,
      default: true
    },
    festivalMethod: {
      type: Function as PropType<VxeInputPropTypes.FestivalMethod>,
      default: () => getConfig().input.festivalMethod
    },
    disabledMethod: {
      type: Function as PropType<VxeInputPropTypes.DisabledMethod>,
      default: () => getConfig().input.disabledMethod
    },

    // week
    selectDay: {
      type: [String, Number] as PropType<VxeInputPropTypes.SelectDay>,
      default: () => getConfig().input.selectDay
    },

    prefixIcon: String as PropType<VxeInputPropTypes.PrefixIcon>,
    prefixConfig: Object as PropType<VxeInputPropTypes.PrefixConfig>,
    suffixIcon: String as PropType<VxeInputPropTypes.SuffixIcon>,
    suffixConfig: Object as PropType<VxeInputPropTypes.SuffixConfig>,
    placement: String as PropType<VxeInputPropTypes.Placement>,
    transfer: {
      type: Boolean as PropType<VxeInputPropTypes.Transfer>,
      default: null
    },

    // 已废弃
    maxlength: [String, Number] as PropType<VxeInputPropTypes.Maxlength>,
    // 已废弃
    autocomplete: String as PropType<VxeInputPropTypes.Autocomplete>
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
    'search-click',
    'toggle-visible',
    'prev-number',
    'next-number',
    'prefix-click',
    'suffix-click',
    'date-prev',
    'date-today',
    'date-next'
  ] as VxeInputEmits,
  setup (props, context) {
    const { slots, emit } = context

    const $xeSelect = inject<(VxeSelectConstructor & VxeSelectMethods) | null>('$xeSelect', null)
    const $xeTreeSelect = inject<(VxeTreeSelectConstructor & VxeTreeSelectMethods) | null>('$xeTreeSelect', null)

    const $xeModal = inject<(VxeModalConstructor & VxeModalMethods) | null>('$xeModal', null)
    const $xeDrawer = inject<(VxeDrawerConstructor & VxeDrawerMethods) | null>('$xeDrawer', null)
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)
    const $xeForm = inject<(VxeFormConstructor & VxeFormPrivateMethods)| null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<InputReactData>({
      initialized: false,
      panelIndex: 0,
      showPwd: false,
      visiblePanel: false,
      isAniVisible: false,
      panelStyle: {},
      panelPlacement: '',
      isActivated: false,
      inputValue: props.modelValue,
      datetimePanelValue: null,
      datePanelValue: null,
      datePanelLabel: '',
      datePanelType: 'day',
      selectMonth: null,
      currentDate: null
    })

    const internalData: InputInternalData = {
      yearSize: 12,
      monthSize: 20,
      quarterSize: 8,
      hpTimeout: undefined,
      dnTimeout: undefined
    }

    const refElem = ref() as Ref<HTMLDivElement>
    const refInputTarget = ref() as Ref<HTMLInputElement>
    const refInputPanel = ref() as Ref<HTMLDivElement>
    const refPanelWrapper = ref() as Ref<HTMLDivElement>
    const refInputTimeBody = ref() as Ref<HTMLDivElement>

    const refMaps: InputPrivateRef = {
      refElem,
      refInput: refInputTarget
    }

    const $xeInput = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    } as unknown as VxeInputConstructor

    let inputMethods = {} as InputMethods

    const parseDate = (value: VxeInputPropTypes.ModelValue, format: string) => {
      const { type } = props
      if (type === 'time') {
        return toStringTimeDate(value)
      }
      return XEUtils.toStringDate(value, format)
    }

    const computePrefixOpts = computed(() => {
      return Object.assign({}, getConfig().input.prefixConfig, props.prefixConfig)
    })

    const computeSuffixOpts = computed(() => {
      return Object.assign({}, getConfig().input.suffixConfig, props.suffixConfig)
    })

    const computeBtnTransfer = computed(() => {
      const { transfer } = props
      if (transfer === null) {
        const globalTransfer = getConfig().input.transfer
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
      if (getConfig().inputReadonly === 'obsolete') {
        if ($xeForm) {
          return $xeForm.props.readonly
        }
        return false
      }
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

    const computeInpMaxLength = computed(() => {
      const { maxLength, maxlength } = props
      const maxLen = maxLength || maxlength
      const isNumType = computeIsNumType.value
      // 数值最大长度限制 16 位，包含小数
      if (isNumType) {
        if (!XEUtils.toNumber(maxLen)) {
          return 16
        }
      }
      return maxLen
    })

    const computeIsDateTimeType = computed(() => {
      const { type } = props
      return type === 'time' || type === 'datetime'
    })

    const computeIsNumType = computed(() => {
      return ['number', 'integer', 'float'].indexOf(props.type) > -1
    })

    const computeInputCount = computed(() => {
      return XEUtils.getSize(reactData.inputValue)
    })

    const computeIsCountError = computed(() => {
      const inputCount = computeInputCount.value
      const inpMaxLength = computeInpMaxLength.value
      return inpMaxLength && inputCount > XEUtils.toNumber(inpMaxLength)
    })

    const computeIsDatePickerType = computed(() => {
      const isDateTimeType = computeIsDateTimeType.value
      return isDateTimeType || ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1
    })

    const computeIsPawdType = computed(() => {
      return props.type === 'password'
    })

    const computeIsSearchType = computed(() => {
      return props.type === 'search'
    })

    const computeDigitsValue = computed(() => {
      return XEUtils.toInteger(props.digits) || 1
    })

    const computeStepValue = computed(() => {
      const { type } = props
      const digitsValue = computeDigitsValue.value
      const step = props.step
      if (type === 'integer') {
        return XEUtils.toInteger(step) || 1
      } else if (type === 'float') {
        return XEUtils.toNumber(step) || (1 / Math.pow(10, digitsValue))
      }
      return XEUtils.toNumber(step) || 1
    })

    const computeIsClearable = computed(() => {
      const { type } = props
      const isNumType = computeIsNumType.value
      const isDatePickerType = computeIsDatePickerType.value
      const isPawdType = computeIsPawdType.value
      return props.clearable && (isPawdType || isNumType || isDatePickerType || type === 'text' || type === 'search')
    })

    const computeDateStartTime = computed(() => {
      return props.startDate ? XEUtils.toStringDate(props.startDate) : null
    })

    const computeDateEndTime = computed(() => {
      return props.endDate ? XEUtils.toStringDate(props.endDate) : null
    })

    const computeSupportMultiples = computed(() => {
      return ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1
    })

    const computeDateListValue = computed(() => {
      const { modelValue, multiple } = props
      const isDatePickerType = computeIsDatePickerType.value
      const dateValueFormat = computeDateValueFormat.value
      if (multiple && modelValue && isDatePickerType) {
        return XEUtils.toValueString(modelValue).split(',').map(item => {
          const date = parseDate(item, dateValueFormat)
          if (XEUtils.isValidDate(date)) {
            return date
          }
          return null
        })
      }
      return []
    })

    const computeDateMultipleValue = computed(() => {
      const dateListValue = computeDateListValue.value
      const dateValueFormat = computeDateValueFormat.value
      return dateListValue.map(date => XEUtils.toDateString(date, dateValueFormat))
    })

    const computeDateMultipleLabel = computed(() => {
      const dateListValue = computeDateListValue.value
      const dateLabelFormat = computeDateLabelFormat.value
      return dateListValue.map(date => XEUtils.toDateString(date, dateLabelFormat)).join(', ')
    })

    const computeDateValueFormat = computed(() => {
      const { type, valueFormat } = props
      if (valueFormat) {
        return valueFormat
      }
      if (type === 'time') {
        return 'HH:mm:ss'
      }
      if (type === 'datetime') {
        return 'yyyy-MM-dd HH:mm:ss'
      }
      return 'yyyy-MM-dd'
    })

    const computeDateValue = computed(() => {
      const { modelValue } = props
      const isDatePickerType = computeIsDatePickerType.value
      const dateValueFormat = computeDateValueFormat.value
      let val = null
      if (modelValue && isDatePickerType) {
        const date = parseDate(modelValue, dateValueFormat)
        if (XEUtils.isValidDate(date)) {
          val = date
        }
      }
      return val
    })

    const computeIsDisabledPrevDateBtn = computed(() => {
      const dateStartTime = computeDateStartTime.value
      const { selectMonth } = reactData
      if (selectMonth && dateStartTime) {
        return selectMonth <= dateStartTime
      }
      return false
    })

    const computeIsDisabledNextDateBtn = computed(() => {
      const dateEndTime = computeDateEndTime.value
      const { selectMonth } = reactData
      if (selectMonth && dateEndTime) {
        return selectMonth >= dateEndTime
      }
      return false
    })

    const computeDateTimeLabel = computed(() => {
      const { datetimePanelValue } = reactData
      const hasTimeSecond = computeHasTimeSecond.value
      if (datetimePanelValue) {
        return XEUtils.toDateString(datetimePanelValue, hasTimeSecond ? 'HH:mm:ss' : 'HH:mm')
      }
      return ''
    })

    const computeDateHMSTime = computed(() => {
      const dateValue = computeDateValue.value
      const isDateTimeType = computeIsDateTimeType.value
      return dateValue && isDateTimeType ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1000 : 0
    })

    const computeDateLabelFormat = computed(() => {
      const { labelFormat } = props
      const isDatePickerType = computeIsDatePickerType.value
      if (isDatePickerType) {
        return labelFormat || getI18n(`vxe.input.date.labelFormat.${props.type}`)
      }
      return ''
    })

    const computeYearList = computed(() => {
      const { selectMonth, currentDate } = reactData
      const { yearSize } = internalData
      const years: VxeDatePanelDefines.DateYearItem[] = []
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear()
        const selectFullYear = selectMonth.getFullYear()
        const startYearDate = new Date(selectFullYear - selectFullYear % yearSize, 0, 1)
        for (let index = -4; index < yearSize + 4; index++) {
          const date = XEUtils.getWhatYear(startYearDate, index, 'first')
          const itemFullYear = date.getFullYear()
          years.push({
            date,
            isCurrent: true,
            isPrev: index < 0,
            isNow: currFullYear === itemFullYear,
            isNext: index >= yearSize,
            year: itemFullYear
          })
        }
      }
      return years
    })

    const computeSelectDatePanelObj = computed(() => {
      const isDatePickerType = computeIsDatePickerType.value
      let y = ''
      let m = ''
      if (isDatePickerType) {
        const { datePanelType, selectMonth } = reactData
        const yearList = computeYearList.value
        let year = ''
        let month
        if (selectMonth) {
          year = selectMonth.getFullYear()
          month = selectMonth.getMonth() + 1
        }
        if (datePanelType === 'quarter' || datePanelType === 'month') {
          y = getI18n('vxe.datePicker.yearTitle', [year])
        } else if (datePanelType === 'year') {
          y = yearList.length ? `${yearList[0].year} - ${yearList[yearList.length - 1].year}` : ''
        } else {
          y = getI18n('vxe.datePicker.yearTitle', [year])
          m = month ? getI18n(`vxe.input.date.m${month}`) : '-'
        }
      }
      return {
        y,
        m
      }
    })

    const computeFirstDayOfWeek = computed(() => {
      const { startDay, startWeek } = props
      return XEUtils.toNumber(XEUtils.isNumber(startDay) || XEUtils.isString(startDay) ? startDay : startWeek) as VxeInputPropTypes.StartDay
    })

    const computeWeekDatas = computed(() => {
      const weeks = []
      const isDatePickerType = computeIsDatePickerType.value
      if (isDatePickerType) {
        let sWeek = computeFirstDayOfWeek.value
        weeks.push(sWeek)
        for (let index = 0; index < 6; index++) {
          if (sWeek >= 6) {
            sWeek = 0
          } else {
            sWeek++
          }
          weeks.push(sWeek)
        }
      }
      return weeks
    })

    const computeDateHeaders = computed(() => {
      const isDatePickerType = computeIsDatePickerType.value
      if (isDatePickerType) {
        const weekDatas = computeWeekDatas.value
        return weekDatas.map((day) => {
          return {
            value: day,
            label: getI18n(`vxe.input.date.weeks.w${day}`)
          }
        })
      }
      return []
    })

    const computeWeekHeaders = computed(() => {
      const isDatePickerType = computeIsDatePickerType.value
      if (isDatePickerType) {
        const dateHeaders = computeDateHeaders.value
        return [{ label: getI18n('vxe.input.date.weeks.w') }].concat(dateHeaders)
      }
      return []
    })

    const computeYearDatas = computed(() => {
      const yearList = computeYearList.value
      return XEUtils.chunk(yearList, 4)
    })

    const computeQuarterList = computed(() => {
      const { selectMonth, currentDate } = reactData
      const { quarterSize } = internalData
      const quarters: VxeDatePanelDefines.DateQuarterItem[] = []
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear()
        const currQuarter = getDateQuarter(currentDate)
        const firstYear = XEUtils.getWhatYear(selectMonth, 0, 'first')
        const selFullYear = firstYear.getFullYear()
        for (let index = -2; index < quarterSize - 2; index++) {
          const date = XEUtils.getWhatQuarter(firstYear, index)
          const itemFullYear = date.getFullYear()
          const itemQuarter = getDateQuarter(date)
          const isPrev = itemFullYear < selFullYear
          quarters.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemQuarter === currQuarter,
            isNext: !isPrev && itemFullYear > selFullYear,
            quarter: itemQuarter
          })
        }
      }
      return quarters
    })

    const computeQuarterDatas = computed(() => {
      const quarterList = computeQuarterList.value
      return XEUtils.chunk(quarterList, 2)
    })

    const computeMonthList = computed(() => {
      const { selectMonth, currentDate } = reactData
      const { monthSize } = internalData
      const months: VxeDatePanelDefines.DateMonthItem[] = []
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear()
        const currMonth = currentDate.getMonth()
        const selFullYear = XEUtils.getWhatYear(selectMonth, 0, 'first').getFullYear()
        for (let index = -4; index < monthSize - 4; index++) {
          const date = XEUtils.getWhatYear(selectMonth, 0, index)
          const itemFullYear = date.getFullYear()
          const itemMonth = date.getMonth()
          const isPrev = itemFullYear < selFullYear
          months.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth,
            isNext: !isPrev && itemFullYear > selFullYear,
            month: itemMonth
          })
        }
      }
      return months
    })

    const computeMonthDatas = computed(() => {
      const monthList = computeMonthList.value
      return XEUtils.chunk(monthList, 4)
    })

    const computeDayList = computed(() => {
      const { selectMonth, currentDate } = reactData
      const days: VxeDatePanelDefines.DateDayItem[] = []
      if (selectMonth && currentDate) {
        const dateHMSTime = computeDateHMSTime.value
        const weekDatas = computeWeekDatas.value
        const currFullYear = currentDate.getFullYear()
        const currMonth = currentDate.getMonth()
        const currDate = currentDate.getDate()
        const selFullYear = selectMonth.getFullYear()
        const selMonth = selectMonth.getMonth()
        const selDay = selectMonth.getDay()
        const prevOffsetDate = -weekDatas.indexOf(selDay)
        const startDayDate = new Date(XEUtils.getWhatDay(selectMonth, prevOffsetDate).getTime() + dateHMSTime)
        for (let index = 0; index < 42; index++) {
          const date = XEUtils.getWhatDay(startDayDate, index)
          const itemFullYear = date.getFullYear()
          const itemMonth = date.getMonth()
          const itemDate = date.getDate()
          const isPrev = date < selectMonth
          days.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear && itemMonth === selMonth,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth && itemDate === currDate,
            isNext: !isPrev && selMonth !== itemMonth,
            label: itemDate
          })
        }
      }
      return days
    })

    const computeDayDatas = computed(() => {
      const dayList = computeDayList.value
      return XEUtils.chunk(dayList, 7)
    })

    const computeWeekDates = computed(() => {
      const dayDatas = computeDayDatas.value
      const firstDayOfWeek = computeFirstDayOfWeek.value
      return dayDatas.map((list) => {
        const firstItem = list[0]
        const item: VxeDatePanelDefines.DateDayItem = {
          date: firstItem.date,
          isWeekNumber: true,
          isPrev: false,
          isCurrent: false,
          isNow: false,
          isNext: false,
          label: XEUtils.getYearWeek(firstItem.date, firstDayOfWeek)
        }
        return [item].concat(list)
      })
    })

    const computeHourList = computed(() => {
      const list: VxeDatePanelDefines.DateHourMinuteSecondItem[] = []
      const isDateTimeType = computeIsDateTimeType.value
      if (isDateTimeType) {
        for (let index = 0; index < 24; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, '0'),
            disabled: false
          })
        }
      }
      return list
    })

    const computeMinuteList = computed(() => {
      const list: VxeDatePanelDefines.DateHourMinuteSecondItem[] = []
      const isDateTimeType = computeIsDateTimeType.value
      if (isDateTimeType) {
        for (let index = 0; index < 60; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, '0'),
            disabled: false
          })
        }
      }
      return list
    })

    const computeHasTimeMinute = computed(() => {
      const dateValueFormat = computeDateValueFormat.value
      return !/HH/.test(dateValueFormat) || /mm/.test(dateValueFormat)
    })

    const computeHasTimeSecond = computed(() => {
      const dateValueFormat = computeDateValueFormat.value
      return !/HH/.test(dateValueFormat) || /ss/.test(dateValueFormat)
    })

    const computeSecondList = computed(() => {
      const minuteList = computeMinuteList.value
      return minuteList
    })

    const computeInputReadonly = computed(() => {
      const { type, editable, multiple, readonly } = props
      return readonly || multiple || !editable || type === 'week' || type === 'quarter'
    })

    const computeInputType = computed(() => {
      const { type } = props
      const { showPwd } = reactData
      const isNumType = computeIsNumType.value
      const isDatePickerType = computeIsDatePickerType.value
      const isPawdType = computeIsPawdType.value
      if (isDatePickerType || isNumType || (isPawdType && showPwd) || type === 'number') {
        return 'text'
      }
      return type
    })

    const computeInpPlaceholder = computed(() => {
      const { placeholder } = props
      if (placeholder) {
        return getFuncText(placeholder)
      }
      if (XEUtils.eqNull(placeholder)) {
        const globalPlaceholder = getConfig().input.placeholder
        if (globalPlaceholder) {
          return getFuncText(globalPlaceholder)
        }
        return getI18n('vxe.base.pleaseInput')
      }
      return placeholder
    })

    const computeInpImmediate = computed(() => {
      const { type, immediate } = props
      return immediate || !(type === 'text' || type === 'number' || type === 'integer' || type === 'float')
    })

    const computeNumValue = computed(() => {
      const { type } = props
      const { inputValue } = reactData
      const isNumType = computeIsNumType.value
      if (isNumType) {
        return type === 'integer' ? XEUtils.toInteger(handleNumber(inputValue)) : XEUtils.toNumber(handleNumber(inputValue))
      }
      return 0
    })

    const computeIsDisabledSubtractNumber = computed(() => {
      const { min } = props
      const { inputValue } = reactData
      const isNumType = computeIsNumType.value
      const numValue = computeNumValue.value
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && isNumType && min !== null) {
        return numValue <= XEUtils.toNumber(min)
      }
      return false
    })

    const computeIsDisabledAddNumber = computed(() => {
      const { max } = props
      const { inputValue } = reactData
      const isNumType = computeIsNumType.value
      const numValue = computeNumValue.value
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && isNumType && max !== null) {
        return numValue >= XEUtils.toNumber(max)
      }
      return false
    })

    const getNumberValue = (val: any) => {
      const { type, exponential } = props
      const inpMaxLength = computeInpMaxLength.value
      const digitsValue = computeDigitsValue.value
      const restVal = (type === 'float' ? toFloatValueFixed(val, digitsValue) : XEUtils.toValueString(val))
      if (exponential && (val === restVal || XEUtils.toValueString(val).toLowerCase() === XEUtils.toNumber(restVal).toExponential())) {
        return val
      }
      return restVal.slice(0, inpMaxLength)
    }

    const emitModel = (value: string) => {
      emit('update:modelValue', value)
    }

    const triggerEvent = (evnt: Event & { type: 'input' | 'change' | 'keydown' | 'keyup' | 'wheel' | 'click' | 'focus' | 'blur' }) => {
      const { inputValue } = reactData
      inputMethods.dispatchEvent(evnt.type, { value: inputValue }, evnt)
    }

    const handleChange = (value: string, evnt: Event | { type: string }) => {
      if (props.trim) {
        value = `${value || ''}`.trim()
      }
      reactData.inputValue = value
      emitModel(value)
      inputMethods.dispatchEvent('input', { value }, evnt as any)
      if (XEUtils.toValueString(props.modelValue) !== value) {
        inputMethods.dispatchEvent('change', { value }, evnt as any)
        if (!$xeSelect && !$xeTreeSelect) {
          // 自动更新校验状态
          if ($xeForm && formItemInfo) {
            $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
          }
        }
      }
    }

    const emitInputEvent = (value: any, evnt: Event) => {
      const isDatePickerType = computeIsDatePickerType.value
      const inpImmediate = computeInpImmediate.value
      reactData.inputValue = value
      if (!isDatePickerType) {
        if (inpImmediate) {
          handleChange(value, evnt)
        } else {
          inputMethods.dispatchEvent('input', { value }, evnt)
        }
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
      $xeInput.dispatchEvent('lazy-change', { value: reactData.inputValue }, evnt)
    }

    const blurEvent = (evnt: Event & { type: 'blur' }) => {
      const { inputValue } = reactData
      const inpImmediate = computeInpImmediate.value
      const value = inputValue
      if (!inpImmediate) {
        handleChange(value, evnt)
      }
      afterCheckValue()
      if (!reactData.visiblePanel) {
        reactData.isActivated = false
      }
      inputMethods.dispatchEvent('blur', { value }, evnt)
      if (!$xeSelect && !$xeTreeSelect) {
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
        }
      }
    }

    const focusEvent = (evnt: Event & { type: 'focus' }) => {
      const { inputValue } = reactData
      const isNumType = computeIsNumType.value
      const isDatePickerType = computeIsDatePickerType.value
      reactData.isActivated = true
      if (isNumType) {
        reactData.inputValue = eqEmptyValue(inputValue) ? '' : `${XEUtils.toNumber(inputValue)}`
      } else if (isDatePickerType) {
        datePickerOpenEvent(evnt)
      }
      triggerEvent(evnt)
    }

    const clickPrefixEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const { inputValue } = reactData
        $xeInput.dispatchEvent('prefix-click', { value: inputValue }, evnt)
      }
    }

    const hidePanel = (): Promise<void> => {
      return new Promise(resolve => {
        reactData.visiblePanel = false
        internalData.hpTimeout = setTimeout(() => {
          reactData.isAniVisible = false
          resolve()
        }, 350)
      })
    }

    const clearValueEvent = (evnt: Event, value: VxeInputPropTypes.ModelValue) => {
      const { type, autoFocus } = props
      const isNumType = computeIsNumType.value
      const isDatePickerType = computeIsDatePickerType.value
      if (isDatePickerType) {
        hidePanel()
      }
      if (autoFocus || autoFocus === null) {
        if (isNumType || ['text', 'search', 'password'].indexOf(type) > -1) {
          focus()
        }
      }
      handleChange('', evnt)
      $xeInput.dispatchEvent('clear', { value }, evnt)
      $xeInput.dispatchEvent('lazy-change', { value }, evnt)
    }

    const clickSuffixEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const { inputValue } = reactData
        $xeInput.dispatchEvent('suffix-click', { value: inputValue }, evnt)
      }
    }

    const dateParseValue = (value?: VxeInputPropTypes.ModelValue) => {
      const { type } = props
      const dateLabelFormat = computeDateLabelFormat.value
      const dateValueFormat = computeDateValueFormat.value
      const firstDayOfWeek = computeFirstDayOfWeek.value
      let dValue: Date | null = null
      let dLabel = ''
      if (value) {
        dValue = parseDate(value, dateValueFormat)
      }
      if (XEUtils.isValidDate(dValue)) {
        dLabel = XEUtils.toDateString(dValue, dateLabelFormat, { firstDay: firstDayOfWeek })
        // 周选择器，由于年份和第几周是冲突的行为，所以需要特殊处理，判断是否跨年，例如
        // '2024-12-31' 'yyyy-MM-dd W' >> '2024-12-31 1'
        // '2025-01-01' 'yyyy-MM-dd W' >> '2025-01-01 1'
        if (dateLabelFormat && type === 'week') {
          const weekNum = XEUtils.getYearWeek(dValue, firstDayOfWeek)
          const weekDate = XEUtils.getWhatWeek(dValue, 0, weekNum === 1 ? ((6 + firstDayOfWeek) % 7) as VxeInputPropTypes.StartDay : firstDayOfWeek, firstDayOfWeek)
          const weekFullYear = weekDate.getFullYear()
          if (weekFullYear !== dValue.getFullYear()) {
            const yyIndex = dateLabelFormat.indexOf('yyyy')
            if (yyIndex > -1) {
              const yyNum = Number(dLabel.substring(yyIndex, yyIndex + 4))
              if (yyNum && !isNaN(yyNum)) {
                dLabel = dLabel.replace(`${yyNum}`, `${weekFullYear}`)
              }
            }
          }
        }
      } else {
        dValue = null
      }
      reactData.datePanelValue = dValue
      reactData.datePanelLabel = dLabel
    }

    /**
     * 值变化时处理
     */
    const changeValue = () => {
      const isDatePickerType = computeIsDatePickerType.value
      const { inputValue } = reactData
      if (isDatePickerType) {
        dateParseValue(inputValue)
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel
      }
    }

    /**
     * 检查初始值
     */
    const initValue = () => {
      const { type } = props
      const { inputValue } = reactData
      const isDatePickerType = computeIsDatePickerType.value
      const digitsValue = computeDigitsValue.value
      if (isDatePickerType) {
        changeValue()
      } else if (type === 'float') {
        if (inputValue) {
          const validValue = toFloatValueFixed(inputValue, digitsValue)
          if (inputValue !== validValue) {
            handleChange(validValue, { type: 'init' })
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

    const dateRevert = () => {
      reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel
    }

    const dateCheckMonth = (date: Date) => {
      const firstDayOfWeek = computeFirstDayOfWeek.value
      const weekNum = XEUtils.getYearWeek(date, firstDayOfWeek)
      const weekStartDate = XEUtils.getWhatWeek(date, 0, firstDayOfWeek, firstDayOfWeek)
      const month = XEUtils.getWhatMonth(weekNum === 1 ? XEUtils.getWhatDay(weekStartDate, 6) : date, 0, 'first')
      if (!XEUtils.isEqual(month, reactData.selectMonth)) {
        reactData.selectMonth = month
      }
    }

    const dateChange = (date: Date) => {
      const { modelValue, multiple } = props
      const { datetimePanelValue } = reactData
      const isDateTimeType = computeIsDateTimeType.value
      const dateValueFormat = computeDateValueFormat.value
      const firstDayOfWeek = computeFirstDayOfWeek.value
      if (props.type === 'week') {
        const sWeek = XEUtils.toNumber(props.selectDay) as VxeInputPropTypes.SelectDay
        date = XEUtils.getWhatWeek(date, 0, sWeek, firstDayOfWeek)
      } else if (isDateTimeType) {
        date.setHours(datetimePanelValue.getHours())
        date.setMinutes(datetimePanelValue.getMinutes())
        date.setSeconds(datetimePanelValue.getSeconds())
      }
      const inpVal = XEUtils.toDateString(date, dateValueFormat, { firstDay: firstDayOfWeek })
      dateCheckMonth(date)
      if (multiple) {
        // 如果为多选
        const dateMultipleValue = computeDateMultipleValue.value
        if (isDateTimeType) {
          // 如果是datetime特殊类型
          const dateListValue = [...computeDateListValue.value]
          const datetimeRest: Date[] = []
          const eqIndex = XEUtils.findIndexOf(dateListValue, val => XEUtils.isDateSame(date, val, 'yyyyMMdd'))
          if (eqIndex === -1) {
            dateListValue.push(date)
          } else {
            dateListValue.splice(eqIndex, 1)
          }
          dateListValue.forEach(item => {
            if (item) {
              item.setHours(datetimePanelValue.getHours())
              item.setMinutes(datetimePanelValue.getMinutes())
              item.setSeconds(datetimePanelValue.getSeconds())
              datetimeRest.push(item)
            }
          })
          handleChange(datetimeRest.map(date => XEUtils.toDateString(date, dateValueFormat)).join(','), { type: 'update' })
        } else {
          // 如果是日期类型
          if (dateMultipleValue.some(val => XEUtils.isEqual(val, inpVal))) {
            handleChange(dateMultipleValue.filter(val => !XEUtils.isEqual(val, inpVal)).join(','), { type: 'update' })
          } else {
            handleChange(dateMultipleValue.concat([inpVal]).join(','), { type: 'update' })
          }
        }
      } else {
        // 如果为单选
        if (!XEUtils.isEqual(modelValue, inpVal)) {
          handleChange(inpVal, { type: 'update' })
        }
      }
    }

    const afterCheckValue = () => {
      const { type, min, max, exponential } = props
      const { inputValue, datetimePanelValue } = reactData
      const isNumType = computeIsNumType.value
      const isDatePickerType = computeIsDatePickerType.value
      const dateLabelFormat = computeDateLabelFormat.value
      const inputReadonly = computeInputReadonly.value
      if (!inputReadonly) {
        if (isNumType) {
          if (inputValue) {
            const inpVal = `${handleNumber(inputValue)}`
            if (inpVal) {
              let inpNumVal: number | string = type === 'integer' ? XEUtils.toInteger(inpVal) : XEUtils.toNumber(inpVal)
              if (!validMinNum(inpNumVal)) {
                inpNumVal = min as number
              } else if (!validMaxNum(inpNumVal)) {
                inpNumVal = max as number
              }
              if (exponential) {
                const inpStringVal = XEUtils.toValueString(inputValue).toLowerCase()
                if (inpStringVal === XEUtils.toNumber(inpNumVal).toExponential()) {
                  inpNumVal = inpStringVal
                }
              }
              handleChange(getNumberValue(inpNumVal), { type: 'check' })
            } else {
              // 输入错误字符，清空
              let inpValue = ''
              if (min || min === 0) {
                inpValue = `${min}`
              }
              handleChange(inpValue, { type: 'check' })
            }
          }
        } else if (isDatePickerType) {
          if (inputValue) {
            let inpDateVal: VxeInputPropTypes.ModelValue = parseDate(inputValue, dateLabelFormat as string)
            if (XEUtils.isValidDate(inpDateVal)) {
              if (type === 'time') {
                inpDateVal = XEUtils.toDateString(inpDateVal, dateLabelFormat)
                if (inputValue !== inpDateVal) {
                  handleChange(inpDateVal, { type: 'check' })
                }
                reactData.inputValue = inpDateVal
              } else {
                let isChange = false
                const firstDayOfWeek = computeFirstDayOfWeek.value
                if (type === 'datetime') {
                  const dateValue = computeDateValue.value
                  if (inputValue !== XEUtils.toDateString(dateValue, dateLabelFormat) || inputValue !== XEUtils.toDateString(inpDateVal, dateLabelFormat)) {
                    isChange = true
                    datetimePanelValue.setHours(inpDateVal.getHours())
                    datetimePanelValue.setMinutes(inpDateVal.getMinutes())
                    datetimePanelValue.setSeconds(inpDateVal.getSeconds())
                  }
                } else {
                  isChange = true
                }
                reactData.inputValue = XEUtils.toDateString(inpDateVal, dateLabelFormat, { firstDay: firstDayOfWeek })
                if (isChange) {
                  dateChange(inpDateVal)
                }
              }
            } else {
              dateRevert()
            }
          } else {
            handleChange('', { type: 'check' })
          }
        }
      }
    }

    // 密码
    const passwordToggleEvent = (evnt: Event) => {
      const { showPwd } = reactData
      const isDisabled = computeIsDisabled.value
      const inputReadonly = computeInputReadonly.value
      if (!isDisabled && !inputReadonly) {
        reactData.showPwd = !showPwd
      }
      inputMethods.dispatchEvent('toggle-visible', { visible: reactData.showPwd }, evnt)
    }
    // 密码

    // 搜索
    const searchEvent = (evnt: Event) => {
      inputMethods.dispatchEvent('search-click', {}, evnt)
    }
    // 搜索

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

    const numberNextEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      const inputReadonly = computeInputReadonly.value
      const isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value
      numberStopDown()
      if (!isDisabled && !inputReadonly && !isDisabledSubtractNumber) {
        numberChange(false, evnt)
      }
      inputMethods.dispatchEvent('next-number', { value: reactData.inputValue }, evnt)
    }

    const numberDownNextEvent = (evnt: Event) => {
      internalData.dnTimeout = setTimeout(() => {
        numberNextEvent(evnt)
        numberDownNextEvent(evnt)
      }, 60)
    }

    const numberPrevEvent = (evnt: Event) => {
      const isDisabled = computeIsDisabled.value
      const inputReadonly = computeInputReadonly.value
      const isDisabledAddNumber = computeIsDisabledAddNumber.value
      numberStopDown()
      if (!isDisabled && !inputReadonly && !isDisabledAddNumber) {
        numberChange(true, evnt)
      }
      inputMethods.dispatchEvent('prev-number', { value: reactData.inputValue }, evnt)
    }

    const numberKeydownEvent = (evnt: KeyboardEvent) => {
      const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
      const isDwArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
      if (isUpArrow || isDwArrow) {
        evnt.preventDefault()
        if (isUpArrow) {
          numberPrevEvent(evnt)
        } else {
          numberNextEvent(evnt)
        }
      }
    }

    const keydownEvent = (evnt: KeyboardEvent & { type: 'keydown' }) => {
      const { type, exponential, controls } = props
      const isNumType = computeIsNumType.value
      if (isNumType) {
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
          if (controls) {
            numberKeydownEvent(evnt)
          }
        }
      }
      triggerEvent(evnt)
    }

    const keyupEvent = (evnt: KeyboardEvent & { type: 'keyup' }) => {
      triggerEvent(evnt)
    }

    // 数值

    const numberStopDown = () => {
      const { dnTimeout } = internalData
      if (dnTimeout) {
        clearTimeout(dnTimeout)
        internalData.dnTimeout = undefined
      }
    }

    const numberDownPrevEvent = (evnt: Event) => {
      internalData.dnTimeout = setTimeout(() => {
        numberPrevEvent(evnt)
        numberDownPrevEvent(evnt)
      }, 60)
    }

    const numberMousedownEvent = (evnt: MouseEvent) => {
      numberStopDown()
      if (evnt.button === 0) {
        const isPrevNumber = hasClass(evnt.currentTarget, 'is--prev')
        if (isPrevNumber) {
          numberPrevEvent(evnt)
        } else {
          numberNextEvent(evnt)
        }
        internalData.dnTimeout = setTimeout(() => {
          if (isPrevNumber) {
            numberDownPrevEvent(evnt)
          } else {
            numberDownNextEvent(evnt)
          }
        }, 500)
      }
    }

    const wheelEvent = (evnt: WheelEvent) => {
      const isNumType = computeIsNumType.value
      if (isNumType && props.controls) {
        if (reactData.isActivated) {
          const delta = evnt.deltaY
          if (delta > 0) {
            numberNextEvent(evnt)
          } else if (delta < 0) {
            numberPrevEvent(evnt)
          }
          evnt.preventDefault()
        }
      }
      triggerEvent(evnt as WheelEvent & { type: 'wheel' })
    }

    // 日期
    const dateMonthHandle = (date: Date, offsetMonth: number) => {
      const firstDayOfWeek = computeFirstDayOfWeek.value
      const weekNum = XEUtils.getYearWeek(date, firstDayOfWeek)
      const weekStartDate = XEUtils.getWhatWeek(date, 0, firstDayOfWeek, firstDayOfWeek)
      const month = XEUtils.getWhatMonth(weekNum === 1 ? XEUtils.getWhatDay(weekStartDate, 6) : date, offsetMonth, 'first')
      reactData.selectMonth = month
    }

    const dateNowHandle = () => {
      const currentDate = XEUtils.getWhatDay(Date.now(), 0, 'first')
      reactData.currentDate = currentDate
      dateMonthHandle(currentDate, 0)
    }

    const dateToggleYearTypeEvent = () => {
      reactData.datePanelType = 'year'
    }

    const dateToggleMonthTypeEvent = () => {
      let { datePanelType } = reactData
      if (datePanelType === 'month' || datePanelType === 'quarter') {
        datePanelType = 'year'
      } else {
        datePanelType = 'month'
      }
      reactData.datePanelType = datePanelType
    }

    const datePrevEvent = (evnt: Event) => {
      const { type } = props
      const { datePanelType, selectMonth, inputValue } = reactData
      const { yearSize } = internalData
      const value = inputValue
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value
      if (!isDisabledPrevDateBtn) {
        let viewDate
        if (type === 'year') {
          viewDate = XEUtils.getWhatYear(selectMonth, -yearSize, 'first')
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            viewDate = XEUtils.getWhatYear(selectMonth, -yearSize, 'first')
          } else {
            viewDate = XEUtils.getWhatYear(selectMonth, -1, 'first')
          }
        } else {
          if (datePanelType === 'year') {
            viewDate = XEUtils.getWhatYear(selectMonth, -yearSize, 'first')
          } else if (datePanelType === 'month') {
            viewDate = XEUtils.getWhatYear(selectMonth, -1, 'first')
          } else {
            viewDate = XEUtils.getWhatMonth(selectMonth, -1, 'first')
          }
        }
        reactData.selectMonth = viewDate
        inputMethods.dispatchEvent('date-prev', { viewType: datePanelType, viewDate, value, type }, evnt)
      }
    }

    const dateTodayMonthEvent = (evnt: Event) => {
      dateNowHandle()
      if (!props.multiple) {
        dateChange(reactData.currentDate)
        hidePanel()
      }
      inputMethods.dispatchEvent('date-today', { type: props.type }, evnt)
    }

    const dateNextEvent = (evnt: Event) => {
      const { type } = props
      const { datePanelType, selectMonth, inputValue } = reactData
      const { yearSize } = internalData
      const value = inputValue
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value
      if (!isDisabledNextDateBtn) {
        let viewDate
        if (type === 'year') {
          viewDate = XEUtils.getWhatYear(selectMonth, yearSize, 'first')
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            viewDate = XEUtils.getWhatYear(selectMonth, yearSize, 'first')
          } else {
            viewDate = XEUtils.getWhatYear(selectMonth, 1, 'first')
          }
        } else {
          if (datePanelType === 'year') {
            viewDate = XEUtils.getWhatYear(selectMonth, yearSize, 'first')
          } else if (datePanelType === 'month') {
            viewDate = XEUtils.getWhatYear(selectMonth, 1, 'first')
          } else {
            viewDate = XEUtils.getWhatMonth(selectMonth, 1, 'first')
          }
        }
        reactData.selectMonth = viewDate
        inputMethods.dispatchEvent('date-next', { viewType: datePanelType, viewDate, value, type }, evnt)
      }
    }

    const isDateDisabled = (item: { date: Date }) => {
      const { disabledMethod } = props
      const { datePanelType } = reactData
      const dateStartTime = computeDateStartTime.value
      const dateEndTime = computeDateEndTime.value
      const { date } = item
      if (dateStartTime && dateStartTime.getTime() > date.getTime()) {
        return true
      }
      if (dateEndTime && dateEndTime.getTime() < date.getTime()) {
        return true
      }
      if (disabledMethod) {
        return disabledMethod({ type: datePanelType, viewType: datePanelType, date, $input: $xeInput })
      }
      return false
    }

    const dateSelectItem = (date: Date) => {
      const { type, multiple } = props
      const { datePanelType } = reactData
      if (type === 'month') {
        if (datePanelType === 'year') {
          reactData.datePanelType = 'month'
          dateCheckMonth(date)
        } else {
          dateChange(date)
          if (!multiple) {
            hidePanel()
          }
        }
      } else if (type === 'year') {
        dateChange(date)
        if (!multiple) {
          hidePanel()
        }
      } else if (type === 'quarter') {
        if (datePanelType === 'year') {
          reactData.datePanelType = 'quarter'
          dateCheckMonth(date)
        } else {
          dateChange(date)
          if (!multiple) {
            hidePanel()
          }
        }
      } else {
        if (datePanelType === 'month') {
          reactData.datePanelType = type === 'week' ? type : 'day'
          dateCheckMonth(date)
        } else if (datePanelType === 'year') {
          reactData.datePanelType = 'month'
          dateCheckMonth(date)
        } else {
          dateChange(date)
          if (type === 'datetime') {
            // 日期带时间
          } else {
            if (!multiple) {
              hidePanel()
            }
          }
        }
      }
    }

    const dateSelectEvent = (item: VxeDatePanelDefines.DateYearItem | VxeDatePanelDefines.DateQuarterItem | VxeDatePanelDefines.DateMonthItem | VxeDatePanelDefines.DateDayItem) => {
      if (!isDateDisabled(item)) {
        dateSelectItem(item.date)
      }
    }

    const dateMoveDay = (offsetDay: Date) => {
      if (!isDateDisabled({ date: offsetDay })) {
        const dayList = computeDayList.value
        if (!dayList.some((item) => XEUtils.isDateSame(item.date, offsetDay, 'yyyyMMdd'))) {
          dateCheckMonth(offsetDay)
        }
        dateParseValue(offsetDay)
      }
    }

    const dateMoveYear = (offsetYear: Date) => {
      if (!isDateDisabled({ date: offsetYear })) {
        const yearList = computeYearList.value
        if (!yearList.some((item) => XEUtils.isDateSame(item.date, offsetYear, 'yyyy'))) {
          dateCheckMonth(offsetYear)
        }
        dateParseValue(offsetYear)
      }
    }

    const dateMoveQuarter = (offsetQuarter: Date) => {
      if (!isDateDisabled({ date: offsetQuarter })) {
        const quarterList = computeQuarterList.value
        if (!quarterList.some((item) => XEUtils.isDateSame(item.date, offsetQuarter, 'yyyyq'))) {
          dateCheckMonth(offsetQuarter)
        }
        dateParseValue(offsetQuarter)
      }
    }

    const dateMoveMonth = (offsetMonth: Date) => {
      if (!isDateDisabled({ date: offsetMonth })) {
        const monthList = computeMonthList.value
        if (!monthList.some((item) => XEUtils.isDateSame(item.date, offsetMonth, 'yyyyMM'))) {
          dateCheckMonth(offsetMonth)
        }
        dateParseValue(offsetMonth)
      }
    }

    const dateMouseenterEvent = (item: VxeDatePanelDefines.DateYearItem | VxeDatePanelDefines.DateQuarterItem | VxeDatePanelDefines.DateMonthItem | VxeDatePanelDefines.DateDayItem) => {
      if (!isDateDisabled(item)) {
        const { datePanelType } = reactData
        if (datePanelType === 'month') {
          dateMoveMonth(item.date)
        } else if (datePanelType === 'quarter') {
          dateMoveQuarter(item.date)
        } else if (datePanelType === 'year') {
          dateMoveYear(item.date)
        } else {
          dateMoveDay(item.date)
        }
      }
    }

    const updateTimePos = (liElem: Element) => {
      if (liElem) {
        const height = (liElem as HTMLElement).offsetHeight
        const ulElem = liElem.parentNode as HTMLElement
        ulElem.scrollTop = (liElem as HTMLElement).offsetTop - height * 4
      }
    }

    const dateTimeChangeEvent = (evnt: Event) => {
      reactData.datetimePanelValue = new Date(reactData.datetimePanelValue.getTime())
      updateTimePos(evnt.currentTarget as HTMLLIElement)
    }

    const dateHourEvent = (evnt: MouseEvent, item: VxeDatePanelDefines.DateHourMinuteSecondItem) => {
      reactData.datetimePanelValue.setHours(item.value)
      dateTimeChangeEvent(evnt)
    }

    const dateConfirmEvent = () => {
      const { multiple } = props
      const { datetimePanelValue } = reactData
      const dateValue = computeDateValue.value
      const isDateTimeType = computeIsDateTimeType.value
      if (isDateTimeType) {
        const dateValueFormat = computeDateValueFormat.value
        if (multiple) {
          // 如果为多选
          const dateMultipleValue = computeDateMultipleValue.value
          if (isDateTimeType) {
            // 如果是datetime特殊类型
            const dateListValue = [...computeDateListValue.value]
            const datetimeRest: Date[] = []
            dateListValue.forEach(item => {
              if (item) {
                item.setHours(datetimePanelValue.getHours())
                item.setMinutes(datetimePanelValue.getMinutes())
                item.setSeconds(datetimePanelValue.getSeconds())
                datetimeRest.push(item)
              }
            })
            handleChange(datetimeRest.map(date => XEUtils.toDateString(date, dateValueFormat)).join(','), { type: 'update' })
          } else {
            // 如果是日期类型
            handleChange(dateMultipleValue.join(','), { type: 'update' })
          }
        } else {
          dateChange(dateValue || reactData.currentDate)
        }
      }
      hidePanel()
    }

    const dateMinuteEvent = (evnt: MouseEvent, item: VxeDatePanelDefines.DateHourMinuteSecondItem) => {
      reactData.datetimePanelValue.setMinutes(item.value)
      dateTimeChangeEvent(evnt)
    }

    const dateSecondEvent = (evnt: MouseEvent, item: VxeDatePanelDefines.DateHourMinuteSecondItem) => {
      reactData.datetimePanelValue.setSeconds(item.value)
      dateTimeChangeEvent(evnt)
    }

    const dateOffsetEvent = (evnt: KeyboardEvent) => {
      const { isActivated, datePanelValue, datePanelType } = reactData
      if (isActivated) {
        evnt.preventDefault()
        const isLeftArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_LEFT)
        const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
        const isRightArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_RIGHT)
        const isDwArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
        if (datePanelType === 'year') {
          let offsetYear = XEUtils.getWhatYear(datePanelValue || Date.now(), 0, 'first')
          if (isLeftArrow) {
            offsetYear = XEUtils.getWhatYear(offsetYear, -1)
          } else if (isUpArrow) {
            offsetYear = XEUtils.getWhatYear(offsetYear, -4)
          } else if (isRightArrow) {
            offsetYear = XEUtils.getWhatYear(offsetYear, 1)
          } else if (isDwArrow) {
            offsetYear = XEUtils.getWhatYear(offsetYear, 4)
          }
          dateMoveYear(offsetYear)
        } else if (datePanelType === 'quarter') {
          let offsetQuarter = XEUtils.getWhatQuarter(datePanelValue || Date.now(), 0, 'first')
          if (isLeftArrow) {
            offsetQuarter = XEUtils.getWhatQuarter(offsetQuarter, -1)
          } else if (isUpArrow) {
            offsetQuarter = XEUtils.getWhatQuarter(offsetQuarter, -2)
          } else if (isRightArrow) {
            offsetQuarter = XEUtils.getWhatQuarter(offsetQuarter, 1)
          } else if (isDwArrow) {
            offsetQuarter = XEUtils.getWhatQuarter(offsetQuarter, 2)
          }
          dateMoveQuarter(offsetQuarter)
        } else if (datePanelType === 'month') {
          let offsetMonth = XEUtils.getWhatMonth(datePanelValue || Date.now(), 0, 'first')
          if (isLeftArrow) {
            offsetMonth = XEUtils.getWhatMonth(offsetMonth, -1)
          } else if (isUpArrow) {
            offsetMonth = XEUtils.getWhatMonth(offsetMonth, -4)
          } else if (isRightArrow) {
            offsetMonth = XEUtils.getWhatMonth(offsetMonth, 1)
          } else if (isDwArrow) {
            offsetMonth = XEUtils.getWhatMonth(offsetMonth, 4)
          }
          dateMoveMonth(offsetMonth)
        } else {
          let offsetDay = datePanelValue || XEUtils.getWhatDay(Date.now(), 0, 'first')
          const firstDayOfWeek = computeFirstDayOfWeek.value
          if (isLeftArrow) {
            offsetDay = XEUtils.getWhatDay(offsetDay, -1)
          } else if (isUpArrow) {
            offsetDay = XEUtils.getWhatWeek(offsetDay, -1, firstDayOfWeek)
          } else if (isRightArrow) {
            offsetDay = XEUtils.getWhatDay(offsetDay, 1)
          } else if (isDwArrow) {
            offsetDay = XEUtils.getWhatWeek(offsetDay, 1, firstDayOfWeek)
          }
          dateMoveDay(offsetDay)
        }
      }
    }

    const datePgOffsetEvent = (evnt: KeyboardEvent) => {
      const { isActivated } = reactData
      if (isActivated) {
        const isPgUp = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.PAGE_UP)
        evnt.preventDefault()
        if (isPgUp) {
          datePrevEvent(evnt)
        } else {
          dateNextEvent(evnt)
        }
      }
    }

    const dateOpenPanel = () => {
      const { type } = props
      const isDateTimeType = computeIsDateTimeType.value
      const dateValue = computeDateValue.value
      if (['year', 'quarter', 'month', 'week'].indexOf(type) > -1) {
        reactData.datePanelType = type as 'year' | 'quarter' | 'month' | 'week'
      } else {
        reactData.datePanelType = 'day'
      }
      reactData.currentDate = XEUtils.getWhatDay(Date.now(), 0, 'first')
      if (dateValue) {
        dateMonthHandle(dateValue, 0)
        dateParseValue(dateValue)
      } else {
        dateNowHandle()
      }
      if (isDateTimeType) {
        reactData.datetimePanelValue = reactData.datePanelValue || XEUtils.getWhatDay(Date.now(), 0, 'first')
        nextTick(() => {
          const timeBodyElem = refInputTimeBody.value
          XEUtils.arrayEach(timeBodyElem.querySelectorAll('li.is--selected'), (elem) => {
            updateTimePos(elem)
          })
        })
      }
    }

    // 日期

    // 弹出面板
    const updateZindex = () => {
      if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex()
      }
    }

    const updatePlacement = () => {
      return nextTick().then(() => {
        const { placement } = props
        const { panelIndex } = reactData
        const targetElem = refInputTarget.value
        const panelElem = refInputPanel.value
        const btnTransfer = computeBtnTransfer.value
        if (targetElem && panelElem) {
          const targetHeight = targetElem.offsetHeight
          const targetWidth = targetElem.offsetWidth
          const panelHeight = panelElem.offsetHeight
          const panelWidth = panelElem.offsetWidth
          const marginSize = 5
          const panelStyle: VxeComponentStyleType = {
            zIndex: panelIndex
          }
          const { boundingTop, boundingLeft, visibleHeight, visibleWidth } = getAbsolutePos(targetElem)
          let panelPlacement: VxeInputPropTypes.Placement = 'bottom'
          if (btnTransfer) {
            let left = boundingLeft
            let top = boundingTop + targetHeight
            if (placement === 'top') {
              panelPlacement = 'top'
              top = boundingTop - panelHeight
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top'
                top = boundingTop - panelHeight
              }
              // 如果上面不够放，则向下（优先）
              if (top < marginSize) {
                panelPlacement = 'bottom'
                top = boundingTop + targetHeight
              }
            }
            // 如果溢出右边
            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth
            }
            // 如果溢出左边
            if (left < marginSize) {
              left = marginSize
            }
            Object.assign(panelStyle, {
              left: `${left}px`,
              top: `${top}px`,
              minWidth: `${targetWidth}px`
            })
          } else {
            if (placement === 'top') {
              panelPlacement = 'top'
              panelStyle.bottom = `${targetHeight}px`
            } else if (!placement) {
              // 如果下面不够放，则向上
              panelStyle.top = `${targetHeight}px`
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top'
                  panelStyle.top = ''
                  panelStyle.bottom = `${targetHeight}px`
                }
              }
            }
          }
          reactData.panelStyle = panelStyle
          reactData.panelPlacement = panelPlacement
          return nextTick()
        }
      })
    }

    const showPanel = () => {
      const { visiblePanel } = reactData
      const { hpTimeout } = internalData
      const isDisabled = computeIsDisabled.value
      const isDatePickerType = computeIsDatePickerType.value
      if (!isDisabled && !visiblePanel) {
        if (!reactData.initialized) {
          reactData.initialized = true
        }
        if (hpTimeout) {
          clearTimeout(hpTimeout)
          internalData.hpTimeout = undefined
        }
        reactData.isActivated = true
        reactData.isAniVisible = true
        if (isDatePickerType) {
          dateOpenPanel()
        }
        setTimeout(() => {
          reactData.visiblePanel = true
        }, 10)
        updateZindex()
        return updatePlacement()
      }
      return nextTick()
    }

    const datePickerOpenEvent = (evnt: Event) => {
      const inputReadonly = computeInputReadonly.value
      if (!inputReadonly) {
        evnt.preventDefault()
        showPanel()
      }
    }

    const clickEvent = (evnt: Event & { type: 'click' }) => {
      triggerEvent(evnt)
    }

    // 弹出面板

    // 全局事件
    const handleGlobalMousedownEvent = (evnt: Event) => {
      const { visiblePanel, isActivated } = reactData
      const isDatePickerType = computeIsDatePickerType.value
      const el = refElem.value
      const panelWrapperElem = refPanelWrapper.value
      const isDisabled = computeIsDisabled.value
      if (!isDisabled && isActivated) {
        reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelWrapperElem).flag
        if (!reactData.isActivated) {
          // 如果是日期类型
          if (isDatePickerType) {
            if (visiblePanel) {
              hidePanel()
              afterCheckValue()
            }
          } else {
            afterCheckValue()
          }
        }
      }
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const { clearable } = props
      const { visiblePanel } = reactData
      const isDisabled = computeIsDisabled.value
      const isDatePickerType = computeIsDatePickerType.value
      if (!isDisabled) {
        const isTab = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.TAB)
        const isDel = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.DELETE)
        const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
        const isEnter = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ENTER)
        const isLeftArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_LEFT)
        const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
        const isRightArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_RIGHT)
        const isDwArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
        const isPgUp = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.PAGE_UP)
        const isPgDn = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.PAGE_DOWN)
        const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
        let isActivated = reactData.isActivated
        if (isTab) {
          if (isActivated) {
            afterCheckValue()
          }
          isActivated = false
          reactData.isActivated = isActivated
        } else if (operArrow) {
          if (isDatePickerType) {
            if (isActivated) {
              if (visiblePanel) {
                dateOffsetEvent(evnt)
              } else if (isUpArrow || isDwArrow) {
                datePickerOpenEvent(evnt)
              }
            }
          }
        } else if (isEnter) {
          if (isDatePickerType) {
            if (visiblePanel) {
              if (reactData.datePanelValue) {
                dateSelectItem(reactData.datePanelValue)
              } else {
                hidePanel()
              }
            } else if (isActivated) {
              datePickerOpenEvent(evnt)
            }
          }
        } else if (isPgUp || isPgDn) {
          if (isDatePickerType) {
            if (isActivated) {
              datePgOffsetEvent(evnt)
            }
          }
        }
        if (isTab || isEsc) {
          if (visiblePanel) {
            hidePanel()
          }
        } else if (isDel && clearable) {
          if (isActivated) {
            clearValueEvent(evnt, null)
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
            afterCheckValue()
          }
        }
      }
    }

    const handleGlobalBlurEvent = () => {
      const { isActivated, visiblePanel } = reactData
      if (visiblePanel) {
        hidePanel()
      }
      if (isActivated) {
        reactData.isActivated = false
      }
      if (visiblePanel || isActivated) {
        const inputElem = refInputTarget.value
        afterCheckValue()
        if (inputElem) {
          inputElem.blur()
        }
      }
    }

    const renderDateLabel = (item: VxeDatePanelDefines.DateYearItem | VxeDatePanelDefines.DateQuarterItem | VxeDatePanelDefines.DateMonthItem | VxeDatePanelDefines.DateDayItem, label: string | number) => {
      const { festivalMethod } = props
      if (festivalMethod) {
        const { datePanelType } = reactData
        const festivalRest = festivalMethod({ type: datePanelType, viewType: datePanelType, date: item.date, $input: $xeInput })
        const festivalItem = festivalRest ? (XEUtils.isString(festivalRest) ? { label: festivalRest } : festivalRest) : {}
        const extraItem = festivalItem.extra ? (XEUtils.isString(festivalItem.extra) ? { label: festivalItem.extra } : festivalItem.extra) : null
        const labels = [
          h('span', {
            class: ['vxe-input--date-label', {
              'is-notice': festivalItem.notice
            }]
          }, extraItem && extraItem.label
            ? [
                h('span', `${label || ''}`),
                h('span', {
                  class: ['vxe-input--date-label--extra', extraItem.important ? 'is-important' : '', extraItem.className],
                  style: extraItem.style
                }, XEUtils.toValueString(extraItem.label))
              ]
            : [`${label || ''}`])
        ]
        const festivalLabel = festivalItem.label
        if (festivalLabel) {
          // 默认最多支持3个节日重叠
          const festivalLabels = XEUtils.toValueString(festivalLabel).split(',')
          labels.push(
            h('span', {
              class: ['vxe-input--date-festival', festivalItem.important ? 'is-important' : '', festivalItem.className],
              style: festivalItem.style
            }, [
              festivalLabels.length > 1
                ? h('span', {
                  class: ['vxe-input--date-festival--overlap', `overlap--${festivalLabels.length}`]
                }, festivalLabels.map(label => h('span', label.substring(0, 3))))
                : h('span', {
                  class: 'vxe-input--date-festival--label'
                }, festivalLabels[0].substring(0, 3))
            ])
          )
        }
        return labels
      }
      return [`${label || ''}`]
    }

    const renderDateDayTable = () => {
      const { multiple } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const dateHeaders = computeDateHeaders.value
      const dayDatas = computeDayDatas.value
      const dateListValue = computeDateListValue.value
      const matchFormat = 'yyyyMMdd'
      return [
        h('table', {
          class: `vxe-input--date-${datePanelType}-view`,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          h('thead', [
            h('tr', dateHeaders.map((item) => {
              return h('th', item.label)
            }))
          ]),
          h('tbody', dayDatas.map((rows) => {
            return h('tr', rows.map((item) => {
              return h('td', {
                class: {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--disabled': isDateDisabled(item),
                  'is--selected': multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat),
                  'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                },
                onClick: () => dateSelectEvent(item),
                onMouseenter: () => dateMouseenterEvent(item)
              }, renderDateLabel(item, item.label))
            }))
          }))
        ])
      ]
    }

    const renderDateWeekTable = () => {
      const { multiple } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const weekHeaders = computeWeekHeaders.value
      const weekDates = computeWeekDates.value
      const dateListValue = computeDateListValue.value
      const matchFormat = 'yyyyMMdd'
      return [
        h('table', {
          class: `vxe-input--date-${datePanelType}-view`,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          h('thead', [
            h('tr', weekHeaders.map((item) => {
              return h('th', item.label)
            }))
          ]),
          h('tbody', weekDates.map((rows) => {
            const isSelected = multiple ? rows.some((item) => dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat))) : rows.some((item) => XEUtils.isDateSame(dateValue, item.date, matchFormat))
            const isHover = rows.some((item) => XEUtils.isDateSame(datePanelValue, item.date, matchFormat))
            return h('tr', rows.map((item) => {
              return h('td', {
                class: {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--hover': isHover
                },
                // event
                onClick: () => dateSelectEvent(item),
                onMouseenter: () => dateMouseenterEvent(item)
              }, renderDateLabel(item, item.label))
            }))
          }))
        ])
      ]
    }

    const renderDateMonthTable = () => {
      const { multiple } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const monthDatas = computeMonthDatas.value
      const dateListValue = computeDateListValue.value
      const matchFormat = 'yyyyMM'
      return [
        h('table', {
          class: `vxe-input--date-${datePanelType}-view`,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          h('tbody', monthDatas.map((rows) => {
            return h('tr', rows.map((item) => {
              return h('td', {
                class: {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--disabled': isDateDisabled(item),
                  'is--selected': multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat),
                  'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                },
                onClick: () => dateSelectEvent(item),
                onMouseenter: () => dateMouseenterEvent(item)
              }, renderDateLabel(item, getI18n(`vxe.input.date.months.m${item.month}`)))
            }))
          }))
        ])
      ]
    }

    const renderDateQuarterTable = () => {
      const { multiple } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const quarterDatas = computeQuarterDatas.value
      const dateListValue = computeDateListValue.value
      const matchFormat = 'yyyyq'
      return [
        h('table', {
          class: `vxe-input--date-${datePanelType}-view`,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          h('tbody', quarterDatas.map((rows) => {
            return h('tr', rows.map((item) => {
              return h('td', {
                class: {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--disabled': isDateDisabled(item),
                  'is--selected': multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat),
                  'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                },
                onClick: () => dateSelectEvent(item),
                onMouseenter: () => dateMouseenterEvent(item)
              }, renderDateLabel(item, getI18n(`vxe.input.date.quarters.q${item.quarter}`)))
            }))
          }))
        ])
      ]
    }

    const renderDateYearTable = () => {
      const { multiple } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const yearDatas = computeYearDatas.value
      const dateListValue = computeDateListValue.value
      const matchFormat = 'yyyy'
      return [
        h('table', {
          class: `vxe-input--date-${datePanelType}-view`,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          h('tbody', yearDatas.map((rows) => {
            return h('tr', rows.map((item) => {
              return h('td', {
                class: {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--disabled': isDateDisabled(item),
                  'is--selected': multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat),
                  'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                },
                onClick: () => dateSelectEvent(item),
                onMouseenter: () => dateMouseenterEvent(item)
              }, renderDateLabel(item, item.year))
            }))
          }))
        ])
      ]
    }

    const renderDateTable = () => {
      const { datePanelType } = reactData
      switch (datePanelType) {
        case 'week' :
          return renderDateWeekTable()
        case 'month' :
          return renderDateMonthTable()
        case 'quarter' :
          return renderDateQuarterTable()
        case 'year' :
          return renderDateYearTable()
      }
      return renderDateDayTable()
    }

    const renderDatePanel = () => {
      const { multiple } = props
      const { datePanelType } = reactData
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value
      const selectDatePanelObj = computeSelectDatePanelObj.value
      return [
        h('div', {
          class: 'vxe-input--date-picker-header'
        }, [
          h('div', {
            class: 'vxe-input--date-picker-type-wrapper'
          }, [
            datePanelType === 'year'
              ? h('span', {
                class: 'vxe-input--date-picker-label'
              }, selectDatePanelObj.y)
              : h('span', {
                class: 'vxe-input--date-picker-btns'
              }, [
                h('span', {
                  class: 'vxe-input--date-picker-btn',
                  onClick: dateToggleYearTypeEvent
                }, selectDatePanelObj.y),
                selectDatePanelObj.m
                  ? h('span', {
                    class: 'vxe-input--date-picker-btn',
                    onClick: dateToggleMonthTypeEvent
                  }, selectDatePanelObj.m)
                  : renderEmptyElement($xeInput)
              ])
          ]),
          h('div', {
            class: 'vxe-input--date-picker-btn-wrapper'
          }, [
            h('span', {
              class: ['vxe-input--date-picker-btn vxe-input--date-picker-prev-btn', {
                'is--disabled': isDisabledPrevDateBtn
              }],
              onClick: datePrevEvent
            }, [
              h('i', {
                class: 'vxe-icon-caret-left'
              })
            ]),
            h('span', {
              class: 'vxe-input--date-picker-btn vxe-input--date-picker-current-btn',
              onClick: dateTodayMonthEvent
            }, [
              h('i', {
                class: 'vxe-icon-dot'
              })
            ]),
            h('span', {
              class: ['vxe-input--date-picker-btn vxe-input--date-picker-next-btn', {
                'is--disabled': isDisabledNextDateBtn
              }],
              onClick: dateNextEvent
            }, [
              h('i', {
                class: 'vxe-icon-caret-right'
              })
            ]),
            multiple && computeSupportMultiples.value
              ? h('span', {
                class: 'vxe-input--date-picker-btn vxe-input--date-picker-confirm-btn'
              }, [
                h('button', {
                  class: 'vxe-input--date-picker-confirm',
                  type: 'button',
                  onClick: dateConfirmEvent
                }, getI18n('vxe.button.confirm'))
              ])
              : null
          ])
        ]),
        h('div', {
          class: 'vxe-input--date-picker-body'
        }, renderDateTable())
      ]
    }

    const renderTimePanel = () => {
      const { datetimePanelValue } = reactData
      const dateTimeLabel = computeDateTimeLabel.value
      const hourList = computeHourList.value
      const hasTimeMinute = computeHasTimeMinute.value
      const minuteList = computeMinuteList.value
      const hasTimeSecond = computeHasTimeSecond.value
      const secondList = computeSecondList.value
      return [
        h('div', {
          class: 'vxe-input--time-picker-header'
        }, [
          hasTimeMinute
            ? h('span', {
              class: 'vxe-input--time-picker-title'
            }, dateTimeLabel)
            : createCommentVNode(),
          h('div', {
            class: 'vxe-input--time-picker-btn'
          }, [
            h('button', {
              class: 'vxe-input--time-picker-confirm',
              type: 'button',
              onClick: dateConfirmEvent
            }, getI18n('vxe.button.confirm'))
          ])
        ]),
        h('div', {
          ref: refInputTimeBody,
          class: 'vxe-input--time-picker-body'
        }, [
          h('ul', {
            class: 'vxe-input--time-picker-hour-list'
          }, hourList.map((item, index) => {
            return h('li', {
              key: index,
              class: {
                'is--selected': datetimePanelValue && datetimePanelValue.getHours() === item.value
              },
              onClick: (evnt: MouseEvent) => dateHourEvent(evnt, item)
            }, item.label)
          })),
          hasTimeMinute
            ? h('ul', {
              class: 'vxe-input--time-picker-minute-list'
            }, minuteList.map((item, index) => {
              return h('li', {
                key: index,
                class: {
                  'is--selected': datetimePanelValue && datetimePanelValue.getMinutes() === item.value
                },
                onClick: (evnt: MouseEvent) => dateMinuteEvent(evnt, item)
              }, item.label)
            }))
            : createCommentVNode(),
          hasTimeMinute && hasTimeSecond
            ? h('ul', {
              class: 'vxe-input--time-picker-second-list'
            }, secondList.map((item, index) => {
              return h('li', {
                key: index,
                class: {
                  'is--selected': datetimePanelValue && datetimePanelValue.getSeconds() === item.value
                },
                onClick: (evnt: MouseEvent) => dateSecondEvent(evnt, item)
              }, item.label)
            }))
            : createCommentVNode()
        ])
      ]
    }

    const renderPanel = () => {
      const { type } = props
      const { initialized, isAniVisible, visiblePanel, panelPlacement, panelStyle } = reactData
      const vSize = computeSize.value
      const btnTransfer = computeBtnTransfer.value
      const isDatePickerType = computeIsDatePickerType.value
      const renders = []
      if (isDatePickerType) {
        if (type === 'datetime') {
          renders.push(
            h('div', {
              key: type,
              ref: refPanelWrapper,
              class: 'vxe-input--panel-layout-wrapper'
            }, [
              h('div', {
                class: 'vxe-input--panel-left-wrapper'
              }, renderDatePanel()),
              h('div', {
                class: 'vxe-input--panel-right-wrapper'
              }, renderTimePanel())
            ])
          )
        } else if (type === 'time') {
          renders.push(
            h('div', {
              key: type,
              ref: refPanelWrapper,
              class: 'vxe-input--panel-wrapper'
            }, renderTimePanel())
          )
        } else {
          renders.push(
            h('div', {
              key: type || 'default',
              ref: refPanelWrapper,
              class: 'vxe-input--panel-wrapper'
            }, renderDatePanel())
          )
        }
        return h(Teleport, {
          to: 'body',
          disabled: btnTransfer ? !initialized : true
        }, [
          h('div', {
            ref: refInputPanel,
            class: ['vxe-table--ignore-clear vxe-input--panel', `type--${type}`, {
              [`size--${vSize}`]: vSize,
              'is--transfer': btnTransfer,
              'ani--leave': isAniVisible,
              'ani--enter': visiblePanel
            }],
            placement: panelPlacement,
            style: panelStyle
          }, visiblePanel || isAniVisible ? renders : [])
        ])
      }
      return createCommentVNode()
    }

    const renderNumberIcon = () => {
      const isDisabledAddNumber = computeIsDisabledAddNumber.value
      const isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value
      return h('div', {
        class: 'vxe-input--control-icon'
      }, [
        h('div', {
          class: 'vxe-input--number-icon'
        }, [
          h('div', {
            class: ['vxe-input--number-btn is--prev', {
              'is--disabled': isDisabledAddNumber
            }],
            onMousedown: numberMousedownEvent,
            onMouseup: numberStopDown,
            onMouseleave: numberStopDown
          }, [
            h('i', {
              class: getIcon().INPUT_PLUS_NUM
            })
          ]),
          h('div', {
            class: ['vxe-input--number-btn is--next', {
              'is--disabled': isDisabledSubtractNumber
            }],
            onMousedown: numberMousedownEvent,
            onMouseup: numberStopDown,
            onMouseleave: numberStopDown
          }, [
            h('i', {
              class: getIcon().INPUT_MINUS_NUM
            })
          ])
        ])
      ])
    }

    const renderDatePickerIcon = () => {
      return h('div', {
        class: 'vxe-input--control-icon',
        onClick: datePickerOpenEvent
      }, [
        h('i', {
          class: ['vxe-input--date-picker-icon', getIcon().DATE_PICKER_DATE]
        })
      ])
    }

    const renderSearchIcon = () => {
      return h('div', {
        class: 'vxe-input--control-icon',
        onClick: searchEvent
      }, [
        h('i', {
          class: ['vxe-input--search-icon', getIcon().INPUT_SEARCH]
        })
      ])
    }

    const renderPasswordIcon = () => {
      const { showPwd } = reactData
      return h('div', {
        class: 'vxe-input--control-icon',
        onClick: passwordToggleEvent
      }, [
        h('i', {
          class: ['vxe-input--password-icon', showPwd ? getIcon().PASSWORD_INPUT_SHOW_PWD : getIcon().PASSWORD_INPUT_HIDE_PWD]
        })
      ])
    }

    const renderPrefixIcon = () => {
      const { prefixIcon } = props
      const prefixOpts = computePrefixOpts.value
      const prefixSlot = slots.prefix
      const preIcon = prefixIcon || prefixOpts.icon
      const sufContent = prefixOpts.content
      return prefixSlot || preIcon || sufContent
        ? h('div', {
          class: 'vxe-input--prefix',
          onClick: clickPrefixEvent
        }, [
          h('div', {
            class: 'vxe-input--prefix-icon'
          }, prefixSlot
            ? getSlotVNs(prefixSlot({}))
            : [
                preIcon
                  ? h('i', {
                    class: preIcon
                  })
                  : renderEmptyElement($xeInput),
                sufContent
                  ? h('span', {
                    class: 'vxe-input--prefix-text'
                  }, `${sufContent}`)
                  : renderEmptyElement($xeInput)
              ])
        ])
        : renderEmptyElement($xeInput)
    }

    const renderSuffixIcon = () => {
      const { suffixIcon } = props
      const { inputValue } = reactData
      const suffixSlot = slots.suffix
      const suffixOpts = computeSuffixOpts.value
      const isDisabled = computeIsDisabled.value
      const isNumType = computeIsNumType.value
      const isDatePickerType = computeIsDatePickerType.value
      const isPawdType = computeIsPawdType.value
      const isSearchType = computeIsSearchType.value
      const isClearable = computeIsClearable.value
      const isExtraBtn = isPawdType || isNumType || isDatePickerType || isSearchType
      const sufIcon = suffixIcon || suffixOpts.icon
      const sufContent = suffixOpts.content
      return isClearable || suffixSlot || sufIcon || sufContent || isExtraBtn
        ? h('div', {
          class: ['vxe-input--suffix', {
            'is--clear': isClearable && !isDisabled && !(inputValue === '' || XEUtils.eqNull(inputValue))
          }]
        }, [
          isClearable
            ? h('div', {
              class: 'vxe-input--clear-icon',
              onClick: clearValueEvent
            }, [
              h('i', {
                class: getIcon().INPUT_CLEAR
              })
            ])
            : renderEmptyElement($xeInput),
          isExtraBtn ? renderExtraSuffixIcon() : renderEmptyElement($xeInput),
          suffixSlot || sufIcon || sufContent
            ? h('div', {
              class: 'vxe-input--suffix-icon',
              onClick: clickSuffixEvent
            }, suffixSlot
              ? getSlotVNs(suffixSlot({}))
              : [
                  sufIcon
                    ? h('i', {
                      class: sufIcon
                    })
                    : renderEmptyElement($xeInput),
                  sufContent
                    ? h('span', {
                      class: 'vxe-input--suffix-text'
                    }, `${sufContent}`)
                    : renderEmptyElement($xeInput)
                ])
            : renderEmptyElement($xeInput)
        ])
        : renderEmptyElement($xeInput)
    }

    const renderExtraSuffixIcon = () => {
      const { controls } = props
      const isNumType = computeIsNumType.value
      const isDatePickerType = computeIsDatePickerType.value
      const isPawdType = computeIsPawdType.value
      const isSearchType = computeIsSearchType.value
      if (isPawdType) {
        return renderPasswordIcon()
      }
      if (isNumType) {
        if (controls) {
          return renderNumberIcon()
        }
      }
      if (isDatePickerType) {
        return renderDatePickerIcon()
      }
      if (isSearchType) {
        return renderSearchIcon()
      }
      return createCommentVNode()
    }

    const dispatchEvent = (type: ValueOf<VxeInputEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $input: $xeInput }, params))
    }

    inputMethods = {
      dispatchEvent,

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

    Object.assign($xeInput, inputMethods)

    const renderVN = () => {
      const { className, controls, type, title, align, showWordCount, countMethod, name, autoComplete, autocomplete } = props
      const { inputValue, visiblePanel, isActivated } = reactData
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const formReadonly = computeFormReadonly.value
      if (formReadonly) {
        return h('div', {
          ref: refElem,
          class: ['vxe-input--readonly', `type--${type}`, className]
        }, inputValue)
      }
      const isCountError = computeIsCountError.value
      const inputCount = computeInputCount.value
      const inputReadonly = computeInputReadonly.value
      const inpMaxLength = computeInpMaxLength.value
      const inputType = computeInputType.value
      const inpPlaceholder = computeInpPlaceholder.value
      const isClearable = computeIsClearable.value
      const isWordCount = showWordCount && ['text', 'search'].includes(type)
      const prefix = renderPrefixIcon()
      const suffix = renderSuffixIcon()
      return h('div', {
        ref: refElem,
        class: ['vxe-input', `type--${type}`, className, {
          [`size--${vSize}`]: vSize,
          [`is--${align}`]: align,
          'is--controls': controls,
          'is--prefix': !!prefix,
          'is--suffix': !!suffix,
          'is--visible': visiblePanel,
          'is--count': isWordCount,
          'is--disabled': isDisabled,
          'is--active': isActivated,
          'show--clear': isClearable && !isDisabled && !(inputValue === '' || XEUtils.eqNull(inputValue))
        }],
        spellcheck: false
      }, [
        prefix || createCommentVNode(),
        h('div', {
          class: 'vxe-input--wrapper',
          title: title || null
        }, [
          h('input', {
            ref: refInputTarget,
            class: 'vxe-input--inner',
            value: inputValue,
            name,
            type: inputType,
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
        suffix || createCommentVNode(),
        // 下拉面板
        renderPanel(),
        // 字数统计
        isWordCount
          ? h('span', {
            class: ['vxe-input--count', {
              'is--error': isCountError
            }]
          }, countMethod ? `${countMethod({ value: inputValue })}` : `${inputCount}${inpMaxLength ? `/${inpMaxLength}` : ''}`)
          : createCommentVNode()
      ])
    }

    watch(() => props.modelValue, (val) => {
      reactData.inputValue = val
      changeValue()
    })

    watch(() => props.type, () => {
      // 切换类型是重置内置变量
      Object.assign(reactData, {
        inputValue: props.modelValue,
        datetimePanelValue: null,
        datePanelValue: null,
        datePanelLabel: '',
        datePanelType: 'day',
        selectMonth: null,
        currentDate: null
      })
      initValue()
    })

    watch(computeDateLabelFormat, () => {
      const isDatePickerType = computeIsDatePickerType.value
      if (isDatePickerType) {
        dateParseValue(reactData.datePanelValue)
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel
      }
    })

    onMounted(() => {
      const { type } = props
      if (['date', 'time', 'datetime', 'week', 'month', 'quarter', 'year'].includes(type)) {
        warnLog('vxe.error.useNew', [`<vxe-input type="${type}" ... />`, `<vxe-date-picker type="${type}" ... />`])
      } else if (['number', 'integer', 'float'].includes(type)) {
        warnLog('vxe.error.useNew', [`<vxe-input type="${type}" ... />`, `<vxe-number-input type="${type}" ... />`])
      } else if (['password'].includes(type)) {
        warnLog('vxe.error.useNew', [`<vxe-input type="${type}" ... />`, '<vxe-password-input ... />'])
      }

      const inputElem = refInputTarget.value
      if (inputElem) {
        inputElem.addEventListener('wheel', wheelEvent, { passive: false })
      }
      globalEvents.on($xeInput, 'mousewheel', handleGlobalMousewheelEvent)
      globalEvents.on($xeInput, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeInput, 'keydown', handleGlobalKeydownEvent)
      globalEvents.on($xeInput, 'blur', handleGlobalBlurEvent)
    })

    onBeforeUnmount(() => {
      numberStopDown()
      afterCheckValue()
      const inputElem = refInputTarget.value
      if (inputElem) {
        inputElem.removeEventListener('wheel', wheelEvent)
      }
      globalEvents.off($xeInput, 'mousewheel')
      globalEvents.off($xeInput, 'mousedown')
      globalEvents.off($xeInput, 'keydown')
      globalEvents.off($xeInput, 'blur')
    })

    initValue()

    $xeInput.renderVN = renderVN

    return $xeInput
  },
  render () {
    return this.renderVN()
  }
})
