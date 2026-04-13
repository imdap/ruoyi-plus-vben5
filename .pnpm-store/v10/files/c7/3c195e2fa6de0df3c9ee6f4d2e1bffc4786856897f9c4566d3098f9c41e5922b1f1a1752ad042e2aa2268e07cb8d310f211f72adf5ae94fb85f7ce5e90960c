import { resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import collapse_default from "../../style/motion/collapse.js";
import dragger_default from "./dragger.js";
import list_default from "./list.js";
import motion_default from "./motion.js";
import { genPictureCardStyle, genPictureStyle } from "./picture.js";
import rtl_default from "./rtl.js";

//#region src/upload/style/index.ts
const genBaseStyle = (token) => {
	const { componentCls, colorTextDisabled } = token;
	return { [`${componentCls}-wrapper`]: {
		...resetComponent(token),
		[componentCls]: {
			outline: 0,
			"input[type='file']": { cursor: "pointer" }
		},
		[`${componentCls}-select`]: { display: "inline-block" },
		[`${componentCls}-hidden`]: { display: "none" },
		[`${componentCls}-disabled`]: {
			color: colorTextDisabled,
			cursor: "not-allowed"
		}
	} };
};
const prepareComponentToken = (token) => ({
	actionsColor: token.colorIcon,
	pictureCardSize: token.controlHeightLG * 2.55
});
var style_default = genStyleHooks("Upload", (token) => {
	const { fontSizeHeading3, marginXS, lineWidth, pictureCardSize, calc } = token;
	const uploadToken = mergeToken(token, {
		uploadThumbnailSize: calc(fontSizeHeading3).mul(2).equal(),
		uploadProgressOffset: calc(calc(marginXS).div(2)).add(lineWidth).equal(),
		uploadPicCardSize: pictureCardSize
	});
	return [
		genBaseStyle(uploadToken),
		dragger_default(uploadToken),
		genPictureStyle(uploadToken),
		genPictureCardStyle(uploadToken),
		list_default(uploadToken),
		motion_default(uploadToken),
		rtl_default(uploadToken),
		collapse_default(uploadToken)
	];
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };