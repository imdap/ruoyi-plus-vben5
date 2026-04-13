import seed_default from "./themes/seed.js";
import theme_default from "./themes/default/theme.js";
import { useDesignToken } from "./context.js";
import { useConfig } from "../config-provider/context.js";
import version_default from "../version/index.js";
import formatToken from "./util/alias.js";
import { computed } from "vue";
import { useCacheToken } from "@antdv-next/cssinjs";

//#region src/theme/useToken.ts
const unitless = {
	lineHeight: true,
	lineHeightSM: true,
	lineHeightLG: true,
	lineHeightHeading1: true,
	lineHeightHeading2: true,
	lineHeightHeading3: true,
	lineHeightHeading4: true,
	lineHeightHeading5: true,
	opacityLoading: true,
	fontWeightStrong: true,
	zIndexPopupBase: true,
	zIndexBase: true,
	opacityImage: true
};
const ignore = {
	motionBase: true,
	motionUnit: true
};
const preserve = {
	screenXS: true,
	screenXSMin: true,
	screenXSMax: true,
	screenSM: true,
	screenSMMin: true,
	screenSMMax: true,
	screenMD: true,
	screenMDMin: true,
	screenMDMax: true,
	screenLG: true,
	screenLGMin: true,
	screenLGMax: true,
	screenXL: true,
	screenXLMin: true,
	screenXLMax: true,
	screenXXL: true,
	screenXXLMin: true,
	screenXXLMax: true,
	screenXXXL: true,
	screenXXXLMin: true
};
function getComputedToken(originToken, overrideToken, theme) {
	const derivativeToken = theme.getDerivativeToken(originToken);
	const { override, ...components } = overrideToken;
	let mergedDerivativeToken = {
		...derivativeToken,
		override
	};
	mergedDerivativeToken = formatToken(mergedDerivativeToken);
	if (components) Object.entries(components).forEach(([key, value]) => {
		const { theme: componentTheme, ...componentTokens } = value;
		let mergedComponentToken = componentTokens;
		if (componentTheme) mergedComponentToken = getComputedToken({
			...mergedDerivativeToken,
			...componentTokens
		}, { override: componentTokens }, componentTheme);
		mergedDerivativeToken[key] = mergedComponentToken;
	});
	return mergedDerivativeToken;
}
function useToken() {
	const designContext = useDesignToken();
	const config = useConfig();
	const salt = computed(() => `${version_default}-${designContext.value.hashed || ""}`);
	const mergedTheme = computed(() => designContext.value?.theme || theme_default);
	const cssVar = computed(() => {
		const cssVar = designContext.value.cssVar;
		return {
			prefix: cssVar?.prefix ?? "ant",
			key: cssVar?.key ?? "css-var-root"
		};
	});
	const cachedToken = useCacheToken(mergedTheme, computed(() => [seed_default, designContext.value.token]), computed(() => {
		return {
			salt: salt.value,
			override: designContext.value.override,
			getComputedToken,
			cssVar: {
				...cssVar.value,
				unitless,
				ignore,
				preserve
			},
			nonce: designContext.value.csp?.nonce ?? config.value?.csp?.nonce
		};
	}));
	return [
		mergedTheme,
		computed(() => cachedToken.value[2]),
		computed(() => designContext.value.hashed ? cachedToken.value[1] : ""),
		computed(() => cachedToken.value[0]),
		cssVar,
		computed(() => !!designContext.value?.zeroRuntime)
	];
}

//#endregion
export { useToken as default, getComputedToken, ignore, unitless };