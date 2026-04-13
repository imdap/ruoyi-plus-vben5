import { getDOM } from "@v-c/util/dist/Dom/findDOMNode";
//#region src/utils/offsetUtil.ts
function getOffset(node) {
	const box = getDOM(node).getBoundingClientRect();
	const docElem = document.documentElement;
	return {
		left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
		top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
	};
}
//#endregion
export { getOffset };
