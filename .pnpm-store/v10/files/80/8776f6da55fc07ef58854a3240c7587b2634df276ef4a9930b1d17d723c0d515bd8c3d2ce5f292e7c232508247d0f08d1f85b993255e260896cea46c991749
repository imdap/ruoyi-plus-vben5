"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _dom = require("../../ui/src/dom");
var _ui = require("../../ui");
var _loading = _interopRequireDefault(require("../../loading/src/loading"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeLayoutAside',
  props: {
    width: [String, Number],
    collapsed: Boolean,
    collapseWidth: [String, Number],
    loading: Boolean,
    padding: Boolean,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().layoutAside.size || (0, _ui.getConfig)().size
    }
  },
  emits: [],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeWrapperWidth = (0, _vue.computed)(() => {
      const {
        width,
        collapsed,
        collapseWidth
      } = props;
      if (collapsed) {
        if (collapseWidth) {
          return (0, _dom.toCssUnit)(collapseWidth);
        }
      } else {
        if (width) {
          return (0, _dom.toCssUnit)(width);
        }
      }
      return '';
    });
    const computeMaps = {
      computeSize
    };
    const $xeLayoutAside = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $layoutAside: $xeLayoutAside
      }, params));
    };
    const layoutAsideMethods = {
      dispatchEvent
    };
    const layoutAsidePrivateMethods = {};
    Object.assign($xeLayoutAside, layoutAsideMethods, layoutAsidePrivateMethods);
    const renderVN = () => {
      const {
        width,
        collapsed,
        loading,
        padding
      } = props;
      const wrapperWidth = computeWrapperWidth.value;
      const vSize = computeSize.value;
      const defaultSlot = slots.default;
      return (0, _vue.h)('aside', {
        ref: refElem,
        class: ['vxe-layout-aside', {
          [`size--${vSize}`]: vSize,
          'is--padding': padding,
          'is--default-width': !width,
          'is--collapse': collapsed,
          'is--loading': loading
        }],
        style: wrapperWidth ? {
          width: wrapperWidth
        } : null
      }, [(0, _vue.h)('div', {
        class: 'vxe-layout-aside--inner'
      }, defaultSlot ? defaultSlot({}) : []),
      /**
       * 加载中
       */
      (0, _vue.h)(_loading.default, {
        class: 'vxe-list-view--loading',
        modelValue: loading
      })]);
    };
    (0, _vue.provide)('$xeLayoutAside', $xeLayoutAside);
    $xeLayoutAside.renderVN = renderVN;
    return $xeLayoutAside;
  },
  render() {
    return this.renderVN();
  }
});