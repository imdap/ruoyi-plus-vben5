import XEUtils from 'xe-utils';
export function assembleCarouselItem($xeCarousel, elem, itemConfig) {
    const staticItems = $xeCarousel.reactData.staticItems;
    const parentElem = elem.parentNode;
    if (parentElem) {
        staticItems.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, itemConfig);
    }
    $xeCarousel.reactData.staticItems = staticItems.slice(0);
}
export function destroyCarouselItem($xeCarousel, itemConfig) {
    const staticItems = $xeCarousel.reactData.staticItems;
    const index = XEUtils.findIndexOf(staticItems, item => item.id === itemConfig.id);
    if (index > -1) {
        staticItems.splice(index, 1);
    }
    $xeCarousel.reactData.staticItems = staticItems.slice(0);
}
