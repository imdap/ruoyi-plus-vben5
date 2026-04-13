import { useFormContext, useFormItemInputContext, useFormItemInputContextProvider } from "../context.js";
import { getStatus } from "../util.js";
import { computed, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, LoadingOutlined } from "@antdv-next/icons";

//#region src/form/FormItem/StatusProvider.tsx
const iconMap = {
	success: CheckCircleFilled,
	warning: ExclamationCircleFilled,
	error: CloseCircleFilled,
	validating: LoadingOutlined
};
const StatusProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const formContext = useFormContext();
	const formItemContext = useFormItemInputContext();
	useFormItemInputContextProvider(computed(() => {
		const { errors, warnings, hasFeedback, validateStatus, prefixCls, meta, noStyle, name } = props;
		const itemPrefixCls = `${prefixCls}-item`;
		const { feedbackIcons } = formContext.value ?? {};
		const mergedValidateStatus = getStatus(errors, warnings, meta, null, !!hasFeedback, validateStatus);
		const { isFormItemInput: parentIsFormItemInput, status: parentStatus, hasFeedback: parentHasFeedback, feedbackIcon: parentFeedbackIcon, name: parentName } = formItemContext.value;
		let feedbackIcon;
		if (hasFeedback) {
			const customIcons = hasFeedback !== true && hasFeedback.icons || feedbackIcons;
			const customIconNode = mergedValidateStatus && customIcons?.({
				status: mergedValidateStatus,
				errors,
				warnings
			})?.[mergedValidateStatus];
			const IconNode = mergedValidateStatus ? iconMap[mergedValidateStatus] : null;
			feedbackIcon = customIconNode !== false && IconNode ? createVNode("span", { "class": clsx(`${itemPrefixCls}-feedback-icon`, `${itemPrefixCls}-feedback-icon-${mergedValidateStatus}`) }, [customIconNode || createVNode(IconNode, null, null)]) : null;
		}
		const context = {
			status: mergedValidateStatus || "",
			errors,
			warnings,
			hasFeedback: !!hasFeedback,
			feedbackIcon,
			isFormItemInput: true,
			name
		};
		if (noStyle) {
			context.status = (mergedValidateStatus ?? parentStatus) || "";
			context.isFormItemInput = parentIsFormItemInput;
			context.hasFeedback = !!(hasFeedback ?? parentHasFeedback);
			context.feedbackIcon = hasFeedback !== void 0 ? context.feedbackIcon : parentFeedbackIcon;
			context.name = name ?? parentName;
		}
		return context;
	}));
	return () => {
		return slots?.default?.();
	};
}, {
	props: {
		validateStatus: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: true
		},
		meta: {
			type: Object,
			required: true
		},
		errors: {
			type: Array,
			required: true
		},
		warnings: {
			type: Array,
			required: true
		},
		hasFeedback: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		noStyle: {
			type: Boolean,
			required: false,
			default: void 0
		},
		name: { required: false }
	},
	name: "StatusProvider",
	inheritAttrs: false
});
var StatusProvider_default = StatusProvider;

//#endregion
export { StatusProvider_default as default };