import seed_default from "./themes/seed.js";
import theme_default from "./themes/default/theme.js";
import { computed, defineComponent, inject, provide } from "vue";

//#region src/theme/context.ts
const defaultConfig = {
	token: seed_default,
	override: { override: seed_default },
	hashed: false
};
const DesignTokenContextKey = Symbol("DesignTokenContext");
function useDesignTokenProvide(props) {
	provide(DesignTokenContextKey, props);
}
const DesignTokenProvider = defineComponent((props, { slots }) => {
	useDesignTokenProvide(computed(() => props.value));
	return () => {
		return slots?.default?.();
	};
}, { props: ["value"] });
function useDesignToken() {
	return inject(DesignTokenContextKey, computed(() => defaultConfig));
}

//#endregion
export { DesignTokenContextKey, DesignTokenProvider, defaultConfig, theme_default as defaultTheme, useDesignToken, useDesignTokenProvide };