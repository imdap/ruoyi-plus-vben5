"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.getAbsolutePos = getAbsolutePos;
exports.getDomNode = getDomNode;
exports.getEventTargetNode = getEventTargetNode;
exports.getOffsetPos = getOffsetPos;
exports.getPaddingLeftRightSize = getPaddingLeftRightSize;
exports.getPaddingTopBottomSize = getPaddingTopBottomSize;
exports.getTpImg = getTpImg;
exports.hasClass = hasClass;
exports.hasControlKey = hasControlKey;
exports.initTpImg = initTpImg;
exports.isNodeElement = isNodeElement;
exports.isPx = isPx;
exports.isScale = isScale;
exports.removeClass = removeClass;
exports.scrollToView = scrollToView;
exports.toCssUnit = toCssUnit;
exports.triggerEvent = triggerEvent;
exports.updatePanelPlacement = updatePanelPlacement;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let tpImgEl;
function initTpImg() {
  if (!tpImgEl) {
    tpImgEl = new Image();
    tpImgEl.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  }
  return tpImgEl;
}
function getTpImg() {
  if (!tpImgEl) {
    return initTpImg();
  }
  return tpImgEl;
}
const reClsMap = {};
function getClsRE(cls) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp(`(?:^|\\s)${cls}(?!\\S)`, 'g');
  }
  return reClsMap[cls];
}
function getNodeOffset(elem, container, rest) {
  if (elem) {
    const parentElem = elem.parentNode;
    rest.top += elem.offsetTop;
    rest.left += elem.offsetLeft;
    if (parentElem && parentElem !== document.documentElement && parentElem !== document.body) {
      rest.top -= parentElem.scrollTop;
      rest.left -= parentElem.scrollLeft;
    }
    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest);
    }
  }
  return rest;
}
function isPx(val) {
  return val && /^\d+(\.\d+)?(px)?$/.test(val);
}
function isScale(val) {
  return val && /^\d+(\.\d+)?%$/.test(val);
}
function hasClass(elem, cls) {
  return !!(elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls)));
}
function removeClass(elem, cls) {
  if (elem && hasClass(elem, cls)) {
    elem.className = elem.className.replace(getClsRE(cls), '');
  }
}
function addClass(elem, cls) {
  if (elem && !hasClass(elem, cls)) {
    removeClass(elem, cls);
    elem.className = `${elem.className} ${cls}`;
  }
}
function hasControlKey(evnt) {
  return evnt.ctrlKey || evnt.metaKey;
}
function toCssUnit(val, unit = 'px') {
  if (_xeUtils.default.isNumber(val) || /^\d+$/.test(`${val}`)) {
    return `${val}${unit}`;
  }
  return `${val || ''}`;
}
function getDomNode() {
  const documentElement = document.documentElement;
  const bodyElem = document.body;
  return {
    scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
    scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
    visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
    visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
  };
}
/**
 * 检查触发源是否属于目标节点
 */
function getEventTargetNode(evnt, container, queryCls, queryMethod) {
  let targetElem;
  let target = evnt.target.shadowRoot && evnt.composed ? evnt.composedPath()[0] || evnt.target : evnt.target;
  while (target && target.nodeType && target !== document) {
    if (queryCls && hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
      targetElem = target;
    } else if (target === container) {
      return {
        flag: queryCls ? !!targetElem : true,
        container,
        targetElem: targetElem
      };
    }
    target = target.parentNode;
  }
  return {
    flag: false
  };
}
/**
 * 获取元素相对于 document 的位置
 */
function getOffsetPos(elem, container) {
  return getNodeOffset(elem, container, {
    left: 0,
    top: 0
  });
}
function getAbsolutePos(elem) {
  const bounding = elem.getBoundingClientRect();
  const boundingTop = bounding.top;
  const boundingLeft = bounding.left;
  const {
    scrollTop,
    scrollLeft,
    visibleHeight,
    visibleWidth
  } = getDomNode();
  return {
    boundingTop,
    top: scrollTop + boundingTop,
    boundingLeft,
    left: scrollLeft + boundingLeft,
    visibleHeight,
    visibleWidth
  };
}
function getPaddingTopBottomSize(elem) {
  if (elem) {
    const computedStyle = getComputedStyle(elem);
    const paddingTop = _xeUtils.default.toNumber(computedStyle.paddingTop);
    const paddingBottom = _xeUtils.default.toNumber(computedStyle.paddingBottom);
    return paddingTop + paddingBottom;
  }
  return 0;
}
function getPaddingLeftRightSize(elem) {
  if (elem) {
    const computedStyle = getComputedStyle(elem);
    const paddingLeft = _xeUtils.default.toNumber(computedStyle.paddingLeft);
    const paddingRight = _xeUtils.default.toNumber(computedStyle.paddingRight);
    return paddingLeft + paddingRight;
  }
  return 0;
}
const scrollIntoViewIfNeeded = 'scrollIntoViewIfNeeded';
const scrollIntoView = 'scrollIntoView';
function scrollToView(elem) {
  if (elem) {
    if (elem[scrollIntoViewIfNeeded]) {
      elem[scrollIntoViewIfNeeded]();
    } else if (elem[scrollIntoView]) {
      elem[scrollIntoView]();
    }
  }
}
function triggerEvent(targetElem, type) {
  if (targetElem) {
    targetElem.dispatchEvent(new Event(type));
  }
}
function isNodeElement(elem) {
  return elem && elem.nodeType === 1;
}
function updatePanelPlacement(targetElem, panelElem, options) {
  const {
    placement,
    defaultPlacement,
    teleportTo,
    marginSize
  } = Object.assign({
    teleportTo: false,
    marginSize: 18
  }, options);
  let panelPlacement = 'bottom';
  let top = '';
  let bottom = '';
  let left = '';
  const right = '';
  let minWidth = '';
  const stys = {};
  if (panelElem && targetElem) {
    const documentElement = document.documentElement;
    const bodyElem = document.body;
    const targetHeight = targetElem.offsetHeight;
    const panelHeight = panelElem.offsetHeight;
    const panelWidth = panelElem.offsetWidth;
    const panelRect = panelElem.getBoundingClientRect();
    const targetRect = targetElem.getBoundingClientRect();
    const visibleHeight = documentElement.clientHeight || bodyElem.clientHeight;
    const visibleWidth = documentElement.clientWidth || bodyElem.clientWidth;
    minWidth = targetElem.offsetWidth;
    if (teleportTo) {
      left = targetRect.left;
      top = targetRect.top + targetHeight;
      if (placement === 'top') {
        panelPlacement = 'top';
        top = targetRect.top - panelHeight;
      } else if (!placement) {
        if (defaultPlacement === 'top') {
          panelPlacement = 'top';
          top = targetRect.top - panelHeight;
          // 如果上面不够放，则向下
          if (top < marginSize) {
            panelPlacement = 'bottom';
            top = targetRect.top + targetHeight;
          }
          // 如果下面不够放，则向上（优先）
          if (top + panelHeight + marginSize > visibleHeight) {
            panelPlacement = 'top';
            top = targetRect.top - panelHeight;
          }
        } else {
          // 如果下面不够放，则向上
          if (top + panelHeight + marginSize > visibleHeight) {
            panelPlacement = 'top';
            top = targetRect.top - panelHeight;
          }
          // 如果上面不够放，则向下（优先）
          if (top < marginSize) {
            panelPlacement = 'bottom';
            top = targetRect.top + targetHeight;
          }
        }
      }
      // 如果溢出右边
      if (left + panelWidth + marginSize > visibleWidth) {
        left -= left + panelWidth + marginSize - visibleWidth;
      }
      // 如果溢出左边
      if (left < marginSize) {
        left = marginSize;
      }
    } else {
      if (placement === 'top') {
        panelPlacement = 'top';
        bottom = targetHeight;
      } else if (!placement) {
        // 如果下面不够放，则向上
        top = targetHeight;
        if (targetRect.top + targetHeight + panelHeight + marginSize > visibleHeight) {
          // 如果上面不够放，则向下（优先）
          if (targetRect.top - targetHeight - panelHeight > marginSize) {
            panelPlacement = 'top';
            top = '';
            bottom = targetHeight;
          }
        }
      }
      // 是否超出右侧
      if (panelRect.left + panelRect.width + marginSize > visibleWidth) {
        left = -(panelRect.left + panelRect.width + marginSize - visibleWidth);
      }
    }
    if (_xeUtils.default.isNumber(top)) {
      stys.top = toCssUnit(top);
    }
    if (_xeUtils.default.isNumber(bottom)) {
      stys.bottom = toCssUnit(bottom);
    }
    if (_xeUtils.default.isNumber(left)) {
      stys.left = toCssUnit(left);
    }
    if (_xeUtils.default.isNumber(right)) {
      stys.right = toCssUnit(right);
    }
    if (_xeUtils.default.isNumber(minWidth)) {
      stys.minWidth = toCssUnit(minWidth);
    }
  }
  return {
    top: top || 0,
    bottom: bottom || 0,
    left: left || 0,
    right: right || 0,
    style: stys,
    placement: panelPlacement
  };
}