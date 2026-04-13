import { computed, createVNode, defineComponent, nextTick, ref } from "vue";
import KeyCode from "@v-c/util/dist/KeyCode";
var Options_default = /* @__PURE__ */ defineComponent((props) => {
	const defaultPageSizeOptions = [
		10,
		20,
		50,
		100
	];
	const goInputText = ref("");
	const getValidValue = computed(() => {
		return !goInputText.value || Number.isNaN(goInputText.value) ? void 0 : Number(goInputText.value);
	});
	const handleChange = (e) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) goInputText.value = value;
	};
	const handleBlur = (e) => {
		if (props.goButton || goInputText.value === "") return;
		nextTick(() => {
			goInputText.value = "";
		});
		const relTarget = e.relatedTarget;
		if (relTarget && relTarget.className.includes(`${props.rootPrefixCls}-item-link`) || relTarget?.className.includes(`${props.rootPrefixCls}-item`)) return;
		props.quickGo?.(getValidValue.value);
	};
	const getterPageSizeOptions = computed(() => props.pageSizeOptions || defaultPageSizeOptions);
	const go = (e) => {
		if (goInputText.value === "") return;
		if (e.keyCode === KeyCode.ENTER || e.type === "click") {
			nextTick(() => {
				goInputText.value = "";
			});
			props.quickGo?.(getValidValue.value);
		}
	};
	const getPageSizeOptions = () => {
		if (getterPageSizeOptions.value.some((option) => option.toString() === props.pageSize.toString())) return getterPageSizeOptions.value;
		return getterPageSizeOptions.value.concat([props.pageSize]).sort((a, b) => {
			return (Number.isNaN(Number(a)) ? 0 : Number(a)) - (Number.isNaN(Number(b)) ? 0 : Number(b));
		});
	};
	return () => {
		const { rootPrefixCls, locale, showSizeChanger, disabled, pageSize, quickGo, goButton, buildOptionText, sizeChangerRender, changeSize } = props;
		const mergeBuildOptionText = typeof buildOptionText === "function" ? buildOptionText : (value) => `${value} ${locale.items_per_page}`;
		const prefixCls = `${rootPrefixCls}-options`;
		if (!showSizeChanger && !quickGo) return null;
		let changeSelect = null;
		let goInput = null;
		let gotoButton = null;
		if (showSizeChanger && sizeChangerRender) changeSelect = sizeChangerRender({
			"disabled": disabled,
			"size": pageSize,
			"onSizeChange": (nextValue) => {
				changeSize?.(Number(nextValue));
			},
			"aria-label": locale.page_size,
			"className": `${prefixCls}-size-changer`,
			"options": getPageSizeOptions().map((opt) => ({
				label: mergeBuildOptionText(opt),
				value: opt
			}))
		});
		if (quickGo) {
			if (goButton) gotoButton = typeof goButton === "boolean" ? createVNode("button", {
				"type": "button",
				"onClick": go,
				"onKeyup": go,
				"disabled": disabled,
				"class": `${prefixCls}-quick-jumper-button`
			}, [locale.jump_to_confirm]) : createVNode("span", {
				"onClick": go,
				"onKeyup": go
			}, [goButton]);
			goInput = createVNode("div", { "class": `${prefixCls}-quick-jumper` }, [
				locale.jump_to,
				createVNode("input", {
					"disabled": disabled,
					"type": "text",
					"value": goInputText.value,
					"onInput": handleChange,
					"onKeyup": go,
					"onBlur": handleBlur,
					"aria-label": locale.page
				}, null),
				locale.page,
				gotoButton
			]);
		}
		return createVNode("li", { "class": prefixCls }, [changeSelect, goInput]);
	};
}, { props: {
	disabled: {
		type: Boolean,
		required: false,
		default: void 0
	},
	locale: {
		type: Object,
		required: true,
		default: void 0
	},
	rootPrefixCls: {
		type: String,
		required: true,
		default: void 0
	},
	selectPrefixCls: {
		type: String,
		required: false,
		default: void 0
	},
	pageSize: {
		type: Number,
		required: true,
		default: void 0
	},
	pageSizeOptions: {
		type: Array,
		required: false,
		default: void 0
	},
	goButton: {
		type: [Boolean, String],
		required: false,
		skipCheck: true,
		default: void 0
	},
	changeSize: {
		type: Function,
		required: false,
		default: void 0
	},
	quickGo: {
		type: Function,
		required: false,
		default: void 0
	},
	buildOptionText: {
		type: Function,
		required: false,
		default: void 0
	},
	showSizeChanger: {
		type: Boolean,
		required: true,
		default: void 0
	},
	sizeChangerRender: {
		type: Function,
		required: false,
		default: void 0
	}
} });
export { Options_default as default };
