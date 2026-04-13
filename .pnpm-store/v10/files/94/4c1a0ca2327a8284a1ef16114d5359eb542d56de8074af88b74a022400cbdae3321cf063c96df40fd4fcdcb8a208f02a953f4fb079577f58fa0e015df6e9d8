import { useItems } from "./hooks/useItems.js";
import { createVNode, defineComponent, mergeDefaults, mergeProps, ref, toRef } from "vue";
import { classNames } from "@v-c/util";
import useMergedState from "@v-c/util/dist/hooks/useMergedState";
import omit from "@v-c/util/dist/omit";
import pickAttrs from "@v-c/util/dist/pickAttrs";
function getActiveKeysArray(activeKey) {
	let currentActiveKey = activeKey;
	if (!Array.isArray(currentActiveKey)) {
		const activeKeyType = typeof currentActiveKey;
		currentActiveKey = activeKeyType === "number" || activeKeyType === "string" ? [currentActiveKey] : [];
	}
	return currentActiveKey.map((key) => String(key));
}
var Collapse_default = /* @__PURE__ */ defineComponent({
	props: /* @__PURE__ */ mergeDefaults({
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
		const refWrapper = ref();
		const [activeKey, setActiveKey] = useMergedState([], {
			value: toRef(props, "activeKey"),
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
			const { prefixCls = "vc-collapse", openMotion, expandIcon, collapsible, accordion, classNames: classNames$1, styles, items, destroyOnHidden } = props;
			const collapseClassName = classNames(prefixCls, attrs.class);
			const mergedProps = {
				...props,
				...omit(attrs, ["class", "style"])
			};
			const mergedChildren = useItems(items, slots.default, {
				prefixCls,
				accordion,
				openMotion,
				expandIcon,
				collapsible,
				onItemClick,
				activeKey: activeKey.value,
				destroyOnHidden,
				classNames: classNames$1,
				styles
			});
			return createVNode("div", mergeProps({
				"ref": refWrapper,
				"class": collapseClassName,
				"style": attrs.style,
				"role": accordion ? "tablist" : void 0
			}, pickAttrs(mergedProps, {
				aria: true,
				data: true
			})), [mergedChildren]);
		};
	}
});
export { Collapse_default as default };
