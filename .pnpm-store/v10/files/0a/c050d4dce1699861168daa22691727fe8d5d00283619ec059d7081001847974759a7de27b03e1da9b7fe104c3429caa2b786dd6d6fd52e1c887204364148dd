"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWidgetACheckbox = createWidgetACheckbox;
var _vue = require("vue");
var _use = require("./use");
var _comp = require("../util/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
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