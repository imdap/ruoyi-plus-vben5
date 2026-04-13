import staticStrFirst from './staticStrFirst'
import staticStrLast from './staticStrLast'
import staticParseInt from './staticParseInt'

import helperGetDateFullYear from './helperGetDateFullYear'
import helperGetDateMonth from './helperGetDateMonth'
import helperGetDateTime from './helperGetDateTime'

import toStringDate from './toStringDate'
import isValidDate from './isValidDate'

/**
  * 返回前几分钟或后几分钟的日期
  *
  * @param {Date} date 日期或数字
  * @param {Number} offset 分钟偏移量(默认0)、前几分钟、后几分钟
  * @param {String} mode 指定秒(null默认当前秒)、0秒(first)、59秒(last)
  * @return {Date}
  */
function getWhatMinutes (date, offset, mode) {
  date = toStringDate(date)
  if (isValidDate(date) && !isNaN(offset)) {
    date.setMinutes(date.getMinutes() + staticParseInt(offset))
    if (mode === staticStrFirst) {
      return new Date(helperGetDateFullYear(date), helperGetDateMonth(date), date.getDate(), date.getHours(), date.getMinutes())
    } else if (mode === staticStrLast) {
      return new Date(helperGetDateTime(getWhatMinutes(date, 1, staticStrFirst)) - 1)
    }
  }
  return date
}

export default getWhatMinutes
