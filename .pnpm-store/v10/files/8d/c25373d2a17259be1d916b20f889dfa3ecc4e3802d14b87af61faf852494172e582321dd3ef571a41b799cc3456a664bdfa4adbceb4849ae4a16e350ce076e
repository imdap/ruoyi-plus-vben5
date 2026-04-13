"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeRate',
  props: {
    modelValue: [Number, String],
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
      default: () => (0, _ui.getConfig)().rate.size || (0, _ui.getConfig)().size
    },
    status: String
  },
  emits: ['update:modelValue', 'change'],
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
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      activeValue: null
    });
    const refMaps = {
      refElem
    };
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
    const computeNumVal = (0, _vue.computed)(() => {
      const {
        modelValue
      } = props;
      const {
        activeValue
      } = reactData;
      return _xeUtils.default.toNumber(activeValue === null ? modelValue : activeValue);
    });
    const computeItemList = (0, _vue.computed)(() => {
      return [1, 2, 3, 4, 5].map(num => {
        return {
          value: num,
          label: num
        };
      });
    });
    const computeMaps = {};
    const $xeRate = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $rate: $xeRate
      }, params));
    };
    const collapsePaneMethods = {
      dispatchEvent
    };
    const collapsePanePrivateMethods = {};
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const mouseenterEvent = (evnt, item) => {
      const isDisabled = computeIsDisabled.value;
      const isReadonly = computeIsReadonly.value;
      if (!(isDisabled || isReadonly)) {
        const value = item.value;
        reactData.activeValue = value;
      }
    };
    const mouseleaveEvent = () => {
      reactData.activeValue = null;
    };
    const clickEvent = (evnt, item) => {
      const isDisabled = computeIsDisabled.value;
      const isReadonly = computeIsReadonly.value;
      if (!(isDisabled || isReadonly)) {
        const value = item.value;
        emitModel(value);
        dispatchEvent('change', {
          value
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
        }
      }
    };
    Object.assign($xeRate, collapsePaneMethods, collapsePanePrivateMethods);
    const renderVN = () => {
      const {
        status
      } = props;
      const isDisabled = computeIsDisabled.value;
      const isReadonly = computeIsReadonly.value;
      const itemList = computeItemList.value;
      const vSize = computeSize.value;
      const numVal = computeNumVal.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-rate', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--disabled': isDisabled,
          'is--readonly': isReadonly
        }]
      }, itemList.map(item => {
        const isChecked = numVal >= item.value;
        return (0, _vue.h)('div', {
          class: ['vxe-rte--item', {
            'is--checked': isChecked
          }],
          onMouseenter(evnt) {
            if (!(isDisabled || isReadonly)) {
              mouseenterEvent(evnt, item);
            }
          },
          onMouseleave: mouseleaveEvent,
          onClick(evnt) {
            if (!(isDisabled || isReadonly)) {
              clickEvent(evnt, item);
            }
          }
        }, [(0, _vue.h)('i', {
          class: isChecked ? (0, _ui.getIcon)().RATE_CHECKED : (0, _ui.getIcon)().RATE_UNCHECKED
        })]);
      }));
    };
    $xeRate.renderVN = renderVN;
    return $xeRate;
  },
  render() {
    return this.renderVN();
  }
});