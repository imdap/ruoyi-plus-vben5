"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _vn = require("../../ui/src/vn");
var _ui = require("../../ui");
var _dom = require("../../ui/src/dom");
var _loading = _interopRequireDefault(require("../../loading/src/loading"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeCard',
  props: {
    title: String,
    showTitleOverflow: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().card.showTitleOverflow
    },
    width: [String, Number],
    height: [String, Number],
    border: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().card.border
    },
    loading: Boolean,
    shadow: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().card.shadow
    },
    padding: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().card.padding
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().card.size || (0, _ui.getConfig)().size
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
    const computeCardStyle = (0, _vue.computed)(() => {
      const {
        height,
        width
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
    const computeMaps = {
      computeSize
    };
    const $xeCard = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $card: $xeCard
      }, params));
    };
    const cardMethods = {
      dispatchEvent
    };
    const cardPrivateMethods = {};
    Object.assign($xeCard, cardMethods, cardPrivateMethods);
    const renderVN = () => {
      const {
        title,
        border,
        shadow,
        padding,
        loading,
        showTitleOverflow
      } = props;
      const defaultSlot = slots.default;
      const headerSlot = slots.header;
      const titleSlot = slots.title;
      const extraSlot = slots.extra;
      const footerSlot = slots.footer;
      const leftSlot = slots.left;
      const rightSlot = slots.right;
      const vSize = computeSize.value;
      const cardStyle = computeCardStyle.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-card', {
          [`size--${vSize}`]: vSize,
          'is--border': border,
          'is--shadow': shadow,
          'is--padding': padding
        }],
        style: cardStyle
      }, [title || titleSlot || headerSlot ? (0, _vue.h)('div', {
        class: 'vxe-card--header'
      }, headerSlot ? (0, _vn.getSlotVNs)(headerSlot({})) : [(0, _vue.h)('div', {
        class: ['vxe-card--header-title', {
          'is--ellipsis': showTitleOverflow
        }]
      }, titleSlot ? (0, _vn.getSlotVNs)(titleSlot({})) : `${title || ''}`), extraSlot ? (0, _vue.h)('div', {
        class: 'vxe-card--header-extra'
      }, (0, _vn.getSlotVNs)(extraSlot({}))) : (0, _ui.renderEmptyElement)($xeCard)]) : (0, _ui.renderEmptyElement)($xeCard), (0, _vue.h)('div', {
        class: 'vxe-card--body'
      }, [leftSlot ? (0, _vue.h)('div', {
        class: 'vxe-card--body-left'
      }, (0, _vn.getSlotVNs)(leftSlot({}))) : (0, _ui.renderEmptyElement)($xeCard), (0, _vue.h)('div', {
        class: 'vxe-card--body-content'
      }, defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot({})) : []), rightSlot ? (0, _vue.h)('div', {
        class: 'vxe-card--body-right'
      }, (0, _vn.getSlotVNs)(rightSlot({}))) : (0, _ui.renderEmptyElement)($xeCard)]), footerSlot ? (0, _vue.h)('div', {
        class: 'vxe-card--footer'
      }, (0, _vn.getSlotVNs)(footerSlot({}))) : (0, _ui.renderEmptyElement)($xeCard),
      /**
       * 加载中
       */
      (0, _vue.h)(_loading.default, {
        class: 'vxe-card--loading',
        modelValue: loading
      })]);
    };
    $xeCard.renderVN = renderVN;
    return $xeCard;
  },
  render() {
    return this.renderVN();
  }
});