"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eqEmptyValue = eqEmptyValue;
exports.formatText = formatText;
exports.getDefaultConfig = getDefaultConfig;
exports.getFuncText = getFuncText;
exports.getLastZIndex = getLastZIndex;
exports.hasChildrenList = hasChildrenList;
exports.isEmptyValue = isEmptyValue;
exports.isEnableConf = isEnableConf;
exports.nextZIndex = nextZIndex;
exports.parseFile = parseFile;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _core = require("@vxe-ui/core");
var _domZindex = _interopRequireDefault(require("dom-zindex"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getConfig
} = _core.VxeUI;
function isEnableConf(conf) {
  return conf && conf.enabled !== false;
}
function isEmptyValue(cellValue) {
  return cellValue === null || cellValue === undefined || cellValue === '';
}
function parseFile(file) {
  const name = file.name;
  const tIndex = _xeUtils.default.lastIndexOf(name, '.');
  const type = name.substring(tIndex + 1, name.length).toLowerCase();
  const filename = name.substring(0, tIndex);
  return {
    filename,
    type
  };
}
function nextZIndex() {
  return _domZindex.default.getNext();
}
function getLastZIndex() {
  return _domZindex.default.getCurrent();
}
function hasChildrenList(item) {
  return item && item.children && item.children.length > 0;
}
function getFuncText(content, args) {
  if (_xeUtils.default.eqNull(content)) {
    return '';
  }
  const translate = getConfig().translate;
  return `${translate ? translate('' + content, args) : content}`;
}
function formatText(value, placeholder) {
  return '' + (isEmptyValue(value) ? placeholder ? getConfig().emptyCell : '' : value);
}
/**
 * 判断值为：'' | null | undefined 时都属于空值
 */
function eqEmptyValue(cellValue) {
  return cellValue === '' || _xeUtils.default.eqNull(cellValue);
}
function getDefaultConfig(val1, def1) {
  return _xeUtils.default.eqNull(val1) ? def1 : val1;
}