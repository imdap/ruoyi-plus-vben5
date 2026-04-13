"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _util = require("./util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeDatePanel',
  props: {
    modelValue: [String, Number, Date],
    type: {
      type: String,
      default: 'date'
    },
    className: String,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().datePanel.size || (0, _ui.getConfig)().size
    },
    multiple: Boolean,
    limitCount: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().datePanel.limitCount
    },
    // date、week、month、quarter、year
    startDate: {
      type: [String, Number, Date],
      default: () => (0, _ui.getConfig)().datePanel.startDate
    },
    endDate: {
      type: [String, Number, Date],
      default: () => (0, _ui.getConfig)().datePanel.endDate
    },
    defaultDate: [String, Number, Date],
    defaultTime: [String, Number, Date],
    minDate: [String, Number, Date],
    maxDate: [String, Number, Date],
    startDay: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().datePanel.startDay
    },
    labelFormat: String,
    valueFormat: String,
    timeFormat: String,
    festivalMethod: {
      type: Function,
      default: () => (0, _ui.getConfig)().datePanel.festivalMethod
    },
    disabledMethod: {
      type: Function,
      default: () => (0, _ui.getConfig)().datePanel.disabledMethod
    },
    timeConfig: Object,
    // week
    selectDay: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().datePanel.selectDay
    }
  },
  emits: ['update:modelValue', 'change', 'click', 'clear', 'date-prev', 'date-today', 'date-next', 'confirm'],
  setup(props, context) {
    const {
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
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
    });
    const internalData = {
      yearSize: 12,
      monthSize: 20,
      quarterSize: 8,
      hpTimeout: undefined
    };
    const refElem = (0, _vue.ref)();
    const refPanelWrapper = (0, _vue.ref)();
    const refInputTimeBody = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xeDatePanel = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    };
    const computeIsDateTimeType = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      return type === 'time' || type === 'datetime';
    });
    const computeIsDatePanelType = (0, _vue.computed)(() => {
      const isDateTimeType = computeIsDateTimeType.value;
      return isDateTimeType || ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1;
    });
    const computeDateStartTime = (0, _vue.computed)(() => {
      return props.startDate ? _xeUtils.default.toStringDate(props.startDate) : null;
    });
    const computeDateEndTime = (0, _vue.computed)(() => {
      return props.endDate ? _xeUtils.default.toStringDate(props.endDate) : null;
    });
    const computeDateListValue = (0, _vue.computed)(() => {
      const {
        modelValue,
        multiple
      } = props;
      const isDatePanelType = computeIsDatePanelType.value;
      const dateValueFormat = computeDateValueFormat.value;
      if (multiple && modelValue && isDatePanelType) {
        return _xeUtils.default.toValueString(modelValue).split(',').map(item => {
          const date = parseDate(item, dateValueFormat);
          if (_xeUtils.default.isValidDate(date)) {
            return date;
          }
          return date;
        });
      }
      return [];
    });
    const computeDateMultipleValue = (0, _vue.computed)(() => {
      const dateListValue = computeDateListValue.value;
      const dateValueFormat = computeDateValueFormat.value;
      return dateListValue.map(date => _xeUtils.default.toDateString(date, dateValueFormat));
    });
    const computeDateMultipleLabel = (0, _vue.computed)(() => {
      const dateListValue = computeDateListValue.value;
      const dateLabelFormat = computeDateLabelFormat.value;
      return dateListValue.map(date => _xeUtils.default.toDateString(date, dateLabelFormat)).join(', ');
    });
    const computeLimitMaxCount = (0, _vue.computed)(() => {
      return props.multiple ? _xeUtils.default.toNumber(props.limitCount) : 0;
    });
    const computeOverCount = (0, _vue.computed)(() => {
      const {
        multiple
      } = props;
      const limitMaxCount = computeLimitMaxCount.value;
      const dateMultipleValue = computeDateMultipleValue.value;
      if (multiple && limitMaxCount) {
        return dateMultipleValue.length >= limitMaxCount;
      }
      return false;
    });
    const computeTimeOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().datePanel.timeConfig, props.timeConfig);
    });
    const computeDateValueFormat = (0, _vue.computed)(() => {
      const {
        type,
        valueFormat
      } = props;
      return (0, _util.handleValueFormat)(type, valueFormat);
    });
    const computeDateValue = (0, _vue.computed)(() => {
      const {
        modelValue
      } = props;
      const isDatePanelType = computeIsDatePanelType.value;
      const dateValueFormat = computeDateValueFormat.value;
      let val = null;
      if (modelValue && isDatePanelType) {
        const date = parseDate(modelValue, dateValueFormat);
        if (_xeUtils.default.isValidDate(date)) {
          val = date;
        }
      }
      return val;
    });
    const computeIsDisabledPrevDateBtn = (0, _vue.computed)(() => {
      const dateStartTime = computeDateStartTime.value;
      const {
        selectMonth
      } = reactData;
      if (selectMonth && dateStartTime) {
        return selectMonth <= dateStartTime;
      }
      return false;
    });
    const computeIsDisabledNextDateBtn = (0, _vue.computed)(() => {
      const dateEndTime = computeDateEndTime.value;
      const {
        selectMonth
      } = reactData;
      if (selectMonth && dateEndTime) {
        return _xeUtils.default.getWhatMonth(selectMonth, 0, 'last') >= dateEndTime;
      }
      return false;
    });
    const computeDateTimeLabel = (0, _vue.computed)(() => {
      const {
        datetimePanelValue
      } = reactData;
      const hasTimeSecond = computeHasTimeSecond.value;
      const hasTimeMinute = computeHasTimeMinute.value;
      if (datetimePanelValue) {
        return _xeUtils.default.toDateString(datetimePanelValue, hasTimeMinute && hasTimeSecond ? 'HH:mm:ss' : hasTimeMinute ? 'HH:mm' : 'HH');
      }
      return '';
    });
    const computeDateHMSTime = (0, _vue.computed)(() => {
      const dateValue = computeDateValue.value;
      const isDateTimeType = computeIsDateTimeType.value;
      return dateValue && isDateTimeType ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1000 : 0;
    });
    const computeDateLabelFormat = (0, _vue.computed)(() => {
      const {
        labelFormat
      } = props;
      const isDatePanelType = computeIsDatePanelType.value;
      if (isDatePanelType) {
        return labelFormat || (0, _ui.getI18n)(`vxe.input.date.labelFormat.${props.type}`);
      }
      return '';
    });
    const computeYearList = (0, _vue.computed)(() => {
      const {
        yearSize
      } = internalData;
      const {
        selectMonth,
        currentDate
      } = reactData;
      const years = [];
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear();
        const selectFullYear = selectMonth.getFullYear();
        const startYearDate = new Date(selectFullYear - selectFullYear % yearSize, 0, 1);
        for (let index = -4; index < yearSize + 4; index++) {
          const date = _xeUtils.default.getWhatYear(startYearDate, index, 'first');
          const itemFullYear = date.getFullYear();
          years.push({
            date,
            isCurrent: true,
            isPrev: index < 0,
            isNow: currFullYear === itemFullYear,
            isNext: index >= yearSize,
            year: itemFullYear
          });
        }
      }
      return years;
    });
    const computeSelectDatePanelObj = (0, _vue.computed)(() => {
      const isDatePanelType = computeIsDatePanelType.value;
      let y = '';
      let m = '';
      if (isDatePanelType) {
        const {
          datePanelType,
          selectMonth
        } = reactData;
        const yearList = computeYearList.value;
        let year = '';
        let month;
        if (selectMonth) {
          year = selectMonth.getFullYear();
          month = selectMonth.getMonth() + 1;
        }
        if (datePanelType === 'quarter' || datePanelType === 'month') {
          y = (0, _ui.getI18n)('vxe.datePicker.yearTitle', [year]);
        } else if (datePanelType === 'year') {
          y = yearList.length ? `${yearList[0].year} - ${yearList[yearList.length - 1].year}` : '';
        } else {
          y = (0, _ui.getI18n)('vxe.datePicker.yearTitle', [year]);
          m = month ? (0, _ui.getI18n)(`vxe.input.date.m${month}`) : '-';
        }
      }
      return {
        y,
        m
      };
    });
    const computeFirstDayOfWeek = (0, _vue.computed)(() => {
      const {
        startDay
      } = props;
      return _xeUtils.default.toNumber(startDay);
    });
    const computeWeekDatas = (0, _vue.computed)(() => {
      const weeks = [];
      const isDatePanelType = computeIsDatePanelType.value;
      if (isDatePanelType) {
        let sWeek = computeFirstDayOfWeek.value;
        weeks.push(sWeek);
        for (let index = 0; index < 6; index++) {
          if (sWeek >= 6) {
            sWeek = 0;
          } else {
            sWeek++;
          }
          weeks.push(sWeek);
        }
      }
      return weeks;
    });
    const computeDateHeaders = (0, _vue.computed)(() => {
      const isDatePanelType = computeIsDatePanelType.value;
      if (isDatePanelType) {
        const weekDatas = computeWeekDatas.value;
        return weekDatas.map(day => {
          return {
            value: day,
            label: (0, _ui.getI18n)(`vxe.input.date.weeks.w${day}`)
          };
        });
      }
      return [];
    });
    const computeWeekHeaders = (0, _vue.computed)(() => {
      const isDatePanelType = computeIsDatePanelType.value;
      if (isDatePanelType) {
        const dateHeaders = computeDateHeaders.value;
        return [{
          label: (0, _ui.getI18n)('vxe.input.date.weeks.w')
        }].concat(dateHeaders);
      }
      return [];
    });
    const computeYearDatas = (0, _vue.computed)(() => {
      const yearList = computeYearList.value;
      return _xeUtils.default.chunk(yearList, 4);
    });
    const computeQuarterList = (0, _vue.computed)(() => {
      const {
        quarterSize
      } = internalData;
      const {
        selectMonth,
        currentDate
      } = reactData;
      const quarters = [];
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear();
        const currQuarter = (0, _util.getDateQuarter)(currentDate);
        const firstYear = _xeUtils.default.getWhatYear(selectMonth, 0, 'first');
        const selFullYear = firstYear.getFullYear();
        for (let index = -2; index < quarterSize - 2; index++) {
          const date = _xeUtils.default.getWhatQuarter(firstYear, index);
          const itemFullYear = date.getFullYear();
          const itemQuarter = (0, _util.getDateQuarter)(date);
          const isPrev = itemFullYear < selFullYear;
          quarters.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemQuarter === currQuarter,
            isNext: !isPrev && itemFullYear > selFullYear,
            quarter: itemQuarter
          });
        }
      }
      return quarters;
    });
    const computeQuarterDatas = (0, _vue.computed)(() => {
      const quarterList = computeQuarterList.value;
      return _xeUtils.default.chunk(quarterList, 2);
    });
    const computeMonthList = (0, _vue.computed)(() => {
      const {
        monthSize
      } = internalData;
      const {
        selectMonth,
        currentDate
      } = reactData;
      const months = [];
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear();
        const currMonth = currentDate.getMonth();
        const selFullYear = _xeUtils.default.getWhatYear(selectMonth, 0, 'first').getFullYear();
        for (let index = -4; index < monthSize - 4; index++) {
          const date = _xeUtils.default.getWhatYear(selectMonth, 0, index);
          const itemFullYear = date.getFullYear();
          const itemMonth = date.getMonth();
          const isPrev = itemFullYear < selFullYear;
          months.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth,
            isNext: !isPrev && itemFullYear > selFullYear,
            month: itemMonth
          });
        }
      }
      return months;
    });
    const computeMonthDatas = (0, _vue.computed)(() => {
      const monthList = computeMonthList.value;
      return _xeUtils.default.chunk(monthList, 4);
    });
    const computeDayList = (0, _vue.computed)(() => {
      const {
        selectMonth,
        currentDate
      } = reactData;
      const days = [];
      if (selectMonth && currentDate) {
        const dateHMSTime = computeDateHMSTime.value;
        const weekDatas = computeWeekDatas.value;
        const currFullYear = currentDate.getFullYear();
        const currMonth = currentDate.getMonth();
        const currDate = currentDate.getDate();
        const selFullYear = selectMonth.getFullYear();
        const selMonth = selectMonth.getMonth();
        const selDay = selectMonth.getDay();
        const prevOffsetDate = -weekDatas.indexOf(selDay);
        const startDayDate = new Date(_xeUtils.default.getWhatDay(selectMonth, prevOffsetDate).getTime() + dateHMSTime);
        for (let index = 0; index < 42; index++) {
          const date = _xeUtils.default.getWhatDay(startDayDate, index);
          const itemFullYear = date.getFullYear();
          const itemMonth = date.getMonth();
          const itemDate = date.getDate();
          const isPrev = date < selectMonth;
          days.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear && itemMonth === selMonth,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth && itemDate === currDate,
            isNext: !isPrev && selMonth !== itemMonth,
            label: itemDate
          });
        }
      }
      return days;
    });
    const computeDayDatas = (0, _vue.computed)(() => {
      const dayList = computeDayList.value;
      return _xeUtils.default.chunk(dayList, 7);
    });
    const computeWeekDates = (0, _vue.computed)(() => {
      const dayDatas = computeDayDatas.value;
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      return dayDatas.map(list => {
        const firstItem = list[0];
        const item = {
          date: firstItem.date,
          isWeekNumber: true,
          isPrev: false,
          isCurrent: false,
          isNow: false,
          isNext: false,
          label: _xeUtils.default.getYearWeek(firstItem.date, firstDayOfWeek)
        };
        return [item].concat(list);
      });
    });
    const computeHourList = (0, _vue.computed)(() => {
      const timeOpts = computeTimeOpts.value;
      const {
        hours: hourOptions,
        hourDisabledMethod
      } = timeOpts;
      const list = [];
      const isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        if (hourOptions && hourOptions.length) {
          hourOptions.forEach(item => {
            if (_xeUtils.default.isNumber(item) || _xeUtils.default.isString(item)) {
              const hour = _xeUtils.default.toNumber(item);
              list.push({
                value: hour,
                label: ('' + hour).padStart(2, '0'),
                disabled: !!(hourDisabledMethod && hourDisabledMethod({
                  hour
                }))
              });
            } else if (item) {
              const hour = _xeUtils.default.toNumber(item.value);
              list.push({
                value: hour,
                label: ('' + (item.label || hour)).padStart(2, '0'),
                disabled: _xeUtils.default.isBoolean(item.disabled) ? item.disabled : !!(hourDisabledMethod && hourDisabledMethod({
                  hour
                }))
              });
            }
          });
        } else {
          for (let index = 0; index < 24; index++) {
            const hour = index;
            list.push({
              value: hour,
              label: ('' + hour).padStart(2, '0'),
              disabled: !!(hourDisabledMethod && hourDisabledMethod({
                hour
              }))
            });
          }
        }
      }
      return list;
    });
    const computeMinuteList = (0, _vue.computed)(() => {
      const timeOpts = computeTimeOpts.value;
      const {
        minutes: minuteOptions,
        minuteDisabledMethod
      } = timeOpts;
      const list = [];
      const isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        if (minuteOptions && minuteOptions.length) {
          minuteOptions.forEach(item => {
            if (_xeUtils.default.isNumber(item) || _xeUtils.default.isString(item)) {
              const minute = _xeUtils.default.toNumber(item);
              list.push({
                value: minute,
                label: ('' + minute).padStart(2, '0'),
                disabled: !!(minuteDisabledMethod && minuteDisabledMethod({
                  minute
                }))
              });
            } else if (item) {
              const minute = _xeUtils.default.toNumber(item.value);
              list.push({
                value: minute,
                label: ('' + (item.label || minute)).padStart(2, '0'),
                disabled: _xeUtils.default.isBoolean(item.disabled) ? item.disabled : !!(minuteDisabledMethod && minuteDisabledMethod({
                  minute
                }))
              });
            }
          });
        } else {
          for (let index = 0; index < 60; index++) {
            const minute = index;
            list.push({
              value: minute,
              label: ('' + minute).padStart(2, '0'),
              disabled: !!(minuteDisabledMethod && minuteDisabledMethod({
                minute
              }))
            });
          }
        }
      }
      return list;
    });
    const computeHasTimeMinute = (0, _vue.computed)(() => {
      const {
        timeFormat
      } = props;
      const dateValueFormat = computeDateValueFormat.value;
      return !/HH/.test(timeFormat || dateValueFormat) || /mm/.test(timeFormat || dateValueFormat);
    });
    const computeHasTimeSecond = (0, _vue.computed)(() => {
      const {
        timeFormat
      } = props;
      const dateValueFormat = computeDateValueFormat.value;
      return !/HH/.test(timeFormat || dateValueFormat) || /ss/.test(timeFormat || dateValueFormat);
    });
    const computeSecondList = (0, _vue.computed)(() => {
      const timeOpts = computeTimeOpts.value;
      const {
        seconds: secondOptions,
        secondDisabledMethod
      } = timeOpts;
      const list = [];
      const isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        if (secondOptions && secondOptions.length) {
          secondOptions.forEach(item => {
            if (_xeUtils.default.isNumber(item) || _xeUtils.default.isString(item)) {
              const second = _xeUtils.default.toNumber(item);
              list.push({
                value: second,
                label: ('' + second).padStart(2, '0'),
                disabled: !!(secondDisabledMethod && secondDisabledMethod({
                  second
                }))
              });
            } else if (item) {
              const second = _xeUtils.default.toNumber(item.value);
              list.push({
                value: second,
                label: ('' + (item.label || second)).padStart(2, '0'),
                disabled: _xeUtils.default.isBoolean(item.disabled) ? item.disabled : !!(secondDisabledMethod && secondDisabledMethod({
                  second
                }))
              });
            }
          });
        } else {
          for (let index = 0; index < 60; index++) {
            const second = index;
            list.push({
              value: second,
              label: ('' + second).padStart(2, '0'),
              disabled: !!(secondDisabledMethod && secondDisabledMethod({
                second
              }))
            });
          }
        }
      }
      return list;
    });
    const updateModelValue = modelValue => {
      const {
        type
      } = props;
      const dateValueFormat = computeDateValueFormat.value;
      const inpDate = (0, _util.parseDateValue)(modelValue, type, {
        valueFormat: dateValueFormat
      });
      reactData.inputValue = inpDate;
      reactData.inputLabel = inpDate;
      dateOpenPanel();
    };
    const parseDate = (value, format) => {
      const {
        type,
        multiple
      } = props;
      if (type === 'time') {
        return (0, _util.toStringTimeDate)(value);
      }
      if (_xeUtils.default.isArray(value)) {
        return _xeUtils.default.toStringDate(value[0], format);
      }
      if (_xeUtils.default.isString(value)) {
        return _xeUtils.default.toStringDate(multiple ? _xeUtils.default.last(value.split(',')) : value, format);
      }
      return _xeUtils.default.toStringDate(value, format);
    };
    const dateRevert = () => {
      reactData.inputLabel = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
    };
    const afterCheckValue = inpVal => {
      const {
        type
      } = props;
      const {
        inputLabel,
        datetimePanelValue
      } = reactData;
      const dateLabelFormat = computeDateLabelFormat.value;
      if (inpVal) {
        let inpDateVal = parseDate(inpVal, dateLabelFormat);
        if (_xeUtils.default.isValidDate(inpDateVal)) {
          if (type === 'time') {
            inpDateVal = _xeUtils.default.toDateString(inpDateVal, dateLabelFormat);
            if (inputLabel !== inpDateVal) {
              handleChange(inpDateVal, {
                type: 'check'
              });
            }
            reactData.inputLabel = inpDateVal;
          } else {
            let isChange = false;
            const firstDayOfWeek = computeFirstDayOfWeek.value;
            if (type === 'datetime') {
              const dateValue = computeDateValue.value;
              if (inpVal !== _xeUtils.default.toDateString(dateValue, dateLabelFormat) || inpVal !== _xeUtils.default.toDateString(inpDateVal, dateLabelFormat)) {
                isChange = true;
                if (datetimePanelValue) {
                  datetimePanelValue.setHours(inpDateVal.getHours());
                  datetimePanelValue.setMinutes(inpDateVal.getMinutes());
                  datetimePanelValue.setSeconds(inpDateVal.getSeconds());
                }
              }
            } else {
              isChange = true;
            }
            reactData.inputLabel = _xeUtils.default.toDateString(inpDateVal, dateLabelFormat, {
              firstDay: firstDayOfWeek
            });
            if (isChange) {
              dateChange(inpDateVal);
            }
          }
        } else {
          dateRevert();
        }
      } else {
        handleChange('', {
          type: 'check'
        });
      }
    };
    const emitModel = value => {
      reactData.inputValue = value;
      emit('update:modelValue', value);
    };
    const handleChange = (value, evnt) => {
      const {
        type,
        modelValue,
        valueFormat
      } = props;
      const dateValueFormat = computeDateValueFormat.value;
      reactData.inputLabel = value;
      if ((0, _util.hasTimestampValueType)(valueFormat)) {
        const dateVal = (0, _util.parseDateValue)(value, type, {
          valueFormat: dateValueFormat
        });
        const timeNum = dateVal ? dateVal.getTime() : null;
        emitModel(timeNum);
        if (modelValue !== timeNum) {
          dispatchEvent('change', {
            value: timeNum
          }, evnt);
        }
      } else if ((0, _util.hasDateValueType)(valueFormat)) {
        const dateVal = (0, _util.parseDateValue)(value, type, {
          valueFormat: dateValueFormat
        });
        emitModel(dateVal);
        if (modelValue && dateVal ? _xeUtils.default.toStringDate(modelValue).getTime() !== dateVal.getTime() : modelValue !== dateVal) {
          dispatchEvent('change', {
            value: dateVal
          }, evnt);
        }
      } else {
        emitModel(value);
        if (_xeUtils.default.toValueString(modelValue) !== value) {
          dispatchEvent('change', {
            value
          }, evnt);
        }
      }
    };
    const hidePanel = () => {
      return new Promise(resolve => {
        reactData.visiblePanel = false;
        internalData.hpTimeout = setTimeout(() => {
          reactData.isAniVisible = false;
          resolve();
        }, 350);
      });
    };
    const dateParseValue = val => {
      const {
        type
      } = props;
      const dateLabelFormat = computeDateLabelFormat.value;
      const dateValueFormat = computeDateValueFormat.value;
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      const dateObj = (0, _util.parseDateObj)(val, type, {
        valueFormat: dateValueFormat,
        labelFormat: dateLabelFormat,
        firstDay: firstDayOfWeek
      });
      reactData.datePanelValue = dateObj.value;
      reactData.datePanelLabel = dateObj.label;
    };
    /**
     * 值变化时处理
     */
    const changeValue = () => {
      const isDatePanelType = computeIsDatePanelType.value;
      const {
        inputLabel
      } = reactData;
      if (isDatePanelType) {
        dateParseValue(inputLabel);
        reactData.inputLabel = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
      }
    };
    /**
     * 检查初始值
     */
    const initValue = () => {
      const {
        modelValue
      } = props;
      const isDatePanelType = computeIsDatePanelType.value;
      updateModelValue(modelValue);
      if (isDatePanelType) {
        changeValue();
      }
    };
    const dateCheckMonth = date => {
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      const weekNum = _xeUtils.default.getYearWeek(date, firstDayOfWeek);
      const weekStartDate = _xeUtils.default.getWhatWeek(date, 0, firstDayOfWeek, firstDayOfWeek);
      const month = _xeUtils.default.getWhatMonth(weekNum === 1 ? _xeUtils.default.getWhatDay(weekStartDate, 6) : date, 0, 'first');
      if (!_xeUtils.default.isEqual(month, reactData.selectMonth)) {
        reactData.selectMonth = month;
      }
    };
    const dateChange = (date, isReload) => {
      const {
        modelValue,
        multiple
      } = props;
      const {
        datetimePanelValue
      } = reactData;
      const isDateTimeType = computeIsDateTimeType.value;
      const dateValueFormat = computeDateValueFormat.value;
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      if (props.type === 'week') {
        const sWeek = _xeUtils.default.toNumber(props.selectDay);
        date = _xeUtils.default.getWhatWeek(date, 0, sWeek, firstDayOfWeek);
      } else if (isDateTimeType) {
        if (datetimePanelValue) {
          date.setHours(datetimePanelValue.getHours());
          date.setMinutes(datetimePanelValue.getMinutes());
          date.setSeconds(datetimePanelValue.getSeconds());
        }
      }
      const inpVal = _xeUtils.default.toDateString(date, dateValueFormat, {
        firstDay: firstDayOfWeek
      });
      dateCheckMonth(date);
      if (multiple) {
        const overCount = computeOverCount.value;
        // 如果为多选
        if (isDateTimeType) {
          // 如果是datetime特殊类型
          const dateListValue = isReload ? [] : [...computeDateListValue.value];
          const datetimeRest = [];
          const eqIndex = _xeUtils.default.findIndexOf(dateListValue, val => _xeUtils.default.isDateSame(date, val, 'yyyyMMdd'));
          if (eqIndex === -1) {
            if (overCount) {
              // 如果超出最大多选数量
              return;
            }
            dateListValue.push(date);
          } else {
            dateListValue.splice(eqIndex, 1);
          }
          dateListValue.forEach(item => {
            if (item) {
              if (datetimePanelValue) {
                item.setHours(datetimePanelValue.getHours());
                item.setMinutes(datetimePanelValue.getMinutes());
                item.setSeconds(datetimePanelValue.getSeconds());
              }
              datetimeRest.push(item);
            }
          });
          handleChange(datetimeRest.map(date => _xeUtils.default.toDateString(date, dateValueFormat)).join(','), {
            type: 'update'
          });
        } else {
          const dateMultipleValue = isReload ? [] : computeDateMultipleValue.value;
          // 如果是日期类型
          if (dateMultipleValue.some(val => _xeUtils.default.isEqual(val, inpVal))) {
            handleChange(dateMultipleValue.filter(val => !_xeUtils.default.isEqual(val, inpVal)).join(','), {
              type: 'update'
            });
          } else {
            if (overCount) {
              // 如果超出最大多选数量
              return;
            }
            handleChange(dateMultipleValue.concat([inpVal]).join(','), {
              type: 'update'
            });
          }
        }
      } else {
        // 如果为单选
        if (!_xeUtils.default.isEqual(modelValue, inpVal)) {
          handleChange(inpVal, {
            type: 'update'
          });
        }
      }
    };
    // 日期
    const dateMonthHandle = (date, offsetMonth) => {
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      const weekNum = _xeUtils.default.getYearWeek(date, firstDayOfWeek);
      const weekStartDate = _xeUtils.default.getWhatWeek(date, 0, firstDayOfWeek, firstDayOfWeek);
      const month = _xeUtils.default.getWhatMonth(weekNum === 1 ? _xeUtils.default.getWhatDay(weekStartDate, 6) : date, offsetMonth, 'first');
      reactData.selectMonth = month;
    };
    const dateNowHandle = () => {
      const {
        type
      } = props;
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      let currentDate = new Date();
      switch (type) {
        case 'week':
          currentDate = _xeUtils.default.getWhatWeek(currentDate, 0, firstDayOfWeek);
          break;
        case 'datetime':
          currentDate = new Date();
          reactData.datetimePanelValue = new Date();
          break;
        default:
          currentDate = _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
          break;
      }
      reactData.currentDate = currentDate;
      dateMonthHandle(currentDate, 0);
    };
    const dateToggleYearTypeEvent = () => {
      reactData.datePanelType = 'year';
    };
    const dateToggleMonthTypeEvent = () => {
      let {
        datePanelType
      } = reactData;
      if (datePanelType === 'month' || datePanelType === 'quarter') {
        datePanelType = 'year';
      } else {
        datePanelType = 'month';
      }
      reactData.datePanelType = datePanelType;
    };
    const datePrevEvent = evnt => {
      const {
        type
      } = props;
      const {
        datePanelType,
        selectMonth,
        inputLabel
      } = reactData;
      const {
        yearSize
      } = internalData;
      const value = inputLabel;
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value;
      if (!isDisabledPrevDateBtn) {
        let viewDate;
        if (type === 'year') {
          viewDate = _xeUtils.default.getWhatYear(selectMonth, -yearSize, 'first');
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            viewDate = _xeUtils.default.getWhatYear(selectMonth, -yearSize, 'first');
          } else {
            viewDate = _xeUtils.default.getWhatYear(selectMonth, -1, 'first');
          }
        } else {
          if (datePanelType === 'year') {
            viewDate = _xeUtils.default.getWhatYear(selectMonth, -yearSize, 'first');
          } else if (datePanelType === 'month') {
            viewDate = _xeUtils.default.getWhatYear(selectMonth, -1, 'first');
          } else {
            viewDate = _xeUtils.default.getWhatMonth(selectMonth, -1, 'first');
          }
        }
        reactData.selectMonth = viewDate;
        dispatchEvent('date-prev', {
          viewType: datePanelType,
          viewDate,
          value,
          type
        }, evnt);
      }
    };
    const dateTodayMonthEvent = evnt => {
      dateNowHandle();
      dateChange(reactData.currentDate, true);
      if (!props.multiple) {
        hidePanel();
      }
      dispatchEvent('date-today', {
        type: props.type
      }, evnt);
    };
    const dateNextEvent = evnt => {
      const {
        type
      } = props;
      const {
        datePanelType,
        selectMonth,
        inputLabel
      } = reactData;
      const {
        yearSize
      } = internalData;
      const value = inputLabel;
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value;
      if (!isDisabledNextDateBtn) {
        let viewDate;
        if (type === 'year') {
          viewDate = _xeUtils.default.getWhatYear(selectMonth, yearSize, 'first');
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            viewDate = _xeUtils.default.getWhatYear(selectMonth, yearSize, 'first');
          } else {
            viewDate = _xeUtils.default.getWhatYear(selectMonth, 1, 'first');
          }
        } else {
          if (datePanelType === 'year') {
            viewDate = _xeUtils.default.getWhatYear(selectMonth, yearSize, 'first');
          } else if (datePanelType === 'month') {
            viewDate = _xeUtils.default.getWhatYear(selectMonth, 1, 'first');
          } else {
            viewDate = _xeUtils.default.getWhatMonth(selectMonth, 1, 'first');
          }
        }
        reactData.selectMonth = viewDate;
        dispatchEvent('date-next', {
          viewType: datePanelType,
          value,
          type
        }, evnt);
      }
    };
    const isRangeDisabled = item => {
      const dateStartTime = computeDateStartTime.value;
      const dateEndTime = computeDateEndTime.value;
      const {
        date
      } = item;
      if (dateStartTime && dateStartTime.getTime() > date.getTime()) {
        return true;
      }
      if (dateEndTime && dateEndTime.getTime() < date.getTime()) {
        return true;
      }
      return false;
    };
    const isDateDisabled = item => {
      const {
        disabledMethod
      } = props;
      const {
        datePanelType
      } = reactData;
      const {
        date
      } = item;
      if (disabledMethod) {
        return disabledMethod({
          type: datePanelType,
          viewType: datePanelType,
          date,
          $datePanel: $xeDatePanel
        });
      }
      return false;
    };
    const hasAllDisabled = item => {
      return isRangeDisabled(item) || isDateDisabled(item);
    };
    const dateSelectItem = date => {
      const {
        type,
        multiple
      } = props;
      const {
        datePanelType
      } = reactData;
      if (type === 'month') {
        if (datePanelType === 'year') {
          reactData.datePanelType = 'month';
          dateCheckMonth(date);
        } else {
          dateChange(date);
          if (!multiple) {
            hidePanel();
          }
        }
      } else if (type === 'year') {
        dateChange(date);
        if (!multiple) {
          hidePanel();
        }
      } else if (type === 'quarter') {
        if (datePanelType === 'year') {
          reactData.datePanelType = 'quarter';
          dateCheckMonth(date);
        } else {
          dateChange(date);
          if (!multiple) {
            hidePanel();
          }
        }
      } else {
        if (datePanelType === 'month') {
          reactData.datePanelType = type === 'week' ? type : 'day';
          dateCheckMonth(date);
        } else if (datePanelType === 'year') {
          reactData.datePanelType = 'month';
          dateCheckMonth(date);
        } else {
          dateChange(date);
          if (type === 'datetime') {
            // 日期带时间
          } else {
            if (!multiple) {
              hidePanel();
            }
          }
        }
      }
    };
    const dateSelectEvent = item => {
      if (!hasAllDisabled(item)) {
        dateSelectItem(item.date);
      }
    };
    const dateMoveDay = offsetDay => {
      if (!hasAllDisabled({
        date: offsetDay
      })) {
        const dayList = computeDayList.value;
        if (!dayList.some(item => _xeUtils.default.isDateSame(item.date, offsetDay, 'yyyyMMdd'))) {
          dateCheckMonth(offsetDay);
        }
        dateParseValue(offsetDay);
      }
    };
    const dateMoveYear = offsetYear => {
      if (!hasAllDisabled({
        date: offsetYear
      })) {
        const yearList = computeYearList.value;
        if (!yearList.some(item => _xeUtils.default.isDateSame(item.date, offsetYear, 'yyyy'))) {
          dateCheckMonth(offsetYear);
        }
        dateParseValue(offsetYear);
      }
    };
    const dateMoveQuarter = offsetQuarter => {
      if (!hasAllDisabled({
        date: offsetQuarter
      })) {
        const quarterList = computeQuarterList.value;
        if (!quarterList.some(item => _xeUtils.default.isDateSame(item.date, offsetQuarter, 'yyyyq'))) {
          dateCheckMonth(offsetQuarter);
        }
        dateParseValue(offsetQuarter);
      }
    };
    const dateMoveMonth = offsetMonth => {
      if (!hasAllDisabled({
        date: offsetMonth
      })) {
        const monthList = computeMonthList.value;
        if (!monthList.some(item => _xeUtils.default.isDateSame(item.date, offsetMonth, 'yyyyMM'))) {
          dateCheckMonth(offsetMonth);
        }
        dateParseValue(offsetMonth);
      }
    };
    const dateMouseenterEvent = item => {
      if (!hasAllDisabled(item)) {
        const {
          datePanelType
        } = reactData;
        if (datePanelType === 'month') {
          dateMoveMonth(item.date);
        } else if (datePanelType === 'quarter') {
          dateMoveQuarter(item.date);
        } else if (datePanelType === 'year') {
          dateMoveYear(item.date);
        } else {
          dateMoveDay(item.date);
        }
      }
    };
    const dateMouseleaveEvent = () => {
      reactData.datePanelValue = null;
    };
    const updateTimePos = liElem => {
      if (liElem) {
        const height = liElem.offsetHeight;
        const ulElem = liElem.parentNode;
        ulElem.scrollTop = liElem.offsetTop - height * 4;
      }
    };
    const dateTimeChangeEvent = evnt => {
      const {
        datetimePanelValue
      } = reactData;
      reactData.datetimePanelValue = datetimePanelValue ? new Date(datetimePanelValue.getTime()) : new Date();
      updateTimePos(evnt.currentTarget);
    };
    const dateHourEvent = (evnt, item) => {
      const {
        datetimePanelValue
      } = reactData;
      if (!item.disabled) {
        if (datetimePanelValue) {
          datetimePanelValue.setHours(item.value);
        }
        dateTimeChangeEvent(evnt);
      }
    };
    const dateConfirmEvent = evnt => {
      const {
        multiple
      } = props;
      const {
        datetimePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        const dateValueFormat = computeDateValueFormat.value;
        if (multiple) {
          // 如果为多选
          const dateMultipleValue = computeDateMultipleValue.value;
          if (isDateTimeType) {
            // 如果是datetime特殊类型
            const dateListValue = [...computeDateListValue.value];
            const datetimeRest = [];
            dateListValue.forEach(item => {
              if (item) {
                if (datetimePanelValue) {
                  item.setHours(datetimePanelValue.getHours());
                  item.setMinutes(datetimePanelValue.getMinutes());
                  item.setSeconds(datetimePanelValue.getSeconds());
                }
                datetimeRest.push(item);
              }
            });
            handleChange(datetimeRest.map(date => _xeUtils.default.toDateString(date, dateValueFormat)).join(','), {
              type: 'update'
            });
          } else {
            // 如果是日期类型
            handleChange(dateMultipleValue.join(','), {
              type: 'update'
            });
          }
        } else {
          dateChange(dateValue || reactData.currentDate);
        }
      }
      hidePanel();
      dispatchEvent('confirm', {}, evnt);
    };
    const dateMinuteEvent = (evnt, item) => {
      const {
        datetimePanelValue
      } = reactData;
      if (!item.disabled) {
        if (datetimePanelValue) {
          datetimePanelValue.setMinutes(item.value);
        }
        dateTimeChangeEvent(evnt);
      }
    };
    const dateSecondEvent = (evnt, item) => {
      const {
        datetimePanelValue
      } = reactData;
      if (!item.disabled) {
        if (datetimePanelValue) {
          datetimePanelValue.setSeconds(item.value);
        }
        dateTimeChangeEvent(evnt);
      }
    };
    const dateOpenPanel = () => {
      const {
        type,
        defaultDate,
        defaultTime
      } = props;
      const isDateTimeType = computeIsDateTimeType.value;
      const dateValue = computeDateValue.value;
      if (['year', 'quarter', 'month', 'week'].indexOf(type) > -1) {
        reactData.datePanelType = type;
      } else {
        reactData.datePanelType = 'day';
      }
      reactData.currentDate = _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
      if (dateValue) {
        dateMonthHandle(dateValue, 0);
        dateParseValue(dateValue);
      } else {
        if (defaultDate) {
          // 面板默认日期仅支持解析 yyyy-MM-dd
          const defDate = parseDate(defaultDate, 'yyyy-MM-dd');
          if (_xeUtils.default.isValidDate(defDate)) {
            dateMonthHandle(defDate, 0);
          } else {
            dateNowHandle();
          }
        } else {
          dateNowHandle();
        }
      }
      if (isDateTimeType) {
        let dtPanelValue = reactData.datePanelValue;
        if (!dtPanelValue) {
          dtPanelValue = _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
          if (defaultTime) {
            const defTime = (0, _util.toStringTimeDate)(defaultTime);
            if (_xeUtils.default.isValidDate(defTime)) {
              dtPanelValue.setHours(defTime.getHours());
              dtPanelValue.setMinutes(defTime.getMinutes());
              dtPanelValue.setSeconds(defTime.getSeconds());
            }
          }
        }
        reactData.datetimePanelValue = dtPanelValue;
        (0, _vue.nextTick)(() => {
          const timeBodyElem = refInputTimeBody.value;
          _xeUtils.default.arrayEach(timeBodyElem.querySelectorAll('li.is--selected'), elem => {
            updateTimePos(elem);
          });
        });
      }
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $datePanel: $xeDatePanel
      }, params));
    };
    const datePanelMethods = {
      dispatchEvent,
      getModelValue() {
        return reactData.inputValue;
      },
      setPanelDate(date) {
        if (date) {
          dateCheckMonth(date);
        }
      },
      getPanelDate() {
        return reactData.selectMonth;
      },
      checkValue(value) {
        afterCheckValue(value);
      },
      confirmByEvent(evnt) {
        dateConfirmEvent(evnt);
      }
    };
    Object.assign($xeDatePanel, datePanelMethods);
    const renderDateLabel = (item, label) => {
      const {
        festivalMethod
      } = props;
      const labelVNs = [];
      if (festivalMethod) {
        const {
          datePanelType
        } = reactData;
        const festivalRest = festivalMethod({
          type: datePanelType,
          viewType: datePanelType,
          date: item.date,
          $datePanel: $xeDatePanel
        });
        const festivalItem = festivalRest ? _xeUtils.default.isString(festivalRest) ? {
          label: festivalRest
        } : festivalRest : {};
        const extraItem = festivalItem.extra ? _xeUtils.default.isString(festivalItem.extra) ? {
          label: festivalItem.extra
        } : festivalItem.extra : null;
        labelVNs.push((0, _vue.h)('div', {
          class: ['vxe-date-panel--label', {
            'is-notice': festivalItem.notice
          }]
        }, extraItem && extraItem.label ? [(0, _vue.h)('div', {
          class: 'vxe-date-panel--label--number'
        }, `${label}`), (0, _vue.h)('div', {
          class: ['vxe-date-panel--label--extra', extraItem.important ? 'is-important' : '', extraItem.className],
          style: extraItem.style
        }, _xeUtils.default.toValueString(extraItem.label))] : `${label}`));
        const festivalLabel = festivalItem.label;
        if (festivalLabel) {
          // 默认最多支持3个节日重叠
          const festivalLabels = _xeUtils.default.toValueString(festivalLabel).split(',');
          labelVNs.push((0, _vue.h)('div', {
            class: ['vxe-date-panel--festival', festivalItem.important ? 'is-important' : '', festivalItem.className],
            style: festivalItem.style
          }, [festivalLabels.length > 1 ? (0, _vue.h)('div', {
            class: ['vxe-date-panel--festival--overlap', `overlap--${festivalLabels.length}`]
          }, festivalLabels.map(label => (0, _vue.h)('div', label.substring(0, 3)))) : (0, _vue.h)('div', {
            class: 'vxe-date-panel--festival--label'
          }, festivalLabels[0].substring(0, 3))]));
        }
      }
      return labelVNs;
    };
    const renderDateDayTable = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const dateHeaders = computeDateHeaders.value;
      const dayDatas = computeDayDatas.value;
      const dateListValue = computeDateListValue.value;
      const overCount = computeOverCount.value;
      const matchFormat = 'yyyyMMdd';
      return [(0, _vue.h)('div', {
        class: ['vxe-date-panel--view-wrapper', `type--${datePanelType}`]
      }, [(0, _vue.h)('div', {
        class: 'vxe-date-panel--view-header'
      }, [(0, _vue.h)('div', {
        class: 'vxe-date-panel--view-row'
      }, dateHeaders.map(item => {
        return (0, _vue.h)('div', {
          class: 'vxe-date-panel--view-item',
          style: {
            width: `${100 / dateHeaders.length}%`
          }
        }, [(0, _vue.h)('div', {
          class: 'vxe-date-panel--view-item-inner'
        }, [(0, _vue.h)('div', {
          class: 'vxe-date-panel--view-item-label'
        }, item.label)])]);
      }))]), (0, _vue.h)('div', {
        class: 'vxe-date-panel--view-body'
      }, dayDatas.map(rows => {
        return (0, _vue.h)('div', {
          class: 'vxe-date-panel--view-row',
          style: {
            height: `${100 / dayDatas.length}%`
          }
        }, rows.map(item => {
          const isSelected = multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat);
          return (0, _vue.h)('div', {
            class: ['vxe-date-panel--view-item', {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--range-disabled': isRangeDisabled(item),
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--over': overCount && !isSelected,
              'is--hover': !overCount && _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            }],
            style: {
              width: `${100 / rows.length}%`
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item),
            onMouseleave: dateMouseleaveEvent
          }, [(0, _vue.h)('div', {
            class: 'vxe-date-panel--view-item-inner'
          }, renderDateLabel(item, item.label))]);
        }));
      }))])];
    };
    const renderDateWeekTable = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const weekHeaders = computeWeekHeaders.value;
      const weekDates = computeWeekDates.value;
      const dateListValue = computeDateListValue.value;
      const overCount = computeOverCount.value;
      const matchFormat = 'yyyyMMdd';
      return [(0, _vue.h)('div', {
        class: ['vxe-date-panel--view-wrapper', `type--${datePanelType}`]
      }, [(0, _vue.h)('div', {
        class: 'vxe-date-panel--view-header'
      }, [(0, _vue.h)('div', {
        class: 'vxe-date-panel--view-row'
      }, weekHeaders.map((item, rIndex) => {
        return (0, _vue.h)('div', {
          class: 'vxe-date-panel--view-item',
          style: {
            width: `${rIndex ? 13 : 9}%`
          }
        }, [(0, _vue.h)('div', {
          class: 'vxe-date-panel--view-item-inner'
        }, [(0, _vue.h)('div', {
          class: 'vxe-date-panel--view-item-label'
        }, item.label)])]);
      }))]), (0, _vue.h)('div', {
        class: 'vxe-date-panel--view-body'
      }, weekDates.map(rows => {
        const isSelected = multiple ? rows.some(item => dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat))) : rows.some(item => _xeUtils.default.isDateSame(dateValue, item.date, matchFormat));
        const isHover = rows.some(item => _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat));
        const isNowWeek = rows.some(item => item.isNow);
        return (0, _vue.h)('div', {
          class: 'vxe-date-panel--view-row',
          style: {
            height: `${100 / weekDates.length}%`
          }
        }, rows.map((item, rIndex) => {
          return (0, _vue.h)('div', {
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
          }, [(0, _vue.h)('div', {
            class: 'vxe-date-panel--view-item-inner'
          }, renderDateLabel(item, item.label))]);
        }));
      }))])];
    };
    const renderDateMonthTable = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const monthDatas = computeMonthDatas.value;
      const dateListValue = computeDateListValue.value;
      const overCount = computeOverCount.value;
      const matchFormat = 'yyyyMM';
      return [(0, _vue.h)('div', {
        class: ['vxe-date-panel--view-wrapper', `type--${datePanelType}`]
      }, [(0, _vue.h)('div', {
        class: 'vxe-date-panel--view-body'
      }, monthDatas.map(rows => {
        return (0, _vue.h)('div', {
          class: 'vxe-date-panel--view-row',
          style: {
            height: `${100 / monthDatas.length}%`
          }
        }, rows.map(item => {
          const isSelected = multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat);
          return (0, _vue.h)('div', {
            class: ['vxe-date-panel--view-item', {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--range-disabled': isRangeDisabled(item),
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--over': overCount && !isSelected,
              'is--hover': !overCount && _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            }],
            style: {
              width: `${100 / rows.length}%`
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item),
            onMouseleave: dateMouseleaveEvent
          }, [(0, _vue.h)('div', {
            class: 'vxe-date-panel--view-item-inner'
          }, renderDateLabel(item, (0, _ui.getI18n)(`vxe.input.date.months.m${item.month}`)))]);
        }));
      }))])];
    };
    const renderDateQuarterTable = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const quarterDatas = computeQuarterDatas.value;
      const dateListValue = computeDateListValue.value;
      const overCount = computeOverCount.value;
      const matchFormat = 'yyyyq';
      return [(0, _vue.h)('div', {
        class: ['vxe-date-panel--view-wrapper', `type--${datePanelType}`]
      }, [(0, _vue.h)('div', {
        class: 'vxe-date-panel--view-body'
      }, quarterDatas.map(rows => {
        return (0, _vue.h)('div', {
          class: 'vxe-date-panel--view-row',
          style: {
            height: `${100 / quarterDatas.length}%`
          }
        }, rows.map(item => {
          const isSelected = multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat);
          return (0, _vue.h)('div', {
            class: ['vxe-date-panel--view-item', {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--range-disabled': isRangeDisabled(item),
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--over': overCount && !isSelected,
              'is--hover': !overCount && _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            }],
            style: {
              width: `${100 / rows.length}%`
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item),
            onMouseleave: dateMouseleaveEvent
          }, [(0, _vue.h)('div', {
            class: 'vxe-date-panel--view-item-inner'
          }, renderDateLabel(item, (0, _ui.getI18n)(`vxe.input.date.quarters.q${item.quarter}`)))]);
        }));
      }))])];
    };
    const renderDateYearTable = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const yearDatas = computeYearDatas.value;
      const dateListValue = computeDateListValue.value;
      const overCount = computeOverCount.value;
      const matchFormat = 'yyyy';
      return [(0, _vue.h)('div', {
        class: ['vxe-date-panel--view-wrapper', `type--${datePanelType}`]
      }, [(0, _vue.h)('div', {
        class: 'vxe-date-panel--view-body'
      }, yearDatas.map(rows => {
        return (0, _vue.h)('div', {
          class: 'vxe-date-panel--view-row',
          style: {
            height: `${100 / yearDatas.length}%`
          }
        }, rows.map(item => {
          const isSelected = multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat);
          return (0, _vue.h)('div', {
            class: ['vxe-date-panel--view-item', {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--range-disabled': isRangeDisabled(item),
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--over': overCount && !isSelected,
              'is--hover': !overCount && _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            }],
            style: {
              width: `${100 / rows.length}%`
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item),
            onMouseleave: dateMouseleaveEvent
          }, [(0, _vue.h)('div', {
            class: 'vxe-date-panel--view-item-inner'
          }, renderDateLabel(item, item.year))]);
        }));
      }))])];
    };
    const renderDateTable = () => {
      const {
        datePanelType
      } = reactData;
      switch (datePanelType) {
        case 'week':
          return renderDateWeekTable();
        case 'month':
          return renderDateMonthTable();
        case 'quarter':
          return renderDateQuarterTable();
        case 'year':
          return renderDateYearTable();
      }
      return renderDateDayTable();
    };
    const renderDatePanel = () => {
      const {
        datePanelType
      } = reactData;
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value;
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value;
      const selectDatePanelObj = computeSelectDatePanelObj.value;
      return [(0, _vue.h)('div', {
        class: 'vxe-date-panel--picker-header'
      }, [(0, _vue.h)('div', {
        class: 'vxe-date-panel--picker-type-wrapper'
      }, [datePanelType === 'year' ? (0, _vue.h)('span', {
        class: 'vxe-date-panel--picker-label'
      }, selectDatePanelObj.y) : (0, _vue.h)('span', {
        class: 'vxe-date-panel--picker-btns'
      }, [(0, _vue.h)('span', {
        class: 'vxe-date-panel--picker-btn',
        onClick: dateToggleYearTypeEvent
      }, selectDatePanelObj.y), selectDatePanelObj.m ? (0, _vue.h)('span', {
        class: 'vxe-date-panel--picker-btn',
        onClick: dateToggleMonthTypeEvent
      }, selectDatePanelObj.m) : (0, _ui.renderEmptyElement)($xeDatePanel)])]), (0, _vue.h)('div', {
        class: 'vxe-date-panel--picker-btn-wrapper'
      }, [(0, _vue.h)('span', {
        class: ['vxe-date-panel--picker-btn vxe-date-panel--picker-prev-btn', {
          'is--disabled': isDisabledPrevDateBtn
        }],
        onClick: datePrevEvent
      }, [(0, _vue.h)('i', {
        class: 'vxe-icon-caret-left'
      })]), (0, _vue.h)('span', {
        class: 'vxe-date-panel--picker-btn vxe-date-panel--picker-current-btn',
        onClick: dateTodayMonthEvent
      }, [(0, _vue.h)('i', {
        class: 'vxe-icon-dot'
      })]), (0, _vue.h)('span', {
        class: ['vxe-date-panel--picker-btn vxe-date-panel--picker-next-btn', {
          'is--disabled': isDisabledNextDateBtn
        }],
        onClick: dateNextEvent
      }, [(0, _vue.h)('i', {
        class: 'vxe-icon-caret-right'
      })])])]), (0, _vue.h)('div', {
        class: 'vxe-date-panel--picker-body'
      }, renderDateTable())];
    };
    const renderTimePanel = () => {
      const {
        type
      } = props;
      const {
        datetimePanelValue
      } = reactData;
      const dateTimeLabel = computeDateTimeLabel.value;
      const hourList = computeHourList.value;
      const hasTimeMinute = computeHasTimeMinute.value;
      const minuteList = computeMinuteList.value;
      const hasTimeSecond = computeHasTimeSecond.value;
      const secondList = computeSecondList.value;
      return [type === 'time' ? (0, _ui.renderEmptyElement)($xeDatePanel) : (0, _vue.h)('div', {
        class: 'vxe-date-panel--time-header'
      }, [(0, _vue.h)('div', {
        class: 'vxe-date-panel--time-title'
      }, dateTimeLabel)]), (0, _vue.h)('div', {
        ref: refInputTimeBody,
        class: 'vxe-date-panel--time-body'
      }, [(0, _vue.h)('ul', {
        class: 'vxe-date-panel--time-hour-list'
      }, hourList.map((item, index) => {
        return (0, _vue.h)('li', {
          key: index,
          class: {
            'is--disabled': item.disabled,
            'is--selected': datetimePanelValue && datetimePanelValue.getHours() === item.value
          },
          onClick: evnt => dateHourEvent(evnt, item)
        }, item.label);
      })), hasTimeMinute ? (0, _vue.h)('ul', {
        class: 'vxe-date-panel--time-minute-list'
      }, minuteList.map((item, index) => {
        return (0, _vue.h)('li', {
          key: index,
          class: {
            'is--disabled': item.disabled,
            'is--selected': datetimePanelValue && datetimePanelValue.getMinutes() === item.value
          },
          onClick: evnt => dateMinuteEvent(evnt, item)
        }, item.label);
      })) : (0, _ui.renderEmptyElement)($xeDatePanel), hasTimeMinute && hasTimeSecond ? (0, _vue.h)('ul', {
        class: 'vxe-date-panel--time-second-list'
      }, secondList.map((item, index) => {
        return (0, _vue.h)('li', {
          key: index,
          class: {
            'is--disabled': item.disabled,
            'is--selected': datetimePanelValue && datetimePanelValue.getSeconds() === item.value
          },
          onClick: evnt => dateSecondEvent(evnt, item)
        }, item.label);
      })) : (0, _ui.renderEmptyElement)($xeDatePanel)])];
    };
    const renderPickerPanel = () => {
      const {
        type
      } = props;
      if (type === 'datetime') {
        return (0, _vue.h)('div', {
          key: type,
          ref: refPanelWrapper,
          class: 'vxe-date-panel--time-layout-wrapper'
        }, [(0, _vue.h)('div', {
          class: 'vxe-date-panel--time-left-wrapper'
        }, renderDatePanel()), (0, _vue.h)('div', {
          class: 'vxe-date-panel--time-right-wrapper'
        }, renderTimePanel())]);
      } else if (type === 'time') {
        return (0, _vue.h)('div', {
          key: type,
          ref: refPanelWrapper,
          class: 'vxe-date-panel--wrapper'
        }, renderTimePanel());
      }
      return (0, _vue.h)('div', {
        key: type || 'default',
        ref: refPanelWrapper,
        class: 'vxe-date-panel--wrapper'
      }, renderDatePanel());
    };
    const renderVN = () => {
      const {
        type
      } = props;
      const vSize = computeSize.value;
      return (0, _vue.h)('div', {
        class: ['vxe-date-panel', `type--${type}`, {
          [`size--${vSize}`]: vSize
        }]
      }, [renderPickerPanel()]);
    };
    (0, _vue.watch)(() => props.modelValue, val => {
      updateModelValue(val);
      changeValue();
    });
    (0, _vue.watch)(() => props.type, () => {
      // 切换类型是重置内置变量
      Object.assign(reactData, {
        inputLabel: '',
        datetimePanelValue: null,
        datePanelValue: null,
        datePanelLabel: '',
        datePanelType: 'day',
        selectMonth: null,
        currentDate: null
      });
      initValue();
    });
    (0, _vue.watch)(computeDateLabelFormat, () => {
      const isDatePanelType = computeIsDatePanelType.value;
      if (isDatePanelType) {
        dateParseValue(reactData.datePanelValue);
        reactData.inputLabel = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
      }
    });
    initValue();
    dateOpenPanel();
    $xeDatePanel.renderVN = renderVN;
    return $xeDatePanel;
  },
  render() {
    return this.renderVN();
  }
});