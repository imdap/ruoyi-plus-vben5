function getMotionName(prefixCls, transitionName, animationName) {
	let motionName = transitionName;
	if (!motionName && animationName) motionName = `${prefixCls}-${animationName}`;
	return motionName;
}
function getScroll(w, top) {
	let ret = w[`page${top ? "Y" : "X"}Offset`];
	const method = `scroll${top ? "Top" : "Left"}`;
	if (typeof ret !== "number") {
		const d = w.document;
		ret = d.documentElement[method];
		if (typeof ret !== "number") ret = d.body[method];
	}
	return ret;
}
function offset(el) {
	const rect = el.getBoundingClientRect();
	const pos = {
		left: rect.left,
		top: rect.top
	};
	const doc = el.ownerDocument;
	const w = doc.defaultView || doc.parentWindow;
	if (w) {
		pos.left += getScroll(w);
		pos.top += getScroll(w, true);
	}
	return pos;
}
export { getMotionName, offset };
