"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrComponent = getCurrComponent;
var _vue = require("vue");
var _store = require("../store");
function getCurrComponent(name) {
  var comp = _store.componentMaps[name] || (_store.globalConfig.Antd ? _store.globalConfig.Antd[name] : null);
  if (comp) {
    return comp;
  }
  return (0, _vue.resolveComponent)(name);
}