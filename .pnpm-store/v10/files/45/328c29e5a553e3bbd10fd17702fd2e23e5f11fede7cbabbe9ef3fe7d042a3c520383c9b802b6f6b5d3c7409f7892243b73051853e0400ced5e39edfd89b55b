import calc_default from "../../theme/calc/index.js";
import { token2CSSVar } from "../../util/css-variables.js";
import useStyleRegister from "../../hooks/useStyleRegister.js";
import useCSSVarRegister from "../../hooks/useCSSVarRegister.js";
import useUniqueMemo_default from "../_util/hooks/useUniqueMemo.js";
import useCSP_default from "../hooks/useCSP.js";
import getComponentToken_default from "./getComponentToken.js";
import getCompVarPrefix_default from "./getCompVarPrefix.js";
import statistic_default, { merge } from "./statistic.js";
import getDefaultComponentToken_default from "./getDefaultComponentToken.js";
import maxmin_default from "./maxmin.js";
import "../../index.js";
import { computed, defineComponent } from "vue";

//#region src/cssinjs-utils/util/genStyleUtils.ts
function genStyleUtils(config) {
	const { useCSP = useCSP_default, useToken, usePrefix, getResetStyles, getCommonStyle, getCompUnitless } = config;
	function genStyleHooks(component, styleFn, getDefaultToken, options) {
		const componentName = Array.isArray(component) ? component[0] : component;
		function prefixToken(key) {
			return `${String(componentName)}${key.slice(0, 1).toUpperCase()}${key.slice(1)}`;
		}
		const originUnitless = options?.unitless || {};
		const compUnitless = {
			...typeof getCompUnitless === "function" ? getCompUnitless(component) : {},
			[prefixToken("zIndexPopup")]: true
		};
		Object.keys(originUnitless).forEach((key) => {
			compUnitless[prefixToken(key)] = originUnitless[key];
		});
		const mergedOptions = {
			...options,
			unitless: compUnitless,
			prefixToken
		};
		const useStyle = genComponentStyleHook(component, styleFn, getDefaultToken, mergedOptions);
		const useCSSVar = genCSSVarRegister(componentName, getDefaultToken, mergedOptions);
		return (prefixCls, rootCls = prefixCls) => {
			return [useStyle(prefixCls, rootCls), useCSSVar(rootCls)];
		};
	}
	function genCSSVarRegister(component, getDefaultToken, options) {
		const { unitless: compUnitless, prefixToken, ignore } = options;
		return (rootCls) => {
			const { cssVar, realToken } = useToken();
			useCSSVarRegister(computed(() => {
				const _cssVar = cssVar.value;
				return {
					path: [component],
					prefix: _cssVar?.prefix,
					key: _cssVar.key,
					unitless: compUnitless,
					ignore,
					token: realToken?.value,
					scope: rootCls.value
				};
			}), () => {
				const defaultToken = getDefaultComponentToken_default(component, realToken.value, getDefaultToken);
				const componentToken = getComponentToken_default(component, realToken.value, defaultToken, { deprecatedTokens: options?.deprecatedTokens });
				if (defaultToken) Object.keys(defaultToken).forEach((key) => {
					componentToken[prefixToken(key)] = componentToken[key];
					delete componentToken[key];
				});
				return componentToken;
			});
			return computed(() => cssVar?.value?.key);
		};
	}
	function genComponentStyleHook(componentName, styleFn, getDefaultToken, options = {}) {
		const cells = Array.isArray(componentName) ? componentName : [componentName, componentName];
		const [component] = cells;
		const concatComponent = cells.join("-");
		const mergedLayer = config.layer || { name: "antd" };
		return (prefixCls, rootCls) => {
			const { theme, hashId, token, realToken, cssVar, zeroRuntime } = useToken();
			if (computed(() => {
				return zeroRuntime?.value;
			}).value) return hashId;
			const prefix = usePrefix();
			const csp = useCSP();
			const type = "css";
			const calc = computed(() => {
				return useUniqueMemo_default(() => {
					const unitlessCssVar = /* @__PURE__ */ new Set();
					Object.keys(options.unitless || {}).forEach((key) => {
						unitlessCssVar.add(token2CSSVar(key, cssVar?.value?.prefix));
						unitlessCssVar.add(token2CSSVar(key, getCompVarPrefix_default(component, cssVar?.value?.prefix)));
					});
					return calc_default(type, unitlessCssVar);
				}, [
					type,
					component,
					cssVar?.value?.prefix
				]);
			});
			const { max, min } = maxmin_default(type);
			const sharedConfig = computed(() => {
				return {
					theme: theme?.value,
					token: token.value,
					hashId: hashId?.value,
					nonce: () => csp.value.nonce,
					clientOnly: options.clientOnly,
					layer: mergedLayer,
					order: options.order || -999
				};
			});
			if (typeof getResetStyles === "function") useStyleRegister(computed(() => ({
				...sharedConfig.value,
				clientOnly: false,
				path: ["Shared", prefix.value?.rootPrefixCls]
			})), () => getResetStyles(token.value, {
				prefix: computed(() => ({
					rootPrefixCls: prefix.value.rootPrefixCls,
					iconPrefixCls: prefix.value.iconPrefixCls
				})),
				csp
			}));
			useStyleRegister(computed(() => {
				return {
					...sharedConfig.value,
					path: [
						concatComponent,
						prefixCls.value,
						prefix.value.iconPrefixCls
					]
				};
			}), () => {
				if (options.injectStyle === false) return [];
				const { token: proxyToken, flush } = statistic_default(token.value);
				const tokenForCalc = realToken?.value || proxyToken;
				const defaultComponentToken = getDefaultComponentToken_default(component, tokenForCalc, getDefaultToken);
				const componentCls = `.${prefixCls.value}`;
				const componentToken = getComponentToken_default(component, tokenForCalc, defaultComponentToken, { deprecatedTokens: options.deprecatedTokens });
				if (defaultComponentToken && typeof defaultComponentToken === "object") Object.keys(defaultComponentToken).forEach((key) => {
					defaultComponentToken[key] = `var(${token2CSSVar(key, getCompVarPrefix_default(component, cssVar?.value?.prefix))})`;
				});
				const mergedToken = merge(proxyToken, {
					componentCls,
					prefixCls: prefixCls.value,
					iconCls: `.${prefix.value.iconPrefixCls}`,
					antCls: `.${prefix.value.rootPrefixCls}`,
					calc: calc.value,
					max,
					min
				}, defaultComponentToken);
				const styleInterpolation = styleFn(mergedToken, {
					hashId: hashId.value,
					prefixCls: prefixCls.value,
					rootPrefixCls: prefix.value.rootPrefixCls,
					iconPrefixCls: prefix.value.iconPrefixCls
				});
				flush(component, componentToken);
				const commonStyle = typeof getCommonStyle === "function" ? getCommonStyle(mergedToken, prefixCls.value, rootCls?.value, options.resetFont) : null;
				return [options.resetStyle === false ? null : commonStyle, styleInterpolation];
			});
			return hashId;
		};
	}
	function genSubStyleComponent(componentName, styleFn, getDefaultToken, options = {}) {
		const useStyle = genComponentStyleHook(componentName, styleFn, getDefaultToken, {
			resetStyle: false,
			order: -998,
			...options
		});
		return defineComponent({
			props: {
				prefixCls: String,
				rootCls: String
			},
			setup(props) {
				useStyle(computed(() => props.prefixCls), computed(() => props.rootCls ?? props.prefixCls));
				return () => {
					return null;
				};
			},
			name: `SubStyle_${String(Array.isArray(componentName) ? componentName.join(".") : componentName)}`
		});
	}
	return {
		genStyleHooks,
		genSubStyleComponent,
		genComponentStyleHook
	};
}
var genStyleUtils_default = genStyleUtils;

//#endregion
export { genStyleUtils_default as default };