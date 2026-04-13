import { h, ref, Ref, computed, reactive, watch, PropType, onMounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI, createEvent, useSize, renderEmptyElement } from '../../ui'
import { getDateQuarter } from '../../date-panel/src/util'
import { toCssUnit } from '../../ui/src/dom'
import { isEnableConf } from '../../ui/src/utils'
import { errLog } from '../../ui/src/log'
import VxeButtonComponent from '../../button/src/button'
import XEUtils from 'xe-utils'

import type { VxeCalendarConstructor, VxeCalendarEmits, CalendarInternalData, CalendarReactData, CalendarMethods, VxeCalendarPropTypes, CalendarPrivateRef, VxeDatePanelDefines, ValueOf } from '../../../types'

const { menus, getConfig, getI18n } = VxeUI

export default defineVxeComponent({
  name: 'VxeCalendar',
  props: {
    modelValue: [String, Number, Date] as PropType<VxeCalendarPropTypes.ModelValue>,
    type: {
      type: String as PropType<VxeCalendarPropTypes.Type>,
      default: 'date'
    },
    className: String as PropType<VxeCalendarPropTypes.ClassName>,
    size: {
      type: String as PropType<VxeCalendarPropTypes.Size>,
      default: () => getConfig().calendar.size || getConfig().size
    },
    multiple: Boolean as PropType<VxeCalendarPropTypes.Multiple>,

    width: [String, Number] as PropType<VxeCalendarPropTypes.Width>,
    height: [String, Number] as PropType<VxeCalendarPropTypes.Height>,

    // date、week、month、quarter、year
    minDate: {
      type: [String, Number, Date] as PropType<VxeCalendarPropTypes.MinDate>,
      default: () => getConfig().calendar.minDate
    },
    maxDate: {
      type: [String, Number, Date] as PropType<VxeCalendarPropTypes.MaxDate>,
      default: () => getConfig().calendar.maxDate
    },
    startDay: {
      type: [String, Number] as PropType<VxeCalendarPropTypes.StartDay>,
      default: () => getConfig().calendar.startDay
    },
    labelFormat: String as PropType<VxeCalendarPropTypes.LabelFormat>,
    valueFormat: String as PropType<VxeCalendarPropTypes.ValueFormat>,
    festivalMethod: {
      type: Function as PropType<VxeCalendarPropTypes.FestivalMethod>,
      default: () => getConfig().calendar.festivalMethod
    },
    disabledMethod: {
      type: Function as PropType<VxeCalendarPropTypes.DisabledMethod>,
      default: () => getConfig().calendar.disabledMethod
    },
    cellStyle: [Object, Function] as PropType<VxeCalendarPropTypes.CellStyle>,
    menuConfig: Object as PropType<VxeCalendarPropTypes.MenuConfig>,

    // week
    selectDay: {
      type: [String, Number] as PropType<VxeCalendarPropTypes.SelectDay>,
      default: () => getConfig().calendar.selectDay
    }
  },
  emits: [
    'update:modelValue',
    'change',
    'cell-click',
    'date-prev',
    'date-today',
    'date-next',
    'view-change',
    'cell-menu',
    'menu-click'
  ] as VxeCalendarEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<CalendarReactData>({
      selectValue: props.modelValue,
      inputValue: props.modelValue,
      datePanelValue: null,
      datePanelLabel: '',
      datePanelType: 'day',
      selectMonth: null,
      currentDate: null
    })

    const internalData: CalendarInternalData = {
      yearSize: 12,
      monthSize: 20,
      quarterSize: 8
    }

    const refElem = ref() as Ref<HTMLDivElement>

    const refMaps: CalendarPrivateRef = {
      refElem
    }

    const $xeCalendar = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    } as unknown as VxeCalendarConstructor

    const computeCalendarStyle = computed(() => {
      const { height, width } = props
      const stys: Record<string, string> = {}
      if (width) {
        stys.width = toCssUnit(width)
      }
      if (height) {
        stys.height = toCssUnit(height)
      }
      return stys
    })

    const computeIsDisabled = computed(() => {
      return false
    })

    const computeIsCalendarType = computed(() => {
      return ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1
    })

    const computeDateStartTime = computed(() => {
      return props.minDate ? XEUtils.toStringDate(props.minDate) : null
    })

    const computeDateEndTime = computed(() => {
      return props.maxDate ? XEUtils.toStringDate(props.maxDate) : null
    })

    const computeSupportMultiples = computed(() => {
      return ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1
    })

    const computeMenuOpts = computed(() => {
      return Object.assign({}, getConfig().calendar.menuConfig, props.menuConfig)
    })

    const computeDateListValue = computed(() => {
      const { multiple } = props
      const { selectValue } = reactData
      const isCalendarType = computeIsCalendarType.value
      const dateValueFormat = computeDateValueFormat.value
      if (multiple && selectValue && isCalendarType) {
        return XEUtils.toValueString(selectValue).split(',').map(item => {
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
      const { valueFormat } = props
      if (valueFormat) {
        return valueFormat
      }
      return 'yyyy-MM-dd'
    })

    const computeDateValue = computed(() => {
      const { selectValue } = reactData
      const isCalendarType = computeIsCalendarType.value
      const dateValueFormat = computeDateValueFormat.value
      let val = null
      if (selectValue && isCalendarType) {
        const date = parseDate(selectValue, dateValueFormat)
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

    const computeDateHMSTime = computed(() => {
      const dateValue = computeDateValue.value
      return dateValue ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1000 : 0
    })

    const computeDateLabelFormat = computed(() => {
      const { labelFormat } = props
      const isCalendarType = computeIsCalendarType.value
      const dateValueFormat = computeDateValueFormat.value
      if (isCalendarType) {
        return labelFormat || dateValueFormat || getI18n(`vxe.input.date.labelFormat.${props.type}`)
      }
      return null
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
      const isCalendarType = computeIsCalendarType.value
      let y = ''
      let m = ''
      if (isCalendarType) {
        const { datePanelType, selectMonth } = reactData
        const yearList = computeYearList.value
        let year = ''
        let month
        if (selectMonth) {
          year = selectMonth.getFullYear()
          month = selectMonth.getMonth() + 1
        }
        if (datePanelType === 'quarter' || datePanelType === 'month') {
          y = `${year}`
        } else if (datePanelType === 'year') {
          y = yearList.length ? `${yearList[0].year} - ${yearList[yearList.length - 1].year}` : ''
        } else {
          y = `${year}`
          m = month ? getI18n('vxe.calendar.monthLabel', [month]) : '-'
        }
      }
      return {
        y: getI18n('vxe.calendar.yearLabel', [y]),
        m
      }
    })

    const computeFirstDayOfWeek = computed(() => {
      const { startDay } = props
      return XEUtils.toNumber(startDay) as VxeCalendarPropTypes.StartDay
    })

    const computeWeekDatas = computed(() => {
      const weeks = []
      const isCalendarType = computeIsCalendarType.value
      if (isCalendarType) {
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
      const isCalendarType = computeIsCalendarType.value
      if (isCalendarType) {
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
      const isCalendarType = computeIsCalendarType.value
      if (isCalendarType) {
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

    const parseDate = (value: VxeCalendarPropTypes.ModelValue, format: string) => {
      return XEUtils.toStringDate(value, format)
    }

    const handleChange = (value: string, evnt: Event | { type: string }) => {
      reactData.inputValue = value
      emit('update:modelValue', value)
      if (XEUtils.toValueString(props.modelValue) !== value) {
        dispatchEvent('change', { value }, evnt as any)
      }
    }

    const dateParseValue = (value?: VxeCalendarPropTypes.ModelValue) => {
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
        // 由于年份和第几周是冲突的行为，所以需要特殊处理，判断是否跨年
        if (dateLabelFormat && type === 'week') {
          const firstWeekDate = XEUtils.getWhatWeek(dValue, 0, firstDayOfWeek, firstDayOfWeek)
          if (firstWeekDate.getFullYear() < dValue.getFullYear()) {
            const yyIndex = dateLabelFormat.indexOf('yyyy')
            if (yyIndex > -1) {
              const yyNum = Number(dLabel.substring(yyIndex, yyIndex + 4))
              if (yyNum && !isNaN(yyNum)) {
                dLabel = dLabel.replace(`${yyNum}`, `${yyNum - 1}`)
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
      const isCalendarType = computeIsCalendarType.value
      const { inputValue } = reactData
      if (isCalendarType) {
        dateParseValue(inputValue)
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel
      }
    }

    /**
     * 检查初始值
     */
    const initValue = () => {
      const isCalendarType = computeIsCalendarType.value
      if (isCalendarType) {
        changeValue()
      }
    }

    const dateCheckMonth = (date: Date) => {
      const month = XEUtils.getWhatMonth(date, 0, 'first')
      if (!XEUtils.isEqual(month, reactData.selectMonth)) {
        reactData.selectMonth = month
      }
    }

    const dateChange = (date: Date) => {
      const { modelValue, multiple } = props
      const dateValueFormat = computeDateValueFormat.value
      const firstDayOfWeek = computeFirstDayOfWeek.value
      if (props.type === 'week') {
        const sWeek = XEUtils.toNumber(props.selectDay) as VxeCalendarPropTypes.SelectDay
        date = XEUtils.getWhatWeek(date, 0, sWeek, firstDayOfWeek)
      }
      const inpVal = XEUtils.toDateString(date, dateValueFormat, { firstDay: firstDayOfWeek })
      dateCheckMonth(date)
      reactData.selectValue = date
      if (multiple) {
        // 如果为多选
        const dateMultipleValue = computeDateMultipleValue.value
        // 如果是日期类型
        if (dateMultipleValue.some(val => XEUtils.isEqual(val, inpVal))) {
          handleChange(dateMultipleValue.filter(val => !XEUtils.isEqual(val, inpVal)).join(','), { type: 'update' })
        } else {
          handleChange(dateMultipleValue.concat([inpVal]).join(','), { type: 'update' })
        }
      } else {
        // 如果为单选
        if (!XEUtils.isEqual(modelValue, inpVal)) {
          handleChange(inpVal, { type: 'update' })
        }
      }
    }

    const dateMonthHandle = (date: Date, offsetMonth: number) => {
      reactData.selectMonth = XEUtils.getWhatMonth(date, offsetMonth, 'first')
    }

    const dateNowHandle = () => {
      const currentDate = XEUtils.getWhatDay(Date.now(), 0, 'first')
      reactData.currentDate = currentDate
      dateMonthHandle(currentDate, 0)
    }

    const dateToggleYearTypeEvent = () => {
      reactData.datePanelType = 'year'
    }

    const dateToggleMonthTypeEvent = (evnt: MouseEvent) => {
      let { datePanelType } = reactData
      if (datePanelType === 'month' || datePanelType === 'quarter') {
        datePanelType = 'year'
      } else {
        datePanelType = 'month'
      }
      reactData.datePanelType = datePanelType
      changeViewEvent(evnt)
    }

    const datePrevEvent = (evnt: Event) => {
      const { type } = props
      const { datePanelType, selectMonth } = reactData
      const { yearSize } = internalData
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value
      if (!isDisabledPrevDateBtn) {
        if (type === 'year') {
          reactData.selectMonth = XEUtils.getWhatYear(selectMonth, -yearSize, 'first')
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            reactData.selectMonth = XEUtils.getWhatYear(selectMonth, -yearSize, 'first')
          } else {
            reactData.selectMonth = XEUtils.getWhatYear(selectMonth, -1, 'first')
          }
        } else {
          if (datePanelType === 'year') {
            reactData.selectMonth = XEUtils.getWhatYear(selectMonth, -yearSize, 'first')
          } else if (datePanelType === 'month') {
            reactData.selectMonth = XEUtils.getWhatYear(selectMonth, -1, 'first')
          } else {
            reactData.selectMonth = XEUtils.getWhatMonth(selectMonth, -1, 'first')
          }
        }
        dispatchEvent('date-prev', { type }, evnt)
        changeViewEvent(evnt)
      }
    }

    const dateTodayMonthEvent = (evnt: Event) => {
      dateNowHandle()
      if (!props.multiple) {
        dateChange(reactData.currentDate)
      }
      dispatchEvent('date-today', { type: props.type }, evnt)
      changeViewEvent(evnt)
    }

    const dateNextEvent = (evnt: Event) => {
      const { type } = props
      const { datePanelType, selectMonth } = reactData
      const { yearSize } = internalData
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value
      if (!isDisabledNextDateBtn) {
        if (type === 'year') {
          reactData.selectMonth = XEUtils.getWhatYear(selectMonth, yearSize, 'first')
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            reactData.selectMonth = XEUtils.getWhatYear(selectMonth, yearSize, 'first')
          } else {
            reactData.selectMonth = XEUtils.getWhatYear(selectMonth, 1, 'first')
          }
        } else {
          if (datePanelType === 'year') {
            reactData.selectMonth = XEUtils.getWhatYear(selectMonth, yearSize, 'first')
          } else if (datePanelType === 'month') {
            reactData.selectMonth = XEUtils.getWhatYear(selectMonth, 1, 'first')
          } else {
            reactData.selectMonth = XEUtils.getWhatMonth(selectMonth, 1, 'first')
          }
        }
        dispatchEvent('date-next', { type }, evnt)
        changeViewEvent(evnt)
      }
    }

    const isDateDisabled = (item: { date: Date }) => {
      const { disabledMethod } = props
      const { datePanelType } = reactData
      return disabledMethod && disabledMethod({ type: datePanelType, viewType: datePanelType, date: item.date, $calendar: $xeCalendar })
    }

    const changeViewEvent = (evnt: Event | null) => {
      const { datePanelType } = reactData
      const yearDatas = computeYearDatas.value
      const quarterDatas = computeQuarterDatas.value
      const monthDatas = computeMonthDatas.value
      const weekDates = computeWeekDates.value
      const dayDatas = computeDayDatas.value
      const viewDates: Date[] = []
      let dataList: { date: Date }[][] = []
      switch (datePanelType) {
        case 'year':
          dataList = yearDatas
          break
        case 'quarter':
          dataList = quarterDatas
          break
        case 'month':
          dataList = monthDatas
          break
        case 'week':
          dataList = weekDates
          break
        case 'day':
          dataList = dayDatas
          break
      }
      dataList.forEach(rows => {
        rows.forEach(item => {
          viewDates.push(item.date)
        })
      })
      dispatchEvent('view-change', { viewType: datePanelType, viewDates }, evnt)
    }

    const dateSelectItem = (date: Date) => {
      const { type } = props
      const { datePanelType } = reactData
      if (type === 'month') {
        if (datePanelType === 'year') {
          reactData.datePanelType = 'month'
          dateCheckMonth(date)
          changeViewEvent(null)
        } else {
          dateChange(date)
        }
      } else if (type === 'year') {
        dateChange(date)
      } else if (type === 'quarter') {
        if (datePanelType === 'year') {
          reactData.datePanelType = 'quarter'
          dateCheckMonth(date)
          changeViewEvent(null)
        } else {
          dateChange(date)
        }
      } else {
        if (datePanelType === 'month') {
          reactData.datePanelType = type === 'week' ? type : 'day'
          dateCheckMonth(date)
          changeViewEvent(null)
        } else if (datePanelType === 'year') {
          reactData.datePanelType = 'month'
          dateCheckMonth(date)
          changeViewEvent(null)
        } else {
          dateChange(date)
        }
      }
    }

    const dateClickEvent = (evnt: MouseEvent, item: VxeDatePanelDefines.DateYearItem | VxeDatePanelDefines.DateQuarterItem | VxeDatePanelDefines.DateMonthItem | VxeDatePanelDefines.DateDayItem) => {
      const { type } = props
      const { datePanelType } = reactData
      const { date } = item
      if (!isDateDisabled(item)) {
        dateSelectItem(date)
        dispatchEvent('cell-click', { date, type, viewType: datePanelType }, evnt)
      }
    }

    const datContextmenuEvent = (evnt: MouseEvent, item: VxeDatePanelDefines.DateYearItem | VxeDatePanelDefines.DateQuarterItem | VxeDatePanelDefines.DateMonthItem | VxeDatePanelDefines.DateDayItem) => {
      const { type } = props
      const { datePanelType } = reactData

      const { menuConfig } = props
      const menuOpts = computeMenuOpts.value
      if (menuConfig ? isEnableConf(menuOpts) : menuOpts.enabled) {
        const { options, visibleMethod } = menuOpts
        const { date } = item
        if (!visibleMethod || visibleMethod({ $calendar: $xeCalendar, options, date, type, viewType: datePanelType })) {
          if (VxeUI.contextMenu) {
            VxeUI.contextMenu.openByEvent(evnt, {
              options,
              events: {
                optionClick (eventParams) {
                  const { option } = eventParams
                  const gMenuOpts = menus.get(option.code)
                  const cmMethod = gMenuOpts ? gMenuOpts.calendarMenuMethod : null
                  const params = { menu: option, date, type, viewType: datePanelType, $event: evnt, $calendar: $xeCalendar }
                  if (cmMethod) {
                    cmMethod(params, evnt)
                  }
                  dispatchEvent('menu-click', params, eventParams.$event)
                }
              }
            })
          }
        }
      }
      dispatchEvent('cell-menu', { date: item.date, type, viewType: datePanelType }, evnt)
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

    const dateMouseleaveEvent = () => {
      reactData.datePanelValue = null
    }

    const dateConfirmEvent = () => {
    }

    const dateOpenPanel = () => {
      const { type } = props
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
    }

    const renderDateLabel = (item: VxeDatePanelDefines.DateYearItem | VxeDatePanelDefines.DateQuarterItem | VxeDatePanelDefines.DateMonthItem | VxeDatePanelDefines.DateDayItem, label: string | number) => {
      const { festivalMethod } = props
      if (festivalMethod) {
        const { datePanelType } = reactData
        const festivalRest = festivalMethod({ type: datePanelType, viewType: datePanelType, date: item.date, $calendar: $xeCalendar })
        const festivalItem = festivalRest ? (XEUtils.isString(festivalRest) ? { label: festivalRest } : festivalRest) : {}
        const extraItem = festivalItem.extra ? (XEUtils.isString(festivalItem.extra) ? { label: festivalItem.extra } : festivalItem.extra) : null
        const labels = [
          h('span', {
            class: ['vxe-calendar--label', {
              'is-notice': festivalItem.notice
            }]
          }, extraItem && extraItem.label
            ? [
                h('span', {
                  class: 'vxe-calendar--label--number'
                }, `${label || ''}`),
                h('span', {
                  class: ['vxe-calendar--label--extra', extraItem.important ? 'is-important' : '', extraItem.className],
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
              class: ['vxe-calendar--festival', festivalItem.important ? 'is-important' : '', festivalItem.className],
              style: festivalItem.style
            }, [
              festivalLabels.length > 1
                ? h('span', {
                  class: ['vxe-calendar--festival--overlap', `overlap--${festivalLabels.length}`]
                }, festivalLabels.map(label => h('span', label.substring(0, 3))))
                : h('span', {
                  class: 'vxe-calendar--festival--label'
                }, festivalLabels[0].substring(0, 3))
            ])
          )
        }
        return labels
      }
      return `${label || ''}`
    }

    const renderDateDayTable = () => {
      const { multiple, cellStyle } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const dateHeaders = computeDateHeaders.value
      const dayDatas = computeDayDatas.value
      const dateListValue = computeDateListValue.value
      const matchFormat = 'yyyyMMdd'
      return [
        h('div', {
          class: ['vxe-calendar--view-wrapper', `type--${datePanelType}`]
        }, [
          h('div', {
            class: 'vxe-calendar--view-header',
            style: {
              height: `${100 / (dayDatas.length + 1)}%`
            }
          }, [
            h('div', {
              class: 'vxe-calendar--view-row'
            }, dateHeaders.map((item) => {
              return h('div', {
                class: 'vxe-calendar--view-item',
                style: {
                  width: `${100 / dateHeaders.length}%`
                }
              }, [
                h('div', {
                  class: 'vxe-calendar--view-item-inner'
                }, [
                  h('div', {
                    class: 'vxe-calendar--view-item-label'
                  }, item.label)
                ])
              ])
            }))
          ]),
          h('div', {
            class: 'vxe-calendar--view-body'
          }, dayDatas.map((rows) => {
            return h('div', {
              class: 'vxe-calendar--view-row',
              style: {
                height: `${100 / dayDatas.length}%`
              }
            }, rows.map((item) => {
              const isSelected = multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat)
              return h('div', {
                class: ['vxe-calendar--view-item', {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                }],
                style: Object.assign({}, XEUtils.isFunction(cellStyle) ? cellStyle({ type: datePanelType, viewType: datePanelType, date: item.date, $calendar: $xeCalendar }) : cellStyle, {
                  width: `${100 / rows.length}%`
                }),
                onClick: (evnt) => dateClickEvent(evnt, item),
                onContextmenu: (evnt) => datContextmenuEvent(evnt, item),
                onMouseenter: () => dateMouseenterEvent(item),
                onMouseleave: dateMouseleaveEvent
              }, [
                h('div', {
                  class: 'vxe-calendar--view-item-inner'
                }, renderDateLabel(item, item.label))
              ])
            }))
          }))
        ])
      ]
    }

    const renderDateWeekTable = () => {
      const { multiple, cellStyle } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const weekHeaders = computeWeekHeaders.value
      const weekDates = computeWeekDates.value
      const dateListValue = computeDateListValue.value
      const matchFormat = 'yyyyMMdd'
      return [
        h('div', {
          class: ['vxe-calendar--view-wrapper', `type--${datePanelType}`]
        }, [
          h('div', {
            class: 'vxe-calendar--view-header',
            style: {
              height: `${100 / (weekDates.length + 1)}%`
            }
          }, [
            h('div', {
              class: 'vxe-calendar--view-row'
            }, weekHeaders.map((item, rIndex) => {
              return h('div', {
                class: 'vxe-calendar--view-item',
                style: {
                  width: `${rIndex ? 13 : 9}%`
                }
              }, [
                h('div', {
                  class: 'vxe-calendar--view-item-inner'
                }, [
                  h('div', {
                    class: 'vxe-calendar--view-item-label'
                  }, item.label)
                ])
              ])
            }))
          ]),
          h('div', {
            class: 'vxe-calendar--view-body'
          }, weekDates.map((rows) => {
            const isSelected = multiple ? rows.some((item) => dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat))) : rows.some((item) => XEUtils.isDateSame(dateValue, item.date, matchFormat))
            const isHover = rows.some((item) => XEUtils.isDateSame(datePanelValue, item.date, matchFormat))
            const isNowWeek = rows.some(item => item.isNow)
            return h('div', {
              class: 'vxe-calendar--view-row',
              style: {
                height: `${100 / weekDates.length}%`
              }
            }, rows.map((item, rIndex) => {
              return h('div', {
                class: ['vxe-calendar--view-item', {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': rIndex ? item.isNow : isNowWeek,
                  'is--next': item.isNext,
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--hover': isHover
                }],
                style: Object.assign({}, XEUtils.isFunction(cellStyle) ? cellStyle({ type: datePanelType, viewType: datePanelType, date: item.date, $calendar: $xeCalendar }) : cellStyle, {
                  width: `${rIndex ? 13 : 9}%`
                }),
                onClick: (evnt) => dateClickEvent(evnt, item),
                onContextmenu: (evnt) => datContextmenuEvent(evnt, item),
                onMouseenter: () => dateMouseenterEvent(item),
                onMouseleave: dateMouseleaveEvent
              }, [
                h('div', {
                  class: 'vxe-calendar--view-item-inner'
                }, renderDateLabel(item, item.label))
              ])
            }))
          }))
        ])
      ]
    }

    const renderDateMonthTable = () => {
      const { multiple, cellStyle } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const monthDatas = computeMonthDatas.value
      const dateListValue = computeDateListValue.value
      const matchFormat = 'yyyyMM'
      return [
        h('div', {
          class: ['vxe-calendar--view-wrapper', `type--${datePanelType}`]
        }, [
          h('div', {
            class: 'vxe-calendar--view-body'
          }, monthDatas.map((rows) => {
            return h('div', {
              class: 'vxe-calendar--view-row',
              style: {
                height: `${100 / monthDatas.length}%`
              }
            }, rows.map((item) => {
              const isSelected = multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat)
              return h('div', {
                class: ['vxe-calendar--view-item', {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                }],
                style: Object.assign({}, XEUtils.isFunction(cellStyle) ? cellStyle({ type: datePanelType, viewType: datePanelType, date: item.date, $calendar: $xeCalendar }) : cellStyle, {
                  width: `${100 / rows.length}%`
                }),
                onClick: (evnt) => dateClickEvent(evnt, item),
                onContextmenu: (evnt) => datContextmenuEvent(evnt, item),
                onMouseenter: () => dateMouseenterEvent(item),
                onMouseleave: dateMouseleaveEvent
              }, [
                h('div', {
                  class: 'vxe-calendar--view-item-inner'
                }, renderDateLabel(item, getI18n(`vxe.input.date.months.m${item.month}`)))
              ])
            }))
          }))
        ])
      ]
    }

    const renderDateQuarterTable = () => {
      const { multiple, cellStyle } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const quarterDatas = computeQuarterDatas.value
      const dateListValue = computeDateListValue.value
      const matchFormat = 'yyyyq'
      return [
        h('div', {
          class: ['vxe-calendar--view-wrapper', `type--${datePanelType}`]
        }, [
          h('div', {
            class: 'vxe-calendar--view-body'
          }, quarterDatas.map((rows) => {
            return h('div', {
              class: 'vxe-calendar--view-row',
              style: {
                height: `${100 / quarterDatas.length}%`
              }
            }, rows.map((item) => {
              const isSelected = multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat)
              return h('div', {
                class: ['vxe-calendar--view-item', {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                }],
                style: Object.assign({}, XEUtils.isFunction(cellStyle) ? cellStyle({ type: datePanelType, viewType: datePanelType, date: item.date, $calendar: $xeCalendar }) : cellStyle, {
                  width: `${100 / rows.length}%`
                }),
                onClick: (evnt) => dateClickEvent(evnt, item),
                onContextmenu: (evnt) => datContextmenuEvent(evnt, item),
                onMouseenter: () => dateMouseenterEvent(item),
                onMouseleave: dateMouseleaveEvent
              }, [
                h('div', {
                  class: 'vxe-calendar--view-item-inner'
                }, renderDateLabel(item, getI18n(`vxe.input.date.quarters.q${item.quarter}`)))
              ])
            }))
          }))
        ])
      ]
    }

    const renderDateYearTable = () => {
      const { multiple, cellStyle } = props
      const { datePanelType, datePanelValue } = reactData
      const dateValue = computeDateValue.value
      const yearDatas = computeYearDatas.value
      const dateListValue = computeDateListValue.value
      const matchFormat = 'yyyy'
      return [
        h('div', {
          class: ['vxe-calendar--view-wrapper', `type--${datePanelType}`]
        }, [
          h('div', {
            class: 'vxe-calendar--view-body'
          }, yearDatas.map((rows) => {
            return h('div', {
              class: 'vxe-calendar--view-row',
              style: {
                height: `${100 / yearDatas.length}%`
              }
            }, rows.map((item) => {
              const isSelected = multiple ? dateListValue.some(val => XEUtils.isDateSame(val, item.date, matchFormat)) : XEUtils.isDateSame(dateValue, item.date, matchFormat)
              return h('div', {
                class: ['vxe-calendar--view-item', {
                  'is--prev': item.isPrev,
                  'is--current': item.isCurrent,
                  'is--now': item.isNow,
                  'is--next': item.isNext,
                  'is--disabled': isDateDisabled(item),
                  'is--selected': isSelected,
                  'is--hover': XEUtils.isDateSame(datePanelValue, item.date, matchFormat)
                }],
                style: Object.assign({}, XEUtils.isFunction(cellStyle) ? cellStyle({ type: datePanelType, viewType: datePanelType, date: item.date, $calendar: $xeCalendar }) : cellStyle, {
                  width: `${100 / rows.length}%`
                }),
                onClick: (evnt) => dateClickEvent(evnt, item),
                onContextmenu: (evnt) => datContextmenuEvent(evnt, item),
                onMouseenter: () => dateMouseenterEvent(item),
                onMouseleave: dateMouseleaveEvent
              }, [
                h('div', {
                  class: 'vxe-calendar--view-item-inner'
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
      const { multiple } = props
      const { datePanelType } = reactData
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value
      const selectDatePanelObj = computeSelectDatePanelObj.value
      return [
        h('div', {
          class: 'vxe-calendar--header'
        }, [
          h('div', {
            class: 'vxe-calendar--type-wrapper'
          }, [
            datePanelType === 'year'
              ? h(VxeButtonComponent, {
                class: 'vxe-calendar--date-picker-label',
                disabled: datePanelType === 'year',
                content: selectDatePanelObj.y
              })
              : h('span', {
                class: 'vxe-calendar--date-picker-btns'
              }, [
                h(VxeButtonComponent, {
                  class: 'vxe-calendar--date-picker-btn',
                  content: selectDatePanelObj.y,
                  onClick: dateToggleYearTypeEvent
                }),
                selectDatePanelObj.m
                  ? h(VxeButtonComponent, {
                    class: 'vxe-calendar--date-picker-btn',
                    content: selectDatePanelObj.m,
                    onClick: dateToggleMonthTypeEvent
                  })
                  : renderEmptyElement($xeCalendar)
              ])
          ]),
          h('div', {
            class: 'vxe-calendar--btn-wrapper'
          }, [
            h(VxeButtonComponent, {
              disabled: isDisabledPrevDateBtn,
              icon: 'vxe-icon-caret-left',
              onClick: datePrevEvent
            }),
            h(VxeButtonComponent, {
              icon: 'vxe-icon-dot',
              onClick: dateTodayMonthEvent
            }),
            h(VxeButtonComponent, {
              disabled: isDisabledNextDateBtn,
              icon: 'vxe-icon-caret-right',
              onClick: dateNextEvent
            }),
            multiple && computeSupportMultiples.value
              ? h('span', {
                class: 'vxe-calendar--btn vxe-calendar--confirm-btn'
              }, [
                h('button', {
                  class: 'vxe-calendar--confirm',
                  type: 'button',
                  onClick: dateConfirmEvent
                }, getI18n('vxe.button.confirm'))
              ])
              : null
          ])
        ]),
        h('div', {
          class: 'vxe-calendar--body'
        }, renderDateTable())
      ]
    }

    const dispatchEvent = (type: ValueOf<VxeCalendarEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $input: $xeCalendar }, params))
    }

    const calendarMethods: CalendarMethods = {
      dispatchEvent
    }

    Object.assign($xeCalendar, calendarMethods)

    const renderVN = () => {
      const { className, type } = props
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const calendarStyle = computeCalendarStyle.value
      return h('div', {
        ref: refElem,
        class: ['vxe-calendar', `type--${type}`, className, {
          [`size--${vSize}`]: vSize,
          'is--disabled': isDisabled
        }],
        style: calendarStyle
      }, [
        renderDatePanel()
      ])
    }

    $xeCalendar.renderVN = renderVN

    watch(() => props.modelValue, (val) => {
      reactData.inputValue = val
      changeValue()
    })

    watch(() => props.type, () => {
      // 切换类型是重置内置变量
      Object.assign(reactData, {
        selectValue: null,
        inputValue: null,
        datePanelValue: null,
        datePanelLabel: '',
        datePanelType: 'day',
        selectMonth: null,
        currentDate: null
      })
      initValue()
      dateOpenPanel()
    })

    watch(computeDateLabelFormat, () => {
      const isCalendarType = computeIsCalendarType.value
      if (isCalendarType) {
        dateParseValue(reactData.datePanelValue)
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel
      }
    })

    onMounted(() => {
      const { menuConfig } = props
      const VxeUIContextMenu = VxeUI.getComponent('VxeContextMenu')
      if (menuConfig && !VxeUIContextMenu) {
        errLog('vxe.error.reqComp', ['vxe-context-menu'])
      }
      dateOpenPanel()
    })

    initValue()

    return $xeCalendar
  },
  render () {
    return this.renderVN()
  }
})
