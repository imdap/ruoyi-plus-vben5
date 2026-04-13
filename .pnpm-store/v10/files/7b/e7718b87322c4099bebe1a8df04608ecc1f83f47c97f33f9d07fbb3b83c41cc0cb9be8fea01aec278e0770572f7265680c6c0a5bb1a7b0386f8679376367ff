import { stringifyStylesheet } from "../../../css/stylesheet.js";
/**
* Convert icon content to a string literal
*/
function stringifyFactoryIconContent(icon, embedCSS) {
	const style = embedCSS ? stringifyStylesheet(embedCSS) : "";
	return "`" + (style ? `<style>${style}</style>${icon.content}` : icon.content).replace(/`/g, "\\`") + "`";
}
export { stringifyFactoryIconContent };
