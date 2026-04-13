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
  name: 'VxeCheckbox',
  props: {
    modelValue: [String, Number, Boolean],
    label: {
      type: [String, Number],
      default: null
    },
    indeterminate: Boolean,
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
      default: () => (0, _ui.getConfig)().checkbox.size || (0, _ui.getConfig)().size
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
    const $xeCheckbox = {
      xID,
      props,
      context,
      reactData
    };
    let checkboxMethods = {};
    const {
      computeSize
    } = (0, _ui.useSize)(props);
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
          checkboxMethods.dispatchEvent('change', params, evnt);
          // 自动更新校验状态
          if ($xeForm && formItemInfo) {
            $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
          }
        }
      }
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $checkbox: $xeCheckbox
      }, params));
    };
    checkboxMethods = {
      dispatchEvent
    };
    Object.assign($xeCheckbox, checkboxMethods);
    const renderVN = () => {
      const {
        label
      } = props;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const isChecked = computeIsChecked.value;
      const indeterminate = !isChecked && props.indeterminate;
      return (0, _vue.h)('label', {
        key: label,
        class: ['vxe-checkbox vxe-checkbox--default', {
          [`size--${vSize}`]: vSize,
          'is--indeterminate': indeterminate,
          'is--disabled': isDisabled,
          'is--checked': isChecked
        }],
        title: props.title
      }, [(0, _vue.h)('input', {
        class: 'vxe-checkbox--input',
        type: 'checkbox',
        disabled: isDisabled,
        checked: isChecked,
        onChange: changeEvent
      }), (0, _vue.h)('span', {
        class: ['vxe-checkbox--icon', indeterminate ? (0, _ui.getIcon)().CHECKBOX_INDETERMINATE : isChecked ? (0, _ui.getIcon)().CHECKBOX_CHECKED : isDisabled ? (0, _ui.getIcon)().CHECKBOX_DISABLED_UNCHECKED : (0, _ui.getIcon)().CHECKBOX_UNCHECKED]
      }), (0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, slots.default ? slots.default({}) : (0, _utils.getFuncText)(props.content))]);
    };
    $xeCheckbox.renderVN = renderVN;
    return $xeCheckbox;
  },
  render() {
    return this.renderVN();
  }
});