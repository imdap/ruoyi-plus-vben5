"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearColAnimate = clearColAnimate;
exports.clearRowAnimate = clearRowAnimate;
exports.moveColAnimateToLr = moveColAnimateToLr;
exports.moveRowAnimateToTb = moveRowAnimateToTb;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _dom = require("./dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const rowMoveCls = 'row--drag-move';
const colMoveClass = 'col--drag-move';
/**
 * 上下拖拽
 */
function moveRowAnimateToTb(elemList, offsetTop) {
  _xeUtils.default.arrayEach(elemList, trEl => {
    trEl.style.transform = `translateY(${offsetTop}px)`;
  });
  requestAnimationFrame(() => {
    _xeUtils.default.arrayEach(elemList, trEl => {
      (0, _dom.addClass)(trEl, rowMoveCls);
      trEl.style.transform = '';
    });
  });
}
function clearRowAnimate(elem, clss) {
  setTimeout(() => {
    if (elem) {
      _xeUtils.default.arrayEach(elem.querySelectorAll(clss.map(cls => `${cls}.${rowMoveCls}`).join(',')), elem => (0, _dom.removeClass)(elem, rowMoveCls));
    }
  }, 500);
}
/**
 * 左右拖拽
 */
function moveColAnimateToLr(elemList, offsetLeft) {
  _xeUtils.default.arrayEach(elemList, trEl => {
    trEl.style.transform = `translateX(${offsetLeft}px)`;
  });
  requestAnimationFrame(() => {
    _xeUtils.default.arrayEach(elemList, trEl => {
      (0, _dom.addClass)(trEl, colMoveClass);
      trEl.style.transform = '';
    });
  });
}
function clearColAnimate(elem, clss) {
  setTimeout(() => {
    if (elem) {
      _xeUtils.default.arrayEach(elem.querySelectorAll(clss.map(cls => `${cls}.${rowMoveCls}`).join(',')), elem => (0, _dom.removeClass)(elem, colMoveClass));
    }
  }, 500);
}