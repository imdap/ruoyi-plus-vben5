(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('xe-utils')) :
	typeof define === 'function' && define.amd ? define(['vue', 'xe-utils'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VxeUIPluginRenderAntd = factory(global.Vue, global.XEUtils));
})(this, (function (require$$0, require$$3) { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var lib = {};

	var table = {};

	var comp = {};

	var store = {};

	var hasRequiredStore;

	function requireStore () {
		if (hasRequiredStore) return store;
		hasRequiredStore = 1;

		Object.defineProperty(store, "__esModule", {
		  value: true
		});
		store.globalConfig = store.componentMaps = void 0;
		store.globalConfig = {};
		store.componentMaps = {};
		return store;
	}

	var hasRequiredComp;

	function requireComp () {
		if (hasRequiredComp) return comp;
		hasRequiredComp = 1;

		Object.defineProperty(comp, "__esModule", {
		  value: true
		});
		comp.getCurrComponent = getCurrComponent;
		var _vue = require$$0;
		var _store = requireStore();
		function getCurrComponent(name) {
		  var comp = _store.componentMaps[name] || (_store.globalConfig.Antd ? _store.globalConfig.Antd[name] : null);
		  if (comp) {
		    return comp;
		  }
		  return (0, _vue.resolveComponent)(name);
		}
		return comp;
	}

	var hasRequiredTable;

	function requireTable () {
		if (hasRequiredTable) return table;
		hasRequiredTable = 1;

		Object.defineProperty(table, "__esModule", {
		  value: true
		});
		table.defineTableRender = defineTableRender;
		var _vue = require$$0;
		var _comp = requireComp();
		var _xeUtils = _interopRequireDefault(require$$3);
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
		function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
		function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
		function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
		function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
		function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
		function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
		    var changeEvent = getChangeEvent();
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
		return table;
	}

	var form = {};

	var hasRequiredForm;

	function requireForm () {
		if (hasRequiredForm) return form;
		hasRequiredForm = 1;

		Object.defineProperty(form, "__esModule", {
		  value: true
		});
		form.defineFormRender = defineFormRender;
		var _vue = require$$0;
		var _comp = requireComp();
		var _xeUtils = _interopRequireDefault(require$$3);
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
		function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
		function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
		function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
		function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
		function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
		function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
		/**
		 * 表单 - 渲染器
		 */
		function defineFormRender(VxeUI) {
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
		  function getChangeEvent(renderOpts) {
		    return 'change';
		  }
		  function getItemProps(renderOpts, params, value, defaultProps) {
		    return _xeUtils["default"].assign({}, defaultProps, renderOpts.props, _defineProperty({}, getModelProp(renderOpts), value));
		  }
		  function formatText(cellValue) {
		    return '' + (isEmptyValue(cellValue) ? '' : cellValue);
		  }
		  function getOns(renderOpts, params, inputFunc, changeFunc) {
		    var events = renderOpts.events;
		    var modelEvent = getModelEvent(renderOpts);
		    var changeEvent = getChangeEvent();
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
		  function getItemOns(renderOpts, params) {
		    var $form = params.$form,
		      data = params.data,
		      field = params.field;
		    return getOns(renderOpts, params, function (value) {
		      // 处理 model 值双向绑定
		      _xeUtils["default"].set(data, field, value);
		    }, function () {
		      // 处理 change 事件相关逻辑
		      $form.updateStatus(params);
		      if (renderOpts.changeToSubmit) {
		        $form.handleSubmitEvent(new Event('change'));
		      }
		    });
		  }
		  function cellText(cellValue) {
		    return [formatText(cellValue)];
		  }
		  function createFormItemRender(defaultProps) {
		    return function (renderOpts, params) {
		      var data = params.data,
		        field = params.field;
		      var name = renderOpts.name;
		      var attrs = renderOpts.attrs;
		      var itemValue = _xeUtils["default"].get(data, field);
		      return [(0, _vue.h)((0, _comp.getCurrComponent)(name), _objectSpread(_objectSpread(_objectSpread({}, attrs), getItemProps(renderOpts, params, itemValue, defaultProps)), getItemOns(renderOpts, params)))];
		    };
		  }
		  function defaultButtonItemRender(renderOpts, params) {
		    var attrs = renderOpts.attrs;
		    var props = getItemProps(renderOpts, params, null);
		    return [(0, _vue.h)((0, _comp.getCurrComponent)('a-button'), _objectSpread(_objectSpread(_objectSpread({}, attrs), props), getItemOns(renderOpts, params)), {
		      "default": function _default() {
		        return cellText(renderOpts.content || props.content);
		      }
		    })];
		  }
		  function defaultButtonsItemRender(renderOpts, params) {
		    var children = renderOpts.children;
		    if (children) {
		      return children.map(function (childRenderOpts) {
		        return defaultButtonItemRender(childRenderOpts, params)[0];
		      });
		    }
		    return [];
		  }
		  /**
		   *
		   * 已废弃
		   * @deprecated
		   */
		  function createOldFormItemRadioAndCheckboxRender() {
		    return function (renderOpts, params) {
		      var name = renderOpts.name,
		        _renderOpts$options = renderOpts.options,
		        options = _renderOpts$options === void 0 ? [] : _renderOpts$options,
		        _renderOpts$optionPro = renderOpts.optionProps,
		        optionProps = _renderOpts$optionPro === void 0 ? {} : _renderOpts$optionPro;
		      var data = params.data,
		        field = params.field;
		      var attrs = renderOpts.attrs;
		      var labelProp = optionProps.label || 'label';
		      var valueProp = optionProps.value || 'value';
		      var itemValue = _xeUtils["default"].get(data, field);
		      return [(0, _vue.h)((0, _comp.getCurrComponent)("".concat(name, "Group")), _objectSpread(_objectSpread(_objectSpread({}, attrs), getItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)), {
		        "default": function _default() {
		          return options.map(function (option, oIndex) {
		            return (0, _vue.h)((0, _comp.getCurrComponent)(name), {
		              key: oIndex,
		              value: option[valueProp],
		              disabled: option.disabled
		            }, {
		              "default": function _default() {
		                return cellText(option[labelProp]);
		              }
		            });
		          });
		        }
		      })];
		    };
		  }
		  VxeUI.renderer.mixin({
		    AAutoComplete: {
		      renderFormItemContent: createFormItemRender()
		    },
		    AInput: {
		      renderFormItemContent: createFormItemRender()
		    },
		    AInputNumber: {
		      renderFormItemContent: createFormItemRender()
		    },
		    ASelect: {
		      renderFormItemContent: function renderFormItemContent(renderOpts, params) {
		        var _renderOpts$options2 = renderOpts.options,
		          options = _renderOpts$options2 === void 0 ? [] : _renderOpts$options2,
		          optionGroups = renderOpts.optionGroups;
		        var data = params.data,
		          field = params.field;
		        var attrs = renderOpts.attrs;
		        var itemValue = _xeUtils["default"].get(data, field);
		        var props = getItemProps(renderOpts, params, itemValue);
		        var ons = getItemOns(renderOpts, params);
		        if (optionGroups) {
		          return [(0, _vue.h)((0, _comp.getCurrComponent)('a-select'), _objectSpread(_objectSpread(_objectSpread({}, attrs), props), {}, {
		            options: optionGroups
		          }, ons))];
		        }
		        return [(0, _vue.h)((0, _comp.getCurrComponent)('a-select'), _objectSpread(_objectSpread(_objectSpread({}, attrs), props), {}, {
		          options: props.options || options
		        }, ons))];
		      }
		    },
		    ACascader: {
		      renderFormItemContent: createFormItemRender()
		    },
		    ADatePicker: {
		      renderFormItemContent: createFormItemRender()
		    },
		    AMonthPicker: {
		      renderFormItemContent: createFormItemRender()
		    },
		    ARangePicker: {
		      renderFormItemContent: createFormItemRender()
		    },
		    AWeekPicker: {
		      renderFormItemContent: createFormItemRender()
		    },
		    ATimePicker: {
		      renderFormItemContent: createFormItemRender()
		    },
		    ATreeSelect: {
		      renderFormItemContent: createFormItemRender()
		    },
		    ARate: {
		      renderFormItemContent: createFormItemRender()
		    },
		    ASwitch: {
		      renderFormItemContent: createFormItemRender()
		    },
		    ARadioGroup: {
		      renderFormItemContent: function renderFormItemContent(renderOpts, params) {
		        var _renderOpts$options3 = renderOpts.options,
		          options = _renderOpts$options3 === void 0 ? [] : _renderOpts$options3,
		          _renderOpts$optionPro2 = renderOpts.optionProps,
		          optionProps = _renderOpts$optionPro2 === void 0 ? {} : _renderOpts$optionPro2;
		        var data = params.data,
		          field = params.field;
		        var attrs = renderOpts.attrs;
		        var labelProp = optionProps.label || 'label';
		        var valueProp = optionProps.value || 'value';
		        var itemValue = _xeUtils["default"].get(data, field);
		        return [(0, _vue.h)((0, _comp.getCurrComponent)('a-radio-group'), _objectSpread(_objectSpread(_objectSpread({}, attrs), getItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)), {
		          "default": function _default() {
		            return options.map(function (option, oIndex) {
		              return (0, _vue.h)((0, _comp.getCurrComponent)('a-radio'), {
		                key: oIndex,
		                value: option[valueProp],
		                disabled: option.disabled
		              }, {
		                "default": function _default() {
		                  return cellText(option[labelProp]);
		                }
		              });
		            });
		          }
		        })];
		      }
		    },
		    ACheckboxGroup: {
		      renderFormItemContent: function renderFormItemContent(renderOpts, params) {
		        var _renderOpts$options4 = renderOpts.options,
		          options = _renderOpts$options4 === void 0 ? [] : _renderOpts$options4,
		          _renderOpts$optionPro3 = renderOpts.optionProps,
		          optionProps = _renderOpts$optionPro3 === void 0 ? {} : _renderOpts$optionPro3;
		        var data = params.data,
		          field = params.field;
		        var attrs = renderOpts.attrs;
		        var labelProp = optionProps.label || 'label';
		        var valueProp = optionProps.value || 'value';
		        var itemValue = _xeUtils["default"].get(data, field);
		        return [(0, _vue.h)((0, _comp.getCurrComponent)('a-checkbox-group'), _objectSpread(_objectSpread(_objectSpread({}, attrs), getItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)), {
		          "default": function _default() {
		            return options.map(function (option, oIndex) {
		              return (0, _vue.h)((0, _comp.getCurrComponent)('a-checkbox'), {
		                key: oIndex,
		                value: option[valueProp],
		                disabled: option.disabled
		              }, {
		                "default": function _default() {
		                  return cellText(option[labelProp]);
		                }
		              });
		            });
		          }
		        })];
		      }
		    },
		    AButton: {
		      renderFormItemContent: defaultButtonItemRender
		    },
		    // 已废弃
		    ARadio: {
		      renderFormItemContent: createOldFormItemRadioAndCheckboxRender()
		    },
		    ACheckbox: {
		      renderFormItemContent: createOldFormItemRadioAndCheckboxRender()
		    },
		    AButtons: {
		      renderFormItemContent: defaultButtonsItemRender
		    }
		  });
		}
		return form;
	}

	var formDesign = {};

	var inputWidget = {};

	var hasRequiredInputWidget;

	function requireInputWidget () {
		if (hasRequiredInputWidget) return inputWidget;
		hasRequiredInputWidget = 1;

		Object.defineProperty(inputWidget, "__esModule", {
		  value: true
		});
		inputWidget.createWidgetAInput = createWidgetAInput;
		var _vue = require$$0;
		var _comp = requireComp();
		function createWidgetAInput(VxeUI) {
		  var getWidgetAInputConfig = function getWidgetAInputConfig(params) {
		    return {
		      title: '输入框',
		      icon: 'vxe-icon-input',
		      options: {
		        placeholder: ''
		      }
		    };
		  };
		  var WidgetAInputFormComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormComponent = VxeUI.getComponent('VxeForm');
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch');
		      var VxeUIInputComponent = VxeUI.getComponent('VxeInput');
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget;
		        var options = widget.options;
		        return (0, _vue.h)(VxeUIFormComponent, {
		          "class": 'vxe-form-design--widget-render-form-wrapper',
		          vertical: true,
		          span: 24,
		          titleBold: true,
		          titleOverflow: true,
		          data: options
		        }, {
		          "default": function _default() {
		            return [(0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUIInputComponent, {
		                  modelValue: widget.title,
		                  placeholder: options.placeholder,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.title = val;
		                  }
		                });
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.placeholder'),
		              field: 'placeholder',
		              itemRender: {
		                name: 'VxeInput'
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.required')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUISwitchComponent, {
		                  modelValue: widget.required,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.required = val;
		                  }
		                });
		              }
		            })];
		          }
		        });
		      };
		    }
		  });
		  var WidgetAInputViewComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var changeEvent = function changeEvent() {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        if ($formView) {
		          var itemValue = $formView ? $formView.getItemValue(widget) : null;
		          $formView.updateWidgetStatus(widget, itemValue);
		        }
		      };
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        return (0, _vue.h)(VxeUIFormItemComponent, {
		          "class": ['vxe-form-design--widget-render-form-item'],
		          field: widget.field,
		          title: widget.title
		        }, {
		          "default": function _default() {
		            return (0, _vue.h)((0, _comp.getCurrComponent)('a-input'), {
		              value: $formView ? $formView.getItemValue(widget) : null,
		              onChange: changeEvent,
		              'onUpdate:value': function onUpdateValue(val) {
		                if ($formView) {
		                  $formView.setItemValue(widget, val);
		                }
		              }
		            });
		          }
		        });
		      };
		    }
		  });
		  return {
		    getWidgetAInputConfig: getWidgetAInputConfig,
		    WidgetAInputFormComponent: WidgetAInputFormComponent,
		    WidgetAInputViewComponent: WidgetAInputViewComponent
		  };
		}
		return inputWidget;
	}

	var textareaWidget = {};

	var hasRequiredTextareaWidget;

	function requireTextareaWidget () {
		if (hasRequiredTextareaWidget) return textareaWidget;
		hasRequiredTextareaWidget = 1;

		Object.defineProperty(textareaWidget, "__esModule", {
		  value: true
		});
		textareaWidget.createWidgetATextarea = createWidgetATextarea;
		var _vue = require$$0;
		var _comp = requireComp();
		function createWidgetATextarea(VxeUI) {
		  var getWidgetATextareaConfig = function getWidgetATextareaConfig(params) {
		    return {
		      title: '文本域',
		      icon: 'vxe-icon-textarea',
		      options: {
		        placeholder: '请输入'
		      }
		    };
		  };
		  var WidgetATextareaFormComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormComponent = VxeUI.getComponent('VxeForm');
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch');
		      var VxeUIInputComponent = VxeUI.getComponent('VxeInput');
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget;
		        return (0, _vue.h)(VxeUIFormComponent, {
		          "class": 'vxe-form-design--widget-render-form-wrapper',
		          vertical: true,
		          span: 24,
		          titleBold: true,
		          titleOverflow: true,
		          data: widget.options
		        }, {
		          "default": function _default() {
		            return [(0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUIInputComponent, {
		                  modelValue: widget.title,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.title = val;
		                  }
		                });
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.placeholder'),
		              field: 'placeholder',
		              itemRender: {
		                name: 'ElInput'
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.required')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUISwitchComponent, {
		                  modelValue: widget.required,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.required = val;
		                  }
		                });
		              }
		            })];
		          }
		        });
		      };
		    }
		  });
		  var WidgetATextareaViewComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var changeEvent = function changeEvent() {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        if ($formView) {
		          var itemValue = $formView ? $formView.getItemValue(widget) : null;
		          $formView.updateWidgetStatus(widget, itemValue);
		        }
		      };
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        var options = widget.options;
		        return (0, _vue.h)(VxeUIFormItemComponent, {
		          "class": ['vxe-form-design--widget-render-form-item'],
		          field: widget.field,
		          title: widget.title
		        }, {
		          "default": function _default() {
		            return (0, _vue.h)((0, _comp.getCurrComponent)('a-textarea'), {
		              value: $formView ? $formView.getItemValue(widget) : null,
		              placeholder: options.placeholder,
		              autoSize: {
		                minRows: 2,
		                maxRows: 4
		              },
		              onChange: changeEvent,
		              'onUpdate:value': function onUpdateValue(val) {
		                if ($formView) {
		                  $formView.setItemValue(widget, val);
		                }
		              }
		            });
		          }
		        });
		      };
		    }
		  });
		  return {
		    getWidgetATextareaConfig: getWidgetATextareaConfig,
		    WidgetATextareaFormComponent: WidgetATextareaFormComponent,
		    WidgetATextareaViewComponent: WidgetATextareaViewComponent
		  };
		}
		return textareaWidget;
	}

	var numberInputWidget = {};

	var hasRequiredNumberInputWidget;

	function requireNumberInputWidget () {
		if (hasRequiredNumberInputWidget) return numberInputWidget;
		hasRequiredNumberInputWidget = 1;

		Object.defineProperty(numberInputWidget, "__esModule", {
		  value: true
		});
		numberInputWidget.createWidgetAInputNumber = createWidgetAInputNumber;
		var _vue = require$$0;
		var _comp = requireComp();
		function createWidgetAInputNumber(VxeUI) {
		  var getWidgetAInputNumberConfig = function getWidgetAInputNumberConfig(params) {
		    return {
		      title: '数字',
		      icon: 'vxe-icon-number',
		      options: {
		        placeholder: '请输入'
		      }
		    };
		  };
		  var WidgetAInputNumberFormComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormComponent = VxeUI.getComponent('VxeForm');
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch');
		      var VxeUIInputComponent = VxeUI.getComponent('VxeInput');
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget;
		        return (0, _vue.h)(VxeUIFormComponent, {
		          "class": 'vxe-form-design--widget-render-form-wrapper',
		          vertical: true,
		          span: 24,
		          titleBold: true,
		          titleOverflow: true,
		          data: widget.options
		        }, {
		          "default": function _default() {
		            return [(0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUIInputComponent, {
		                  modelValue: widget.title,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.title = val;
		                  }
		                });
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.placeholder'),
		              field: 'placeholder',
		              itemRender: {
		                name: 'ElInput'
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.required')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUISwitchComponent, {
		                  modelValue: widget.required,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.required = val;
		                  }
		                });
		              }
		            })];
		          }
		        });
		      };
		    }
		  });
		  var WidgetAInputNumberViewComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var changeEvent = function changeEvent() {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        if ($formView) {
		          var itemValue = $formView ? $formView.getItemValue(widget) : null;
		          $formView.updateWidgetStatus(widget, itemValue);
		        }
		      };
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        var options = widget.options;
		        return (0, _vue.h)(VxeUIFormItemComponent, {
		          "class": ['vxe-form-design--widget-render-form-item'],
		          field: widget.field,
		          title: widget.title
		        }, {
		          "default": function _default() {
		            return (0, _vue.h)((0, _comp.getCurrComponent)('a-input-number'), {
		              value: $formView ? $formView.getItemValue(widget) : null,
		              placeholder: options.placeholder,
		              onChange: changeEvent,
		              'onUpdate:value': function onUpdateValue(val) {
		                if ($formView) {
		                  $formView.setItemValue(widget, val);
		                }
		              }
		            });
		          }
		        });
		      };
		    }
		  });
		  return {
		    getWidgetAInputNumberConfig: getWidgetAInputNumberConfig,
		    WidgetAInputNumberFormComponent: WidgetAInputNumberFormComponent,
		    WidgetAInputNumberViewComponent: WidgetAInputNumberViewComponent
		  };
		}
		return numberInputWidget;
	}

	var datePickerWidget = {};

	var hasRequiredDatePickerWidget;

	function requireDatePickerWidget () {
		if (hasRequiredDatePickerWidget) return datePickerWidget;
		hasRequiredDatePickerWidget = 1;

		Object.defineProperty(datePickerWidget, "__esModule", {
		  value: true
		});
		datePickerWidget.createWidgetADatePicker = createWidgetADatePicker;
		var _vue = require$$0;
		var _comp = requireComp();
		function createWidgetADatePicker(VxeUI) {
		  var getWidgetADatePickerConfig = function getWidgetADatePickerConfig(params) {
		    return {
		      title: '日期',
		      icon: 'vxe-icon-input',
		      options: {
		        placeholder: ''
		      }
		    };
		  };
		  var WidgetADatePickerFormComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormComponent = VxeUI.getComponent('VxeForm');
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch');
		      var VxeUIInputComponent = VxeUI.getComponent('VxeInput');
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget;
		        return (0, _vue.h)(VxeUIFormComponent, {
		          "class": 'vxe-form-design--widget-render-form-wrapper',
		          vertical: true,
		          span: 24,
		          titleBold: true,
		          titleOverflow: true,
		          data: widget.options
		        }, {
		          "default": function _default() {
		            return [(0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUIInputComponent, {
		                  modelValue: widget.title,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.title = val;
		                  }
		                });
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.placeholder'),
		              field: 'placeholder',
		              itemRender: {
		                name: 'VxeInput'
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.required')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUISwitchComponent, {
		                  modelValue: widget.required,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.required = val;
		                  }
		                });
		              }
		            })];
		          }
		        });
		      };
		    }
		  });
		  var WidgetADatePickerViewComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var changeEvent = function changeEvent() {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        if ($formView) {
		          var itemValue = $formView ? $formView.getItemValue(widget) : null;
		          $formView.updateWidgetStatus(widget, itemValue);
		        }
		      };
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        var options = widget.options;
		        return (0, _vue.h)(VxeUIFormItemComponent, {
		          "class": ['vxe-form-design--widget-render-form-item'],
		          field: widget.field,
		          title: widget.title
		        }, {
		          "default": function _default() {
		            return (0, _vue.h)((0, _comp.getCurrComponent)('a-date-picker'), {
		              value: $formView ? $formView.getItemValue(widget) : null,
		              placeholder: options.placeholder,
		              onChange: changeEvent,
		              'onUpdate:value': function onUpdateValue(val) {
		                if ($formView) {
		                  $formView.setItemValue(widget, val);
		                }
		              }
		            });
		          }
		        });
		      };
		    }
		  });
		  return {
		    getWidgetADatePickerConfig: getWidgetADatePickerConfig,
		    WidgetADatePickerFormComponent: WidgetADatePickerFormComponent,
		    WidgetADatePickerViewComponent: WidgetADatePickerViewComponent
		  };
		}
		return datePickerWidget;
	}

	var selectWidget = {};

	var use = {};

	var hasRequiredUse;

	function requireUse () {
		if (hasRequiredUse) return use;
		hasRequiredUse = 1;

		Object.defineProperty(use, "__esModule", {
		  value: true
		});
		use.useWidgetPropDataSource = useWidgetPropDataSource;
		var _vue = require$$0;
		function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
		function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
		function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
		function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
		function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
		function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
		function useWidgetPropDataSource(VxeUI, props, isSubOption) {
		  var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		  var VxeUIButtonComponent = VxeUI.getComponent('VxeButton');
		  var VxeUITextareaComponent = VxeUI.getComponent('VxeTextarea');
		  var VxeUITipComponent = VxeUI.getComponent('VxeTip');
		  var optionsContent = (0, _vue.ref)('');
		  var expandIndexList = (0, _vue.ref)([]);
		  var addOptionEvent = function addOptionEvent() {
		    var renderParams = props.renderParams;
		    var widget = renderParams.widget;
		    var options = widget.options.options || [];
		    options.push({
		      value: VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.defValue', [options.length + 1])
		    });
		    widget.options.options = _toConsumableArray(options);
		  };
		  var subRE = /^(\s|\t)+/;
		  var hasSubOption = function hasSubOption(str) {
		    return subRE.test(str);
		  };
		  var expandAllOption = function expandAllOption() {
		    var renderParams = props.renderParams;
		    var widget = renderParams.widget;
		    var options = widget.options.options || [];
		    var indexList = [];
		    options.forEach(function (group, gIndex) {
		      var options = group.options;
		      if (options && options.length) {
		        indexList.push(gIndex);
		      }
		    });
		    expandIndexList.value = indexList;
		  };
		  var toggleExpandOption = function toggleExpandOption(item, gIndex) {
		    if (expandIndexList.value.includes(gIndex)) {
		      expandIndexList.value = expandIndexList.value.filter(function (num) {
		        return num !== gIndex;
		      });
		    } else {
		      expandIndexList.value.push(gIndex);
		    }
		  };
		  var confirmBatchAddOptionEvent = function confirmBatchAddOptionEvent() {
		    var renderParams = props.renderParams;
		    var widget = renderParams.widget;
		    var optList = [];
		    var rowList = optionsContent.value.split('\n');
		    var prevGroup = null;
		    if (isSubOption) {
		      rowList.forEach(function (str, index) {
		        var nextStr = rowList[index + 1];
		        var value = str.trim();
		        if (!value) {
		          return;
		        }
		        var item = {
		          value: value
		        };
		        if (prevGroup) {
		          if (hasSubOption(str)) {
		            prevGroup.options.push(item);
		            return;
		          }
		          prevGroup = null;
		          optList.push(item);
		        } else {
		          optList.push(item);
		        }
		        if (nextStr) {
		          if (hasSubOption(nextStr)) {
		            prevGroup = Object.assign(item, {
		              options: []
		            });
		          }
		        }
		      });
		    } else {
		      rowList.forEach(function (str) {
		        optList.push({
		          value: str.trim()
		        });
		      });
		    }
		    widget.options.options = optList;
		    expandAllOption();
		  };
		  var openPopupEditEvent = function openPopupEditEvent() {
		    var _widget$options$optio;
		    var renderParams = props.renderParams;
		    var widget = renderParams.widget;
		    var contList = [];
		    (_widget$options$optio = widget.options.options) === null || _widget$options$optio === void 0 || _widget$options$optio.forEach(function (group) {
		      var _group$options;
		      contList.push(group.value);
		      (_group$options = group.options) === null || _group$options === void 0 || _group$options.forEach(function (item) {
		        contList.push("\t".concat(item.value));
		      });
		    });
		    optionsContent.value = contList.join('\n');
		    VxeUI.modal.open({
		      title: "".concat(widget.title, " - ").concat(VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.batchEditOption')),
		      width: 500,
		      height: '50vh ',
		      resize: true,
		      showFooter: true,
		      showCancelButton: true,
		      showConfirmButton: true,
		      confirmButtonText: VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.buildOption'),
		      onConfirm: confirmBatchAddOptionEvent,
		      slots: {
		        "default": function _default() {
		          return (0, _vue.h)('div', {
		            "class": 'vxe-form-design--widget-form-item-data-source-popup'
		          }, [(0, _vue.h)(VxeUITipComponent, {
		            status: 'primary',
		            title: '',
		            content: VxeUI.getI18n("vxe.formDesign.widgetProp.dataSource.".concat(isSubOption ? 'batchEditSubTip' : 'batchEditTip'))
		          }), (0, _vue.h)(VxeUITextareaComponent, {
		            resize: 'none',
		            modelValue: optionsContent.value,
		            'onUpdate:modelValue': function onUpdateModelValue(val) {
		              optionsContent.value = val;
		            }
		          })]);
		        }
		      }
		    });
		  };
		  var renderOption = function renderOption(item, hasFirstLevel, isExpand, gIndex, hasSub, isFirst, isLast) {
		    return (0, _vue.h)('div', {
		      "class": ['vxe-form-design--widget-form-item-data-source-option', {
		        'is--first': isFirst,
		        'is--last': isLast
		      }]
		    }, [(0, _vue.h)('div', {
		      "class": 'vxe-form-design--widget-expand-btn'
		    }, hasFirstLevel && hasSub ? [(0, _vue.h)('i', {
		      "class": isExpand ? VxeUI.getIcon().FORM_DESIGN_WIDGET_OPTION_EXPAND_CLOSE : VxeUI.getIcon().FORM_DESIGN_WIDGET_OPTION_EXPAND_OPEN,
		      onClick: function onClick() {
		        toggleExpandOption(item, gIndex);
		      }
		    })] : []), (0, _vue.h)('input', {
		      "class": 'vxe-default-input',
		      value: item.value,
		      onInput: function onInput(evnt) {
		        item.value = evnt.currentTarget.value;
		      }
		    }), (0, _vue.h)(VxeUIButtonComponent, {
		      status: 'danger',
		      mode: 'text',
		      icon: VxeUI.getIcon().FORM_DESIGN_WIDGET_DELETE
		    })]);
		  };
		  var renderOptions = function renderOptions() {
		    var renderParams = props.renderParams;
		    var widget = renderParams.widget;
		    var options = widget.options;
		    var groups = options.options;
		    var optVNs = [];
		    if (groups) {
		      groups.forEach(function (group, gIndex) {
		        var options = group.options;
		        var isExpand = expandIndexList.value.includes(gIndex);
		        if (options && options.length) {
		          optVNs.push(renderOption(group, true, isExpand, gIndex, true, gIndex === 0, gIndex === groups.length - 1));
		          if (isExpand) {
		            optVNs.push((0, _vue.h)('div', {
		              "class": 'vxe-form-design--widget-form-item-data-source-sub-option'
		            }, options.map(function (item) {
		              return renderOption(item, false, isExpand, 0, false, false, false);
		            })));
		          }
		        } else {
		          optVNs.push(renderOption(group, true, isExpand, gIndex, false, gIndex === 0, gIndex === groups.length - 1));
		        }
		      });
		    }
		    return optVNs;
		  };
		  (0, _vue.watch)(function () {
		    return props.renderParams.widget;
		  }, function () {
		    expandAllOption();
		  });
		  (0, _vue.onMounted)(function () {
		    expandAllOption();
		  });
		  return {
		    renderDataSourceFormItem: function renderDataSourceFormItem() {
		      return (0, _vue.h)(VxeUIFormItemComponent, {
		        title: VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.name'),
		        field: 'options'
		      }, {
		        "default": function _default() {
		          return [(0, _vue.h)('div', {}, [(0, _vue.h)(VxeUIButtonComponent, {
		            status: 'primary',
		            mode: 'text',
		            content: VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.addOption'),
		            onClick: addOptionEvent
		          }), (0, _vue.h)(VxeUIButtonComponent, {
		            status: 'primary',
		            mode: 'text',
		            content: VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.batchEditOption'),
		            onClick: openPopupEditEvent
		          })]), (0, _vue.h)('div', {
		            "class": 'vxe-form-design--widget-form-item-data-source'
		          }, renderOptions())];
		        }
		      });
		    }
		  };
		}
		return use;
	}

	var hasRequiredSelectWidget;

	function requireSelectWidget () {
		if (hasRequiredSelectWidget) return selectWidget;
		hasRequiredSelectWidget = 1;

		Object.defineProperty(selectWidget, "__esModule", {
		  value: true
		});
		selectWidget.createWidgetASelect = createWidgetASelect;
		var _vue = require$$0;
		var _use = requireUse();
		var _comp = requireComp();
		var _xeUtils = _interopRequireDefault(require$$3);
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
		function createWidgetASelect(VxeUI) {
		  var getWidgetASelectConfig = function getWidgetASelectConfig(params) {
		    return {
		      title: '下拉框',
		      icon: 'vxe-icon-select',
		      options: {
		        placeholder: '请选择',
		        options: _xeUtils["default"].range(0, 3).map(function (v, i) {
		          return {
		            value: VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.defValue', [i + 1])
		          };
		        })
		      }
		    };
		  };
		  var WidgetASelectFormComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormComponent = VxeUI.getComponent('VxeForm');
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch');
		      var VxeUIInputComponent = VxeUI.getComponent('VxeInput');
		      var _useWidgetPropDataSou = (0, _use.useWidgetPropDataSource)(VxeUI, props, false),
		        renderDataSourceFormItem = _useWidgetPropDataSou.renderDataSourceFormItem;
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget;
		        return (0, _vue.h)(VxeUIFormComponent, {
		          "class": 'vxe-form-design--widget-render-form-wrapper',
		          vertical: true,
		          span: 24,
		          titleBold: true,
		          titleOverflow: true,
		          data: widget.options
		        }, {
		          "default": function _default() {
		            return [(0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUIInputComponent, {
		                  modelValue: widget.title,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.title = val;
		                  }
		                });
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.placeholder'),
		              field: 'placeholder',
		              itemRender: {
		                name: 'ElInput'
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.required')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUISwitchComponent, {
		                  modelValue: widget.required,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.required = val;
		                  }
		                });
		              }
		            }), renderDataSourceFormItem()];
		          }
		        });
		      };
		    }
		  });
		  var WidgetASelectViewComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var changeEvent = function changeEvent() {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        if ($formView) {
		          var itemValue = $formView ? $formView.getItemValue(widget) : null;
		          $formView.updateWidgetStatus(widget, itemValue);
		        }
		      };
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        var options = widget.options;
		        return (0, _vue.h)(VxeUIFormItemComponent, {
		          "class": ['vxe-form-design--widget-render-form-item'],
		          field: widget.field,
		          title: widget.title
		        }, {
		          "default": function _default() {
		            return (0, _vue.h)((0, _comp.getCurrComponent)('a-select'), {
		              value: $formView ? $formView.getItemValue(widget) : null,
		              options: options.options,
		              placeholder: options.placeholder,
		              onChange: changeEvent,
		              'onUpdate:value': function onUpdateValue(val) {
		                if ($formView) {
		                  $formView.setItemValue(widget, val);
		                }
		              }
		            });
		          }
		        });
		      };
		    }
		  });
		  return {
		    getWidgetASelectConfig: getWidgetASelectConfig,
		    WidgetASelectFormComponent: WidgetASelectFormComponent,
		    WidgetASelectViewComponent: WidgetASelectViewComponent
		  };
		}
		return selectWidget;
	}

	var radioWidget = {};

	var hasRequiredRadioWidget;

	function requireRadioWidget () {
		if (hasRequiredRadioWidget) return radioWidget;
		hasRequiredRadioWidget = 1;

		Object.defineProperty(radioWidget, "__esModule", {
		  value: true
		});
		radioWidget.createWidgetARadio = createWidgetARadio;
		var _vue = require$$0;
		var _use = requireUse();
		var _comp = requireComp();
		var _xeUtils = _interopRequireDefault(require$$3);
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
		function createWidgetARadio(VxeUI) {
		  var getWidgetARadioConfig = function getWidgetARadioConfig(params) {
		    return {
		      title: '单选框',
		      icon: 'vxe-icon-radio-checked',
		      options: {
		        options: _xeUtils["default"].range(0, 3).map(function (v, i) {
		          return {
		            value: VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.defValue', [i + 1])
		          };
		        })
		      }
		    };
		  };
		  var WidgetARadioFormComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormComponent = VxeUI.getComponent('VxeForm');
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch');
		      var VxeUIInputComponent = VxeUI.getComponent('VxeInput');
		      var _useWidgetPropDataSou = (0, _use.useWidgetPropDataSource)(VxeUI, props, false),
		        renderDataSourceFormItem = _useWidgetPropDataSou.renderDataSourceFormItem;
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget;
		        return (0, _vue.h)(VxeUIFormComponent, {
		          "class": 'vxe-form-design--widget-render-form-wrapper',
		          vertical: true,
		          span: 24,
		          titleBold: true,
		          titleOverflow: true,
		          data: widget.options
		        }, {
		          "default": function _default() {
		            return [(0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUIInputComponent, {
		                  modelValue: widget.title,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.title = val;
		                  }
		                });
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.placeholder'),
		              field: 'placeholder',
		              itemRender: {
		                name: 'ElInput'
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.required')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUISwitchComponent, {
		                  modelValue: widget.required,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.required = val;
		                  }
		                });
		              }
		            }), renderDataSourceFormItem()];
		          }
		        });
		      };
		    }
		  });
		  var WidgetARadioViewComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var radioOptions = (0, _vue.computed)(function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget;
		        var options = widget.options;
		        return options.options.map(function (item) {
		          return {
		            label: item.value,
		            value: item.value
		          };
		        });
		      });
		      var changeEvent = function changeEvent() {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        if ($formView) {
		          var itemValue = $formView ? $formView.getItemValue(widget) : null;
		          $formView.updateWidgetStatus(widget, itemValue);
		        }
		      };
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        return (0, _vue.h)(VxeUIFormItemComponent, {
		          "class": ['vxe-form-design--widget-render-form-item'],
		          field: widget.field,
		          title: widget.title
		        }, {
		          "default": function _default() {
		            return (0, _vue.h)((0, _comp.getCurrComponent)('a-radio-group'), {
		              value: $formView ? $formView.getItemValue(widget) : null,
		              options: radioOptions.value,
		              onChange: changeEvent,
		              'onUpdate:value': function onUpdateValue(val) {
		                if ($formView) {
		                  $formView.setItemValue(widget, val);
		                }
		              }
		            });
		          }
		        });
		      };
		    }
		  });
		  return {
		    getWidgetARadioConfig: getWidgetARadioConfig,
		    WidgetARadioFormComponent: WidgetARadioFormComponent,
		    WidgetARadioViewComponent: WidgetARadioViewComponent
		  };
		}
		return radioWidget;
	}

	var checkboxWidget = {};

	var hasRequiredCheckboxWidget;

	function requireCheckboxWidget () {
		if (hasRequiredCheckboxWidget) return checkboxWidget;
		hasRequiredCheckboxWidget = 1;

		Object.defineProperty(checkboxWidget, "__esModule", {
		  value: true
		});
		checkboxWidget.createWidgetACheckbox = createWidgetACheckbox;
		var _vue = require$$0;
		var _use = requireUse();
		var _comp = requireComp();
		var _xeUtils = _interopRequireDefault(require$$3);
		function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
		function createWidgetACheckbox(VxeUI) {
		  var getWidgetACheckboxConfig = function getWidgetACheckboxConfig(params) {
		    return {
		      title: '复选框',
		      icon: 'vxe-icon-checkbox-checked',
		      options: {
		        options: _xeUtils["default"].range(0, 3).map(function (v, i) {
		          return {
		            value: VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.defValue', [i + 1])
		          };
		        })
		      }
		    };
		  };
		  var WidgetACheckboxFormComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormComponent = VxeUI.getComponent('VxeForm');
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch');
		      var VxeUIInputComponent = VxeUI.getComponent('VxeInput');
		      var _useWidgetPropDataSou = (0, _use.useWidgetPropDataSource)(VxeUI, props, false),
		        renderDataSourceFormItem = _useWidgetPropDataSou.renderDataSourceFormItem;
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget;
		        return (0, _vue.h)(VxeUIFormComponent, {
		          "class": 'vxe-form-design--widget-render-form-wrapper',
		          vertical: true,
		          span: 24,
		          titleBold: true,
		          titleOverflow: true,
		          data: widget.options
		        }, {
		          "default": function _default() {
		            return [(0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUIInputComponent, {
		                  modelValue: widget.title,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.title = val;
		                  }
		                });
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.placeholder'),
		              field: 'placeholder',
		              itemRender: {
		                name: 'ElInput'
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.required')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUISwitchComponent, {
		                  modelValue: widget.required,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.required = val;
		                  }
		                });
		              }
		            }), renderDataSourceFormItem()];
		          }
		        });
		      };
		    }
		  });
		  var WidgetACheckboxViewComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var checkboxOptions = (0, _vue.computed)(function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget;
		        var options = widget.options;
		        return options.options.map(function (item) {
		          return {
		            label: item.value,
		            value: item.value
		          };
		        });
		      });
		      var changeEvent = function changeEvent() {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        if ($formView) {
		          var itemValue = $formView ? $formView.getItemValue(widget) : null;
		          $formView.updateWidgetStatus(widget, itemValue);
		        }
		      };
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        return (0, _vue.h)(VxeUIFormItemComponent, {
		          "class": ['vxe-form-design--widget-render-form-item'],
		          field: widget.field,
		          title: widget.title
		        }, {
		          "default": function _default() {
		            return (0, _vue.h)((0, _comp.getCurrComponent)('a-checkbox-group'), {
		              value: $formView ? $formView.getItemValue(widget) : null,
		              options: checkboxOptions.value,
		              onChange: changeEvent,
		              'onUpdate:value': function onUpdateValue(val) {
		                if ($formView) {
		                  $formView.setItemValue(widget, val);
		                }
		              }
		            });
		          }
		        });
		      };
		    }
		  });
		  return {
		    getWidgetACheckboxConfig: getWidgetACheckboxConfig,
		    WidgetACheckboxFormComponent: WidgetACheckboxFormComponent,
		    WidgetACheckboxViewComponent: WidgetACheckboxViewComponent
		  };
		}
		return checkboxWidget;
	}

	var switchWidget = {};

	var hasRequiredSwitchWidget;

	function requireSwitchWidget () {
		if (hasRequiredSwitchWidget) return switchWidget;
		hasRequiredSwitchWidget = 1;

		Object.defineProperty(switchWidget, "__esModule", {
		  value: true
		});
		switchWidget.createWidgetASwitch = createWidgetASwitch;
		var _vue = require$$0;
		var _comp = requireComp();
		function createWidgetASwitch(VxeUI) {
		  var getWidgetASwitchConfig = function getWidgetASwitchConfig(params) {
		    return {
		      title: '是/否',
		      icon: 'vxe-icon-switch',
		      options: {}
		    };
		  };
		  var WidgetASwitchFormComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormComponent = VxeUI.getComponent('VxeForm');
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch');
		      var VxeUIInputComponent = VxeUI.getComponent('VxeInput');
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget;
		        return (0, _vue.h)(VxeUIFormComponent, {
		          "class": 'vxe-form-design--widget-render-form-wrapper',
		          vertical: true,
		          span: 24,
		          titleBold: true,
		          titleOverflow: true,
		          data: widget.options
		        }, {
		          "default": function _default() {
		            return [(0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUIInputComponent, {
		                  modelValue: widget.title,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.title = val;
		                  }
		                });
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.placeholder'),
		              field: 'placeholder',
		              itemRender: {
		                name: 'ElInput'
		              }
		            }), (0, _vue.h)(VxeUIFormItemComponent, {
		              title: VxeUI.getI18n('vxe.formDesign.widgetProp.required')
		            }, {
		              "default": function _default() {
		                return (0, _vue.h)(VxeUISwitchComponent, {
		                  modelValue: widget.required,
		                  'onUpdate:modelValue': function onUpdateModelValue(val) {
		                    widget.required = val;
		                  }
		                });
		              }
		            })];
		          }
		        });
		      };
		    }
		  });
		  var WidgetASwitchViewComponent = (0, _vue.defineComponent)({
		    props: {
		      renderOpts: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      },
		      renderParams: {
		        type: Object,
		        "default": function _default() {
		          return {};
		        }
		      }
		    },
		    emits: [],
		    setup: function setup(props) {
		      var VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
		      var changeEvent = function changeEvent() {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        if ($formView) {
		          var itemValue = $formView ? $formView.getItemValue(widget) : null;
		          $formView.updateWidgetStatus(widget, itemValue);
		        }
		      };
		      return function () {
		        var renderParams = props.renderParams;
		        var widget = renderParams.widget,
		          $formView = renderParams.$formView;
		        return (0, _vue.h)(VxeUIFormItemComponent, {
		          "class": ['vxe-form-design--widget-render-form-item'],
		          field: widget.field,
		          title: widget.title
		        }, {
		          "default": function _default() {
		            return (0, _vue.h)((0, _comp.getCurrComponent)('a-switch'), {
		              checked: $formView ? $formView.getItemValue(widget) : null,
		              onChange: changeEvent,
		              'onUpdate:checked': function onUpdateChecked(val) {
		                if ($formView) {
		                  $formView.setItemValue(widget, val);
		                }
		              }
		            });
		          }
		        });
		      };
		    }
		  });
		  return {
		    getWidgetASwitchConfig: getWidgetASwitchConfig,
		    WidgetASwitchFormComponent: WidgetASwitchFormComponent,
		    WidgetASwitchViewComponent: WidgetASwitchViewComponent
		  };
		}
		return switchWidget;
	}

	var hasRequiredFormDesign;

	function requireFormDesign () {
		if (hasRequiredFormDesign) return formDesign;
		hasRequiredFormDesign = 1;

		Object.defineProperty(formDesign, "__esModule", {
		  value: true
		});
		formDesign.defineFormDesignRender = defineFormDesignRender;
		var _vue = require$$0;
		var _inputWidget = requireInputWidget();
		var _textareaWidget = requireTextareaWidget();
		var _numberInputWidget = requireNumberInputWidget();
		var _datePickerWidget = requireDatePickerWidget();
		var _selectWidget = requireSelectWidget();
		var _radioWidget = requireRadioWidget();
		var _checkboxWidget = requireCheckboxWidget();
		var _switchWidget = requireSwitchWidget();
		/**
		 * 表单设计器 - 渲染器
		 */
		function defineFormDesignRender(VxeUI) {
		  var _createWidgetAInput = (0, _inputWidget.createWidgetAInput)(VxeUI),
		    getWidgetAInputConfig = _createWidgetAInput.getWidgetAInputConfig,
		    WidgetAInputViewComponent = _createWidgetAInput.WidgetAInputViewComponent,
		    WidgetAInputFormComponent = _createWidgetAInput.WidgetAInputFormComponent;
		  var _createWidgetATextare = (0, _textareaWidget.createWidgetATextarea)(VxeUI),
		    getWidgetATextareaConfig = _createWidgetATextare.getWidgetATextareaConfig,
		    WidgetATextareaViewComponent = _createWidgetATextare.WidgetATextareaViewComponent,
		    WidgetATextareaFormComponent = _createWidgetATextare.WidgetATextareaFormComponent;
		  var _createWidgetAInputNu = (0, _numberInputWidget.createWidgetAInputNumber)(VxeUI),
		    getWidgetAInputNumberConfig = _createWidgetAInputNu.getWidgetAInputNumberConfig,
		    WidgetAInputNumberViewComponent = _createWidgetAInputNu.WidgetAInputNumberViewComponent,
		    WidgetAInputNumberFormComponent = _createWidgetAInputNu.WidgetAInputNumberFormComponent;
		  var _createWidgetADatePic = (0, _datePickerWidget.createWidgetADatePicker)(VxeUI),
		    getWidgetADatePickerConfig = _createWidgetADatePic.getWidgetADatePickerConfig,
		    WidgetADatePickerViewComponent = _createWidgetADatePic.WidgetADatePickerViewComponent,
		    WidgetADatePickerFormComponent = _createWidgetADatePic.WidgetADatePickerFormComponent;
		  var _createWidgetASelect = (0, _selectWidget.createWidgetASelect)(VxeUI),
		    getWidgetASelectConfig = _createWidgetASelect.getWidgetASelectConfig,
		    WidgetASelectViewComponent = _createWidgetASelect.WidgetASelectViewComponent,
		    WidgetASelectFormComponent = _createWidgetASelect.WidgetASelectFormComponent;
		  var _createWidgetARadio = (0, _radioWidget.createWidgetARadio)(VxeUI),
		    getWidgetARadioConfig = _createWidgetARadio.getWidgetARadioConfig,
		    WidgetARadioViewComponent = _createWidgetARadio.WidgetARadioViewComponent,
		    WidgetARadioFormComponent = _createWidgetARadio.WidgetARadioFormComponent;
		  var _createWidgetACheckbo = (0, _checkboxWidget.createWidgetACheckbox)(VxeUI),
		    getWidgetACheckboxConfig = _createWidgetACheckbo.getWidgetACheckboxConfig,
		    WidgetACheckboxViewComponent = _createWidgetACheckbo.WidgetACheckboxViewComponent,
		    WidgetACheckboxFormComponent = _createWidgetACheckbo.WidgetACheckboxFormComponent;
		  var _createWidgetASwitch = (0, _switchWidget.createWidgetASwitch)(VxeUI),
		    getWidgetASwitchConfig = _createWidgetASwitch.getWidgetASwitchConfig,
		    WidgetASwitchViewComponent = _createWidgetASwitch.WidgetASwitchViewComponent,
		    WidgetASwitchFormComponent = _createWidgetASwitch.WidgetASwitchFormComponent;
		  VxeUI.renderer.mixin({
		    AInputWidget: {
		      createFormDesignWidgetConfig: getWidgetAInputConfig,
		      renderFormDesignWidgetView: function renderFormDesignWidgetView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetAInputViewComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      },
		      renderFormDesignWidgetFormView: function renderFormDesignWidgetFormView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetAInputFormComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      }
		    },
		    ATextareaWidget: {
		      createFormDesignWidgetConfig: getWidgetATextareaConfig,
		      renderFormDesignWidgetView: function renderFormDesignWidgetView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetATextareaViewComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      },
		      renderFormDesignWidgetFormView: function renderFormDesignWidgetFormView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetATextareaFormComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      }
		    },
		    ANumberInputWidget: {
		      createFormDesignWidgetConfig: getWidgetAInputNumberConfig,
		      renderFormDesignWidgetView: function renderFormDesignWidgetView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetAInputNumberViewComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      },
		      renderFormDesignWidgetFormView: function renderFormDesignWidgetFormView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetAInputNumberFormComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      }
		    },
		    ADatePickerWidget: {
		      createFormDesignWidgetConfig: getWidgetADatePickerConfig,
		      renderFormDesignWidgetView: function renderFormDesignWidgetView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetADatePickerViewComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      },
		      renderFormDesignWidgetFormView: function renderFormDesignWidgetFormView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetADatePickerFormComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      }
		    },
		    ASelectWidget: {
		      createFormDesignWidgetConfig: getWidgetASelectConfig,
		      renderFormDesignWidgetView: function renderFormDesignWidgetView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetASelectViewComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      },
		      renderFormDesignWidgetFormView: function renderFormDesignWidgetFormView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetASelectFormComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      }
		    },
		    ARadioWidget: {
		      createFormDesignWidgetConfig: getWidgetARadioConfig,
		      renderFormDesignWidgetView: function renderFormDesignWidgetView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetARadioViewComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      },
		      renderFormDesignWidgetFormView: function renderFormDesignWidgetFormView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetARadioFormComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      }
		    },
		    ACheckboxWidget: {
		      createFormDesignWidgetConfig: getWidgetACheckboxConfig,
		      createFormDesignWidgetFieldValue: function createFormDesignWidgetFieldValue() {
		        return [];
		      },
		      renderFormDesignWidgetView: function renderFormDesignWidgetView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetACheckboxViewComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      },
		      renderFormDesignWidgetFormView: function renderFormDesignWidgetFormView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetACheckboxFormComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      }
		    },
		    ASwitchWidget: {
		      createFormDesignWidgetConfig: getWidgetASwitchConfig,
		      renderFormDesignWidgetView: function renderFormDesignWidgetView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetASwitchViewComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      },
		      renderFormDesignWidgetFormView: function renderFormDesignWidgetFormView(renderOpts, renderParams) {
		        return (0, _vue.h)(WidgetASwitchFormComponent, {
		          renderOpts: renderOpts,
		          renderParams: renderParams
		        });
		      }
		    }
		  });
		}
		return formDesign;
	}

	var hasRequiredLib;

	function requireLib () {
		if (hasRequiredLib) return lib;
		hasRequiredLib = 1;
		(function (exports$1) {

			Object.defineProperty(exports$1, "__esModule", {
			  value: true
			});
			exports$1["default"] = exports$1.VxeUIPluginRenderAntd = void 0;
			var _table = requireTable();
			var _form = requireForm();
			var _formDesign = requireFormDesign();
			var _store = requireStore();
			var _xeUtils = _interopRequireDefault(require$$3);
			function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
			function getEventTarget(evnt) {
			  var target = evnt.target;
			  if (target && target.shadowRoot && evnt.composed) {
			    return evnt.composedPath()[0] || target;
			  }
			  return target;
			}
			/**
			 * 检查触发源是否属于目标节点
			 */
			function getEventTargetNode(evnt, container, className) {
			  var targetElem;
			  var target = getEventTarget(evnt);
			  var rootEl = document.documentElement || document.querySelector('html');
			  while (target && target.nodeType && target !== rootEl) {
			    if (className && target.className && target.className.split && target.className.split(' ').indexOf(className) > -1) {
			      targetElem = target;
			    } else if (target === container) {
			      return {
			        flag: className ? !!targetElem : true,
			        container: container,
			        targetElem: targetElem
			      };
			    }
			    target = target.parentElement;
			  }
			  return {
			    flag: false
			  };
			}
			function toComponentName(name) {
			  if (name) {
			    return name.slice(0, 1).toUpperCase() + name.slice(1);
			  }
			  return name;
			}
			var VxeUIPluginRenderAntd = exports$1.VxeUIPluginRenderAntd = {
			  component: function component(comp) {
			    if (comp && comp.name) {
			      var kcName = _xeUtils["default"].kebabCase(comp.name);
			      var ccName = toComponentName(_xeUtils["default"].camelCase(comp.name));
			      _store.componentMaps[kcName] = comp;
			      _store.componentMaps[ccName] = comp;
			    } else {
			      console.error('[@vxe-ui/plugin-render-antd 4.3.1] error component.', comp);
			    }
			  },
			  install: function install(VxeUI, options) {
			    var pluginOpts = Object.assign({}, options);
			    if (options) {
			      Object.assign(_store.globalConfig, options);
			    }
			    // 检查版本
			    if (VxeUI.checkVersion) {
			      var pVersion = 4;
			      var sVersion = 11;
			      if (!VxeUI.checkVersion(VxeUI.tableVersion, pVersion, sVersion)) {
			        console.error("[@vxe-ui/plugin-render-antd 4.3.1] ".concat(VxeUI.getI18n('vxe.error.errorVersion', ["vxe-table@".concat(VxeUI.tableVersion || '?'), "vxe-table v".concat(pVersion, ".").concat(sVersion, "+")]), " https://vxeui.com/other4/#/plugin-render-antd/install"));
			      }
			    } else {
			      if (!/^(4)\./.test(VxeUI.uiVersion || VxeUI.tableVersion)) {
			        console.error('[@vxe-ui/plugin-render-antd 4.3.1] Requires vxe-table 4.7.0+ version. https://vxeui.com/other4/#/plugin-render-antd/install');
			      }
			    }
			    /**
			     * 事件兼容性处理
			     */
			    var handleClearEvent = function handleClearEvent(params) {
			      var $event = params.$event;
			      var bodyElem = document.body;
			      var prefixCls = "".concat(pluginOpts.prefixCls || 'ant').replace(/-$/, '');
			      if (
			      // 下拉框
			      getEventTargetNode($event, bodyElem, "".concat(prefixCls, "-select-dropdown")).flag ||
			      // 级联
			      getEventTargetNode($event, bodyElem, "".concat(prefixCls, "-cascader-menus")).flag ||
			      // 日期
			      getEventTargetNode($event, bodyElem, "".concat(prefixCls, "-picker-dropdown")).flag || getEventTargetNode($event, bodyElem, "".concat(prefixCls, "-calendar-picker-container")).flag ||
			      // 时间选择
			      getEventTargetNode($event, bodyElem, "".concat(prefixCls, "-time-picker-panel")).flag) {
			        return false;
			      }
			    };
			    (0, _table.defineTableRender)(VxeUI);
			    (0, _form.defineFormRender)(VxeUI);
			    (0, _formDesign.defineFormDesignRender)(VxeUI);
			    VxeUI.interceptor.add('event.clearFilter', handleClearEvent);
			    VxeUI.interceptor.add('event.clearEdit', handleClearEvent);
			    VxeUI.interceptor.add('event.clearAreas', handleClearEvent);
			    // 兼容老版本
			    VxeUI.interceptor.add('event.clearActived', handleClearEvent);
			  }
			};
			if (typeof window !== 'undefined') {
			  if (window.VxeUI && window.VxeUI.use) {
			    window.VxeUI.use(VxeUIPluginRenderAntd);
			  }
			  if (window.antd) {
			    _store.globalConfig.Antd = window.antd;
			  }
			}
			exports$1["default"] = VxeUIPluginRenderAntd; 
		} (lib));
		return lib;
	}

	var libExports = requireLib();
	var index = /*@__PURE__*/getDefaultExportFromCjs(libExports);

	return index;

}));
