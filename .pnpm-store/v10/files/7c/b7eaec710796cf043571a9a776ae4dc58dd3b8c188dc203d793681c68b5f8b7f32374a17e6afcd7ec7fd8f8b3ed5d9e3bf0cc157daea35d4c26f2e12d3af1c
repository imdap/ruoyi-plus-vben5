import canUseDom from "./canUseDom.js";
var animationEndEventNames = {
	WebkitAnimation: "webkitAnimationEnd",
	OAnimation: "oAnimationEnd",
	animation: "animationend"
};
var transitionEventNames = {
	WebkitTransition: "webkitTransitionEnd",
	OTransition: "oTransitionEnd",
	transition: "transitionend"
};
function supportEnd(names) {
	const el = document.createElement("div");
	for (const name in names) if (names.hasOwnProperty(name) && el.style[name] !== void 0) return { end: names[name] };
	return false;
}
const animation = canUseDom() && supportEnd(animationEndEventNames);
const transition = canUseDom() && supportEnd(transitionEventNames);
export { animation, transition };
