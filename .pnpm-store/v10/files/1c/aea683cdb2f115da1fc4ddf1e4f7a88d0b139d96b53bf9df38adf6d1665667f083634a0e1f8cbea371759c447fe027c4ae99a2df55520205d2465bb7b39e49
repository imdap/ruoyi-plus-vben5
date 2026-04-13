"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
var _dom = require("../../ui/src/dom");
var _vn = require("../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createInternalData() {
  return {
    // leaveTime: null
  };
}
function createReactData() {
  return {
    visible: false,
    activeOption: null,
    activeChildOption: null,
    popupStyle: {
      top: '',
      left: '',
      zIndex: 0
    },
    childOffsetX: 0
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeContextMenu',
  props: {
    modelValue: Boolean,
    className: String,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().contextMenu.size || (0, _ui.getConfig)().size
    },
    options: Array,
    x: [Number, String],
    y: [Number, String],
    autoLocate: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().contextMenu.autoLocate
    },
    zIndex: [Number, String],
    position: {
      type: String,
      default: () => (0, _ui.getConfig)().contextMenu.position
    },
    destroyOnClose: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().contextMenu.destroyOnClose
    },
    transfer: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().contextMenu.transfer
    }
  },
  emits: ['update:modelValue', 'option-click', 'change', 'show', 'hide'],
  setup(props, context) {
    const {
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
    const computeMenuGroups = (0, _vue.computed)(() => {
      const {
        options
      } = props;
      return options || [];
    });
    const computeAllFirstMenuList = (0, _vue.computed)(() => {
      const menuGroups = computeMenuGroups.value;
      const firstList = [];
      for (let i = 0; i < menuGroups.length; i++) {
        const list = menuGroups[i];
        for (let j = 0; j < list.length; j++) {
          const firstItem = list[j];
          if (hasValidItem(firstItem)) {
            firstList.push(firstItem);
          }
        }
      }
      return firstList;
    });
    const computeTopAndLeft = (0, _vue.computed)(() => {
      const {
        x,
        y
      } = props;
      return `${x}${y}`;
    });
    const computeMaps = {};
    const $xeContextMenu = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $contextMenu: $xeContextMenu
      }, params));
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const openMenu = () => {
      const {
        modelValue
      } = props;
      const {
        visible
      } = reactData;
      const value = true;
      reactData.visible = value;
      handleLocate();
      updateZindex();
      if (modelValue !== value) {
        emitModel(value);
        dispatchEvent('change', {
          value
        }, null);
      }
      if (visible !== value) {
        dispatchEvent('show', {
          visible: value
        }, null);
      }
      return (0, _vue.nextTick)().then(() => {
        updateLocate();
      });
    };
    const closeMenu = () => {
      const {
        modelValue
      } = props;
      const {
        visible
      } = reactData;
      const value = false;
      reactData.visible = value;
      if (modelValue !== value) {
        emitModel(value);
        dispatchEvent('change', {
          value
        }, null);
      }
      if (visible !== value) {
        dispatchEvent('hide', {
          visible: value
        }, null);
      }
      return (0, _vue.nextTick)();
    };
    const handleLocate = () => {
      const {
        x,
        y
      } = props;
      const {
        popupStyle
      } = reactData;
      popupStyle.left = (0, _dom.toCssUnit)(x || 0);
      popupStyle.top = (0, _dom.toCssUnit)(y || 0);
      updateLocate();
    };
    const updateZindex = () => {
      const {
        zIndex,
        transfer
      } = props;
      const {
        popupStyle
      } = reactData;
      const menuZIndex = popupStyle.zIndex;
      if (zIndex) {
        popupStyle.zIndex = _xeUtils.default.toNumber(zIndex);
      } else {
        if (menuZIndex < (0, _utils.getLastZIndex)()) {
          popupStyle.zIndex = transfer ? (0, _utils.nextSubZIndex)() : (0, _utils.nextZIndex)();
        }
      }
    };
    const updateLocate = () => {
      const {
        autoLocate,
        position
      } = props;
      const {
        popupStyle
      } = reactData;
      if (autoLocate) {
        const wrapperEl = refElem.value;
        if (wrapperEl) {
          const {
            visibleWidth,
            visibleHeight
          } = (0, _dom.getDomNode)();
          const wrapperStyle = getComputedStyle(wrapperEl);
          const offsetTop = _xeUtils.default.toNumber(wrapperStyle.top);
          const offsetLeft = _xeUtils.default.toNumber(wrapperStyle.left);
          const wrapperWidth = wrapperEl.offsetWidth;
          const wrapperHeight = wrapperEl.offsetHeight;
          if (position === 'absolute') {
            //
          } else {
            if (offsetTop + wrapperHeight > visibleHeight) {
              popupStyle.top = `${Math.max(0, offsetTop - wrapperHeight)}px`;
            }
            if (offsetLeft + wrapperWidth > visibleWidth) {
              popupStyle.left = `${Math.max(0, offsetLeft - wrapperWidth)}px`;
            }
          }
        }
      }
      updateChildLocate();
    };
    const updateChildLocate = () => {
      const wrapperEl = refElem.value;
      if (wrapperEl) {
        const {
          visibleWidth
        } = (0, _dom.getDomNode)();
        const owSize = 4;
        const handleStyle = () => {
          const wrapperStyle = getComputedStyle(wrapperEl);
          const offsetLeft = _xeUtils.default.toNumber(wrapperStyle.left);
          const wrapperWidth = wrapperEl.offsetWidth;
          const childEl = wrapperEl.querySelector('.vxe-context-menu--children-wrapper');
          const childWidth = childEl ? childEl.offsetWidth : wrapperWidth;
          if (offsetLeft + wrapperWidth > visibleWidth - childWidth) {
            // 往左
            reactData.childOffsetX = -childWidth + owSize;
          } else {
            // 往右
            reactData.childOffsetX = wrapperWidth - owSize;
          }
        };
        handleStyle();
        (0, _vue.nextTick)(() => {
          handleStyle();
        });
      }
    };
    const handleVisible = () => {
      const {
        modelValue
      } = props;
      if (modelValue) {
        openMenu();
      } else {
        closeMenu();
      }
    };
    const tagMethods = {
      dispatchEvent,
      open: openMenu,
      close: closeMenu
    };
    const hasChildMenu = item => {
      const {
        children
      } = item;
      return children && children.some(child => child.visible !== false);
    };
    const handleItemClickEvent = (evnt, item) => {
      evnt.preventDefault();
      evnt.stopPropagation();
      if (!item.disabled && !item.loading && !hasChildMenu(item)) {
        dispatchEvent('option-click', {
          option: item
        }, evnt);
        closeMenu();
      }
    };
    const handleItemMouseenterEvent = (evnt, item, parentitem) => {
      const {
        leaveTime
      } = internalData;
      if (leaveTime) {
        clearTimeout(leaveTime);
      }
      reactData.activeOption = parentitem || item;
      if (parentitem) {
        reactData.activeOption = parentitem;
        reactData.activeChildOption = item;
      } else {
        reactData.activeOption = item;
        if (hasChildMenu(item)) {
          reactData.activeChildOption = findFirstChildItem(item);
          (0, _vue.nextTick)(() => {
            updateChildLocate();
          });
        } else {
          reactData.activeChildOption = null;
        }
      }
    };
    const handleItemMouseleaveEvent = () => {
      const {
        leaveTime
      } = internalData;
      if (leaveTime) {
        clearTimeout(leaveTime);
      }
      internalData.leaveTime = setTimeout(() => {
        internalData.leaveTime = null;
        reactData.activeOption = null;
        reactData.activeChildOption = null;
      }, 300);
    };
    const hasValidItem = item => {
      return !item.loading && !item.disabled && item.visible !== false;
    };
    const findNextFirstItem = (allFirstList, firstItem) => {
      for (let i = 0; i < allFirstList.length; i++) {
        const item = allFirstList[i];
        if (firstItem === item) {
          const nextItem = allFirstList[i + 1];
          if (nextItem) {
            return nextItem;
          }
        }
      }
      return _xeUtils.default.first(allFirstList);
    };
    const findPrevFirstItem = (allFirstList, firstItem) => {
      for (let i = 0; i < allFirstList.length; i++) {
        const item = allFirstList[i];
        if (firstItem === item) {
          if (i > 0) {
            return allFirstList[i - 1];
          }
        }
      }
      return _xeUtils.default.last(allFirstList);
    };
    const findFirstChildItem = firstItem => {
      const {
        children
      } = firstItem;
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const item = children[i];
          if (hasValidItem(item)) {
            return item;
          }
        }
      }
      return null;
    };
    const findPrevChildItem = (firstItem, childItem) => {
      const {
        children
      } = firstItem;
      let prevValidItem = null;
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const item = children[i];
          if (childItem === item) {
            break;
          }
          if (hasValidItem(item)) {
            prevValidItem = item;
          }
        }
        if (!prevValidItem) {
          for (let len = children.length - 1; len >= 0; len--) {
            const item = children[len];
            if (hasValidItem(item)) {
              return item;
            }
          }
        }
      }
      return prevValidItem;
    };
    const findNextChildItem = (firstItem, childItem) => {
      const {
        children
      } = firstItem;
      let firstValidItem = null;
      if (children) {
        let isMetch = false;
        for (let i = 0; i < children.length; i++) {
          const item = children[i];
          if (!firstValidItem) {
            if (hasValidItem(item)) {
              firstValidItem = item;
            }
          }
          if (isMetch) {
            if (hasValidItem(item)) {
              return item;
            }
          } else {
            isMetch = childItem === item;
          }
        }
      }
      return firstValidItem;
    };
    const handleGlobalMousewheelEvent = evnt => {
      const {
        visible
      } = reactData;
      if (visible) {
        const el = refElem.value;
        if (!(0, _dom.getEventTargetNode)(evnt, el, '').flag) {
          closeMenu();
        }
      }
    };
    const handleGlobalKeydownEvent = evnt => {
      const {
        visible,
        activeOption,
        activeChildOption
      } = reactData;
      const allFirstMenuList = computeAllFirstMenuList.value;
      if (visible) {
        const isUpArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_UP);
        const isDwArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_DOWN);
        const isLeftArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_LEFT);
        const isRightArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_RIGHT);
        const isEnter = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ENTER);
        const isEsc = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ESCAPE);
        if (isEsc) {
          closeMenu();
          return;
        }
        // 回车选中
        if (isEnter) {
          if (activeOption || activeChildOption) {
            evnt.preventDefault();
            evnt.stopPropagation();
            if (!activeChildOption && hasChildMenu(activeOption)) {
              reactData.activeChildOption = findFirstChildItem(activeOption);
              updateChildLocate();
              return;
            }
            handleItemClickEvent(evnt, activeChildOption || activeOption);
            return;
          }
        }
        // 方向键操作
        if (activeChildOption) {
          if (isUpArrow) {
            evnt.preventDefault();
            reactData.activeChildOption = findPrevChildItem(activeOption, activeChildOption);
            updateChildLocate();
          } else if (isDwArrow) {
            evnt.preventDefault();
            reactData.activeChildOption = findNextChildItem(activeOption, activeChildOption);
            updateChildLocate();
          } else if (isLeftArrow) {
            evnt.preventDefault();
            reactData.activeChildOption = null;
          }
        } else if (activeOption) {
          evnt.preventDefault();
          if (isUpArrow) {
            reactData.activeOption = findPrevFirstItem(allFirstMenuList, activeOption);
          } else if (isDwArrow) {
            reactData.activeOption = findNextFirstItem(allFirstMenuList, activeOption);
          } else {
            if (hasChildMenu(activeOption)) {
              if (isRightArrow) {
                reactData.activeChildOption = findFirstChildItem(activeOption);
                updateChildLocate();
              }
            }
          }
        } else {
          evnt.preventDefault();
          reactData.activeOption = _xeUtils.default.first(allFirstMenuList);
        }
      }
    };
    const handleGlobalMousedownEvent = evnt => {
      const {
        visible
      } = reactData;
      if (visible) {
        const el = refElem.value;
        if (!(0, _dom.getEventTargetNode)(evnt, el, '').flag) {
          closeMenu();
        }
      }
    };
    const handleGlobalBlurEvent = () => {
      const {
        visible
      } = reactData;
      if (visible) {
        closeMenu();
      }
    };
    const tagPrivateMethods = {};
    Object.assign($xeContextMenu, tagMethods, tagPrivateMethods);
    const renderMenuItem = (item, parentItem, hasChildMenus) => {
      const {
        visible,
        disabled,
        loading
      } = item;
      if (visible === false) {
        return (0, _ui.renderEmptyElement)($xeContextMenu);
      }
      const prefixOpts = Object.assign({}, item.prefixConfig);
      const prefixIcon = prefixOpts.icon || item.prefixIcon;
      const suffixOpts = Object.assign({}, item.suffixConfig);
      const suffixIcon = suffixOpts.icon || item.suffixIcon;
      const menuContent = loading ? (0, _ui.getI18n)('vxe.contextMenu.loadingText') : (0, _utils.getFuncText)(item.name);
      return (0, _vue.h)('div', {
        class: ['vxe-context-menu--item-inner', {
          'is--disabled': disabled,
          'is--loading': loading
        }],
        onClick(evnt) {
          handleItemClickEvent(evnt, item);
        },
        onMouseenter(evnt) {
          handleItemMouseenterEvent(evnt, item, parentItem);
        },
        onMouseleave: handleItemMouseleaveEvent
      }, [(0, _vue.h)('div', {
        class: ['vxe-context-menu--item-prefix', prefixOpts.className || '']
      }, loading ? [(0, _vue.h)('span', {
        key: '1'
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().CONTEXT_MENU_OPTION_LOADING
      })])] : [prefixIcon && _xeUtils.default.isFunction(prefixIcon) ? (0, _vue.h)('span', {
        key: '2'
      }, (0, _vn.getSlotVNs)(prefixIcon({}))) : (0, _vue.h)('span', {
        key: '3'
      }, [(0, _vue.h)('i', {
        class: prefixIcon
      })]), prefixOpts.content ? (0, _vue.h)('span', {
        key: '4'
      }, `${prefixOpts.content || ''}`) : (0, _ui.renderEmptyElement)($xeContextMenu)]), (0, _vue.h)('div', {
        class: 'vxe-context-menu--item-label'
      }, menuContent), !loading && (suffixIcon || suffixOpts.content) ? (0, _vue.h)('div', {
        class: ['vxe-context-menu--item-suffix', suffixOpts.className || '']
      }, [suffixIcon && _xeUtils.default.isFunction(suffixIcon) ? (0, _vue.h)('span', {
        key: '2'
      }, (0, _vn.getSlotVNs)(suffixIcon({}))) : (0, _vue.h)('span', {
        key: '3'
      }, [(0, _vue.h)('i', {
        class: suffixIcon
      })]), suffixOpts.content ? (0, _vue.h)('span', {
        key: '4'
      }, `${suffixOpts.content || ''}`) : (0, _ui.renderEmptyElement)($xeContextMenu)]) : (0, _ui.renderEmptyElement)($xeContextMenu), hasChildMenus ? (0, _vue.h)('div', {
        class: 'vxe-context-menu--item-subicon'
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().CONTEXT_MENU_CHILDREN
      })]) : (0, _ui.renderEmptyElement)($xeContextMenu)]);
    };
    const renderMenus = () => {
      const {
        activeOption,
        activeChildOption,
        childOffsetX
      } = reactData;
      const menuGroups = computeMenuGroups.value;
      const mgVNs = [];
      menuGroups.forEach((menuList, gIndex) => {
        const moVNs = [];
        menuList.forEach((firstItem, i) => {
          const {
            children
          } = firstItem;
          const hasChildMenus = children && children.some(child => child.visible !== false);
          const isActiveFirst = activeOption === firstItem;
          const showChild = isActiveFirst && !!activeChildOption;
          moVNs.push((0, _vue.h)('div', {
            key: `${gIndex}_${i}`,
            class: ['vxe-context-menu--item-wrapper vxe-context-menu--first-item', firstItem.className || '', {
              'is--active': isActiveFirst,
              'is--subactive': isActiveFirst && !!activeChildOption
            }]
          }, [hasChildMenus && showChild ? (0, _vue.h)('div', {
            class: 'vxe-context-menu--children-wrapper',
            style: {
              transform: `translate(${childOffsetX}px, -2px)`
            }
          }, children.map(twoItem => {
            return (0, _vue.h)('div', {
              class: ['vxe-context-menu--item-wrapper vxe-context-menu--child-item', twoItem.className || '', {
                'is--active': activeChildOption === twoItem
              }]
            }, [renderMenuItem(twoItem, firstItem)]);
          })) : (0, _ui.renderEmptyElement)($xeContextMenu), renderMenuItem(firstItem, null, hasChildMenus)]));
        });
        mgVNs.push((0, _vue.h)('div', {
          key: gIndex,
          class: 'vxe-context-menu--group-wrapper'
        }, moVNs));
      });
      return mgVNs;
    };
    const renderVN = () => {
      const {
        className,
        position,
        destroyOnClose
      } = props;
      const {
        visible,
        popupStyle
      } = reactData;
      const vSize = computeSize.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-context-menu vxe-context-menu--wrapper', position === 'absolute' ? 'is--' + position : 'is--fixed', className || '', {
          [`size--${vSize}`]: vSize,
          'is--visible': visible
        }],
        style: popupStyle
      }, (destroyOnClose ? visible : true) ? renderMenus() : []);
    };
    (0, _vue.watch)(computeTopAndLeft, () => {
      handleLocate();
      (0, _vue.nextTick)(() => {
        updateLocate();
      });
    });
    (0, _vue.watch)(() => props.modelValue, () => {
      handleVisible();
    });
    handleVisible();
    (0, _vue.onMounted)(() => {
      _ui.globalEvents.on($xeContextMenu, 'mousewheel', handleGlobalMousewheelEvent);
      _ui.globalEvents.on($xeContextMenu, 'keydown', handleGlobalKeydownEvent);
      _ui.globalEvents.on($xeContextMenu, 'mousedown', handleGlobalMousedownEvent);
      _ui.globalEvents.on($xeContextMenu, 'blur', handleGlobalBlurEvent);
    });
    (0, _vue.onBeforeUnmount)(() => {
      const {
        leaveTime
      } = internalData;
      if (leaveTime) {
        clearTimeout(leaveTime);
      }
      _ui.globalEvents.off($xeContextMenu, 'mousewheel');
      _ui.globalEvents.off($xeContextMenu, 'keydown');
      _ui.globalEvents.off($xeContextMenu, 'mousedown');
      _ui.globalEvents.off($xeContextMenu, 'blur');
      _xeUtils.default.assign(reactData, createReactData());
      _xeUtils.default.assign(internalData, createInternalData());
    });
    $xeContextMenu.renderVN = renderVN;
    return $xeContextMenu;
  },
  render() {
    return this.renderVN();
  }
});