import { unit } from "@antdv-next/cssinjs";

//#region src/style/index.tsx
const textEllipsis = {
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis"
};
function resetComponent(token, needInheritFontFamily = false) {
	return {
		boxSizing: "border-box",
		margin: 0,
		padding: 0,
		color: token.colorText,
		fontSize: token.fontSize,
		lineHeight: token.lineHeight,
		listStyle: "none",
		fontFamily: needInheritFontFamily ? "inherit" : token.fontFamily
	};
}
function resetIcon() {
	return {
		display: "inline-flex",
		alignItems: "center",
		color: "inherit",
		fontStyle: "normal",
		lineHeight: 0,
		textAlign: "center",
		textTransform: "none",
		verticalAlign: "-0.125em",
		textRendering: "optimizeLegibility",
		"-webkit-font-smoothing": "antialiased",
		"-moz-osx-font-smoothing": "grayscale",
		"> *": { lineHeight: 1 },
		svg: { display: "inline-block" }
	};
}
function clearFix() {
	return {
		"&::before": {
			display: "table",
			content: "\"\""
		},
		"&::after": {
			display: "table",
			clear: "both",
			content: "\"\""
		}
	};
}
const genLinkStyle = (token) => ({ a: {
	color: token.colorLink,
	textDecoration: token.linkDecoration,
	backgroundColor: "transparent",
	outline: "none",
	cursor: "pointer",
	transition: `color ${token.motionDurationSlow}`,
	"-webkit-text-decoration-skip": "objects",
	"&:hover": { color: token.colorLinkHover },
	"&:active": { color: token.colorLinkActive },
	"&:active, &:hover": {
		textDecoration: token.linkHoverDecoration,
		outline: 0
	},
	"&:focus": {
		textDecoration: token.linkFocusDecoration,
		outline: 0
	},
	...genFocusStyle(token),
	"&[disabled]": {
		color: token.colorTextDisabled,
		cursor: "not-allowed"
	}
} });
function genCommonStyle(token, componentPrefixCls, rootCls, resetFont) {
	const prefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
	const rootPrefixSelector = rootCls ? `.${rootCls}` : prefixSelector;
	const resetStyle = {
		boxSizing: "border-box",
		"&::before, &::after": { boxSizing: "border-box" }
	};
	let resetFontStyle = {};
	if (resetFont !== false) resetFontStyle = {
		fontFamily: token.fontFamily,
		fontSize: token.fontSize
	};
	return { [rootPrefixSelector]: {
		...resetFontStyle,
		...resetStyle,
		[prefixSelector]: resetStyle
	} };
}
function genFocusOutline(token, offset) {
	return {
		outline: `${unit(token.lineWidthFocus)} solid ${token.colorPrimaryBorder}`,
		outlineOffset: offset ?? 1,
		transition: [`outline-offset`, `outline`].map((prop) => `${prop} 0s`).join(", ")
	};
}
function genFocusStyle(token, offset) {
	return { "&:focus-visible": genFocusOutline(token, offset) };
}
function genIconStyle(iconPrefixCls) {
	return { [`.${iconPrefixCls}`]: {
		...resetIcon(),
		[`.${iconPrefixCls} .${iconPrefixCls}-icon`]: { display: "block" }
	} };
}
const operationUnit = (token) => ({
	color: token.colorLink,
	textDecoration: token.linkDecoration,
	outline: "none",
	cursor: "pointer",
	transition: `all ${token.motionDurationSlow}`,
	border: 0,
	padding: 0,
	background: "none",
	userSelect: "none",
	...genFocusStyle(token),
	"&:hover": {
		color: token.colorLinkHover,
		textDecoration: token.linkHoverDecoration
	},
	"&:focus": {
		color: token.colorLinkHover,
		textDecoration: token.linkFocusDecoration
	},
	"&:active": {
		color: token.colorLinkActive,
		textDecoration: token.linkHoverDecoration
	}
});

//#endregion
export { clearFix, genCommonStyle, genFocusOutline, genFocusStyle, genIconStyle, genLinkStyle, operationUnit, resetComponent, resetIcon, textEllipsis };