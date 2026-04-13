"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assembleTabItem = assembleTabItem;
exports.destroyTabItem = destroyTabItem;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function assembleTabItem($xeTabs, elem, tabConfig) {
  const staticTabs = $xeTabs.reactData.staticTabs;
  const parentElem = elem.parentNode;
  if (parentElem) {
    staticTabs.splice(_xeUtils.default.arrayIndexOf(parentElem.children, elem), 0, tabConfig);
    $xeTabs.reactData.staticTabs = staticTabs.slice(0);
  }
}
function destroyTabItem($xeTabs, tabConfig) {
  const staticTabs = $xeTabs.reactData.staticTabs;
  const matchObj = _xeUtils.default.findTree(staticTabs, item => item.id === tabConfig.id, {
    children: 'children'
  });
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
  $xeTabs.reactData.staticTabs = staticTabs.slice(0);
}