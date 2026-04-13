"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
var _dom = require("../../ui/src/dom");
var _util = require("../../date-panel/src/util");
var _util2 = require("../../number-input/src/util");
var _vn = require("../../ui/src/vn");
var _log = require("../../ui/src/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeInput',
  props: {
    modelValue: [String, Number, Date],
    immediate: {
      type: Boolean,
      default: true
    },
    name: String,
    title: String,
    type: {
      type: String,
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().input.clearable
    },
    readonly: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    maxLength: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().input.maxLength
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    autoFocus: {
      type: Boolean,
      default: null
    },
    align: String,
    form: String,
    className: String,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().input.size || (0, _ui.getConfig)().size
    },
    multiple: Boolean,
    // text
    showWordCount: Boolean,
    countMethod: Function,
    // number、integer、float
    min: {
      type: [String, Number],
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    step: [String, Number],
    trim: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().input.trim
    },
    exponential: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().input.exponential
    },
    // number、integer、float、password
    controls: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().input.controls
    },
    // float
    digits: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().input.digits
    },
    // date、week、month、quarter、year
    startDate: {
      type: [String, Number, Date],
      default: () => (0, _ui.getConfig)().input.startDate
    },
    endDate: {
      type: [String, Number, Date],
      default: () => (0, _ui.getConfig)().input.endDate
    },
    minDate: [String, Number, Date],
    maxDate: [String, Number, Date],
    // 已废弃 startWeek，被 startDay 替换
    startWeek: Number,
    startDay: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().input.startDay
    },
    labelFormat: String,
    valueFormat: String,
    editable: {
      type: Boolean,
      default: true
    },
    festivalMethod: {
      type: Function,
      default: () => (0, _ui.getConfig)().input.festivalMethod
    },
    disabledMethod: {
      type: Function,
      default: () => (0, _ui.getConfig)().input.disabledMethod
    },
    // week
    selectDay: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().input.selectDay
    },
    prefixIcon: String,
    prefixConfig: Object,
    suffixIcon: String,
    suffixConfig: Object,
    placement: String,
    transfer: {
      type: Boolean,
      default: null
    },
    // 已废弃
    maxlength: [String, Number],
    // 已废弃
    autocomplete: String
  },
  emits: ['update:modelValue', 'input', 'change', 'keydown', 'keyup', 'wheel', 'click', 'focus', 'blur', 'clear', 'lazy-change', 'search-click', 'toggle-visible', 'prev-number', 'next-number', 'prefix-click', 'suffix-click', 'date-prev', 'date-today', 'date-next'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const $xeSelect = (0, _vue.inject)('$xeSelect', null);
    const $xeTreeSelect = (0, _vue.inject)('$xeTreeSelect', null);
    const $xeModal = (0, _vue.inject)('$xeModal', null);
    const $xeDrawer = (0, _vue.inject)('$xeDrawer', null);
    const $xeTable = (0, _vue.inject)('$xeTable', null);
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const formItemInfo = (0, _vue.inject)('xeFormItemInfo', null);
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      initialized: false,
      panelIndex: 0,
      showPwd: false,
      visiblePanel: false,
      isAniVisible: false,
      panelStyle: {},
      panelPlacement: '',
      isActivated: false,
      inputValue: props.modelValue,
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
      hpTimeout: undefined,
      dnTimeout: undefined
    };
    const refElem = (0, _vue.ref)();
    const refInputTarget = (0, _vue.ref)();
    const refInputPanel = (0, _vue.ref)();
    const refPanelWrapper = (0, _vue.ref)();
    const refInputTimeBody = (0, _vue.ref)();
    const refMaps = {
      refElem,
      refInput: refInputTarget
    };
    const $xeInput = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    };
    let inputMethods = {};
    const parseDate = (value, format) => {
      const {
        type
      } = props;
      if (type === 'time') {
        return (0, _util.toStringTimeDate)(value);
      }
      return _xeUtils.default.toStringDate(value, format);
    };
    const computePrefixOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().input.prefixConfig, props.prefixConfig);
    });
    const computeSuffixOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().input.suffixConfig, props.suffixConfig);
    });
    const computeBtnTransfer = (0, _vue.computed)(() => {
      const {
        transfer
      } = props;
      if (transfer === null) {
        const globalTransfer = (0, _ui.getConfig)().input.transfer;
        if (_xeUtils.default.isBoolean(globalTransfer)) {
          return globalTransfer;
        }
        if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
          return true;
        }
      }
      return transfer;
    });
    const computeFormReadonly = (0, _vue.computed)(() => {
      if ((0, _ui.getConfig)().inputReadonly === 'obsolete') {
        if ($xeForm) {
          return $xeForm.props.readonly;
        }
        return false;
      }
      const {
        readonly
      } = props;
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly;
        }
        return false;
      }
      return readonly;
    });
    const computeIsDisabled = (0, _vue.computed)(() => {
      const {
        disabled
      } = props;
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.disabled;
        }
        return false;
      }
      return disabled;
    });
    const computeInpMaxLength = (0, _vue.computed)(() => {
      const {
        maxLength,
        maxlength
      } = props;
      const maxLen = maxLength || maxlength;
      const isNumType = computeIsNumType.value;
      // 数值最大长度限制 16 位，包含小数
      if (isNumType) {
        if (!_xeUtils.default.toNumber(maxLen)) {
          return 16;
        }
      }
      return maxLen;
    });
    const computeIsDateTimeType = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      return type === 'time' || type === 'datetime';
    });
    const computeIsNumType = (0, _vue.computed)(() => {
      return ['number', 'integer', 'float'].indexOf(props.type) > -1;
    });
    const computeInputCount = (0, _vue.computed)(() => {
      return _xeUtils.default.getSize(reactData.inputValue);
    });
    const computeIsCountError = (0, _vue.computed)(() => {
      const inputCount = computeInputCount.value;
      const inpMaxLength = computeInpMaxLength.value;
      return inpMaxLength && inputCount > _xeUtils.default.toNumber(inpMaxLength);
    });
    const computeIsDatePickerType = (0, _vue.computed)(() => {
      const isDateTimeType = computeIsDateTimeType.value;
      return isDateTimeType || ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1;
    });
    const computeIsPawdType = (0, _vue.computed)(() => {
      return props.type === 'password';
    });
    const computeIsSearchType = (0, _vue.computed)(() => {
      return props.type === 'search';
    });
    const computeDigitsValue = (0, _vue.computed)(() => {
      return _xeUtils.default.toInteger(props.digits) || 1;
    });
    const computeStepValue = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      const digitsValue = computeDigitsValue.value;
      const step = props.step;
      if (type === 'integer') {
        return _xeUtils.default.toInteger(step) || 1;
      } else if (type === 'float') {
        return _xeUtils.default.toNumber(step) || 1 / Math.pow(10, digitsValue);
      }
      return _xeUtils.default.toNumber(step) || 1;
    });
    const computeIsClearable = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const isPawdType = computeIsPawdType.value;
      return props.clearable && (isPawdType || isNumType || isDatePickerType || type === 'text' || type === 'search');
    });
    const computeDateStartTime = (0, _vue.computed)(() => {
      return props.startDate ? _xeUtils.default.toStringDate(props.startDate) : null;
    });
    const computeDateEndTime = (0, _vue.computed)(() => {
      return props.endDate ? _xeUtils.default.toStringDate(props.endDate) : null;
    });
    const computeSupportMultiples = (0, _vue.computed)(() => {
      return ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1;
    });
    const computeDateListValue = (0, _vue.computed)(() => {
      const {
        modelValue,
        multiple
      } = props;
      const isDatePickerType = computeIsDatePickerType.value;
      const dateValueFormat = computeDateValueFormat.value;
      if (multiple && modelValue && isDatePickerType) {
        return _xeUtils.default.toValueString(modelValue).split(',').map(item => {
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
        type,
        valueFormat
      } = props;
      if (valueFormat) {
        return valueFormat;
      }
      if (type === 'time') {
        return 'HH:mm:ss';
      }
      if (type === 'datetime') {
        return 'yyyy-MM-dd HH:mm:ss';
      }
      return 'yyyy-MM-dd';
    });
    const computeDateValue = (0, _vue.computed)(() => {
      const {
        modelValue
      } = props;
      const isDatePickerType = computeIsDatePickerType.value;
      const dateValueFormat = computeDateValueFormat.value;
      let val = null;
      if (modelValue && isDatePickerType) {
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
        return selectMonth >= dateEndTime;
      }
      return false;
    });
    const computeDateTimeLabel = (0, _vue.computed)(() => {
      const {
        datetimePanelValue
      } = reactData;
      const hasTimeSecond = computeHasTimeSecond.value;
      if (datetimePanelValue) {
        return _xeUtils.default.toDateString(datetimePanelValue, hasTimeSecond ? 'HH:mm:ss' : 'HH:mm');
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
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        return labelFormat || (0, _ui.getI18n)(`vxe.input.date.labelFormat.${props.type}`);
      }
      return '';
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
      const isDatePickerType = computeIsDatePickerType.value;
      let y = '';
      let m = '';
      if (isDatePickerType) {
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
        startDay,
        startWeek
      } = props;
      return _xeUtils.default.toNumber(_xeUtils.default.isNumber(startDay) || _xeUtils.default.isString(startDay) ? startDay : startWeek);
    });
    const computeWeekDatas = (0, _vue.computed)(() => {
      const weeks = [];
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
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
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
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
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
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
    const computeHourList = (0, _vue.computed)(() => {
      const list = [];
      const isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        for (let index = 0; index < 24; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, '0'),
            disabled: false
          });
        }
      }
      return list;
    });
    const computeMinuteList = (0, _vue.computed)(() => {
      const list = [];
      const isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        for (let index = 0; index < 60; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, '0'),
            disabled: false
          });
        }
      }
      return list;
    });
    const computeHasTimeMinute = (0, _vue.computed)(() => {
      const dateValueFormat = computeDateValueFormat.value;
      return !/HH/.test(dateValueFormat) || /mm/.test(dateValueFormat);
    });
    const computeHasTimeSecond = (0, _vue.computed)(() => {
      const dateValueFormat = computeDateValueFormat.value;
      return !/HH/.test(dateValueFormat) || /ss/.test(dateValueFormat);
    });
    const computeSecondList = (0, _vue.computed)(() => {
      const minuteList = computeMinuteList.value;
      return minuteList;
    });
    const computeInputReadonly = (0, _vue.computed)(() => {
      const {
        type,
        editable,
        multiple,
        readonly
      } = props;
      return readonly || multiple || !editable || type === 'week' || type === 'quarter';
    });
    const computeInputType = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      const {
        showPwd
      } = reactData;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const isPawdType = computeIsPawdType.value;
      if (isDatePickerType || isNumType || isPawdType && showPwd || type === 'number') {
        return 'text';
      }
      return type;
    });
    const computeInpPlaceholder = (0, _vue.computed)(() => {
      const {
        placeholder
      } = props;
      if (placeholder) {
        return (0, _utils.getFuncText)(placeholder);
      }
      if (_xeUtils.default.eqNull(placeholder)) {
        const globalPlaceholder = (0, _ui.getConfig)().input.placeholder;
        if (globalPlaceholder) {
          return (0, _utils.getFuncText)(globalPlaceholder);
        }
        return (0, _ui.getI18n)('vxe.base.pleaseInput');
      }
      return placeholder;
    });
    const computeInpImmediate = (0, _vue.computed)(() => {
      const {
        type,
        immediate
      } = props;
      return immediate || !(type === 'text' || type === 'number' || type === 'integer' || type === 'float');
    });
    const computeNumValue = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      const {
        inputValue
      } = reactData;
      const isNumType = computeIsNumType.value;
      if (isNumType) {
        return type === 'integer' ? _xeUtils.default.toInteger((0, _util2.handleNumber)(inputValue)) : _xeUtils.default.toNumber((0, _util2.handleNumber)(inputValue));
      }
      return 0;
    });
    const computeIsDisabledSubtractNumber = (0, _vue.computed)(() => {
      const {
        min
      } = props;
      const {
        inputValue
      } = reactData;
      const isNumType = computeIsNumType.value;
      const numValue = computeNumValue.value;
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && isNumType && min !== null) {
        return numValue <= _xeUtils.default.toNumber(min);
      }
      return false;
    });
    const computeIsDisabledAddNumber = (0, _vue.computed)(() => {
      const {
        max
      } = props;
      const {
        inputValue
      } = reactData;
      const isNumType = computeIsNumType.value;
      const numValue = computeNumValue.value;
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && isNumType && max !== null) {
        return numValue >= _xeUtils.default.toNumber(max);
      }
      return false;
    });
    const getNumberValue = val => {
      const {
        type,
        exponential
      } = props;
      const inpMaxLength = computeInpMaxLength.value;
      const digitsValue = computeDigitsValue.value;
      const restVal = type === 'float' ? (0, _util2.toFloatValueFixed)(val, digitsValue) : _xeUtils.default.toValueString(val);
      if (exponential && (val === restVal || _xeUtils.default.toValueString(val).toLowerCase() === _xeUtils.default.toNumber(restVal).toExponential())) {
        return val;
      }
      return restVal.slice(0, inpMaxLength);
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const triggerEvent = evnt => {
      const {
        inputValue
      } = reactData;
      inputMethods.dispatchEvent(evnt.type, {
        value: inputValue
      }, evnt);
    };
    const handleChange = (value, evnt) => {
      if (props.trim) {
        value = `${value || ''}`.trim();
      }
      reactData.inputValue = value;
      emitModel(value);
      inputMethods.dispatchEvent('input', {
        value
      }, evnt);
      if (_xeUtils.default.toValueString(props.modelValue) !== value) {
        inputMethods.dispatchEvent('change', {
          value
        }, evnt);
        if (!$xeSelect && !$xeTreeSelect) {
          // 自动更新校验状态
          if ($xeForm && formItemInfo) {
            $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
          }
        }
      }
    };
    const emitInputEvent = (value, evnt) => {
      const isDatePickerType = computeIsDatePickerType.value;
      const inpImmediate = computeInpImmediate.value;
      reactData.inputValue = value;
      if (!isDatePickerType) {
        if (inpImmediate) {
          handleChange(value, evnt);
        } else {
          inputMethods.dispatchEvent('input', {
            value
          }, evnt);
        }
      }
    };
    const inputEvent = evnt => {
      const inputElem = evnt.target;
      const value = inputElem.value;
      emitInputEvent(value, evnt);
    };
    const changeEvent = evnt => {
      const inpImmediate = computeInpImmediate.value;
      if (!inpImmediate) {
        triggerEvent(evnt);
      }
      $xeInput.dispatchEvent('lazy-change', {
        value: reactData.inputValue
      }, evnt);
    };
    const blurEvent = evnt => {
      const {
        inputValue
      } = reactData;
      const inpImmediate = computeInpImmediate.value;
      const value = inputValue;
      if (!inpImmediate) {
        handleChange(value, evnt);
      }
      afterCheckValue();
      if (!reactData.visiblePanel) {
        reactData.isActivated = false;
      }
      inputMethods.dispatchEvent('blur', {
        value
      }, evnt);
      if (!$xeSelect && !$xeTreeSelect) {
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
        }
      }
    };
    const focusEvent = evnt => {
      const {
        inputValue
      } = reactData;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      reactData.isActivated = true;
      if (isNumType) {
        reactData.inputValue = (0, _utils.eqEmptyValue)(inputValue) ? '' : `${_xeUtils.default.toNumber(inputValue)}`;
      } else if (isDatePickerType) {
        datePickerOpenEvent(evnt);
      }
      triggerEvent(evnt);
    };
    const clickPrefixEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        const {
          inputValue
        } = reactData;
        $xeInput.dispatchEvent('prefix-click', {
          value: inputValue
        }, evnt);
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
    const clearValueEvent = (evnt, value) => {
      const {
        type,
        autoFocus
      } = props;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        hidePanel();
      }
      if (autoFocus || autoFocus === null) {
        if (isNumType || ['text', 'search', 'password'].indexOf(type) > -1) {
          focus();
        }
      }
      handleChange('', evnt);
      $xeInput.dispatchEvent('clear', {
        value
      }, evnt);
      $xeInput.dispatchEvent('lazy-change', {
        value
      }, evnt);
    };
    const clickSuffixEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        const {
          inputValue
        } = reactData;
        $xeInput.dispatchEvent('suffix-click', {
          value: inputValue
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
        // 周选择器，由于年份和第几周是冲突的行为，所以需要特殊处理，判断是否跨年，例如
        // '2024-12-31' 'yyyy-MM-dd W' >> '2024-12-31 1'
        // '2025-01-01' 'yyyy-MM-dd W' >> '2025-01-01 1'
        if (dateLabelFormat && type === 'week') {
          const weekNum = _xeUtils.default.getYearWeek(dValue, firstDayOfWeek);
          const weekDate = _xeUtils.default.getWhatWeek(dValue, 0, weekNum === 1 ? (6 + firstDayOfWeek) % 7 : firstDayOfWeek, firstDayOfWeek);
          const weekFullYear = weekDate.getFullYear();
          if (weekFullYear !== dValue.getFullYear()) {
            const yyIndex = dateLabelFormat.indexOf('yyyy');
            if (yyIndex > -1) {
              const yyNum = Number(dLabel.substring(yyIndex, yyIndex + 4));
              if (yyNum && !isNaN(yyNum)) {
                dLabel = dLabel.replace(`${yyNum}`, `${weekFullYear}`);
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
      const isDatePickerType = computeIsDatePickerType.value;
      const {
        inputValue
      } = reactData;
      if (isDatePickerType) {
        dateParseValue(inputValue);
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
      }
    };
    /**
     * 检查初始值
     */
    const initValue = () => {
      const {
        type
      } = props;
      const {
        inputValue
      } = reactData;
      const isDatePickerType = computeIsDatePickerType.value;
      const digitsValue = computeDigitsValue.value;
      if (isDatePickerType) {
        changeValue();
      } else if (type === 'float') {
        if (inputValue) {
          const validValue = (0, _util2.toFloatValueFixed)(inputValue, digitsValue);
          if (inputValue !== validValue) {
            handleChange(validValue, {
              type: 'init'
            });
          }
        }
      }
    };
    const validMaxNum = num => {
      return props.max === null || props.max === '' || _xeUtils.default.toNumber(num) <= _xeUtils.default.toNumber(props.max);
    };
    const validMinNum = num => {
      return props.min === null || props.min === '' || _xeUtils.default.toNumber(num) >= _xeUtils.default.toNumber(props.min);
    };
    const dateRevert = () => {
      reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
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
    const dateChange = date => {
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
        date.setHours(datetimePanelValue.getHours());
        date.setMinutes(datetimePanelValue.getMinutes());
        date.setSeconds(datetimePanelValue.getSeconds());
      }
      const inpVal = _xeUtils.default.toDateString(date, dateValueFormat, {
        firstDay: firstDayOfWeek
      });
      dateCheckMonth(date);
      if (multiple) {
        // 如果为多选
        const dateMultipleValue = computeDateMultipleValue.value;
        if (isDateTimeType) {
          // 如果是datetime特殊类型
          const dateListValue = [...computeDateListValue.value];
          const datetimeRest = [];
          const eqIndex = _xeUtils.default.findIndexOf(dateListValue, val => _xeUtils.default.isDateSame(date, val, 'yyyyMMdd'));
          if (eqIndex === -1) {
            dateListValue.push(date);
          } else {
            dateListValue.splice(eqIndex, 1);
          }
          dateListValue.forEach(item => {
            if (item) {
              item.setHours(datetimePanelValue.getHours());
              item.setMinutes(datetimePanelValue.getMinutes());
              item.setSeconds(datetimePanelValue.getSeconds());
              datetimeRest.push(item);
            }
          });
          handleChange(datetimeRest.map(date => _xeUtils.default.toDateString(date, dateValueFormat)).join(','), {
            type: 'update'
          });
        } else {
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
    const afterCheckValue = () => {
      const {
        type,
        min,
        max,
        exponential
      } = props;
      const {
        inputValue,
        datetimePanelValue
      } = reactData;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const dateLabelFormat = computeDateLabelFormat.value;
      const inputReadonly = computeInputReadonly.value;
      if (!inputReadonly) {
        if (isNumType) {
          if (inputValue) {
            const inpVal = `${(0, _util2.handleNumber)(inputValue)}`;
            if (inpVal) {
              let inpNumVal = type === 'integer' ? _xeUtils.default.toInteger(inpVal) : _xeUtils.default.toNumber(inpVal);
              if (!validMinNum(inpNumVal)) {
                inpNumVal = min;
              } else if (!validMaxNum(inpNumVal)) {
                inpNumVal = max;
              }
              if (exponential) {
                const inpStringVal = _xeUtils.default.toValueString(inputValue).toLowerCase();
                if (inpStringVal === _xeUtils.default.toNumber(inpNumVal).toExponential()) {
                  inpNumVal = inpStringVal;
                }
              }
              handleChange(getNumberValue(inpNumVal), {
                type: 'check'
              });
            } else {
              // 输入错误字符，清空
              let inpValue = '';
              if (min || min === 0) {
                inpValue = `${min}`;
              }
              handleChange(inpValue, {
                type: 'check'
              });
            }
          }
        } else if (isDatePickerType) {
          if (inputValue) {
            let inpDateVal = parseDate(inputValue, dateLabelFormat);
            if (_xeUtils.default.isValidDate(inpDateVal)) {
              if (type === 'time') {
                inpDateVal = _xeUtils.default.toDateString(inpDateVal, dateLabelFormat);
                if (inputValue !== inpDateVal) {
                  handleChange(inpDateVal, {
                    type: 'check'
                  });
                }
                reactData.inputValue = inpDateVal;
              } else {
                let isChange = false;
                const firstDayOfWeek = computeFirstDayOfWeek.value;
                if (type === 'datetime') {
                  const dateValue = computeDateValue.value;
                  if (inputValue !== _xeUtils.default.toDateString(dateValue, dateLabelFormat) || inputValue !== _xeUtils.default.toDateString(inpDateVal, dateLabelFormat)) {
                    isChange = true;
                    datetimePanelValue.setHours(inpDateVal.getHours());
                    datetimePanelValue.setMinutes(inpDateVal.getMinutes());
                    datetimePanelValue.setSeconds(inpDateVal.getSeconds());
                  }
                } else {
                  isChange = true;
                }
                reactData.inputValue = _xeUtils.default.toDateString(inpDateVal, dateLabelFormat, {
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
        }
      }
    };
    // 密码
    const passwordToggleEvent = evnt => {
      const {
        showPwd
      } = reactData;
      const isDisabled = computeIsDisabled.value;
      const inputReadonly = computeInputReadonly.value;
      if (!isDisabled && !inputReadonly) {
        reactData.showPwd = !showPwd;
      }
      inputMethods.dispatchEvent('toggle-visible', {
        visible: reactData.showPwd
      }, evnt);
    };
    // 密码
    // 搜索
    const searchEvent = evnt => {
      inputMethods.dispatchEvent('search-click', {}, evnt);
    };
    // 搜索
    // 数值
    const numberChange = (isPlus, evnt) => {
      const {
        min,
        max,
        type
      } = props;
      const {
        inputValue
      } = reactData;
      const stepValue = computeStepValue.value;
      const numValue = type === 'integer' ? _xeUtils.default.toInteger((0, _util2.handleNumber)(inputValue)) : _xeUtils.default.toNumber((0, _util2.handleNumber)(inputValue));
      const newValue = isPlus ? _xeUtils.default.add(numValue, stepValue) : _xeUtils.default.subtract(numValue, stepValue);
      let restNum;
      if (!validMinNum(newValue)) {
        restNum = min;
      } else if (!validMaxNum(newValue)) {
        restNum = max;
      } else {
        restNum = newValue;
      }
      emitInputEvent(getNumberValue(restNum), evnt);
    };
    const numberNextEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      const inputReadonly = computeInputReadonly.value;
      const isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value;
      numberStopDown();
      if (!isDisabled && !inputReadonly && !isDisabledSubtractNumber) {
        numberChange(false, evnt);
      }
      inputMethods.dispatchEvent('next-number', {
        value: reactData.inputValue
      }, evnt);
    };
    const numberDownNextEvent = evnt => {
      internalData.dnTimeout = setTimeout(() => {
        numberNextEvent(evnt);
        numberDownNextEvent(evnt);
      }, 60);
    };
    const numberPrevEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      const inputReadonly = computeInputReadonly.value;
      const isDisabledAddNumber = computeIsDisabledAddNumber.value;
      numberStopDown();
      if (!isDisabled && !inputReadonly && !isDisabledAddNumber) {
        numberChange(true, evnt);
      }
      inputMethods.dispatchEvent('prev-number', {
        value: reactData.inputValue
      }, evnt);
    };
    const numberKeydownEvent = evnt => {
      const isUpArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_UP);
      const isDwArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_DOWN);
      if (isUpArrow || isDwArrow) {
        evnt.preventDefault();
        if (isUpArrow) {
          numberPrevEvent(evnt);
        } else {
          numberNextEvent(evnt);
        }
      }
    };
    const keydownEvent = evnt => {
      const {
        type,
        exponential,
        controls
      } = props;
      const isNumType = computeIsNumType.value;
      if (isNumType) {
        const isControlKey = (0, _dom.hasControlKey)(evnt);
        const isShiftKey = evnt.shiftKey;
        const isAltKey = evnt.altKey;
        const keyCode = evnt.keyCode;
        const isEsc = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ESCAPE);
        const isUpArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_UP);
        const isDwArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_DOWN);
        if (!isControlKey && !isShiftKey && !isAltKey) {
          if (_ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.SPACEBAR) || type === 'integer' && keyCode === 110 || (!exponential || keyCode !== 69) && keyCode >= 65 && keyCode <= 90 || keyCode >= 186 && keyCode <= 188 || keyCode >= 191) {
            evnt.preventDefault();
          }
        }
        if (isEsc) {
          afterCheckValue();
        } else if (isUpArrow || isDwArrow) {
          if (controls) {
            numberKeydownEvent(evnt);
          }
        }
      }
      triggerEvent(evnt);
    };
    const keyupEvent = evnt => {
      triggerEvent(evnt);
    };
    // 数值
    const numberStopDown = () => {
      const {
        dnTimeout
      } = internalData;
      if (dnTimeout) {
        clearTimeout(dnTimeout);
        internalData.dnTimeout = undefined;
      }
    };
    const numberDownPrevEvent = evnt => {
      internalData.dnTimeout = setTimeout(() => {
        numberPrevEvent(evnt);
        numberDownPrevEvent(evnt);
      }, 60);
    };
    const numberMousedownEvent = evnt => {
      numberStopDown();
      if (evnt.button === 0) {
        const isPrevNumber = (0, _dom.hasClass)(evnt.currentTarget, 'is--prev');
        if (isPrevNumber) {
          numberPrevEvent(evnt);
        } else {
          numberNextEvent(evnt);
        }
        internalData.dnTimeout = setTimeout(() => {
          if (isPrevNumber) {
            numberDownPrevEvent(evnt);
          } else {
            numberDownNextEvent(evnt);
          }
        }, 500);
      }
    };
    const wheelEvent = evnt => {
      const isNumType = computeIsNumType.value;
      if (isNumType && props.controls) {
        if (reactData.isActivated) {
          const delta = evnt.deltaY;
          if (delta > 0) {
            numberNextEvent(evnt);
          } else if (delta < 0) {
            numberPrevEvent(evnt);
          }
          evnt.preventDefault();
        }
      }
      triggerEvent(evnt);
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
      const currentDate = _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
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
        inputValue
      } = reactData;
      const {
        yearSize
      } = internalData;
      const value = inputValue;
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
        inputMethods.dispatchEvent('date-prev', {
          viewType: datePanelType,
          viewDate,
          value,
          type
        }, evnt);
      }
    };
    const dateTodayMonthEvent = evnt => {
      dateNowHandle();
      if (!props.multiple) {
        dateChange(reactData.currentDate);
        hidePanel();
      }
      inputMethods.dispatchEvent('date-today', {
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
        inputValue
      } = reactData;
      const {
        yearSize
      } = internalData;
      const value = inputValue;
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
        inputMethods.dispatchEvent('date-next', {
          viewType: datePanelType,
          viewDate,
          value,
          type
        }, evnt);
      }
    };
    const isDateDisabled = item => {
      const {
        disabledMethod
      } = props;
      const {
        datePanelType
      } = reactData;
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
      if (disabledMethod) {
        return disabledMethod({
          type: datePanelType,
          viewType: datePanelType,
          date,
          $input: $xeInput
        });
      }
      return false;
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
      if (!isDateDisabled(item)) {
        dateSelectItem(item.date);
      }
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
    const updateTimePos = liElem => {
      if (liElem) {
        const height = liElem.offsetHeight;
        const ulElem = liElem.parentNode;
        ulElem.scrollTop = liElem.offsetTop - height * 4;
      }
    };
    const dateTimeChangeEvent = evnt => {
      reactData.datetimePanelValue = new Date(reactData.datetimePanelValue.getTime());
      updateTimePos(evnt.currentTarget);
    };
    const dateHourEvent = (evnt, item) => {
      reactData.datetimePanelValue.setHours(item.value);
      dateTimeChangeEvent(evnt);
    };
    const dateConfirmEvent = () => {
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
                item.setHours(datetimePanelValue.getHours());
                item.setMinutes(datetimePanelValue.getMinutes());
                item.setSeconds(datetimePanelValue.getSeconds());
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
    };
    const dateMinuteEvent = (evnt, item) => {
      reactData.datetimePanelValue.setMinutes(item.value);
      dateTimeChangeEvent(evnt);
    };
    const dateSecondEvent = (evnt, item) => {
      reactData.datetimePanelValue.setSeconds(item.value);
      dateTimeChangeEvent(evnt);
    };
    const dateOffsetEvent = evnt => {
      const {
        isActivated,
        datePanelValue,
        datePanelType
      } = reactData;
      if (isActivated) {
        evnt.preventDefault();
        const isLeftArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_LEFT);
        const isUpArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_UP);
        const isRightArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_RIGHT);
        const isDwArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_DOWN);
        if (datePanelType === 'year') {
          let offsetYear = _xeUtils.default.getWhatYear(datePanelValue || Date.now(), 0, 'first');
          if (isLeftArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, -1);
          } else if (isUpArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, -4);
          } else if (isRightArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, 1);
          } else if (isDwArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, 4);
          }
          dateMoveYear(offsetYear);
        } else if (datePanelType === 'quarter') {
          let offsetQuarter = _xeUtils.default.getWhatQuarter(datePanelValue || Date.now(), 0, 'first');
          if (isLeftArrow) {
            offsetQuarter = _xeUtils.default.getWhatQuarter(offsetQuarter, -1);
          } else if (isUpArrow) {
            offsetQuarter = _xeUtils.default.getWhatQuarter(offsetQuarter, -2);
          } else if (isRightArrow) {
            offsetQuarter = _xeUtils.default.getWhatQuarter(offsetQuarter, 1);
          } else if (isDwArrow) {
            offsetQuarter = _xeUtils.default.getWhatQuarter(offsetQuarter, 2);
          }
          dateMoveQuarter(offsetQuarter);
        } else if (datePanelType === 'month') {
          let offsetMonth = _xeUtils.default.getWhatMonth(datePanelValue || Date.now(), 0, 'first');
          if (isLeftArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, -1);
          } else if (isUpArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, -4);
          } else if (isRightArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, 1);
          } else if (isDwArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, 4);
          }
          dateMoveMonth(offsetMonth);
        } else {
          let offsetDay = datePanelValue || _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
          const firstDayOfWeek = computeFirstDayOfWeek.value;
          if (isLeftArrow) {
            offsetDay = _xeUtils.default.getWhatDay(offsetDay, -1);
          } else if (isUpArrow) {
            offsetDay = _xeUtils.default.getWhatWeek(offsetDay, -1, firstDayOfWeek);
          } else if (isRightArrow) {
            offsetDay = _xeUtils.default.getWhatDay(offsetDay, 1);
          } else if (isDwArrow) {
            offsetDay = _xeUtils.default.getWhatWeek(offsetDay, 1, firstDayOfWeek);
          }
          dateMoveDay(offsetDay);
        }
      }
    };
    const datePgOffsetEvent = evnt => {
      const {
        isActivated
      } = reactData;
      if (isActivated) {
        const isPgUp = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.PAGE_UP);
        evnt.preventDefault();
        if (isPgUp) {
          datePrevEvent(evnt);
        } else {
          dateNextEvent(evnt);
        }
      }
    };
    const dateOpenPanel = () => {
      const {
        type
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
        dateNowHandle();
      }
      if (isDateTimeType) {
        reactData.datetimePanelValue = reactData.datePanelValue || _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
        (0, _vue.nextTick)(() => {
          const timeBodyElem = refInputTimeBody.value;
          _xeUtils.default.arrayEach(timeBodyElem.querySelectorAll('li.is--selected'), elem => {
            updateTimePos(elem);
          });
        });
      }
    };
    // 日期
    // 弹出面板
    const updateZindex = () => {
      if (reactData.panelIndex < (0, _utils.getLastZIndex)()) {
        reactData.panelIndex = (0, _utils.nextZIndex)();
      }
    };
    const updatePlacement = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          placement
        } = props;
        const {
          panelIndex
        } = reactData;
        const targetElem = refInputTarget.value;
        const panelElem = refInputPanel.value;
        const btnTransfer = computeBtnTransfer.value;
        if (targetElem && panelElem) {
          const targetHeight = targetElem.offsetHeight;
          const targetWidth = targetElem.offsetWidth;
          const panelHeight = panelElem.offsetHeight;
          const panelWidth = panelElem.offsetWidth;
          const marginSize = 5;
          const panelStyle = {
            zIndex: panelIndex
          };
          const {
            boundingTop,
            boundingLeft,
            visibleHeight,
            visibleWidth
          } = (0, _dom.getAbsolutePos)(targetElem);
          let panelPlacement = 'bottom';
          if (btnTransfer) {
            let left = boundingLeft;
            let top = boundingTop + targetHeight;
            if (placement === 'top') {
              panelPlacement = 'top';
              top = boundingTop - panelHeight;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              }
              // 如果上面不够放，则向下（优先）
              if (top < marginSize) {
                panelPlacement = 'bottom';
                top = boundingTop + targetHeight;
              }
            }
            // 如果溢出右边
            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            }
            // 如果溢出左边
            if (left < marginSize) {
              left = marginSize;
            }
            Object.assign(panelStyle, {
              left: `${left}px`,
              top: `${top}px`,
              minWidth: `${targetWidth}px`
            });
          } else {
            if (placement === 'top') {
              panelPlacement = 'top';
              panelStyle.bottom = `${targetHeight}px`;
            } else if (!placement) {
              // 如果下面不够放，则向上
              panelStyle.top = `${targetHeight}px`;
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top';
                  panelStyle.top = '';
                  panelStyle.bottom = `${targetHeight}px`;
                }
              }
            }
          }
          reactData.panelStyle = panelStyle;
          reactData.panelPlacement = panelPlacement;
          return (0, _vue.nextTick)();
        }
      });
    };
    const showPanel = () => {
      const {
        visiblePanel
      } = reactData;
      const {
        hpTimeout
      } = internalData;
      const isDisabled = computeIsDisabled.value;
      const isDatePickerType = computeIsDatePickerType.value;
      if (!isDisabled && !visiblePanel) {
        if (!reactData.initialized) {
          reactData.initialized = true;
        }
        if (hpTimeout) {
          clearTimeout(hpTimeout);
          internalData.hpTimeout = undefined;
        }
        reactData.isActivated = true;
        reactData.isAniVisible = true;
        if (isDatePickerType) {
          dateOpenPanel();
        }
        setTimeout(() => {
          reactData.visiblePanel = true;
        }, 10);
        updateZindex();
        return updatePlacement();
      }
      return (0, _vue.nextTick)();
    };
    const datePickerOpenEvent = evnt => {
      const inputReadonly = computeInputReadonly.value;
      if (!inputReadonly) {
        evnt.preventDefault();
        showPanel();
      }
    };
    const clickEvent = evnt => {
      triggerEvent(evnt);
    };
    // 弹出面板
    // 全局事件
    const handleGlobalMousedownEvent = evnt => {
      const {
        visiblePanel,
        isActivated
      } = reactData;
      const isDatePickerType = computeIsDatePickerType.value;
      const el = refElem.value;
      const panelWrapperElem = refPanelWrapper.value;
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled && isActivated) {
        reactData.isActivated = (0, _dom.getEventTargetNode)(evnt, el).flag || (0, _dom.getEventTargetNode)(evnt, panelWrapperElem).flag;
        if (!reactData.isActivated) {
          // 如果是日期类型
          if (isDatePickerType) {
            if (visiblePanel) {
              hidePanel();
              afterCheckValue();
            }
          } else {
            afterCheckValue();
          }
        }
      }
    };
    const handleGlobalKeydownEvent = evnt => {
      const {
        clearable
      } = props;
      const {
        visiblePanel
      } = reactData;
      const isDisabled = computeIsDisabled.value;
      const isDatePickerType = computeIsDatePickerType.value;
      if (!isDisabled) {
        const isTab = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.TAB);
        const isDel = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.DELETE);
        const isEsc = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ESCAPE);
        const isEnter = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ENTER);
        const isLeftArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_LEFT);
        const isUpArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_UP);
        const isRightArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_RIGHT);
        const isDwArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_DOWN);
        const isPgUp = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.PAGE_UP);
        const isPgDn = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.PAGE_DOWN);
        const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
        let isActivated = reactData.isActivated;
        if (isTab) {
          if (isActivated) {
            afterCheckValue();
          }
          isActivated = false;
          reactData.isActivated = isActivated;
        } else if (operArrow) {
          if (isDatePickerType) {
            if (isActivated) {
              if (visiblePanel) {
                dateOffsetEvent(evnt);
              } else if (isUpArrow || isDwArrow) {
                datePickerOpenEvent(evnt);
              }
            }
          }
        } else if (isEnter) {
          if (isDatePickerType) {
            if (visiblePanel) {
              if (reactData.datePanelValue) {
                dateSelectItem(reactData.datePanelValue);
              } else {
                hidePanel();
              }
            } else if (isActivated) {
              datePickerOpenEvent(evnt);
            }
          }
        } else if (isPgUp || isPgDn) {
          if (isDatePickerType) {
            if (isActivated) {
              datePgOffsetEvent(evnt);
            }
          }
        }
        if (isTab || isEsc) {
          if (visiblePanel) {
            hidePanel();
          }
        } else if (isDel && clearable) {
          if (isActivated) {
            clearValueEvent(evnt, null);
          }
        }
      }
    };
    const handleGlobalMousewheelEvent = evnt => {
      const {
        visiblePanel
      } = reactData;
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        if (visiblePanel) {
          const panelWrapperElem = refPanelWrapper.value;
          if ((0, _dom.getEventTargetNode)(evnt, panelWrapperElem).flag) {
            updatePlacement();
          } else {
            hidePanel();
            afterCheckValue();
          }
        }
      }
    };
    const handleGlobalBlurEvent = () => {
      const {
        isActivated,
        visiblePanel
      } = reactData;
      if (visiblePanel) {
        hidePanel();
      }
      if (isActivated) {
        reactData.isActivated = false;
      }
      if (visiblePanel || isActivated) {
        const inputElem = refInputTarget.value;
        afterCheckValue();
        if (inputElem) {
          inputElem.blur();
        }
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
          $input: $xeInput
        });
        const festivalItem = festivalRest ? _xeUtils.default.isString(festivalRest) ? {
          label: festivalRest
        } : festivalRest : {};
        const extraItem = festivalItem.extra ? _xeUtils.default.isString(festivalItem.extra) ? {
          label: festivalItem.extra
        } : festivalItem.extra : null;
        const labels = [(0, _vue.h)('span', {
          class: ['vxe-input--date-label', {
            'is-notice': festivalItem.notice
          }]
        }, extraItem && extraItem.label ? [(0, _vue.h)('span', `${label || ''}`), (0, _vue.h)('span', {
          class: ['vxe-input--date-label--extra', extraItem.important ? 'is-important' : '', extraItem.className],
          style: extraItem.style
        }, _xeUtils.default.toValueString(extraItem.label))] : [`${label || ''}`])];
        const festivalLabel = festivalItem.label;
        if (festivalLabel) {
          // 默认最多支持3个节日重叠
          const festivalLabels = _xeUtils.default.toValueString(festivalLabel).split(',');
          labels.push((0, _vue.h)('span', {
            class: ['vxe-input--date-festival', festivalItem.important ? 'is-important' : '', festivalItem.className],
            style: festivalItem.style
          }, [festivalLabels.length > 1 ? (0, _vue.h)('span', {
            class: ['vxe-input--date-festival--overlap', `overlap--${festivalLabels.length}`]
          }, festivalLabels.map(label => (0, _vue.h)('span', label.substring(0, 3)))) : (0, _vue.h)('span', {
            class: 'vxe-input--date-festival--label'
          }, festivalLabels[0].substring(0, 3))]));
        }
        return labels;
      }
      return [`${label || ''}`];
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
      const matchFormat = 'yyyyMMdd';
      return [(0, _vue.h)('table', {
        class: `vxe-input--date-${datePanelType}-view`,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [(0, _vue.h)('thead', [(0, _vue.h)('tr', dateHeaders.map(item => {
        return (0, _vue.h)('th', item.label);
      }))]), (0, _vue.h)('tbody', dayDatas.map(rows => {
        return (0, _vue.h)('tr', rows.map(item => {
          return (0, _vue.h)('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item)
          }, renderDateLabel(item, item.label));
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
      const matchFormat = 'yyyyMMdd';
      return [(0, _vue.h)('table', {
        class: `vxe-input--date-${datePanelType}-view`,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [(0, _vue.h)('thead', [(0, _vue.h)('tr', weekHeaders.map(item => {
        return (0, _vue.h)('th', item.label);
      }))]), (0, _vue.h)('tbody', weekDates.map(rows => {
        const isSelected = multiple ? rows.some(item => dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat))) : rows.some(item => _xeUtils.default.isDateSame(dateValue, item.date, matchFormat));
        const isHover = rows.some(item => _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat));
        return (0, _vue.h)('tr', rows.map(item => {
          return (0, _vue.h)('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--hover': isHover
            },
            // event
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item)
          }, renderDateLabel(item, item.label));
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
      const matchFormat = 'yyyyMM';
      return [(0, _vue.h)('table', {
        class: `vxe-input--date-${datePanelType}-view`,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [(0, _vue.h)('tbody', monthDatas.map(rows => {
        return (0, _vue.h)('tr', rows.map(item => {
          return (0, _vue.h)('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item)
          }, renderDateLabel(item, (0, _ui.getI18n)(`vxe.input.date.months.m${item.month}`)));
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
      const matchFormat = 'yyyyq';
      return [(0, _vue.h)('table', {
        class: `vxe-input--date-${datePanelType}-view`,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [(0, _vue.h)('tbody', quarterDatas.map(rows => {
        return (0, _vue.h)('tr', rows.map(item => {
          return (0, _vue.h)('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item)
          }, renderDateLabel(item, (0, _ui.getI18n)(`vxe.input.date.quarters.q${item.quarter}`)));
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
      const matchFormat = 'yyyy';
      return [(0, _vue.h)('table', {
        class: `vxe-input--date-${datePanelType}-view`,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [(0, _vue.h)('tbody', yearDatas.map(rows => {
        return (0, _vue.h)('tr', rows.map(item => {
          return (0, _vue.h)('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item)
          }, renderDateLabel(item, item.year));
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
        class: 'vxe-input--date-picker-header'
      }, [(0, _vue.h)('div', {
        class: 'vxe-input--date-picker-type-wrapper'
      }, [datePanelType === 'year' ? (0, _vue.h)('span', {
        class: 'vxe-input--date-picker-label'
      }, selectDatePanelObj.y) : (0, _vue.h)('span', {
        class: 'vxe-input--date-picker-btns'
      }, [(0, _vue.h)('span', {
        class: 'vxe-input--date-picker-btn',
        onClick: dateToggleYearTypeEvent
      }, selectDatePanelObj.y), selectDatePanelObj.m ? (0, _vue.h)('span', {
        class: 'vxe-input--date-picker-btn',
        onClick: dateToggleMonthTypeEvent
      }, selectDatePanelObj.m) : (0, _ui.renderEmptyElement)($xeInput)])]), (0, _vue.h)('div', {
        class: 'vxe-input--date-picker-btn-wrapper'
      }, [(0, _vue.h)('span', {
        class: ['vxe-input--date-picker-btn vxe-input--date-picker-prev-btn', {
          'is--disabled': isDisabledPrevDateBtn
        }],
        onClick: datePrevEvent
      }, [(0, _vue.h)('i', {
        class: 'vxe-icon-caret-left'
      })]), (0, _vue.h)('span', {
        class: 'vxe-input--date-picker-btn vxe-input--date-picker-current-btn',
        onClick: dateTodayMonthEvent
      }, [(0, _vue.h)('i', {
        class: 'vxe-icon-dot'
      })]), (0, _vue.h)('span', {
        class: ['vxe-input--date-picker-btn vxe-input--date-picker-next-btn', {
          'is--disabled': isDisabledNextDateBtn
        }],
        onClick: dateNextEvent
      }, [(0, _vue.h)('i', {
        class: 'vxe-icon-caret-right'
      })]), multiple && computeSupportMultiples.value ? (0, _vue.h)('span', {
        class: 'vxe-input--date-picker-btn vxe-input--date-picker-confirm-btn'
      }, [(0, _vue.h)('button', {
        class: 'vxe-input--date-picker-confirm',
        type: 'button',
        onClick: dateConfirmEvent
      }, (0, _ui.getI18n)('vxe.button.confirm'))]) : null])]), (0, _vue.h)('div', {
        class: 'vxe-input--date-picker-body'
      }, renderDateTable())];
    };
    const renderTimePanel = () => {
      const {
        datetimePanelValue
      } = reactData;
      const dateTimeLabel = computeDateTimeLabel.value;
      const hourList = computeHourList.value;
      const hasTimeMinute = computeHasTimeMinute.value;
      const minuteList = computeMinuteList.value;
      const hasTimeSecond = computeHasTimeSecond.value;
      const secondList = computeSecondList.value;
      return [(0, _vue.h)('div', {
        class: 'vxe-input--time-picker-header'
      }, [hasTimeMinute ? (0, _vue.h)('span', {
        class: 'vxe-input--time-picker-title'
      }, dateTimeLabel) : (0, _vue.createCommentVNode)(), (0, _vue.h)('div', {
        class: 'vxe-input--time-picker-btn'
      }, [(0, _vue.h)('button', {
        class: 'vxe-input--time-picker-confirm',
        type: 'button',
        onClick: dateConfirmEvent
      }, (0, _ui.getI18n)('vxe.button.confirm'))])]), (0, _vue.h)('div', {
        ref: refInputTimeBody,
        class: 'vxe-input--time-picker-body'
      }, [(0, _vue.h)('ul', {
        class: 'vxe-input--time-picker-hour-list'
      }, hourList.map((item, index) => {
        return (0, _vue.h)('li', {
          key: index,
          class: {
            'is--selected': datetimePanelValue && datetimePanelValue.getHours() === item.value
          },
          onClick: evnt => dateHourEvent(evnt, item)
        }, item.label);
      })), hasTimeMinute ? (0, _vue.h)('ul', {
        class: 'vxe-input--time-picker-minute-list'
      }, minuteList.map((item, index) => {
        return (0, _vue.h)('li', {
          key: index,
          class: {
            'is--selected': datetimePanelValue && datetimePanelValue.getMinutes() === item.value
          },
          onClick: evnt => dateMinuteEvent(evnt, item)
        }, item.label);
      })) : (0, _vue.createCommentVNode)(), hasTimeMinute && hasTimeSecond ? (0, _vue.h)('ul', {
        class: 'vxe-input--time-picker-second-list'
      }, secondList.map((item, index) => {
        return (0, _vue.h)('li', {
          key: index,
          class: {
            'is--selected': datetimePanelValue && datetimePanelValue.getSeconds() === item.value
          },
          onClick: evnt => dateSecondEvent(evnt, item)
        }, item.label);
      })) : (0, _vue.createCommentVNode)()])];
    };
    const renderPanel = () => {
      const {
        type
      } = props;
      const {
        initialized,
        isAniVisible,
        visiblePanel,
        panelPlacement,
        panelStyle
      } = reactData;
      const vSize = computeSize.value;
      const btnTransfer = computeBtnTransfer.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const renders = [];
      if (isDatePickerType) {
        if (type === 'datetime') {
          renders.push((0, _vue.h)('div', {
            key: type,
            ref: refPanelWrapper,
            class: 'vxe-input--panel-layout-wrapper'
          }, [(0, _vue.h)('div', {
            class: 'vxe-input--panel-left-wrapper'
          }, renderDatePanel()), (0, _vue.h)('div', {
            class: 'vxe-input--panel-right-wrapper'
          }, renderTimePanel())]));
        } else if (type === 'time') {
          renders.push((0, _vue.h)('div', {
            key: type,
            ref: refPanelWrapper,
            class: 'vxe-input--panel-wrapper'
          }, renderTimePanel()));
        } else {
          renders.push((0, _vue.h)('div', {
            key: type || 'default',
            ref: refPanelWrapper,
            class: 'vxe-input--panel-wrapper'
          }, renderDatePanel()));
        }
        return (0, _vue.h)(_vue.Teleport, {
          to: 'body',
          disabled: btnTransfer ? !initialized : true
        }, [(0, _vue.h)('div', {
          ref: refInputPanel,
          class: ['vxe-table--ignore-clear vxe-input--panel', `type--${type}`, {
            [`size--${vSize}`]: vSize,
            'is--transfer': btnTransfer,
            'ani--leave': isAniVisible,
            'ani--enter': visiblePanel
          }],
          placement: panelPlacement,
          style: panelStyle
        }, visiblePanel || isAniVisible ? renders : [])]);
      }
      return (0, _vue.createCommentVNode)();
    };
    const renderNumberIcon = () => {
      const isDisabledAddNumber = computeIsDisabledAddNumber.value;
      const isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value;
      return (0, _vue.h)('div', {
        class: 'vxe-input--control-icon'
      }, [(0, _vue.h)('div', {
        class: 'vxe-input--number-icon'
      }, [(0, _vue.h)('div', {
        class: ['vxe-input--number-btn is--prev', {
          'is--disabled': isDisabledAddNumber
        }],
        onMousedown: numberMousedownEvent,
        onMouseup: numberStopDown,
        onMouseleave: numberStopDown
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().INPUT_PLUS_NUM
      })]), (0, _vue.h)('div', {
        class: ['vxe-input--number-btn is--next', {
          'is--disabled': isDisabledSubtractNumber
        }],
        onMousedown: numberMousedownEvent,
        onMouseup: numberStopDown,
        onMouseleave: numberStopDown
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().INPUT_MINUS_NUM
      })])])]);
    };
    const renderDatePickerIcon = () => {
      return (0, _vue.h)('div', {
        class: 'vxe-input--control-icon',
        onClick: datePickerOpenEvent
      }, [(0, _vue.h)('i', {
        class: ['vxe-input--date-picker-icon', (0, _ui.getIcon)().DATE_PICKER_DATE]
      })]);
    };
    const renderSearchIcon = () => {
      return (0, _vue.h)('div', {
        class: 'vxe-input--control-icon',
        onClick: searchEvent
      }, [(0, _vue.h)('i', {
        class: ['vxe-input--search-icon', (0, _ui.getIcon)().INPUT_SEARCH]
      })]);
    };
    const renderPasswordIcon = () => {
      const {
        showPwd
      } = reactData;
      return (0, _vue.h)('div', {
        class: 'vxe-input--control-icon',
        onClick: passwordToggleEvent
      }, [(0, _vue.h)('i', {
        class: ['vxe-input--password-icon', showPwd ? (0, _ui.getIcon)().PASSWORD_INPUT_SHOW_PWD : (0, _ui.getIcon)().PASSWORD_INPUT_HIDE_PWD]
      })]);
    };
    const renderPrefixIcon = () => {
      const {
        prefixIcon
      } = props;
      const prefixOpts = computePrefixOpts.value;
      const prefixSlot = slots.prefix;
      const preIcon = prefixIcon || prefixOpts.icon;
      const sufContent = prefixOpts.content;
      return prefixSlot || preIcon || sufContent ? (0, _vue.h)('div', {
        class: 'vxe-input--prefix',
        onClick: clickPrefixEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-input--prefix-icon'
      }, prefixSlot ? (0, _vn.getSlotVNs)(prefixSlot({})) : [preIcon ? (0, _vue.h)('i', {
        class: preIcon
      }) : (0, _ui.renderEmptyElement)($xeInput), sufContent ? (0, _vue.h)('span', {
        class: 'vxe-input--prefix-text'
      }, `${sufContent}`) : (0, _ui.renderEmptyElement)($xeInput)])]) : (0, _ui.renderEmptyElement)($xeInput);
    };
    const renderSuffixIcon = () => {
      const {
        suffixIcon
      } = props;
      const {
        inputValue
      } = reactData;
      const suffixSlot = slots.suffix;
      const suffixOpts = computeSuffixOpts.value;
      const isDisabled = computeIsDisabled.value;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const isPawdType = computeIsPawdType.value;
      const isSearchType = computeIsSearchType.value;
      const isClearable = computeIsClearable.value;
      const isExtraBtn = isPawdType || isNumType || isDatePickerType || isSearchType;
      const sufIcon = suffixIcon || suffixOpts.icon;
      const sufContent = suffixOpts.content;
      return isClearable || suffixSlot || sufIcon || sufContent || isExtraBtn ? (0, _vue.h)('div', {
        class: ['vxe-input--suffix', {
          'is--clear': isClearable && !isDisabled && !(inputValue === '' || _xeUtils.default.eqNull(inputValue))
        }]
      }, [isClearable ? (0, _vue.h)('div', {
        class: 'vxe-input--clear-icon',
        onClick: clearValueEvent
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().INPUT_CLEAR
      })]) : (0, _ui.renderEmptyElement)($xeInput), isExtraBtn ? renderExtraSuffixIcon() : (0, _ui.renderEmptyElement)($xeInput), suffixSlot || sufIcon || sufContent ? (0, _vue.h)('div', {
        class: 'vxe-input--suffix-icon',
        onClick: clickSuffixEvent
      }, suffixSlot ? (0, _vn.getSlotVNs)(suffixSlot({})) : [sufIcon ? (0, _vue.h)('i', {
        class: sufIcon
      }) : (0, _ui.renderEmptyElement)($xeInput), sufContent ? (0, _vue.h)('span', {
        class: 'vxe-input--suffix-text'
      }, `${sufContent}`) : (0, _ui.renderEmptyElement)($xeInput)]) : (0, _ui.renderEmptyElement)($xeInput)]) : (0, _ui.renderEmptyElement)($xeInput);
    };
    const renderExtraSuffixIcon = () => {
      const {
        controls
      } = props;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const isPawdType = computeIsPawdType.value;
      const isSearchType = computeIsSearchType.value;
      if (isPawdType) {
        return renderPasswordIcon();
      }
      if (isNumType) {
        if (controls) {
          return renderNumberIcon();
        }
      }
      if (isDatePickerType) {
        return renderDatePickerIcon();
      }
      if (isSearchType) {
        return renderSearchIcon();
      }
      return (0, _vue.createCommentVNode)();
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $input: $xeInput
      }, params));
    };
    inputMethods = {
      dispatchEvent,
      focus() {
        const inputElem = refInputTarget.value;
        reactData.isActivated = true;
        inputElem.focus();
        return (0, _vue.nextTick)();
      },
      blur() {
        const inputElem = refInputTarget.value;
        inputElem.blur();
        reactData.isActivated = false;
        return (0, _vue.nextTick)();
      },
      select() {
        const inputElem = refInputTarget.value;
        inputElem.select();
        reactData.isActivated = false;
        return (0, _vue.nextTick)();
      },
      showPanel,
      hidePanel,
      updatePlacement
    };
    Object.assign($xeInput, inputMethods);
    const renderVN = () => {
      const {
        className,
        controls,
        type,
        title,
        align,
        showWordCount,
        countMethod,
        name,
        autoComplete,
        autocomplete
      } = props;
      const {
        inputValue,
        visiblePanel,
        isActivated
      } = reactData;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const formReadonly = computeFormReadonly.value;
      if (formReadonly) {
        return (0, _vue.h)('div', {
          ref: refElem,
          class: ['vxe-input--readonly', `type--${type}`, className]
        }, inputValue);
      }
      const isCountError = computeIsCountError.value;
      const inputCount = computeInputCount.value;
      const inputReadonly = computeInputReadonly.value;
      const inpMaxLength = computeInpMaxLength.value;
      const inputType = computeInputType.value;
      const inpPlaceholder = computeInpPlaceholder.value;
      const isClearable = computeIsClearable.value;
      const isWordCount = showWordCount && ['text', 'search'].includes(type);
      const prefix = renderPrefixIcon();
      const suffix = renderSuffixIcon();
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-input', `type--${type}`, className, {
          [`size--${vSize}`]: vSize,
          [`is--${align}`]: align,
          'is--controls': controls,
          'is--prefix': !!prefix,
          'is--suffix': !!suffix,
          'is--visible': visiblePanel,
          'is--count': isWordCount,
          'is--disabled': isDisabled,
          'is--active': isActivated,
          'show--clear': isClearable && !isDisabled && !(inputValue === '' || _xeUtils.default.eqNull(inputValue))
        }],
        spellcheck: false
      }, [prefix || (0, _vue.createCommentVNode)(), (0, _vue.h)('div', {
        class: 'vxe-input--wrapper',
        title: title || null
      }, [(0, _vue.h)('input', {
        ref: refInputTarget,
        class: 'vxe-input--inner',
        value: inputValue,
        name,
        type: inputType,
        placeholder: inpPlaceholder,
        maxlength: inpMaxLength,
        readonly: inputReadonly,
        disabled: isDisabled,
        autocomplete: autoComplete || autocomplete,
        onKeydown: keydownEvent,
        onKeyup: keyupEvent,
        onClick: clickEvent,
        onInput: inputEvent,
        onChange: changeEvent,
        onFocus: focusEvent,
        onBlur: blurEvent
      })]), suffix || (0, _vue.createCommentVNode)(),
      // 下拉面板
      renderPanel(),
      // 字数统计
      isWordCount ? (0, _vue.h)('span', {
        class: ['vxe-input--count', {
          'is--error': isCountError
        }]
      }, countMethod ? `${countMethod({
        value: inputValue
      })}` : `${inputCount}${inpMaxLength ? `/${inpMaxLength}` : ''}`) : (0, _vue.createCommentVNode)()]);
    };
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.inputValue = val;
      changeValue();
    });
    (0, _vue.watch)(() => props.type, () => {
      // 切换类型是重置内置变量
      Object.assign(reactData, {
        inputValue: props.modelValue,
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
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        dateParseValue(reactData.datePanelValue);
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
      }
    });
    (0, _vue.onMounted)(() => {
      const {
        type
      } = props;
      if (['date', 'time', 'datetime', 'week', 'month', 'quarter', 'year'].includes(type)) {
        (0, _log.warnLog)('vxe.error.useNew', [`<vxe-input type="${type}" ... />`, `<vxe-date-picker type="${type}" ... />`]);
      } else if (['number', 'integer', 'float'].includes(type)) {
        (0, _log.warnLog)('vxe.error.useNew', [`<vxe-input type="${type}" ... />`, `<vxe-number-input type="${type}" ... />`]);
      } else if (['password'].includes(type)) {
        (0, _log.warnLog)('vxe.error.useNew', [`<vxe-input type="${type}" ... />`, '<vxe-password-input ... />']);
      }
      const inputElem = refInputTarget.value;
      if (inputElem) {
        inputElem.addEventListener('wheel', wheelEvent, {
          passive: false
        });
      }
      _ui.globalEvents.on($xeInput, 'mousewheel', handleGlobalMousewheelEvent);
      _ui.globalEvents.on($xeInput, 'mousedown', handleGlobalMousedownEvent);
      _ui.globalEvents.on($xeInput, 'keydown', handleGlobalKeydownEvent);
      _ui.globalEvents.on($xeInput, 'blur', handleGlobalBlurEvent);
    });
    (0, _vue.onBeforeUnmount)(() => {
      numberStopDown();
      afterCheckValue();
      const inputElem = refInputTarget.value;
      if (inputElem) {
        inputElem.removeEventListener('wheel', wheelEvent);
      }
      _ui.globalEvents.off($xeInput, 'mousewheel');
      _ui.globalEvents.off($xeInput, 'mousedown');
      _ui.globalEvents.off($xeInput, 'keydown');
      _ui.globalEvents.off($xeInput, 'blur');
    });
    initValue();
    $xeInput.renderVN = renderVN;
    return $xeInput;
  },
  render() {
    return this.renderVN();
  }
});