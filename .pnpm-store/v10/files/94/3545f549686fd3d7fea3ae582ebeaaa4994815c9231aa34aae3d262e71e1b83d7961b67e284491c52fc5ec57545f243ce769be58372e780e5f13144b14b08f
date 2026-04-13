import getScrollBarSize from "./getScrollBarSize.js";
import setStyle_default from "./setStyle.js";
function isBodyOverflowing() {
	return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
var cacheStyle = {};
var switchScrollingEffect_default = (close) => {
	if (!isBodyOverflowing() && !close) return;
	const scrollingEffectClassName = "ant-scrolling-effect";
	const scrollingEffectClassNameReg = new RegExp(`${scrollingEffectClassName}`, "g");
	const bodyClassName = document.body.className;
	if (close) {
		if (!scrollingEffectClassNameReg.test(bodyClassName)) return;
		setStyle_default(cacheStyle);
		cacheStyle = {};
		document.body.className = bodyClassName.replace(scrollingEffectClassNameReg, "").trim();
		return;
	}
	const scrollBarSize = getScrollBarSize();
	if (scrollBarSize) {
		cacheStyle = setStyle_default({
			position: "relative",
			width: `calc(100% - ${scrollBarSize}px)`
		});
		if (!scrollingEffectClassNameReg.test(bodyClassName)) {
			const addClassName = `${bodyClassName} ${scrollingEffectClassName}`;
			document.body.className = addClassName.trim();
		}
	}
};
export { switchScrollingEffect_default as default };
