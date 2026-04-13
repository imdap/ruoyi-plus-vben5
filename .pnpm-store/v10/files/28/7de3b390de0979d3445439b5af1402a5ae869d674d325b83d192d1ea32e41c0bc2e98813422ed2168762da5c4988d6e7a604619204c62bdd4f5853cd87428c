import XEUtils from 'xe-utils';
export function assembleAnchorLink($xeAnchor, elem, linkConfig, $xeParentAnchorLink) {
    const staticLinks = $xeAnchor.reactData.staticLinks;
    const parentElem = elem.parentNode;
    const parentLinkConfig = $xeParentAnchorLink ? $xeParentAnchorLink.linkConfig : null;
    const parentLinks = parentLinkConfig ? parentLinkConfig.children : staticLinks;
    if (parentElem && parentLinks) {
        parentLinks.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, linkConfig);
        $xeAnchor.reactData.staticLinks = staticLinks.slice(0);
    }
}
export function destroyAnchorLink($xeAnchor, linkConfig) {
    const staticLinks = $xeAnchor.reactData.staticLinks;
    const matchObj = XEUtils.findTree(staticLinks, item => item.id === linkConfig.id, { children: 'children' });
    if (matchObj) {
        matchObj.items.splice(matchObj.index, 1);
    }
    $xeAnchor.reactData.staticLinks = staticLinks.slice(0);
}
