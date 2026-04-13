import { h, ref, Ref, computed, reactive, nextTick, watch, PropType, VNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, getI18n, createEvent, useSize, renderEmptyElement } from '../../ui'
import { toStringTimeDate, getDateQuarter, parseDateValue, parseDateObj, handleValueFormat, hasDateValueType, hasTimestampValueType } from './util'

import type { VxeDatePanelConstructor, DatePanelInternalData, DatePanelReactData, VxeDatePanelPropTypes, DatePanelMethods, ValueOf, VxeDatePanelEmits, VxeDatePanelDefines } from '../../../types'

export default defineVxeComponent({
  name: 'VxeDatePanel',
  props: {
    modelValue: [String, Number, Date] as PropType<VxeDatePanelPropTypes.ModelValue>,
    type: {
      type: String as PropType<VxeDatePanelPropTypes.Type>,
      default: 'date'
    },
    className: String as PropType<VxeDatePanelPropTypes.ClassName>,
    size: {
      type: String as PropType<VxeDatePanelPropTypes.Size>,
      default: () => getConfig().datePanel.size || getConfig().size
    },
    multiple: Boolean as PropType<VxeDatePanelPropTypes.Multiple>,
    limitCount: {
      type: [String, Number] as PropType<VxeDatePanelPropTypes.LimitCount>,
      default: () => getConfig().datePanel.limitCount
    },

    // date、week、month、quarter、year
    startDate: {
      type: [String, Number, Date] as PropType<VxeDatePanelPropTypes.StartDate>,
      default: () => getConfig().datePanel.startDate
    },
    endDate: {
      type: [String, Number, Date] as PropType<VxeDatePanelPropTypes.EndDate>,
      default: () => getConfig().datePanel.endDate
    },
    defaultDate: [String, Number, Date] as PropType<VxeDatePanelPropTypes.DefaultDate>,
    defaultTime: [String, Number, Date] as PropType<VxeDatePanelPropTypes.DefaultTime>,
    minDate: [String, Number, Date] as PropType<VxeDatePanelPropTypes.MinDate>,
    maxDate: [String, Number, Date] as PropType<VxeDatePanelPropTypes.MaxDate>,
    startDay: {
      type: [String, Number] as PropType<VxeDatePanelPropTypes.StartDay>,
      default: () => getConfig().datePanel.startDay
    },
    labelFormat: String as PropType<VxeDatePanelPropTypes.LabelFormat>,
    valueFormat: String as PropType<VxeDatePanelPropTypes.ValueFormat>,
    timeFormat: String as PropType<VxeDatePanelPropTypes.TimeFormat>,
    festivalMethod: {
      type: Function as PropType<VxeDatePanelPropTypes.FestivalMethod>,
      default: () => getConfig().datePanel.festivalMethod
    },
    disabledMethod: {
      type: Function as PropType<VxeDatePanelPropTypes.DisabledMethod>,
      default: () => getConfig().datePanel.disabledMethod
    },

    timeConfig: Object as PropType<VxeDatePanelPropTypes.TimeConfig>,

    // week
    selectDay: {
      type: [String, Number] as PropType<VxeDatePanelPropTypes.SelectDay>,
      default: () => getConfig().datePanel.selectDay
    }
  },
  emits: [
    'update:modelValue',
    'change',
    'click',
    'clear',
    'date-prev',
    'date-today',
    'date-next',
    'confirm'
  ] as VxeDatePanelEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<DatePanelReactData>({
      visiblePanel: false,
      isAniVisible: false,
      isActivated: false,
      inputValue: '',
      inputLabel: '',
      datetimePanelValue: null,
      datePanelValue: null,
      datePanelLabel: '',
      datePanelType: 'day',
      selectMonth: null,
      currentDate: null
    })

    const internalData: DatePanelInternalData = {
      yearSize: 12,
      monthSize: 20,
      quarterSize: 8,
      hpTimeout: undefined as any
    }

    const refElem = ref() as Ref<HTMLDivElement>
    const refPanelWrapper = ref() as Ref<HTMLDivElement>
    const refInputTimeBody = ref() as Ref<HTMLDivElement>

    const refMaps = {
      refElem
    }

    const $xeDatePanel = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    } as unknown as VxeDatePanelConstructor

    const computeIsDateTimeType = computed(() => {
      const { type } = props
      return type === 'time' || type === 'datetime'
    })

    const computeIsDatePanelType = computed(() => {
      const isDateTimeType = computeIsDateTimeType.value
      return isDateTimeType || ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1
    })

    const computeDateStartTime = computed(() => {
      return props.startDate ? XEUtils.toStringDate(props.startDate) : null
    })

    const computeDateEndTime = computed(() => {
      return props.endDate ? XEUtils.toStringDate(props.endDate) : null
    })

    const computeDateListValue = computed(() => {
      const { modelValue, multiple } = props
      const isDatePanelType = computeIsDatePanelType.value
      const dateValueFormat = computeDateValueFormat.value
      if (multiple && modelValue && isDatePanelType) {
        return XEUtils.toValueString(modelValue).split(',').map(item => {
          const date = parseDate(item, dateValueFormat)
          if (XEUtils.isValidDate(date)) {
            return date
          }
          return date
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

    const computeLimitMaxCount = computed(() => {
      return props.multiple ? XEUtils.toNumber(props.limitCount) : 0
    })

    const computeOverCount = computed(() => {
      const { multiple } = props
      const limitMaxCount = computeLimitMaxCount.value
      const dateMultipleValue = computeDateMultipleValue.value
      if (multiple && limitMaxCount) {
        return dateMultipleValue.length >= limitMaxCount
      }
      return false
    })

    const computeTimeOpts = computed(() => {
      return Object.assign({}, getConfig().datePanel.timeConfig, props.timeConfig)
    })

    const computeDateValueFormat = computed(() => {
      const { type, valueFormat } = props
      return handleValueFormat(type, valueFormat)
    })

    const computeDateValue = computed(() => {
      const { modelValue } = props
      const isDatePanelType = computeIsDatePanelType.value
      const dateValueFormat = computeDateValueFormat.value
      let val = null
      if (modelValue && isDatePanelType) {
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
        return XEUtils.getWhatMonth(selectMonth, 0, 'last') >= dateEndTime
      }
      return false
    })

    const computeDateTimeLabel = computed(() => {
      const { datetimePanelValue } = reactData
      const hasTimeSecond = computeHasTimeSecond.value
      const hasTimeMinute = computeHasTimeMinute.value
      if (datetimePanelValue) {
        return XEUtils.toDateString(datetimePanelValue, hasTimeMinute && hasTimeSecond ? 'HH:mm:ss' : (hasTimeMinute ? 'HH:mm' : 'HH'))
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
      const isDatePanelType = computeIsDatePanelType.value
      if (isDatePanelType) {
        return labelFormat || getI18n(`vxe.input.date.labelFormat.${props.type}`)
      }
      return ''
    })

    const computeYearList = computed(() => {
      const { yearSize } = internalData
      const { selectMonth, currentDate } = reactData
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
      const isDatePanelType = computeIsDatePanelType.value
      let y = ''
      let m = ''
      if (isDatePanelType) {
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
      const { startDay } = props
      return XEUtils.toNumber(startDay) as VxeDatePanelPropTypes.StartDay
    })

    const computeWeekDatas = computed(() => {
      const weeks: number[] = []
      const isDatePanelType = computeIsDatePanelType.value
      if (isDatePanelType) {
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
      const isDatePanelType = computeIsDatePanelType.value
      if (isDatePanelType) {
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
      const isDatePanelType = computeIsDatePanelType.value
      if (isDatePanelType) {
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
      const { quarterSize } = internalData
      const { selectMonth, currentDate } = reactData
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
      const { monthSize } = internalData
      const { selectMonth, currentDate } = reactData
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
      const timeOpts = computeTimeOpts.value
      const { hours: hourOptions, hourDisabledMethod } = timeOpts
      const list: VxeDatePanelDefines.DateHourMinuteSecondItem[] = []
      const isDateTimeType = computeIsDateTimeType.value
      if (isDateTimeType) {
        if (hourOptions && hourOptions.length) {
          hourOptions.forEach(item => {
            if (XEUtils.isNumber(item) || XEUtils.isString(item)) {
              const hour = XEUtils.toNumber(item)
              list.push({
                value: hour,
                label: ('' + hour).padStart(2, '0'),
                disabled: !!(hourDisabledMethod && hourDisabledMethod({ hour }))
              })
            } else if (item) {
              const hour = XEUtils.toNumber(item.value)
              list.push({
                value: hour,
                label: ('' + (item.label || hour)).padStart(2, '0'),
                disabled: XEUtils.isBoolean(item.disabled) ? item.disabled : !!(hourDisabledMethod && hourDisabledMethod({ hour }))
              })
            }
          })
        } else {
          for (let index = 0; index < 24; index++) {
            const hour = index
            list.push({
              value: hour,
              label: ('' + hour).padStart(2, '0'),
              disabled: !!(hourDisabledMethod && hourDisabledMethod({ hour }))
            })
          }
        }
      }
      return list
    })

    const computeMinuteList = computed(() => {
      const timeOpts = computeTimeOpts.value
      const { minutes: minuteOptions, minuteDisabledMethod } = timeOpts
      const list: VxeDatePanelDefines.DateHourMinuteSecondItem[] = []
      const isDateTimeType = computeIsDateTimeType.value
      if (isDateTimeType) {
        if (minuteOptions && minuteOptions.length) {
          minuteOptions.forEach(item => {
            if (XEUtils.isNumber(item) || XEUtils.isString(item)) {
              const minute = XEUtils.toNumber(item)
              list.push({
                value: minute,
                label: ('' + minute).padStart(2, '0'),
                disabled: !!(minuteDisabledMethod && minuteDisabledMethod({ minute }))
              })
            } else if (item) {
              const minute = XEUtils.toNumber(item.value)
              list.push({
                value: minute,
                label: ('' + (item.label || minute)).padStart(2, '0'),
                disabled: XEUtils.isBoolean(item.disabled) ? item.disabled : !!(minuteDisabledMethod && minuteDisabledMethod({ minute }))
              })
            }
          })
        } else {
          for (let index = 0; index < 60; index++) {
            const minute = index
            list.push({
              value: minute,
              label: ('' + minute).padStart(2, '0'),
              disabled: !!(minuteDisabledMethod && minuteDisabledMethod({ minute }))
            })
          }
        }
      }
      return list
    })

    const computeHasTimeMinute = computed(() => {
      const { timeFormat } = props
      const dateValueFormat = computeDateValueFormat.value
      return !/HH/.test(timeFormat || dateValueFormat) || /mm/.test(timeFormat || dateValueFormat)
    })

    const computeHasTimeSecond = computed(() => {
      const { timeFormat } = props
      const dateValueFormat = computeDateValueFormat.value
      return !/HH/.test(timeFormat || dateValueFormat) || /ss/.test(timeFormat || dateValueFormat)
    })

    const computeSecondList = computed(() => {
      const timeOpts = computeTimeOpts.value
      const { seconds: secondOptions, secondDisabledMethod } = timeOpts
      const list: VxeDatePanelDefines.DateHourMinuteSecondItem[] = []
      const isDateTimeType = computeIsDateTimeType.value
      if (isDateTimeType) {
        if (secondOptions && secondOptions.length) {
          secondOptions.forEach(item => {
            if (XEUtils.isNumber(item) || XEUtils.isString(item)) {
              const second = XEUtils.toNumber(item)
              list.push({
                value: second,
                label: ('' + second).padStart(2, '0'),
                disabled: !!(secondDisabledMethod && secondDisabledMethod({ second }))
              })
            } else if (item) {
              const second = XEUtils.toNumber(item.value)
              list.push({
                value: second,
                label: ('' + (item.label || second)).padStart(2, '0'),
                disabled: XEUtils.isBoolean(item.disabled) ? item.disabled : !!(secondDisabledMethod && secondDisabledMethod({ second }))
              })
            }
          })
        } else {
          for (let index = 0; index < 60; index++) {
            const second = index
            list.push({
              value: second,
              label: ('' + second).padStart(2, '0'),
              disabled: !!(secondDisabledMethod && secondDisabledMethod({ second }))
            })
          }
        }
      }
      return list
    })

    const updateModelValue = (modelValue: VxeDatePanelPropTypes.ModelValue | undefined) => {
      const { type } = props
      const dateValueFormat = computeDateValueFormat.value
      const inpDate = parseDateValue(modelValue, type, { valueFormat: dateValueFormat })
      reactData.inputValue = inpDate
      reactData.inputLabel = inpDate
      dateOpenPanel()
    }

    const parseDate = (value: VxeDatePanelPropTypes.ModelValue, format: string) => {
      const { type, multiple } = props
      if (type === 'time') {
        return toStringTimeDate(value)
      }
      if (XEUtils.isArray(value)) {
        return XEUtils.toStringDate(value[0], format)
      }
      if (XEUtils.isString(value)) {
        return XEUtils.toStringDate(multiple ? XEUtils.last(value.split(',')) : value, format)
      }
      return XEUtils.toStringDate(value, format)
    }

    const dateRevert = () => {
      reactData.inputLabel = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel
    }

    const afterCheckValue = (inpVal: string) => {
      const { type } = props
      const { inputLabel, datetimePanelValue } = reactData
      const dateLabelFormat = computeDateLabelFormat.value
      if (inpVal) {
        let inpDateVal: VxeDatePanelPropTypes.ModelValue = parseDate(inpVal, dateLabelFormat as string)
        if (XEUtils.isValidDate(inpDateVal)) {
          if (type === 'time') {
            inpDateVal = XEUtils.toDateString(inpDateVal, dateLabelFormat)
            if (inputLabel !== inpDateVal) {
              handleChange(inpDateVal, { type: 'check' })
            }
            reactData.inputLabel = inpDateVal
          } else {
            let isChange = false
            const firstDayOfWeek = computeFirstDayOfWeek.value
            if (type === 'datetime') {
              const dateValue = computeDateValue.value
              if (inpVal !== XEUtils.toDateString(dateValue, dateLabelFormat) || inpVal !== XEUtils.toDateString(inpDateVal, dateLabelFormat)) {
                isChange = true
                if (datetimePanelValue) {
                  datetimePanelValue.setHours(inpDateVal.getHours())
                  datetimePanelValue.setMinutes(inpDateVal.getMinutes())
                  datetimePanelValue.setSeconds(inpDateVal.getSeconds())
                }
              }
            } else {
              isChange = true
            }
            reactData.inputLabel = XEUtils.toDateString(inpDateVal, dateLabelFormat, { firstDay: firstDayOfWeek })
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

    const emitModel = (value: any) => {
      reactData.inputValue = value
      emit('update:modelValue', value)
    }

    const handleChange = (value: string, evnt: Event | { type: string }) => {
      const { type, modelValue, valueFormat } = props
      const dateValueFormat = computeDateValueFormat.value
      reactData.inputLabel = value
      if (hasTimestampValueType(valueFormat)) {
        const dateVal = parseDateValue(value, type, { valueFormat: dateValueFormat })
        const timeNum = dateVal ? dateVal.getTime() : null
        emitModel(timeNum)
        if (modelValue !== timeNum) {
          dispatchEvent('change', { value: timeNum }, evnt as Event)
        }
      } else if (hasDateValueType(valueFormat)) {
        const dateVal = parseDateValue(value, type, { valueFormat: dateValueFormat })
        emitModel(dateVal)
        if (modelValue && dateVal ? XEUtils.toStringDate(modelValue).getTime() !== dateVal.getTime() : modelValue !== dateVal) {
          dispatchEvent('change', { value: dateVal }, evnt as Event)
        }
      } else {
        emitModel(value)
        if (XEUtils.toValueString(modelValue) !== value) {
          dispatchEvent('change', { value }, evnt as Event)
        }
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

    const dateParseValue = (val?: VxeDatePanelPropTypes.ModelValue) => {
      const { type } = props
      const dateLabelFormat = computeDateLabelFormat.value
      const dateValueFormat = computeDateValueFormat.value
      const firstDayOfWeek = computeFirstDayOfWeek.value
      const dateObj = parseDateObj(val, type, {
        valueFormat: dateValueFormat,
        labelFormat: dateLabelFormat,
        firstDay: firstDayOfWeek
      })
      reactData.datePanelValue = dateObj.value
      reactData.datePanelLabel = dateObj.label
    }

    /**
     * 值变化时处理
     */
    const changeValue = () => {
      const isDatePanelType = computeIsDatePanelType.value
      const { inputLabel } = reactData
      if (isDatePanelType) {
        dateParseValue(inputLabel)
        reactData.inputLabel = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel
      }
    }

    /**
     * 检查初始值
     */
    const initValue = () => {
      const { modelValue } = props
      const isDatePanelType = computeIsDatePanelType.value
      updateModelValue(modelValue)
      if (isDatePanelType) {
        changeValue()
      }
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

    const dateChange = (date: Date, isReload?: boolean) => {
      const { modelValue, multiple } = props
      const { datetimePanelValue } = reactData
      const isDateTimeType = computeIsDateTimeType.value
      const dateValueFormat = computeDateValueFormat.value
      const firstDayOfWeek = computeFirstDayOfWeek.value
      if (props.type === 'week') {
        const sWeek = XEUtils.toNumber(props.selectDay) as VxeDatePanelPropTypes.SelectDay
        date = XEUtils.getWhatWeek(date, 0, sWeek, firstDayOfWeek)
      } else if (isDateTimeType) {
        if (datetimePanelValue) {
          date.setHours(datetimePanelValue.getHours())
          date.setMinutes(datetimePanelValue.getMinutes())
          date.setSeconds(datetimePanelValue.getSeconds())
        }
      }
      const inpVal = XEUtils.toDateString(date, dateValueFormat, { firstDay: firstDayOfWeek })
      dateCheckMonth(date)
      if (multiple) {
        const overCount = computeOverCount.value
        // 如果为多选
        if (isDateTimeType) {
          // 如果是datetime特殊类型
          const dateListValue = isReload ? [] : [...computeDateListValue.value]
          const datetimeRest: Date[] = []
          const eqIndex = XEUtils.findIndexOf(dateListValue, val => XEUtils.isDateSame(date, val, 'yyyyMMdd'))
          if (eqIndex === -1) {
            if (overCount) {
              // 如果超出最大多选数量
              return
            }
            dateListValue.push(date)
          } else {
            dateListValue.splice(eqIndex, 1)
          }
          dateListValue.forEach(item => {
            if (item) {
              if (datetimePanelValue) {
                item.setHours(datetimePanelValue.getHours())
                item.setMinutes(datetimePanelValue.getMinutes())
                item.setSeconds(datetimePanelValue.getSeconds())
              }
              datetimeRest.push(item)
            }
          })
          handleChange(datetimeRest.map(date => XEUtils.toDateString(date, dateValueFormat)).join(','), { type: 'update' })
        } else {
          const dateMultipleValue = isReload ? [] : computeDateMultipleValue.value
          // 如果是日期类型
          if (dateMultipleValue.some(val => XEUtils.isEqual(val, inpVal))) {
            handleChange(dateMultipleValue.filter(val => !XEUtils.isEqual(val, inpVal)).join(','), { type: 'update' })
          } else {
            if (overCount) {
              // 如果超出最大多选数量
              return
            }
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

    // 日期
    const dateMonthHandle = (date: Date, offsetMonth: number) => {
      const firstDayOfWeek = computeFirstDayOfWeek.value
      const weekNum = XEUtils.getYearWeek(date, firstDayOfWeek)
      const weekStartDate = XEUtils.getWhatWeek(date, 0, firstDayOfWeek, firstDayOfWeek)
      const month = XEUtils.getWhatMonth(weekNum === 1 ? XEUtils.getWhatDay(weekStartDate, 6) : date, offsetMonth, 'first')
      reactData.selectMonth = month
    }

    const dateNowHandle = () => {
      const { type } = props
      const firstDayOfWeek = computeFirstDayOfWeek.value
      let currentDate = new Date()
      switch (type) {
        case 'week':
          currentDate = XEUtils.getWhatWeek(currentDate, 0, firstDayOfWeek)
          break
        case 'datetime':
          currentDate = new Date()
          reactData.datetimePanelValue = new Date()
          break
        default:
          currentDate = XEUtils.getWhatDay(Date.now(), 0, 'first')
          break
      }
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
      const { datePanelType, selectMonth, inputLabel } = reactData
      const { yearSize } = internalData
      const value = inputLabel
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
        dispatchEvent('date-prev', { viewType: datePanelType, viewDate, value, type }, evnt)
      }
    }

    const dateTodayMonthEvent = (evnt: Event) => {
      dateNowHandle()
      dateChange(reactData.currentDate, true)
      if (!props.multiple) {
        hidePanel()
      }
      dispatchEvent('date-today', { type: props.type }, evnt)
    }

    const dateNextEvent = (evnt: Event) => {
      const { type } = props
      const { datePanelType, selectMonth, inputLabel } = reactData
      const { yearSize } = internalData
      const value = inputLabel
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
        dispatchEvent('date-next', { viewType: datePanelType, value, type }, evnt)
      }
    }

    const isRangeDisabled = (item: { date: Date }) => {
      const dateStartTime = computeDateStartTime.value
      const dateEndTime = computeDateEndTime.value
      const { date } = item
      if (dateStartTime && dateStartTime.getTime() > date.getTime()) {
        return true
      }
      if (dateEndTime && dateEndTime.getTime() < date.getTime()) {
        return true
      }
      return false
    }

    const isDateDisabled = (item: { date: Date }) => {
      const { disabledMethod } = props
      const { datePanelType } = reactData
      const { date } = item
      if (disabledMethod) {
        return disabledMethod({ type: datePanelType, viewType: datePanelType, date, $datePanel: $xeDatePanel })
      }
      return false
    }

    const hasAllDisabled = (item: { date: Date }) => {
      return isRangeDisabled(item) || isDateDisabled(item)
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
      if (!hasAllDisabled(item)) {
        dateSelectItem(item.date)
      }
    }

    const dateMoveDay = (offsetDay: Date) => {
      if (!hasAllDisabled({ date: offsetDay })) {
        const dayList = computeDayList.value
        if (!dayList.some((item) => XEUtils.isDateSame(item.date, offsetDay, 'yyyyMMdd'))) {
          dateCheckMonth(offsetDay)
        }
        dateParseValue(offsetDay)
      }
    }

    const dateMoveYear = (offsetYear: Date) => {
      if (!hasAllDisabled({ date: offsetYear })) {
        const yearList = computeYearList.value
        if (!yearList.some((item) => XEUtils.isDateSame(item.date, offsetYear, 'yyyy'))) {
          dateCheckMonth(offsetYear)
        }
        dateParseValue(offsetYear)
      }
    }

    const dateMoveQuarter = (offsetQuarter: Date) => {
      if (!hasAllDisabled({ date: offsetQuarter })) {
        const quarterList = computeQuarterList.value
        if (!quarterList.some((item) => XEUtils.isDateSame(item.date, offsetQuarter, 'yyyyq'))) {
          dateCheckMonth(offsetQuarter)
        }
        dateParseValue(offsetQuarter)
      }
    }

    const dateMoveMonth = (offsetMonth: Date) => {
      if (!hasAllDisabled({ date: offsetMonth })) {
        const monthList = computeMonthList.value
        if (!monthList.some((item) => XEUtils.isDateSame(item.date, offsetMonth, 'yyyyMM'))) {
          dateCheckMonth(offsetMonth)
        }
        dateParseValue(offsetMonth)
      }
    }

    const dateMouseenterEvent = (item: VxeDatePanelDefines.DateYearItem | VxeDatePanelDefines.DateQuarterItem | VxeDatePanelDefines.DateMonthItem | VxeDatePanelDefines.DateDayItem) => {
      if (!hasAllDisabled(item)) {
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

    const dateMouseleaveEvent = () => {
      reactData.datePanelValue = null
    }

    const updateTimePos = (liElem: Element) => {
      if (liElem) {
        const height = (liElem as HTMLElement).offsetHeight
        const ulElem = liElem.parentNode as HTMLElement
        ulElem.scrollTop = (liElem as HTMLElement).offsetTop - height * 4
      }
    }

    const dateTimeChangeEvent = (evnt: Event) => {
      const { datetimePanelValue } = reactData
      reactData.datetimePanelValue = datetimePanelValue ? new Date(datetimePanelValue.getTime()) : new Date()
      updateTimePos(evnt.currentTarget as HTMLLIElement)
    }

    const dateHourEvent = (evnt: MouseEvent, item: VxeDatePanelDefines.DateHourMinuteSecondItem) => {
      const { datetimePanelValue } = reactData
      if (!item.disabled) {
        if (datetimePanelValue) {
          datetimePanelValue.setHours(item.value)
        }
        dateTimeChangeEvent(evnt)
      }
    }

    const dateConfirmEvent = (evnt: Event) => {
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
                if (datetimePanelValue) {
                  item.setHours(datetimePanelValue.getHours())
                  item.setMinutes(datetimePanelValue.getMinutes())
                  item.setSeconds(datetimePanelValue.getSeconds())
                }
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
      dispatchEvent('confirm', {}, evnt)
    }

    const dateMinuteEvent = (evnt: MouseEvent, item: VxeDatePanelDefines.DateHourMinuteSecondItem) => {
      const { datetimePanelValue } = reactData
      if (!item.disabled) {
        if (datetimePanelValue) {
          datetimePanelValue.setMinutes(item.value)
        }
        dateTimeChangeEvent(evnt)
      }
    }

    const dateSecondEvent = (evnt: MouseEvent, item: VxeDatePanelDefines.DateHourMinuteSecondItem) => {
      const { datetimePanelValue } = reactData
      if (!item.disabled) {
        if (datetimePanelValue) {
          datetimePanelValue.setSeconds(item.value)
        }
        dateTimeChangeEvent(evnt)
      }
    }

    const dateOpenPanel = () => {
      const { type, defaultDate, defaultTime } = props
      const isDateTimeType = computeIsDateTimeType.value
      const dateValue = computeDateValue.value
      if (['year', 'quarter', 'month', 'week'].indexOf(type) > -1) {
        reactData.datePanelType = type as VxeDatePanelDefines.DatePanelType
      } else {
        reactData.datePanelType = 'day'
      }
      reactData.currentDate = XEUtils.getWhatDay(Date.now(), 0, 'first')
      if (dateValue) {
        dateMonthHandle(dateValue, 0)
        dateParseValue(dateValue)
      } else {
        if (defaultDate) {
          // 面板默认日期仅支持解析 yyyy-MM-dd
          const defDate = parseDate(defaultDate, 'yyyy-MM-dd')
          if (XEUtils.isValidDate(defDate)) {
            dateMonthHandle(defDate, 0)
          } else {
            dateNowHandle()
          }
        } else {
          dateNowHandle()
        }
      }
      if (isDateTimeType) {
        let dtPanelValue = reactData.datePanelValue
        if (!dtPanelValue) {
          dtPanelValue = XEUtils.getWhatDay(Date.now(), 0, 'first')
          if (defaultTime) {
            const defTime = toStringTimeDate(defaultTime)
            if (XEUtils.isValidDate(defTime)) {
              dtPanelValue.setHours(defTime.getHours())
              dtPanelValue.setMinutes(defTime.getMinutes())
              dtPanelValue.setSeconds(defTime.getSeconds())
            }
          }
        }
        reactData.datetimePanelValue = dtPanelValue
        nextTick(() => {
          const timeBodyElem = refInputTimeBody.value
          XEUtils.arrayEach(timeBodyElem.querySelectorAll('li.is--selected'), (elem) => {
            updateTimePos(elem)
          })
        })
      }
    }

    const dispatchEvent = (type: ValueOf<VxeDatePanelEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $datePanel: $xeDatePanel }, params))
    }

    const datePanelMethods: DatePanelMethods = {
      dispatchEvent,

      getModelValue () {
        return reactData.inputValue
      },
      setPanelDate (date) {
        if (date) {
          dateCheckMonth(date)
        }
      },
      getPanelDate () {
        return reactData.selectMonth
      },
      checkValue (value) {
        afterCheckValue(value)
      },
      confirmByEvent (evnt) {
        dateConfirmEvent(evnt)
      }
    }

    Object.assign($xeDatePanel, datePanelMethods)

    const renderDateLabel = (item: VxeDatePanelDefines.DateYearItem | VxeDatePanelDefines.DateQuarterItem | VxeDatePanelDefines.DateMonthItem | VxeDatePanelDefines.DateDayItem, label: string | number) => {
      const { festivalMethod } = props
      const labelVNs: VNode[] = []
      if (festivalMethod) {
        const { datePanelType } = reactData
        const festivalRest = festivalMethod({ type: datePanelType, viewType: datePanelType, date: item.date, $datePanel: $xeDatePanel })
        const festivalItem = festivalRest ? (XEUtils.isString(festivalRest) ? { label: festivalRest } : festivalRest) : {}
        const extraItem = festivalItem.extra ? (XEUtils.isString(festivalItem.extra) ? { label: festivalItem.extra } : festivalItem.extra) : null
        labelVNs.push(
          h('div', {
            class: ['vxe-date-panel--label', {
              'is-notice': festivalItem.notice
            }]
          }, extraItem && extraItem.label
            ? [
                h('div', {
                  class: 'vxe-date-panel--label--number'
                }, `${label}`),
                h('div', {
                  class: ['vxe-date-panel--label--extra', extraItem.important ? 'is-important' : '', extraItem.className],
                  style: extraItem.style
                }, XEUtils.toValueString(extraItem.label))
              ]
            : `${label}`)
        )
        const festivalLabel = festivalItem.label
        if (festivalLabel) {
          // 默认最多支持3个节日重叠
          const festivalLabels = XEUtils.toValueString(festivalLabel).split(',')
          labelVNs.push(
            h('div', {
              class: ['vxe-date-panel--festival', festivalItem.important ? 'is-important' : '', festivalItem.className],
              style: festivalItem.style
            }, [
              festivalLabels.length > 1
                ? h('div', {
                  class: ['vxe-date-panel--festival--overlap', `overlap--${festivalLabels.length}`]
                }, festivalLabels.map(label => h('div', label.substring(0, 3))))
                : h('div', {
                  class: 'vxe-date-panel--festival--label'
                }, festivalLabels[0].substring(0, 3))
            ])
          )
        }
      }
      return labelVNs
    }

    const renderDateDayTable = () => {
      const { multiple } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const dateHeaders = computeDateHeaders.value
      const dayDatas = computeDayDatas.value
      const dateListValue = computeDateListValue.value
      const overCount = computeOverCount.value
      const matchFormat = 'yyyyMMdd'
      return [
        h('div', {
          class: ['vxe-date-panel--view-wrapper', `type--${datePanelType}`]
        }, [
          h('div', {
            class: 'vxe-date-panel--view-header'
          }, [
            h('div', {
              class: 'vxe-date-panel--view-row'
            }, dateHeaders.map((item) => {
              return h('div', {
                class: 'vxe-date-panel--view-item',
                style: {
                  width: `${100 / dateHeaders.length}%`
                }
              }, [
                h('div', {
                  class: 'vxe-date-panel--view-item-inner'
                }, [
                  h('div', {
                    class: 'vxe-date-panel--view-item-label'
                  }, item.label)
                ])
              ])
            }))
          ]),
          h('div', {
            class: 'vxe-date-panel--view-body'
          }, dayDatas.map((rows) => {
            return h('div', {
              class: 'vxe-date-panel--view-row',
              style: {
                height: `${100 / dayDatas.length}%`
              }
            }, rows.map((item) => {
              const isSelected = multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat)
              return h('div', {
                class: ['vxe-date-panel--view-item', {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--range-disabled': isRangeDisabled(item),
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--over': overCount && !isSelected,
                  'is--hover': !overCount && XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                }],
                style: {
                  width: `${100 / rows.length}%`
                },
                onClick: () => dateSelectEvent(item),
                onMouseenter: () => dateMouseenterEvent(item),
                onMouseleave: dateMouseleaveEvent
              }, [
                h('div', {
                  class: 'vxe-date-panel--view-item-inner'
                }, renderDateLabel(item, item.label))
              ])
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
      const overCount = computeOverCount.value
      const matchFormat = 'yyyyMMdd'
      return [
        h('div', {
          class: ['vxe-date-panel--view-wrapper', `type--${datePanelType}`]
        }, [
          h('div', {
            class: 'vxe-date-panel--view-header'
          }, [
            h('div', {
              class: 'vxe-date-panel--view-row'
            }, weekHeaders.map((item, rIndex) => {
              return h('div', {
                class: 'vxe-date-panel--view-item',
                style: {
                  width: `${rIndex ? 13 : 9}%`
                }
              }, [
                h('div', {
                  class: 'vxe-date-panel--view-item-inner'
                }, [
                  h('div', {
                    class: 'vxe-date-panel--view-item-label'
                  }, item.label)
                ])
              ])
            }))
          ]),
          h('div', {
            class: 'vxe-date-panel--view-body'
          }, weekDates.map((rows) => {
            const isSelected = multiple ? rows.some((item) => dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat))) : rows.some((item) => XEUtils.isDateSame(dateValue, item.date, matchFormat))
            const isHover = rows.some((item) => XEUtils.isDateSame(datePanelValue, item.date, matchFormat))
            const isNowWeek = rows.some(item => item.isNow)
            return h('div', {
              class: 'vxe-date-panel--view-row',
              style: {
                height: `${100 / weekDates.length}%`
              }
            }, rows.map((item, rIndex) => {
              return h('div', {
                class: ['vxe-date-panel--view-item', {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': rIndex ? item.isNow : isNowWeek,
                  'is--next': item.isNext,
                  'is--range-disabled': isRangeDisabled(item),
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--over': overCount && !isSelected,
                  'is--hover': !overCount && isHover
                }],
                style: {
                  width: `${rIndex ? 13 : 9}%`
                },
                onClick: () => dateSelectEvent(item),
                onMouseenter: () => dateMouseenterEvent(item),
                onMouseleave: dateMouseleaveEvent
              }, [
                h('div', {
                  class: 'vxe-date-panel--view-item-inner'
                }, renderDateLabel(item, item.label))
              ])
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
      const overCount = computeOverCount.value
      const matchFormat = 'yyyyMM'
      return [
        h('div', {
          class: ['vxe-date-panel--view-wrapper', `type--${datePanelType}`]
        }, [
          h('div', {
            class: 'vxe-date-panel--view-body'
          }, monthDatas.map((rows) => {
            return h('div', {
              class: 'vxe-date-panel--view-row',
              style: {
                height: `${100 / monthDatas.length}%`
              }
            }, rows.map((item) => {
              const isSelected = multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat)
              return h('div', {
                class: ['vxe-date-panel--view-item', {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--range-disabled': isRangeDisabled(item),
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--over': overCount && !isSelected,
                  'is--hover': !overCount && XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                }],
                style: {
                  width: `${100 / rows.length}%`
                },
                onClick: () => dateSelectEvent(item),
                onMouseenter: () => dateMouseenterEvent(item),
                onMouseleave: dateMouseleaveEvent
              }, [
                h('div', {
                  class: 'vxe-date-panel--view-item-inner'
                }, renderDateLabel(item, getI18n(`vxe.input.date.months.m${item.month}`)))
              ])
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
      const overCount = computeOverCount.value
      const matchFormat = 'yyyyq'
      return [
        h('div', {
          class: ['vxe-date-panel--view-wrapper', `type--${datePanelType}`]
        }, [
          h('div', {
            class: 'vxe-date-panel--view-body'
          }, quarterDatas.map((rows) => {
            return h('div', {
              class: 'vxe-date-panel--view-row',
              style: {
                height: `${100 / quarterDatas.length}%`
              }
            }, rows.map((item) => {
              const isSelected = multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat)
              return h('div', {
                class: ['vxe-date-panel--view-item', {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--range-disabled': isRangeDisabled(item),
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--over': overCount && !isSelected,
                  'is--hover': !overCount && XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                }],
                style: {
                  width: `${100 / rows.length}%`
                },
                onClick: () => dateSelectEvent(item),
                onMouseenter: () => dateMouseenterEvent(item),
                onMouseleave: dateMouseleaveEvent
              }, [
                h('div', {
                  class: 'vxe-date-panel--view-item-inner'
                }, renderDateLabel(item, getI18n(`vxe.input.date.quarters.q${item.quarter}`)))
              ])
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
      const overCount = computeOverCount.value
      const matchFormat = 'yyyy'
      return [
        h('div', {
          class: ['vxe-date-panel--view-wrapper', `type--${datePanelType}`]
        }, [
          h('div', {
            class: 'vxe-date-panel--view-body'
          }, yearDatas.map((rows) => {
            return h('div', {
              class: 'vxe-date-panel--view-row',
              style: {
                height: `${100 / yearDatas.length}%`
              }
            }, rows.map((item) => {
              const isSelected = multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat)
              return h('div', {
                class: ['vxe-date-panel--view-item', {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--range-disabled': isRangeDisabled(item),
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--over': overCount && !isSelected,
                  'is--hover': !overCount && XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                }],
                style: {
                  width: `${100 / rows.length}%`
                },
                onClick: () => dateSelectEvent(item),
                onMouseenter: () => dateMouseenterEvent(item),
                onMouseleave: dateMouseleaveEvent
              }, [
                h('div', {
                  class: 'vxe-date-panel--view-item-inner'
                }, renderDateLabel(item, item.year))
              ])
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
      const { datePanelType } = reactData
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value
      const selectDatePanelObj = computeSelectDatePanelObj.value
      return [
        h('div', {
          class: 'vxe-date-panel--picker-header'
        }, [
          h('div', {
            class: 'vxe-date-panel--picker-type-wrapper'
          }, [
            datePanelType === 'year'
              ? h('span', {
                class: 'vxe-date-panel--picker-label'
              }, selectDatePanelObj.y)
              : h('span', {
                class: 'vxe-date-panel--picker-btns'
              }, [
                h('span', {
                  class: 'vxe-date-panel--picker-btn',
                  onClick: dateToggleYearTypeEvent
                }, selectDatePanelObj.y),
                selectDatePanelObj.m
                  ? h('span', {
                    class: 'vxe-date-panel--picker-btn',
                    onClick: dateToggleMonthTypeEvent
                  }, selectDatePanelObj.m)
                  : renderEmptyElement($xeDatePanel)
              ])
          ]),
          h('div', {
            class: 'vxe-date-panel--picker-btn-wrapper'
          }, [
            h('span', {
              class: ['vxe-date-panel--picker-btn vxe-date-panel--picker-prev-btn', {
                'is--disabled': isDisabledPrevDateBtn
              }],
              onClick: datePrevEvent
            }, [
              h('i', {
                class: 'vxe-icon-caret-left'
              })
            ]),
            h('span', {
              class: 'vxe-date-panel--picker-btn vxe-date-panel--picker-current-btn',
              onClick: dateTodayMonthEvent
            }, [
              h('i', {
                class: 'vxe-icon-dot'
              })
            ]),
            h('span', {
              class: ['vxe-date-panel--picker-btn vxe-date-panel--picker-next-btn', {
                'is--disabled': isDisabledNextDateBtn
              }],
              onClick: dateNextEvent
            }, [
              h('i', {
                class: 'vxe-icon-caret-right'
              })
            ])
          ])
        ]),
        h('div', {
          class: 'vxe-date-panel--picker-body'
        }, renderDateTable())
      ]
    }

    const renderTimePanel = () => {
      const { type } = props
      const { datetimePanelValue } = reactData
      const dateTimeLabel = computeDateTimeLabel.value
      const hourList = computeHourList.value
      const hasTimeMinute = computeHasTimeMinute.value
      const minuteList = computeMinuteList.value
      const hasTimeSecond = computeHasTimeSecond.value
      const secondList = computeSecondList.value
      return [
        type === 'time'
          ? renderEmptyElement($xeDatePanel)
          : h('div', {
            class: 'vxe-date-panel--time-header'
          }, [
            h('div', {
              class: 'vxe-date-panel--time-title'
            }, dateTimeLabel)
          ]),
        h('div', {
          ref: refInputTimeBody,
          class: 'vxe-date-panel--time-body'
        }, [
          h('ul', {
            class: 'vxe-date-panel--time-hour-list'
          }, hourList.map((item, index) => {
            return h('li', {
              key: index,
              class: {
                'is--disabled': item.disabled,
                'is--selected': datetimePanelValue && datetimePanelValue.getHours() === item.value
              },
              onClick: (evnt: MouseEvent) => dateHourEvent(evnt, item)
            }, item.label)
          })),
          hasTimeMinute
            ? h('ul', {
              class: 'vxe-date-panel--time-minute-list'
            }, minuteList.map((item, index) => {
              return h('li', {
                key: index,
                class: {
                  'is--disabled': item.disabled,
                  'is--selected': datetimePanelValue && datetimePanelValue.getMinutes() === item.value
                },
                onClick: (evnt: MouseEvent) => dateMinuteEvent(evnt, item)
              }, item.label)
            }))
            : renderEmptyElement($xeDatePanel),
          hasTimeMinute && hasTimeSecond
            ? h('ul', {
              class: 'vxe-date-panel--time-second-list'
            }, secondList.map((item, index) => {
              return h('li', {
                key: index,
                class: {
                  'is--disabled': item.disabled,
                  'is--selected': datetimePanelValue && datetimePanelValue.getSeconds() === item.value
                },
                onClick: (evnt: MouseEvent) => dateSecondEvent(evnt, item)
              }, item.label)
            }))
            : renderEmptyElement($xeDatePanel)
        ])
      ]
    }

    const renderPickerPanel = () => {
      const { type } = props
      if (type === 'datetime') {
        return h('div', {
          key: type,
          ref: refPanelWrapper,
          class: 'vxe-date-panel--time-layout-wrapper'
        }, [
          h('div', {
            class: 'vxe-date-panel--time-left-wrapper'
          }, renderDatePanel()),
          h('div', {
            class: 'vxe-date-panel--time-right-wrapper'
          }, renderTimePanel())
        ])
      } else if (type === 'time') {
        return h('div', {
          key: type,
          ref: refPanelWrapper,
          class: 'vxe-date-panel--wrapper'
        }, renderTimePanel())
      }
      return h('div', {
        key: type || 'default',
        ref: refPanelWrapper,
        class: 'vxe-date-panel--wrapper'
      }, renderDatePanel())
    }

    const renderVN = () => {
      const { type } = props
      const vSize = computeSize.value
      return h('div', {
        class: ['vxe-date-panel', `type--${type}`, {
          [`size--${vSize}`]: vSize
        }]
      }, [
        renderPickerPanel()
      ])
    }

    watch(() => props.modelValue, (val) => {
      updateModelValue(val)
      changeValue()
    })

    watch(() => props.type, () => {
      // 切换类型是重置内置变量
      Object.assign(reactData, {
        inputLabel: '',
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
      const isDatePanelType = computeIsDatePanelType.value
      if (isDatePanelType) {
        dateParseValue(reactData.datePanelValue)
        reactData.inputLabel = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel
      }
    })

    initValue()
    dateOpenPanel()

    $xeDatePanel.renderVN = renderVN

    return $xeDatePanel
  },
  render () {
    return this.renderVN()
  }
})
