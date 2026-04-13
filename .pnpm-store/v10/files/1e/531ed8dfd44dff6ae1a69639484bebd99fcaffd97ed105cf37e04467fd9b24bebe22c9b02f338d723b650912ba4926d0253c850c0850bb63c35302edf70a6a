"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateByCode = getDateByCode;
exports.getDateQuarter = getDateQuarter;
exports.getRangeDateByCode = getRangeDateByCode;
exports.handleValueFormat = handleValueFormat;
exports.hasDateValueType = hasDateValueType;
exports.hasTimestampValueType = hasTimestampValueType;
exports.parseDateObj = parseDateObj;
exports.parseDateValue = exports.parseDateString = void 0;
exports.toStringTimeDate = toStringTimeDate;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function hasTimestampValueType(valueFormat) {
  return valueFormat === 'timestamp';
}
function hasDateValueType(valueFormat) {
  return valueFormat === 'date';
}
function handleValueFormat(type, valueFormat) {
  if (valueFormat) {
    if (!(hasDateValueType(valueFormat) || hasTimestampValueType(valueFormat))) {
      return valueFormat;
    }
  }
  if (type === 'time') {
    return 'HH:mm:ss';
  }
  if (type === 'datetime') {
    return 'yyyy-MM-dd HH:mm:ss';
  }
  return 'yyyy-MM-dd';
}
function toStringTimeDate(str) {
  const rest = new Date(2e3, 0, 1);
  if (str) {
    let h = 0;
    let m = 0;
    let s = 0;
    if (_xeUtils.default.isNumber(str) || /^[0-9]{11,15}$/.test(`${str}`)) {
      str = new Date(Number(str));
    }
    if (_xeUtils.default.isDate(str)) {
      h = str.getHours();
      m = str.getMinutes();
      s = str.getSeconds();
    } else {
      str = _xeUtils.default.toValueString(str);
      const parses = str.match(/^(\d{1,2})(:(\d{1,2}))?(:(\d{1,2}))?/);
      if (parses) {
        h = _xeUtils.default.toNumber(parses[1]);
        m = _xeUtils.default.toNumber(parses[3]);
        s = _xeUtils.default.toNumber(parses[5]);
      }
    }
    rest.setHours(h);
    rest.setMinutes(m);
    rest.setSeconds(s);
    return rest;
  }
  return rest;
}
function getDateQuarter(date) {
  const month = date.getMonth();
  if (month < 3) {
    return 1;
  } else if (month < 6) {
    return 2;
  } else if (month < 9) {
    return 3;
  }
  return 4;
}
const parseDateValue = (val, type, options) => {
  const {
    valueFormat
  } = options;
  if (val) {
    if (type === 'time') {
      return toStringTimeDate(val);
    }
    if (_xeUtils.default.isNumber(val) || /^[0-9]{10,15}$/.test(`${val}`)) {
      return new Date(Number(val));
    }
    if (_xeUtils.default.isString(val)) {
      return _xeUtils.default.toStringDate(_xeUtils.default.last(val.split(',')), valueFormat);
    }
    return _xeUtils.default.toStringDate(val, valueFormat);
  }
  return null;
};
exports.parseDateValue = parseDateValue;
const parseDateString = (val, type, options) => {
  const dValue = parseDateValue(val, type, options);
  return dValue ? _xeUtils.default.toDateString(dValue, options.valueFormat) : '';
};
exports.parseDateString = parseDateString;
function parseDateObj(val, type, options) {
  const {
    labelFormat,
    firstDay
  } = options;
  let dValue = null;
  let dLabel = '';
  if (val) {
    dValue = parseDateValue(val, type, options);
  }
  if (_xeUtils.default.isValidDate(dValue)) {
    dLabel = _xeUtils.default.toDateString(dValue, labelFormat, {
      firstDay
    });
    // 周选择器，由于年份和第几周是冲突的行为，所以需要特殊处理，判断是否跨年，例如
    // '2024-12-31' 'yyyy-MM-dd W' >> '2024-12-31 1'
    // '2025-01-01' 'yyyy-MM-dd W' >> '2025-01-01 1'
    if (labelFormat && type === 'week') {
      const oldYyyy = dValue.getFullYear();
      const M = dValue.getMonth() + 1;
      const W = _xeUtils.default.getYearWeek(dValue, firstDay);
      if (checkWeekOfsetYear(W, M)) {
        const formatY = 'yyyy';
        const newYyyy = oldYyyy + 1;
        const yyIndex = labelFormat.indexOf(formatY);
        if (yyIndex > -1) {
          dLabel = dLabel.substring(0, yyIndex) + newYyyy + dLabel.substring(yyIndex + formatY.length);
        }
      }
    }
  } else {
    dValue = null;
  }
  return {
    label: dLabel,
    value: dValue
  };
}
function getDateByCode(code, val, type, options) {
  const {
    valueFormat,
    firstDay
  } = options;
  let dValue = null;
  const value = (code === 'prev' || code === 'next' ? new Date() : val ? parseDateValue(val, type, options) : null) || new Date();
  switch (code) {
    case 'prev':
    case 'next':
    case 'minus':
    case 'plus':
      {
        const offsetNum = code === 'plus' || code === 'next' ? 1 : -1;
        switch (type) {
          case 'date':
          case 'datetime':
            dValue = _xeUtils.default.getWhatDay(value, offsetNum);
            break;
          case 'week':
            dValue = _xeUtils.default.getWhatWeek(value, offsetNum, firstDay, firstDay);
            break;
          case 'month':
            dValue = _xeUtils.default.getWhatMonth(value, offsetNum);
            break;
          case 'quarter':
            dValue = _xeUtils.default.getWhatQuarter(value, offsetNum);
            break;
          case 'year':
            dValue = _xeUtils.default.getWhatYear(value, offsetNum);
            break;
        }
        break;
      }
    default:
      dValue = new Date();
      break;
  }
  return {
    value: dValue ? _xeUtils.default.toDateString(dValue, valueFormat) : ''
  };
}
const rangeDateOffsetNumMaps = {
  last180: -180,
  last90: -90,
  last60: -60,
  last30: -30,
  last7: -7,
  last3: -3,
  last1: -1
};
function getRangeDateOffsetNum(code) {
  return rangeDateOffsetNumMaps[code] || 0;
}
function getRangeDateByCode(code, val, type, options) {
  const {
    valueFormat,
    firstDay
  } = options;
  if (_xeUtils.default.isArray(val)) {
    val = val.join('');
  }
  const value = (val ? parseDateValue(val, type, options) : null) || new Date();
  let sValue = null;
  const eValue = value;
  switch (code) {
    case 'last1':
    case 'last3':
    case 'last7':
    case 'last30':
    case 'last60':
    case 'last90':
    case 'last180':
      {
        const offsetNum = getRangeDateOffsetNum(code);
        switch (type) {
          case 'date':
          case 'datetime':
            sValue = _xeUtils.default.getWhatDay(value, offsetNum);
            break;
          case 'week':
            sValue = _xeUtils.default.getWhatWeek(value, offsetNum, firstDay, firstDay);
            break;
          case 'month':
            sValue = _xeUtils.default.getWhatMonth(value, offsetNum);
            break;
          case 'quarter':
            sValue = _xeUtils.default.getWhatQuarter(value, offsetNum);
            break;
          case 'year':
            sValue = _xeUtils.default.getWhatYear(value, offsetNum);
            break;
        }
        break;
      }
    default:
      sValue = new Date();
      break;
  }
  const startValue = sValue ? _xeUtils.default.toDateString(sValue, valueFormat) : '';
  const endValue = eValue ? _xeUtils.default.toDateString(eValue, valueFormat) : '';
  return {
    startValue,
    endValue
  };
}
/**
 * 判断周的年份是否跨年
 */
const checkWeekOfsetYear = (W, M) => {
  return `${W}` === '1' && `${M}` === '12';
};