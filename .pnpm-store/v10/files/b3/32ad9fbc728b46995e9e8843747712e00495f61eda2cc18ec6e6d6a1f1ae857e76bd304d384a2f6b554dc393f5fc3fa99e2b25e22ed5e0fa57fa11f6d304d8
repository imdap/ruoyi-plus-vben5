import { defaultIconPrefixCls, useConfig } from "../../config-provider/context.js";
import useToken, { unitless } from "../useToken.js";
import { genCommonStyle, genIconStyle, genLinkStyle } from "../../style/index.js";
import { computed } from "vue";
import { genStyleUtils } from "@antdv-next/cssinjs/cssinjs-utils";

//#region src/theme/util/genStyleUtils.ts
const { genComponentStyleHook, genStyleHooks, genSubStyleComponent } = genStyleUtils({
	usePrefix: () => {
		const configCtx = useConfig();
		return computed(() => {
			const { getPrefixCls, iconPrefixCls } = configCtx.value;
			return {
				rootPrefixCls: getPrefixCls(),
				iconPrefixCls
			};
		});
	},
	useToken() {
		const [theme, realToken, hashId, token, cssVar, zeroRuntime] = useToken();
		return {
			theme,
			realToken,
			hashId: computed(() => hashId.value ?? ""),
			token,
			cssVar: computed(() => cssVar?.value ?? {
				prefix: "",
				key: ""
			}),
			zeroRuntime
		};
	},
	useCSP: () => {
		const configCtx = useConfig();
		return computed(() => configCtx.value?.csp ?? {});
	},
	getResetStyles: (token, config) => {
		const linkStyle = genLinkStyle(token);
		const { prefix } = config ?? {};
		return [
			linkStyle,
			{ "&": linkStyle },
			genIconStyle(prefix?.value?.iconPrefixCls ?? defaultIconPrefixCls)
		];
	},
	getCommonStyle: genCommonStyle,
	getCompUnitless: (() => unitless)
});
function genCssVar(antCls, component) {
	const cssPrefix = `--${antCls.replace(/\./g, "")}-${component}-`;
	const varName = (name) => {
		return `${cssPrefix}${name}`;
	};
	const varRef = (name, fallback) => {
		return fallback ? `var(${cssPrefix}${name}, ${fallback})` : `var(${cssPrefix}${name})`;
	};
	return [varName, varRef];
}

//#endregion
export { genComponentStyleHook, genCssVar, genStyleHooks, genSubStyleComponent };