"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _log = require("../../ui/src/log");
var _utils = require("../../ui/src/utils");
var _dom = require("../../ui/src/dom");
var _button = _interopRequireDefault(require("../../button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createInternalData() {
  return {
    targetEl: null
  };
}
function createReactData() {
  return {
    showBtn: false,
    backtopZindex: 0
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeBacktop',
  props: {
    target: String,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().backtop.size || (0, _ui.getConfig)().size
    },
    circle: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().backtop.circle
    },
    right: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().backtop.right
    },
    bottom: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().backtop.bottom
    },
    status: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().backtop.status
    },
    icon: {
      type: String,
      default: () => (0, _ui.getConfig)().backtop.icon
    },
    showIcon: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().backtop.showIcon
    },
    content: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().backtop.content
    },
    showContent: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().backtop.showContent
    },
    showTop: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().backtop.showTop
    },
    showBottom: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().backtop.showBottom
    },
    shadow: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().backtop.shadow
    },
    zIndex: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().backtop.zIndex
    },
    threshold: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().backtop.threshold
    },
    position: {
      type: String,
      default: () => (0, _ui.getConfig)().backtop.position
    }
  },
  emits: ['click'],
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
    const internalData = createInternalData();
    const reactData = (0, _vue.reactive)(createReactData());
    const refMaps = {
      refElem
    };
    const computeWrapperStyle = (0, _vue.computed)(() => {
      const {
        right,
        bottom
      } = props;
      const {
        backtopZindex
      } = reactData;
      const stys = {};
      if (right) {
        stys.right = (0, _dom.toCssUnit)(right);
      }
      if (bottom) {
        stys.bottom = (0, _dom.toCssUnit)(bottom);
      }
      if (backtopZindex) {
        stys.zIndex = backtopZindex;
      }
      return stys;
    });
    const computeMaps = {};
    const $xeBacktop = {
      xID,
      props,
      context,
      internalData,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $backtop: $xeBacktop
      }, params));
    };
    const updateZIndex = () => {
      const {
        position,
        zIndex
      } = props;
      const {
        backtopZindex
      } = reactData;
      if (zIndex) {
        reactData.backtopZindex = _xeUtils.default.toNumber(zIndex);
      } else if (position === 'fixed') {
        if (backtopZindex < (0, _utils.getLastZIndex)()) {
          reactData.backtopZindex = (0, _utils.nextZIndex)();
        }
      }
    };
    const showBacktop = () => {
      updateZIndex();
      reactData.showBtn = true;
    };
    const hideBacktop = () => {
      reactData.showBtn = false;
    };
    const handleScrollEvent = evnt => {
      const {
        threshold
      } = props;
      const currentEl = evnt.currentTarget;
      const scrollTop = currentEl.scrollTop;
      const showBtn = scrollTop > Math.max(1, _xeUtils.default.toNumber(threshold));
      if (showBtn) {
        showBacktop();
      } else {
        hideBacktop();
      }
    };
    const handleToTop = () => {
      const {
        targetEl
      } = internalData;
      if (!targetEl) {
        return;
      }
      const scrollTop = targetEl.scrollTop;
      if (scrollTop > 0) {
        requestAnimationFrame(handleToTop);
        const currScrollTop = scrollTop - Math.max(12, scrollTop / 6);
        targetEl.scrollTop = currScrollTop > 10 ? currScrollTop : 0;
      }
    };
    const removeScrollEvent = () => {
      const {
        targetEl
      } = internalData;
      if (targetEl) {
        targetEl.removeEventListener('scroll', handleScrollEvent);
      }
    };
    const addScrollEvent = () => {
      const {
        targetEl
      } = internalData;
      if (targetEl) {
        targetEl.addEventListener('scroll', handleScrollEvent, {
          passive: true
        });
      }
    };
    const handleTargetElement = () => {
      (0, _vue.nextTick)(() => {
        const {
          target
        } = props;
        if (!target) {
          removeScrollEvent();
          (0, _log.errLog)('vxe.error.reqProp', ['target']);
          return;
        }
        if (_xeUtils.default.isString(target)) {
          const tEl = document.querySelector(target);
          if (!tEl) {
            (0, _log.errLog)('vxe.error.errProp', [`target=${target}`, 'body']);
          }
          const {
            targetEl
          } = internalData;
          if (targetEl !== tEl) {
            removeScrollEvent();
            internalData.targetEl = tEl;
            addScrollEvent();
          }
        }
      });
    };
    const clickEvent = evnt => {
      handleToTop();
      dispatchEvent('click', {}, evnt);
    };
    const tagMethods = {
      dispatchEvent
    };
    const tagPrivateMethods = {};
    Object.assign($xeBacktop, tagMethods, tagPrivateMethods);
    const renderVN = () => {
      const {
        circle,
        position,
        status,
        icon,
        showIcon,
        content,
        showContent,
        showTop,
        showBottom,
        shadow
      } = props;
      const {
        showBtn
      } = reactData;
      const wrapperStyle = computeWrapperStyle.value;
      const vSize = computeSize.value;
      const defaultSlot = slots.default;
      const topSlot = slots.top;
      const bottomSlot = slots.bottom;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-backtop', position === 'fixed' ? 'is--' + position : 'is--absolute', {
          [`size--${vSize}`]: vSize,
          'is--visible': showBtn
        }],
        style: wrapperStyle
      }, [showTop && topSlot ? (0, _vue.h)('div', {
        class: 'vxe-backtop--top-wrapper'
      }, topSlot({})) : (0, _ui.renderEmptyElement)($xeBacktop), (0, _vue.h)('div', {
        class: 'vxe-backtop--content-wrapper',
        onClick: clickEvent
      }, [defaultSlot ? defaultSlot({}) : [(0, _vue.h)(_button.default, {
        circle,
        status,
        shadow,
        icon: showIcon ? icon || (0, _ui.getIcon)().BACKTOP_TOP : '',
        content: showContent ? content : ''
      })]]), showBottom && bottomSlot ? (0, _vue.h)('div', {
        class: 'vxe-backtop--bottom-wrapper'
      }, bottomSlot({})) : (0, _ui.renderEmptyElement)($xeBacktop)]);
    };
    (0, _vue.watch)(() => props.position, () => {
      updateZIndex();
    });
    (0, _vue.watch)(() => props.target, () => {
      handleTargetElement();
    });
    (0, _vue.onMounted)(() => {
      const {
        showTop
      } = props;
      if (showTop) {
        updateZIndex();
      }
      handleTargetElement();
    });
    (0, _vue.onBeforeUnmount)(() => {
      removeScrollEvent();
      _xeUtils.default.assign(reactData, createReactData());
      _xeUtils.default.assign(internalData, createInternalData());
    });
    $xeBacktop.renderVN = renderVN;
    return $xeBacktop;
  },
  render() {
    return this.renderVN();
  }
});