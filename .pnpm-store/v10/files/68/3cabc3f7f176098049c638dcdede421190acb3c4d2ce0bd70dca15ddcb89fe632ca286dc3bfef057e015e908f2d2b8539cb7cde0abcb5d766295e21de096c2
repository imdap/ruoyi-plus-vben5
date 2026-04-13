import isDate from './isDate'
import toStringDate from './toStringDate'

import helperNewDate from './helperNewDate'

/**
  * 判断是否闰年
  *
  * @param {Date} date 日期或数字
  * @return {Boolean}
  */
function isLeapYear (date) {
  var year
  var currentDate = date ? toStringDate(date) : helperNewDate()
  if (isDate(currentDate)) {
    year = currentDate.getFullYear()
    return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
  }
  return false
}

export default isLeapYear
