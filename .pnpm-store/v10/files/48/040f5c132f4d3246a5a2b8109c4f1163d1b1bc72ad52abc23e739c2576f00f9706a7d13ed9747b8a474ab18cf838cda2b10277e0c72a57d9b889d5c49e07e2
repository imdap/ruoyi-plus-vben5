//#region src/ssr/styleCollector.ts
let collector = null;
function setStyleCollector(next) {
	collector = next;
}
function collectStyleText(styleText) {
	collector?.push(styleText);
}

//#endregion
export { collectStyleText, setStyleCollector };