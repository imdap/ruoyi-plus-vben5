"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWidgetPropDataSource = useWidgetPropDataSource;
var _vue = require("vue");
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