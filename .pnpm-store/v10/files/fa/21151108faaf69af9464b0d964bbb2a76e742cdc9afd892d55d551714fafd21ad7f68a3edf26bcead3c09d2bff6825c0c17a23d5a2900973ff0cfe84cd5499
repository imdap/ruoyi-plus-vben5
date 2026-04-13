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
  name: 'VxeBadge',
  props: {
    count: [String, Number],
    dot: Boolean,
    content: [String, Number],
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().badge.size || (0, _ui.getConfig)().size
    }
  },
  emits: [],
  setup(props, context) {
    const {
      emit,
      slots
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
    const computeCountNum = (0, _vue.computed)(() => {
      const {
        count
      } = props;
      return count ? _xeUtils.default.toNumber(count) : 0;
    });
    const computeMaps = {};
    const $xeBadge = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $badge: $xeBadge
      }, params));
    };
    const collapsePaneMethods = {
      dispatchEvent
    };
    const collapsePanePrivateMethods = {};
    Object.assign($xeBadge, collapsePaneMethods, collapsePanePrivateMethods);
    const renderVN = () => {
      const {
        dot,
        content
      } = props;
      const vSize = computeSize.value;
      const countNum = computeCountNum.value;
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-badge', {
          [`size--${vSize}`]: vSize,
          'is--dot': dot
        }]
      }, [defaultSlot || content ? (0, _vue.h)('div', {
        class: 'vxe-badge--content'
      }, defaultSlot ? defaultSlot({}) : `${content || ''}`) : [], countNum ? (0, _vue.h)('span', {
        class: 'vxe-badge--count'
      }, countNum > 99 ? '99+' : `${countNum}`) : (0, _ui.renderEmptyElement)($xeBadge)]);
    };
    $xeBadge.renderVN = renderVN;
    return $xeBadge;
  },
  render() {
    return this.renderVN();
  }
});