"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _vn = require("../../ui/src/vn");
var _dom = require("../../ui/src/dom");
var _loading = _interopRequireDefault(require("../../loading/src/loading"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeCarousel',
  props: {
    modelValue: [String, Number],
    options: Array,
    loading: Boolean,
    height: {
      type: [Number, String],
      default: () => (0, _ui.getConfig)().carousel.height
    },
    width: {
      type: [Number, String],
      default: () => (0, _ui.getConfig)().carousel.width
    },
    autoPlay: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().carousel.autoPlay
    },
    interval: {
      type: [Number, String],
      default: () => (0, _ui.getConfig)().carousel.interval
    },
    loop: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().carousel.loop
    },
    vertical: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().carousel.vertical
    },
    showIndicators: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().carousel.showIndicators
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const refWrapperElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      activeName: '',
      staticItems: [],
      itemWidth: 0,
      itemHeight: 0
    });
    const internalData = {
      apTimeout: undefined,
      stopFlag: false
    };
    const refMaps = {
      refElem
    };
    const computeListStyle = (0, _vue.computed)(() => {
      const {
        vertical,
        options
      } = props;
      const {
        activeName,
        itemWidth,
        itemHeight,
        staticItems
      } = reactData;
      const list = (staticItems && staticItems.length ? staticItems : options) || [];
      const activeIndex = Math.max(0, _xeUtils.default.findIndexOf(list, item => item.name === activeName));
      const stys = {};
      if (vertical) {
        stys.transform = `translateY(-${activeIndex * itemHeight}px)`;
      } else {
        stys.width = `${itemWidth * list.length}px`;
        stys.transform = `translateX(-${activeIndex * itemWidth}px)`;
      }
      return stys;
    });
    const computeMaps = {};
    const $xeCarousel = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const updateStyle = () => {
      (0, _vue.nextTick)(() => {
        const wrapperElem = refWrapperElem.value;
        if (wrapperElem) {
          reactData.itemWidth = wrapperElem.clientWidth;
          reactData.itemHeight = wrapperElem.clientHeight;
        }
      });
    };
    const clickItemEvent = (evnt, item) => {
      const value = item.name;
      reactData.activeName = item.name;
      emit('update:modelValue', value);
      emit('change', {
        value
      }, evnt);
      updateStyle();
    };
    const initDefaultActive = list => {
      let activeName = null;
      if (list && list.length) {
        let validVal = false;
        activeName = props.modelValue;
        list.forEach(item => {
          if (activeName === item.name) {
            validVal = true;
          }
        });
        if (!validVal) {
          activeName = list[0].name;
          emit('update:modelValue', activeName);
        }
      }
      reactData.activeName = activeName;
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $carousel: $xeCarousel
      }, params));
    };
    const handlePrevNext = isNext => {
      const {
        options,
        loop
      } = props;
      const {
        activeName,
        staticItems
      } = reactData;
      const list = (staticItems && staticItems.length ? staticItems : options) || [];
      const index = Math.max(0, _xeUtils.default.findIndexOf(list, item => item.name === activeName));
      if (index > -1) {
        let item = null;
        if (isNext) {
          if (index < list.length - 1) {
            item = list[index + 1];
          } else {
            if (loop) {
              item = list[0];
            }
          }
        } else {
          if (index > 0) {
            item = list[index - 1];
          } else {
            if (loop) {
              item = list[list.length - 1];
            }
          }
        }
        if (item) {
          const name = item.name;
          const value = name;
          reactData.activeName = name;
          emit('update:modelValue', value);
          return true;
        }
      }
      return false;
    };
    const carouselMethods = {
      dispatchEvent,
      prev() {
        if (handlePrevNext(false)) {
          handleAutoPlay();
        }
        return (0, _vue.nextTick)();
      },
      next() {
        if (handlePrevNext(true)) {
          handleAutoPlay();
        }
        return (0, _vue.nextTick)();
      }
    };
    const prevEvent = evnt => {
      if (handlePrevNext(false)) {
        const value = reactData.activeName;
        emit('change', {
          value
        }, evnt);
      }
    };
    const nextEvent = evnt => {
      if (handlePrevNext(true)) {
        const value = reactData.activeName;
        emit('change', {
          value
        }, evnt);
      }
    };
    const stopAutoPlay = () => {
      const {
        apTimeout
      } = internalData;
      internalData.stopFlag = true;
      if (apTimeout) {
        clearTimeout(apTimeout);
        internalData.apTimeout = undefined;
      }
    };
    const handleAutoPlay = () => {
      const {
        autoPlay,
        interval
      } = props;
      const {
        stopFlag
      } = internalData;
      stopAutoPlay();
      if (autoPlay) {
        internalData.stopFlag = false;
        internalData.apTimeout = setTimeout(() => {
          if (!stopFlag) {
            handlePrevNext(true);
          }
        }, _xeUtils.default.toNumber(interval) || 300);
      }
    };
    const mouseenterEvent = () => {
      stopAutoPlay();
    };
    const mouseleaveEvent = () => {
      handleAutoPlay();
    };
    const carouselPrivateMethods = {};
    const callSlot = (slotFunc, params) => {
      if (slotFunc) {
        if (_xeUtils.default.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null;
        }
        if (_xeUtils.default.isFunction(slotFunc)) {
          return (0, _vn.getSlotVNs)(slotFunc(params));
        }
      }
      return [];
    };
    Object.assign($xeCarousel, carouselMethods, carouselPrivateMethods);
    const renderItemWrapper = list => {
      const {
        height
      } = props;
      const {
        activeName
      } = reactData;
      const listStyle = computeListStyle.value;
      return (0, _vue.h)('div', {
        class: 'vxe-carousel--list',
        style: listStyle
      }, list.map(item => {
        const {
          name,
          url,
          slots
        } = item;
        const defaultSlot = slots ? slots.default : null;
        return (0, _vue.h)('div', {
          key: `${name}`,
          class: ['vxe-carousel--item-inner', {
            'is--active': activeName === name
          }],
          style: height ? {
            height: (0, _dom.toCssUnit)(height)
          } : null
        }, defaultSlot ? callSlot(defaultSlot, {}) : [(0, _vue.h)('img', {
          class: 'vxe-carousel--item-img',
          src: url
        })]);
      }));
    };
    const renderIndicators = list => {
      const {
        activeName
      } = reactData;
      return (0, _vue.h)('div', {
        class: 'vxe-carousel--indicators'
      }, list.map(item => {
        const {
          name
        } = item;
        return (0, _vue.h)('div', {
          key: `${name}`,
          class: ['vxe-carousel--indicators-item', {
            'is--active': activeName === name
          }],
          onClick(evnt) {
            clickItemEvent(evnt, item);
          }
        });
      }));
    };
    const renderVN = () => {
      const {
        loading,
        height,
        width,
        showIndicators,
        vertical,
        options
      } = props;
      const {
        staticItems
      } = reactData;
      const defaultSlot = slots.default;
      const list = (staticItems && staticItems.length ? staticItems : options) || [];
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-carousel', `is--${vertical ? 'vertical' : 'horizontal'}`],
        style: width ? {
          width: (0, _dom.toCssUnit)(width)
        } : null,
        onMouseenter: mouseenterEvent,
        onMouseleave: mouseleaveEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-carousel--slots'
      }, defaultSlot ? defaultSlot({}) : []), (0, _vue.h)('div', {
        ref: refWrapperElem,
        class: 'vxe-carousel--item-wrapper',
        style: height ? {
          height: (0, _dom.toCssUnit)(height)
        } : null
      }, [renderItemWrapper(list)]), showIndicators ? renderIndicators(list) : (0, _ui.renderEmptyElement)($xeCarousel), (0, _vue.h)('div', {
        class: 'vxe-carousel--btn-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-carousel--previous-btn',
        onClick: prevEvent
      }, [(0, _vue.h)('i', {
        class: vertical ? (0, _ui.getIcon)().CAROUSEL_VERTICAL_PREVIOUS : (0, _ui.getIcon)().CAROUSEL_HORIZONTAL_PREVIOUS
      })]), (0, _vue.h)('div', {
        class: 'vxe-carousel--next-btn',
        onClick: nextEvent
      }, [(0, _vue.h)('i', {
        class: vertical ? (0, _ui.getIcon)().CAROUSEL_VERTICAL_NEXT : (0, _ui.getIcon)().CAROUSEL_HORIZONTAL_NEXT
      })])]),
      /**
       * 加载中
       */
      (0, _vue.h)(_loading.default, {
        class: 'vxe-carousel--loading',
        modelValue: loading
      })]);
    };
    const optsFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.options ? props.options.length : -1, () => {
      optsFlag.value++;
    });
    (0, _vue.watch)(() => props.options, () => {
      optsFlag.value++;
    });
    (0, _vue.watch)(optsFlag, () => {
      initDefaultActive(props.options);
    });
    const stFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => reactData.staticItems ? reactData.staticItems.length : -1, () => {
      stFlag.value++;
    });
    (0, _vue.watch)(() => reactData.staticItems, () => {
      stFlag.value++;
    });
    (0, _vue.watch)(stFlag, () => {
      initDefaultActive(reactData.staticItems);
    });
    (0, _vue.watch)(() => props.autoPlay, () => {
      handleAutoPlay();
    });
    initDefaultActive(reactData.staticItems.length ? reactData.staticItems : props.options);
    (0, _vue.onMounted)(() => {
      handleAutoPlay();
      updateStyle();
    });
    (0, _vue.onUnmounted)(() => {
      stopAutoPlay();
    });
    (0, _vue.provide)('$xeCarousel', $xeCarousel);
    $xeCarousel.renderVN = renderVN;
    return $xeCarousel;
  },
  render() {
    return this.renderVN();
  }
});