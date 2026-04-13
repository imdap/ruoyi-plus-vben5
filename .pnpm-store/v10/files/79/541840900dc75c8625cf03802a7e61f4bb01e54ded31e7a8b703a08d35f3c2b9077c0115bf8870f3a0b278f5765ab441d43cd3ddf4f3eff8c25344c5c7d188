import { computed, defineComponent, inject, provide, ref } from "vue";

//#region src/form/context.tsx
/** Form Context. Set top form style and pass to Form Item usage. */
const FormContextKey = Symbol("FormContextKey");
function useFormContextProvider(value) {
	provide(FormContextKey, value);
}
function useFormContext() {
	return inject(FormContextKey, ref({
		labelAlign: "right",
		layout: "horizontal"
	}));
}
const FormItemPrefixContextKey = Symbol("FormItemPrefixContextKey");
/** Used for ErrorList only */
function useFormItemPrefixContextProvider(value) {
	provide(FormItemPrefixContextKey, value);
}
const FormItemPrefixContextProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	useFormItemPrefixContextProvider(computed(() => props));
	return () => {
		return slots?.default?.();
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: false
	}
} });
function useFormItemPrefixContext() {
	return inject(FormItemPrefixContextKey, ref({ prefixCls: "" }));
}
const VariantContextKey = Symbol("VariantContextKey");
function useVariantContextProvider(variant) {
	provide(VariantContextKey, variant);
}
function useVariantContext() {
	return inject(VariantContextKey, ref(void 0));
}
const FormItemInputContextKey = Symbol("FormItemInputContextKey");
function useFormItemInputContextProvider(value) {
	provide(FormItemInputContextKey, value);
}
function useFormItemInputContext() {
	return inject(FormItemInputContextKey, ref({}));
}
/** `noStyle` Form Item Context. Used for error collection */
const NoStyleItemContextKey = Symbol("NoStyleItemContextKey");
function useNoStyleItemContextProvider(value) {
	provide(NoStyleItemContextKey, value);
}
const NoStyleItemContextProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	useNoStyleItemContextProvider(props.value);
	return () => {
		return slots?.default?.();
	};
}, {
	props: { value: {
		type: Function,
		required: true
	} },
	name: "NoStyleItemContext"
});
function useNoStyleItemContext() {
	return inject(NoStyleItemContextKey, null);
}
const NoFormStyle = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const formItemInputContext = useFormItemInputContext();
	useFormItemInputContextProvider(computed(() => {
		const { override, status } = props;
		const newContext = { ...formItemInputContext.value };
		if (override) delete newContext.isFormItemInput;
		if (status) {
			delete newContext.status;
			delete newContext.hasFeedback;
			delete newContext.feedbackIcon;
		}
		return newContext;
	}));
	return () => {
		return slots?.default?.();
	};
}, { props: {
	override: {
		type: Boolean,
		required: false,
		default: void 0
	},
	status: {
		type: Boolean,
		required: false,
		default: void 0
	}
} });
const FormItemProviderContextKey = Symbol("FormItemProviderContextKey");
function useFormItemProvider(value) {
	provide(FormItemProviderContextKey, value);
}
function useFormItemContext(rest = false) {
	if (rest) useFormItemProviderRest();
	return inject(FormItemProviderContextKey, void 0);
}
function useFormItemProviderRest() {
	return provide(FormItemProviderContextKey, {
		fieldId: ref(void 0),
		triggerChange: () => {},
		triggerBlur: () => {},
		clearValidate: () => {},
		triggerFocus: () => {}
	});
}

//#endregion
export { FormItemPrefixContextProvider, NoFormStyle, NoStyleItemContextProvider, useFormContext, useFormContextProvider, useFormItemContext, useFormItemInputContext, useFormItemInputContextProvider, useFormItemPrefixContext, useFormItemPrefixContextProvider, useFormItemProvider, useFormItemProviderRest, useNoStyleItemContext, useNoStyleItemContextProvider, useVariantContext, useVariantContextProvider };