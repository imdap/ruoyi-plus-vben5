Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
let _v_c_util_dist_KeyCode = require("@v-c/util/dist/KeyCode");
_v_c_util_dist_KeyCode = require_rolldown_runtime.__toESM(_v_c_util_dist_KeyCode);
var Options = /* @__PURE__ */ (0, vue.defineComponent)((props) => {
	const defaultPageSizeOptions = [
		10,
		20,
		50,
		100
	];
	const goInputText = (0, vue.ref)("");
	const getValidValue = (0, vue.computed)(() => {
		return !goInputText.value || Number.isNaN(goInputText.value) ? void 0 : Number(goInputText.value);
	});
	const handleChange = (e) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) goInputText.value = value;
	};
	const handleBlur = (e) => {
		if (props.goButton || goInputText.value === "") return;
		(0, vue.nextTick)(() => {
			goInputText.value = "";
		});
		const relTarget = e.relatedTarget;
		if (relTarget && relTarget.className.includes(`${props.rootPrefixCls}-item-link`) || relTarget?.className.includes(`${props.rootPrefixCls}-item`)) return;
		props.quickGo?.(getValidValue.value);
	};
	const getterPageSizeOptions = (0, vue.computed)(() => props.pageSizeOptions || defaultPageSizeOptions);
	const go = (e) => {
		if (goInputText.value === "") return;
		if (e.keyCode === _v_c_util_dist_KeyCode.default.ENTER || e.type === "click") {
			(0, vue.nextTick)(() => {
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
			if (goButton) gotoButton = typeof goButton === "boolean" ? (0, vue.createVNode)("button", {
				"type": "button",
				"onClick": go,
				"onKeyup": go,
				"disabled": disabled,
				"class": `${prefixCls}-quick-jumper-button`
			}, [locale.jump_to_confirm]) : (0, vue.createVNode)("span", {
				"onClick": go,
				"onKeyup": go
			}, [goButton]);
			goInput = (0, vue.createVNode)("div", { "class": `${prefixCls}-quick-jumper` }, [
				locale.jump_to,
				(0, vue.createVNode)("input", {
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
		return (0, vue.createVNode)("li", { "class": prefixCls }, [changeSelect, goInput]);
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
var Options_default = Options;
exports.default = Options_default;
