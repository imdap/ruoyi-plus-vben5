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
let autoTxtElem;
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTextarea',
  props: {
    modelValue: [String, Number],
    className: String,
    immediate: {
      type: Boolean,
      default: true
    },
    name: String,
    readonly: {
      type: Boolean,
      default: null
    },
    editable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: null
    },
    placeholder: String,
    maxLength: [String, Number],
    trim: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().textarea.trim
    },
    rows: {
      type: [String, Number],
      default: null
    },
    cols: {
      type: [String, Number],
      default: null
    },
    showWordCount: Boolean,
    countMethod: Function,
    autosize: [Boolean, Object],
    form: String,
    resize: {
      type: String,
      default: () => (0, _ui.getConfig)().textarea.resize
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().textarea.size || (0, _ui.getConfig)().size
    },
    // 已废弃
    maxlength: [String, Number]
  },
  emits: ['update:modelValue', 'input', 'keydown', 'keyup', 'click', 'change', 'focus', 'blur', 'lazy-change'],
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
      inputValue: props.modelValue
    });
    const refElem = (0, _vue.ref)();
    const refTextarea = (0, _vue.ref)();
    const refMaps = {
      refElem,
      refTextarea
    };
    const $xeTextarea = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    };
    let textareaMethods = {};
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
    const computeInputReadonly = (0, _vue.computed)(() => {
      const {
        editable,
        readonly
      } = props;
      return readonly || !editable;
    });
    const computeInpPlaceholder = (0, _vue.computed)(() => {
      const {
        placeholder
      } = props;
      if (placeholder) {
        return (0, _utils.getFuncText)(placeholder);
      }
      const globalPlaceholder = (0, _ui.getConfig)().textarea.placeholder;
      if (globalPlaceholder) {
        return (0, _utils.getFuncText)(globalPlaceholder);
      }
      return (0, _ui.getI18n)('vxe.base.pleaseInput');
    });
    const computeInpMaxLength = (0, _vue.computed)(() => {
      const {
        maxLength,
        maxlength
      } = props;
      return maxLength || maxlength;
    });
    const computeInputCount = (0, _vue.computed)(() => {
      return _xeUtils.default.getSize(reactData.inputValue);
    });
    const computeIsCountError = (0, _vue.computed)(() => {
      const inputCount = computeInputCount.value;
      const inpMaxLength = computeInpMaxLength.value;
      return inpMaxLength && inputCount > _xeUtils.default.toNumber(inpMaxLength);
    });
    const computeSizeOpts = (0, _vue.computed)(() => {
      return Object.assign({
        minRows: 1,
        maxRows: 10
      }, (0, _ui.getConfig)().textarea.autosize, props.autosize);
    });
    const updateAutoTxt = () => {
      const {
        size,
        autosize
      } = props;
      const {
        inputValue
      } = reactData;
      if (autosize) {
        if (!autoTxtElem) {
          autoTxtElem = document.createElement('div');
        }
        if (!autoTxtElem.parentNode) {
          document.body.appendChild(autoTxtElem);
        }
        const textElem = refTextarea.value;
        if (!textElem) {
          return;
        }
        const textStyle = getComputedStyle(textElem);
        autoTxtElem.className = ['vxe-textarea--autosize', size ? `size--${size}` : ''].join(' ');
        autoTxtElem.style.width = `${textElem.clientWidth}px`;
        autoTxtElem.style.padding = textStyle.padding;
        autoTxtElem.innerText = ('' + (inputValue || '　')).replace(/\n$/, '\n　');
      }
    };
    const handleResize = () => {
      if (props.autosize) {
        (0, _vue.nextTick)(() => {
          const sizeOpts = computeSizeOpts.value;
          const {
            minRows,
            maxRows
          } = sizeOpts;
          const textElem = refTextarea.value;
          if (!textElem) {
            return;
          }
          const sizeHeight = autoTxtElem.clientHeight;
          const textStyle = getComputedStyle(textElem);
          const lineHeight = _xeUtils.default.toNumber(textStyle.lineHeight);
          const paddingTop = _xeUtils.default.toNumber(textStyle.paddingTop);
          const paddingBottom = _xeUtils.default.toNumber(textStyle.paddingBottom);
          const borderTopWidth = _xeUtils.default.toNumber(textStyle.borderTopWidth);
          const borderBottomWidth = _xeUtils.default.toNumber(textStyle.borderBottomWidth);
          const intervalHeight = paddingTop + paddingBottom + borderTopWidth + borderBottomWidth;
          const rowNum = (sizeHeight - intervalHeight) / lineHeight;
          const textRows = rowNum && /[0-9]/.test('' + rowNum) ? rowNum : Math.floor(rowNum) + 1;
          let vaildRows = textRows;
          if (textRows < minRows) {
            vaildRows = minRows;
          } else if (textRows > maxRows) {
            vaildRows = maxRows;
          }
          textElem.style.height = `${vaildRows * lineHeight + intervalHeight}px`;
        });
      }
    };
    const triggerEvent = evnt => {
      const value = reactData.inputValue;
      $xeTextarea.dispatchEvent(evnt.type, {
        value
      }, evnt);
    };
    const handleChange = (value, evnt) => {
      if (props.trim) {
        value = `${value || ''}`.trim();
      }
      reactData.inputValue = value;
      emit('update:modelValue', value);
      if (_xeUtils.default.toValueString(props.modelValue) !== value) {
        textareaMethods.dispatchEvent('change', {
          value
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
        }
      }
    };
    const inputEvent = evnt => {
      const {
        immediate
      } = props;
      const textElem = evnt.target;
      const value = textElem.value;
      reactData.inputValue = value;
      if (immediate) {
        handleChange(value, evnt);
      }
      $xeTextarea.dispatchEvent('input', {
        value
      }, evnt);
      handleResize();
    };
    const changeEvent = evnt => {
      const {
        immediate
      } = props;
      if (immediate) {
        triggerEvent(evnt);
      } else {
        handleChange(reactData.inputValue, evnt);
      }
      $xeTextarea.dispatchEvent('lazy-change', {
        value: reactData.inputValue
      }, evnt);
    };
    const blurEvent = evnt => {
      const {
        immediate
      } = props;
      const {
        inputValue
      } = reactData;
      if (!immediate) {
        handleChange(inputValue, evnt);
      }
      $xeTextarea.dispatchEvent('blur', {
        value: inputValue
      }, evnt);
    };
    textareaMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, (0, _ui.createEvent)(evnt, {
          $textarea: $xeTextarea
        }, params));
      },
      focus() {
        const textElem = refTextarea.value;
        textElem.focus();
        return (0, _vue.nextTick)();
      },
      blur() {
        const textElem = refTextarea.value;
        textElem.blur();
        return (0, _vue.nextTick)();
      }
    };
    Object.assign($xeTextarea, textareaMethods);
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.inputValue = val;
      updateAutoTxt();
    });
    (0, _vue.watch)(computeSizeOpts, () => {
      updateAutoTxt();
      handleResize();
    });
    (0, _vue.nextTick)(() => {
      const {
        autosize
      } = props;
      if (autosize) {
        updateAutoTxt();
        handleResize();
      }
    });
    const renderVN = () => {
      const {
        className,
        resize,
        autosize,
        showWordCount,
        countMethod,
        rows,
        cols
      } = props;
      const {
        inputValue
      } = reactData;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const isCountError = computeIsCountError.value;
      const inputCount = computeInputCount.value;
      const inputReadonly = computeInputReadonly.value;
      const formReadonly = computeFormReadonly.value;
      const inpPlaceholder = computeInpPlaceholder.value;
      const inpMaxLength = computeInpMaxLength.value;
      if (formReadonly) {
        return (0, _vue.h)('div', {
          ref: refElem,
          class: ['vxe-textarea--readonly', className]
        }, inputValue);
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-textarea', className, {
          [`size--${vSize}`]: vSize,
          'is--autosize': autosize,
          'is--count': showWordCount,
          'is--disabled': isDisabled,
          'is--rows': !_xeUtils.default.eqNull(rows),
          'is--cols': !_xeUtils.default.eqNull(cols)
        }],
        spellcheck: false
      }, [(0, _vue.h)('textarea', {
        ref: refTextarea,
        class: 'vxe-textarea--inner',
        value: inputValue,
        name: props.name,
        placeholder: inpPlaceholder,
        maxlength: inpMaxLength,
        readonly: inputReadonly,
        disabled: isDisabled,
        rows,
        cols,
        style: resize ? {
          resize
        } : null,
        onInput: inputEvent,
        onChange: changeEvent,
        onKeydown: triggerEvent,
        onKeyup: triggerEvent,
        onClick: triggerEvent,
        onFocus: triggerEvent,
        onBlur: blurEvent
      }), showWordCount ? (0, _vue.h)('span', {
        class: ['vxe-textarea--count', {
          'is--error': isCountError
        }]
      }, countMethod ? `${countMethod({
        value: inputValue
      })}` : `${inputCount}${inpMaxLength ? `/${inpMaxLength}` : ''}`) : null]);
    };
    $xeTextarea.renderVN = renderVN;
    return $xeTextarea;
  },
  render() {
    return this.renderVN();
  }
});