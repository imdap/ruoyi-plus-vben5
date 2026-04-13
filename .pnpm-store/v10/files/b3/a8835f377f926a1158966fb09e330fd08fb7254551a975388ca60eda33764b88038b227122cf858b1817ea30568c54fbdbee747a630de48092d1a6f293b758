//#region src/util.ts
function isImageValid(src) {
	return new Promise((resolve) => {
		if (!src) {
			resolve(false);
			return;
		}
		const isTestEnv = typeof process !== "undefined" && process.env.NODE_ENV === "test";
		const isJSDomUA = typeof navigator !== "undefined" && /jsdom/i.test(navigator.userAgent);
		if (isTestEnv || isJSDomUA || !(typeof document !== "undefined" && typeof window !== "undefined")) {
			resolve(/^(https?:)?\/\//.test(src) || /^(data|blob):/.test(src) || src.startsWith("/") || src.startsWith("./") || src.startsWith("../"));
			return;
		}
		const img = document.createElement("img");
		img.onerror = () => resolve(false);
		img.onload = () => resolve(true);
		img.src = src;
	});
}
function getClientSize() {
	if (typeof document === "undefined" || typeof window === "undefined") return {
		width: 0,
		height: 0
	};
	return {
		width: document.documentElement.clientWidth,
		height: window.innerHeight || document.documentElement.clientHeight
	};
}
//#endregion
export { getClientSize, isImageValid };
