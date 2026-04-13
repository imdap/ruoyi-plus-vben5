import staticStrFirst from './staticStrFirst'
import staticStrLast from './staticStrLast'
import staticParseInt from './staticParseInt'

import helperGetDateFullYear from './helperGetDateFullYear'
import helperGetDateMonth from './helperGetDateMonth'
import helperGetDateTime from './helperGetDateTime'

import toStringDate from './toStringDate'
import isValidDate from './isValidDate'

/**
  * 返回前几天或后几天的日期
  *
  * @param {Date} date 日期或数字
  * @param {Number} offset 天偏移量(默认0)、前几天、后几天
  * @param {String} mode 指定小时(null默认当前分)、0时(first)、23时(last)
  * @return {Date}
  */
function getWhatDay (date, offset, mode) {
  date = toStringDate(date)
  if (isValidDate(date) && !isNaN(offset)) {
    date.setDate(date.getDate() + staticParseInt(offset))
    if (mode === staticStrFirst) {
      return new Date(helperGetDateFullYear(date), helperGetDateMonth(date), date.getDate())
    } else if (mode === staticStrLast) {
      return new Date(helperGetDateTime(getWhatDay(date, 1, staticStrFirst)) - 1)
    }
  }
  return date
}

export default getWhatDay
