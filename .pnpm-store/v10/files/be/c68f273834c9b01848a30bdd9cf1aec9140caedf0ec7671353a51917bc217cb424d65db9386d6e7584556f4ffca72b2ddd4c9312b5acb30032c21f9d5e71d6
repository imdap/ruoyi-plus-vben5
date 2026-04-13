"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _utils = require("../../ui/src/utils");
var _ui = require("../../ui");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeCheckboxButton',
  props: {
    modelValue: [String, Number, Boolean],
    label: {
      type: [String, Number, Boolean],
      default: null
    },
    title: [String, Number],
    checkedValue: {
      type: [String, Number, Boolean],
      default: true
    },
    uncheckedValue: {
      type: [String, Number, Boolean],
      default: false
    },
    content: [String, Number],
    disabled: {
      type: Boolean,
      default: null
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().checkboxButton.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const formItemInfo = (0, _vue.inject)('xeFormItemInfo', null);
    const $xeCheckboxGroup = (0, _vue.inject)('$xeCheckboxGroup', null);
    const xID = _xeUtils.default.uniqueId();
    const reactData = (0, _vue.reactive)({});
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const $xeCheckboxButton = {
      xID,
      props,
      context,
      reactData
    };
    const computeIsChecked = (0, _vue.computed)(() => {
      if ($xeCheckboxGroup) {
        return _xeUtils.default.includes($xeCheckboxGroup.props.modelValue, props.label);
      }
      return props.modelValue === props.checkedValue;
    });
    const computeIsDisabled = (0, _vue.computed)(() => {
      const {
        disabled
      } = props;
      const isChecked = computeIsChecked.value;
      if (disabled === null) {
        if ($xeCheckboxGroup) {
          const {
            computeIsDisabled: computeIsGroupDisabled,
            computeIsMaximize: computeIsGroupMaximize
          } = $xeCheckboxGroup.getComputeMaps();
          const isGroupDisabled = computeIsGroupDisabled.value;
          const isGroupMaximize = computeIsGroupMaximize.value;
          return isGroupDisabled || isGroupMaximize && !isChecked;
        }
      }
      return disabled;
    });
    const changeEvent = evnt => {
      const {
        checkedValue,
        uncheckedValue
      } = props;
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        const checked = evnt.target.checked;
        const value = checked ? checkedValue : uncheckedValue;
        const params = {
          checked,
          value,
          label: props.label
        };
        if ($xeCheckboxGroup) {
          $xeCheckboxGroup.handleChecked(params, evnt);
        } else {
          emit('update:modelValue', value);
          $xeCheckboxButton.dispatchEvent('change', params, evnt);
          // 自动更新校验状态
          if ($xeForm && formItemInfo) {
            $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
          }
        }
      }
    };
    const checkboxButtonMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, (0, _ui.createEvent)(evnt, {
          $checkboxButton: $xeCheckboxButton
        }, params));
      }
    };
    const checkboxButtonPrivateMethods = {};
    Object.assign($xeCheckboxButton, checkboxButtonMethods, checkboxButtonPrivateMethods);
    const renderVN = () => {
      const {
        label
      } = props;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const isChecked = computeIsChecked.value;
      return (0, _vue.h)('label', {
        key: label,
        class: ['vxe-checkbox vxe-checkbox--button', {
          [`size--${vSize}`]: vSize,
          'is--disabled': isDisabled
        }],
        title: props.title
      }, [(0, _vue.h)('input', {
        class: 'vxe-checkbox--input',
        type: 'checkbox',
        disabled: isDisabled,
        checked: isChecked,
        onChange: changeEvent
      }), (0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, slots.default ? slots.default({}) : (0, _utils.getFuncText)(props.content))]);
    };
    $xeCheckboxButton.renderVN = renderVN;
    return renderVN;
  }
});