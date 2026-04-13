"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _radio = _interopRequireDefault(require("./radio"));
var _button = _interopRequireDefault(require("./button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createInternalData() {
  return {
    // isLoaded: false
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeRadioGroup',
  props: {
    modelValue: [String, Number, Boolean],
    disabled: {
      type: Boolean,
      default: null
    },
    type: String,
    options: Array,
    optionProps: Object,
    strict: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().radioGroup.strict
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().radioGroup.size || (0, _ui.getConfig)().size
    },
    defaultConfig: Object
  },
  emits: ['update:modelValue', 'change', 'default-change'],
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
    const reactData = (0, _vue.reactive)({});
    const internalData = createInternalData();
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
    const computeDefaultOpts = (0, _vue.computed)(() => {
      return Object.assign({}, props.defaultConfig);
    });
    const computeMaps = {
      computeIsDisabled
    };
    const $xeRadioGroup = {
      xID,
      props,
      context,
      reactData,
      name: _xeUtils.default.uniqueId('xe_group_'),
      getComputeMaps: () => computeMaps
    };
    const computePropsOpts = (0, _vue.computed)(() => {
      return Object.assign({}, props.optionProps);
    });
    const computeLabelField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.label || 'label';
    });
    const computeValueField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.value || 'value';
    });
    const computeDisabledField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.disabled || 'disabled';
    });
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const emitDefaultValue = value => {
      emitModel(value);
      dispatchEvent('default-change', {
        value
      }, null);
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $radioGroup: $xeRadioGroup
      }, params));
    };
    const radioGroupMethods = {
      dispatchEvent
    };
    const radioGroupPrivateMethods = {
      handleChecked(params, evnt) {
        const {
          checkedValue,
          checkedLabel
        } = params;
        const value = checkedValue;
        emitModel(value);
        dispatchEvent('change', {
          value,
          label: value,
          checkedValue,
          checkedLabel
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
        }
      }
    };
    const loadData = datas => {
      const {
        isLoaded
      } = internalData;
      const defaultOpts = computeDefaultOpts.value;
      const valueField = computeValueField.value;
      if (!isLoaded) {
        const {
          selectMode
        } = defaultOpts;
        if (datas.length > 0 && _xeUtils.default.eqNull(props.modelValue)) {
          if (selectMode === 'first' || selectMode === 'last') {
            const selectItem = _xeUtils.default[selectMode](datas);
            if (selectItem) {
              (0, _vue.nextTick)(() => {
                if (_xeUtils.default.eqNull(props.modelValue)) {
                  emitDefaultValue(selectItem[valueField]);
                }
              });
            }
          }
          internalData.isLoaded = true;
        }
      }
      return (0, _vue.nextTick)();
    };
    Object.assign($xeRadioGroup, radioGroupMethods, radioGroupPrivateMethods);
    const renderVN = () => {
      const {
        options,
        type
      } = props;
      const vSize = computeSize.value;
      const defaultSlot = slots.default;
      const valueField = computeValueField.value;
      const labelField = computeLabelField.value;
      const disabledField = computeDisabledField.value;
      const btnComp = type === 'button' ? _button.default : _radio.default;
      return (0, _vue.h)('div', {
        class: ['vxe-radio-group', {
          [`size--${vSize}`]: vSize
        }]
      }, defaultSlot ? defaultSlot({}) : options ? options.map(item => {
        return (0, _vue.h)(btnComp, {
          key: item[valueField],
          checkedValue: item[valueField],
          content: item[labelField],
          disabled: item[disabledField]
        });
      }) : []);
    };
    (0, _vue.watch)(() => props.options, val => {
      loadData(val || []);
    });
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        const {
          options
        } = props;
        if (options) {
          loadData(options);
        }
      });
    });
    (0, _vue.onUnmounted)(() => {
      _xeUtils.default.assign(internalData, createInternalData());
    });
    (0, _vue.provide)('$xeRadioGroup', $xeRadioGroup);
    $xeRadioGroup.renderVN = renderVN;
    return $xeRadioGroup;
  },
  render() {
    return this.renderVN();
  }
});