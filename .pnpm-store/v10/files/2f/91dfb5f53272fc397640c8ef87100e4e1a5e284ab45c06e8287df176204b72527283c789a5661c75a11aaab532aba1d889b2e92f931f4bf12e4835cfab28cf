import XEUtils from 'xe-utils';
export function assembleSplitterItem($xeSplitter, elem, paneConfig) {
    const staticItems = $xeSplitter.reactData.staticItems;
    const parentElem = elem.parentNode;
    if (parentElem) {
        staticItems.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, paneConfig);
        $xeSplitter.reactData.staticItems = staticItems.slice(0);
    }
}
export function destroySplitterItem($xeSplitter, paneConfig) {
    const staticItems = $xeSplitter.reactData.staticItems;
    const index = XEUtils.findIndexOf(staticItems, item => item.id === paneConfig.id);
    if (index > -1) {
        staticItems.splice(index, 1);
    }
    $xeSplitter.reactData.staticItems = staticItems.slice(0);
}
