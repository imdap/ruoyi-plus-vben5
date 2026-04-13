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
var _utils = require("../../ui/src/utils");
var _log = require("../../ui/src/log");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _loading = _interopRequireDefault(require("../../loading/src/loading"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const scrollbarOffsetSize = 20;
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTabs',
  props: {
    modelValue: [String, Number, Boolean],
    options: Array,
    width: [String, Number],
    height: [String, Number],
    destroyOnClose: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().tabs.destroyOnClose
    },
    titleWidth: [String, Number],
    titleAlign: [String, Number],
    type: {
      type: String,
      default: () => (0, _ui.getConfig)().tabs.type
    },
    position: {
      type: String,
      default: () => (0, _ui.getConfig)().tabs.position
    },
    showClose: Boolean,
    showBody: {
      type: Boolean,
      default: true
    },
    padding: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().tabs.padding
    },
    trigger: String,
    beforeChangeMethod: Function,
    closeConfig: Object,
    refreshConfig: Object,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().tabs.size || (0, _ui.getConfig)().size
    },
    // 已废弃
    beforeCloseMethod: Function
  },
  emits: ['update:modelValue', 'change', 'tab-change', 'tab-change-fail', 'tab-close', 'tab-close-fail', 'tab-click', 'tab-load'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const $xeParentTabs = (0, _vue.inject)('$xeTabs', null);
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refHeadWrapperElem = (0, _vue.ref)();
    const refHeadPrevElem = (0, _vue.ref)();
    const refHeadNextElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      staticTabs: [],
      activeName: null,
      initNames: [],
      lintLeft: 0,
      lintTop: 0,
      lintWidth: 0,
      lintHeight: 0,
      scrollbarWidth: 0,
      scrollbarHeight: 0,
      isTabOver: false,
      resizeFlag: 1,
      cacheTabMaps: {}
    });
    const internalData = {
      slTimeout: undefined
    };
    const refMaps = {
      refElem
    };
    const computeTabType = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      return type || 'default';
    });
    const computeTabPosition = (0, _vue.computed)(() => {
      const {
        position
      } = props;
      return position || 'top';
    });
    const computeLrPosition = (0, _vue.computed)(() => {
      const tabPosition = computeTabPosition.value;
      return tabPosition === 'left' || tabPosition === 'right';
    });
    const computeLineStyle = (0, _vue.computed)(() => {
      const {
        lintLeft,
        lintTop,
        lintWidth,
        lintHeight
      } = reactData;
      const lrPosition = computeLrPosition.value;
      return lrPosition ? {
        top: `${lintTop}px`,
        height: `${lintHeight}px`
      } : {
        left: `${lintLeft}px`,
        width: `${lintWidth}px`
      };
    });
    const computeWrapperStyle = (0, _vue.computed)(() => {
      const {
        width
      } = props;
      const stys = {};
      if (width) {
        stys.width = (0, _dom.toCssUnit)(width);
      }
      return stys;
    });
    const computeCloseOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().tabs.closeConfig, props.closeConfig);
    });
    const computeRefreshOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().tabs.refreshConfig, props.refreshConfig);
    });
    const computeTabOptions = (0, _vue.computed)(() => {
      const {
        options
      } = props;
      return (options || []).filter(item => handleFilterTab(item));
    });
    const computeTabStaticOptions = (0, _vue.computed)(() => {
      const {
        staticTabs
      } = reactData;
      return staticTabs.filter(item => handleFilterTab(item));
    });
    const computeParentTabsResizeFlag = (0, _vue.computed)(() => {
      return $xeParentTabs ? $xeParentTabs.reactData.resizeFlag : null;
    });
    const computeMaps = {};
    const $xeTabs = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const handleFilterTab = item => {
      const {
        permissionCode
      } = item;
      if (permissionCode) {
        if (!_ui.permission.checkVisible(permissionCode)) {
          return false;
        }
      }
      return true;
    };
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
    const checkScrolling = () => {
      const lrPosition = computeLrPosition.value;
      const headerWrapperEl = refHeadWrapperElem.value;
      const headPrevEl = refHeadPrevElem.value;
      const headNextEl = refHeadNextElem.value;
      if (headerWrapperEl) {
        const {
          scrollLeft,
          scrollTop,
          clientWidth,
          clientHeight,
          scrollWidth,
          scrollHeight
        } = headerWrapperEl;
        if (headPrevEl) {
          if ((lrPosition ? scrollTop : scrollLeft) > 0) {
            (0, _dom.addClass)(headPrevEl, 'scrolling--middle');
          } else {
            (0, _dom.removeClass)(headPrevEl, 'scrolling--middle');
          }
        }
        if (headNextEl) {
          if (lrPosition ? clientHeight < scrollHeight - Math.ceil(scrollTop) : clientWidth < scrollWidth - Math.ceil(scrollLeft)) {
            (0, _dom.addClass)(headNextEl, 'scrolling--middle');
          } else {
            (0, _dom.removeClass)(headNextEl, 'scrolling--middle');
          }
        }
      }
    };
    const updateTabStyle = () => {
      const handleStyle = () => {
        const {
          activeName
        } = reactData;
        const tabType = computeTabType.value;
        const tabOptions = computeTabOptions.value;
        const tabStaticOptions = computeTabStaticOptions.value;
        const headerWrapperEl = refHeadWrapperElem.value;
        const lrPosition = computeLrPosition.value;
        let lintWidth = 0;
        let lintHeight = 0;
        let lintLeft = 0;
        let lintTop = 0;
        let sBarWidth = 0;
        let sBarHeight = 0;
        let isOver = false;
        if (headerWrapperEl) {
          const index = _xeUtils.default.findIndexOf(tabStaticOptions.length ? tabStaticOptions : tabOptions, item => item.name === activeName);
          const {
            children,
            offsetWidth,
            scrollWidth,
            offsetHeight,
            scrollHeight,
            clientWidth,
            clientHeight
          } = headerWrapperEl;
          sBarWidth = offsetWidth - clientWidth;
          sBarHeight = offsetHeight - clientHeight;
          if (lrPosition) {
            isOver = scrollHeight !== clientHeight;
            if (index > -1) {
              const tabEl = children[index];
              if (tabEl) {
                const tabHeight = tabEl.clientHeight;
                const tabWidth = tabEl.clientWidth;
                if (tabType === 'card') {
                  lintWidth = tabWidth;
                  lintHeight = tabHeight;
                  lintTop = tabEl.offsetTop;
                } else if (tabType === 'border-card') {
                  lintWidth = tabWidth;
                  lintHeight = tabHeight;
                  lintTop = tabEl.offsetTop - 1;
                } else {
                  lintHeight = Math.max(4, Math.floor(tabHeight * 0.6));
                  lintTop = tabEl.offsetTop + Math.floor((tabHeight - lintHeight) / 2);
                }
              }
            }
          } else {
            isOver = scrollWidth !== clientWidth;
            if (index > -1) {
              const tabEl = children[index];
              if (tabEl) {
                const tabWidth = tabEl.clientWidth;
                if (tabType === 'card') {
                  lintWidth = tabWidth + 1;
                  lintLeft = tabEl.offsetLeft;
                } else if (tabType === 'border-card') {
                  lintWidth = tabWidth;
                  lintLeft = tabEl.offsetLeft - 1;
                } else {
                  lintWidth = Math.max(4, Math.floor(tabWidth * 0.6));
                  lintLeft = tabEl.offsetLeft + Math.floor((tabWidth - lintWidth) / 2);
                }
              }
            }
          }
        }
        reactData.scrollbarWidth = sBarWidth;
        reactData.scrollbarHeight = sBarHeight;
        reactData.lintLeft = lintLeft;
        reactData.lintTop = lintTop;
        reactData.lintWidth = lintWidth;
        reactData.lintHeight = lintHeight;
        reactData.isTabOver = isOver;
        checkScrolling();
      };
      handleStyle();
      (0, _vue.nextTick)(handleStyle);
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $tabs: $xeTabs
      }, params));
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const addInitName = (name, evnt) => {
      const {
        initNames
      } = reactData;
      if (name && !initNames.includes(name)) {
        dispatchEvent('tab-load', {
          name
        }, evnt);
        initNames.push(name);
        return true;
      }
      return false;
    };
    const initDefaultName = list => {
      let activeName = null;
      const nameMaps = {};
      if (list && list.length) {
        let validVal = false;
        activeName = props.modelValue;
        list.forEach(item => {
          const {
            name,
            preload
          } = item || {};
          if (name) {
            nameMaps[`${name}`] = {
              loading: false
            };
            if (activeName === name) {
              validVal = true;
            }
            if (preload) {
              addInitName(name, null);
            }
          }
        });
        if (!validVal) {
          activeName = list[0].name;
          addInitName(activeName, null);
          emitModel(activeName);
        }
      }
      reactData.activeName = activeName;
      reactData.cacheTabMaps = nameMaps;
    };
    const clickEvent = (evnt, item) => {
      const {
        trigger
      } = props;
      const beforeMethod = props.beforeChangeMethod || (0, _ui.getConfig)().tabs.beforeChangeMethod;
      const {
        activeName
      } = reactData;
      const {
        name
      } = item;
      const value = name;
      dispatchEvent('tab-click', {
        name
      }, evnt);
      if (trigger === 'manual') {
        return;
      }
      if (name !== activeName) {
        Promise.resolve(!beforeMethod || beforeMethod({
          $tabs: $xeTabs,
          name,
          oldName: activeName,
          newName: name,
          option: item
        })).then(status => {
          if (status) {
            reactData.activeName = name;
            emitModel(value);
            addInitName(name, evnt);
            dispatchEvent('change', {
              value,
              name,
              oldName: activeName,
              newName: name,
              option: item
            }, evnt);
            dispatchEvent('tab-change', {
              value,
              name,
              oldName: activeName,
              newName: name,
              option: item
            }, evnt);
          } else {
            dispatchEvent('tab-change-fail', {
              value,
              name,
              oldName: activeName,
              newName: name,
              option: item
            }, evnt);
          }
        }).catch(() => {
          dispatchEvent('tab-change-fail', {
            value,
            name,
            oldName: activeName,
            newName: name,
            option: item
          }, evnt);
        });
      }
    };
    const handleRefreshTabEvent = (evnt, item) => {
      evnt.stopPropagation();
      const {
        activeName,
        cacheTabMaps
      } = reactData;
      const {
        name
      } = item;
      const refreshOpts = computeRefreshOpts.value;
      const {
        queryMethod
      } = refreshOpts;
      const cacheItem = name ? cacheTabMaps[`${name}`] : null;
      if (cacheItem) {
        if (queryMethod) {
          if (cacheItem.loading) {
            return;
          }
          cacheItem.loading = true;
          Promise.resolve(queryMethod({
            $tabs: $xeTabs,
            value: activeName,
            name,
            option: item
          })).finally(() => {
            cacheItem.loading = false;
          });
        } else {
          (0, _log.errLog)('vxe.error.notFunc', ['refresh-config.queryMethod']);
        }
      }
    };
    const handleCloseTabEvent = (evnt, item, index, list) => {
      evnt.stopPropagation();
      const {
        activeName
      } = reactData;
      const closeOpts = computeCloseOpts.value;
      const beforeMethod = closeOpts.beforeMethod || props.beforeCloseMethod || (0, _ui.getConfig)().tabs.beforeCloseMethod;
      const {
        name
      } = item;
      const value = activeName;
      let nextName = value;
      if (activeName === name) {
        const nextItem = index < list.length - 1 ? list[index + 1] : list[index - 1];
        nextName = nextItem ? nextItem.name : null;
      }
      Promise.resolve(!beforeMethod || beforeMethod({
        $tabs: $xeTabs,
        value,
        name,
        nextName,
        option: item
      })).then(status => {
        if (status) {
          dispatchEvent('tab-close', {
            value,
            name,
            nextName
          }, evnt);
        } else {
          dispatchEvent('tab-close-fail', {
            value,
            name,
            nextName
          }, evnt);
        }
      }).catch(() => {
        dispatchEvent('tab-close-fail', {
          value,
          name,
          nextName
        }, evnt);
      });
    };
    const startScrollAnimation = (offsetPos, offsetSize) => {
      const {
        slTimeout
      } = internalData;
      const lrPosition = computeLrPosition.value;
      let offsetLeft = lrPosition ? 0 : offsetSize;
      let offsetTop = lrPosition ? offsetSize : 0;
      let scrollCount = 6;
      let delayNum = 35;
      if (slTimeout) {
        clearTimeout(slTimeout);
        internalData.slTimeout = undefined;
      }
      const scrollAnimate = () => {
        const headerWrapperEl = refHeadWrapperElem.value;
        if (scrollCount > 0) {
          scrollCount--;
          if (headerWrapperEl) {
            const {
              clientWidth,
              clientHeight,
              scrollWidth,
              scrollHeight,
              scrollLeft,
              scrollTop
            } = headerWrapperEl;
            if (lrPosition) {
              offsetTop = Math.floor(offsetTop / 2);
              if (offsetPos > 0) {
                if (clientHeight + scrollTop < scrollHeight) {
                  headerWrapperEl.scrollTop += offsetTop;
                  delayNum -= 4;
                  internalData.slTimeout = setTimeout(scrollAnimate, delayNum);
                }
              } else {
                if (scrollTop > 0) {
                  headerWrapperEl.scrollTop -= offsetTop;
                  delayNum -= 4;
                  internalData.slTimeout = setTimeout(scrollAnimate, delayNum);
                }
              }
            } else {
              offsetLeft = Math.floor(offsetLeft / 2);
              if (offsetPos > 0) {
                if (clientWidth + scrollLeft < scrollWidth) {
                  headerWrapperEl.scrollLeft += offsetLeft;
                  delayNum -= 4;
                  internalData.slTimeout = setTimeout(scrollAnimate, delayNum);
                }
              } else {
                if (scrollLeft > 0) {
                  headerWrapperEl.scrollLeft -= offsetLeft;
                  delayNum -= 4;
                  internalData.slTimeout = setTimeout(scrollAnimate, delayNum);
                }
              }
            }
            updateTabStyle();
          }
        }
      };
      scrollAnimate();
    };
    const handleScrollToLeft = offsetPos => {
      const lrPosition = computeLrPosition.value;
      const headerWrapperEl = refHeadWrapperElem.value;
      if (headerWrapperEl) {
        const {
          clientWidth,
          clientHeight
        } = headerWrapperEl;
        const offsetSize = Math.floor((lrPosition ? clientHeight : clientWidth) * 0.75);
        startScrollAnimation(offsetPos, offsetSize);
      }
    };
    const scrollLeftEvent = () => {
      handleScrollToLeft(-1);
    };
    const scrollRightEvent = () => {
      handleScrollToLeft(1);
    };
    const scrollToTab = name => {
      const tabOptions = computeTabOptions.value;
      const tabStaticOptions = computeTabStaticOptions.value;
      const lrPosition = computeLrPosition.value;
      return (0, _vue.nextTick)().then(() => {
        const headerWrapperEl = refHeadWrapperElem.value;
        if (headerWrapperEl) {
          const index = _xeUtils.default.findIndexOf(tabStaticOptions.length ? tabStaticOptions : tabOptions, item => item.name === name);
          if (index > -1) {
            const {
              scrollLeft,
              scrollTop,
              clientWidth,
              clientHeight,
              children
            } = headerWrapperEl;
            const tabEl = children[index];
            if (tabEl) {
              if (lrPosition) {
                const tabOffsetTop = tabEl.offsetTop;
                const tabClientHeight = tabEl.clientHeight;
                // 如果顶部被挡
                const overSize = tabOffsetTop + tabClientHeight - (scrollTop + clientHeight);
                if (overSize > 0) {
                  headerWrapperEl.scrollTop += overSize;
                }
                // 如果底部被挡，优先
                if (tabOffsetTop < scrollTop) {
                  headerWrapperEl.scrollTop = tabOffsetTop;
                }
              } else {
                const tabOffsetLeft = tabEl.offsetLeft;
                const tabClientWidth = tabEl.clientWidth;
                // 如果右侧被挡
                const overSize = tabOffsetLeft + tabClientWidth - (scrollLeft + clientWidth);
                if (overSize > 0) {
                  headerWrapperEl.scrollLeft += overSize;
                }
                // 如果左侧被挡，优先
                if (tabOffsetLeft < scrollLeft) {
                  headerWrapperEl.scrollLeft = tabOffsetLeft;
                }
              }
            }
          }
          updateTabStyle();
        }
      });
    };
    const handlePrevNext = isNext => {
      const {
        activeName
      } = reactData;
      const tabOptions = computeTabOptions.value;
      const tabStaticOptions = computeTabStaticOptions.value;
      const list = tabStaticOptions.length ? tabStaticOptions : tabOptions;
      const index = _xeUtils.default.findIndexOf(list, item => item.name === activeName);
      if (index > -1) {
        let item = null;
        if (isNext) {
          if (index < list.length - 1) {
            item = list[index + 1];
          }
        } else {
          if (index > 0) {
            item = list[index - 1];
          }
        }
        if (item) {
          const name = item.name;
          const value = name;
          reactData.activeName = name;
          emitModel(value);
          addInitName(name, null);
        }
      }
      return (0, _vue.nextTick)();
    };
    const tabsMethods = {
      dispatchEvent,
      scrollToTab,
      prev() {
        return handlePrevNext(false);
      },
      next() {
        return handlePrevNext(true);
      },
      prevTab() {
        (0, _log.warnLog)('vxe.error.delFunc', ['[tabs] prevTab', 'prev']);
        return tabsMethods.prev();
      },
      nextTab() {
        (0, _log.warnLog)('vxe.error.delFunc', ['[tabs] nextTab', 'next']);
        return tabsMethods.next();
      }
    };
    const tabsPrivateMethods = {};
    Object.assign($xeTabs, tabsMethods, tabsPrivateMethods);
    const renderTabHeader = tabList => {
      const {
        titleWidth: allTitleWidth,
        titleAlign: allTitleAlign,
        showClose,
        closeConfig,
        refreshConfig
      } = props;
      const {
        activeName,
        scrollbarWidth,
        scrollbarHeight,
        isTabOver,
        cacheTabMaps
      } = reactData;
      const tabType = computeTabType.value;
      const tabPosition = computeTabPosition.value;
      const lrPosition = computeLrPosition.value;
      const lineStyle = computeLineStyle.value;
      const tabPrefixSlot = slots.tabPrefix || slots['tab-prefix'] || slots.prefix;
      const tabSuffixSlot = slots.tabSuffix || slots['tab-suffix'] || slots.suffix || slots.extra;
      const closeOpts = computeCloseOpts.value;
      const closeVisibleMethod = closeOpts.visibleMethod;
      const refreshOpts = computeRefreshOpts.value;
      const refreshVisibleMethod = refreshOpts.visibleMethod;
      return (0, _vue.h)('div', {
        key: 'th',
        class: ['vxe-tabs-header', `type--${tabType}`, `pos--${tabPosition}`]
      }, [tabPrefixSlot ? (0, _vue.h)('div', {
        class: ['vxe-tabs-header--prefix', `type--${tabType}`, `pos--${tabPosition}`]
      }, callSlot(tabPrefixSlot, {
        name: activeName
      })) : (0, _ui.renderEmptyElement)($xeTabs), isTabOver ? (0, _vue.h)('div', {
        ref: refHeadPrevElem,
        class: ['vxe-tabs-header--bar vxe-tabs-header--prev-bar', `type--${tabType}`, `pos--${tabPosition}`],
        onClick: scrollLeftEvent
      }, [(0, _vue.h)('span', {
        class: lrPosition ? (0, _ui.getIcon)().TABS_TAB_BUTTON_TOP : (0, _ui.getIcon)().TABS_TAB_BUTTON_LEFT
      })]) : (0, _ui.renderEmptyElement)($xeTabs), (0, _vue.h)('div', {
        class: ['vxe-tabs-header--wrapper', `type--${tabType}`, `pos--${tabPosition}`]
      }, [(0, _vue.h)('div', {
        ref: refHeadWrapperElem,
        class: 'vxe-tabs-header--item-wrapper',
        style: lrPosition ? {
          marginRight: `-${scrollbarWidth + scrollbarOffsetSize}px`,
          paddingRight: `${scrollbarOffsetSize}px`
        } : {
          marginBottom: `-${scrollbarHeight + scrollbarOffsetSize}px`,
          paddingBottom: `${scrollbarOffsetSize}px`
        },
        onScroll: checkScrolling
      }, tabList.map((item, index) => {
        const {
          title,
          titleWidth,
          titleAlign,
          icon,
          name
        } = item;
        const itemSlots = item.slots || {};
        const titleSlot = itemSlots.title || itemSlots.tab;
        const titlePrefixSlot = itemSlots.titlePrefix || itemSlots['title-prefix'];
        const titleSuffixSlot = itemSlots.titleSuffix || itemSlots['title-suffix'];
        const itemWidth = titleWidth || allTitleWidth;
        const itemAlign = titleAlign || allTitleAlign;
        const params = {
          $tabs: $xeTabs,
          value: activeName,
          name,
          option: item
        };
        const isActive = activeName === name;
        const cacheItem = name ? cacheTabMaps[`${name}`] : null;
        const isLoading = cacheItem ? cacheItem.loading : false;
        return (0, _vue.h)('div', {
          key: `${name}`,
          class: ['vxe-tabs-header--item', `type--${tabType}`, `pos--${tabPosition}`, itemAlign ? `align--${itemAlign}` : '', {
            'is--active': isActive
          }],
          style: itemWidth ? {
            width: (0, _dom.toCssUnit)(itemWidth)
          } : undefined,
          onClick(evnt) {
            clickEvent(evnt, item);
          }
        }, [(0, _vue.h)('div', {
          class: 'vxe-tabs-header--item-inner'
        }, [(0, _vue.h)('div', {
          class: 'vxe-tabs-header--item-content'
        }, [icon ? (0, _vue.h)('span', {
          class: 'vxe-tabs-header--item-icon'
        }, [(0, _vue.h)('i', {
          class: icon
        })]) : (0, _ui.renderEmptyElement)($xeTabs), titlePrefixSlot ? (0, _vue.h)('span', {
          class: 'vxe-tabs-header--item-prefix'
        }, callSlot(titlePrefixSlot, {
          name,
          title
        })) : (0, _ui.renderEmptyElement)($xeTabs), (0, _vue.h)('span', {
          class: 'vxe-tabs-header--item-name'
        }, titleSlot ? callSlot(titleSlot, {
          name,
          title
        }) : `${title}`), titleSuffixSlot ? (0, _vue.h)('span', {
          class: 'vxe-tabs-header--item-suffix'
        }, callSlot(titleSuffixSlot, {
          name,
          title
        })) : (0, _ui.renderEmptyElement)($xeTabs)]), ((0, _utils.isEnableConf)(refreshConfig) || refreshOpts.enabled) && (refreshVisibleMethod ? refreshVisibleMethod(params) : true) ? (0, _vue.h)('div', {
          class: ['vxe-tabs-header--refresh-btn', {
            'is--active': isActive,
            'is--loading': isLoading,
            'is--disabled': isLoading
          }],
          onClick(evnt) {
            handleRefreshTabEvent(evnt, item);
          }
        }, [(0, _vue.h)('i', {
          class: isLoading ? (0, _ui.getIcon)().TABS_TAB_REFRESH_LOADING : (0, _ui.getIcon)().TABS_TAB_REFRESH
        })]) : (0, _ui.renderEmptyElement)($xeTabs), (showClose || (0, _utils.isEnableConf)(closeConfig) || closeOpts.enabled) && (!closeVisibleMethod || closeVisibleMethod(params)) ? (0, _vue.h)('div', {
          class: ['vxe-tabs-header--close-btn', {
            'is--active': isActive
          }],
          onClick(evnt) {
            handleCloseTabEvent(evnt, item, index, tabList);
          }
        }, [(0, _vue.h)('i', {
          class: (0, _ui.getIcon)().TABS_TAB_CLOSE
        })]) : (0, _ui.renderEmptyElement)($xeTabs)])]);
      }).concat([(0, _vue.h)('span', {
        key: 'line',
        class: ['vxe-tabs-header--active-line', `type--${tabType}`, `pos--${tabPosition}`],
        style: lineStyle
      })]))]), isTabOver ? (0, _vue.h)('div', {
        ref: refHeadNextElem,
        class: ['vxe-tabs-header--bar vxe-tabs-header--next-bar', `type--${tabType}`, `pos--${tabPosition}`],
        onClick: scrollRightEvent
      }, [(0, _vue.h)('span', {
        class: lrPosition ? (0, _ui.getIcon)().TABS_TAB_BUTTON_BOTTOM : (0, _ui.getIcon)().TABS_TAB_BUTTON_RIGHT
      })]) : (0, _ui.renderEmptyElement)($xeTabs), tabSuffixSlot ? (0, _vue.h)('div', {
        class: ['vxe-tabs-header--suffix', `type--${tabType}`, `pos--${tabPosition}`]
      }, callSlot(tabSuffixSlot, {
        name: activeName
      })) : (0, _ui.renderEmptyElement)($xeTabs)]);
    };
    const renderTabPane = item => {
      const {
        initNames,
        activeName
      } = reactData;
      const {
        name,
        slots
      } = item;
      const defaultSlot = slots ? slots.default : null;
      return name && initNames.includes(name) ? (0, _vue.h)('div', {
        key: `${name}`,
        class: ['vxe-tabs-pane--item', {
          'is--visible': activeName === name
        }]
      }, defaultSlot ? callSlot(defaultSlot, {
        name
      }) : []) : (0, _ui.renderEmptyElement)($xeTabs);
    };
    const renderTabContent = tabList => {
      const {
        destroyOnClose
      } = props;
      const {
        activeName
      } = reactData;
      if (destroyOnClose) {
        const activeTab = tabList.find(item => item.name === activeName);
        return [activeTab ? renderTabPane(activeTab) : (0, _ui.renderEmptyElement)($xeTabs)];
      }
      return tabList.map(item => renderTabPane(item));
    };
    const rendetTabBody = tabList => {
      const {
        height,
        padding,
        showBody
      } = props;
      const {
        activeName,
        cacheTabMaps
      } = reactData;
      const vSize = computeSize.value;
      const tabType = computeTabType.value;
      const tabPosition = computeTabPosition.value;
      const refreshOpts = computeRefreshOpts.value;
      const {
        showLoading
      } = refreshOpts;
      const headerpSlot = slots.header;
      const footerSlot = slots.footer;
      if (!showBody) {
        return (0, _ui.renderEmptyElement)($xeTabs);
      }
      const cacheItem = activeName ? cacheTabMaps[`${activeName}`] : null;
      const isLoading = cacheItem ? cacheItem.loading : false;
      const defParams = {
        name: activeName
      };
      return (0, _vue.h)('div', {
        key: 'tb',
        class: ['vxe-tabs-pane--wrapper', `type--${tabType}`, `pos--${tabPosition}`, {
          'is--content': showBody
        }]
      }, [headerpSlot ? (0, _vue.h)('div', {
        class: 'vxe-tabs-pane--header'
      }, callSlot(headerpSlot, defParams)) : (0, _ui.renderEmptyElement)($xeTabs), (0, _vue.h)('div', {
        class: ['vxe-tabs-pane--body', `type--${tabType}`, `pos--${tabPosition}`, {
          [`size--${vSize}`]: vSize,
          'is--padding': padding,
          'is--height': height
        }]
      }, renderTabContent(tabList)), footerSlot ? (0, _vue.h)('div', {
        class: 'vxe-tabs-pane--footer'
      }, callSlot(footerSlot, defParams)) : (0, _ui.renderEmptyElement)($xeTabs), showLoading && isLoading ? (0, _ui.renderEmptyElement)($xeTabs) : (0, _vue.h)(_loading.default, {
        class: 'vxe-tabs--loading',
        modelValue: isLoading
      })]);
    };
    const renderVN = () => {
      const {
        height,
        padding,
        trigger
      } = props;
      const {
        activeName
      } = reactData;
      const vSize = computeSize.value;
      const tabOptions = computeTabOptions.value;
      const tabStaticOptions = computeTabStaticOptions.value;
      const tabType = computeTabType.value;
      const tabPosition = computeTabPosition.value;
      const wrapperStyle = computeWrapperStyle.value;
      const defaultSlot = slots.default;
      const tabList = defaultSlot ? tabStaticOptions : tabOptions;
      const vns = [(0, _vue.h)('div', {
        key: 'ts',
        class: 'vxe-tabs-slots'
      }, defaultSlot ? defaultSlot({
        name: activeName
      }) : [])];
      if (tabPosition === 'right' || tabPosition === 'bottom') {
        vns.push(rendetTabBody(tabList), renderTabHeader(tabList));
      } else {
        vns.push(renderTabHeader(tabList), rendetTabBody(tabList));
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-tabs', `pos--${tabPosition}`, `vxe-tabs--${tabType}`, `trigger--${trigger === 'manual' ? 'trigger' : 'default'}`, {
          [`size--${vSize}`]: vSize,
          'is--padding': padding,
          'is--height': height
        }],
        style: wrapperStyle
      }, vns);
    };
    (0, _vue.watch)(() => props.position, () => {
      reactData.resizeFlag++;
    });
    (0, _vue.watch)(() => props.modelValue, val => {
      addInitName(val, null);
      reactData.activeName = val;
    });
    (0, _vue.watch)(() => reactData.activeName, val => {
      scrollToTab(val);
    });
    const optsFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.options ? props.options.length : -1, () => {
      optsFlag.value++;
    });
    (0, _vue.watch)(() => props.options, () => {
      optsFlag.value++;
    });
    (0, _vue.watch)(optsFlag, () => {
      initDefaultName(props.options);
      reactData.resizeFlag++;
    });
    const stFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => reactData.staticTabs ? reactData.staticTabs.length : -1, () => {
      stFlag.value++;
    });
    (0, _vue.watch)(() => reactData.staticTabs, () => {
      stFlag.value++;
    });
    (0, _vue.watch)(stFlag, () => {
      initDefaultName(reactData.staticTabs);
      reactData.resizeFlag++;
    });
    (0, _vue.watch)(computeParentTabsResizeFlag, () => {
      reactData.resizeFlag++;
    });
    (0, _vue.watch)(() => reactData.resizeFlag, () => {
      (0, _vue.nextTick)(() => {
        updateTabStyle();
      });
    });
    (0, _vue.onMounted)(() => {
      updateTabStyle();
      _ui.globalEvents.on($xeTabs, 'resize', updateTabStyle);
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeTabs, 'resize');
    });
    (0, _vue.provide)('$xeTabs', $xeTabs);
    addInitName(props.modelValue, null);
    initDefaultName(reactData.staticTabs.length ? reactData.staticTabs : props.options);
    $xeTabs.renderVN = renderVN;
    return $xeTabs;
  },
  render() {
    return this.renderVN();
  }
});