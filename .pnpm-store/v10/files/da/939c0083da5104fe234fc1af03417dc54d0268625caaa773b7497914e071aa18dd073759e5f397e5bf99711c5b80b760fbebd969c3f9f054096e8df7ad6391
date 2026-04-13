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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeSplitter',
  props: {
    width: [Number, String],
    height: [Number, String],
    vertical: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().splitter.vertical
    },
    border: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().splitter.border
    },
    padding: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().splitter.padding
    },
    resize: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().splitter.resize
    },
    items: Array,
    itemConfig: Object,
    barConfig: Object,
    resizeConfig: Object,
    actionConfig: Object,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().splitter.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['action-dblclick', 'action-click', 'toggle-expand', 'resize-start', 'resize-drag', 'resize-end'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const refBarInfoElem = (0, _vue.ref)();
    const refResizableSplitterTip = (0, _vue.ref)();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      staticItems: [],
      itemList: [],
      barWidth: 0,
      barHeight: 0
    });
    const internalData = {
      wrapperWidth: 0,
      wrapperHeight: 0
    };
    const computeItemOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().splitter.itemConfig, props.itemConfig);
    });
    const computeBarOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().splitter.barConfig, props.barConfig);
    });
    const computeResizeOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().splitter.resizeConfig, props.resizeConfig);
    });
    const computeActionOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().splitter.actionConfig, props.actionConfig);
    });
    const computeVisibleItems = (0, _vue.computed)(() => {
      return reactData.itemList.filter(item => item.isExpand);
    });
    const computeAutoItems = (0, _vue.computed)(() => {
      const {
        vertical
      } = props;
      const autoItems = [];
      let heightCount = 0;
      let widthCount = 0;
      reactData.itemList.forEach(vertical ? item => {
        const {
          renderHeight,
          resizeHeight,
          foldHeight,
          isExpand,
          height
        } = item;
        const itemHeight = isExpand ? foldHeight || resizeHeight || renderHeight : 0;
        if (!height) {
          autoItems.push(item);
        }
        heightCount += itemHeight;
      } : item => {
        const {
          renderWidth,
          resizeWidth,
          foldWidth,
          isExpand,
          width
        } = item;
        const itemWidth = isExpand ? foldWidth || resizeWidth || renderWidth : 0;
        if (!width) {
          autoItems.push(item);
        }
        widthCount += itemWidth;
      });
      return {
        autoItems,
        heightCount,
        heightRatio: heightCount / 100,
        widthCount,
        widthRatio: widthCount / 100
      };
    });
    const computeBarStyle = (0, _vue.computed)(() => {
      const barOpts = computeBarOpts.value;
      const {
        width,
        height
      } = barOpts;
      const stys = {};
      if (height) {
        stys.height = (0, _dom.toCssUnit)(height);
      }
      if (width) {
        stys.width = (0, _dom.toCssUnit)(width);
      }
      return stys;
    });
    const computeMaps = {
      computeItemOpts,
      computeBarOpts,
      computeActionOpts
    };
    const refMaps = {
      refElem
    };
    const $xeSplitter = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $splitter: $xeSplitter
      }, params));
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
    const getActionIcon = (prevItem, nextItem, isNext) => {
      const {
        vertical
      } = props;
      const topIcon = 'SPLIT_TOP_ACTION';
      const bottomIcon = 'SPLIT_BOTTOM_ACTION';
      const leftIcon = 'SPLIT_LEFT_ACTION';
      const rightIcon = 'SPLIT_RIGHT_ACTION';
      let iconName = '';
      if (vertical) {
        if (isNext) {
          iconName = nextItem.isExpand ? bottomIcon : topIcon;
        } else {
          iconName = prevItem.isExpand ? topIcon : bottomIcon;
        }
      } else {
        if (isNext) {
          iconName = nextItem.isExpand ? rightIcon : leftIcon;
        } else {
          iconName = prevItem.isExpand ? leftIcon : rightIcon;
        }
      }
      if (iconName) {
        return (0, _ui.getIcon)()[iconName];
      }
      return '';
    };
    const reset = () => {
      const {
        itemList
      } = reactData;
      itemList.forEach(item => {
        item.isExpand = true;
        item.foldHeight = 0;
        item.foldWidth = 0;
        item.resizeHeight = 0;
        item.resizeWidth = 0;
      });
      return (0, _vue.nextTick)();
    };
    const handleLoadItem = (list, isReset) => {
      const {
        staticItems
      } = reactData;
      const actionOpts = computeActionOpts.value;
      const {
        showPrevButton,
        showNextButton
      } = actionOpts;
      const itemDef = {
        isExpand: true,
        renderWidth: 0,
        resizeWidth: 0,
        foldWidth: 0,
        renderHeight: 0,
        resizeHeight: 0,
        foldHeight: 0
      };
      reactData.itemList = list.map(item => {
        if (item.showAction) {
          (0, _log.warnLog)('vxe.error.removeProp', ['[splitter] show-action']);
        }
        if (item.slots) {
          _xeUtils.default.each(item.slots, func => {
            if (!_xeUtils.default.isFunction(func)) {
              if (!slots[func]) {
                (0, _log.errLog)('vxe.error.notSlot', [`[splitter] ${func}`]);
              }
            }
          });
        }
        return Object.assign({}, isReset ? null : itemDef, item, isReset ? itemDef : null, {
          id: _xeUtils.default.uniqueId()
        });
      });
      if (staticItems.length) {
        (0, _log.errLog)('vxe.error.errConflicts', ['<vxe-splitter-panel ...>', 'items']);
      }
      if ((showPrevButton || showNextButton) && reactData.itemList.length > 2) {
        (0, _log.errLog)('vxe.error.errConflicts', ['action-config.showPrevButton | action-config.showNextButton', 'Only supports 2 item']);
      }
      return recalculate();
    };
    const loadItem = list => {
      return handleLoadItem(list || [], false);
    };
    const reloadItem = list => {
      return handleLoadItem(list || [], true);
    };
    const handleItemByName = name => {
      const {
        itemList
      } = reactData;
      let index = -1;
      let currItem = null;
      let prevItem = null;
      let nextItem = null;
      for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        if (item.name === name) {
          index = i;
          currItem = item;
          prevItem = itemList[i - 1] || null;
          nextItem = itemList[i + 1] || null;
          break;
        }
      }
      return {
        index,
        currItem,
        prevItem,
        nextItem
      };
    };
    const setItemExpand = (name, expanded) => {
      const restItem = handleItemByName(name);
      if (restItem) {
        const {
          currItem,
          prevItem,
          nextItem
        } = restItem;
        if (currItem) {
          if (expanded ? !currItem.isExpand : currItem.isExpand) {
            if (nextItem) {
              if (nextItem.isExpand) {
                handleItemActionEvent(null, currItem, nextItem, false);
              }
            } else if (prevItem) {
              if (prevItem.isExpand) {
                handleItemActionEvent(null, prevItem, currItem, true);
              }
            }
          }
        }
      }
      return (0, _vue.nextTick)();
    };
    const toggleItemExpand = name => {
      const restItem = handleItemByName(name);
      if (restItem) {
        const {
          currItem
        } = restItem;
        if (currItem) {
          return setItemExpand(name, !currItem.isExpand);
        }
      }
      return (0, _vue.nextTick)();
    };
    const getItemExpand = name => {
      const restItem = handleItemByName(name);
      if (restItem) {
        const {
          currItem
        } = restItem;
        if (currItem) {
          return currItem.isExpand;
        }
      }
      return false;
    };
    const recalculate = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          vertical
        } = props;
        const {
          itemList
        } = reactData;
        const el = refElem.value;
        const barInfoElem = refBarInfoElem.value;
        if (!el) {
          return;
        }
        const wWidth = el.clientWidth;
        const wHeight = el.clientHeight;
        if (!wWidth || !wHeight) {
          return;
        }
        if (barInfoElem) {
          reactData.barWidth = barInfoElem.offsetWidth;
          reactData.barHeight = barInfoElem.offsetHeight;
        }
        const contentWidth = wWidth - (vertical ? 0 : reactData.barWidth * (itemList.length - 1));
        const contentHeight = wHeight - (vertical ? reactData.barHeight * (itemList.length - 1) : 0);
        const itemOpts = computeItemOpts.value;
        const allMinWidth = _xeUtils.default.toNumber(itemOpts.minWidth);
        const allMinHeight = _xeUtils.default.toNumber(itemOpts.minHeight);
        const residueItems = [];
        if (vertical) {
          let countHeight = 0;
          itemList.forEach(item => {
            const {
              height
            } = item;
            let itemHeight = 0;
            if (height) {
              if ((0, _dom.isScale)(height)) {
                itemHeight = contentHeight * _xeUtils.default.toNumber(height) / 100;
              } else {
                itemHeight = _xeUtils.default.toNumber(height);
              }
              item.renderHeight = itemHeight;
            } else {
              residueItems.push(item);
            }
            countHeight += itemHeight;
          });
          if (residueItems.length) {
            const reMeanHeight = (contentHeight - countHeight) / residueItems.length;
            residueItems.forEach(item => {
              item.renderHeight = Math.max(_xeUtils.default.toNumber((0, _utils.getGlobalDefaultConfig)(item.minHeight, allMinHeight)), reMeanHeight);
            });
          }
        } else {
          let countWidth = 0;
          itemList.forEach(item => {
            const {
              width
            } = item;
            let itemWidth = 0;
            if (width) {
              if ((0, _dom.isScale)(width)) {
                itemWidth = contentWidth * _xeUtils.default.toNumber(width) / 100;
              } else {
                itemWidth = _xeUtils.default.toNumber(width);
              }
              item.renderWidth = itemWidth;
            } else {
              residueItems.push(item);
            }
            countWidth += itemWidth;
          });
          if (residueItems.length) {
            const reMeanWidth = (contentWidth - countWidth) / residueItems.length;
            residueItems.forEach(item => {
              item.renderWidth = Math.max(_xeUtils.default.toNumber((0, _utils.getGlobalDefaultConfig)(item.minWidth, allMinWidth)), reMeanWidth);
            });
          }
        }
        internalData.wrapperWidth = contentWidth;
        internalData.wrapperHeight = contentHeight;
      });
    };
    const dragEvent = evnt => {
      const {
        resize,
        vertical
      } = props;
      const {
        itemList
      } = reactData;
      if (!resize) {
        return;
      }
      evnt.preventDefault();
      const barEl = evnt.currentTarget;
      const handleEl = barEl.parentElement;
      const el = refElem.value;
      if (!el) {
        return;
      }
      const prevEl = handleEl.previousElementSibling;
      const nextEl = handleEl.nextElementSibling;
      if (!prevEl || !nextEl) {
        return;
      }
      const prevId = prevEl.getAttribute('itemid');
      const nextId = nextEl.getAttribute('itemid');
      const prevItem = itemList.find(item => item.id === prevId);
      const nextItem = itemList.find(item => item.id === nextId);
      if (!prevItem || !nextItem) {
        return;
      }
      const containerRect = el.getBoundingClientRect();
      const barRect = barEl.getBoundingClientRect();
      const rsSplitterLineEl = refResizableSplitterTip.value;
      const rsSplitterTipEl = rsSplitterLineEl ? rsSplitterLineEl.children[0] : null;
      const itemOpts = computeItemOpts.value;
      const resizeOpts = computeResizeOpts.value;
      const {
        immediate
      } = resizeOpts;
      const allMinWidth = _xeUtils.default.toNumber(itemOpts.minWidth);
      const allMinHeight = _xeUtils.default.toNumber(itemOpts.minHeight);
      const barOffsetX = Math.ceil(barRect.width - (evnt.clientX - barRect.left));
      const barOffsetY = Math.ceil(evnt.clientY - barRect.top);
      const prevWidth = prevEl.offsetWidth;
      const nextWidth = nextEl.offsetWidth;
      const prevMinWidth = _xeUtils.default.toNumber(prevItem ? (0, _utils.getGlobalDefaultConfig)(prevItem.minWidth, allMinWidth) : allMinWidth);
      const nextMinWidth = _xeUtils.default.toNumber(nextItem ? (0, _utils.getGlobalDefaultConfig)(nextItem.minWidth, allMinWidth) : allMinWidth);
      const minOffsetLeft = prevEl.offsetLeft + prevMinWidth - barOffsetX;
      const maxOffsetLeft = nextEl.offsetLeft + nextEl.offsetWidth - nextMinWidth - barOffsetX;
      const startOffsetLeft = evnt.clientX - containerRect.left;
      let targetOffsetWidth = -1;
      let prevResizeWidth = 0;
      let nextResizeWidth = 0;
      let offsetLeft = startOffsetLeft;
      const prevHeight = prevEl.offsetHeight;
      const nextHeight = nextEl.offsetHeight;
      const prevMinHeight = _xeUtils.default.toNumber(prevItem ? (0, _utils.getGlobalDefaultConfig)(prevItem.minHeight, allMinHeight) : allMinHeight);
      const nextMinHeight = _xeUtils.default.toNumber(nextItem ? (0, _utils.getGlobalDefaultConfig)(nextItem.minHeight, allMinHeight) : allMinHeight);
      const minOffsetTop = prevEl.offsetTop + prevMinHeight + barOffsetY;
      const maxOffsetTop = nextEl.offsetTop + nextEl.offsetHeight - nextMinHeight + barOffsetY;
      const startOffsetTop = evnt.clientY - containerRect.top;
      let targetOffsetHeight = -1;
      let prevResizeHeight = 0;
      let nextResizeHeight = 0;
      let offsetTop = startOffsetTop;
      const handleReStyle = evnt => {
        if (!rsSplitterLineEl) {
          return;
        }
        const rsNumPrevEl = rsSplitterTipEl ? rsSplitterTipEl.children[0] : null;
        const rsNumNextEl = rsSplitterTipEl ? rsSplitterTipEl.children[1] : null;
        if (vertical) {
          let tipWidth = 0;
          if (rsNumPrevEl) {
            if (targetOffsetHeight < 0) {
              rsNumPrevEl.style.display = 'none';
            } else {
              rsNumPrevEl.textContent = `${Math.floor(prevResizeHeight)}px`;
              rsNumPrevEl.style.display = 'block';
              tipWidth = rsNumPrevEl.offsetWidth;
            }
          }
          if (rsNumNextEl) {
            if (targetOffsetHeight < 0) {
              rsNumNextEl.textContent = `${Math.floor(nextResizeHeight)}px`;
              rsNumNextEl.style.display = 'block';
              tipWidth = rsNumNextEl.offsetWidth;
            } else {
              rsNumNextEl.style.display = 'none';
            }
          }
          let rsLeft = Math.max(1, evnt.clientX - containerRect.left - tipWidth / 2);
          if (rsLeft > containerRect.width - tipWidth - 1) {
            rsLeft = containerRect.width - tipWidth - 1;
          }
          rsSplitterLineEl.style.left = '0';
          rsSplitterLineEl.style.top = `${offsetTop}px`;
          if (rsSplitterTipEl) {
            rsSplitterTipEl.style.left = `${rsLeft}px`;
          }
        } else {
          let tipHeight = 0;
          if (rsNumPrevEl) {
            if (targetOffsetWidth < 0) {
              rsNumPrevEl.style.display = 'none';
            } else {
              rsNumPrevEl.textContent = `${Math.floor(prevResizeWidth)}px`;
              rsNumPrevEl.style.display = 'block';
              tipHeight = rsNumPrevEl.offsetHeight;
            }
          }
          if (rsNumNextEl) {
            if (targetOffsetWidth < 0) {
              rsNumNextEl.textContent = `${Math.floor(nextResizeWidth)}px`;
              rsNumNextEl.style.display = 'block';
              tipHeight = rsNumNextEl.offsetHeight;
            } else {
              rsNumNextEl.style.display = 'none';
            }
          }
          let rsTop = Math.max(1, evnt.clientY - containerRect.top - tipHeight / 2);
          if (rsTop > containerRect.height - tipHeight - 1) {
            rsTop = containerRect.height - tipHeight - 1;
          }
          rsSplitterLineEl.style.top = '0';
          rsSplitterLineEl.style.left = `${offsetLeft}px`;
          if (rsSplitterTipEl) {
            rsSplitterTipEl.style.top = `${rsTop}px`;
          }
        }
      };
      const handleUpdate = () => {
        if (vertical) {
          prevItem.resizeHeight = prevResizeHeight;
          nextItem.resizeHeight = nextResizeHeight;
        } else {
          prevItem.resizeWidth = prevResizeWidth;
          nextItem.resizeWidth = nextResizeWidth;
        }
      };
      const handleDrag = evnt => {
        if (vertical) {
          offsetTop = evnt.clientY - containerRect.top;
          if (offsetTop < minOffsetTop) {
            offsetTop = minOffsetTop;
          }
          if (offsetTop > maxOffsetTop) {
            offsetTop = maxOffsetTop;
          }
          targetOffsetHeight = offsetTop - startOffsetTop;
          prevResizeHeight = prevHeight + targetOffsetHeight;
          nextResizeHeight = nextHeight - targetOffsetHeight;
        } else {
          offsetLeft = evnt.clientX - containerRect.left;
          if (offsetLeft < minOffsetLeft) {
            offsetLeft = minOffsetLeft;
          }
          if (offsetLeft > maxOffsetLeft) {
            offsetLeft = maxOffsetLeft;
          }
          targetOffsetWidth = offsetLeft - startOffsetLeft;
          prevResizeWidth = prevWidth + targetOffsetWidth;
          nextResizeWidth = nextWidth - targetOffsetWidth;
        }
        if (immediate) {
          if (vertical) {
            prevEl.style.height = (0, _dom.toCssUnit)(prevResizeHeight);
            nextEl.style.height = (0, _dom.toCssUnit)(nextResizeHeight);
          } else {
            prevEl.style.width = (0, _dom.toCssUnit)(prevResizeWidth);
            nextEl.style.width = (0, _dom.toCssUnit)(nextResizeWidth);
          }
        }
        if (rsSplitterLineEl) {
          handleReStyle(evnt);
        }
        dispatchEvent('resize-drag', {
          prevItem,
          nextItem,
          offsetHeight: targetOffsetHeight,
          offsetWidth: targetOffsetWidth
        }, evnt);
      };
      document.onmousemove = evnt => {
        evnt.preventDefault();
        handleDrag(evnt);
      };
      document.onmouseup = evnt => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (rsSplitterLineEl) {
          rsSplitterLineEl.style.display = '';
        }
        handleUpdate();
        (0, _dom.removeClass)(el, 'is--drag');
        dispatchEvent('resize-end', {
          prevItem,
          nextItem,
          offsetHeight: targetOffsetHeight,
          offsetWidth: targetOffsetWidth
        }, evnt);
        recalculate();
      };
      if (rsSplitterLineEl) {
        rsSplitterLineEl.style.display = 'block';
        handleReStyle(evnt);
      }
      handleDrag(evnt);
      (0, _dom.addClass)(el, 'is--drag');
      dispatchEvent('resize-start', {
        prevItem,
        nextItem
      }, evnt);
    };
    const handleItemActionEvent = (evnt, prevItem, nextItem, isNext) => {
      const {
        vertical
      } = props;
      let expanded = false;
      let item = prevItem;
      if (isNext) {
        item = nextItem;
        expanded = !nextItem.isExpand;
        nextItem.isExpand = expanded;
      } else {
        expanded = !prevItem.isExpand;
        prevItem.isExpand = expanded;
      }
      if (vertical) {
        if (prevItem.isExpand && nextItem.isExpand) {
          prevItem.foldHeight = 0;
          nextItem.foldHeight = 0;
        } else if (prevItem.isExpand) {
          nextItem.foldHeight = 0;
          prevItem.foldHeight = (prevItem.resizeHeight || prevItem.renderHeight) + (nextItem.resizeHeight || nextItem.renderHeight);
        } else {
          prevItem.foldHeight = 0;
          nextItem.foldHeight = (prevItem.resizeHeight || prevItem.renderHeight) + (nextItem.resizeHeight || nextItem.renderHeight);
        }
      } else {
        if (prevItem.isExpand && nextItem.isExpand) {
          prevItem.foldWidth = 0;
          nextItem.foldWidth = 0;
        } else if (prevItem.isExpand) {
          nextItem.foldWidth = 0;
          prevItem.foldWidth = (prevItem.resizeWidth || prevItem.renderWidth) + (nextItem.resizeWidth || nextItem.renderWidth);
        } else {
          prevItem.foldWidth = 0;
          nextItem.foldWidth = (prevItem.resizeWidth || prevItem.renderWidth) + (nextItem.resizeWidth || nextItem.renderWidth);
        }
      }
      if (evnt) {
        dispatchEvent('toggle-expand', {
          prevItem,
          nextItem,
          expanded,
          item
        }, evnt);
      }
      recalculate();
    };
    const handlePrevActionDblclickEvent = evnt => {
      const {
        itemList
      } = reactData;
      const actionOpts = computeActionOpts.value;
      const btnEl = evnt.currentTarget;
      const btnWrapperEl = btnEl.parentElement;
      const handleEl = btnWrapperEl.parentElement;
      const prevEl = handleEl.previousElementSibling;
      const prevId = prevEl.getAttribute('itemid');
      const prevItem = itemList.find(item => item.id === prevId);
      const nextEl = handleEl.nextElementSibling;
      const nextId = nextEl.getAttribute('itemid');
      const nextItem = itemList.find(item => item.id === nextId);
      if (actionOpts.trigger === 'dblclick') {
        if (prevItem && nextItem && nextItem.isExpand) {
          handleItemActionEvent(evnt, prevItem, nextItem, false);
        }
      }
      dispatchEvent('action-dblclick', {
        prevItem,
        nextItem
      }, evnt);
    };
    const handlePrevActionClickEvent = evnt => {
      const {
        itemList
      } = reactData;
      const actionOpts = computeActionOpts.value;
      const btnEl = evnt.currentTarget;
      const btnWrapperEl = btnEl.parentElement;
      const handleEl = btnWrapperEl.parentElement;
      const prevEl = handleEl.previousElementSibling;
      const prevId = prevEl.getAttribute('itemid');
      const prevItem = itemList.find(item => item.id === prevId);
      const nextEl = handleEl.nextElementSibling;
      const nextId = nextEl.getAttribute('itemid');
      const nextItem = itemList.find(item => item.id === nextId);
      if (actionOpts.trigger !== 'dblclick') {
        if (prevItem && nextItem && nextItem.isExpand) {
          handleItemActionEvent(evnt, prevItem, nextItem, false);
        }
      }
      dispatchEvent('action-click', {
        prevItem,
        nextItem
      }, evnt);
    };
    const handleNextActionDblclickEvent = evnt => {
      const {
        itemList
      } = reactData;
      const actionOpts = computeActionOpts.value;
      const btnEl = evnt.currentTarget;
      const btnWrapperEl = btnEl.parentElement;
      const handleEl = btnWrapperEl.parentElement;
      const prevEl = handleEl.previousElementSibling;
      const prevId = prevEl.getAttribute('itemid');
      const prevItem = itemList.find(item => item.id === prevId);
      const nextEl = handleEl.nextElementSibling;
      const nextId = nextEl.getAttribute('itemid');
      const nextItem = itemList.find(item => item.id === nextId);
      if (actionOpts.trigger === 'dblclick') {
        if (prevItem && nextItem && prevItem.isExpand) {
          handleItemActionEvent(evnt, prevItem, nextItem, true);
        }
      }
      dispatchEvent('action-dblclick', {
        prevItem,
        nextItem
      }, evnt);
    };
    const handleNextActionClickEvent = evnt => {
      const {
        itemList
      } = reactData;
      const actionOpts = computeActionOpts.value;
      const btnEl = evnt.currentTarget;
      const btnWrapperEl = btnEl.parentElement;
      const handleEl = btnWrapperEl.parentElement;
      const prevEl = handleEl.previousElementSibling;
      const prevId = prevEl.getAttribute('itemid');
      const prevItem = itemList.find(item => item.id === prevId);
      const nextEl = handleEl.nextElementSibling;
      const nextId = nextEl.getAttribute('itemid');
      const nextItem = itemList.find(item => item.id === nextId);
      if (actionOpts.trigger !== 'dblclick') {
        if (prevItem && nextItem && prevItem.isExpand) {
          handleItemActionEvent(evnt, prevItem, nextItem, true);
        }
      }
      dispatchEvent('action-click', {
        prevItem,
        nextItem
      }, evnt);
    };
    const handleGlobalResizeEvent = () => {
      recalculate();
    };
    const splitterMethods = {
      dispatchEvent,
      setItemExpand,
      toggleItemExpand,
      getItemExpand,
      recalculate,
      reset,
      loadItem,
      reloadItem
    };
    const splitterPrivateMethods = {};
    Object.assign($xeSplitter, splitterMethods, splitterPrivateMethods);
    const renderHandleBar = (prevItem, nextItem) => {
      const {
        border,
        resize,
        vertical
      } = props;
      const {
        itemList
      } = reactData;
      const barStyle = computeBarStyle.value;
      const actionOpts = computeActionOpts.value;
      const {
        direction
      } = actionOpts;
      const showPrevButton = _xeUtils.default.isBoolean(actionOpts.showPrevButton) ? actionOpts.showPrevButton : itemList.some(item => item.showAction);
      const showNextButton = _xeUtils.default.isBoolean(actionOpts.showNextButton) ? actionOpts.showNextButton : direction === 'next' && itemList.some(item => item.showAction);
      const resizeOpts = computeResizeOpts.value;
      const {
        immediate
      } = resizeOpts;
      return (0, _vue.h)('div', {
        class: ['vxe-splitter-panel-handle', vertical ? 'is--vertical' : 'is--horizontal', immediate ? 'is-resize--immediate' : 'is-resize--lazy', {
          'is--resize': resize,
          'is--border': border
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-splitter-panel-handle-bar',
        style: barStyle,
        onMousedown: dragEvent
      }), itemList.length === 2 ? (0, _vue.h)('div', {
        class: 'vxe-splitter-panel-action-btn-wrapper'
      }, [showPrevButton && nextItem.isExpand ? (0, _vue.h)('div', {
        class: 'vxe-splitter-panel-action-btn',
        onDblclick: handlePrevActionDblclickEvent,
        onClick: handlePrevActionClickEvent
      }, [(0, _vue.h)('i', {
        class: getActionIcon(prevItem, nextItem, false)
      })]) : (0, _ui.renderEmptyElement)($xeSplitter), showNextButton && prevItem.isExpand ? (0, _vue.h)('div', {
        class: 'vxe-splitter-panel-action-btn',
        onDblclick: handleNextActionDblclickEvent,
        onClick: handleNextActionClickEvent
      }, [(0, _vue.h)('i', {
        class: getActionIcon(prevItem, nextItem, true)
      })]) : (0, _ui.renderEmptyElement)($xeSplitter)]) : (0, _ui.renderEmptyElement)($xeSplitter)]);
    };
    const renderItems = () => {
      const {
        border,
        padding,
        resize,
        vertical
      } = props;
      const {
        itemList
      } = reactData;
      const vSize = computeSize.value;
      const resizeOpts = computeResizeOpts.value;
      const {
        immediate
      } = resizeOpts;
      const visibleItems = computeVisibleItems.value;
      const {
        autoItems
      } = computeAutoItems.value;
      const itemVNs = [];
      itemList.forEach((prevItem, index) => {
        const {
          id,
          name,
          slots,
          renderHeight,
          resizeHeight,
          foldHeight,
          renderWidth,
          resizeWidth,
          foldWidth,
          isExpand
        } = prevItem;
        const nextItem = itemList[index + 1];
        const defaultSlot = slots ? slots.default : null;
        const stys = {};
        let itemWidth = isExpand ? foldWidth || resizeWidth || renderWidth : 0;
        let itemHeight = isExpand ? foldHeight || resizeHeight || renderHeight : 0;
        // 至少存在一个自适应
        if (autoItems.length === 1) {
          if (vertical) {
            if (!prevItem.height) {
              itemHeight = 0;
            }
          } else {
            if (!prevItem.width) {
              itemWidth = 0;
            }
          }
        }
        let isFill = true;
        if (vertical) {
          if (itemHeight && visibleItems.length > 1) {
            isFill = false;
            stys.height = (0, _dom.toCssUnit)(itemHeight);
          }
        } else {
          if (itemWidth && visibleItems.length > 1) {
            isFill = false;
            stys.width = (0, _dom.toCssUnit)(itemWidth);
          }
        }
        itemVNs.push((0, _vue.h)('div', {
          itemid: id,
          class: ['vxe-splitter-panel', vertical ? 'is--vertical' : 'is--horizontal', immediate ? 'is-resize--immediate' : 'is-resize--lazy', {
            [`size--${vSize}`]: vSize,
            'is--resize': resize,
            'is--padding': padding,
            'is--border': border,
            'is--height': itemHeight,
            'is--width': itemWidth,
            'is--visible': isExpand,
            'is--hidden': !isExpand,
            'is--fill': isExpand && isFill
          }],
          style: stys
        }, [(0, _vue.h)('div', {
          itemid: id,
          class: 'vxe-splitter-panel--wrapper'
        }, [(0, _vue.h)('div', {
          class: 'vxe-splitter-panel--inner'
        }, defaultSlot ? callSlot(defaultSlot, {
          name,
          isExpand
        }) : [])])]));
        if (nextItem) {
          itemVNs.push(renderHandleBar(prevItem, nextItem));
        }
      });
      return (0, _vue.h)('div', {
        class: 'vxe-splitter-wrapper'
      }, itemVNs);
    };
    const renderVN = () => {
      const {
        vertical,
        width,
        height
      } = props;
      const vSize = computeSize.value;
      const resizeOpts = computeResizeOpts.value;
      const {
        immediate,
        showTip
      } = resizeOpts;
      const defaultSlot = slots.default;
      const stys = {};
      if (height) {
        stys.height = (0, _dom.toCssUnit)(height);
      }
      if (width) {
        stys.width = (0, _dom.toCssUnit)(width);
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-splitter', vertical ? 'is--vertical' : 'is--horizontal', immediate ? 'is-resize--immediate' : 'is-resize--lazy', {
          [`size--${vSize}`]: vSize
        }],
        style: stys
      }, [(0, _vue.h)('div', {
        class: 'vxe-splitter-slots'
      }, defaultSlot ? defaultSlot({}) : []), renderItems(), (0, _vue.h)('div', {
        ref: refResizableSplitterTip,
        class: ['vxe-splitter--resizable-splitter-tip', vertical ? 'is--vertical' : 'is--horizontal', immediate ? 'is-resize--immediate' : 'is-resize--lazy']
      }, showTip ? [(0, _vue.h)('div', {
        class: 'vxe-splitter--resizable-splitter-tip-number'
      }, [(0, _vue.h)('div', {
        class: 'vxe-splitter--resizable-splitter-number-prev'
      }), (0, _vue.h)('div', {
        class: 'vxe-splitter--resizable-splitter-number-next'
      })])] : []), (0, _vue.h)('div', {
        class: 'vxe-splitter--render-vars'
      }, [(0, _vue.h)('div', {
        ref: refBarInfoElem,
        class: 'vxe-splitter--handle-bar-info'
      })])]);
    };
    const itemFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.items ? props.items.length : -1, () => {
      itemFlag.value++;
    });
    (0, _vue.watch)(() => props.items, () => {
      itemFlag.value++;
    });
    (0, _vue.watch)(itemFlag, () => {
      loadItem(props.items || []);
    });
    (0, _vue.watch)(() => reactData.staticItems, val => {
      const actionOpts = computeActionOpts.value;
      const {
        showPrevButton,
        showNextButton
      } = actionOpts;
      if (props.items && props.items.length) {
        (0, _log.errLog)('vxe.error.errConflicts', ['<vxe-splitter-panel ...>', 'items']);
      }
      reactData.itemList = val || [];
      if ((showPrevButton || showNextButton) && reactData.itemList.length > 2) {
        (0, _log.errLog)('vxe.error.modelConflicts', ['[splitter] action-config.showPrevButton | action-config.showNextButton', '<vxe-splitter-panel ...> Only supports 2 panel']);
      }
      reactData.itemList.forEach(item => {
        if (item.showAction) {
          (0, _log.warnLog)('vxe.error.removeProp', ['[splitter] showAction']);
        }
      });
      recalculate();
    });
    let resizeObserver;
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        recalculate();
      });
      const el = refElem.value;
      if (el) {
        resizeObserver = _ui.globalResize.create(() => {
          recalculate();
        });
        resizeObserver.observe(el);
      }
      const actionOpts = computeActionOpts.value;
      if (actionOpts.direction) {
        (0, _log.errLog)('vxe.error.delProp', ['[splitter] action-config.direction', 'action-config.showPrevButton | action-config.showNextButton']);
      }
      _ui.globalEvents.on($xeSplitter, 'resize', handleGlobalResizeEvent);
    });
    (0, _vue.onUnmounted)(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      _ui.globalEvents.off($xeSplitter, 'resize');
    });
    (0, _vue.onActivated)(() => {
      recalculate();
    });
    if (props.items) {
      loadItem(props.items);
    }
    (0, _vue.provide)('$xeSplitter', $xeSplitter);
    $xeSplitter.renderVN = renderVN;
    return $xeSplitter;
  },
  render() {
    return this.renderVN();
  }
});