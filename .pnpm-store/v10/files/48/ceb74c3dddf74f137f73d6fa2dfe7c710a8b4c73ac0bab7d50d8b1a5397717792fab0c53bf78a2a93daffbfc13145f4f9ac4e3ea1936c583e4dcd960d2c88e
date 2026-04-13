import XEUtils from 'xe-utils';
export function assembleCollapseItem($xeCollapse, elem, collapseConfig) {
    const staticPanes = $xeCollapse.reactData.staticPanes;
    const parentElem = elem.parentNode;
    if (parentElem) {
        staticPanes.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, collapseConfig);
        $xeCollapse.reactData.staticPanes = staticPanes.slice(0);
    }
}
export function destroyCollapseItem($xeCollapse, collapseConfig) {
    const staticPanes = $xeCollapse.reactData.staticPanes;
    const matchObj = XEUtils.findTree(staticPanes, item => item.id === collapseConfig.id, { children: 'children' });
    if (matchObj) {
        matchObj.items.splice(matchObj.index, 1);
    }
    $xeCollapse.reactData.staticPanes = staticPanes.slice(0);
}
