import staticDayTime from './staticDayTime'
import staticStrFirst from './staticStrFirst'
import staticStrLast from './staticStrLast'

import helperGetDateTime from './helperGetDateTime'

import getWhatMonth from './getWhatMonth'
import toStringDate from './toStringDate'

import isValidDate from './isValidDate'

/**
  * 返回某个月份的天数
  *
  * @param {Date} date 日期或数字
  * @param {Number} offset 月(默认当月)、前几个月、后几个月
  * @return {Number}
  */
function getDayOfMonth (date, month) {
  date = toStringDate(date)
  if (isValidDate(date)) {
    return Math.floor((helperGetDateTime(getWhatMonth(date, month, staticStrLast)) - helperGetDateTime(getWhatMonth(date, month, staticStrFirst))) / staticDayTime) + 1
  }
  return NaN
}

export default getDayOfMonth
