"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assembleOption = assembleOption;
exports.createOption = createOption;
exports.destroyOption = destroyOption;
exports.isOption = isOption;
exports.watchOption = watchOption;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _optionInfo = require("./option-info");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isOption(option) {
  return option instanceof _optionInfo.OptionInfo;
}
function createOption($xeSelect, _vm) {
  return isOption(_vm) ? _vm : new _optionInfo.OptionInfo($xeSelect, _vm);
}
function watchOption(props, option) {
  Object.keys(props).forEach(name => {
    (0, _vue.watch)(() => props[name], value => {
      option.update(name, value);
    });
  });
}
function assembleOption($xeSelect, el, option, $xeOptgroup) {
  const {
    reactData
  } = $xeSelect;
  const {
    staticOptions
  } = reactData;
  const parentElem = el.parentNode;
  const parentOption = $xeOptgroup ? $xeOptgroup.optionConfig : null;
  const parentCols = parentOption ? parentOption.options : staticOptions;
  if (parentElem && parentCols) {
    parentCols.splice(_xeUtils.default.arrayIndexOf(parentElem.children, el), 0, option);
    reactData.staticOptions = staticOptions.slice(0);
  }
}
function destroyOption($xeSelect, option) {
  const {
    reactData
  } = $xeSelect;
  const {
    staticOptions
  } = reactData;
  const matchObj = _xeUtils.default.findTree(staticOptions, item => item.id === option.id, {
    children: 'options'
  });
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
  reactData.staticOptions = staticOptions.slice(0);
}