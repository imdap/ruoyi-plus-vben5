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
  name: 'VxeRadioButton',
  props: {
    modelValue: [String, Number, Boolean],
    checkedValue: {
      type: [String, Number, Boolean],
      default: undefined
    },
    title: [String, Number],
    content: [String, Number],
    disabled: {
      type: Boolean,
      default: null
    },
    strict: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().radioButton.strict
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().radioButton.size || (0, _ui.getConfig)().size
    },
    /**
     * 已废弃，被 checkedValue 替换
     */
    label: {
      type: [String, Number, Boolean],
      default: null
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
    const $xeRadioGroup = (0, _vue.inject)('$xeRadioGroup', null);
    const xID = _xeUtils.default.uniqueId();
    const reactData = (0, _vue.reactive)({});
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const $xeRadioButton = {
      xID,
      props,
      context,
      reactData
    };
    const computeIsDisabled = (0, _vue.computed)(() => {
      const {
        disabled
      } = props;
      if (disabled === null) {
        if ($xeRadioGroup) {
          const {
            computeIsDisabled
          } = $xeRadioGroup.getComputeMaps();
          return computeIsDisabled.value;
        }
      }
      return disabled;
    });
    const computeName = (0, _vue.computed)(() => {
      return $xeRadioGroup ? $xeRadioGroup.name : null;
    });
    const computeStrict = (0, _vue.computed)(() => {
      return $xeRadioGroup ? $xeRadioGroup.props.strict : props.strict;
    });
    const computeChecked = (0, _vue.computed)(() => {
      const {
        label,
        checkedValue
      } = props;
      const radioValue = _xeUtils.default.isUndefined(checkedValue) ? label : checkedValue;
      return $xeRadioGroup ? $xeRadioGroup.props.modelValue === radioValue : props.modelValue === radioValue;
    });
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $radioGroup: $xeRadioGroup
      }, params));
    };
    const radioButtonMethods = {
      dispatchEvent
    };
    const radioButtonPrivateMethods = {};
    Object.assign($xeRadioButton, radioButtonMethods, radioButtonPrivateMethods);
    const handleValue = (checkedValue, evnt) => {
      const {
        content
      } = props;
      if ($xeRadioGroup) {
        $xeRadioGroup.handleChecked({
          label: checkedValue,
          checkedValue,
          checkedLabel: content
        }, evnt);
      } else {
        emit('update:modelValue', checkedValue);
        dispatchEvent('change', {
          value: checkedValue,
          label: checkedValue,
          checkedValue,
          checkedLabel: content
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, checkedValue);
        }
      }
    };
    const changeEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        const {
          label,
          checkedValue
        } = props;
        const radioValue = _xeUtils.default.isUndefined(checkedValue) ? label : checkedValue;
        handleValue(radioValue, evnt);
      }
    };
    const clickEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      const isStrict = computeStrict.value;
      if (!isDisabled && !isStrict) {
        const {
          label,
          checkedValue
        } = props;
        const radioValue = _xeUtils.default.isUndefined(checkedValue) ? label : checkedValue;
        if (radioValue === ($xeRadioGroup ? $xeRadioGroup.props.modelValue : props.modelValue)) {
          handleValue(null, evnt);
        }
      }
    };
    const renderVN = () => {
      const {
        label,
        checkedValue
      } = props;
      const radioValue = _xeUtils.default.isUndefined(checkedValue) ? label : checkedValue;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const name = computeName.value;
      const isChecked = computeChecked.value;
      return (0, _vue.h)('label', {
        key: radioValue,
        class: ['vxe-radio vxe-radio--button', {
          [`size--${vSize}`]: vSize,
          'is--disabled': isDisabled
        }],
        title: props.title
      }, [(0, _vue.h)('input', {
        class: 'vxe-radio--input',
        type: 'radio',
        name,
        checked: isChecked,
        disabled: isDisabled,
        onChange: changeEvent,
        onClick: clickEvent
      }), (0, _vue.h)('span', {
        class: 'vxe-radio--label'
      }, slots.default ? slots.default({}) : (0, _utils.getFuncText)(props.content))]);
    };
    $xeRadioButton.renderVN = renderVN;
    return renderVN;
  }
});