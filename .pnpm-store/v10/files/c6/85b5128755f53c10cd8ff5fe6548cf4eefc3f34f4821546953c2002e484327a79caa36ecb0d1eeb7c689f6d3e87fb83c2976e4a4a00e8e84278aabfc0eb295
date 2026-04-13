"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIcon = getIcon;
exports.renderCustomIcon = renderCustomIcon;
exports.renderGlobalIcon = renderGlobalIcon;
exports.setIcon = setIcon;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _core = require("./core");
var _iconStore = require("./iconStore");
var _vm = require("./vm");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function setIcon(options) {
  if (options) {
    Object.assign(_iconStore.iconConfigStore, options);
  }
  return _core.VxeCore;
}
function getIcon(key) {
  return arguments.length ? _xeUtils.default.get(_iconStore.iconConfigStore, key) : _iconStore.iconConfigStore;
}
function renderGlobalIcon(name) {
  const icon = getIcon(name);
  return renderCustomIcon(icon, name);
}
function renderCustomIcon(icon, name) {
  if (_xeUtils.default.isFunction(icon)) {
    return (0, _vue.h)('span', {}, (0, _vm.getSlotVNs)(icon({
      name
    })));
  }
  return (0, _vue.h)('i', {
    class: icon
  });
}