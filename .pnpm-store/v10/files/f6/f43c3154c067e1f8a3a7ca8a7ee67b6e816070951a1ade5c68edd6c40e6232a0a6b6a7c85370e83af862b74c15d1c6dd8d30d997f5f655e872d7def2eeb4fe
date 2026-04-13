var PIXEL_PATTERN = /margin|padding|width|height|max|min|offset/;
var removePixel = {
	left: true,
	top: true
};
var floatMap = {
	cssFloat: 1,
	styleFloat: 1,
	float: 1
};
function getComputedStyle(node) {
	return node.nodeType === 1 ? node.ownerDocument.defaultView.getComputedStyle(node, null) : {};
}
function getStyleValue(node, type, value) {
	type = type.toLowerCase();
	if (value === "auto") {
		if (type === "height") return node.offsetHeight;
		if (type === "width") return node.offsetWidth;
	}
	if (!(type in removePixel)) removePixel[type] = PIXEL_PATTERN.test(type);
	return removePixel[type] ? Number.parseFloat(value) || 0 : value;
}
function get(node, name) {
	const length = arguments.length;
	const style = getComputedStyle(node);
	name = floatMap[name] ? "cssFloat" in node.style ? "cssFloat" : "styleFloat" : name;
	return length === 1 ? style : getStyleValue(node, name, style[name] || node.style[name]);
}
function set(node, name, value) {
	const length = arguments.length;
	name = floatMap[name] ? "cssFloat" in node.style ? "cssFloat" : "styleFloat" : name;
	if (length === 3) {
		if (typeof value === "number" && PIXEL_PATTERN.test(name)) value = `${value}px`;
		node.style[name] = value;
		return value;
	}
	for (const x in name) if (x in name) set(node, x, name[x]);
	return getComputedStyle(node);
}
function getOuterWidth(el) {
	if (el === document.body) return document.documentElement.clientWidth;
	return el.offsetWidth;
}
function getOuterHeight(el) {
	if (el === document.body) return window.innerHeight || document.documentElement.clientHeight;
	return el.offsetHeight;
}
function getDocSize() {
	return {
		width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
		height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
	};
}
function getClientSize() {
	return {
		width: document.documentElement.clientWidth,
		height: window.innerHeight || document.documentElement.clientHeight
	};
}
function getScroll() {
	return {
		scrollLeft: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
		scrollTop: Math.max(document.documentElement.scrollTop, document.body.scrollTop)
	};
}
function getOffset(node) {
	const box = node.getBoundingClientRect();
	const docElem = document.documentElement;
	return {
		left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
		top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
	};
}
export { get, getClientSize, getDocSize, getOffset, getOuterHeight, getOuterWidth, getScroll, set };
