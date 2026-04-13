import staticStrFirst from './staticStrFirst'
import staticStrLast from './staticStrLast'
import staticParseInt from './staticParseInt'

import helperGetDateFullYear from './helperGetDateFullYear'
import helperGetDateMonth from './helperGetDateMonth'
import helperGetDateTime from './helperGetDateTime'

import toStringDate from './toStringDate'
import isValidDate from './isValidDate'

/**
  * 返回前几小时或后几小时的日期
  *
  * @param {Date} date 日期或数字
  * @param {Number} offset 小时偏移量(默认0)、前几小时、后几小时
  * @param {String} mode 指定分钟(null默认当前分)、0分(first)、59分(last)
  * @return {Date}
  */
function getWhatHours (date, offset, mode) {
  date = toStringDate(date)
  if (isValidDate(date) && !isNaN(offset)) {
    date.setHours(date.getHours() + staticParseInt(offset))
    if (mode === staticStrFirst) {
      return new Date(helperGetDateFullYear(date), helperGetDateMonth(date), date.getDate(), date.getHours())
    } else if (mode === staticStrLast) {
      return new Date(helperGetDateTime(getWhatHours(date, 1, staticStrFirst)) - 1)
    }
  }
  return date
}

export default getWhatHours
