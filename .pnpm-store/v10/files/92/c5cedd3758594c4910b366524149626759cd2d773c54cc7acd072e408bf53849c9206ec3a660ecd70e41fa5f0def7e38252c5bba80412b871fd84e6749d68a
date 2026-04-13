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
var _loading = _interopRequireDefault(require("../../loading/src/loading"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createReactData() {
  return {
    scrollYLoad: false,
    bodyHeight: 0,
    customHeight: 0,
    customMaxHeight: 0,
    parentHeight: 0,
    topSpaceHeight: 0,
    items: []
  };
}
function createInternalData() {
  return {
    resizeObserver: undefined,
    fullData: [],
    lastScrollLeft: 0,
    lastScrollTop: 0,
    scrollYStore: {
      startIndex: 0,
      endIndex: 0,
      visibleSize: 0,
      offsetSize: 0,
      rowHeight: 0
    }
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeList',
  props: {
    data: Array,
    height: [Number, String],
    maxHeight: [Number, String],
    loading: Boolean,
    className: [String, Function],
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().list.size || (0, _ui.getConfig)().size
    },
    autoResize: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().list.autoResize
    },
    syncResize: [Boolean, String, Number],
    virtualYConfig: Object,
    scrollY: Object
  },
  emits: ['scroll'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const browseObj = _xeUtils.default.browse();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)(createReactData());
    const internalData = createInternalData();
    const refElem = (0, _vue.ref)();
    const refVirtualWrapper = (0, _vue.ref)();
    const refVirtualBody = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xeList = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    };
    const computeSYOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().list.virtualYConfig || (0, _ui.getConfig)().list.scrollY, props.virtualYConfig || props.scrollY);
    });
    const computeStyles = (0, _vue.computed)(() => {
      const {
        height,
        maxHeight
      } = props;
      const {
        customHeight,
        customMaxHeight
      } = reactData;
      const style = {};
      if (height) {
        style.height = `${customHeight}px`;
      } else if (maxHeight) {
        style.height = 'auto';
        style.maxHeight = `${customMaxHeight}px`;
      }
      return style;
    });
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $list: $xeList
      }, params));
    };
    const calcTableHeight = key => {
      const {
        parentHeight
      } = reactData;
      const val = props[key];
      let num = 0;
      if (val) {
        if (val === '100%' || val === 'auto') {
          num = parentHeight;
        } else {
          if ((0, _dom.isScale)(val)) {
            num = Math.floor((_xeUtils.default.toInteger(val) || 1) / 100 * parentHeight);
          } else {
            num = _xeUtils.default.toNumber(val);
          }
          num = Math.max(40, num);
        }
      }
      return num;
    };
    const updateHeight = () => {
      reactData.customHeight = calcTableHeight('height');
      reactData.customMaxHeight = calcTableHeight('maxHeight');
    };
    const updateYSpace = () => {
      const {
        scrollYLoad
      } = reactData;
      const {
        scrollYStore,
        fullData
      } = internalData;
      reactData.bodyHeight = scrollYLoad ? fullData.length * scrollYStore.rowHeight : 0;
      reactData.topSpaceHeight = scrollYLoad ? Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0) : 0;
    };
    const handleData = () => {
      const {
        scrollYLoad
      } = reactData;
      const {
        fullData,
        scrollYStore
      } = internalData;
      reactData.items = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullData.slice(0);
      return (0, _vue.nextTick)();
    };
    const updateYData = () => {
      handleData();
      updateYSpace();
    };
    const computeScrollLoad = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          scrollYLoad
        } = reactData;
        const {
          scrollYStore
        } = internalData;
        const virtualBodyElem = refVirtualBody.value;
        const sYOpts = computeSYOpts.value;
        let rowHeight = 0;
        let firstItemElem;
        if (virtualBodyElem) {
          if (sYOpts.sItem) {
            firstItemElem = virtualBodyElem.querySelector(sYOpts.sItem);
          }
          if (!firstItemElem) {
            firstItemElem = virtualBodyElem.children[0];
          }
        }
        if (firstItemElem) {
          rowHeight = firstItemElem.offsetHeight;
        }
        rowHeight = Math.max(12, rowHeight);
        scrollYStore.rowHeight = rowHeight;
        // 计算 Y 逻辑
        if (scrollYLoad) {
          const scrollBodyElem = refVirtualWrapper.value;
          const visibleYSize = Math.max(8, Math.ceil(scrollBodyElem.clientHeight / rowHeight));
          const offsetYSize = sYOpts.oSize ? _xeUtils.default.toNumber(sYOpts.oSize) : browseObj.edge ? 10 : 0;
          scrollYStore.offsetSize = offsetYSize;
          scrollYStore.visibleSize = visibleYSize;
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex + visibleYSize + offsetYSize, scrollYStore.endIndex);
          updateYData();
        } else {
          updateYSpace();
        }
      });
    };
    /**
     * 清除滚动条
     */
    const clearScroll = () => {
      const scrollBodyElem = refVirtualWrapper.value;
      if (scrollBodyElem) {
        scrollBodyElem.scrollTop = 0;
      }
      return (0, _vue.nextTick)();
    };
    /**
     * 如果有滚动条，则滚动到对应的位置
     */
    const scrollTo = (scrollLeft, scrollTop) => {
      const scrollBodyElem = refVirtualWrapper.value;
      if (scrollLeft) {
        if (!_xeUtils.default.isNumber(scrollLeft)) {
          scrollTop = scrollLeft.top;
          scrollLeft = scrollLeft.left;
        }
      }
      if (_xeUtils.default.isNumber(scrollLeft)) {
        scrollBodyElem.scrollLeft = scrollLeft;
      }
      if (_xeUtils.default.isNumber(scrollTop)) {
        scrollBodyElem.scrollTop = scrollTop;
      }
      if (reactData.scrollYLoad) {
        return new Promise(resolve => {
          setTimeout(() => {
            (0, _vue.nextTick)(() => {
              resolve();
            });
          }, 50);
        });
      }
      return (0, _vue.nextTick)();
    };
    /**
     * 刷新滚动条
     */
    const refreshScroll = () => {
      const {
        lastScrollLeft,
        lastScrollTop
      } = internalData;
      return clearScroll().then(() => {
        if (lastScrollLeft || lastScrollTop) {
          internalData.lastScrollLeft = 0;
          internalData.lastScrollTop = 0;
          return scrollTo(lastScrollLeft, lastScrollTop);
        }
      });
    };
    /**
     * 重新计算列表
     */
    const recalculate = () => {
      const el = refElem.value;
      if (el) {
        const parentEl = el.parentElement;
        reactData.parentHeight = parentEl ? parentEl.clientHeight : 0;
        updateHeight();
        if (el.clientWidth && el.clientHeight) {
          return computeScrollLoad();
        }
      }
      return (0, _vue.nextTick)();
    };
    const loadYData = evnt => {
      const {
        scrollYStore
      } = internalData;
      const {
        startIndex,
        endIndex,
        visibleSize,
        offsetSize,
        rowHeight
      } = scrollYStore;
      const scrollBodyElem = evnt.target;
      const scrollTop = scrollBodyElem.scrollTop;
      const toVisibleIndex = Math.floor(scrollTop / rowHeight);
      const offsetStartIndex = Math.max(0, toVisibleIndex - 1 - offsetSize);
      const offsetEndIndex = toVisibleIndex + visibleSize + offsetSize;
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex;
          scrollYStore.endIndex = offsetEndIndex;
          updateYData();
        }
      }
    };
    const scrollEvent = evnt => {
      const scrollBodyElem = evnt.target;
      const scrollTop = scrollBodyElem.scrollTop;
      const scrollLeft = scrollBodyElem.scrollLeft;
      const isX = scrollLeft !== internalData.lastScrollLeft;
      const isY = scrollTop !== internalData.lastScrollTop;
      internalData.lastScrollTop = scrollTop;
      internalData.lastScrollLeft = scrollLeft;
      if (reactData.scrollYLoad) {
        loadYData(evnt);
      }
      dispatchEvent('scroll', {
        scrollLeft,
        scrollTop,
        isX,
        isY
      }, evnt);
    };
    /**
     * 加载数据
     * @param {Array} datas 数据
     */
    const loadData = datas => {
      const {
        scrollYStore
      } = internalData;
      const sYOpts = computeSYOpts.value;
      const fullData = datas || [];
      Object.assign(scrollYStore, {
        startIndex: 0,
        endIndex: 1,
        visibleSize: 0
      });
      internalData.fullData = fullData;
      // 如果gt为0，则总是启用
      reactData.scrollYLoad = !!sYOpts.enabled && sYOpts.gt > -1 && (sYOpts.gt === 0 || sYOpts.gt <= fullData.length);
      handleData();
      return computeScrollLoad().then(() => {
        refreshScroll();
      });
    };
    const listMethods = {
      dispatchEvent,
      loadData,
      /**
       * 重新加载数据
       * @param {Array} datas 数据
       */
      reloadData(datas) {
        clearScroll();
        return loadData(datas);
      },
      recalculate,
      scrollTo,
      refreshScroll,
      clearScroll
    };
    Object.assign($xeList, listMethods);
    const renderVN = () => {
      const {
        className,
        loading
      } = props;
      const {
        bodyHeight,
        topSpaceHeight,
        items
      } = reactData;
      const defaultSlot = slots.default;
      const vSize = computeSize.value;
      const styles = computeStyles.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-list', className ? _xeUtils.default.isFunction(className) ? className({
          $list: $xeList
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--loading': loading
        }]
      }, [(0, _vue.h)('div', {
        ref: refVirtualWrapper,
        class: 'vxe-list--virtual-wrapper',
        style: styles,
        onScroll: scrollEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-list--y-space',
        style: {
          height: bodyHeight ? `${bodyHeight}px` : ''
        }
      }), (0, _vue.h)('div', {
        ref: refVirtualBody,
        class: 'vxe-list--body',
        style: {
          marginTop: topSpaceHeight ? `${topSpaceHeight}px` : ''
        }
      }, defaultSlot ? defaultSlot({
        items,
        $list: $xeList
      }) : [])]),
      /**
       * 加载中
       */
      (0, _vue.h)(_loading.default, {
        class: 'vxe-list--loading',
        modelValue: loading
      })]);
    };
    const dataFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.data ? props.data.length : -1, () => {
      dataFlag.value++;
    });
    (0, _vue.watch)(() => props.data, () => {
      dataFlag.value++;
    });
    (0, _vue.watch)(dataFlag, () => {
      loadData(props.data || []);
    });
    (0, _vue.watch)(() => props.height, () => {
      recalculate();
    });
    (0, _vue.watch)(() => props.maxHeight, () => {
      recalculate();
    });
    (0, _vue.watch)(() => props.syncResize, value => {
      if (value) {
        recalculate();
        (0, _vue.nextTick)(() => setTimeout(() => recalculate()));
      }
    });
    (0, _vue.onActivated)(() => {
      recalculate().then(() => refreshScroll());
    });
    (0, _vue.nextTick)(() => {
      loadData(props.data || []);
    });
    (0, _vue.onMounted)(() => {
      recalculate();
      if (props.autoResize) {
        const el = refElem.value;
        const resizeObserver = _ui.globalResize.create(() => recalculate());
        resizeObserver.observe(el);
        if (el) {
          resizeObserver.observe(el.parentElement);
        }
        internalData.resizeObserver = resizeObserver;
      }
      _ui.globalEvents.on($xeList, 'resize', recalculate);
    });
    (0, _vue.onBeforeUnmount)(() => {
      const {
        resizeObserver
      } = internalData;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      _ui.globalEvents.off($xeList, 'resize');
      _xeUtils.default.assign(reactData, createReactData());
      _xeUtils.default.assign(internalData, createInternalData());
    });
    $xeList.renderVN = renderVN;
    return $xeList;
  },
  render() {
    return this.renderVN();
  }
});