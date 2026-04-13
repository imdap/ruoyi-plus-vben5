import { resetComponent, textEllipsis } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/anchor/style/index.ts
const genSharedAnchorStyle = (token) => {
	const { componentCls, holderOffsetBlock, motionDurationSlow, lineWidthBold, colorPrimary, lineType, colorSplit, calc } = token;
	return { [`${componentCls}-wrapper`]: {
		marginBlockStart: calc(holderOffsetBlock).mul(-1).equal(),
		paddingBlockStart: holderOffsetBlock,
		[componentCls]: {
			...resetComponent(token),
			position: "relative",
			paddingInlineStart: lineWidthBold,
			[`${componentCls}-link`]: {
				paddingBlock: token.linkPaddingBlock,
				paddingInline: `${unit(token.linkPaddingInlineStart)} 0`,
				"&-title": {
					...textEllipsis,
					position: "relative",
					display: "block",
					marginBlockEnd: token.anchorTitleBlock,
					color: token.colorText,
					transition: `all ${token.motionDurationSlow}`,
					"&:only-child": { marginBlockEnd: 0 }
				},
				[`&-active > ${componentCls}-link-title`]: { color: token.colorPrimary },
				[`${componentCls}-link`]: { paddingBlock: token.anchorPaddingBlockSecondary }
			}
		},
		[`&:not(${componentCls}-wrapper-horizontal)`]: { [componentCls]: {
			"&::before": {
				position: "absolute",
				insetInlineStart: 0,
				top: 0,
				height: "100%",
				borderInlineStart: `${unit(lineWidthBold)} ${lineType} ${colorSplit}`,
				content: "\" \""
			},
			[`${componentCls}-ink`]: {
				position: "absolute",
				insetInlineStart: 0,
				display: "none",
				transform: "translateY(-50%)",
				transition: `top ${motionDurationSlow} ease-in-out`,
				width: lineWidthBold,
				backgroundColor: colorPrimary,
				[`&${componentCls}-ink-visible`]: { display: "inline-block" }
			}
		} },
		[`${componentCls}-fixed ${componentCls}-ink ${componentCls}-ink`]: { display: "none" }
	} };
};
const genSharedAnchorHorizontalStyle = (token) => {
	const { componentCls, motionDurationSlow, lineWidthBold, colorPrimary } = token;
	return { [`${componentCls}-wrapper-horizontal`]: {
		position: "relative",
		"&::before": {
			position: "absolute",
			left: {
				_skip_check_: true,
				value: 0
			},
			right: {
				_skip_check_: true,
				value: 0
			},
			bottom: 0,
			borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
			content: "\" \""
		},
		[componentCls]: {
			overflowX: "scroll",
			position: "relative",
			display: "flex",
			scrollbarWidth: "none",
			"&::-webkit-scrollbar": { display: "none" },
			[`${componentCls}-link:first-of-type`]: { paddingInline: 0 },
			[`${componentCls}-ink`]: {
				position: "absolute",
				bottom: 0,
				transition: [`left`, `width`].map((prop) => `${prop} ${motionDurationSlow} ease-in-out`).join(", "),
				height: lineWidthBold,
				backgroundColor: colorPrimary
			}
		}
	} };
};
const prepareComponentToken = (token) => ({
	linkPaddingBlock: token.paddingXXS,
	linkPaddingInlineStart: token.padding
});
var style_default = genStyleHooks("Anchor", (token) => {
	const { fontSize, fontSizeLG, paddingXXS, calc } = token;
	const anchorToken = mergeToken(token, {
		holderOffsetBlock: paddingXXS,
		anchorPaddingBlockSecondary: calc(paddingXXS).div(2).equal(),
		anchorTitleBlock: calc(fontSize).div(14).mul(3).equal(),
		anchorBallSize: calc(fontSizeLG).div(2).equal()
	});
	return [genSharedAnchorStyle(anchorToken), genSharedAnchorHorizontalStyle(anchorToken)];
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };