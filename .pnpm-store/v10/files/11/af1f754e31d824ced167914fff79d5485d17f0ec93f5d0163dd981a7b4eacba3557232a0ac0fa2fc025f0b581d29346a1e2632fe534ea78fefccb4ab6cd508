import { computed, defineComponent, inject, provide, ref } from "vue";

//#region src/locale/index.tsx
const LocaleContextKey = Symbol("LocaleContext");
const ANT_MARK = "internalMark";
function useLocaleProvider(props) {
	provide(LocaleContextKey, props);
}
const LocaleProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	useLocaleProvider({ locale: computed(() => ({
		...props.locale,
		exist: true
	})) });
	return () => {
		return slots?.default?.();
	};
}, {
	props: {
		locale: {
			type: Object,
			required: true
		},
		_ANT_MARK__: {
			type: String,
			required: false
		}
	},
	name: "LocaleProvider"
});
function useLocaleContext() {
	return inject(LocaleContextKey, { locale: ref(void 0) });
}

//#endregion
export { ANT_MARK, LocaleProvider, useLocaleContext, useLocaleProvider };