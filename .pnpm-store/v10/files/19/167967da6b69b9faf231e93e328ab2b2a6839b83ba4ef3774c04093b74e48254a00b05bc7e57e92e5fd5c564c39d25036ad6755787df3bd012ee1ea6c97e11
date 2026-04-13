"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interceptor = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _log = require("./log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const storeMap = {};
const interceptor = exports.interceptor = {
  mixin(options) {
    _xeUtils.default.each(options, (render, type) => {
      interceptor.add(type, render);
    });
    return interceptor;
  },
  get(type) {
    if (type) {
      return storeMap[type] || [];
    }
    return [];
  },
  add(type, render) {
    // 兼容
    if (_xeUtils.default.isFunction(render)) {
      //   log.warn('vxe.error.delProp', ['interceptor -> callback', 'tableInterceptorMethod'])
      render = {
        tableInterceptorMethod: render
      };
    }
    const callback = render.tableInterceptorMethod;
    if (callback) {
      let eList = storeMap[type];
      if (!eList) {
        eList = storeMap[type] = [];
      }
      // 检测重复
      if (eList.indexOf(callback) > -1) {
        _log.log.warn('vxe.error.coverProp', ['Interceptor', type]);
      }
      eList.push(callback);
    }
    return interceptor;
  },
  delete(type, render) {
    const eList = storeMap[type];
    if (eList) {
      // 兼容
      if (_xeUtils.default.isFunction(render)) {
        render = {
          tableInterceptorMethod: render
        };
      }
      const callback = render ? render.tableInterceptorMethod : null;
      if (callback) {
        _xeUtils.default.remove(eList, fn => fn === callback);
      } else {
        delete storeMap[type];
      }
    }
  }
};