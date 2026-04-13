"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = getConfig;
exports.setConfig = setConfig;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _domZindex = _interopRequireDefault(require("dom-zindex"));
var _core = require("./core");
var _configStore = require("./configStore");
var _theme = require("./theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
* 全局参数设置
*/
function setConfig(options) {
  if (options) {
    if (options.zIndex) {
      _domZindex.default.setCurrent(options.zIndex);
    }
    if (options.theme) {
      (0, _theme.setTheme)(options.theme);
    }
    _xeUtils.default.merge(_configStore.globalConfigStore, options);
  }
  return _core.VxeCore;
}
/**
* 获取全局参数
*/
function getConfig(key, defaultValue) {
  return arguments.length ? _xeUtils.default.get(_configStore.globalConfigStore, key, defaultValue) : _configStore.globalConfigStore;
}