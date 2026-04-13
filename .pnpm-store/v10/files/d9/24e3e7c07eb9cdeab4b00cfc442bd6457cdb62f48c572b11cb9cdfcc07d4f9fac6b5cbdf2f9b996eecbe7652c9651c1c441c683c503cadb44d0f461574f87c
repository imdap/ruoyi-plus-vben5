"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eqEmptyValue = eqEmptyValue;
exports.getFuncText = getFuncText;
exports.getGlobalDefaultConfig = getGlobalDefaultConfig;
exports.getLastZIndex = getLastZIndex;
exports.getSubLastZIndex = getSubLastZIndex;
exports.handleBooleanDefaultValue = handleBooleanDefaultValue;
exports.isEnableConf = isEnableConf;
exports.nextSubZIndex = nextSubZIndex;
exports.nextZIndex = nextZIndex;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _core = require("@vxe-ui/core");
var _domZindex = _interopRequireDefault(require("dom-zindex"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isEnableConf(conf) {
  return conf && conf.enabled !== false;
}
function nextZIndex() {
  return _domZindex.default.getNext();
}
function getLastZIndex() {
  return _domZindex.default.getCurrent();
}
function nextSubZIndex() {
  return _domZindex.default.getSubNext();
}
function getSubLastZIndex() {
  return _domZindex.default.getSubCurrent();
}
function getGlobalDefaultConfig(value, globalValue) {
  if (_xeUtils.default.eqNull(value)) {
    return globalValue;
  }
  return value;
}
function getFuncText(content, args) {
  if (_xeUtils.default.eqNull(content)) {
    return '';
  }
  const translate = (0, _core.getConfig)().translate;
  return `${translate ? translate('' + content, args) : content}`;
}
/**
 * 判断值为：'' | null | undefined 时都属于空值
 */
function eqEmptyValue(cellValue) {
  return cellValue === null || cellValue === undefined || cellValue === '';
}
function handleBooleanDefaultValue(value) {
  return _xeUtils.default.isBoolean(value) ? value : null;
}