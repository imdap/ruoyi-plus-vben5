"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChangeEvent = getChangeEvent;
exports.getModelEvent = getModelEvent;
exports.getOnName = getOnName;
exports.getSlotVNs = getSlotVNs;
exports.hasInputType = hasInputType;
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
    case 'VxeNumberInput':
    case 'VxeTextarea':
    case '$input':
    case '$textarea':
      return 'input';
  }
  return 'change';
}
function hasInputType(renderOpts) {
  switch (renderOpts.name) {
    case 'VxeInput':
    case 'VxeNumberInput':
    case 'VxeTextarea':
    case '$input':
    case '$textarea':
      return true;
  }
  return false;
}
function getSlotVNs(vns) {
  if (vns === null || vns === undefined) {
    return [];
  }
  if (_xeUtils.default.isArray(vns)) {
    return vns;
  }
  return [vns];
}