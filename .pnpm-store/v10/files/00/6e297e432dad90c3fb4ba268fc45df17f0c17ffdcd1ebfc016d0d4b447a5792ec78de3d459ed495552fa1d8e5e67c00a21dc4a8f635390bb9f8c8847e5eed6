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
var _dom = require("../../ui/src/dom");
var _vn = require("../../ui/src/vn");
var _util = require("./util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeNumberInput',
  props: {
    modelValue: [String, Number],
    immediate: {
      type: Boolean,
      default: true
    },
    name: String,
    type: {
      type: String,
      default: 'number'
    },
    clearable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().numberInput.clearable
    },
    readonly: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    placeholder: String,
    maxLength: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().numberInput.maxLength
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    align: String,
    form: String,
    className: String,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().numberInput.size || (0, _ui.getConfig)().size
    },
    // number、integer、float
    min: {
      type: [String, Number],
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    step: [String, Number],
    exponential: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().numberInput.exponential
    },
    showCurrency: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().numberInput.showCurrency
    },
    currencySymbol: {
      type: String,
      default: () => (0, _ui.getConfig)().numberInput.currencySymbol
    },
    controlConfig: Object,
    // float
    digits: {
      type: [String, Number],
      default: null
    },
    autoFill: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().numberInput.autoFill
    },
    editable: {
      type: Boolean,
      default: true
    },
    plusIcon: String,
    minusIcon: String,
    prefixIcon: String,
    prefixConfig: Object,
    suffixIcon: String,
    suffixConfig: Object,
    // 已废弃
    controls: {
      type: Boolean,
      default: null
    },
    // 已废弃
    maxlength: [String, Number],
    // 已废弃
    autocomplete: String
  },
  emits: ['update:modelValue', 'input', 'change', 'keydown', 'keyup', 'wheel', 'click', 'focus', 'blur', 'clear', 'lazy-change', 'plus-number', 'minus-number', 'prefix-click', 'suffix-click',
  // 已废弃
  'prev-number', 'next-number'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const formItemInfo = (0, _vue.inject)('xeFormItemInfo', null);
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      isFocus: false,
      isActivated: false,
      inputValue: ''
    });
    const internalData = {
      // dnTimeout: undefined,
      // ainTimeout: undefined,
      // isMouseDown: undefined,
      // isUM: undefined
    };
    const refElem = (0, _vue.ref)();
    const refInputTarget = (0, _vue.ref)();
    const refInputPanel = (0, _vue.ref)();
    const computeFormReadonly = (0, _vue.computed)(() => {
      const {
        readonly
      } = props;
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly;
        }
        return false;
      }
      return readonly;
    });
    const computeIsDisabled = (0, _vue.computed)(() => {
      const {
        disabled
      } = props;
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.disabled;
        }
        return false;
      }
      return disabled;
    });
    const computeDigitsValue = (0, _vue.computed)(() => {
      const {
        type,
        digits
      } = props;
      let defDigits = digits;
      if (defDigits === null) {
        defDigits = (0, _ui.getConfig)().numberInput.digits;
        if (defDigits === null) {
          if (type === 'amount') {
            defDigits = 2;
          }
        }
      }
      return _xeUtils.default.toInteger(defDigits) || 1;
    });
    const computeControlOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().numberInput.controlConfig, props.controlConfig);
    });
    const computePrefixOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().numberInput.prefixConfig, props.prefixConfig);
    });
    const computeSuffixOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().numberInput.suffixConfig, props.suffixConfig);
    });
    const computeDecimalsType = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      return type === 'float' || type === 'amount';
    });
    const computeStepValue = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      const digitsValue = computeDigitsValue.value;
      const decimalsType = computeDecimalsType.value;
      const step = props.step;
      if (type === 'integer') {
        return _xeUtils.default.toInteger(step) || 1;
      } else if (decimalsType) {
        return _xeUtils.default.toNumber(step) || 1 / Math.pow(10, digitsValue);
      }
      return _xeUtils.default.toNumber(step) || 1;
    });
    const computeIsClearable = (0, _vue.computed)(() => {
      return props.clearable;
    });
    const computeInputReadonly = (0, _vue.computed)(() => {
      const {
        editable
      } = props;
      const formReadonly = computeFormReadonly.value;
      return formReadonly || !editable;
    });
    const computeInpPlaceholder = (0, _vue.computed)(() => {
      const {
        placeholder
      } = props;
      if (placeholder) {
        return (0, _utils.getFuncText)(placeholder);
      }
      const globalPlaceholder = (0, _ui.getConfig)().numberInput.placeholder;
      if (globalPlaceholder) {
        return (0, _utils.getFuncText)(globalPlaceholder);
      }
      return (0, _ui.getI18n)('vxe.base.pleaseInput');
    });
    const computeInpMaxLength = (0, _vue.computed)(() => {
      const {
        type,
        maxLength,
        maxlength,
        min,
        max
      } = props;
      const digitsValue = computeDigitsValue.value;
      // 数值最大长度默认限制 16 位，包含小数
      const maxDefLen = 16;
      if (!(0, _utils.eqEmptyValue)(min) && !(0, _utils.eqEmptyValue)(max)) {
        return `${max}`.length + (type === 'integer' ? 0 : digitsValue + 1) + (_xeUtils.default.toNumber(min) >= 0 ? 0 : 1);
      }
      if (maxLength || maxlength) {
        return _xeUtils.default.toNumber(maxLength || maxlength);
      }
      return maxDefLen;
    });
    const computeInpImmediate = (0, _vue.computed)(() => {
      const {
        immediate
      } = props;
      return immediate;
    });
    const computeNumValue = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      const {
        inputValue
      } = reactData;
      return type === 'integer' ? _xeUtils.default.toInteger((0, _util.handleNumber)(inputValue)) : _xeUtils.default.toNumber((0, _util.handleNumber)(inputValue));
    });
    const computeNumLabel = (0, _vue.computed)(() => {
      const {
        type,
        showCurrency,
        currencySymbol,
        autoFill
      } = props;
      const {
        inputValue
      } = reactData;
      const digitsValue = computeDigitsValue.value;
      if (type === 'amount') {
        const num = _xeUtils.default.toNumber(inputValue);
        let amountLabel = _xeUtils.default.commafy(num, {
          digits: digitsValue
        });
        if (!autoFill) {
          const [iStr, dStr] = amountLabel.split('.');
          if (dStr) {
            const dRest = dStr.replace(/0+$/, '');
            amountLabel = dRest ? [iStr, '.', dRest].join('') : iStr;
          }
        }
        if (showCurrency) {
          return `${currencySymbol || (0, _ui.getI18n)('vxe.numberInput.currencySymbol') || ''}${amountLabel}`;
        }
        return amountLabel;
      }
      return _xeUtils.default.toString(inputValue);
    });
    const computeIsDisabledSubtractNumber = (0, _vue.computed)(() => {
      const {
        min
      } = props;
      const {
        inputValue
      } = reactData;
      const numValue = computeNumValue.value;
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && min !== null) {
        return numValue <= _xeUtils.default.toNumber(min);
      }
      return false;
    });
    const computeIsDisabledAddNumber = (0, _vue.computed)(() => {
      const {
        max
      } = props;
      const {
        inputValue
      } = reactData;
      const numValue = computeNumValue.value;
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && max !== null) {
        return numValue >= _xeUtils.default.toNumber(max);
      }
      return false;
    });
    const refMaps = {
      refElem,
      refInput: refInputTarget
    };
    const computeMaps = {
      computeControlOpts
    };
    const $xeNumberInput = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    let numberInputMethods = {};
    const handleNumberString = val => {
      if (_xeUtils.default.eqNull(val)) {
        return '';
      }
      return `${val}`;
    };
    const getNumberValue = val => {
      const {
        exponential,
        autoFill
      } = props;
      const inpMaxLength = computeInpMaxLength.value;
      const digitsValue = computeDigitsValue.value;
      const decimalsType = computeDecimalsType.value;
      let restVal = '';
      if (decimalsType) {
        restVal = (0, _util.toFloatValueFixed)(val, digitsValue);
        if (!autoFill) {
          restVal = handleNumberString(_xeUtils.default.toNumber(restVal));
        }
      } else {
        restVal = handleNumberString(val);
      }
      if (exponential && (val === restVal || handleNumberString(val).toLowerCase() === _xeUtils.default.toNumber(restVal).toExponential())) {
        return val;
      }
      return restVal.slice(0, inpMaxLength);
    };
    const triggerEvent = evnt => {
      const {
        inputValue
      } = reactData;
      numberInputMethods.dispatchEvent(evnt.type, {
        value: inputValue
      }, evnt);
    };
    const handleChange = (val, inputValue, evnt) => {
      const value = (0, _utils.eqEmptyValue)(val) ? null : Number(val);
      const isChange = value !== props.modelValue;
      if (isChange) {
        internalData.isUM = true;
        emit('update:modelValue', value);
      }
      if (reactData.inputValue !== inputValue) {
        (0, _vue.nextTick)(() => {
          reactData.inputValue = inputValue || '';
        });
      }
      numberInputMethods.dispatchEvent('input', {
        value
      }, evnt);
      if (isChange) {
        numberInputMethods.dispatchEvent('change', {
          value
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
        }
      }
    };
    const emitInputEvent = (inputValue, evnt) => {
      const inpImmediate = computeInpImmediate.value;
      const value = (0, _utils.eqEmptyValue)(inputValue) ? null : _xeUtils.default.toNumber(inputValue);
      reactData.inputValue = inputValue;
      if (inpImmediate) {
        handleChange(value, inputValue, evnt);
      } else {
        numberInputMethods.dispatchEvent('input', {
          value
        }, evnt);
      }
    };
    const inputEvent = evnt => {
      const inputElem = evnt.target;
      const value = inputElem.value;
      emitInputEvent(value, evnt);
    };
    const changeEvent = evnt => {
      const inpImmediate = computeInpImmediate.value;
      if (!inpImmediate) {
        triggerEvent(evnt);
      }
      $xeNumberInput.dispatchEvent('lazy-change', {
        value: reactData.inputValue
      }, evnt);
    };
    const focusEvent = evnt => {
      const inputReadonly = computeInputReadonly.value;
      if (!inputReadonly) {
        const {
          inputValue
        } = reactData;
        reactData.inputValue = (0, _utils.eqEmptyValue)(inputValue) ? '' : `${_xeUtils.default.toNumber(inputValue)}`;
        reactData.isFocus = true;
        reactData.isActivated = true;
        triggerEvent(evnt);
      }
    };
    const clickPrefixEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        const {
          inputValue
        } = reactData;
        numberInputMethods.dispatchEvent('prefix-click', {
          value: inputValue
        }, evnt);
      }
    };
    const clearValueEvent = (evnt, value) => {
      focus();
      handleChange(null, '', evnt);
      numberInputMethods.dispatchEvent('clear', {
        value
      }, evnt);
      $xeNumberInput.dispatchEvent('lazy-change', {
        value
      }, evnt);
    };
    const clickSuffixEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        const {
          inputValue
        } = reactData;
        numberInputMethods.dispatchEvent('suffix-click', {
          value: inputValue
        }, evnt);
      }
    };
    const updateModel = val => {
      const {
        autoFill
      } = props;
      const {
        inputValue
      } = reactData;
      const digitsValue = computeDigitsValue.value;
      const decimalsType = computeDecimalsType.value;
      if ((0, _utils.eqEmptyValue)(val)) {
        reactData.inputValue = '';
      } else {
        let textValue = `${val}`;
        if (decimalsType) {
          textValue = (0, _util.toFloatValueFixed)(val, digitsValue);
          if (!autoFill) {
            textValue = `${_xeUtils.default.toNumber(textValue)}`;
          }
        }
        if (textValue !== inputValue) {
          reactData.inputValue = textValue;
        }
      }
    };
    /**
     * 检查初始值
     */
    const initValue = () => {
      const {
        autoFill
      } = props;
      const {
        inputValue
      } = reactData;
      const digitsValue = computeDigitsValue.value;
      const decimalsType = computeDecimalsType.value;
      if (decimalsType) {
        if (inputValue) {
          let textValue = '';
          let validValue = null;
          if (inputValue) {
            textValue = (0, _util.toFloatValueFixed)(inputValue, digitsValue);
            validValue = _xeUtils.default.toNumber(textValue);
            if (!autoFill) {
              textValue = `${validValue}`;
            }
          }
          if (inputValue !== validValue) {
            handleChange(validValue, textValue, {
              type: 'init'
            });
          } else {
            reactData.inputValue = textValue;
          }
        }
      }
    };
    const validMaxNum = num => {
      return props.max === null || props.max === '' || _xeUtils.default.toNumber(num) <= _xeUtils.default.toNumber(props.max);
    };
    const validMinNum = num => {
      return props.min === null || props.min === '' || _xeUtils.default.toNumber(num) >= _xeUtils.default.toNumber(props.min);
    };
    const afterCheckValue = () => {
      const {
        type,
        min,
        max,
        exponential
      } = props;
      const {
        inputValue
      } = reactData;
      const inputReadonly = computeInputReadonly.value;
      if (!inputReadonly) {
        if ((0, _utils.eqEmptyValue)(inputValue)) {
          let inpNumVal = null;
          let inpValue = inputValue;
          if (min || min === 0) {
            inpNumVal = _xeUtils.default.toNumber(min);
            inpValue = `${inpNumVal}`;
          }
          handleChange(inpNumVal, `${inpValue || ''}`, {
            type: 'check'
          });
          return;
        }
        if (inputValue || min || max) {
          let inpNumVal = type === 'integer' ? _xeUtils.default.toInteger((0, _util.handleNumber)(inputValue)) : _xeUtils.default.toNumber((0, _util.handleNumber)(inputValue));
          if (!validMinNum(inpNumVal)) {
            inpNumVal = min;
          } else if (!validMaxNum(inpNumVal)) {
            inpNumVal = max;
          }
          if (exponential) {
            const inpStringVal = handleNumberString(inputValue).toLowerCase();
            if (inpStringVal === _xeUtils.default.toNumber(inpNumVal).toExponential()) {
              inpNumVal = inpStringVal;
            }
          }
          const inpValue = getNumberValue(inpNumVal);
          handleChange((0, _utils.eqEmptyValue)(inpValue) ? null : Number(inpValue), inpValue, {
            type: 'check'
          });
        }
      }
    };
    const blurEvent = evnt => {
      const {
        inputValue
      } = reactData;
      const inpImmediate = computeInpImmediate.value;
      const value = inputValue ? Number(inputValue) : null;
      if (!inpImmediate) {
        handleChange(value, handleNumberString(inputValue), evnt);
      }
      afterCheckValue();
      reactData.isFocus = false;
      reactData.isActivated = false;
      numberInputMethods.dispatchEvent('blur', {
        value
      }, evnt);
      // 自动更新校验状态
      if ($xeForm && formItemInfo) {
        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
      }
    };
    // 数值
    const numberChange = (isPlus, evnt) => {
      const {
        min,
        max,
        type
      } = props;
      const {
        inputValue
      } = reactData;
      const stepValue = computeStepValue.value;
      const numValue = type === 'integer' ? _xeUtils.default.toInteger((0, _util.handleNumber)(inputValue)) : _xeUtils.default.toNumber((0, _util.handleNumber)(inputValue));
      const newValue = isPlus ? _xeUtils.default.add(numValue, stepValue) : _xeUtils.default.subtract(numValue, stepValue);
      let restNum;
      if (!validMinNum(newValue)) {
        restNum = min;
      } else if (!validMaxNum(newValue)) {
        restNum = max;
      } else {
        restNum = newValue;
      }
      emitInputEvent(getNumberValue(restNum), evnt);
    };
    const numberPlusEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      const formReadonly = computeFormReadonly.value;
      const isDisabledAddNumber = computeIsDisabledAddNumber.value;
      if (!isDisabled && !formReadonly && !isDisabledAddNumber) {
        numberChange(true, evnt);
      }
      reactData.isActivated = true;
      numberInputMethods.dispatchEvent('plus-number', {
        value: reactData.inputValue
      }, evnt);
      $xeNumberInput.dispatchEvent('lazy-change', {
        value: reactData.inputValue
      }, evnt);
      // 已废弃
      numberInputMethods.dispatchEvent('next-number', {
        value: reactData.inputValue
      }, evnt);
    };
    const numberMinusEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      const formReadonly = computeFormReadonly.value;
      const isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value;
      if (!isDisabled && !formReadonly && !isDisabledSubtractNumber) {
        numberChange(false, evnt);
      }
      reactData.isActivated = true;
      numberInputMethods.dispatchEvent('minus-number', {
        value: reactData.inputValue
      }, evnt);
      $xeNumberInput.dispatchEvent('lazy-change', {
        value: reactData.inputValue
      }, evnt);
      // 已废弃
      numberInputMethods.dispatchEvent('prev-number', {
        value: reactData.inputValue
      }, evnt);
    };
    const numberKeydownEvent = evnt => {
      const isUpArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_UP);
      const isDwArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_DOWN);
      if (isUpArrow || isDwArrow) {
        evnt.preventDefault();
        if (isUpArrow) {
          numberPlusEvent(evnt);
        } else {
          numberMinusEvent(evnt);
        }
      }
    };
    const keydownEvent = evnt => {
      const {
        type,
        exponential,
        controls
      } = props;
      const controlOpts = computeControlOpts.value;
      const {
        isArrow
      } = controlOpts;
      const inputReadonly = computeInputReadonly.value;
      const isControlKey = (0, _dom.hasControlKey)(evnt);
      const isShiftKey = evnt.shiftKey;
      const isAltKey = evnt.altKey;
      const keyCode = evnt.keyCode;
      const isEsc = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ESCAPE);
      const isUpArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_UP);
      const isDwArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_DOWN);
      if (!isControlKey && !isShiftKey && !isAltKey) {
        if (_ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.SPACEBAR) || type === 'integer' && keyCode === 110 || (!exponential || keyCode !== 69) && keyCode >= 65 && keyCode <= 90 || keyCode >= 186 && keyCode <= 188 || keyCode >= 191) {
          evnt.preventDefault();
        }
      }
      if (isEsc) {
        afterCheckValue();
      } else if (isUpArrow || isDwArrow) {
        if ((0, _utils.isEnableConf)(controlOpts) && (controls === false ? controls : isArrow) && !inputReadonly) {
          numberKeydownEvent(evnt);
        }
      }
      triggerEvent(evnt);
    };
    const keyupEvent = evnt => {
      triggerEvent(evnt);
    };
    // 数值
    const stopDown = () => {
      const {
        dnTimeout
      } = internalData;
      if (dnTimeout) {
        clearTimeout(dnTimeout);
        internalData.dnTimeout = undefined;
      }
    };
    const stopAutoIncrement = () => {
      const {
        ainTimeout
      } = internalData;
      if (ainTimeout) {
        clearTimeout(ainTimeout);
        internalData.ainTimeout = undefined;
      }
    };
    const numberDownMinusEvent = evnt => {
      numberStopAll();
      internalData.ainTimeout = setTimeout(() => {
        numberMinusEvent(evnt);
        numberDownMinusEvent(evnt);
      }, 60);
    };
    const numberDownPlusEvent = evnt => {
      numberStopAll();
      internalData.ainTimeout = setTimeout(() => {
        numberPlusEvent(evnt);
        numberDownPlusEvent(evnt);
      }, 60);
    };
    const numberStopAll = () => {
      stopDown();
      stopAutoIncrement();
    };
    const numberClickEvent = evnt => {
      if (internalData.isMouseDown) {
        internalData.isMouseDown = false;
      } else {
        numberStopAll();
        const isAddNumber = (0, _dom.hasClass)(evnt.currentTarget, 'is--plus');
        if (isAddNumber) {
          numberPlusEvent(evnt);
        } else {
          numberMinusEvent(evnt);
        }
      }
    };
    const numberMousedownEvent = evnt => {
      numberStopAll();
      internalData.isMouseDown = true;
      if (evnt.button === 0) {
        const isAddNumber = (0, _dom.hasClass)(evnt.currentTarget, 'is--plus');
        if (isAddNumber) {
          numberPlusEvent(evnt);
        } else {
          numberMinusEvent(evnt);
        }
        internalData.dnTimeout = setTimeout(() => {
          if (isAddNumber) {
            numberDownPlusEvent(evnt);
          } else {
            numberDownMinusEvent(evnt);
          }
        }, 500);
      }
    };
    const wheelEvent = evnt => {
      const {
        controls
      } = props;
      const controlOpts = computeControlOpts.value;
      const {
        isWheel
      } = controlOpts;
      const inputReadonly = computeInputReadonly.value;
      if ((0, _utils.isEnableConf)(controlOpts) && (controls === false ? controls : isWheel) && !inputReadonly) {
        if (reactData.isActivated) {
          evnt.stopPropagation();
          evnt.preventDefault();
          const delta = evnt.deltaY;
          if (delta > 0) {
            // 向下
            numberMinusEvent(evnt);
          } else if (delta < 0) {
            // 向上
            numberPlusEvent(evnt);
          }
        }
      }
      triggerEvent(evnt);
    };
    const clickEvent = evnt => {
      triggerEvent(evnt);
    };
    // 全局事件
    const handleGlobalMousedownEvent = evnt => {
      const {
        isActivated
      } = reactData;
      const el = refElem.value;
      const panelElem = refInputPanel.value;
      const isDisabled = computeIsDisabled.value;
      const inputReadonly = computeInputReadonly.value;
      const inpImmediate = computeInpImmediate.value;
      if (!isDisabled && !inputReadonly && isActivated) {
        reactData.isActivated = (0, _dom.getEventTargetNode)(evnt, el).flag || (0, _dom.getEventTargetNode)(evnt, panelElem).flag;
        if (!reactData.isActivated) {
          if (!inpImmediate) {
            const {
              inputValue
            } = reactData;
            const value = inputValue ? Number(inputValue) : null;
            handleChange(value, handleNumberString(inputValue), evnt);
          }
          afterCheckValue();
        }
      }
    };
    const handleGlobalKeydownEvent = evnt => {
      const {
        clearable
      } = props;
      const isDisabled = computeIsDisabled.value;
      const inputReadonly = computeInputReadonly.value;
      if (!isDisabled && !inputReadonly) {
        const isTab = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.TAB);
        const isDel = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.DELETE);
        let isActivated = reactData.isActivated;
        if (isTab) {
          if (isActivated) {
            afterCheckValue();
          }
          isActivated = false;
          reactData.isActivated = isActivated;
        }
        if (isDel && clearable) {
          if (isActivated) {
            clearValueEvent(evnt, null);
          }
        }
      }
    };
    const handleGlobalBlurEvent = () => {
      const {
        isActivated
      } = reactData;
      if (isActivated) {
        afterCheckValue();
      }
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $numberInput: $xeNumberInput
      }, params));
    };
    numberInputMethods = {
      dispatchEvent,
      focus() {
        const inputReadonly = computeInputReadonly.value;
        if (!inputReadonly) {
          const inputElem = refInputTarget.value;
          reactData.isActivated = true;
          inputElem.focus();
        }
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
    Object.assign($xeNumberInput, numberInputMethods);
    const renderPrefixIcon = () => {
      const {
        prefixIcon
      } = props;
      const prefixOpts = computePrefixOpts.value;
      const prefixSlot = slots.prefix;
      const preIcon = prefixIcon || prefixOpts.icon;
      const sufContent = prefixOpts.content;
      return prefixSlot || preIcon || sufContent ? (0, _vue.h)('div', {
        class: 'vxe-number-input--prefix',
        onClick: clickPrefixEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-number-input--prefix-icon'
      }, prefixSlot ? (0, _vn.getSlotVNs)(prefixSlot({})) : [preIcon ? (0, _vue.h)('i', {
        class: preIcon
      }) : (0, _ui.renderEmptyElement)($xeNumberInput), sufContent ? (0, _vue.h)('span', {
        class: 'vxe-prefix-input--suffix-text'
      }, `${sufContent}`) : (0, _ui.renderEmptyElement)($xeNumberInput)])]) : (0, _ui.renderEmptyElement)($xeNumberInput);
    };
    const renderSuffixIcon = () => {
      const {
        suffixIcon
      } = props;
      const {
        inputValue
      } = reactData;
      const suffixSlot = slots.suffix;
      const suffixOpts = computeSuffixOpts.value;
      const isDisabled = computeIsDisabled.value;
      const isClearable = computeIsClearable.value;
      const sufIcon = suffixIcon || suffixOpts.icon;
      const sufContent = suffixOpts.content;
      return (0, _vue.h)('div', {
        class: ['vxe-number-input--suffix', {
          'is--clear': isClearable && !isDisabled && !(inputValue === '' || _xeUtils.default.eqNull(inputValue))
        }]
      }, [isClearable ? (0, _vue.h)('div', {
        class: 'vxe-number-input--clear-icon',
        onClick: clearValueEvent
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().INPUT_CLEAR
      })]) : (0, _ui.renderEmptyElement)($xeNumberInput), suffixSlot || sufIcon || sufContent ? (0, _vue.h)('div', {
        class: 'vxe-number-input--suffix-icon',
        onClick: clickSuffixEvent
      }, suffixSlot ? (0, _vn.getSlotVNs)(suffixSlot({})) : [sufIcon ? (0, _vue.h)('i', {
        class: sufIcon
      }) : (0, _ui.renderEmptyElement)($xeNumberInput), sufContent ? (0, _vue.h)('span', {
        class: 'vxe-number-input--suffix-text'
      }, `${sufContent}`) : (0, _ui.renderEmptyElement)($xeNumberInput)]) : (0, _ui.renderEmptyElement)($xeNumberInput)]);
    };
    const renderInput = () => {
      const {
        type,
        name,
        autocomplete,
        autoComplete
      } = props;
      const {
        inputValue,
        isFocus
      } = reactData;
      const isDisabled = computeIsDisabled.value;
      const numLabel = computeNumLabel.value;
      const inputReadonly = computeInputReadonly.value;
      const inpMaxLength = computeInpMaxLength.value;
      const inpPlaceholder = computeInpPlaceholder.value;
      return (0, _vue.h)('div', {
        key: 'ni',
        class: 'vxe-number-input--input-wrapper'
      }, [renderPrefixIcon(), (0, _vue.h)('div', {
        class: 'vxe-number-input--input-inner'
      }, [(0, _vue.h)('input', {
        ref: refInputTarget,
        class: 'vxe-number-input--input',
        value: !isFocus && type === 'amount' ? numLabel : inputValue,
        name,
        type: 'text',
        placeholder: inpPlaceholder,
        maxlength: inpMaxLength,
        readonly: inputReadonly,
        disabled: isDisabled,
        autocomplete: autoComplete || autocomplete,
        onKeydown: keydownEvent,
        onKeyup: keyupEvent,
        onClick: clickEvent,
        onInput: inputEvent,
        onChange: changeEvent,
        onFocus: focusEvent,
        onBlur: blurEvent
      })]), renderSuffixIcon()]);
    };
    const renderMinusBtn = () => {
      const {
        minusIcon
      } = props;
      const isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value;
      return (0, _vue.h)('button', {
        key: 'prev',
        class: ['vxe-number-input--minus-btn is--minus', {
          'is--disabled': isDisabledSubtractNumber
        }],
        type: 'button',
        onClick: numberClickEvent,
        onMousedown: numberMousedownEvent,
        onMouseup: numberStopAll,
        onMouseleave: numberStopAll
      }, [(0, _vue.h)('i', {
        class: minusIcon || (0, _ui.getIcon)().NUMBER_INPUT_MINUS_NUM
      })]);
    };
    const renderPlusBtn = () => {
      const {
        plusIcon
      } = props;
      const isDisabledAddNumber = computeIsDisabledAddNumber.value;
      return (0, _vue.h)('button', {
        key: 'next',
        class: ['vxe-number-input--plus-btn is--plus', {
          'is--disabled': isDisabledAddNumber
        }],
        type: 'button',
        onClick: numberClickEvent,
        onMousedown: numberMousedownEvent,
        onMouseup: numberStopAll,
        onMouseleave: numberStopAll
      }, [(0, _vue.h)('i', {
        class: plusIcon || (0, _ui.getIcon)().NUMBER_INPUT_PLUS_NUM
      })]);
    };
    const renderSideControl = () => {
      return (0, _vue.h)('div', {
        key: 'cplr',
        class: 'vxe-number-input--side-control'
      }, [renderPlusBtn(), renderMinusBtn()]);
    };
    const renderVN = () => {
      const {
        className,
        controls,
        type,
        align,
        prefixIcon,
        suffixIcon
      } = props;
      const {
        inputValue,
        isActivated
      } = reactData;
      const vSize = computeSize.value;
      const controlOpts = computeControlOpts.value;
      const {
        layout,
        showButton
      } = controlOpts;
      const isDisabled = computeIsDisabled.value;
      const formReadonly = computeFormReadonly.value;
      const numLabel = computeNumLabel.value;
      const prefixSlot = slots.prefix;
      const suffixSlot = slots.suffix;
      if (formReadonly) {
        return (0, _vue.h)('div', {
          ref: refElem,
          class: ['vxe-number-input--readonly', `type--${type}`, className]
        }, numLabel);
      }
      const inputReadonly = computeInputReadonly.value;
      const isClearable = computeIsClearable.value;
      const isControls = (0, _utils.isEnableConf)(controlOpts) && (controls === false ? controls : showButton);
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-number-input', `type--${type}`, `ctl--${layout === 'right' || layout === 'left' ? layout : 'default'}`, className, {
          [`size--${vSize}`]: vSize,
          [`is--${align}`]: align,
          'is--controls': isControls && !inputReadonly,
          'is--prefix': !!prefixSlot || prefixIcon,
          'is--suffix': !!suffixSlot || suffixIcon,
          'is--disabled': isDisabled,
          'is--active': isActivated,
          'show--clear': isClearable && !isDisabled && !(inputValue === '' || _xeUtils.default.eqNull(inputValue))
        }],
        spellcheck: false
      }, isControls ? layout === 'right' ? [renderInput(), renderSideControl()] : layout === 'left' ? [renderSideControl(), renderInput()] : [renderMinusBtn(), renderInput(), renderPlusBtn()] : [renderInput()]);
    };
    $xeNumberInput.renderVN = renderVN;
    (0, _vue.watch)(() => props.modelValue, val => {
      if (!internalData.isUM) {
        updateModel(val);
      }
      internalData.isUM = false;
    });
    (0, _vue.watch)(() => props.type, () => {
      // 切换类型是重置内置变量
      Object.assign(reactData, {
        inputValue: props.modelValue
      });
      initValue();
    });
    (0, _vue.onMounted)(() => {
      updateModel(props.modelValue);
      const targetElem = refInputTarget.value;
      if (targetElem) {
        targetElem.addEventListener('wheel', wheelEvent, {
          passive: false
        });
      }
      _ui.globalEvents.on($xeNumberInput, 'mousedown', handleGlobalMousedownEvent);
      _ui.globalEvents.on($xeNumberInput, 'keydown', handleGlobalKeydownEvent);
      _ui.globalEvents.on($xeNumberInput, 'blur', handleGlobalBlurEvent);
    });
    (0, _vue.onBeforeUnmount)(() => {
      reactData.isFocus = false;
      numberStopAll();
      afterCheckValue();
      const targetElem = refInputTarget.value;
      if (targetElem) {
        targetElem.removeEventListener('wheel', wheelEvent);
      }
      _ui.globalEvents.off($xeNumberInput, 'mousedown');
      _ui.globalEvents.off($xeNumberInput, 'keydown');
      _ui.globalEvents.off($xeNumberInput, 'blur');
    });
    initValue();
    return $xeNumberInput;
  },
  render() {
    return this.renderVN();
  }
});