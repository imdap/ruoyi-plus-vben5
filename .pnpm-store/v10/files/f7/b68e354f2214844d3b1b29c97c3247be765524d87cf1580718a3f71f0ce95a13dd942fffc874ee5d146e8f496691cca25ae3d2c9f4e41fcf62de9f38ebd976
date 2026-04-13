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
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeNoticeBar',
  props: {
    duration: [String, Number],
    direction: {
      type: String,
      default: () => (0, _ui.getConfig)().noticeBar.direction
    },
    speed: {
      type: String,
      default: () => (0, _ui.getConfig)().noticeBar.speed
    },
    content: String,
    vertical: Boolean,
    loop: {
      type: Boolean
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().noticeBar.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['start', 'end'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const $xeTabs = (0, _vue.inject)('$xeTabs', null);
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refContentElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      animationStatus: false,
      animationDuration: 0
    });
    const refMaps = {
      refElem
    };
    const computeNoticeText = (0, _vue.computed)(() => {
      const {
        content
      } = props;
      return `${content || ''}`;
    });
    const computeTabsResizeFlag = (0, _vue.computed)(() => {
      return $xeTabs ? $xeTabs.reactData.resizeFlag : null;
    });
    const computeMaps = {};
    const $xeNoticeBar = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $noticeBar: $xeNoticeBar
      }, params));
    };
    const noticeBarMethods = {
      dispatchEvent
    };
    const noticeBarPrivateMethods = {};
    const updateAnimationStyle = () => {
      const {
        speed
      } = props;
      const contEl = refContentElem.value;
      if (contEl) {
        let sRate = 46;
        if (speed === 'fast') {
          sRate = 118;
        } else if (speed === 'slow') {
          sRate = 18;
        }
        reactData.animationDuration = Math.ceil(contEl.scrollWidth / sRate);
      }
    };
    const animationStartEvent = evnt => {
      reactData.animationStatus = true;
      dispatchEvent('start', {
        status: true
      }, evnt);
    };
    const animationEndEvent = evnt => {
      reactData.animationStatus = false;
      dispatchEvent('end', {
        status: false
      }, evnt);
    };
    Object.assign($xeNoticeBar, noticeBarMethods, noticeBarPrivateMethods);
    const renderVN = () => {
      const {
        vertical,
        duration,
        direction,
        loop
      } = props;
      const {
        animationDuration,
        animationStatus
      } = reactData;
      const vSize = computeSize.value;
      const noticeText = computeNoticeText.value;
      const defaultSlot = slots.default;
      const prefixSlot = slots.prefix;
      const suffixSlot = slots.suffix;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-notice-bar', `is--${vertical ? 'vertical' : 'horizontal'}`, `dir--${direction || 'left'}`, {
          [`size--${vSize}`]: vSize,
          'is--loop': loop
        }]
      }, [prefixSlot ? (0, _vue.h)('div', {
        class: 'vxe-notice-bar--prefix'
      }, prefixSlot({})) : (0, _ui.renderEmptyElement)($xeNoticeBar), (0, _vue.h)('div', {
        class: 'vxe-notice-bar--content'
      }, [(0, _vue.h)('div', {
        ref: refContentElem,
        class: 'vxe-notice-bar--inner'
      }, [(0, _vue.h)('div', {
        class: ['vxe-notice-bar--wrapper', `is--${animationStatus ? 'progress' : 'end'}`],
        style: {
          animationDuration: duration ? (0, _dom.toCssUnit)(duration, 's') : `${animationDuration}s`
        },
        onAnimationstart: animationStartEvent,
        onAnimationend: animationEndEvent
      }, defaultSlot ? defaultSlot({}) : noticeText)])]), suffixSlot ? (0, _vue.h)('div', {
        class: 'vxe-notice-bar--suffix'
      }, suffixSlot({})) : (0, _ui.renderEmptyElement)($xeNoticeBar)]);
    };
    (0, _vue.watch)(computeTabsResizeFlag, () => {
      updateAnimationStyle();
    });
    (0, _vue.onMounted)(() => {
      _ui.globalEvents.on($xeNoticeBar, 'resize', updateAnimationStyle);
      updateAnimationStyle();
    });
    (0, _vue.onBeforeUnmount)(() => {
      _ui.globalEvents.off($xeNoticeBar, 'resize');
    });
    $xeNoticeBar.renderVN = renderVN;
    return $xeNoticeBar;
  },
  render() {
    return this.renderVN();
  }
});