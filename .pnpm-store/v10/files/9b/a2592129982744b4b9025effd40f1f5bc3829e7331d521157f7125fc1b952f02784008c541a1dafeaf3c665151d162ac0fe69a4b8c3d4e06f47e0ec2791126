"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineFormDesignRender = defineFormDesignRender;
var _vue = require("vue");
var _inputWidget = require("./input-widget");
var _textareaWidget = require("./textarea-widget");
var _numberInputWidget = require("./number-input-widget");
var _datePickerWidget = require("./date-picker-widget");
var _selectWidget = require("./select-widget");
var _radioWidget = require("./radio-widget");
var _checkboxWidget = require("./checkbox-widget");
var _switchWidget = require("./switch-widget");
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