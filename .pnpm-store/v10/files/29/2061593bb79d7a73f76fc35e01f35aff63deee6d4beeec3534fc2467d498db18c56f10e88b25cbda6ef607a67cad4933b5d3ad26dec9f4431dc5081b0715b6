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
var _utils = require("../../ui/src/utils");
var _vn = require("../../ui/src/vn");
var _log = require("../../ui/src/log");
var _loading = _interopRequireDefault(require("../../loading"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  menus,
  getConfig,
  getIcon
} = _ui.VxeUI;
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeMenu',
  props: {
    modelValue: [String, Number],
    expandAll: Boolean,
    accordion: {
      type: Boolean,
      default: () => getConfig().menu.accordion
    },
    collapsed: {
      type: Boolean,
      default: null
    },
    collapseFixed: Boolean,
    loading: Boolean,
    options: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: () => getConfig().menu.size || getConfig().size
    },
    menuConfig: Object
  },
  emits: ['update:modelValue', 'click', 'option-menu', 'menu-click'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const $xeLayoutAside = (0, _vue.inject)('$xeLayoutAside', null);
    const refElem = (0, _vue.ref)();
    const refCollapseElem = (0, _vue.ref)();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      initialized: !!props.collapsed,
      isEnterCollapse: false,
      collapseStyle: {},
      collapseZindex: 0,
      activeName: props.modelValue,
      menuList: [],
      itemHeight: 1
    });
    const refMaps = {
      refElem
    };
    const computeMenuOpts = (0, _vue.computed)(() => {
      return Object.assign({}, getConfig().menu.menuConfig, props.menuConfig);
    });
    const computeIsCollapsed = (0, _vue.computed)(() => {
      const {
        collapsed
      } = props;
      if (_xeUtils.default.isBoolean(collapsed)) {
        return collapsed;
      }
      if ($xeLayoutAside) {
        return !!$xeLayoutAside.props.collapsed;
      }
      return false;
    });
    const computeCollapseWidth = (0, _vue.computed)(() => {
      let collapseWidth = '';
      if ($xeLayoutAside) {
        collapseWidth = $xeLayoutAside.props.collapseWidth || '';
      }
      return collapseWidth;
    });
    const computeCollapseEnterWidth = (0, _vue.computed)(() => {
      let width = '';
      if ($xeLayoutAside) {
        width = $xeLayoutAside.props.width || '';
      }
      return width;
    });
    const computeMaps = {
      computeSize
    };
    const $xeMenu = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const getMenuTitle = item => {
      return `${item.title || item.name}`;
    };
    const updateZindex = () => {
      if (reactData.collapseZindex < (0, _utils.getLastZIndex)()) {
        reactData.collapseZindex = (0, _utils.nextZIndex)();
      }
    };
    const updateActiveMenu = isDefExpand => {
      const {
        activeName
      } = reactData;
      _xeUtils.default.eachTree(reactData.menuList, (item, index, items, path, parent, nodes) => {
        if (item.itemKey === activeName) {
          nodes.forEach(obj => {
            obj.isActive = true;
            if (isDefExpand) {
              obj.isExpand = true;
            }
          });
          item.isExactActive = true;
        } else {
          item.isExactActive = false;
          item.isActive = false;
        }
      }, {
        children: 'childList'
      });
    };
    const updateMenuConfig = () => {
      const {
        options,
        expandAll
      } = props;
      reactData.menuList = _xeUtils.default.mapTree(options, (item, index, items, path, parent) => {
        const objItem = Object.assign(Object.assign({}, item), {
          parentKey: parent ? parent.name || path.slice(0, path.length - 1).join(',') : '',
          level: path.length,
          itemKey: item.name || path.join(','),
          isExactActive: false,
          isActive: false,
          isExpand: _xeUtils.default.isBoolean(item.expanded) ? item.expanded : !!expandAll,
          hasChild: item.children && item.children.length > 0
        });
        return objItem;
      }, {
        children: 'children',
        mapChildren: 'childList'
      });
    };
    const updateCollapseStyle = () => {
      const {
        collapseFixed
      } = props;
      if (collapseFixed) {
        (0, _vue.nextTick)(() => {
          const {
            isEnterCollapse
          } = reactData;
          const isCollapsed = computeIsCollapsed.value;
          const collapseEnterWidth = computeCollapseEnterWidth.value;
          const collapseWidth = computeCollapseWidth.value;
          const el = refElem.value;
          if (el) {
            const clientRect = el.getBoundingClientRect();
            const parentNode = el.parentNode;
            reactData.collapseStyle = isCollapsed ? {
              top: (0, _dom.toCssUnit)(clientRect.top),
              left: (0, _dom.toCssUnit)(clientRect.left),
              height: (0, _dom.toCssUnit)(parentNode.clientHeight),
              width: isEnterCollapse ? collapseEnterWidth ? (0, _dom.toCssUnit)(collapseEnterWidth) : '' : collapseWidth ? (0, _dom.toCssUnit)(collapseWidth) : '',
              zIndex: reactData.collapseZindex
            } : {};
          }
        });
      }
    };
    const handleCollapseMenu = () => {
      const {
        collapseFixed
      } = props;
      if (collapseFixed) {
        const {
          initialized
        } = reactData;
        const isCollapsed = computeIsCollapsed.value;
        if (isCollapsed) {
          if (!initialized) {
            reactData.initialized = true;
            (0, _vue.nextTick)(() => {
              const collapseEl = refCollapseElem.value;
              if (collapseEl) {
                document.body.appendChild(collapseEl);
              }
            });
          }
        }
        reactData.isEnterCollapse = false;
        updateZindex();
        updateCollapseStyle();
      }
    };
    const handleClickIconCollapse = (evnt, item, itemList) => {
      const {
        accordion
      } = props;
      const {
        hasChild,
        isExpand
      } = item;
      if (hasChild) {
        evnt.stopPropagation();
        evnt.preventDefault();
        if (accordion) {
          itemList.forEach(obj => {
            if (obj !== item) {
              obj.isExpand = false;
            }
          });
        }
        item.isExpand = !isExpand;
      }
    };
    const emitModel = value => {
      reactData.activeName = value;
      emit('update:modelValue', value);
    };
    const handleContextmenuEvent = (evnt, item) => {
      const {
        menuConfig
      } = props;
      const menuOpts = computeMenuOpts.value;
      if (menuConfig ? (0, _utils.isEnableConf)(menuOpts) : menuOpts.enabled) {
        const {
          options,
          visibleMethod
        } = menuOpts;
        if (!visibleMethod || visibleMethod({
          $menu: $xeMenu,
          options,
          currentMenu: item
        })) {
          if (_ui.VxeUI.contextMenu) {
            _ui.VxeUI.contextMenu.openByEvent(evnt, {
              options,
              events: {
                optionClick(eventParams) {
                  const {
                    option
                  } = eventParams;
                  const gMenuOpts = menus.get(option.code);
                  const mmMethod = gMenuOpts ? gMenuOpts.menuMenuMethod : null;
                  const params = {
                    menu: option,
                    currentMenu: item,
                    $event: evnt,
                    $menu: $xeMenu
                  };
                  if (mmMethod) {
                    mmMethod(params, evnt);
                  }
                  dispatchEvent('menu-click', params, eventParams.$event);
                }
              }
            });
          }
        }
      }
      dispatchEvent('option-menu', {
        currentMenu: item
      }, evnt);
    };
    const handleClickMenu = (evnt, item, itemList) => {
      const {
        itemKey,
        routerLink,
        hasChild
      } = item;
      if (routerLink) {
        emitModel(itemKey);
        handleMenuMouseleave();
      } else {
        if (hasChild) {
          handleClickIconCollapse(evnt, item, itemList);
        } else {
          emitModel(itemKey);
          handleMenuMouseleave();
        }
      }
      const params = {
        currentMenu: item,
        // 已废弃
        menu: item
      };
      dispatchEvent('click', params, evnt);
    };
    const handleMenuMouseenter = () => {
      const {
        collapseStyle
      } = reactData;
      const collapseEnterWidth = computeCollapseEnterWidth.value;
      reactData.collapseStyle = Object.assign({}, collapseStyle, {
        width: collapseEnterWidth ? (0, _dom.toCssUnit)(collapseEnterWidth) : ''
      });
      reactData.isEnterCollapse = true;
    };
    const handleMenuMouseover = () => {
      const {
        isEnterCollapse
      } = reactData;
      if (!isEnterCollapse) {
        handleMenuMouseenter();
      }
    };
    const handleMenuMouseleave = () => {
      const {
        collapseStyle
      } = reactData;
      const el = refElem.value;
      reactData.collapseStyle = Object.assign({}, collapseStyle, {
        width: el ? (0, _dom.toCssUnit)(el.offsetWidth) : ''
      });
      reactData.isEnterCollapse = false;
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
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $menu: $xeMenu
      }, params));
    };
    const menuMethods = {
      dispatchEvent
    };
    const menuPrivateMethods = {};
    Object.assign($xeMenu, menuMethods, menuPrivateMethods);
    const renderMenuTitle = (item, itemList) => {
      const {
        icon,
        isExpand,
        hasChild
      } = item;
      const itemSlots = item.slots || {};
      const optionSlot = itemSlots.default || slots.option;
      const titleSlot = itemSlots.title || slots.optionTitle || slots['option-title'];
      const iconSlot = itemSlots.icon || slots.optionIcon || slots['option-icon'];
      const title = getMenuTitle(item);
      const isCollapsed = computeIsCollapsed.value;
      const params = {
        currentMenu: item,
        collapsed: isCollapsed,
        // 已废弃
        option: item
      };
      return [optionSlot ? (0, _ui.renderEmptyElement)($xeMenu) : (0, _vue.h)('div', {
        class: 'vxe-menu--item-link-icon'
      }, iconSlot ? callSlot(iconSlot, params) : icon ? [(0, _vue.h)('i', {
        class: icon
      })] : []), optionSlot ? (0, _vue.h)('div', {
        class: 'vxe-menu--item-custom-title'
      }, callSlot(optionSlot, params)) : (0, _vue.h)('div', {
        class: 'vxe-menu--item-link-title',
        title
      }, titleSlot ? callSlot(titleSlot, params) : title), hasChild ? (0, _vue.h)('div', {
        class: 'vxe-menu--item-link-collapse',
        onClick(evnt) {
          handleClickIconCollapse(evnt, item, itemList);
        }
      }, [(0, _vue.h)('i', {
        class: isExpand ? getIcon().MENU_ITEM_EXPAND_OPEN : getIcon().MENU_ITEM_EXPAND_CLOSE
      })]) : (0, _ui.renderEmptyElement)($xeMenu)];
    };
    const renderDefaultChildren = (item, itemList) => {
      const {
        itemKey,
        level,
        hasChild,
        isActive,
        isExactActive,
        isExpand,
        routerLink,
        childList
      } = item;
      const {
        isEnterCollapse
      } = reactData;
      const isCollapsed = computeIsCollapsed.value;
      if (item.permissionCode) {
        if (!_ui.permission.checkVisible(item.permissionCode)) {
          return (0, _ui.renderEmptyElement)($xeMenu);
        }
      }
      return (0, _vue.h)('div', {
        key: itemKey,
        class: ['vxe-menu--item-wrapper', `vxe-menu--item-level${level}`, {
          'is--exact-active': isExactActive,
          'is--active': isActive,
          'is--expand': (!isCollapsed || isEnterCollapse) && isExpand
        }]
      }, [routerLink ? (0, _vue.h)((0, _vue.resolveComponent)('router-link'), {
        class: 'vxe-menu--item-link',
        to: routerLink,
        onContextmenu(evnt) {
          handleContextmenuEvent(evnt, item);
        },
        onClick(evnt) {
          handleClickMenu(evnt, item, itemList);
        }
      }, {
        default: () => renderMenuTitle(item, itemList)
      }) : (0, _vue.h)('div', {
        class: 'vxe-menu--item-link',
        onContextmenu(evnt) {
          handleContextmenuEvent(evnt, item);
        },
        onClick(evnt) {
          handleClickMenu(evnt, item, itemList);
        }
      }, renderMenuTitle(item, itemList)), hasChild ? (0, _vue.h)('div', {
        class: 'vxe-menu--item-group'
      }, childList.map(child => renderDefaultChildren(child, childList))) : (0, _ui.renderEmptyElement)($xeMenu)]);
    };
    const renderCollapseChildren = (item, itemList) => {
      const {
        itemKey,
        level,
        hasChild,
        isActive,
        isExactActive,
        routerLink,
        childList
      } = item;
      if (item.permissionCode) {
        if (!_ui.permission.checkVisible(item.permissionCode)) {
          return (0, _ui.renderEmptyElement)($xeMenu);
        }
      }
      return (0, _vue.h)('div', {
        key: itemKey,
        class: ['vxe-menu--item-wrapper', `vxe-menu--item-level${level}`, {
          'is--exact-active': isExactActive,
          'is--active': isActive
        }]
      }, [routerLink ? (0, _vue.h)((0, _vue.resolveComponent)('router-link'), {
        class: 'vxe-menu--item-link',
        to: routerLink,
        onContextmenu(evnt) {
          handleContextmenuEvent(evnt, item);
        },
        onClick(evnt) {
          handleClickMenu(evnt, item, itemList);
        }
      }, {
        default: () => renderMenuTitle(item, itemList)
      }) : (0, _vue.h)('div', {
        class: 'vxe-menu--item-link',
        onContextmenu(evnt) {
          handleContextmenuEvent(evnt, item);
        },
        onClick(evnt) {
          handleClickMenu(evnt, item, itemList);
        }
      }, renderMenuTitle(item, itemList)), hasChild ? (0, _vue.h)('div', {
        class: 'vxe-menu--item-group'
      }, childList.map(child => renderDefaultChildren(child, childList))) : (0, _ui.renderEmptyElement)($xeMenu)]);
    };
    const renderVN = () => {
      const {
        loading,
        collapseFixed
      } = props;
      const {
        initialized,
        menuList,
        collapseStyle,
        isEnterCollapse
      } = reactData;
      const vSize = computeSize.value;
      const isCollapsed = computeIsCollapsed.value;
      let ons = {};
      if (collapseFixed) {
        ons = {
          onMouseenter: handleMenuMouseenter,
          onMouseover: handleMenuMouseover,
          onMouseleave: handleMenuMouseleave
        };
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-menu', {
          [`size--${vSize}`]: vSize,
          'is--collapsed': isCollapsed,
          'is--loading': loading
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-menu--item-list'
      }, menuList.map(child => isCollapsed ? renderCollapseChildren(child, menuList) : renderDefaultChildren(child, menuList))), initialized ? (0, _vue.h)('div', Object.assign({
        ref: refCollapseElem,
        class: ['vxe-menu--collapse-wrapper', {
          [`size--${vSize}`]: vSize,
          'is--collapsed': isCollapsed,
          'is--enter': isEnterCollapse,
          'is--loading': loading
        }],
        style: collapseStyle
      }, ons), [isCollapsed ? (0, _vue.h)('div', {
        class: 'vxe-menu--item-list'
      }, menuList.map(child => renderDefaultChildren(child, menuList))) : (0, _ui.renderEmptyElement)($xeMenu)]) : (0, _ui.renderEmptyElement)($xeMenu),
      /**
       * 加载中
       */
      (0, _vue.h)(_loading.default, {
        class: 'vxe-list-view--loading',
        modelValue: loading
      })]);
    };
    const optFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.options ? props.options.length : -1, () => {
      optFlag.value++;
    });
    (0, _vue.watch)(() => props.options, () => {
      optFlag.value++;
    });
    (0, _vue.watch)(optFlag, () => {
      updateMenuConfig();
      updateActiveMenu(true);
    });
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.activeName = val;
    });
    (0, _vue.watch)(() => reactData.activeName, () => {
      updateActiveMenu(true);
    });
    (0, _vue.watch)(computeIsCollapsed, () => {
      handleCollapseMenu();
    });
    (0, _vue.onMounted)(() => {
      const {
        menuConfig
      } = props;
      const VxeUIContextMenu = _ui.VxeUI.getComponent('VxeContextMenu');
      if (menuConfig && !VxeUIContextMenu) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-context-menu']);
      }
      _ui.globalEvents.on($xeMenu, 'resize', updateCollapseStyle);
      updateCollapseStyle();
    });
    (0, _vue.onBeforeUnmount)(() => {
      _ui.globalEvents.off($xeMenu, 'resize');
      const collapseEl = refCollapseElem.value;
      if (collapseEl) {
        const parentNode = collapseEl.parentNode;
        if (parentNode) {
          parentNode.removeChild(collapseEl);
        }
      }
    });
    updateMenuConfig();
    updateActiveMenu(true);
    $xeMenu.renderVN = renderVN;
    return $xeMenu;
  },
  render() {
    return this.renderVN();
  }
});