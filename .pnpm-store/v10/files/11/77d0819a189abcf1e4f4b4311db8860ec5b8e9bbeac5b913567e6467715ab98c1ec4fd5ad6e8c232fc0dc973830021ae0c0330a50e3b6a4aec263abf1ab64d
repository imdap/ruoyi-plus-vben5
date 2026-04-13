"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _dom = require("../../ui/src/dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createReactData() {
  return {
    groupName: _xeUtils.default.uniqueId('xe_group_'),
    selectStyle: {
      display: '',
      left: '',
      width: ''
    }
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeSegmented',
  props: {
    modelValue: [String, Number],
    name: [String, Number],
    disabled: Boolean,
    options: Array,
    type: {
      type: String,
      default: () => (0, _ui.getConfig)().segmented.type
    },
    status: String,
    width: [String, Number],
    height: [String, Number],
    optionConfig: Object,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().segmented.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refWrapperElem = (0, _vue.ref)();
    const refSelectedElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)(createReactData());
    const refMaps = {
      refElem
    };
    const computeItemType = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      if (type === 'round') {
        return type;
      }
      if (type === 'inside') {
        return type;
      }
      return 'default';
    });
    const computeWrapperStyle = (0, _vue.computed)(() => {
      const {
        width,
        height
      } = props;
      const stys = {};
      if (width) {
        stys.width = (0, _dom.toCssUnit)(width);
      }
      if (height) {
        stys.height = (0, _dom.toCssUnit)(height);
      }
      return stys;
    });
    const computeOptionOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().segmented.optionConfig, props.optionConfig);
    });
    const computeItemList = (0, _vue.computed)(() => {
      return props.options || [];
    });
    const computeSelectIndex = (0, _vue.computed)(() => {
      const {
        modelValue
      } = props;
      const itemList = computeItemList.value;
      return _xeUtils.default.findIndexOf(itemList, item => item.value === modelValue);
    });
    const comIsFullWidth = (0, _vue.computed)(() => {
      const wrapperStyle = computeWrapperStyle.value;
      return wrapperStyle.width === '100%';
    });
    const computeMaps = {};
    const $xeSegmented = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $segmented: $xeSegmented
      }, params));
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const changeEvent = (evnt, item) => {
      const value = item.value;
      emitModel(value);
      dispatchEvent('change', {
        value
      }, evnt);
      updateStyle();
    };
    const updateStyle = () => {
      (0, _vue.nextTick)(() => {
        const selectIndex = computeSelectIndex.value;
        const wrapperElem = refWrapperElem.value;
        const atStyle = {
          display: '',
          left: '',
          width: ''
        };
        if (wrapperElem) {
          const itemEl = wrapperElem.children[selectIndex];
          if (itemEl) {
            atStyle.display = 'block';
            atStyle.left = (0, _dom.toCssUnit)(itemEl.offsetLeft);
            atStyle.width = (0, _dom.toCssUnit)(itemEl.clientWidth);
          }
        }
        reactData.selectStyle = atStyle;
      });
    };
    const tagMethods = {
      dispatchEvent
    };
    const tagPrivateMethods = {};
    Object.assign($xeSegmented, tagMethods, tagPrivateMethods);
    const renderItems = () => {
      const {
        modelValue,
        name
      } = props;
      const {
        groupName
      } = reactData;
      const optionOpts = computeOptionOpts.value;
      const itemList = computeItemList.value;
      const isFullWidth = comIsFullWidth.value;
      const fullItemWidth = isFullWidth ? Math.max(0, 100 / itemList.length) : 0;
      const defaultSlot = slots.default;
      const itemVNs = [];
      itemList.forEach((item, i) => {
        const {
          icon,
          width
        } = item;
        const itemWidth = width || optionOpts.width;
        itemVNs.push((0, _vue.h)('label', {
          key: i,
          class: ['vxe-segmented--item', {
            'is--checked': modelValue === item.value
          }],
          style: isFullWidth || itemWidth ? {
            width: itemWidth ? (0, _dom.toCssUnit)(itemWidth) : fullItemWidth ? `${fullItemWidth}%` : ''
          } : undefined
        }, [(0, _vue.h)('input', {
          class: 'vxe-segmented--input',
          type: 'radio',
          name: name || groupName,
          onChange(evnt) {
            changeEvent(evnt, item);
          }
        }), (0, _vue.h)('div', {
          class: 'vxe-segmented--content'
        }, [icon ? (0, _vue.h)('div', {
          class: 'vxe-segmented--icon'
        }, [(0, _vue.h)('i', {
          class: icon
        })]) : (0, _ui.renderEmptyElement)($xeSegmented), (0, _vue.h)('div', {
          class: 'vxe-segmented--label'
        }, defaultSlot ? defaultSlot({
          option: item
        }) : _xeUtils.default.eqNull(item.label) ? '' : `${item.label}`)])]));
      });
      return itemVNs;
    };
    const renderVN = () => {
      const {
        status
      } = props;
      const {
        selectStyle
      } = reactData;
      const itemType = computeItemType.value;
      const wrapperStyle = computeWrapperStyle.value;
      const vSize = computeSize.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-segmented', `type--${itemType}`, {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-segmented--group',
        style: wrapperStyle
      }, [(0, _vue.h)('div', {
        ref: refSelectedElem,
        class: 'vxe-segmented--selected',
        style: selectStyle
      }), (0, _vue.h)('div', {
        ref: refWrapperElem,
        class: 'vxe-segmented--inner'
      }, renderItems())])]);
    };
    (0, _vue.watch)(computeSelectIndex, () => {
      updateStyle();
    });
    (0, _vue.onMounted)(() => {
      updateStyle();
    });
    (0, _vue.onBeforeUnmount)(() => {
      _xeUtils.default.assign(reactData, createReactData());
    });
    $xeSegmented.renderVN = renderVN;
    return $xeSegmented;
  },
  render() {
    return this.renderVN();
  }
});