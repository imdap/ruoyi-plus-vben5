import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { Keyframes, unit } from "@antdv-next/cssinjs";

//#region src/skeleton/style/index.ts
const skeletonClsLoading = new Keyframes(`ant-skeleton-loading`, {
	"0%": { backgroundPosition: "100% 50%" },
	"100%": { backgroundPosition: "0 50%" }
});
function genSkeletonElementCommonSize(size) {
	return {
		height: size,
		lineHeight: unit(size)
	};
}
function genSkeletonElementSize(size) {
	return {
		width: size,
		...genSkeletonElementCommonSize(size)
	};
}
const genSkeletonColor = (token) => ({
	background: token.skeletonLoadingBackground,
	backgroundSize: "400% 100%",
	animationName: skeletonClsLoading,
	animationDuration: token.skeletonLoadingMotionDuration,
	animationTimingFunction: "ease",
	animationIterationCount: "infinite"
});
function genSkeletonElementInputSize(size, calc) {
	return {
		width: calc(size).mul(5).equal(),
		minWidth: calc(size).mul(5).equal(),
		...genSkeletonElementCommonSize(size)
	};
}
const genSkeletonElementAvatar = (token) => {
	const { skeletonAvatarCls, gradientFromColor, controlHeight, controlHeightLG, controlHeightSM } = token;
	return {
		[skeletonAvatarCls]: {
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor,
			...genSkeletonElementSize(controlHeight)
		},
		[`${skeletonAvatarCls}${skeletonAvatarCls}-circle`]: { borderRadius: "50%" },
		[`${skeletonAvatarCls}${skeletonAvatarCls}-lg`]: { ...genSkeletonElementSize(controlHeightLG) },
		[`${skeletonAvatarCls}${skeletonAvatarCls}-sm`]: { ...genSkeletonElementSize(controlHeightSM) }
	};
};
const genSkeletonElementInput = (token) => {
	const { controlHeight, borderRadiusSM, skeletonInputCls, controlHeightLG, controlHeightSM, gradientFromColor, calc } = token;
	return {
		[skeletonInputCls]: {
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor,
			borderRadius: borderRadiusSM,
			...genSkeletonElementInputSize(controlHeight, calc)
		},
		[`${skeletonInputCls}-lg`]: { ...genSkeletonElementInputSize(controlHeightLG, calc) },
		[`${skeletonInputCls}-sm`]: { ...genSkeletonElementInputSize(controlHeightSM, calc) }
	};
};
const genSkeletonElementShape = (token) => {
	const { gradientFromColor, borderRadiusSM, imageSizeBase, calc } = token;
	return {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		verticalAlign: "middle",
		background: gradientFromColor,
		borderRadius: borderRadiusSM,
		...genSkeletonElementSize(calc(imageSizeBase).mul(2).equal())
	};
};
const genSkeletonElementNode = (token) => {
	return { [token.skeletonNodeCls]: { ...genSkeletonElementShape(token) } };
};
const genSkeletonElementImage = (token) => {
	const { skeletonImageCls, imageSizeBase, calc } = token;
	return {
		[skeletonImageCls]: {
			...genSkeletonElementShape(token),
			[`${skeletonImageCls}-path`]: { fill: "#bfbfbf" },
			[`${skeletonImageCls}-svg`]: {
				...genSkeletonElementSize(imageSizeBase),
				maxWidth: calc(imageSizeBase).mul(4).equal(),
				maxHeight: calc(imageSizeBase).mul(4).equal()
			},
			[`${skeletonImageCls}-svg${skeletonImageCls}-svg-circle`]: { borderRadius: "50%" }
		},
		[`${skeletonImageCls}${skeletonImageCls}-circle`]: { borderRadius: "50%" }
	};
};
function genSkeletonElementButtonShape(token, size, buttonCls) {
	const { skeletonButtonCls } = token;
	return {
		[`${buttonCls}${skeletonButtonCls}-circle`]: {
			width: size,
			minWidth: size,
			borderRadius: "50%"
		},
		[`${buttonCls}${skeletonButtonCls}-round`]: { borderRadius: size }
	};
}
function genSkeletonElementButtonSize(size, calc) {
	return {
		width: calc(size).mul(2).equal(),
		minWidth: calc(size).mul(2).equal(),
		...genSkeletonElementCommonSize(size)
	};
}
const genSkeletonElementButton = (token) => {
	const { borderRadiusSM, skeletonButtonCls, controlHeight, controlHeightLG, controlHeightSM, gradientFromColor, calc } = token;
	return {
		[skeletonButtonCls]: {
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor,
			borderRadius: borderRadiusSM,
			width: calc(controlHeight).mul(2).equal(),
			minWidth: calc(controlHeight).mul(2).equal(),
			...genSkeletonElementButtonSize(controlHeight, calc)
		},
		...genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls),
		[`${skeletonButtonCls}-lg`]: { ...genSkeletonElementButtonSize(controlHeightLG, calc) },
		...genSkeletonElementButtonShape(token, controlHeightLG, `${skeletonButtonCls}-lg`),
		[`${skeletonButtonCls}-sm`]: { ...genSkeletonElementButtonSize(controlHeightSM, calc) },
		...genSkeletonElementButtonShape(token, controlHeightSM, `${skeletonButtonCls}-sm`)
	};
};
const genBaseStyle = (token) => {
	const { componentCls, skeletonAvatarCls, skeletonTitleCls, skeletonParagraphCls, skeletonButtonCls, skeletonInputCls, skeletonNodeCls, skeletonImageCls, controlHeight, controlHeightLG, controlHeightSM, gradientFromColor, padding, marginSM, borderRadius, titleHeight, blockRadius, paragraphLiHeight, controlHeightXS, paragraphMarginTop } = token;
	return {
		[componentCls]: {
			display: "table",
			width: "100%",
			[`${componentCls}-header`]: {
				display: "table-cell",
				paddingInlineEnd: padding,
				verticalAlign: "top",
				[skeletonAvatarCls]: {
					display: "inline-block",
					verticalAlign: "top",
					background: gradientFromColor,
					...genSkeletonElementSize(controlHeight)
				},
				[`${skeletonAvatarCls}-circle`]: { borderRadius: "50%" },
				[`${skeletonAvatarCls}-lg`]: { ...genSkeletonElementSize(controlHeightLG) },
				[`${skeletonAvatarCls}-sm`]: { ...genSkeletonElementSize(controlHeightSM) }
			},
			[`${componentCls}-section`]: {
				display: "table-cell",
				width: "100%",
				verticalAlign: "top",
				[skeletonTitleCls]: {
					width: "100%",
					height: titleHeight,
					background: gradientFromColor,
					borderRadius: blockRadius,
					[`+ ${skeletonParagraphCls}`]: { marginBlockStart: controlHeightSM }
				},
				[skeletonParagraphCls]: {
					padding: 0,
					"> li": {
						width: "100%",
						height: paragraphLiHeight,
						listStyle: "none",
						background: gradientFromColor,
						borderRadius: blockRadius,
						"+ li": { marginBlockStart: controlHeightXS }
					}
				},
				[`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: { width: "61%" }
			},
			[`&-round ${componentCls}-section`]: { [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: { borderRadius } }
		},
		[`${componentCls}-with-avatar ${componentCls}-section`]: { [skeletonTitleCls]: {
			marginBlockStart: marginSM,
			[`+ ${skeletonParagraphCls}`]: { marginBlockStart: paragraphMarginTop }
		} },
		[`${componentCls}${componentCls}-element`]: {
			display: "inline-block",
			width: "auto",
			...genSkeletonElementButton(token),
			...genSkeletonElementAvatar(token),
			...genSkeletonElementInput(token),
			...genSkeletonElementNode(token),
			...genSkeletonElementImage(token)
		},
		[`${componentCls}${componentCls}-block`]: {
			width: "100%",
			[skeletonButtonCls]: { width: "100%" },
			[skeletonInputCls]: { width: "100%" }
		},
		[`${componentCls}${componentCls}-active`]: { [`
        ${skeletonTitleCls},
        ${skeletonParagraphCls} > li,
        ${skeletonAvatarCls},
        ${skeletonButtonCls},
        ${skeletonInputCls},
        ${skeletonNodeCls},
        ${skeletonImageCls}
      `]: { ...genSkeletonColor(token) } }
	};
};
const prepareComponentToken = (token) => {
	const { colorFillContent, colorFill } = token;
	const gradientFromColor = colorFillContent;
	const gradientToColor = colorFill;
	return {
		color: gradientFromColor,
		colorGradientEnd: gradientToColor,
		gradientFromColor,
		gradientToColor,
		titleHeight: token.controlHeight / 2,
		blockRadius: token.borderRadiusSM,
		paragraphMarginTop: token.marginLG + token.marginXXS,
		paragraphLiHeight: token.controlHeight / 2
	};
};
var style_default = genStyleHooks("Skeleton", (token) => {
	const { componentCls, calc } = token;
	return genBaseStyle(mergeToken(token, {
		skeletonAvatarCls: `${componentCls}-avatar`,
		skeletonTitleCls: `${componentCls}-title`,
		skeletonParagraphCls: `${componentCls}-paragraph`,
		skeletonButtonCls: `${componentCls}-button`,
		skeletonInputCls: `${componentCls}-input`,
		skeletonNodeCls: `${componentCls}-node`,
		skeletonImageCls: `${componentCls}-image`,
		imageSizeBase: calc(token.controlHeight).mul(1.5).equal(),
		borderRadius: 100,
		skeletonLoadingBackground: `linear-gradient(90deg, ${token.gradientFromColor} 25%, ${token.gradientToColor} 37%, ${token.gradientFromColor} 63%)`,
		skeletonLoadingMotionDuration: "1.4s"
	}));
}, prepareComponentToken, { deprecatedTokens: [["color", "gradientFromColor"], ["colorGradientEnd", "gradientToColor"]] });

//#endregion
export { style_default as default, prepareComponentToken };