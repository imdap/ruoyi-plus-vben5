Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_useItems = require("./hooks/useItems.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_hooks_useMergedState = require("@v-c/util/dist/hooks/useMergedState");
_v_c_util_dist_hooks_useMergedState = require_rolldown_runtime.__toESM(_v_c_util_dist_hooks_useMergedState);
let _v_c_util_dist_omit = require("@v-c/util/dist/omit");
_v_c_util_dist_omit = require_rolldown_runtime.__toESM(_v_c_util_dist_omit);
let _v_c_util_dist_pickAttrs = require("@v-c/util/dist/pickAttrs");
_v_c_util_dist_pickAttrs = require_rolldown_runtime.__toESM(_v_c_util_dist_pickAttrs);
function getActiveKeysArray(activeKey) {
	let currentActiveKey = activeKey;
	if (!Array.isArray(currentActiveKey)) {
		const activeKeyType = typeof currentActiveKey;
		currentActiveKey = activeKeyType === "number" || activeKeyType === "string" ? [currentActiveKey] : [];
	}
	return currentActiveKey.map((key) => String(key));
}
var Collapse = /* @__PURE__ */ (0, vue.defineComponent)({
	props: /* @__PURE__ */ (0, vue.mergeDefaults)({
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		activeKey: {
			type: [
				String,
				Number,
				Array
			],
			required: false,
			default: void 0
		},
		defaultActiveKey: {
			type: [
				String,
				Number,
				Array
			],
			required: false,
			default: void 0
		},
		openMotion: {
			type: Object,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		accordion: {
			type: Boolean,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		expandIcon: {
			type: Function,
			required: false,
			default: void 0
		},
		collapsible: {
			type: String,
			required: false,
			default: void 0
		},
		items: {
			type: Array,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		}
	}, { prefixCls: "vc-collapse" }),
	name: "VcCollapse",
	inheritAttrs: false,
	setup(props, { attrs, expose, slots }) {
		const refWrapper = (0, vue.ref)();
		const [activeKey, setActiveKey] = (0, _v_c_util_dist_hooks_useMergedState.default)([], {
			value: (0, vue.toRef)(props, "activeKey"),
			onChange: (v) => props.onChange?.(v),
			defaultValue: props.defaultActiveKey,
			postState: getActiveKeysArray
		});
		const getActiveKey = (key) => {
			if (props.accordion) return activeKey.value[0] === key ? [] : [key];
			if (activeKey.value.indexOf(key) > -1) return activeKey.value.filter((item) => item !== key);
			return [...activeKey.value, key];
		};
		const onItemClick = (key) => {
			activeKey.value = getActiveKey(key);
			setActiveKey(activeKey.value);
		};
		expose({ ref: refWrapper });
		return () => {
			const { prefixCls = "vc-collapse", openMotion, expandIcon, collapsible, accordion, classNames, styles, items, destroyOnHidden } = props;
			const collapseClassName = (0, _v_c_util.classNames)(prefixCls, attrs.class);
			const mergedProps = {
				...props,
				...(0, _v_c_util_dist_omit.default)(attrs, ["class", "style"])
			};
			const mergedChildren = require_useItems.useItems(items, slots.default, {
				prefixCls,
				accordion,
				openMotion,
				expandIcon,
				collapsible,
				onItemClick,
				activeKey: activeKey.value,
				destroyOnHidden,
				classNames,
				styles
			});
			return (0, vue.createVNode)("div", (0, vue.mergeProps)({
				"ref": refWrapper,
				"class": collapseClassName,
				"style": attrs.style,
				"role": accordion ? "tablist" : void 0
			}, (0, _v_c_util_dist_pickAttrs.default)(mergedProps, {
				aria: true,
				data: true
			})), [mergedChildren]);
		};
	}
});
var Collapse_default = Collapse;
exports.default = Collapse_default;
