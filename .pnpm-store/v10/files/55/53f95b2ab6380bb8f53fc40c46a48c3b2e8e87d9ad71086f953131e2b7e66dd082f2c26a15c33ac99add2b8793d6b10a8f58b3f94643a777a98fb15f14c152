"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Store = void 0;
var _log = require("./log");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * 创建数据仓库
 */
class Store {
  constructor() {
    Object.defineProperty(this, "store", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
  }
  mixin(options) {
    _xeUtils.default.each(options, (item, key) => {
      this.add(key, item);
    });
    return this;
  }
  has(name) {
    return !!this.get(name);
  }
  get(name) {
    return this.store[name];
  }
  add(name, options) {
    const conf = this.store[name];
    // 检测是否覆盖
    const confKeys = _xeUtils.default.keys(conf);
    _xeUtils.default.each(options, (item, key) => {
      if (confKeys.includes(key)) {
        _log.log.warn('vxe.error.coverProp', [name, key]);
      }
    });
    this.store[name] = conf ? _xeUtils.default.merge(conf, options) : options;
    return this;
  }
  delete(name) {
    delete this.store[name];
  }
  forEach(callback) {
    _xeUtils.default.objectEach(this.store, callback);
  }
}
exports.Store = Store;
var _default = exports.default = Store;