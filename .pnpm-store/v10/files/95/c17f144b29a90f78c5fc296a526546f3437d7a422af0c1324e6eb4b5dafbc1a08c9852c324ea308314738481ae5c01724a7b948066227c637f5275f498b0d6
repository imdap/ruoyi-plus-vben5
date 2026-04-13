//#region src/table/style/fixed.ts
function getShadowStyle({ colorSplit: shadowColor }) {
	return [{ boxShadow: `inset 10px 0 8px -8px ${shadowColor}` }, { boxShadow: `inset -10px 0 8px -8px ${shadowColor}` }];
}
const genFixedStyle = (token) => {
	const { componentCls, lineWidth, motionDurationSlow, zIndexTableFixed, tableBg, calc } = token;
	const cellCls = `${componentCls}-cell`;
	const fixCellCls = `${cellCls}-fix`;
	const sharedShadowStyle = {
		position: "absolute",
		top: 0,
		bottom: calc(lineWidth).mul(-1).equal(),
		width: 30,
		transition: `box-shadow ${motionDurationSlow}`,
		content: "\"\"",
		pointerEvents: "none"
	};
	const [leftShadowStyle, rightShadowStyle] = getShadowStyle(token);
	return { [`${componentCls}-wrapper`]: {
		[`${cellCls}${fixCellCls}`]: { position: "sticky" },
		[fixCellCls]: {
			zIndex: `calc(var(--z-offset-reverse) + ${zIndexTableFixed})`,
			background: tableBg,
			"&:after": sharedShadowStyle,
			"&-start:after": { insetInlineStart: "100%" },
			"&-end:after": { insetInlineEnd: "100%" },
			"&-start-shadow-show:after": leftShadowStyle,
			"&-end-shadow-show:after": rightShadowStyle
		},
		[`${componentCls}-container`]: {
			position: "relative",
			"&:before, &:after": {
				...sharedShadowStyle,
				zIndex: `calc(var(--columns-count) * 2 + ${zIndexTableFixed} + 1)`
			},
			"&:before": { insetInlineStart: 0 },
			"&:after": { insetInlineEnd: 0 }
		},
		[`${componentCls}-has-fix-start ${componentCls}-container:before`]: { display: "none" },
		[`${componentCls}-has-fix-end ${componentCls}-container:after`]: { display: "none" },
		[`${componentCls}-fix-start-shadow-show ${componentCls}-container:before`]: leftShadowStyle,
		[`${componentCls}-fix-end-shadow-show ${componentCls}-container:after`]: rightShadowStyle
	} };
};
var fixed_default = genFixedStyle;

//#endregion
export { fixed_default as default, getShadowStyle };