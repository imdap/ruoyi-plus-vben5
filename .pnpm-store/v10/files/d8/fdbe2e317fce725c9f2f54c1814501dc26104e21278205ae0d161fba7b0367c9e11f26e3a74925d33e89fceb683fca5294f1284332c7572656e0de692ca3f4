import { usePickerContext } from "../context.js";
import useTimeInfo from "../../hooks/useTimeInfo.js";
import { computed, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
var Footer_default = /* @__PURE__ */ defineComponent((props) => {
	const mode = computed(() => props.mode);
	const internalMode = computed(() => props.internalMode);
	const renderExtraFooter = computed(() => props.renderExtraFooter);
	const showNow = computed(() => props.showNow);
	const showTime = computed(() => props.showTime);
	const onSubmit = computed(() => props.onSubmit);
	const onNow = computed(() => props.onNow);
	const invalid = computed(() => props.invalid);
	const needConfirm = computed(() => props.needConfirm);
	const pickerCtx = usePickerContext();
	const generateConfig = computed(() => props.generateConfig || pickerCtx.value.generateConfig);
	const disabledDate = computed(() => props.disabledDate);
	const now = computed(() => generateConfig.value.getNow());
	const [getValidTime] = useTimeInfo(generateConfig, showTime, now);
	const nowDisabled = computed(() => disabledDate.value(now.value, { type: mode.value }));
	const onInternalNow = () => {
		if (!nowDisabled.value) {
			const validateNow = getValidTime(now.value);
			onNow.value(validateNow);
		}
	};
	return () => {
		const { prefixCls, locale, button: Button = "button", classNames, styles } = pickerCtx.value;
		const extraNode = renderExtraFooter.value?.(mode.value);
		const nowPrefixCls = `${prefixCls}-now`;
		const nowBtnPrefixCls = `${nowPrefixCls}-btn`;
		const presetNode = showNow.value && createVNode("li", { "class": nowPrefixCls }, [createVNode("a", {
			"class": clsx(nowBtnPrefixCls, nowDisabled.value && `${nowBtnPrefixCls}-disabled`),
			"aria-disabled": nowDisabled.value,
			"onClick": onInternalNow
		}, [internalMode.value === "date" ? locale.today : locale.now])]);
		const okNode = needConfirm.value && createVNode("li", { "class": `${prefixCls}-ok` }, [createVNode(Button, {
			"disabled": invalid.value,
			"onClick": onSubmit.value
		}, { default: () => [locale.ok] })]);
		const rangeNode = (presetNode || okNode) && createVNode("ul", { "class": `${prefixCls}-ranges` }, [presetNode, okNode]);
		if (!extraNode && !rangeNode) return null;
		return createVNode("div", {
			"class": clsx(`${prefixCls}-footer`, classNames.popup?.footer),
			"style": styles.popup?.footer
		}, [extraNode && createVNode("div", { "class": `${prefixCls}-footer-extra` }, [extraNode]), rangeNode]);
	};
}, {
	props: {
		mode: {
			type: String,
			required: true,
			default: void 0
		},
		internalMode: {
			type: String,
			required: true,
			default: void 0
		},
		renderExtraFooter: {
			type: Function,
			required: false,
			default: void 0
		},
		showNow: {
			type: Boolean,
			required: true,
			default: void 0
		},
		generateConfig: {
			type: Object,
			required: true,
			default: void 0
		},
		disabledDate: {
			type: Function,
			required: true,
			default: void 0
		},
		showTime: {
			type: Object,
			required: false,
			default: void 0
		},
		invalid: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onSubmit: {
			type: Function,
			required: true,
			default: void 0
		},
		needConfirm: {
			type: Boolean,
			required: true,
			default: void 0
		},
		onNow: {
			type: Function,
			required: true,
			default: void 0
		}
	},
	name: "Footer",
	inheritAttrs: false
});
export { Footer_default as default };
