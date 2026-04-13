import XEUtils from 'xe-utils';
export function assembleTabItem($xeTabs, elem, tabConfig) {
    const staticTabs = $xeTabs.reactData.staticTabs;
    const parentElem = elem.parentNode;
    if (parentElem) {
        staticTabs.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, tabConfig);
        $xeTabs.reactData.staticTabs = staticTabs.slice(0);
    }
}
export function destroyTabItem($xeTabs, tabConfig) {
    const staticTabs = $xeTabs.reactData.staticTabs;
    const matchObj = XEUtils.findTree(staticTabs, item => item.id === tabConfig.id, { children: 'children' });
    if (matchObj) {
        matchObj.items.splice(matchObj.index, 1);
    }
    $xeTabs.reactData.staticTabs = staticTabs.slice(0);
}
