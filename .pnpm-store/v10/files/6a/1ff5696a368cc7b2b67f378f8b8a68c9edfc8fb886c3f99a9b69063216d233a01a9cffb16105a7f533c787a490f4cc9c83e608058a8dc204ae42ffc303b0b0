"use strict";

var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _util = require("../../table/src/util");
var _utils = require("../../ui/src/utils");
var _vn = require("../../ui/src/vn");
var _log = require("../../ui/src/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getConfig,
  renderer,
  getI18n,
  getComponent
} = _ui.VxeUI;
const componentDefaultModelProp = 'modelValue';
const defaultCompProps = {};
function handleDefaultValue(value, defaultVal, initVal) {
  return _xeUtils.default.eqNull(value) ? _xeUtils.default.eqNull(defaultVal) ? initVal : defaultVal : value;
}
function parseDate(value, props) {
  return value && props.valueFormat ? _xeUtils.default.toStringDate(value, props.valueFormat) : value;
}
function getFormatDate(value, props, defaultFormat) {
  const {
    dateConfig = {}
  } = props;
  return _xeUtils.default.toDateString(parseDate(value, props), dateConfig.labelFormat || defaultFormat);
}
function getLabelFormatDate(value, props) {
  return getFormatDate(value, props, getI18n(`vxe.input.date.labelFormat.${props.type || 'date'}`));
}
/**
 * 已废弃
 * @deprecated
 */
function getOldComponentName(name) {
  return `vxe-${name.replace('$', '')}`;
}
function getDefaultComponent({
  name
}) {
  return getComponent(name);
}
/**
 * 已废弃
 * @deprecated
 */
function getOldComponent({
  name
}) {
  return (0, _vue.resolveComponent)(getOldComponentName(name));
}
function updateFilterChangeOption(params, checked, option) {
  const {
    $table
  } = params;
  $table.updateFilterOptionStatus(option, checked);
}
function saveFilterEvent(params) {
  const {
    $table,
    column
  } = params;
  $table.saveFilterByEvent(new Event('change'), column);
}
function getNativeAttrs(renderOpts) {
  let {
    name,
    attrs
  } = renderOpts;
  if (name === 'input') {
    attrs = Object.assign({
      type: 'text'
    }, attrs);
  }
  return attrs;
}
function getInputImmediateModel(renderOpts) {
  const {
    name,
    immediate,
    props
  } = renderOpts;
  if (!immediate) {
    if (name === 'VxeInput' || name === '$input') {
      const {
        type
      } = props || {};
      return !(!type || type === 'text' || type === 'number' || type === 'integer' || type === 'float');
    }
    if (name === 'input' || name === 'textarea' || name === '$textarea') {
      return false;
    }
    return true;
  }
  return immediate;
}
function getCellEditProps(renderOpts, params, value, defaultProps) {
  return _xeUtils.default.assign({
    immediate: getInputImmediateModel(renderOpts)
  }, defaultCompProps, defaultProps, renderOpts.props, {
    [componentDefaultModelProp]: value
  });
}
function getCellEditFilterProps(renderOpts, params, value, defaultProps) {
  return _xeUtils.default.assign({}, defaultCompProps, defaultProps, renderOpts.props, {
    [componentDefaultModelProp]: value
  });
}
function isImmediateCell(renderOpts, params) {
  return params.$type === 'cell' || getInputImmediateModel(renderOpts);
}
function getCellLabelVNs(renderOpts, params, cellLabel, opts) {
  const {
    placeholder
  } = renderOpts;
  return [(0, _vue.h)('span', {
    class: ['vxe-cell--label', opts ? opts.class : '']
  }, placeholder && (0, _utils.isEmptyValue)(cellLabel) ? [(0, _vue.h)('span', {
    class: 'vxe-cell--placeholder'
  }, (0, _utils.formatText)((0, _utils.getFuncText)(placeholder), 1))] : (0, _utils.formatText)(cellLabel, 1))];
}
/**
 * 原生事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getNativeElementOns(renderOpts, params, eFns) {
  const {
    events
  } = renderOpts;
  const modelEvent = (0, _vn.getModelEvent)(renderOpts);
  const changeEvent = (0, _vn.getChangeEvent)(renderOpts);
  const {
    model: modelFunc,
    change: changeFunc,
    blur: blurFunc
  } = eFns || {};
  const isSameEvent = changeEvent === modelEvent;
  const ons = {};
  if (events) {
    _xeUtils.default.objectEach(events, (func, key) => {
      ons[(0, _vn.getOnName)(key)] = function (...args) {
        func(params, ...args);
      };
    });
  }
  if (modelFunc) {
    ons[(0, _vn.getOnName)(modelEvent)] = function (targetEvnt) {
      modelFunc(targetEvnt);
      if (isSameEvent && changeFunc) {
        changeFunc(targetEvnt);
      }
      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt);
      }
    };
  }
  if (!isSameEvent && changeFunc) {
    ons[(0, _vn.getOnName)(changeEvent)] = function (evnt) {
      changeFunc(evnt);
      if (events && events[changeEvent]) {
        events[changeEvent](params, evnt);
      }
    };
  }
  if (blurFunc) {
    ons[(0, _vn.getOnName)(blurEvent)] = function (evnt) {
      blurFunc(evnt);
      if (events && events[blurEvent]) {
        events[blurEvent](params, evnt);
      }
    };
  }
  return ons;
}
const blurEvent = 'blur';
const clearEvent = 'clear';
/**
 * 组件事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getComponentOns(renderOpts, params, eFns, eventOns) {
  const {
    events
  } = renderOpts;
  const modelEvent = (0, _vn.getModelEvent)(renderOpts);
  const changeEvent = (0, _vn.getChangeEvent)(renderOpts);
  const {
    model: modelFunc,
    change: changeFunc,
    blur: blurFunc,
    clear: clearFunc
  } = eFns || {};
  const ons = {};
  _xeUtils.default.objectEach(events, (func, key) => {
    ons[(0, _vn.getOnName)(key)] = function (...args) {
      if (!_xeUtils.default.isFunction(func)) {
        (0, _log.errLog)('vxe.error.errFunc', [func]);
      }
      func(params, ...args);
    };
  });
  if (modelFunc) {
    ons[(0, _vn.getOnName)(modelEvent)] = function (targetEvnt) {
      modelFunc(targetEvnt);
      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt);
      }
    };
  }
  if (changeFunc) {
    ons[(0, _vn.getOnName)(changeEvent)] = function (...args) {
      changeFunc(...args);
      if (events && events[changeEvent]) {
        events[changeEvent](params, ...args);
      }
    };
  }
  if (blurFunc) {
    ons[(0, _vn.getOnName)(blurEvent)] = function (...args) {
      blurFunc(...args);
      if (events && events[blurEvent]) {
        events[blurEvent](params, ...args);
      }
    };
  }
  if (clearFunc) {
    ons[(0, _vn.getOnName)(clearEvent)] = function (...args) {
      clearFunc(...args);
      if (events && events[clearEvent]) {
        events[clearEvent](params, ...args);
      }
    };
  }
  return eventOns ? Object.assign(ons, eventOns) : ons;
}
function getEditOns(renderOpts, params) {
  const {
    $table,
    row,
    column
  } = params;
  const {
    name
  } = renderOpts;
  const {
    model
  } = column;
  const isImmediate = isImmediateCell(renderOpts, params);
  return getComponentOns(renderOpts, params, {
    model(cellValue) {
      // 处理 model 值双向绑定
      model.update = true;
      model.value = cellValue;
      if (isImmediate) {
        (0, _util.setCellValue)(row, column, cellValue);
      }
    },
    change(eventParams) {
      // 处理 change 事件相关逻辑
      if (!isImmediate && name && ['VxeInput', 'VxeNumberInput', 'VxeTextarea', '$input', '$textarea'].includes(name)) {
        const cellValue = eventParams.value;
        model.update = true;
        model.value = cellValue;
        $table.updateStatus(params, cellValue);
      } else {
        $table.updateStatus(params);
      }
    },
    blur() {
      if (isImmediate) {
        $table.handleCellRuleUpdateStatus('blur', params);
      } else {
        $table.handleCellRuleUpdateStatus('blur', params, model.value);
      }
    }
  });
}
function getFilterOns(renderOpts, params, option) {
  return getComponentOns(renderOpts, params, {
    model(value) {
      // 处理 model 值双向绑定
      option.data = value;
    },
    change() {
      updateFilterChangeOption(params, !(0, _utils.isEmptyValue)(option.data), option);
    },
    blur() {
      updateFilterChangeOption(params, !(0, _utils.isEmptyValue)(option.data), option);
    }
  });
}
function getFloatingFilterOns(renderOpts, params, option) {
  const {
    $table,
    column
  } = params;
  if ((0, _vn.hasInputType)(renderOpts)) {
    return getComponentOns(renderOpts, params, {
      model(value) {
        // 处理 model 值双向绑定
        option.data = value;
      },
      change() {
        updateFilterChangeOption(params, !(0, _utils.isEmptyValue)(option.data), option);
      },
      clear() {
        updateFilterChangeOption(params, !(0, _utils.isEmptyValue)(option.data), option);
        saveFilterEvent(params);
      },
      blur() {
        $table.saveFilterByEvent(new Event('change'), column);
      }
    }, renderOpts.name === 'VxeNumberInput' ? {
      [(0, _vn.getOnName)('plus-number')]() {
        updateFilterChangeOption(params, !(0, _utils.isEmptyValue)(option.data), option);
        saveFilterEvent(params);
      },
      [(0, _vn.getOnName)('minus-number')]() {
        updateFilterChangeOption(params, !(0, _utils.isEmptyValue)(option.data), option);
        saveFilterEvent(params);
      }
    } : {});
  }
  return getComponentOns(renderOpts, params, {
    model(value) {
      // 处理 model 值双向绑定
      option.data = value;
    },
    clear() {
      updateFilterChangeOption(params, !(0, _utils.isEmptyValue)(option.data), option);
      $table.saveFilterByEvent(new Event('change'), column);
    },
    change() {
      updateFilterChangeOption(params, !(0, _utils.isEmptyValue)(option.data), option);
      $table.saveFilterByEvent(new Event('change'), column);
    }
  });
}
function getNativeEditOns(renderOpts, params) {
  const {
    $table,
    row,
    column
  } = params;
  const {
    model
  } = column;
  return getNativeElementOns(renderOpts, params, {
    model(evnt) {
      // 处理 model 值双向绑定
      const targetEl = evnt.target;
      if (targetEl) {
        const cellValue = targetEl.value;
        if (isImmediateCell(renderOpts, params)) {
          (0, _util.setCellValue)(row, column, cellValue);
        } else {
          model.update = true;
          model.value = cellValue;
        }
      }
    },
    change(evnt) {
      // 处理 change 事件相关逻辑
      const targetEl = evnt.target;
      if (targetEl) {
        const cellValue = targetEl.value;
        $table.updateStatus(params, cellValue);
      }
    },
    blur(evnt) {
      const targetEl = evnt.target;
      if (targetEl) {
        const cellValue = targetEl.value;
        $table.updateStatus(params, cellValue);
      }
    }
  });
}
function getNativeFilterOns(renderOpts, params, option) {
  return getNativeElementOns(renderOpts, params, {
    model(evnt) {
      // 处理 model 值双向绑定
      const targetEl = evnt.target;
      if (targetEl) {
        option.data = targetEl.value;
      }
    },
    change() {
      updateFilterChangeOption(params, !_xeUtils.default.eqNull(option.data), option);
    },
    blur() {
      updateFilterChangeOption(params, !_xeUtils.default.eqNull(option.data), option);
    }
  });
}
/**
 * 单元格可编辑渲染-原生的标签
 * input、textarea、select
 */
function nativeEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const {
    name
  } = renderOpts;
  const cellValue = isImmediateCell(renderOpts, params) ? (0, _util.getCellValue)(row, column) : column.model.value;
  return [(0, _vue.h)(`${name}`, Object.assign(Object.assign(Object.assign({
    class: `vxe-default-${name}`
  }, getNativeAttrs(renderOpts)), {
    value: cellValue
  }), getNativeEditOns(renderOpts, params)))];
}
function buttonCellRender(renderOpts, params) {
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, null)), getComponentOns(renderOpts, params)))];
}
function defaultEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue)), getEditOns(renderOpts, params)))];
}
function checkboxEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue)), getEditOns(renderOpts, params)))];
}
function radioAndCheckboxGroupEditRender(renderOpts, params) {
  const {
    options
  } = renderOpts;
  const {
    row,
    column
  } = params;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({
    options
  }, getCellEditProps(renderOpts, params, cellValue)), getEditOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getOldComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue)), getEditOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldButtonEditRender(renderOpts, params) {
  return [(0, _vue.h)(getComponent('vxe-button'), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, null)), getComponentOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldButtonsEditRender(renderOpts, params) {
  const {
    children
  } = renderOpts;
  return children ? children.map(childRenderOpts => oldButtonEditRender(childRenderOpts, params)[0]) : [];
}
function renderNativeOptgroups(renderOpts, params, renderOptionsMethods) {
  const {
    optionGroups,
    optionGroupProps = {}
  } = renderOpts;
  const groupOptions = optionGroupProps.options || 'options';
  const groupLabel = optionGroupProps.label || 'label';
  if (optionGroups) {
    return optionGroups.map((group, gIndex) => {
      return (0, _vue.h)('optgroup', {
        key: gIndex,
        label: group[groupLabel]
      }, renderOptionsMethods(group[groupOptions], renderOpts, params));
    });
  }
  return [];
}
/**
 * 渲染原生的 option 标签
 */
function renderNativeOptions(options, renderOpts, params) {
  const {
    optionProps = {}
  } = renderOpts;
  const {
    row,
    column
  } = params;
  const labelProp = optionProps.label || 'label';
  const valueProp = optionProps.value || 'value';
  const disabledProp = optionProps.disabled || 'disabled';
  const cellValue = isImmediateCell(renderOpts, params) ? (0, _util.getCellValue)(row, column) : column.model.value;
  if (options) {
    return options.map((option, oIndex) => {
      return (0, _vue.h)('option', {
        key: oIndex,
        value: option[valueProp],
        disabled: option[disabledProp],
        /* eslint-disable eqeqeq */
        selected: option[valueProp] == cellValue
      }, option[labelProp]);
    });
  }
  return [];
}
function nativeFilterRender(renderOpts, params) {
  const {
    column
  } = params;
  const {
    name
  } = renderOpts;
  const attrs = getNativeAttrs(renderOpts);
  return column.filters.map((option, oIndex) => {
    return (0, _vue.h)(`${name}`, Object.assign(Object.assign(Object.assign({
      key: oIndex,
      class: `vxe-default-${name}`
    }, attrs), {
      value: option.data
    }), getNativeFilterOns(renderOpts, params, option)));
  });
}
function defaultFilterRender(renderOpts, params) {
  const {
    column
  } = params;
  return column.filters.map((option, oIndex) => {
    const optionValue = option.data;
    return (0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({
      key: oIndex
    }, getCellEditFilterProps(renderOpts, renderOpts, optionValue)), getFilterOns(renderOpts, params, option)));
  });
}
function defaultFloatingFilterRender(renderOpts, params) {
  const {
    option
  } = params;
  const optionValue = option.data;
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditFilterProps(renderOpts, renderOpts, optionValue)), getFloatingFilterOns(renderOpts, params, option)))];
}
function defaultFilterOptions() {
  return [{
    data: null
  }];
}
/**
 * 已废弃
 * @deprecated
 */
function oldFilterRender(renderOpts, params) {
  const {
    column
  } = params;
  return column.filters.map((option, oIndex) => {
    const optionValue = option.data;
    return (0, _vue.h)(getOldComponent(renderOpts), Object.assign(Object.assign({
      key: oIndex
    }, getCellEditFilterProps(renderOpts, renderOpts, optionValue)), getFilterOns(renderOpts, params, option)));
  });
}
function handleFilterMethod({
  option,
  row,
  column
}) {
  const {
    data
  } = option;
  const cellValue = _xeUtils.default.get(row, column.field);
  /* eslint-disable eqeqeq */
  return cellValue == data;
}
function handleInputFilterMethod({
  option,
  row,
  column
}) {
  const {
    data
  } = option;
  const cellValue = _xeUtils.default.get(row, column.field);
  /* eslint-disable eqeqeq */
  return _xeUtils.default.toValueString(cellValue).indexOf(data) > -1;
}
function nativeSelectEditRender(renderOpts, params) {
  return [(0, _vue.h)('select', Object.assign(Object.assign({
    class: 'vxe-default-select'
  }, getNativeAttrs(renderOpts)), getNativeEditOns(renderOpts, params)), renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeOptions) : renderNativeOptions(renderOpts.options, renderOpts, params))];
}
function defaultSelectEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const {
    options,
    optionProps,
    optionGroups,
    optionGroupProps
  } = renderOpts;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue, {
    options,
    optionProps,
    optionGroups,
    optionGroupProps
  })), getEditOns(renderOpts, params)))];
}
function defaultTableOrTreeSelectEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const {
    options,
    optionProps
  } = renderOpts;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue, {
    options,
    optionProps
  })), getEditOns(renderOpts, params)))];
}
/**
 * 已废弃
 * @deprecated
 */
function oldSelectEditRender(renderOpts, params) {
  const {
    row,
    column
  } = params;
  const {
    options,
    optionProps,
    optionGroups,
    optionGroupProps
  } = renderOpts;
  const cellValue = (0, _util.getCellValue)(row, column);
  return [(0, _vue.h)(getOldComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue, {
    options,
    optionProps,
    optionGroups,
    optionGroupProps
  })), getEditOns(renderOpts, params)))];
}
function handleSelectCellValue(cellValue, renderOpts) {
  const {
    options,
    optionGroups,
    optionProps = {},
    optionGroupProps = {},
    props = {}
  } = renderOpts;
  let selectItem;
  const labelProp = optionProps.label || 'label';
  const valueProp = optionProps.value || 'value';
  if (!(cellValue === null || cellValue === undefined)) {
    let vals = [];
    if (_xeUtils.default.isArray(cellValue)) {
      vals = cellValue;
    } else {
      if (props.multiple && `${cellValue}`.indexOf(',') > -1) {
        vals = `${cellValue}`.split(',');
      } else {
        vals = [cellValue];
      }
    }
    return _xeUtils.default.map(vals, optionGroups ? value => {
      const groupOptions = optionGroupProps.options || 'options';
      for (let index = 0; index < optionGroups.length; index++) {
        /* eslint-disable eqeqeq */
        selectItem = _xeUtils.default.find(optionGroups[index][groupOptions], item => item[valueProp] == value);
        if (selectItem) {
          break;
        }
      }
      return selectItem ? selectItem[labelProp] : value;
    } : value => {
      /* eslint-disable eqeqeq */
      selectItem = _xeUtils.default.find(options, item => item[valueProp] == value);
      return selectItem ? selectItem[labelProp] : value;
    }).join(', ');
  }
  return '';
}
function getSelectCellValue(renderOpts, {
  row,
  column
}) {
  const cellValue = _xeUtils.default.get(row, column.field);
  return handleSelectCellValue(cellValue, renderOpts);
}
function handleExportSelectMethod(params) {
  const {
    row,
    column,
    options
  } = params;
  return options.original ? (0, _util.getCellValue)(row, column) : getSelectCellValue(column.editRender || column.cellRender, params);
}
function handleTreeSelectCellValue(cellValue, renderOpts) {
  const {
    options,
    optionProps = {}
  } = renderOpts;
  const labelProp = optionProps.label || 'label';
  const valueProp = optionProps.value || 'value';
  const childrenProp = optionProps.children || 'children';
  if (!(cellValue === null || cellValue === undefined)) {
    const keyMaps = {};
    _xeUtils.default.eachTree(options, item => {
      keyMaps[_xeUtils.default.get(item, valueProp)] = item;
    }, {
      children: childrenProp
    });
    return _xeUtils.default.map(_xeUtils.default.isArray(cellValue) ? cellValue : [cellValue], value => {
      const item = keyMaps[value];
      return item ? _xeUtils.default.get(item, labelProp) : item;
    }).join(', ');
  }
  return '';
}
function getTreeSelectCellValue(renderOpts, {
  row,
  column
}) {
  const cellValue = _xeUtils.default.get(row, column.field);
  return handleTreeSelectCellValue(cellValue, renderOpts);
}
function handleExportTreeSelectMethod(params) {
  const {
    row,
    column,
    options
  } = params;
  return options.original ? (0, _util.getCellValue)(row, column) : getTreeSelectCellValue(column.editRender || column.cellRender, params);
}
function handleNumberCell(renderOpts, params) {
  const {
    props = {},
    showNegativeStatus
  } = renderOpts;
  const {
    row,
    column
  } = params;
  const {
    type
  } = props;
  let cellValue = _xeUtils.default.get(row, column.field);
  let isNegative = false;
  if (!(0, _utils.isEmptyValue)(cellValue)) {
    const numberInputConfig = getConfig().numberInput || {};
    if (type === 'float') {
      const autoFill = handleDefaultValue(props.autoFill, numberInputConfig.autoFill, true);
      const digits = handleDefaultValue(props.digits, numberInputConfig.digits, 1);
      cellValue = _xeUtils.default.toFixed(_xeUtils.default.floor(cellValue, digits), digits);
      if (!autoFill) {
        cellValue = _xeUtils.default.toNumber(cellValue);
      }
      if (showNegativeStatus) {
        if (cellValue < 0) {
          isNegative = true;
        }
      }
    } else if (type === 'amount') {
      const autoFill = handleDefaultValue(props.autoFill, numberInputConfig.autoFill, true);
      const digits = handleDefaultValue(props.digits, numberInputConfig.digits, 2);
      const showCurrency = handleDefaultValue(props.showCurrency, numberInputConfig.showCurrency, false);
      cellValue = _xeUtils.default.toNumber(cellValue);
      if (showNegativeStatus) {
        if (cellValue < 0) {
          isNegative = true;
        }
      }
      cellValue = _xeUtils.default.commafy(cellValue, {
        digits
      });
      if (!autoFill) {
        const [iStr, dStr] = cellValue.split('.');
        if (dStr) {
          const dRest = dStr.replace(/0+$/, '');
          cellValue = dRest ? [iStr, '.', dRest].join('') : iStr;
        }
      }
      if (showCurrency) {
        cellValue = `${props.currencySymbol || numberInputConfig.currencySymbol || getI18n('vxe.numberInput.currencySymbol') || ''}${cellValue}`;
      }
    } else {
      if (type === 'integer') {
        cellValue = _xeUtils.default.toInteger(cellValue);
      }
      if (showNegativeStatus) {
        if (_xeUtils.default.toNumber(cellValue) < 0) {
          isNegative = true;
        }
      }
    }
  }
  return getCellLabelVNs(renderOpts, params, cellValue, isNegative ? {
    class: 'is--negative'
  } : {});
}
function handleFormatDatePicker(renderOpts, params) {
  const {
    props = {}
  } = renderOpts;
  const {
    cellValue
  } = params;
  if (cellValue) {
    if (props.type !== 'time') {
      return getLabelFormatDate(cellValue, props);
    }
  }
  return cellValue;
}
function handleFormatSelect(renderOpts, params) {
  const {
    cellValue
  } = params;
  return handleSelectCellValue(cellValue, renderOpts);
}
function handleSetSelectValue(renderOpts, params) {
  const {
    row,
    column,
    cellValue
  } = params;
  const {
    field
  } = column;
  if (field) {
    const {
      options,
      optionGroups,
      optionProps = {},
      optionGroupProps = {},
      props
    } = renderOpts;
    if ((0, _utils.isEmptyValue)(cellValue)) {
      _xeUtils.default.set(row, field, props && props.multiple ? [] : null);
      return;
    }
    const isMultiVal = _xeUtils.default.indexOf(`${cellValue}`, ',') > -1;
    const labelProp = optionProps.label || 'label';
    const valueProp = optionProps.value || 'value';
    const labelMpas = {};
    if (optionGroups && optionGroups.length) {
      const groupOptions = optionGroupProps.options || 'options';
      for (let i = 0; i < optionGroups.length; i++) {
        const opts = optionGroups[i][groupOptions] || {};
        for (let j = 0; j < opts.length; j++) {
          const item = opts[j];
          if (isMultiVal) {
            labelMpas[item[labelProp]] = item;
            /* eslint-disable eqeqeq */
          } else if (item[labelProp] == cellValue) {
            _xeUtils.default.set(row, field, item[valueProp]);
            return;
          }
        }
      }
    } else {
      if (options) {
        for (let i = 0; i < options.length; i++) {
          const item = options[i];
          if (isMultiVal) {
            labelMpas[item[labelProp]] = item;
            /* eslint-disable eqeqeq */
          } else if (item[labelProp] == cellValue) {
            _xeUtils.default.set(row, field, item[valueProp]);
            return;
          }
        }
      }
    }
    if (isMultiVal) {
      _xeUtils.default.set(row, field, (isMultiVal ? cellValue.split(',') : [cellValue]).map(label => {
        const item = labelMpas[label];
        return item ? item[valueProp] : label;
      }));
    } else {
      _xeUtils.default.set(row, field, cellValue);
    }
  }
}
function handleFormatTreeSelect(renderOpts, params) {
  const {
    cellValue
  } = params;
  return handleTreeSelectCellValue(cellValue, renderOpts);
}
function handleSetTreeSelectValue(renderOpts, params) {
  const {
    row,
    column,
    cellValue
  } = params;
  const {
    field
  } = column;
  if (field) {
    const {
      options,
      optionProps = {}
    } = renderOpts;
    const labelProp = optionProps.label || 'label';
    const valueProp = optionProps.value || 'value';
    const childrenProp = optionProps.children || 'children';
    const matchRest = _xeUtils.default.findTree(options || [], item => _xeUtils.default.get(item, labelProp) === cellValue, {
      children: childrenProp
    });
    if (matchRest) {
      const selectItem = matchRest.item;
      if (selectItem) {
        _xeUtils.default.set(row, field, selectItem[valueProp]);
        return;
      }
    }
    _xeUtils.default.set(row, field, cellValue);
  }
}
/**
 * 表格 - 渲染器
 */
renderer.mixin({
  input: {
    tableAutoFocus: 'input',
    renderTableEdit: nativeEditRender,
    renderTableDefault: nativeEditRender,
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter: nativeFilterRender,
    tableFilterDefaultMethod: handleInputFilterMethod
  },
  textarea: {
    tableAutoFocus: 'textarea',
    renderTableEdit: nativeEditRender
  },
  select: {
    renderTableEdit: nativeSelectEditRender,
    renderTableDefault: nativeSelectEditRender,
    renderTableCell(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
    },
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter(renderOpts, params) {
      const {
        column
      } = params;
      return column.filters.map((option, oIndex) => {
        return (0, _vue.h)('select', Object.assign(Object.assign({
          key: oIndex,
          class: 'vxe-default-select'
        }, getNativeAttrs(renderOpts)), getNativeFilterOns(renderOpts, params, option)), renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeOptions) : renderNativeOptions(renderOpts.options, renderOpts, params));
      });
    },
    tableCellFormatter: handleFormatSelect,
    tableCellCopyMethod: handleFormatSelect,
    tableCellPasteMethod: handleSetSelectValue,
    tableFilterDefaultMethod: handleFilterMethod,
    tableExportMethod: handleExportSelectMethod
  },
  VxeInput: {
    tableAutoFocus: 'input',
    renderTableEdit: defaultEditRender,
    renderTableCell(renderOpts, params) {
      const {
        props = {}
      } = renderOpts;
      const {
        row,
        column
      } = params;
      const inputConfig = getConfig().input || {};
      const digits = props.digits || inputConfig.digits || 2;
      let cellValue = _xeUtils.default.get(row, column.field);
      if (cellValue) {
        switch (props.type) {
          case 'date':
          case 'week':
          case 'month':
          case 'quarter':
          case 'year':
            cellValue = getLabelFormatDate(cellValue, props);
            break;
          case 'float':
            cellValue = _xeUtils.default.toFixed(_xeUtils.default.floor(cellValue, digits), digits);
            break;
        }
      }
      return getCellLabelVNs(renderOpts, params, cellValue);
    },
    renderTableDefault: defaultEditRender,
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter: defaultFilterRender,
    renderTableFloatingFilter: defaultFloatingFilterRender,
    tableFilterDefaultMethod: handleInputFilterMethod
  },
  FormatNumberInput: {
    renderTableDefault: handleNumberCell,
    tableFilterDefaultMethod: handleInputFilterMethod,
    tableExportMethod(params) {
      const {
        row,
        column
      } = params;
      const cellValue = _xeUtils.default.get(row, column.field);
      return cellValue;
    }
  },
  VxeNumberInput: {
    tableAutoFocus: 'input',
    renderTableEdit: defaultEditRender,
    renderTableCell: handleNumberCell,
    renderTableFooter(renderOpts, params) {
      const {
        props = {}
      } = renderOpts;
      const {
        row,
        column,
        _columnIndex
      } = params;
      const {
        type
      } = props;
      // 兼容老模式
      const itemValue = _xeUtils.default.isArray(row) ? row[_columnIndex] : _xeUtils.default.get(row, column.field);
      if (_xeUtils.default.isNumber(itemValue)) {
        const numberInputConfig = getConfig().numberInput || {};
        if (type === 'float') {
          const autoFill = handleDefaultValue(props.autoFill, numberInputConfig.autoFill, true);
          const digits = handleDefaultValue(props.digits, numberInputConfig.digits, 1);
          let amountLabel = _xeUtils.default.toFixed(_xeUtils.default.floor(itemValue, digits), digits);
          if (!autoFill) {
            amountLabel = _xeUtils.default.toNumber(amountLabel);
          }
          return amountLabel;
        } else if (type === 'amount') {
          const autoFill = handleDefaultValue(props.autoFill, numberInputConfig.autoFill, true);
          const digits = handleDefaultValue(props.digits, numberInputConfig.digits, 2);
          const showCurrency = handleDefaultValue(props.showCurrency, numberInputConfig.showCurrency, false);
          let amountLabel = _xeUtils.default.commafy(_xeUtils.default.toNumber(itemValue), {
            digits
          });
          if (!autoFill) {
            const [iStr, dStr] = amountLabel.split('.');
            if (dStr) {
              const dRest = dStr.replace(/0+$/, '');
              amountLabel = dRest ? [iStr, '.', dRest].join('') : iStr;
            }
          }
          if (showCurrency) {
            amountLabel = `${props.currencySymbol || numberInputConfig.currencySymbol || getI18n('vxe.numberInput.currencySymbol') || ''}${amountLabel}`;
          }
          return amountLabel;
        }
      }
      return (0, _utils.getFuncText)(itemValue, 1);
    },
    renderTableDefault: defaultEditRender,
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter: defaultFilterRender,
    renderTableFloatingFilter: defaultFloatingFilterRender,
    tableFilterDefaultMethod: handleInputFilterMethod,
    tableExportMethod(params) {
      const {
        row,
        column
      } = params;
      const cellValue = _xeUtils.default.get(row, column.field);
      return cellValue;
    }
  },
  VxeDatePicker: {
    tableAutoFocus: 'input',
    renderTableEdit: defaultEditRender,
    renderTableCell(renderOpts, params) {
      const {
        props = {}
      } = renderOpts;
      const {
        row,
        column
      } = params;
      let cellValue = _xeUtils.default.get(row, column.field);
      if (cellValue) {
        if (props.type !== 'time') {
          cellValue = getLabelFormatDate(cellValue, props);
        }
      }
      return getCellLabelVNs(renderOpts, params, cellValue);
    },
    tableCellFormatter: handleFormatDatePicker,
    renderTableDefault: defaultEditRender,
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter: defaultFilterRender,
    renderTableFloatingFilter: defaultFloatingFilterRender,
    tableFilterDefaultMethod: handleFilterMethod
  },
  VxeDateRangePicker: {
    tableAutoFocus: 'input',
    renderTableEdit(renderOpts, params) {
      const {
        startField,
        endField
      } = renderOpts;
      const {
        $table,
        row,
        column
      } = params;
      const {
        model
      } = column;
      const cellValue = (0, _util.getCellValue)(row, column);
      const seProps = {};
      const seOs = {};
      if (startField && endField) {
        seProps.startValue = _xeUtils.default.get(row, startField);
        seProps.endValue = _xeUtils.default.get(row, endField);
        seOs['onUpdate:startValue'] = value => {
          if (startField) {
            _xeUtils.default.set(row, startField, value);
          }
        };
        seOs['onUpdate:endValue'] = value => {
          if (endField) {
            _xeUtils.default.set(row, endField, value);
          }
        };
      }
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue, seProps)), getComponentOns(renderOpts, params, {
        model(cellValue) {
          model.update = true;
          model.value = cellValue;
          (0, _util.setCellValue)(row, column, cellValue);
        },
        change() {
          $table.updateStatus(params);
        },
        blur() {
          $table.handleCellRuleUpdateStatus('blur', params);
        }
      }, seOs)))];
    },
    renderTableCell(renderOpts, params) {
      const {
        startField,
        endField
      } = renderOpts;
      const {
        row,
        column
      } = params;
      let startValue = '';
      let endValue = '';
      if (startField && endField) {
        startValue = _xeUtils.default.get(row, startField);
        endValue = _xeUtils.default.get(row, endField);
      } else {
        const cellValue = _xeUtils.default.get(row, column.field);
        if (cellValue) {
          if (_xeUtils.default.isArray(cellValue)) {
            startValue = cellValue[0];
            endValue = cellValue[1];
          } else {
            const strs = `${cellValue}`.split(',');
            startValue = strs[0];
            endValue = strs[1];
          }
        }
      }
      let cellLabel = '';
      if (startValue && endValue) {
        cellLabel = `${startValue} ~ ${endValue}`;
      }
      return getCellLabelVNs(renderOpts, params, cellLabel);
    }
  },
  VxeTextarea: {
    tableAutoFocus: 'textarea',
    renderTableEdit: defaultEditRender,
    renderTableCell(renderOpts, params) {
      const {
        row,
        column
      } = params;
      const cellValue = _xeUtils.default.get(row, column.field);
      return getCellLabelVNs(renderOpts, params, cellValue);
    }
  },
  VxeButton: {
    renderTableDefault: buttonCellRender
  },
  VxeButtonGroup: {
    renderTableDefault(renderOpts, params) {
      const {
        options
      } = renderOpts;
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({
        options
      }, getCellEditProps(renderOpts, params, null)), getComponentOns(renderOpts, params)))];
    }
  },
  VxeSelect: {
    tableAutoFocus: 'input',
    renderTableEdit: defaultSelectEditRender,
    renderTableDefault: defaultSelectEditRender,
    renderTableCell(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
    },
    createTableFilterOptions: defaultFilterOptions,
    renderTableFilter(renderOpts, params) {
      const {
        column
      } = params;
      const {
        options,
        optionProps,
        optionGroups,
        optionGroupProps
      } = renderOpts;
      return column.filters.map((option, oIndex) => {
        const optionValue = option.data;
        return (0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({
          key: oIndex
        }, getCellEditFilterProps(renderOpts, params, optionValue, {
          options,
          optionProps,
          optionGroups,
          optionGroupProps
        })), getFilterOns(renderOpts, params, option)));
      });
    },
    renderTableFloatingFilter(renderOpts, params) {
      const {
        option
      } = params;
      const {
        options,
        optionProps,
        optionGroups,
        optionGroupProps
      } = renderOpts;
      const optionValue = option.data;
      return (0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditFilterProps(renderOpts, params, optionValue, {
        options,
        optionProps,
        optionGroups,
        optionGroupProps
      })), getFloatingFilterOns(renderOpts, params, option)));
    },
    tableCellFormatter: handleFormatSelect,
    tableCellCopyMethod: handleFormatSelect,
    tableCellPasteMethod: handleSetSelectValue,
    tableFilterDefaultMethod: handleFilterMethod,
    tableExportMethod: handleExportSelectMethod
  },
  VxeText: {
    renderTableDefault(renderOpts, params) {
      const {
        $table,
        row,
        column
      } = params;
      const {
        props
      } = renderOpts;
      const cellLabel = $table.getCellLabel(row, column);
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign(Object.assign({}, props || {}), {
        content: cellLabel
      }), getComponentOns(renderOpts, params)))];
    }
  },
  VxeLink: {
    renderTableDefault(renderOpts, params) {
      const {
        $table,
        row,
        column
      } = params;
      const {
        props
      } = renderOpts;
      const {
        href
      } = props || {};
      const cellLabel = $table.getCellLabel(row, column);
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign(Object.assign({}, props || {}), {
        content: cellLabel,
        href: _xeUtils.default.toFormatString(href, params)
      }), getComponentOns(renderOpts, params)))];
    }
  },
  /**
   * 已废弃，被 FormatSelect 替换
   * @deprecated
   */
  formatOption: {
    renderTableDefault(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
    }
  },
  FormatSelect: {
    renderTableDefault(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
    },
    tableCellFormatter: handleFormatSelect,
    tableCellCopyMethod: handleFormatSelect,
    tableCellPasteMethod: handleSetSelectValue,
    tableFilterDefaultMethod: handleFilterMethod,
    tableExportMethod: handleExportSelectMethod
  },
  VxeTreeSelect: {
    tableAutoFocus: 'input',
    renderTableEdit: defaultTableOrTreeSelectEditRender,
    renderTableCell(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getTreeSelectCellValue(renderOpts, params));
    },
    tableCellFormatter: handleFormatTreeSelect,
    tableCellCopyMethod: handleFormatTreeSelect,
    tableCellPasteMethod: handleSetTreeSelectValue,
    tableExportMethod: handleExportTreeSelectMethod
  },
  /**
   * 已废弃，被 FormatTreeSelect 替换
   * @deprecated
   */
  formatTree: {
    renderTableDefault(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getTreeSelectCellValue(renderOpts, params));
    }
  },
  FormatTreeSelect: {
    renderTableDefault(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getTreeSelectCellValue(renderOpts, params));
    },
    tableCellFormatter: handleFormatTreeSelect,
    tableCellCopyMethod: handleFormatTreeSelect,
    tableCellPasteMethod: handleSetTreeSelectValue,
    tableExportMethod: handleExportTreeSelectMethod
  },
  VxeTableSelect: {
    tableAutoFocus: 'input',
    renderTableEdit: defaultTableOrTreeSelectEditRender,
    renderTableCell(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getTreeSelectCellValue(renderOpts, params));
    },
    tableCellFormatter: handleFormatTreeSelect,
    tableCellCopyMethod: handleFormatTreeSelect,
    tableCellPasteMethod: handleSetTreeSelectValue,
    tableExportMethod: handleExportTreeSelectMethod
  },
  VxeColorPicker: {
    tableAutoFocus: 'input',
    renderTableEdit(renderOpts, params) {
      const {
        row,
        column
      } = params;
      const {
        options
      } = renderOpts;
      const cellValue = (0, _util.getCellValue)(row, column);
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue, {
        colors: options
      })), getEditOns(renderOpts, params)))];
    },
    renderTableCell(renderOpts, params) {
      const {
        row,
        column
      } = params;
      const cellValue = _xeUtils.default.get(row, column.field);
      return (0, _vue.h)('span', {
        class: 'vxe-color-picker--readonly'
      }, [(0, _vue.h)('div', {
        class: 'vxe-color-picker--readonly-color',
        style: {
          backgroundColor: cellValue
        }
      })]);
    }
  },
  VxeIconPicker: {
    tableAutoFocus: 'input',
    renderTableEdit(renderOpts, params) {
      const {
        row,
        column
      } = params;
      const {
        options
      } = renderOpts;
      const cellValue = (0, _util.getCellValue)(row, column);
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getCellEditProps(renderOpts, params, cellValue, {
        icons: options
      })), getEditOns(renderOpts, params)))];
    },
    renderTableCell(renderOpts, params) {
      const {
        row,
        column
      } = params;
      const cellValue = _xeUtils.default.get(row, column.field);
      return (0, _vue.h)('i', {
        class: cellValue
      });
    }
  },
  VxeRadioGroup: {
    renderTableDefault: radioAndCheckboxGroupEditRender
  },
  VxeCheckbox: {
    renderTableDefault: checkboxEditRender
  },
  VxeCheckboxGroup: {
    renderTableDefault: radioAndCheckboxGroupEditRender
  },
  VxeSwitch: {
    tableAutoFocus: 'button',
    renderTableEdit: defaultEditRender,
    renderTableDefault: defaultEditRender
  },
  VxeUpload: {
    renderTableEdit: defaultEditRender,
    renderTableCell: defaultEditRender,
    renderTableDefault: defaultEditRender
  },
  VxeImage: {
    renderTableDefault(renderOpts, params) {
      const {
        row,
        column
      } = params;
      const {
        props
      } = renderOpts;
      const cellValue = (0, _util.getCellValue)(row, column);
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign(Object.assign({}, props), {
        src: cellValue
      }), getEditOns(renderOpts, params)))];
    }
  },
  VxeImageGroup: {
    renderTableDefault(renderOpts, params) {
      const {
        row,
        column
      } = params;
      const {
        props
      } = renderOpts;
      const cellValue = (0, _util.getCellValue)(row, column);
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign(Object.assign({}, props), {
        urlList: cellValue
      }), getEditOns(renderOpts, params)))];
    }
  },
  VxeTextEllipsis: {
    renderTableDefault(renderOpts, params) {
      const {
        row,
        column
      } = params;
      const {
        props
      } = renderOpts;
      const cellValue = (0, _util.getCellValue)(row, column);
      return [(0, _vue.h)(getDefaultComponent(renderOpts), Object.assign(Object.assign(Object.assign({}, props), {
        content: cellValue
      }), getEditOns(renderOpts, params)))];
    }
  },
  VxeRate: {
    renderTableDefault: defaultEditRender
  },
  VxeSlider: {
    renderTableDefault: defaultEditRender
  },
  // 以下已废弃
  $input: {
    tableAutoFocus: '.vxe-input--inner',
    renderTableEdit: oldEditRender,
    renderTableCell(renderOpts, params) {
      var _a;
      const {
        props = {}
      } = renderOpts;
      const {
        row,
        column
      } = params;
      const digits = props.digits || ((_a = getConfig().input) === null || _a === void 0 ? void 0 : _a.digits) || 2;
      let cellValue = _xeUtils.default.get(row, column.field);
      if (cellValue) {
        switch (props.type) {
          case 'date':
          case 'week':
          case 'month':
          case 'year':
            cellValue = getLabelFormatDate(cellValue, props);
            break;
          case 'float':
            cellValue = _xeUtils.default.toFixed(_xeUtils.default.floor(cellValue, digits), digits);
            break;
        }
      }
      return getCellLabelVNs(renderOpts, params, cellValue);
    },
    renderTableDefault: oldEditRender,
    renderTableFilter: oldFilterRender,
    tableFilterDefaultMethod: handleInputFilterMethod
  },
  $textarea: {
    tableAutoFocus: '.vxe-textarea--inner'
  },
  $button: {
    renderTableDefault: oldButtonEditRender
  },
  $buttons: {
    renderTableDefault: oldButtonsEditRender
  },
  $select: {
    tableAutoFocus: '.vxe-input--inner',
    renderTableEdit: oldSelectEditRender,
    renderTableDefault: oldSelectEditRender,
    renderTableCell(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
    },
    renderTableFilter(renderOpts, params) {
      const {
        column
      } = params;
      const {
        options,
        optionProps,
        optionGroups,
        optionGroupProps
      } = renderOpts;
      return column.filters.map((option, oIndex) => {
        const optionValue = option.data;
        return (0, _vue.h)(getOldComponent(renderOpts), Object.assign(Object.assign({
          key: oIndex
        }, getCellEditFilterProps(renderOpts, params, optionValue, {
          options,
          optionProps,
          optionGroups,
          optionGroupProps
        })), getFilterOns(renderOpts, params, option)));
      });
    },
    tableFilterDefaultMethod: handleFilterMethod,
    tableExportMethod: handleExportSelectMethod
  },
  $radio: {
    tableAutoFocus: '.vxe-radio--input'
  },
  $checkbox: {
    tableAutoFocus: '.vxe-checkbox--input'
  },
  $switch: {
    tableAutoFocus: '.vxe-switch--button',
    renderTableEdit: oldEditRender,
    renderTableDefault: oldEditRender
  }
  // 以上已废弃
});