import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { getStyle } from "../../checkbox/style/index.js";
import { genTreeStyle, initComponentToken } from "../../tree/style/index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/tree-select/style/index.ts
const genBaseStyle = (token) => {
	const { componentCls, treePrefixCls, colorBgElevated } = token;
	const treeCls = `.${treePrefixCls}`;
	return [{ [`${componentCls}-dropdown`]: [
		{ padding: `${unit(token.paddingXS)} ${unit(token.calc(token.paddingXS).div(2).equal())}` },
		genTreeStyle(treePrefixCls, mergeToken(token, { colorBgContainer: colorBgElevated }), false),
		{ [treeCls]: {
			borderRadius: 0,
			[`${treeCls}-list-holder-inner`]: {
				alignItems: "stretch",
				[`${treeCls}-treenode`]: { [`${treeCls}-node-content-wrapper`]: { flex: "auto" } }
			}
		} },
		getStyle(`${treePrefixCls}-checkbox`, token),
		{ "&-rtl": {
			direction: "rtl",
			[`${treeCls}-switcher${treeCls}-switcher_close`]: { [`${treeCls}-switcher-icon svg`]: { transform: "rotate(90deg)" } }
		} }
	] }];
};
const prepareComponentToken = initComponentToken;
function useTreeSelectStyle(prefixCls, treePrefixCls, rootCls) {
	return genStyleHooks("TreeSelect", (token) => {
		return genBaseStyle(mergeToken(token, { treePrefixCls: treePrefixCls.value }));
	}, initComponentToken, { resetFont: false })(prefixCls, rootCls);
}

//#endregion
export { useTreeSelectStyle as default, prepareComponentToken };