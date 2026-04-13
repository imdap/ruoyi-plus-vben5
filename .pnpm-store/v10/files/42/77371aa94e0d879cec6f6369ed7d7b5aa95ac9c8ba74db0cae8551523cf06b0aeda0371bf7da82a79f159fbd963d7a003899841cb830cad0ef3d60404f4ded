"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeSwitch',
  props: {
    modelValue: [String, Number, Boolean],
    disabled: {
      type: Boolean,
      default: null
    },
    readonly: {
      type: Boolean,
      default: null
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().switch.size || (0, _ui.getConfig)().size
    },
    openLabel: String,
    closeLabel: String,
    openValue: {
      type: [String, Number, Boolean],
      default: true
    },
    closeValue: {
      type: [String, Number, Boolean],
      default: false
    },
    openIcon: String,
    closeIcon: String,
    openActiveIcon: String,
    closeActiveIcon: String
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  setup(props, context) {
    const {
      emit
    } = context;
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const formItemInfo = (0, _vue.inject)('xeFormItemInfo', null);
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      isActivated: false,
      hasAnimat: false,
      offsetLeft: 0
    });
    const internalData = {};
    const $xeSwitch = {
      xID,
      props,
      context,
      reactData,
      internalData
    };
    const refButton = (0, _vue.ref)();
    let switchMethods = {};
    const computeIsDisabled = (0, _vue.computed)(() => {
      const {
        disabled
      } = props;
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.readonly || $xeForm.props.disabled;
        }
        return false;
      }
      return disabled;
    });
    const computeIsReadonly = (0, _vue.computed)(() => {
      const {
        readonly
      } = props;
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly || $xeForm.props.disabled;
        }
        return false;
      }
      return readonly;
    });
    const computeOnShowLabel = (0, _vue.computed)(() => {
      return (0, _utils.getFuncText)(props.openLabel);
    });
    const computeOffShowLabel = (0, _vue.computed)(() => {
      return (0, _utils.getFuncText)(props.closeLabel);
    });
    const computeIsChecked = (0, _vue.computed)(() => {
      return props.modelValue === props.openValue;
    });
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const clickEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      const isReadonly = computeIsReadonly.value;
      if (!(isDisabled || isReadonly)) {
        const isChecked = computeIsChecked.value;
        clearTimeout(internalData.atTimeout);
        const value = isChecked ? props.closeValue : props.openValue;
        reactData.hasAnimat = true;
        emitModel(value);
        switchMethods.dispatchEvent('change', {
          value
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
        }
        internalData.atTimeout = setTimeout(() => {
          reactData.hasAnimat = false;
          internalData.atTimeout = undefined;
        }, 400);
      }
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $switch: $xeSwitch
      }, params));
    };
    const focusEvent = evnt => {
      reactData.isActivated = true;
      switchMethods.dispatchEvent('focus', {
        value: props.modelValue
      }, evnt);
    };
    const blurEvent = evnt => {
      reactData.isActivated = false;
      switchMethods.dispatchEvent('blur', {
        value: props.modelValue
      }, evnt);
    };
    switchMethods = {
      dispatchEvent,
      focus() {
        const btnElem = refButton.value;
        reactData.isActivated = true;
        if (btnElem) {
          btnElem.focus();
        }
        return (0, _vue.nextTick)();
      },
      blur() {
        const btnElem = refButton.value;
        if (btnElem) {
          btnElem.blur();
        }
        reactData.isActivated = false;
        return (0, _vue.nextTick)();
      }
    };
    Object.assign($xeSwitch, switchMethods);
    const renderVN = () => {
      const {
        openIcon,
        closeIcon,
        openActiveIcon,
        closeActiveIcon
      } = props;
      const vSize = computeSize.value;
      const isChecked = computeIsChecked.value;
      const onShowLabel = computeOnShowLabel.value;
      const offShowLabel = computeOffShowLabel.value;
      const isDisabled = computeIsDisabled.value;
      const isReadonly = computeIsReadonly.value;
      return (0, _vue.h)('div', {
        class: ['vxe-switch', isChecked ? 'is--on' : 'is--off', {
          [`size--${vSize}`]: vSize,
          'is--disabled': isDisabled,
          'is--readonly': isReadonly,
          'is--animat': reactData.hasAnimat
        }]
      }, [(0, _vue.h)('button', {
        ref: refButton,
        class: 'vxe-switch--button',
        type: 'button',
        disabled: isDisabled || isReadonly,
        onClick: clickEvent,
        onFocus: focusEvent,
        onBlur: blurEvent
      }, [(0, _vue.h)('span', {
        class: 'vxe-switch--label vxe-switch--label-on'
      }, [openIcon ? (0, _vue.h)('i', {
        class: ['vxe-switch--label-icon', openIcon]
      }) : (0, _ui.renderEmptyElement)($xeSwitch), onShowLabel]), (0, _vue.h)('span', {
        class: 'vxe-switch--label vxe-switch--label-off'
      }, [closeIcon ? (0, _vue.h)('i', {
        class: ['vxe-switch--label-icon', closeIcon]
      }) : (0, _ui.renderEmptyElement)($xeSwitch), offShowLabel]), (0, _vue.h)('span', {
        class: ['vxe-switch--icon']
      }, openActiveIcon || closeActiveIcon ? [(0, _vue.h)('i', {
        class: isChecked ? openActiveIcon : closeActiveIcon
      })] : [])])]);
    };
    $xeSwitch.renderVN = renderVN;
    return $xeSwitch;
  },
  render() {
    return this.renderVN();
  }
});