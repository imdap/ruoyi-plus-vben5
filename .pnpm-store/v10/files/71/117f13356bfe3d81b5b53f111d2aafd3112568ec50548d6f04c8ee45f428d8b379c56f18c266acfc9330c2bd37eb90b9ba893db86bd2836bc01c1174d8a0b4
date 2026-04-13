"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineTableRender = defineTableRender;
var _vue = require("vue");
var _comp = require("../util/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * 表格 - 渲染器
 */
function defineTableRender(VxeUI) {
  function isEmptyValue(cellValue) {
    return cellValue === null || cellValue === undefined || cellValue === '';
  }
  function getOnName(type) {
    return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1);
  }
  function getModelProp(renderOpts) {
    var prop = 'value';
    switch (renderOpts.name) {
      case 'ASwitch':
        prop = 'checked';
        break;
    }
    return prop;
  }
  function getModelEvent(renderOpts) {
    var type = 'update:value';
    switch (renderOpts.name) {
      case 'ASwitch':
        type = 'update:checked';
        break;
    }
    return type;
  }
  function dateFormatToVxeFormat(format) {
    if (format) {
      return "".concat(format).replace('YYYY', 'yyyy').replace('DD', 'dd');
    }
    return format;
  }
  function getChangeEvent(renderOpts) {
    return 'change';
  }
  function getCellEditFilterProps(renderOpts, params, value, defaultProps) {
    return _xeUtils["default"].assign({}, defaultProps, renderOpts.props, _defineProperty({}, getModelProp(renderOpts), value));
  }
  function formatText(cellValue) {
    return '' + (isEmptyValue(cellValue) ? '' : cellValue);
  }
  function getCellLabelVNs(renderOpts, params, cellLabel) {
    var placeholder = renderOpts.placeholder;
    return [(0, _vue.h)('span', {
      "class": 'vxe-cell--label'
    }, placeholder && isEmptyValue(cellLabel) ? [(0, _vue.h)('span', {
      "class": 'vxe-cell--placeholder'
    }, formatText(placeholder))] : formatText(cellLabel))];
  }
  function getOns(renderOpts, params, inputFunc, changeFunc) {
    var events = renderOpts.events;
    var modelEvent = getModelEvent(renderOpts);
    var changeEvent = getChangeEvent(renderOpts);
    var isSameEvent = changeEvent === modelEvent;
    var ons = {};
    _xeUtils["default"].objectEach(events, function (func, key) {
      ons[getOnName(key)] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        func.apply(void 0, [params].concat(args));
      };
    });
    if (inputFunc) {
      ons[getOnName(modelEvent)] = function (targetEvnt) {
        inputFunc(targetEvnt);
        if (events && events[modelEvent]) {
          events[modelEvent](params, targetEvnt);
        }
        if (isSameEvent && changeFunc) {
          changeFunc(targetEvnt);
        }
      };
    }
    if (!isSameEvent && changeFunc) {
      ons[getOnName(changeEvent)] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        changeFunc.apply(void 0, args);
        if (events && events[changeEvent]) {
          events[changeEvent].apply(events, [params].concat(args));
        }
      };
    }
    return ons;
  }
  function getEditOns(renderOpts, params) {
    var $table = params.$table,
      row = params.row,
      column = params.column;
    return getOns(renderOpts, params, function (value) {
      // 处理 model 值双向绑定
      _xeUtils["default"].set(row, column.field, value);
    }, function () {
      // 处理 change 事件相关逻辑
      $table.updateStatus(params);
    });
  }
  function getFilterOns(renderOpts, params, option, changeFunc) {
    return getOns(renderOpts, params, function (value) {
      // 处理 model 值双向绑定
      option.data = value;
    }, changeFunc);
  }
  function matchCascaderData(index, list, values, labels) {
    var val = values[index];
    if (list && values.length > index) {
      _xeUtils["default"].each(list, function (item) {
        if (item.value === val) {
          labels.push(item.label);
          matchCascaderData(++index, item.children, values, labels);
        }
      });
    }
  }
  function formatDatePicker(defaultFormat) {
    return function (renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getDatePickerCellValue(renderOpts, params, defaultFormat));
    };
  }
  function formatTimePicker(defaultFormat) {
    return function (renderOpts, params) {
      var _renderOpts$props = renderOpts.props,
        props = _renderOpts$props === void 0 ? {} : _renderOpts$props;
      var row = params.row,
        column = params.column;
      var cellValue = _xeUtils["default"].get(row, column.field);
      try {
        if (cellValue) {
          if (!_xeUtils["default"].isString(cellValue)) {
            cellValue = cellValue.format ? cellValue.format(props.format || props.valueFormat || defaultFormat) : _xeUtils["default"].toDateString(cellValue, dateFormatToVxeFormat(props.format || props.valueFormat || defaultFormat));
          }
        }
      } catch (e) {}
      return getCellLabelVNs(renderOpts, params, cellValue);
    };
  }
  function getSelectCellValue(renderOpts, params) {
    var _renderOpts$options = renderOpts.options,
      options = _renderOpts$options === void 0 ? [] : _renderOpts$options,
      optionGroups = renderOpts.optionGroups,
      _renderOpts$props2 = renderOpts.props,
      props = _renderOpts$props2 === void 0 ? {} : _renderOpts$props2,
      _renderOpts$optionPro = renderOpts.optionProps,
      optionProps = _renderOpts$optionPro === void 0 ? {} : _renderOpts$optionPro,
      _renderOpts$optionGro = renderOpts.optionGroupProps,
      optionGroupProps = _renderOpts$optionGro === void 0 ? {} : _renderOpts$optionGro;
    var row = params.row,
      column = params.column;
    var labelProp = optionProps.label || 'label';
    var valueProp = optionProps.value || 'value';
    var groupOptions = optionGroupProps.options || 'options';
    var cellValue = _xeUtils["default"].get(row, column.field);
    if (!isEmptyValue(cellValue)) {
      return _xeUtils["default"].map(props.mode === 'multiple' ? cellValue : [cellValue], optionGroups ? function (value) {
        var selectItem;
        for (var index = 0; index < optionGroups.length; index++) {
          selectItem = _xeUtils["default"].find(optionGroups[index][groupOptions], function (item) {
            return item[valueProp] === value;
          });
          if (selectItem) {
            break;
          }
        }
        return selectItem ? selectItem[labelProp] : value;
      } : function (value) {
        var selectItem = _xeUtils["default"].find(options, function (item) {
          return item[valueProp] === value;
        });
        return selectItem ? selectItem[labelProp] : value;
      }).join(', ');
    }
    return '';
  }
  function getCascaderCellValue(renderOpts, params) {
    var _renderOpts$props3 = renderOpts.props,
      props = _renderOpts$props3 === void 0 ? {} : _renderOpts$props3;
    var row = params.row,
      column = params.column;
    var cellValue = _xeUtils["default"].get(row, column.field);
    var values = cellValue || [];
    var labels = [];
    matchCascaderData(0, props.options, values, labels);
    return (props.showAllLevels === false ? labels.slice(labels.length - 1, labels.length) : labels).join(" ".concat(props.separator || '/', " "));
  }
  function getRangePickerCellValue(renderOpts, params) {
    var _renderOpts$props4 = renderOpts.props,
      props = _renderOpts$props4 === void 0 ? {} : _renderOpts$props4;
    var row = params.row,
      column = params.column;
    var cellValue = _xeUtils["default"].get(row, column.field);
    if (cellValue) {
      cellValue = _xeUtils["default"].map(cellValue, function (date) {
        return date && date.format ? date.format(props.format || 'YYYY-MM-DD') : _xeUtils["default"].toDateString(date, dateFormatToVxeFormat(props.format || 'YYYY-MM-DD'));
      }).join(' ~ ');
    }
    return cellValue;
  }
  function getTreeSelectCellValue(renderOpts, params) {
    var _renderOpts$props5 = renderOpts.props,
      props = _renderOpts$props5 === void 0 ? {} : _renderOpts$props5;
    var treeData = props.treeData,
      treeCheckable = props.treeCheckable;
    var row = params.row,
      column = params.column;
    var cellValue = _xeUtils["default"].get(row, column.field);
    if (!isEmptyValue(cellValue)) {
      return _xeUtils["default"].map(treeCheckable ? cellValue : [cellValue], function (value) {
        var matchObj = _xeUtils["default"].findTree(treeData, function (item) {
          return item.value === value;
        }, {
          children: 'children'
        });
        return matchObj ? matchObj.item.title : value;
      }).join(', ');
    }
    return cellValue;
  }
  function getDatePickerCellValue(renderOpts, params, defaultFormat) {
    var _renderOpts$props6 = renderOpts.props,
      props = _renderOpts$props6 === void 0 ? {} : _renderOpts$props6;
    var row = params.row,
      column = params.column;
    var cellValue = _xeUtils["default"].get(row, column.field);
    try {
      if (cellValue) {
        if (!defaultFormat) {
          if (renderOpts.name === 'ADatePicker') {
            switch (props.picker) {
              case 'week':
                defaultFormat = 'YYYY-WW周';
                break;
              case 'month':
                defaultFormat = 'YYYY-MM';
                break;
              case 'year':
                defaultFormat = 'YYYY';
                break;
              default:
                defaultFormat = props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
                break;
            }
          }
        }
        cellValue = cellValue.format ? cellValue.format(props.format || defaultFormat) : _xeUtils["default"].toDateString(cellValue, dateFormatToVxeFormat(props.format || defaultFormat));
      }
    } catch (e) {}
    return cellValue;
  }
  function createEditRender(defaultProps) {
    return function (renderOpts, params) {
      var row = params.row,
        column = params.column;
      var name = renderOpts.name,
        attrs = renderOpts.attrs;
      var cellValue = _xeUtils["default"].get(row, column.field);
      return [(0, _vue.h)((0, _comp.getCurrComponent)(name), _objectSpread(_objectSpread(_objectSpread({}, attrs), getCellEditFilterProps(renderOpts, params, cellValue, defaultProps)), getEditOns(renderOpts, params)))];
    };
  }
  function defaultButtonEditRender(renderOpts, params) {
    var attrs = renderOpts.attrs;
    return [(0, _vue.h)((0, _comp.getCurrComponent)('a-button'), _objectSpread(_objectSpread(_objectSpread({}, attrs), getCellEditFilterProps(renderOpts, params, null)), getOns(renderOpts, params)), cellText(renderOpts.content))];
  }
  function defaultButtonsEditRender(renderOpts, params) {
    var children = renderOpts.children;
    if (children) {
      return children.map(function (childRenderOpts) {
        return defaultButtonEditRender(childRenderOpts, params)[0];
      });
    }
    return [];
  }
  function createFilterRender(defaultProps) {
    return function (renderOpts, params) {
      var column = params.column;
      var name = renderOpts.name,
        attrs = renderOpts.attrs;
      return [(0, _vue.h)('div', {
        "class": 'vxe-table--filter-antd-wrapper'
      }, column.filters.map(function (option, oIndex) {
        var optionValue = option.data;
        return (0, _vue.h)((0, _comp.getCurrComponent)(name), _objectSpread(_objectSpread(_objectSpread({
          key: oIndex
        }, attrs), getCellEditFilterProps(renderOpts, params, optionValue, defaultProps)), getFilterOns(renderOpts, params, option, function () {
          // 处理 change 事件相关逻辑
          handleConfirmFilter(params, !!option.data, option);
        })));
      }))];
    };
  }
  function handleConfirmFilter(params, checked, option) {
    var $panel = params.$panel;
    $panel.changeOption(null, checked, option);
  }
  /**
  * 模糊匹配
  * @param params
  */
  function defaultFuzzyFilterMethod(params) {
    var option = params.option,
      row = params.row,
      column = params.column;
    var data = option.data;
    var cellValue = _xeUtils["default"].get(row, column.field);
    return _xeUtils["default"].toValueString(cellValue).indexOf(data) > -1;
  }
  /**
  * 精确匹配
  * @param params
  */
  function defaultExactFilterMethod(params) {
    var option = params.option,
      row = params.row,
      column = params.column;
    var data = option.data;
    var cellValue = _xeUtils["default"].get(row, column.field);
    /* eslint-disable eqeqeq */
    return cellValue === data;
  }
  function cellText(cellValue) {
    return [formatText(cellValue)];
  }
  function createDatePickerExportMethod(defaultFormat) {
    return function (params) {
      var row = params.row,
        column = params.column,
        options = params.options;
      return options && options.original ? _xeUtils["default"].get(row, column.field) : getDatePickerCellValue(column.editRender || column.cellRender, params, defaultFormat);
    };
  }
  function createExportMethod(getExportCellValue) {
    return function (params) {
      var row = params.row,
        column = params.column,
        options = params.options;
      return options && options.original ? _xeUtils["default"].get(row, column.field) : getExportCellValue(column.editRender || column.cellRender, params);
    };
  }
  VxeUI.renderer.mixin({
    AAutoComplete: {
      tableAutoFocus: 'input',
      renderTableDefault: createEditRender(),
      renderTableEdit: createEditRender(),
      renderTableFilter: createFilterRender(),
      tableFilterDefaultMethod: defaultExactFilterMethod
    },
    AInput: {
      tableAutoFocus: 'input',
      renderTableDefault: createEditRender(),
      renderTableEdit: createEditRender(),
      renderTableFilter: createFilterRender(),
      tableFilterDefaultMethod: defaultFuzzyFilterMethod
    },
    AInputNumber: {
      tableAutoFocus: 'input',
      renderTableDefault: createEditRender(),
      renderTableEdit: createEditRender(),
      renderTableFilter: createFilterRender(),
      tableFilterDefaultMethod: defaultFuzzyFilterMethod
    },
    ASelect: {
      renderTableEdit: function renderTableEdit(renderOpts, params) {
        var options = renderOpts.options,
          optionGroups = renderOpts.optionGroups;
        var row = params.row,
          column = params.column;
        var attrs = renderOpts.attrs;
        var cellValue = _xeUtils["default"].get(row, column.field);
        var props = getCellEditFilterProps(renderOpts, params, cellValue);
        var ons = getEditOns(renderOpts, params);
        if (optionGroups) {
          return [(0, _vue.h)((0, _comp.getCurrComponent)('a-select'), _objectSpread(_objectSpread(_objectSpread({}, props), attrs), {}, {
            options: optionGroups
          }, ons))];
        }
        return [(0, _vue.h)((0, _comp.getCurrComponent)('a-select'), _objectSpread(_objectSpread(_objectSpread({}, props), attrs), {}, {
          options: props.options || options
        }, ons))];
      },
      renderTableCell: function renderTableCell(renderOpts, params) {
        return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
      },
      renderTableFilter: function renderTableFilter(renderOpts, params) {
        var _renderOpts$options2 = renderOpts.options,
          options = _renderOpts$options2 === void 0 ? [] : _renderOpts$options2,
          optionGroups = renderOpts.optionGroups,
          _renderOpts$optionGro2 = renderOpts.optionGroupProps,
          optionGroupProps = _renderOpts$optionGro2 === void 0 ? {} : _renderOpts$optionGro2;
        var groupOptions = optionGroupProps.options || 'options';
        var column = params.column;
        var attrs = renderOpts.attrs;
        return [(0, _vue.h)('div', {
          "class": 'vxe-table--filter-antd-wrapper'
        }, optionGroups ? column.filters.map(function (option, oIndex) {
          var optionValue = option.data;
          var props = getCellEditFilterProps(renderOpts, params, optionValue);
          return (0, _vue.h)((0, _comp.getCurrComponent)('a-select'), _objectSpread(_objectSpread(_objectSpread({
            key: oIndex
          }, attrs), props), {}, {
            options: groupOptions
          }, getFilterOns(renderOpts, params, option, function () {
            // 处理 change 事件相关逻辑
            handleConfirmFilter(params, props.mode === 'multiple' ? option.data && option.data.length > 0 : !_xeUtils["default"].eqNull(option.data), option);
          })));
        }) : column.filters.map(function (option, oIndex) {
          var optionValue = option.data;
          var props = getCellEditFilterProps(renderOpts, params, optionValue);
          return (0, _vue.h)((0, _comp.getCurrComponent)('a-select'), _objectSpread(_objectSpread(_objectSpread({
            key: oIndex
          }, attrs), props), {}, {
            options: props.options || options
          }, getFilterOns(renderOpts, params, option, function () {
            // 处理 change 事件相关逻辑
            handleConfirmFilter(params, props.mode === 'multiple' ? option.data && option.data.length > 0 : !_xeUtils["default"].eqNull(option.data), option);
          })));
        }))];
      },
      tableFilterDefaultMethod: function tableFilterDefaultMethod(params) {
        var option = params.option,
          row = params.row,
          column = params.column;
        var data = option.data;
        var field = column.field,
          renderOpts = column.filterRender;
        var _renderOpts$props7 = renderOpts.props,
          props = _renderOpts$props7 === void 0 ? {} : _renderOpts$props7;
        var cellValue = _xeUtils["default"].get(row, field);
        if (props.mode === 'multiple') {
          if (_xeUtils["default"].isArray(cellValue)) {
            return _xeUtils["default"].includeArrays(cellValue, data);
          }
          return data.indexOf(cellValue) > -1;
        }
        /* eslint-disable eqeqeq */
        return cellValue == data;
      },
      tableExportMethod: createExportMethod(getSelectCellValue)
    },
    ACascader: {
      renderTableEdit: createEditRender(),
      renderTableCell: function renderTableCell(renderOpts, params) {
        return getCellLabelVNs(renderOpts, params, getCascaderCellValue(renderOpts, params));
      },
      tableExportMethod: createExportMethod(getCascaderCellValue)
    },
    ADatePicker: {
      renderTableEdit: createEditRender(),
      renderTableCell: formatDatePicker(),
      tableExportMethod: createDatePickerExportMethod()
    },
    AMonthPicker: {
      renderTableEdit: createEditRender(),
      renderTableCell: formatDatePicker('YYYY-MM'),
      tableExportMethod: createDatePickerExportMethod('YYYY-MM')
    },
    ARangePicker: {
      renderTableEdit: createEditRender(),
      renderTableCell: function renderTableCell(renderOpts, params) {
        return getCellLabelVNs(renderOpts, params, getRangePickerCellValue(renderOpts, params));
      },
      tableExportMethod: createExportMethod(getRangePickerCellValue)
    },
    AWeekPicker: {
      renderTableEdit: createEditRender(),
      renderTableCell: formatDatePicker('YYYY-WW周'),
      tableExportMethod: createDatePickerExportMethod('YYYY-WW周')
    },
    ATimePicker: {
      renderTableEdit: createEditRender(),
      renderTableCell: formatTimePicker('HH:mm:ss'),
      tableExportMethod: createDatePickerExportMethod('HH:mm:ss')
    },
    ATreeSelect: {
      renderTableEdit: createEditRender(),
      renderTableCell: function renderTableCell(renderOpts, params) {
        return getCellLabelVNs(renderOpts, params, getTreeSelectCellValue(renderOpts, params));
      },
      tableExportMethod: createExportMethod(getTreeSelectCellValue)
    },
    ARate: {
      renderTableDefault: createEditRender(),
      renderTableEdit: createEditRender(),
      renderTableFilter: createFilterRender(),
      tableFilterDefaultMethod: defaultExactFilterMethod
    },
    ASwitch: {
      renderTableDefault: createEditRender(),
      renderTableEdit: createEditRender(),
      renderTableFilter: function renderTableFilter(renderOpts, params) {
        var column = params.column;
        var name = renderOpts.name,
          attrs = renderOpts.attrs;
        return [(0, _vue.h)('div', {
          "class": 'vxe-table--filter-antd-wrapper'
        }, column.filters.map(function (option, oIndex) {
          var optionValue = option.data;
          return (0, _vue.h)(name, _objectSpread(_objectSpread(_objectSpread({
            key: oIndex
          }, attrs), getCellEditFilterProps(renderOpts, params, optionValue)), getFilterOns(renderOpts, params, option, function () {
            // 处理 change 事件相关逻辑
            handleConfirmFilter(params, _xeUtils["default"].isBoolean(option.data), option);
          })));
        }))];
      },
      tableFilterDefaultMethod: defaultExactFilterMethod
    },
    AButton: {
      renderTableEdit: defaultButtonEditRender,
      renderTableDefault: defaultButtonEditRender
    },
    AButtons: {
      renderTableEdit: defaultButtonsEditRender,
      renderTableDefault: defaultButtonsEditRender
    }
  });
}