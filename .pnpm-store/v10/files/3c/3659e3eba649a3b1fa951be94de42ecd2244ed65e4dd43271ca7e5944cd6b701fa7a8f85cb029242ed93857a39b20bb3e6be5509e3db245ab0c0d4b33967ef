import XEUtils from 'xe-utils';
import { addClass, removeClass } from './dom';
const rowMoveCls = 'row--drag-move';
const colMoveClass = 'col--drag-move';
/**
 * 上下拖拽
 */
export function moveRowAnimateToTb(elemList, offsetTop) {
    XEUtils.arrayEach(elemList, trEl => {
        trEl.style.transform = `translateY(${offsetTop}px)`;
    });
    requestAnimationFrame(() => {
        XEUtils.arrayEach(elemList, trEl => {
            addClass(trEl, rowMoveCls);
            trEl.style.transform = '';
        });
    });
}
export function clearRowAnimate(elem, clss) {
    setTimeout(() => {
        if (elem) {
            XEUtils.arrayEach(elem.querySelectorAll(clss.map(cls => `${cls}.${rowMoveCls}`).join(',')), elem => removeClass(elem, rowMoveCls));
        }
    }, 500);
}
/**
 * 左右拖拽
 */
export function moveColAnimateToLr(elemList, offsetLeft) {
    XEUtils.arrayEach(elemList, trEl => {
        trEl.style.transform = `translateX(${offsetLeft}px)`;
    });
    requestAnimationFrame(() => {
        XEUtils.arrayEach(elemList, trEl => {
            addClass(trEl, colMoveClass);
            trEl.style.transform = '';
        });
    });
}
export function clearColAnimate(elem, clss) {
    setTimeout(() => {
        if (elem) {
            XEUtils.arrayEach(elem.querySelectorAll(clss.map(cls => `${cls}.${rowMoveCls}`).join(',')), elem => removeClass(elem, colMoveClass));
        }
    }, 500);
}
