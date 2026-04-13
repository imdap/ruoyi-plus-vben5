import useToken from "../theme/useToken.js";
import { addMediaQueryListener, removeMediaQueryListener } from "./mediaQueryUtil.js";
import { computed } from "vue";

//#region src/_util/responsiveObserver.ts
const responsiveArray = [
	"xxxl",
	"xxl",
	"xl",
	"lg",
	"md",
	"sm",
	"xs"
];
const responsiveArrayReversed = [...responsiveArray].reverse();
function getResponsiveMap(token) {
	return {
		xs: `(max-width: ${token.screenXSMax}px)`,
		sm: `(min-width: ${token.screenSM}px)`,
		md: `(min-width: ${token.screenMD}px)`,
		lg: `(min-width: ${token.screenLG}px)`,
		xl: `(min-width: ${token.screenXL}px)`,
		xxl: `(min-width: ${token.screenXXL}px)`,
		xxxl: `(min-width: ${token.screenXXXL}px)`
	};
}
/**
* Ensures that the breakpoints token are valid, in good order
* For each breakpoint : screenMin <= screen <= screenMax and screenMax <= nextScreenMin
*/
function validateBreakpoints(token) {
	const indexableToken = token;
	const revBreakpoints = [...responsiveArray].reverse();
	revBreakpoints.forEach((breakpoint, i) => {
		const breakpointUpper = breakpoint.toUpperCase();
		const screenMin = `screen${breakpointUpper}Min`;
		const screen = `screen${breakpointUpper}`;
		if (!(indexableToken[screenMin] <= indexableToken[screen])) throw new Error(`${screenMin}<=${screen} fails : !(${indexableToken[screenMin]}<=${indexableToken[screen]})`);
		if (i < revBreakpoints.length - 1) {
			const screenMax = `screen${breakpointUpper}Max`;
			if (!(indexableToken[screen] <= indexableToken[screenMax])) throw new Error(`${screen}<=${screenMax} fails : !(${indexableToken[screen]}<=${indexableToken[screenMax]})`);
			const nextScreenMin = `screen${revBreakpoints[i + 1].toUpperCase()}Min`;
			if (!(indexableToken[screenMax] <= indexableToken[nextScreenMin])) throw new Error(`${screenMax}<=${nextScreenMin} fails : !(${indexableToken[screenMax]}<=${indexableToken[nextScreenMin]})`);
		}
	});
	return token;
}
function matchScreen(screens, screenSizes) {
	if (!screenSizes) return;
	for (const breakpoint of responsiveArray) if (screens[breakpoint] && screenSizes?.[breakpoint] !== void 0) return screenSizes[breakpoint];
}
function useResponsiveObserver() {
	const [, token] = useToken();
	return computed(() => {
		const responsiveMap = getResponsiveMap(validateBreakpoints(token.value));
		const subscribers = /* @__PURE__ */ new Map();
		let subUid = -1;
		let screens = {};
		return {
			responsiveMap,
			matchHandlers: {},
			dispatch(pointMap) {
				screens = pointMap;
				subscribers.forEach((func) => func(screens));
				return subscribers.size >= 1;
			},
			subscribe(func) {
				if (!subscribers.size) this.register();
				subUid += 1;
				subscribers.set(subUid, func);
				func(screens);
				return subUid;
			},
			unsubscribe(paramToken) {
				subscribers.delete(paramToken);
				if (!subscribers.size) this.unregister();
			},
			register() {
				Object.entries(responsiveMap).forEach(([screen, mediaQuery]) => {
					const listener = ({ matches }) => {
						this.dispatch({
							...screens,
							[screen]: matches
						});
					};
					const mql = window.matchMedia(mediaQuery);
					addMediaQueryListener(mql, listener);
					this.matchHandlers[mediaQuery] = {
						mql,
						listener
					};
					listener(mql);
				});
			},
			unregister() {
				Object.values(responsiveMap).forEach((mediaQuery) => {
					const handler = this.matchHandlers[mediaQuery];
					removeMediaQueryListener(handler?.mql, handler?.listener);
				});
				subscribers.clear();
			}
		};
	});
}
var responsiveObserver_default = useResponsiveObserver;

//#endregion
export { responsiveObserver_default as default, matchScreen, responsiveArray, responsiveArrayReversed };