"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWidgetADatePicker = createWidgetADatePicker;
var _vue = require("vue");
var _comp = require("../util/comp");
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