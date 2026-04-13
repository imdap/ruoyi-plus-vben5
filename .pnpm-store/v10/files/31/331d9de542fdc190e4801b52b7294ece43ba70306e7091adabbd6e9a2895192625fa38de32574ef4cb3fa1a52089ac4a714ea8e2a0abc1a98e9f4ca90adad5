"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalResize = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _configStore = require("./configStore");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * 监听 resize 事件
 * 如果项目中已使用了 resize-observer-polyfill，那么只需要将方法定义全局，该组件就会自动使用
 */
let resizeTimeout;
/* eslint-disable no-use-before-define */
const eventStore = [];
const defaultInterval = 500;
function eventHandle() {
  if (eventStore.length) {
    eventStore.forEach(item => {
      item.tarList.forEach(observer => {
        const {
          target,
          width,
          heighe
        } = observer;
        const clientWidth = target.clientWidth;
        const clientHeight = target.clientHeight;
        const rWidth = clientWidth && width !== clientWidth;
        const rHeight = clientHeight && heighe !== clientHeight;
        if (rWidth || rHeight) {
          observer.width = clientWidth;
          observer.heighe = clientHeight;
          setTimeout(item.callback);
        }
      });
    });
    /* eslint-disable @typescript-eslint/no-use-before-define */
    eventListener();
  }
}
function eventListener() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(eventHandle, _configStore.globalConfigStore.resizeInterval || defaultInterval);
}
class XEResizeObserver {
  constructor(callback) {
    Object.defineProperty(this, "tarList", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "callback", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.callback = callback;
  }
  observe(target) {
    if (target) {
      const {
        tarList
      } = this;
      if (!tarList.some(observer => observer.target === target)) {
        tarList.push({
          target,
          width: target.clientWidth,
          heighe: target.clientHeight
        });
      }
      if (!eventStore.length) {
        eventListener();
      }
      if (!eventStore.some(item => item === this)) {
        eventStore.push(this);
      }
    }
  }
  unobserve(target) {
    _xeUtils.default.remove(eventStore, item => item.tarList.some(observer => observer.target === target));
  }
  disconnect() {
    _xeUtils.default.remove(eventStore, item => item === this);
  }
}
const globalResize = exports.globalResize = {
  create(callback) {
    if (window.ResizeObserver) {
      return new window.ResizeObserver(callback);
    }
    return new XEResizeObserver(callback);
  }
};