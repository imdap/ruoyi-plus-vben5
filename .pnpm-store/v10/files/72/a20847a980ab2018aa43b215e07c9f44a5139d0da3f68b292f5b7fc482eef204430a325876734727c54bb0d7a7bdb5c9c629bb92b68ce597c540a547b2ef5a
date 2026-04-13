import staticStrFirst from './staticStrFirst'
import staticStrLast from './staticStrLast'
import staticParseInt from './staticParseInt'

import helperGetDateFullYear from './helperGetDateFullYear'
import helperGetDateMonth from './helperGetDateMonth'
import helperGetDateTime from './helperGetDateTime'

import toStringDate from './toStringDate'
import isValidDate from './isValidDate'

/**
  * 返回前几秒或后几秒的日期
  *
  * @param {Date} date 日期或数字
  * @param {Number} offset 秒偏移量(默认0)、前几秒、后几秒
  * @param {String} mode 指定毫秒(null默认当前毫秒)、0毫秒(first)、59毫秒(last)
  * @return {Date}
  */
function getWhatSeconds (date, offset, mode) {
  date = toStringDate(date)
  if (isValidDate(date) && !isNaN(offset)) {
    date.setSeconds(date.getSeconds() + staticParseInt(offset))
    if (mode === staticStrFirst) {
      return new Date(helperGetDateFullYear(date), helperGetDateMonth(date), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
    } else if (mode === staticStrLast) {
      return new Date(helperGetDateTime(getWhatSeconds(date, 1, staticStrFirst)) - 1)
    }
  }
  return date
}

export default getWhatSeconds
