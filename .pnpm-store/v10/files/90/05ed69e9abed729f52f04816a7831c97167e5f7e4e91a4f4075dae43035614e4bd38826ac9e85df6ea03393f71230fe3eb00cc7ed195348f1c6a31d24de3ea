import XEUtils from 'xe-utils'

import type { VxeDatePanelPropTypes } from '../../../types'

export function hasTimestampValueType (valueFormat?: string) {
  return valueFormat === 'timestamp'
}

export function hasDateValueType (valueFormat?: string) {
  return valueFormat === 'date'
}

export function handleValueFormat (type: string, valueFormat?: string) {
  if (valueFormat) {
    if (!(hasDateValueType(valueFormat) || hasTimestampValueType(valueFormat))) {
      return valueFormat
    }
  }
  if (type === 'time') {
    return 'HH:mm:ss'
  }
  if (type === 'datetime') {
    return 'yyyy-MM-dd HH:mm:ss'
  }
  return 'yyyy-MM-dd'
}

export function toStringTimeDate (str: string | number | Date | null | undefined) {
  const rest = new Date(2e3, 0, 1)
  if (str) {
    let h = 0
    let m = 0
    let s = 0
    if (XEUtils.isNumber(str) || /^[0-9]{11,15}$/.test(`${str}`)) {
      str = new Date(Number(str))
    }
    if (XEUtils.isDate(str)) {
      h = str.getHours()
      m = str.getMinutes()
      s = str.getSeconds()
    } else {
      str = XEUtils.toValueString(str)
      const parses = str.match(/^(\d{1,2})(:(\d{1,2}))?(:(\d{1,2}))?/)
      if (parses) {
        h = XEUtils.toNumber(parses[1])
        m = XEUtils.toNumber(parses[3])
        s = XEUtils.toNumber(parses[5])
      }
    }
    rest.setHours(h)
    rest.setMinutes(m)
    rest.setSeconds(s)
    return rest
  }
  return rest
}

export function getDateQuarter (date: Date) {
  const month = date.getMonth()
  if (month < 3) {
    return 1
  } else if (month < 6) {
    return 2
  } else if (month < 9) {
    return 3
  }
  return 4
}

export const parseDateValue = (val: string | number | Date | null | undefined, type: VxeDatePanelPropTypes.Type, options: {
  valueFormat: string
}) => {
  const { valueFormat } = options
  if (val) {
    if (type === 'time') {
      return toStringTimeDate(val)
    }
    if (XEUtils.isNumber(val) || /^[0-9]{10,15}$/.test(`${val}`)) {
      return new Date(Number(val))
    }
    if (XEUtils.isString(val)) {
      return XEUtils.toStringDate(XEUtils.last(val.split(',')), valueFormat)
    }
    return XEUtils.toStringDate(val, valueFormat)
  }
  return null
}

export const parseDateString = (val: string | number | Date | null | undefined, type: VxeDatePanelPropTypes.Type, options: {
  valueFormat: string
}) => {
  const dValue = parseDateValue(val, type, options)
  return dValue ? XEUtils.toDateString(dValue, options.valueFormat) : ''
}

export function parseDateObj (val: string | number | Date | null | undefined, type: VxeDatePanelPropTypes.Type, options: {
  valueFormat: string
  labelFormat: string
  firstDay: VxeDatePanelPropTypes.StartDay
}) {
  const { labelFormat, firstDay } = options
  let dValue: Date | null = null
  let dLabel = ''
  if (val) {
    dValue = parseDateValue(val, type, options)
  }
  if (XEUtils.isValidDate(dValue)) {
    dLabel = XEUtils.toDateString(dValue, labelFormat, { firstDay })
    // 周选择器，由于年份和第几周是冲突的行为，所以需要特殊处理，判断是否跨年，例如
    // '2024-12-31' 'yyyy-MM-dd W' >> '2024-12-31 1'
    // '2025-01-01' 'yyyy-MM-dd W' >> '2025-01-01 1'
    if (labelFormat && type === 'week') {
      const oldYyyy = dValue.getFullYear()
      const M = dValue.getMonth() + 1
      const W = XEUtils.getYearWeek(dValue, firstDay)
      if (checkWeekOfsetYear(W, M)) {
        const formatY = 'yyyy'
        const newYyyy = oldYyyy + 1
        const yyIndex = labelFormat.indexOf(formatY)
        if (yyIndex > -1) {
          dLabel = dLabel.substring(0, yyIndex) + newYyyy + dLabel.substring(yyIndex + formatY.length)
        }
      }
    }
  } else {
    dValue = null
  }
  return { label: dLabel, value: dValue }
}

export function getDateByCode (code: 'now' | 'prev' | 'next' | 'minus' | 'plus', val: string | number | Date | null | undefined, type: VxeDatePanelPropTypes.Type, options: {
  valueFormat: string
  firstDay: VxeDatePanelPropTypes.StartDay
}) {
  const { valueFormat, firstDay } = options
  let dValue: Date | null = null
  const value = (code === 'prev' || code === 'next' ? new Date() : (val ? parseDateValue(val, type, options) : null)) || new Date()
  switch (code) {
    case 'prev':
    case 'next':
    case 'minus':
    case 'plus': {
      const offsetNum = code === 'plus' || code === 'next' ? 1 : -1
      switch (type) {
        case 'date':
        case 'datetime':
          dValue = XEUtils.getWhatDay(value, offsetNum)
          break
        case 'week':
          dValue = XEUtils.getWhatWeek(value, offsetNum, firstDay, firstDay)
          break
        case 'month':
          dValue = XEUtils.getWhatMonth(value, offsetNum)
          break
        case 'quarter':
          dValue = XEUtils.getWhatQuarter(value, offsetNum)
          break
        case 'year':
          dValue = XEUtils.getWhatYear(value, offsetNum)
          break
      }
      break
    }
    default:
      dValue = new Date()
      break
  }
  return {
    value: dValue ? XEUtils.toDateString(dValue, valueFormat) : ''
  }
}

const rangeDateOffsetNumMaps: Record<string, number> = {
  last180: -180,
  last90: -90,
  last60: -60,
  last30: -30,
  last7: -7,
  last3: -3,
  last1: -1
}

function getRangeDateOffsetNum (code: string) {
  return rangeDateOffsetNumMaps[code] || 0
}

export function getRangeDateByCode (code: 'last1' | 'last3' | 'last7' | 'last30' | 'last60' | 'last90' | 'last180', val: string | number | Date | null | string[] | undefined, type: VxeDatePanelPropTypes.Type, options: {
  valueFormat: string
  firstDay: VxeDatePanelPropTypes.StartDay
}) {
  const { valueFormat, firstDay } = options
  if (XEUtils.isArray(val)) {
    val = val.join('')
  }
  const value = (val ? parseDateValue(val, type, options) : null) || new Date()
  let sValue: Date | null = null
  const eValue: Date | null = value
  switch (code) {
    case 'last1':
    case 'last3':
    case 'last7':
    case 'last30':
    case 'last60':
    case 'last90':
    case 'last180': {
      const offsetNum = getRangeDateOffsetNum(code)
      switch (type) {
        case 'date':
        case 'datetime':
          sValue = XEUtils.getWhatDay(value, offsetNum)
          break
        case 'week':
          sValue = XEUtils.getWhatWeek(value, offsetNum, firstDay, firstDay)
          break
        case 'month':
          sValue = XEUtils.getWhatMonth(value, offsetNum)
          break
        case 'quarter':
          sValue = XEUtils.getWhatQuarter(value, offsetNum)
          break
        case 'year':
          sValue = XEUtils.getWhatYear(value, offsetNum)
          break
      }
      break
    }
    default:
      sValue = new Date()
      break
  }
  const startValue = sValue ? XEUtils.toDateString(sValue, valueFormat) : ''
  const endValue = eValue ? XEUtils.toDateString(eValue, valueFormat) : ''
  return {
    startValue,
    endValue
  }
}

/**
 * 判断周的年份是否跨年
 */
const checkWeekOfsetYear = (W: number | string, M: number | string) => {
  return `${W}` === '1' && `${M}` === '12'
}
