//#region src/cssinjs-utils/util/statistic.ts
const enableStatistic = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC !== "undefined";
let recording = true;
function merge(...objs) {
	if (!enableStatistic) return Object.assign({}, ...objs);
	recording = false;
	const ret = {};
	objs.forEach((obj) => {
		if (!obj || typeof obj !== "object") return;
		Object.keys(obj).forEach((key) => {
			Object.defineProperty(ret, key, {
				configurable: true,
				enumerable: true,
				get: () => obj[key]
			});
		});
	});
	recording = true;
	return ret;
}
const statistic = {};
const _statistic_build_ = {};
function noop() {}
function statisticToken(token) {
	let tokenKeys;
	let proxy = token;
	let flush = noop;
	if (enableStatistic && typeof Proxy !== "undefined") {
		tokenKeys = /* @__PURE__ */ new Set();
		proxy = new Proxy(token, { get(obj, prop) {
			if (recording) tokenKeys?.add(String(prop));
			return obj[prop];
		} });
		flush = (componentName, componentToken) => {
			statistic[componentName] = {
				global: Array.from(tokenKeys),
				component: {
					...statistic[componentName]?.component,
					...componentToken
				}
			};
		};
	}
	return {
		token: proxy,
		keys: tokenKeys,
		flush
	};
}
var statistic_default = statisticToken;

//#endregion
export { _statistic_build_, statistic_default as default, merge, statistic };