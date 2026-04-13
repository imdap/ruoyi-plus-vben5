import { genStyleHooks } from "../../theme/util/genStyleUtils.js";

//#region src/masonry/style/index.ts
const genMasonryStyle = (token) => {
	const { componentCls } = token;
	const itemCls = `${componentCls}-item`;
	return { [componentCls]: {
		position: "relative",
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		"&-rtl": { direction: "rtl" },
		[`& > ${itemCls}`]: {
			boxSizing: "border-box",
			"&-fade": {
				"&-appear": {
					transition: `opacity ${token.motionDurationSlow} ${token.motionEaseOut}`,
					opacity: 0,
					"&-active": { opacity: 1 }
				},
				"&-leave": {
					transition: `opacity ${token.motionDurationFast} ${token.motionEaseOut}`,
					opacity: 1,
					"&-active": { opacity: 0 }
				}
			},
			[`&:not(${itemCls}-fade)`]: { transition: [
				"left",
				"right",
				"top"
			].map((prop) => `${prop} ${token.motionDurationSlow} ${token.motionEaseOut}`).join(",") }
		}
	} };
};
var style_default = genStyleHooks("Masonry", genMasonryStyle);

//#endregion
export { style_default as default, genMasonryStyle };