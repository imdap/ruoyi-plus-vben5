import throttleByAnimationFrame_default from "../_util/throttleByAnimationFrame.js";
import { useComponentBaseConfig, useConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1, pureAttrs } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import getScroll_default from "../_util/getScroll.js";
import scrollTo from "../_util/scrollTo.js";
import { useGroupContext } from "./context.js";
import FloatButton_default, { floatButtonPrefixCls } from "./FloatButton.js";
import { Transition, computed, createVNode, defineComponent, mergeProps, onBeforeUnmount, onMounted, shallowRef, watch } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { VerticalAlignTopOutlined } from "@antdv-next/icons";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";
import { omit } from "es-toolkit";

//#region src/float-button/BackTop.tsx
const defaultIcon = createVNode(VerticalAlignTopOutlined, null, null);
const BackTopWithInstall = /* @__PURE__ */ defineComponent((props, { attrs, slots, emit, expose }) => {
	const { backTopIcon } = useComponentBaseConfig("floatButton", props, ["backTopIcon"], floatButtonPrefixCls);
	const globalConfig = useConfig();
	const groupContext = useGroupContext();
	const { target, visibilityHeight, duration } = toPropsRefs$1(props, "target", "visibilityHeight", "duration");
	const visible = shallowRef((visibilityHeight.value ?? 400) === 0);
	const floatButtonRef = shallowRef(null);
	expose({ nativeElement: computed(() => floatButtonRef.value?.nativeElement ?? null) });
	const getDefaultTarget = () => floatButtonRef.value?.nativeElement?.ownerDocument ?? (typeof window !== "undefined" ? window : void 0);
	const container = shallowRef(null);
	const mergedVisibility = computed(() => visibilityHeight.value ?? 400);
	const handleScroll = throttleByAnimationFrame_default((event) => {
		visible.value = getScroll_default(event?.target ?? container.value ?? getDefaultTarget()) >= mergedVisibility.value;
	});
	const bindScroll = () => {
		const targetNode = target.value?.() ?? getDefaultTarget();
		if (targetNode) {
			container.value = targetNode;
			targetNode.addEventListener?.("scroll", handleScroll);
			handleScroll({ target: targetNode });
		}
	};
	const removeScroll = () => {
		container.value?.removeEventListener?.("scroll", handleScroll);
		container.value = null;
	};
	onMounted(() => {
		bindScroll();
	});
	onBeforeUnmount(() => {
		handleScroll.cancel();
		removeScroll();
	});
	watch(target, () => {
		removeScroll();
		bindScroll();
	});
	const triggerCheck = () => {
		const node = container.value ?? getDefaultTarget();
		if (node) handleScroll({ target: node });
	};
	watch(mergedVisibility, () => {
		triggerCheck();
	});
	const mergedShape = computed(() => groupContext?.value?.shape ?? props.shape ?? "circle");
	const mergedIcon = computed(() => {
		const slotIcon = slots.icon ? filterEmpty(slots.icon()) : [];
		if (slotIcon.length) return slotIcon;
		return props.icon ?? backTopIcon?.value ?? defaultIcon;
	});
	const rootPrefixCls = computed(() => globalConfig.value?.getPrefixCls?.());
	const transitionProps = computed(() => getTransitionProps(`${rootPrefixCls.value}-fade`));
	const scrollToTop = (e) => {
		scrollTo(0, {
			getContainer: target.value || getDefaultTarget,
			duration: duration.value ?? 450
		});
		emit("click", e);
	};
	return () => {
		const { className, style } = getAttrStyleAndClass$1(attrs);
		return createVNode(Transition, transitionProps.value, { default: () => visible.value ? createVNode(FloatButton_default, mergeProps(pureAttrs(attrs), omit(props, [
			"visibilityHeight",
			"target",
			"duration"
		]), {
			"ref": floatButtonRef,
			"class": className,
			"style": style,
			"shape": mergedShape.value,
			"icon": mergedIcon.value,
			"onClick": scrollToTop
		}), { default: slots.default }) : null });
	};
}, {
	props: {
		visibilityHeight: {
			type: Number,
			required: false
		},
		target: {
			type: Function,
			required: false
		},
		duration: {
			type: Number,
			required: false
		},
		icon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		description: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		content: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		type: {
			type: String,
			required: false
		},
		shape: {
			type: String,
			required: false
		},
		tooltip: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		href: {
			type: String,
			required: false
		},
		badge: {
			type: Object,
			required: false
		},
		htmlType: {
			type: String,
			required: false
		},
		ariaLabel: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	},
	emits: ["click"],
	name: "AFloatBackTop",
	inheritAttrs: false
});
var BackTop_default = BackTopWithInstall;

//#endregion
export { BackTop_default as default };