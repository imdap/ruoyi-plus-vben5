"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChangeEvent = getChangeEvent;
exports.getModelEvent = getModelEvent;
exports.getOnName = getOnName;
exports.getSlotVNs = getSlotVNs;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getOnName(type) {
  return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1);
}
function getModelEvent(renderOpts) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
      return 'input';
    case 'select':
      return 'change';
  }
  return 'update:modelValue';
}
function getChangeEvent(renderOpts) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
    case 'VxeInput':
    case 'VxeTextarea':
    case '$input': // 已废弃
    case '$textarea':
      // 已废弃
      return 'input';
  }
  return 'change';
}
function getSlotVNs(vns) {
  if (_xeUtils.default.isArray(vns)) {
    return vns;
  }
  return vns ? [vns] : [];
}