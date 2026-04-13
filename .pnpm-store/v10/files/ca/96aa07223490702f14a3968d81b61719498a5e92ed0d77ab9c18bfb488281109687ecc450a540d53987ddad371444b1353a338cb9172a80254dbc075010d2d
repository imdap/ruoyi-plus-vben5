"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commands = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _log = require("./log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class VXECommandsStore {
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
  add(name, render) {
    const conf = this.store[name];
    // 兼容
    if (_xeUtils.default.isFunction(render)) {
      _log.log.warn('vxe.error.delProp', ['commands -> callback', 'commandMethod']);
      render = {
        commandMethod: render
      };
    }
    // 检测是否覆盖
    const confKeys = _xeUtils.default.keys(conf);
    _xeUtils.default.each(render, (item, key) => {
      if (confKeys.includes(key)) {
        _log.log.warn('vxe.error.coverProp', [name, key]);
      }
    });
    this.store[name] = conf ? _xeUtils.default.merge(conf, render) : render;
    return this;
  }
  delete(name) {
    delete this.store[name];
  }
  forEach(callback) {
    _xeUtils.default.objectEach(this.store, callback);
  }
}
const commands = exports.commands = new VXECommandsStore();
Object.assign(commands, {
  _name: 'Commands'
});