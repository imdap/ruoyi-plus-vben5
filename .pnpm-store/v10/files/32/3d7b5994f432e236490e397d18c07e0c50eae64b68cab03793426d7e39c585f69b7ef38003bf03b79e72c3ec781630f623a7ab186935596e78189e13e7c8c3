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
var _vn = require("../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxePasswordInput',
  props: {
    modelValue: String,
    immediate: {
      type: Boolean,
      default: true
    },
    name: String,
    clearable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().passwordInput.clearable
    },
    readonly: Boolean,
    disabled: Boolean,
    maxLength: [String, Number],
    placeholder: String,
    autoComplete: {
      type: String,
      default: 'off'
    },
    className: String,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().passwordInput.size || (0, _ui.getConfig)().size
    },
    prefixIcon: String,
    suffixIcon: String,
    controls: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().passwordInput.controls
    },
    // 已废弃
    autocomplete: String
  },
  emits: ['update:modelValue', 'input', 'change', 'click', 'focus', 'blur', 'clear', 'lazy-change', 'toggle-visible', 'prefix-click', 'suffix-click'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const formItemInfo = (0, _vue.inject)('xeFormItemInfo', null);
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      showPwd: false,
      isActivated: false,
      inputValue: props.modelValue
    });
    const refElem = (0, _vue.ref)();
    const refInputTarget = (0, _vue.ref)();
    const refMaps = {
      refElem,
      refInput: refInputTarget
    };
    const $xePasswordInput = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    };
    let passwordInputMethods = {};
    const computeIsClearable = (0, _vue.computed)(() => {
      return props.clearable;
    });
    const computeInpReadonly = (0, _vue.computed)(() => {
      const {
        readonly
      } = props;
      return readonly;
    });
    const computeInpPlaceholder = (0, _vue.computed)(() => {
      const {
        placeholder
      } = props;
      if (placeholder) {
        return (0, _utils.getFuncText)(placeholder);
      }
      const globalPlaceholder = (0, _ui.getConfig)().passwordInput.placeholder;
      if (globalPlaceholder) {
        return (0, _utils.getFuncText)(globalPlaceholder);
      }
      return (0, _ui.getI18n)('vxe.base.pleaseInput');
    });
    const computeInputType = (0, _vue.computed)(() => {
      const {
        showPwd
      } = reactData;
      if (showPwd) {
        return 'text';
      }
      return 'password';
    });
    const computeInpImmediate = (0, _vue.computed)(() => {
      const {
        immediate
      } = props;
      return immediate;
    });
    const triggerEvent = evnt => {
      const {
        inputValue
      } = reactData;
      passwordInputMethods.dispatchEvent(evnt.type, {
        value: inputValue
      }, evnt);
    };
    const emitInputEvent = (value, evnt) => {
      const inpImmediate = computeInpImmediate.value;
      reactData.inputValue = value;
      if (inpImmediate) {
        handleChange(value, evnt);
      } else {
        passwordInputMethods.dispatchEvent('input', {
          value
        }, evnt);
      }
    };
    const inputEvent = evnt => {
      const inputElem = evnt.target;
      const value = inputElem.value;
      emitInputEvent(value, evnt);
    };
    const handleChange = (value, evnt) => {
      reactData.inputValue = value;
      emit('update:modelValue', value);
      passwordInputMethods.dispatchEvent('input', {
        value
      }, evnt);
      if (_xeUtils.default.toValueString(props.modelValue) !== value) {
        passwordInputMethods.dispatchEvent('change', {
          value
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
        }
      }
    };
    const changeEvent = evnt => {
      triggerEvent(evnt);
      $xePasswordInput.dispatchEvent('lazy-change', {
        value: reactData.inputValue
      }, evnt);
      // 自动更新校验状态
      if ($xeForm && formItemInfo) {
        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, reactData.inputValue);
      }
    };
    const focusEvent = evnt => {
      reactData.isActivated = true;
      triggerEvent(evnt);
    };
    const blurEvent = evnt => {
      const {
        inputValue
      } = reactData;
      const value = inputValue;
      $xePasswordInput.dispatchEvent('blur', {
        value
      }, evnt);
      // 自动更新校验状态
      if ($xeForm && formItemInfo) {
        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
      }
    };
    const passwordToggleEvent = evnt => {
      const {
        readonly,
        disabled
      } = props;
      const {
        showPwd
      } = reactData;
      if (!disabled && !readonly) {
        reactData.showPwd = !showPwd;
      }
      $xePasswordInput.dispatchEvent('toggle-visible', {
        visible: reactData.showPwd
      }, evnt);
    };
    const clickEvent = evnt => {
      triggerEvent(evnt);
    };
    const clearValueEvent = (evnt, value) => {
      focus();
      handleChange('', evnt);
      $xePasswordInput.dispatchEvent('clear', {
        value
      }, evnt);
      $xePasswordInput.dispatchEvent('lazy-change', {
        value: reactData.inputValue
      }, evnt);
    };
    const clickSuffixEvent = evnt => {
      const {
        disabled
      } = props;
      if (!disabled) {
        const {
          inputValue
        } = reactData;
        $xePasswordInput.dispatchEvent('suffix-click', {
          value: inputValue
        }, evnt);
      }
    };
    const clickPrefixEvent = evnt => {
      const {
        disabled
      } = props;
      if (!disabled) {
        const {
          inputValue
        } = reactData;
        $xePasswordInput.dispatchEvent('prefix-click', {
          value: inputValue
        }, evnt);
      }
    };
    const renderPasswordIcon = () => {
      const {
        showPwd
      } = reactData;
      return (0, _vue.h)('div', {
        class: 'vxe-password-input--control-icon',
        onClick: passwordToggleEvent
      }, [(0, _vue.h)('i', {
        class: ['vxe-password-input--password-icon', showPwd ? (0, _ui.getIcon)().PASSWORD_INPUT_SHOW_PWD : (0, _ui.getIcon)().PASSWORD_INPUT_HIDE_PWD]
      })]);
    };
    const renderPrefixIcon = () => {
      const {
        prefixIcon
      } = props;
      const prefixSlot = slots.prefix;
      return prefixSlot || prefixIcon ? (0, _vue.h)('div', {
        class: 'vxe-password-input--prefix',
        onClick: clickPrefixEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-password-input--prefix-icon'
      }, prefixSlot ? (0, _vn.getSlotVNs)(prefixSlot({})) : [(0, _vue.h)('i', {
        class: prefixIcon
      })])]) : null;
    };
    const renderSuffixIcon = () => {
      const {
        disabled,
        suffixIcon,
        controls
      } = props;
      const {
        inputValue
      } = reactData;
      const suffixSlot = slots.suffix;
      const isClearable = computeIsClearable.value;
      return isClearable || controls || suffixSlot || suffixIcon ? (0, _vue.h)('div', {
        class: ['vxe-password-input--suffix', {
          'is--clear': isClearable && !disabled && !(inputValue === '' || _xeUtils.default.eqNull(inputValue))
        }]
      }, [isClearable ? (0, _vue.h)('div', {
        class: 'vxe-password-input--clear-icon',
        onClick: clearValueEvent
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().INPUT_CLEAR
      })]) : (0, _ui.renderEmptyElement)($xePasswordInput), controls ? renderPasswordIcon() : (0, _ui.renderEmptyElement)($xePasswordInput), suffixSlot || suffixIcon ? (0, _vue.h)('div', {
        class: 'vxe-password-input--suffix-icon',
        onClick: clickSuffixEvent
      }, suffixSlot ? (0, _vn.getSlotVNs)(suffixSlot({})) : [(0, _vue.h)('i', {
        class: suffixIcon
      })]) : (0, _ui.renderEmptyElement)($xePasswordInput)]) : null;
    };
    passwordInputMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, (0, _ui.createEvent)(evnt, {
          $passwordInput: $xePasswordInput
        }, params));
      },
      focus() {
        const inputElem = refInputTarget.value;
        reactData.isActivated = true;
        inputElem.focus();
        return (0, _vue.nextTick)();
      },
      blur() {
        const inputElem = refInputTarget.value;
        inputElem.blur();
        reactData.isActivated = false;
        return (0, _vue.nextTick)();
      },
      select() {
        const inputElem = refInputTarget.value;
        inputElem.select();
        reactData.isActivated = false;
        return (0, _vue.nextTick)();
      }
    };
    Object.assign($xePasswordInput, passwordInputMethods);
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.inputValue = val;
    });
    const renderVN = () => {
      const {
        className,
        name,
        disabled,
        readonly,
        autocomplete,
        autoComplete,
        maxLength
      } = props;
      const {
        inputValue,
        isActivated
      } = reactData;
      const vSize = computeSize.value;
      const inpReadonly = computeInpReadonly.value;
      const inputType = computeInputType.value;
      const inpPlaceholder = computeInpPlaceholder.value;
      const isClearable = computeIsClearable.value;
      const prefix = renderPrefixIcon();
      const suffix = renderSuffixIcon();
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-password-input', className, {
          [`size--${vSize}`]: vSize,
          'is--prefix': !!prefix,
          'is--suffix': !!suffix,
          'is--readonly': readonly,
          'is--disabled': disabled,
          'is--active': isActivated,
          'show--clear': isClearable && !disabled && !(inputValue === '' || _xeUtils.default.eqNull(inputValue))
        }],
        spellcheck: false
      }, [prefix || (0, _ui.renderEmptyElement)($xePasswordInput), (0, _vue.h)('div', {
        class: 'vxe-password-input--wrapper'
      }, [(0, _vue.h)('input', {
        ref: refInputTarget,
        class: 'vxe-password-input--inner',
        value: inputValue,
        name,
        type: inputType,
        placeholder: inpPlaceholder,
        readonly: inpReadonly,
        disabled,
        autocomplete: autocomplete || autoComplete,
        maxlength: maxLength,
        onClick: clickEvent,
        onInput: inputEvent,
        onChange: changeEvent,
        onFocus: focusEvent,
        onBlur: blurEvent
      })]), suffix || (0, _ui.renderEmptyElement)($xePasswordInput)]);
    };
    $xePasswordInput.renderVN = renderVN;
    return $xePasswordInput;
  },
  render() {
    return this.renderVN();
  }
});