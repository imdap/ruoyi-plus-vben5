"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _util = require("../../date-panel/src/util");
var _dom = require("../../ui/src/dom");
var _utils = require("../../ui/src/utils");
var _log = require("../../ui/src/log");
var _button = _interopRequireDefault(require("../../button/src/button"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  menus,
  getConfig,
  getI18n
} = _ui.VxeUI;
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeCalendar',
  props: {
    modelValue: [String, Number, Date],
    type: {
      type: String,
      default: 'date'
    },
    className: String,
    size: {
      type: String,
      default: () => getConfig().calendar.size || getConfig().size
    },
    multiple: Boolean,
    width: [String, Number],
    height: [String, Number],
    // date、week、month、quarter、year
    minDate: {
      type: [String, Number, Date],
      default: () => getConfig().calendar.minDate
    },
    maxDate: {
      type: [String, Number, Date],
      default: () => getConfig().calendar.maxDate
    },
    startDay: {
      type: [String, Number],
      default: () => getConfig().calendar.startDay
    },
    labelFormat: String,
    valueFormat: String,
    festivalMethod: {
      type: Function,
      default: () => getConfig().calendar.festivalMethod
    },
    disabledMethod: {
      type: Function,
      default: () => getConfig().calendar.disabledMethod
    },
    cellStyle: [Object, Function],
    menuConfig: Object,
    // week
    selectDay: {
      type: [String, Number],
      default: () => getConfig().calendar.selectDay
    }
  },
  emits: ['update:modelValue', 'change', 'cell-click', 'date-prev', 'date-today', 'date-next', 'view-change', 'cell-menu', 'menu-click'],
  setup(props, context) {
    const {
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      selectValue: props.modelValue,
      inputValue: props.modelValue,
      datePanelValue: null,
      datePanelLabel: '',
      datePanelType: 'day',
      selectMonth: null,
      currentDate: null
    });
    const internalData = {
      yearSize: 12,
      monthSize: 20,
      quarterSize: 8
    };
    const refElem = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xeCalendar = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    };
    const computeCalendarStyle = (0, _vue.computed)(() => {
      const {
        height,
        width
      } = props;
      const stys = {};
      if (width) {
        stys.width = (0, _dom.toCssUnit)(width);
      }
      if (height) {
        stys.height = (0, _dom.toCssUnit)(height);
      }
      return stys;
    });
    const computeIsDisabled = (0, _vue.computed)(() => {
      return false;
    });
    const computeIsCalendarType = (0, _vue.computed)(() => {
      return ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1;
    });
    const computeDateStartTime = (0, _vue.computed)(() => {
      return props.minDate ? _xeUtils.default.toStringDate(props.minDate) : null;
    });
    const computeDateEndTime = (0, _vue.computed)(() => {
      return props.maxDate ? _xeUtils.default.toStringDate(props.maxDate) : null;
    });
    const computeSupportMultiples = (0, _vue.computed)(() => {
      return ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1;
    });
    const computeMenuOpts = (0, _vue.computed)(() => {
      return Object.assign({}, getConfig().calendar.menuConfig, props.menuConfig);
    });
    const computeDateListValue = (0, _vue.computed)(() => {
      const {
        multiple
      } = props;
      const {
        selectValue
      } = reactData;
      const isCalendarType = computeIsCalendarType.value;
      const dateValueFormat = computeDateValueFormat.value;
      if (multiple && selectValue && isCalendarType) {
        return _xeUtils.default.toValueString(selectValue).split(',').map(item => {
          const date = parseDate(item, dateValueFormat);
          if (_xeUtils.default.isValidDate(date)) {
            return date;
          }
          return null;
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
    const computeDateValueFormat = (0, _vue.computed)(() => {
      const {
        valueFormat
      } = props;
      if (valueFormat) {
        return valueFormat;
      }
      return 'yyyy-MM-dd';
    });
    const computeDateValue = (0, _vue.computed)(() => {
      const {
        selectValue
      } = reactData;
      const isCalendarType = computeIsCalendarType.value;
      const dateValueFormat = computeDateValueFormat.value;
      let val = null;
      if (selectValue && isCalendarType) {
        const date = parseDate(selectValue, dateValueFormat);
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
        return selectMonth >= dateEndTime;
      }
      return false;
    });
    const computeDateHMSTime = (0, _vue.computed)(() => {
      const dateValue = computeDateValue.value;
      return dateValue ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1000 : 0;
    });
    const computeDateLabelFormat = (0, _vue.computed)(() => {
      const {
        labelFormat
      } = props;
      const isCalendarType = computeIsCalendarType.value;
      const dateValueFormat = computeDateValueFormat.value;
      if (isCalendarType) {
        return labelFormat || dateValueFormat || getI18n(`vxe.input.date.labelFormat.${props.type}`);
      }
      return null;
    });
    const computeYearList = (0, _vue.computed)(() => {
      const {
        selectMonth,
        currentDate
      } = reactData;
      const {
        yearSize
      } = internalData;
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
      const isCalendarType = computeIsCalendarType.value;
      let y = '';
      let m = '';
      if (isCalendarType) {
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
          y = `${year}`;
        } else if (datePanelType === 'year') {
          y = yearList.length ? `${yearList[0].year} - ${yearList[yearList.length - 1].year}` : '';
        } else {
          y = `${year}`;
          m = month ? getI18n('vxe.calendar.monthLabel', [month]) : '-';
        }
      }
      return {
        y: getI18n('vxe.calendar.yearLabel', [y]),
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
      const isCalendarType = computeIsCalendarType.value;
      if (isCalendarType) {
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
      const isCalendarType = computeIsCalendarType.value;
      if (isCalendarType) {
        const weekDatas = computeWeekDatas.value;
        return weekDatas.map(day => {
          return {
            value: day,
            label: getI18n(`vxe.input.date.weeks.w${day}`)
          };
        });
      }
      return [];
    });
    const computeWeekHeaders = (0, _vue.computed)(() => {
      const isCalendarType = computeIsCalendarType.value;
      if (isCalendarType) {
        const dateHeaders = computeDateHeaders.value;
        return [{
          label: getI18n('vxe.input.date.weeks.w')
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
        selectMonth,
        currentDate
      } = reactData;
      const {
        quarterSize
      } = internalData;
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
        selectMonth,
        currentDate
      } = reactData;
      const {
        monthSize
      } = internalData;
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
    const parseDate = (value, format) => {
      return _xeUtils.default.toStringDate(value, format);
    };
    const handleChange = (value, evnt) => {
      reactData.inputValue = value;
      emit('update:modelValue', value);
      if (_xeUtils.default.toValueString(props.modelValue) !== value) {
        dispatchEvent('change', {
          value
        }, evnt);
      }
    };
    const dateParseValue = value => {
      const {
        type
      } = props;
      const dateLabelFormat = computeDateLabelFormat.value;
      const dateValueFormat = computeDateValueFormat.value;
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      let dValue = null;
      let dLabel = '';
      if (value) {
        dValue = parseDate(value, dateValueFormat);
      }
      if (_xeUtils.default.isValidDate(dValue)) {
        dLabel = _xeUtils.default.toDateString(dValue, dateLabelFormat, {
          firstDay: firstDayOfWeek
        });
        // 由于年份和第几周是冲突的行为，所以需要特殊处理，判断是否跨年
        if (dateLabelFormat && type === 'week') {
          const firstWeekDate = _xeUtils.default.getWhatWeek(dValue, 0, firstDayOfWeek, firstDayOfWeek);
          if (firstWeekDate.getFullYear() < dValue.getFullYear()) {
            const yyIndex = dateLabelFormat.indexOf('yyyy');
            if (yyIndex > -1) {
              const yyNum = Number(dLabel.substring(yyIndex, yyIndex + 4));
              if (yyNum && !isNaN(yyNum)) {
                dLabel = dLabel.replace(`${yyNum}`, `${yyNum - 1}`);
              }
            }
          }
        }
      } else {
        dValue = null;
      }
      reactData.datePanelValue = dValue;
      reactData.datePanelLabel = dLabel;
    };
    /**
     * 值变化时处理
     */
    const changeValue = () => {
      const isCalendarType = computeIsCalendarType.value;
      const {
        inputValue
      } = reactData;
      if (isCalendarType) {
        dateParseValue(inputValue);
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
      }
    };
    /**
     * 检查初始值
     */
    const initValue = () => {
      const isCalendarType = computeIsCalendarType.value;
      if (isCalendarType) {
        changeValue();
      }
    };
    const dateCheckMonth = date => {
      const month = _xeUtils.default.getWhatMonth(date, 0, 'first');
      if (!_xeUtils.default.isEqual(month, reactData.selectMonth)) {
        reactData.selectMonth = month;
      }
    };
    const dateChange = date => {
      const {
        modelValue,
        multiple
      } = props;
      const dateValueFormat = computeDateValueFormat.value;
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      if (props.type === 'week') {
        const sWeek = _xeUtils.default.toNumber(props.selectDay);
        date = _xeUtils.default.getWhatWeek(date, 0, sWeek, firstDayOfWeek);
      }
      const inpVal = _xeUtils.default.toDateString(date, dateValueFormat, {
        firstDay: firstDayOfWeek
      });
      dateCheckMonth(date);
      reactData.selectValue = date;
      if (multiple) {
        // 如果为多选
        const dateMultipleValue = computeDateMultipleValue.value;
        // 如果是日期类型
        if (dateMultipleValue.some(val => _xeUtils.default.isEqual(val, inpVal))) {
          handleChange(dateMultipleValue.filter(val => !_xeUtils.default.isEqual(val, inpVal)).join(','), {
            type: 'update'
          });
        } else {
          handleChange(dateMultipleValue.concat([inpVal]).join(','), {
            type: 'update'
          });
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
    const dateMonthHandle = (date, offsetMonth) => {
      reactData.selectMonth = _xeUtils.default.getWhatMonth(date, offsetMonth, 'first');
    };
    const dateNowHandle = () => {
      const currentDate = _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
      reactData.currentDate = currentDate;
      dateMonthHandle(currentDate, 0);
    };
    const dateToggleYearTypeEvent = () => {
      reactData.datePanelType = 'year';
    };
    const dateToggleMonthTypeEvent = evnt => {
      let {
        datePanelType
      } = reactData;
      if (datePanelType === 'month' || datePanelType === 'quarter') {
        datePanelType = 'year';
      } else {
        datePanelType = 'month';
      }
      reactData.datePanelType = datePanelType;
      changeViewEvent(evnt);
    };
    const datePrevEvent = evnt => {
      const {
        type
      } = props;
      const {
        datePanelType,
        selectMonth
      } = reactData;
      const {
        yearSize
      } = internalData;
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value;
      if (!isDisabledPrevDateBtn) {
        if (type === 'year') {
          reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, -yearSize, 'first');
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, -yearSize, 'first');
          } else {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, -1, 'first');
          }
        } else {
          if (datePanelType === 'year') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, -yearSize, 'first');
          } else if (datePanelType === 'month') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, -1, 'first');
          } else {
            reactData.selectMonth = _xeUtils.default.getWhatMonth(selectMonth, -1, 'first');
          }
        }
        dispatchEvent('date-prev', {
          type
        }, evnt);
        changeViewEvent(evnt);
      }
    };
    const dateTodayMonthEvent = evnt => {
      dateNowHandle();
      if (!props.multiple) {
        dateChange(reactData.currentDate);
      }
      dispatchEvent('date-today', {
        type: props.type
      }, evnt);
      changeViewEvent(evnt);
    };
    const dateNextEvent = evnt => {
      const {
        type
      } = props;
      const {
        datePanelType,
        selectMonth
      } = reactData;
      const {
        yearSize
      } = internalData;
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value;
      if (!isDisabledNextDateBtn) {
        if (type === 'year') {
          reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, yearSize, 'first');
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, yearSize, 'first');
          } else {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, 1, 'first');
          }
        } else {
          if (datePanelType === 'year') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, yearSize, 'first');
          } else if (datePanelType === 'month') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, 1, 'first');
          } else {
            reactData.selectMonth = _xeUtils.default.getWhatMonth(selectMonth, 1, 'first');
          }
        }
        dispatchEvent('date-next', {
          type
        }, evnt);
        changeViewEvent(evnt);
      }
    };
    const isDateDisabled = item => {
      const {
        disabledMethod
      } = props;
      const {
        datePanelType
      } = reactData;
      return disabledMethod && disabledMethod({
        type: datePanelType,
        viewType: datePanelType,
        date: item.date,
        $calendar: $xeCalendar
      });
    };
    const changeViewEvent = evnt => {
      const {
        datePanelType
      } = reactData;
      const yearDatas = computeYearDatas.value;
      const quarterDatas = computeQuarterDatas.value;
      const monthDatas = computeMonthDatas.value;
      const weekDates = computeWeekDates.value;
      const dayDatas = computeDayDatas.value;
      const viewDates = [];
      let dataList = [];
      switch (datePanelType) {
        case 'year':
          dataList = yearDatas;
          break;
        case 'quarter':
          dataList = quarterDatas;
          break;
        case 'month':
          dataList = monthDatas;
          break;
        case 'week':
          dataList = weekDates;
          break;
        case 'day':
          dataList = dayDatas;
          break;
      }
      dataList.forEach(rows => {
        rows.forEach(item => {
          viewDates.push(item.date);
        });
      });
      dispatchEvent('view-change', {
        viewType: datePanelType,
        viewDates
      }, evnt);
    };
    const dateSelectItem = date => {
      const {
        type
      } = props;
      const {
        datePanelType
      } = reactData;
      if (type === 'month') {
        if (datePanelType === 'year') {
          reactData.datePanelType = 'month';
          dateCheckMonth(date);
          changeViewEvent(null);
        } else {
          dateChange(date);
        }
      } else if (type === 'year') {
        dateChange(date);
      } else if (type === 'quarter') {
        if (datePanelType === 'year') {
          reactData.datePanelType = 'quarter';
          dateCheckMonth(date);
          changeViewEvent(null);
        } else {
          dateChange(date);
        }
      } else {
        if (datePanelType === 'month') {
          reactData.datePanelType = type === 'week' ? type : 'day';
          dateCheckMonth(date);
          changeViewEvent(null);
        } else if (datePanelType === 'year') {
          reactData.datePanelType = 'month';
          dateCheckMonth(date);
          changeViewEvent(null);
        } else {
          dateChange(date);
        }
      }
    };
    const dateClickEvent = (evnt, item) => {
      const {
        type
      } = props;
      const {
        datePanelType
      } = reactData;
      const {
        date
      } = item;
      if (!isDateDisabled(item)) {
        dateSelectItem(date);
        dispatchEvent('cell-click', {
          date,
          type,
          viewType: datePanelType
        }, evnt);
      }
    };
    const datContextmenuEvent = (evnt, item) => {
      const {
        type
      } = props;
      const {
        datePanelType
      } = reactData;
      const {
        menuConfig
      } = props;
      const menuOpts = computeMenuOpts.value;
      if (menuConfig ? (0, _utils.isEnableConf)(menuOpts) : menuOpts.enabled) {
        const {
          options,
          visibleMethod
        } = menuOpts;
        const {
          date
        } = item;
        if (!visibleMethod || visibleMethod({
          $calendar: $xeCalendar,
          options,
          date,
          type,
          viewType: datePanelType
        })) {
          if (_ui.VxeUI.contextMenu) {
            _ui.VxeUI.contextMenu.openByEvent(evnt, {
              options,
              events: {
                optionClick(eventParams) {
                  const {
                    option
                  } = eventParams;
                  const gMenuOpts = menus.get(option.code);
                  const cmMethod = gMenuOpts ? gMenuOpts.calendarMenuMethod : null;
                  const params = {
                    menu: option,
                    date,
                    type,
                    viewType: datePanelType,
                    $event: evnt,
                    $calendar: $xeCalendar
                  };
                  if (cmMethod) {
                    cmMethod(params, evnt);
                  }
                  dispatchEvent('menu-click', params, eventParams.$event);
                }
              }
            });
          }
        }
      }
      dispatchEvent('cell-menu', {
        date: item.date,
        type,
        viewType: datePanelType
      }, evnt);
    };
    const dateMoveDay = offsetDay => {
      if (!isDateDisabled({
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
      if (!isDateDisabled({
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
      if (!isDateDisabled({
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
      if (!isDateDisabled({
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
      if (!isDateDisabled(item)) {
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
    const dateConfirmEvent = () => {};
    const dateOpenPanel = () => {
      const {
        type
      } = props;
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
        dateNowHandle();
      }
    };
    const renderDateLabel = (item, label) => {
      const {
        festivalMethod
      } = props;
      if (festivalMethod) {
        const {
          datePanelType
        } = reactData;
        const festivalRest = festivalMethod({
          type: datePanelType,
          viewType: datePanelType,
          date: item.date,
          $calendar: $xeCalendar
        });
        const festivalItem = festivalRest ? _xeUtils.default.isString(festivalRest) ? {
          label: festivalRest
        } : festivalRest : {};
        const extraItem = festivalItem.extra ? _xeUtils.default.isString(festivalItem.extra) ? {
          label: festivalItem.extra
        } : festivalItem.extra : null;
        const labels = [(0, _vue.h)('span', {
          class: ['vxe-calendar--label', {
            'is-notice': festivalItem.notice
          }]
        }, extraItem && extraItem.label ? [(0, _vue.h)('span', {
          class: 'vxe-calendar--label--number'
        }, `${label || ''}`), (0, _vue.h)('span', {
          class: ['vxe-calendar--label--extra', extraItem.important ? 'is-important' : '', extraItem.className],
          style: extraItem.style
        }, _xeUtils.default.toValueString(extraItem.label))] : [`${label || ''}`])];
        const festivalLabel = festivalItem.label;
        if (festivalLabel) {
          // 默认最多支持3个节日重叠
          const festivalLabels = _xeUtils.default.toValueString(festivalLabel).split(',');
          labels.push((0, _vue.h)('span', {
            class: ['vxe-calendar--festival', festivalItem.important ? 'is-important' : '', festivalItem.className],
            style: festivalItem.style
          }, [festivalLabels.length > 1 ? (0, _vue.h)('span', {
            class: ['vxe-calendar--festival--overlap', `overlap--${festivalLabels.length}`]
          }, festivalLabels.map(label => (0, _vue.h)('span', label.substring(0, 3)))) : (0, _vue.h)('span', {
            class: 'vxe-calendar--festival--label'
          }, festivalLabels[0].substring(0, 3))]));
        }
        return labels;
      }
      return `${label || ''}`;
    };
    const renderDateDayTable = () => {
      const {
        multiple,
        cellStyle
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const dateHeaders = computeDateHeaders.value;
      const dayDatas = computeDayDatas.value;
      const dateListValue = computeDateListValue.value;
      const matchFormat = 'yyyyMMdd';
      return [(0, _vue.h)('div', {
        class: ['vxe-calendar--view-wrapper', `type--${datePanelType}`]
      }, [(0, _vue.h)('div', {
        class: 'vxe-calendar--view-header',
        style: {
          height: `${100 / (dayDatas.length + 1)}%`
        }
      }, [(0, _vue.h)('div', {
        class: 'vxe-calendar--view-row'
      }, dateHeaders.map(item => {
        return (0, _vue.h)('div', {
          class: 'vxe-calendar--view-item',
          style: {
            width: `${100 / dateHeaders.length}%`
          }
        }, [(0, _vue.h)('div', {
          class: 'vxe-calendar--view-item-inner'
        }, [(0, _vue.h)('div', {
          class: 'vxe-calendar--view-item-label'
        }, item.label)])]);
      }))]), (0, _vue.h)('div', {
        class: 'vxe-calendar--view-body'
      }, dayDatas.map(rows => {
        return (0, _vue.h)('div', {
          class: 'vxe-calendar--view-row',
          style: {
            height: `${100 / dayDatas.length}%`
          }
        }, rows.map(item => {
          const isSelected = multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat);
          return (0, _vue.h)('div', {
            class: ['vxe-calendar--view-item', {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            }],
            style: Object.assign({}, _xeUtils.default.isFunction(cellStyle) ? cellStyle({
              type: datePanelType,
              viewType: datePanelType,
              date: item.date,
              $calendar: $xeCalendar
            }) : cellStyle, {
              width: `${100 / rows.length}%`
            }),
            onClick: evnt => dateClickEvent(evnt, item),
            onContextmenu: evnt => datContextmenuEvent(evnt, item),
            onMouseenter: () => dateMouseenterEvent(item),
            onMouseleave: dateMouseleaveEvent
          }, [(0, _vue.h)('div', {
            class: 'vxe-calendar--view-item-inner'
          }, renderDateLabel(item, item.label))]);
        }));
      }))])];
    };
    const renderDateWeekTable = () => {
      const {
        multiple,
        cellStyle
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const weekHeaders = computeWeekHeaders.value;
      const weekDates = computeWeekDates.value;
      const dateListValue = computeDateListValue.value;
      const matchFormat = 'yyyyMMdd';
      return [(0, _vue.h)('div', {
        class: ['vxe-calendar--view-wrapper', `type--${datePanelType}`]
      }, [(0, _vue.h)('div', {
        class: 'vxe-calendar--view-header',
        style: {
          height: `${100 / (weekDates.length + 1)}%`
        }
      }, [(0, _vue.h)('div', {
        class: 'vxe-calendar--view-row'
      }, weekHeaders.map((item, rIndex) => {
        return (0, _vue.h)('div', {
          class: 'vxe-calendar--view-item',
          style: {
            width: `${rIndex ? 13 : 9}%`
          }
        }, [(0, _vue.h)('div', {
          class: 'vxe-calendar--view-item-inner'
        }, [(0, _vue.h)('div', {
          class: 'vxe-calendar--view-item-label'
        }, item.label)])]);
      }))]), (0, _vue.h)('div', {
        class: 'vxe-calendar--view-body'
      }, weekDates.map(rows => {
        const isSelected = multiple ? rows.some(item => dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat))) : rows.some(item => _xeUtils.default.isDateSame(dateValue, item.date, matchFormat));
        const isHover = rows.some(item => _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat));
        const isNowWeek = rows.some(item => item.isNow);
        return (0, _vue.h)('div', {
          class: 'vxe-calendar--view-row',
          style: {
            height: `${100 / weekDates.length}%`
          }
        }, rows.map((item, rIndex) => {
          return (0, _vue.h)('div', {
            class: ['vxe-calendar--view-item', {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': rIndex ? item.isNow : isNowWeek,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--hover': isHover
            }],
            style: Object.assign({}, _xeUtils.default.isFunction(cellStyle) ? cellStyle({
              type: datePanelType,
              viewType: datePanelType,
              date: item.date,
              $calendar: $xeCalendar
            }) : cellStyle, {
              width: `${rIndex ? 13 : 9}%`
            }),
            onClick: evnt => dateClickEvent(evnt, item),
            onContextmenu: evnt => datContextmenuEvent(evnt, item),
            onMouseenter: () => dateMouseenterEvent(item),
            onMouseleave: dateMouseleaveEvent
          }, [(0, _vue.h)('div', {
            class: 'vxe-calendar--view-item-inner'
          }, renderDateLabel(item, item.label))]);
        }));
      }))])];
    };
    const renderDateMonthTable = () => {
      const {
        multiple,
        cellStyle
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const monthDatas = computeMonthDatas.value;
      const dateListValue = computeDateListValue.value;
      const matchFormat = 'yyyyMM';
      return [(0, _vue.h)('div', {
        class: ['vxe-calendar--view-wrapper', `type--${datePanelType}`]
      }, [(0, _vue.h)('div', {
        class: 'vxe-calendar--view-body'
      }, monthDatas.map(rows => {
        return (0, _vue.h)('div', {
          class: 'vxe-calendar--view-row',
          style: {
            height: `${100 / monthDatas.length}%`
          }
        }, rows.map(item => {
          const isSelected = multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat);
          return (0, _vue.h)('div', {
            class: ['vxe-calendar--view-item', {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            }],
            style: Object.assign({}, _xeUtils.default.isFunction(cellStyle) ? cellStyle({
              type: datePanelType,
              viewType: datePanelType,
              date: item.date,
              $calendar: $xeCalendar
            }) : cellStyle, {
              width: `${100 / rows.length}%`
            }),
            onClick: evnt => dateClickEvent(evnt, item),
            onContextmenu: evnt => datContextmenuEvent(evnt, item),
            onMouseenter: () => dateMouseenterEvent(item),
            onMouseleave: dateMouseleaveEvent
          }, [(0, _vue.h)('div', {
            class: 'vxe-calendar--view-item-inner'
          }, renderDateLabel(item, getI18n(`vxe.input.date.months.m${item.month}`)))]);
        }));
      }))])];
    };
    const renderDateQuarterTable = () => {
      const {
        multiple,
        cellStyle
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const quarterDatas = computeQuarterDatas.value;
      const dateListValue = computeDateListValue.value;
      const matchFormat = 'yyyyq';
      return [(0, _vue.h)('div', {
        class: ['vxe-calendar--view-wrapper', `type--${datePanelType}`]
      }, [(0, _vue.h)('div', {
        class: 'vxe-calendar--view-body'
      }, quarterDatas.map(rows => {
        return (0, _vue.h)('div', {
          class: 'vxe-calendar--view-row',
          style: {
            height: `${100 / quarterDatas.length}%`
          }
        }, rows.map(item => {
          const isSelected = multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat);
          return (0, _vue.h)('div', {
            class: ['vxe-calendar--view-item', {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            }],
            style: Object.assign({}, _xeUtils.default.isFunction(cellStyle) ? cellStyle({
              type: datePanelType,
              viewType: datePanelType,
              date: item.date,
              $calendar: $xeCalendar
            }) : cellStyle, {
              width: `${100 / rows.length}%`
            }),
            onClick: evnt => dateClickEvent(evnt, item),
            onContextmenu: evnt => datContextmenuEvent(evnt, item),
            onMouseenter: () => dateMouseenterEvent(item),
            onMouseleave: dateMouseleaveEvent
          }, [(0, _vue.h)('div', {
            class: 'vxe-calendar--view-item-inner'
          }, renderDateLabel(item, getI18n(`vxe.input.date.quarters.q${item.quarter}`)))]);
        }));
      }))])];
    };
    const renderDateYearTable = () => {
      const {
        multiple,
        cellStyle
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const yearDatas = computeYearDatas.value;
      const dateListValue = computeDateListValue.value;
      const matchFormat = 'yyyy';
      return [(0, _vue.h)('div', {
        class: ['vxe-calendar--view-wrapper', `type--${datePanelType}`]
      }, [(0, _vue.h)('div', {
        class: 'vxe-calendar--view-body'
      }, yearDatas.map(rows => {
        return (0, _vue.h)('div', {
          class: 'vxe-calendar--view-row',
          style: {
            height: `${100 / yearDatas.length}%`
          }
        }, rows.map(item => {
          const isSelected = multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat);
          return (0, _vue.h)('div', {
            class: ['vxe-calendar--view-item', {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            }],
            style: Object.assign({}, _xeUtils.default.isFunction(cellStyle) ? cellStyle({
              type: datePanelType,
              viewType: datePanelType,
              date: item.date,
              $calendar: $xeCalendar
            }) : cellStyle, {
              width: `${100 / rows.length}%`
            }),
            onClick: evnt => dateClickEvent(evnt, item),
            onContextmenu: evnt => datContextmenuEvent(evnt, item),
            onMouseenter: () => dateMouseenterEvent(item),
            onMouseleave: dateMouseleaveEvent
          }, [(0, _vue.h)('div', {
            class: 'vxe-calendar--view-item-inner'
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
        multiple
      } = props;
      const {
        datePanelType
      } = reactData;
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value;
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value;
      const selectDatePanelObj = computeSelectDatePanelObj.value;
      return [(0, _vue.h)('div', {
        class: 'vxe-calendar--header'
      }, [(0, _vue.h)('div', {
        class: 'vxe-calendar--type-wrapper'
      }, [datePanelType === 'year' ? (0, _vue.h)(_button.default, {
        class: 'vxe-calendar--date-picker-label',
        disabled: datePanelType === 'year',
        content: selectDatePanelObj.y
      }) : (0, _vue.h)('span', {
        class: 'vxe-calendar--date-picker-btns'
      }, [(0, _vue.h)(_button.default, {
        class: 'vxe-calendar--date-picker-btn',
        content: selectDatePanelObj.y,
        onClick: dateToggleYearTypeEvent
      }), selectDatePanelObj.m ? (0, _vue.h)(_button.default, {
        class: 'vxe-calendar--date-picker-btn',
        content: selectDatePanelObj.m,
        onClick: dateToggleMonthTypeEvent
      }) : (0, _ui.renderEmptyElement)($xeCalendar)])]), (0, _vue.h)('div', {
        class: 'vxe-calendar--btn-wrapper'
      }, [(0, _vue.h)(_button.default, {
        disabled: isDisabledPrevDateBtn,
        icon: 'vxe-icon-caret-left',
        onClick: datePrevEvent
      }), (0, _vue.h)(_button.default, {
        icon: 'vxe-icon-dot',
        onClick: dateTodayMonthEvent
      }), (0, _vue.h)(_button.default, {
        disabled: isDisabledNextDateBtn,
        icon: 'vxe-icon-caret-right',
        onClick: dateNextEvent
      }), multiple && computeSupportMultiples.value ? (0, _vue.h)('span', {
        class: 'vxe-calendar--btn vxe-calendar--confirm-btn'
      }, [(0, _vue.h)('button', {
        class: 'vxe-calendar--confirm',
        type: 'button',
        onClick: dateConfirmEvent
      }, getI18n('vxe.button.confirm'))]) : null])]), (0, _vue.h)('div', {
        class: 'vxe-calendar--body'
      }, renderDateTable())];
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $input: $xeCalendar
      }, params));
    };
    const calendarMethods = {
      dispatchEvent
    };
    Object.assign($xeCalendar, calendarMethods);
    const renderVN = () => {
      const {
        className,
        type
      } = props;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const calendarStyle = computeCalendarStyle.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-calendar', `type--${type}`, className, {
          [`size--${vSize}`]: vSize,
          'is--disabled': isDisabled
        }],
        style: calendarStyle
      }, [renderDatePanel()]);
    };
    $xeCalendar.renderVN = renderVN;
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.inputValue = val;
      changeValue();
    });
    (0, _vue.watch)(() => props.type, () => {
      // 切换类型是重置内置变量
      Object.assign(reactData, {
        selectValue: null,
        inputValue: null,
        datePanelValue: null,
        datePanelLabel: '',
        datePanelType: 'day',
        selectMonth: null,
        currentDate: null
      });
      initValue();
      dateOpenPanel();
    });
    (0, _vue.watch)(computeDateLabelFormat, () => {
      const isCalendarType = computeIsCalendarType.value;
      if (isCalendarType) {
        dateParseValue(reactData.datePanelValue);
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
      }
    });
    (0, _vue.onMounted)(() => {
      const {
        menuConfig
      } = props;
      const VxeUIContextMenu = _ui.VxeUI.getComponent('VxeContextMenu');
      if (menuConfig && !VxeUIContextMenu) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-context-menu']);
      }
      dateOpenPanel();
    });
    initValue();
    return $xeCalendar;
  },
  render() {
    return this.renderVN();
  }
});