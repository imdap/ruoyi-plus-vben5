"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.checkTargetElement = checkTargetElement;
exports.getAbsolutePos = getAbsolutePos;
exports.getDomNode = getDomNode;
exports.getEventTargetNode = getEventTargetNode;
exports.getOffsetHeight = getOffsetHeight;
exports.getOffsetPos = getOffsetPos;
exports.getPaddingTopBottomSize = getPaddingTopBottomSize;
exports.getPropClass = getPropClass;
exports.getTpImg = getTpImg;
exports.hasClass = hasClass;
exports.hasControlKey = hasControlKey;
exports.initTpImg = initTpImg;
exports.isNodeElement = isNodeElement;
exports.isPx = isPx;
exports.isScale = isScale;
exports.queryElement = queryElement;
exports.removeClass = removeClass;
exports.scrollToView = scrollToView;
exports.scrollTopTo = scrollTopTo;
exports.setScrollLeft = setScrollLeft;
exports.setScrollTop = setScrollTop;
exports.toCssUnit = toCssUnit;
exports.triggerEvent = triggerEvent;
exports.updateCellTitle = updateCellTitle;
exports.wheelScrollLeftTo = wheelScrollLeftTo;
exports.wheelScrollTopTo = wheelScrollTopTo;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const reClsMap = {};
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
function getPropClass(property, params) {
  return property ? _xeUtils.default.isFunction(property) ? property(params) : property : '';
}
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
function queryElement(elem, selector) {
  if (elem) {
    return elem.querySelector(selector);
  }
  return null;
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
function getOffsetHeight(elem) {
  return elem ? elem.offsetHeight : 0;
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
function setScrollTop(elem, scrollTop) {
  if (elem) {
    elem.scrollTop = scrollTop;
  }
}
function setScrollLeft(elem, scrollLeft) {
  if (elem) {
    elem.scrollLeft = scrollLeft;
  }
}
// export function setScrollLeftAndTop (elem: HTMLElement | null, scrollLeft: number, scrollTop: number) {
//   if (elem) {
//     elem.scrollLeft = scrollLeft
//     elem.scrollTop = scrollTop
//   }
// }
function updateCellTitle(overflowElem, column) {
  const content = column.type === 'html' ? overflowElem.innerText : overflowElem.textContent;
  if (overflowElem.getAttribute('title') !== content) {
    overflowElem.setAttribute('title', content);
  }
}
function checkTargetElement(target, exEls, endEl) {
  let targetEl = target;
  if (!exEls || !exEls.length) {
    return false;
  }
  const [exEl1, exEl2, exEl3] = exEls;
  while (targetEl) {
    if (exEl1 === targetEl || exEl2 && targetEl === exEl2 || exEl3 && targetEl === exEl3) {
      return true;
    }
    if (endEl && targetEl === endEl) {
      return false;
    }
    targetEl = targetEl.parentElement;
  }
  return false;
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
function scrollTopTo(diffNum, cb) {
  const duration = Math.abs(diffNum);
  const startTime = performance.now();
  let countTop = 0;
  const step = timestamp => {
    let progress = (timestamp - startTime) / duration;
    if (progress < 0) {
      progress = 0;
    } else if (progress > 1) {
      progress = 1;
    }
    const easedProgress = Math.pow(progress, 2);
    const offsetTop = Math.floor(diffNum * easedProgress) - countTop;
    countTop += offsetTop;
    cb(offsetTop);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}
let wtlFrame;
function wheelScrollLeftTo(scrollLeft, cb) {
  if (wtlFrame) {
    cancelAnimationFrame(wtlFrame);
  }
  wtlFrame = requestAnimationFrame(() => {
    cb(scrollLeft);
    wtlFrame = null;
  });
}
let wtaFrame;
function wheelScrollTopTo(diffNum, cb) {
  if (wtaFrame) {
    cancelAnimationFrame(wtaFrame);
  }
  wtaFrame = requestAnimationFrame(() => {
    const offsetTop = diffNum;
    cb(offsetTop);
    wtaFrame = null;
  });
}