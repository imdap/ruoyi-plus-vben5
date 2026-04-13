"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _checkbox = _interopRequireDefault(require("./checkbox"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createInternalData() {
  return {
    // isLoaded: false
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeCheckboxGroup',
  props: {
    modelValue: Array,
    options: Array,
    optionProps: Object,
    disabled: {
      type: Boolean,
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().checkboxGroup.size || (0, _ui.getConfig)().size
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
    const computeIsMaximize = (0, _vue.computed)(() => {
      const {
        modelValue,
        max
      } = props;
      if (max) {
        return (modelValue ? modelValue.length : 0) >= _xeUtils.default.toNumber(max);
      }
      return false;
    });
    const computeDefaultOpts = (0, _vue.computed)(() => {
      return Object.assign({}, props.defaultConfig);
    });
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
    const computeMaps = {
      computeIsMaximize,
      computeIsDisabled
    };
    const $xeCheckboxGroup = {
      xID,
      props,
      context,
      reactData,
      getComputeMaps: () => computeMaps
    };
    (0, _ui.useSize)(props);
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $checkboxGroup: $xeCheckboxGroup
      }, params));
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const emitDefaultValue = value => {
      emitModel(value);
      dispatchEvent('default-change', {
        value
      }, null);
    };
    const checkboxGroupMethods = {
      dispatchEvent
    };
    const checkboxGroupPrivateMethods = {
      handleChecked(params, evnt) {
        const {
          checked,
          label
        } = params;
        const checklist = props.modelValue || [];
        const checkIndex = checklist.indexOf(label);
        if (checked) {
          if (checkIndex === -1) {
            checklist.push(label);
          }
        } else {
          checklist.splice(checkIndex, 1);
        }
        emitModel(checklist);
        $xeCheckboxGroup.dispatchEvent('change', Object.assign({}, params, {
          checklist,
          value: checklist
        }), evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, checklist);
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
          if (selectMode === 'all') {
            (0, _vue.nextTick)(() => {
              emitDefaultValue(datas.map(item => item[valueField]));
            });
          } else if (selectMode === 'first' || selectMode === 'last') {
            const selectItem = _xeUtils.default[selectMode](datas);
            if (selectItem) {
              (0, _vue.nextTick)(() => {
                if (_xeUtils.default.eqNull(props.modelValue)) {
                  emitDefaultValue([selectItem[valueField]]);
                }
              });
            }
          }
          internalData.isLoaded = true;
        }
      }
      return (0, _vue.nextTick)();
    };
    Object.assign($xeCheckboxGroup, checkboxGroupMethods, checkboxGroupPrivateMethods);
    const renderVN = () => {
      const {
        options
      } = props;
      const defaultSlot = slots.default;
      const valueField = computeValueField.value;
      const labelField = computeLabelField.value;
      const disabledField = computeDisabledField.value;
      return (0, _vue.h)('div', {
        class: 'vxe-checkbox-group'
      }, defaultSlot ? defaultSlot({}) : options ? options.map(item => {
        return (0, _vue.h)(_checkbox.default, {
          key: item[valueField],
          label: item[valueField],
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
    (0, _vue.provide)('$xeCheckboxGroup', $xeCheckboxGroup);
    $xeCheckboxGroup.renderVN = renderVN;
    return renderVN;
  }
});