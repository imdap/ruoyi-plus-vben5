"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderer = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _log = require("./log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * 内置的组件渲染
 */
const renderMap = {};
/**
 * 全局渲染器
 */
const renderer = exports.renderer = {
  mixin(opts) {
    _xeUtils.default.each(opts, (options, name) => renderer.add(name, options));
    return renderer;
  },
  get(name) {
    return renderMap[name] || null;
  },
  add(name, options) {
    if (name && options) {
      const renders = renderMap[name];
      if (renders) {
        // 检测是否覆盖
        _xeUtils.default.each(options, (val, key) => {
          if (!_xeUtils.default.eqNull(renders[key]) && renders[key] !== val) {
            _log.log.warn('vxe.error.coverProp', [`Renderer.${name}`, key]);
          }
        });
        Object.assign(renders, options);
      } else {
        renderMap[name] = options;
      }
    }
    return renderer;
  },
  forEach(callback) {
    _xeUtils.default.objectEach(renderMap, callback);
    return renderer;
  },
  delete(name) {
    delete renderMap[name];
    return renderer;
  }
};