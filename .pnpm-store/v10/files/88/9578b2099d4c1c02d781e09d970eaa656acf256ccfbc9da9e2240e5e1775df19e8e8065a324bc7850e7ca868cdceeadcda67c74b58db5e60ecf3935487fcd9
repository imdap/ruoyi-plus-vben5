"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assembleAnchorLink = assembleAnchorLink;
exports.destroyAnchorLink = destroyAnchorLink;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function assembleAnchorLink($xeAnchor, elem, linkConfig, $xeParentAnchorLink) {
  const staticLinks = $xeAnchor.reactData.staticLinks;
  const parentElem = elem.parentNode;
  const parentLinkConfig = $xeParentAnchorLink ? $xeParentAnchorLink.linkConfig : null;
  const parentLinks = parentLinkConfig ? parentLinkConfig.children : staticLinks;
  if (parentElem && parentLinks) {
    parentLinks.splice(_xeUtils.default.arrayIndexOf(parentElem.children, elem), 0, linkConfig);
    $xeAnchor.reactData.staticLinks = staticLinks.slice(0);
  }
}
function destroyAnchorLink($xeAnchor, linkConfig) {
  const staticLinks = $xeAnchor.reactData.staticLinks;
  const matchObj = _xeUtils.default.findTree(staticLinks, item => item.id === linkConfig.id, {
    children: 'children'
  });
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
  $xeAnchor.reactData.staticLinks = staticLinks.slice(0);
}