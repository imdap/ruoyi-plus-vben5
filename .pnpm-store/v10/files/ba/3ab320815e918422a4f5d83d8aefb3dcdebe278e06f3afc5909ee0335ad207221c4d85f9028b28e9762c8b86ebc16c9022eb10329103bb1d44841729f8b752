"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineFormRender = defineFormRender;
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