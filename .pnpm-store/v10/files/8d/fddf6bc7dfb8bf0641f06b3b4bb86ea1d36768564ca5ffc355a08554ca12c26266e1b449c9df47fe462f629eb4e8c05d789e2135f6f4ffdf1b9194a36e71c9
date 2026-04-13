"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assembleCollapseItem = assembleCollapseItem;
exports.destroyCollapseItem = destroyCollapseItem;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function assembleCollapseItem($xeCollapse, elem, collapseConfig) {
  const staticPanes = $xeCollapse.reactData.staticPanes;
  const parentElem = elem.parentNode;
  if (parentElem) {
    staticPanes.splice(_xeUtils.default.arrayIndexOf(parentElem.children, elem), 0, collapseConfig);
    $xeCollapse.reactData.staticPanes = staticPanes.slice(0);
  }
}
function destroyCollapseItem($xeCollapse, collapseConfig) {
  const staticPanes = $xeCollapse.reactData.staticPanes;
  const matchObj = _xeUtils.default.findTree(staticPanes, item => item.id === collapseConfig.id, {
    children: 'children'
  });
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
  $xeCollapse.reactData.staticPanes = staticPanes.slice(0);
}