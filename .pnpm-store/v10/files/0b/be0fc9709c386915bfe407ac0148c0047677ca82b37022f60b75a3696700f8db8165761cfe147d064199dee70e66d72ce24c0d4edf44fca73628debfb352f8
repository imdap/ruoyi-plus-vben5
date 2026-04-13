import { useConfig } from "../../config-provider/context.js";
import { genCssVar } from "../../theme/util/genStyleUtils.js";
import { TARGET_CLS } from "./interface.js";
import { getTargetWaveColor } from "./util.js";
import { computed, createVNode, defineComponent, nextTick, onBeforeUnmount, ref, render, shallowRef, watch } from "vue";
import { classNames } from "@v-c/util";
import raf from "@v-c/util/dist/raf";

//#region src/_util/wave/WaveEffect.tsx
function validateNum(value) {
	return Number.isNaN(value) ? 0 : value;
}
const WaveEffect = /* @__PURE__ */ defineComponent({
	name: "WaveEffect",
	inheritAttrs: false,
	props: {
		className: {
			type: String,
			required: true
		},
		target: {
			type: Object,
			required: true
		},
		component: {
			type: String,
			required: false
		},
		colorSource: {
			type: String,
			required: false
		}
	},
	emits: ["finish"],
	setup(props, { emit }) {
		const configCtx = useConfig();
		const rootPrefixCls = computed(() => configCtx.value.getPrefixCls());
		const waveVarName = computed(() => genCssVar(rootPrefixCls.value, "wave")[0]);
		const divRef = shallowRef();
		const waveColor = ref(null);
		const borderRadius = ref([]);
		const left = ref(0);
		const top = ref(0);
		const width = ref(0);
		const height = ref(0);
		const enabled = ref(false);
		const finished = ref(false);
		const waveStyle = computed(() => {
			const style = {
				left: `${left.value}px`,
				top: `${top.value}px`,
				width: `${width.value}px`,
				height: `${height.value}px`,
				borderRadius: borderRadius.value.map((radius) => `${radius}px`).join(" ")
			};
			if (waveColor.value) style[waveVarName.value("color")] = waveColor.value;
			return style;
		});
		const isSmallComponent = computed(() => {
			return (props.component === "Checkbox" || props.component === "Radio") && props.target?.classList.contains(TARGET_CLS);
		});
		const classes = computed(() => {
			return classNames(props.className, { "wave-quick": isSmallComponent.value });
		});
		function emitFinish() {
			if (finished.value) return;
			finished.value = true;
			emit("finish");
		}
		function syncPos(target = props.target) {
			if (!target) return;
			const nodeStyle = getComputedStyle(target);
			waveColor.value = getTargetWaveColor(target, props.colorSource);
			const isStatic = nodeStyle.position === "static";
			const { borderLeftWidth, borderTopWidth } = nodeStyle;
			left.value = isStatic ? target.offsetLeft : validateNum(-Number.parseFloat(borderLeftWidth));
			top.value = isStatic ? target.offsetTop : validateNum(-Number.parseFloat(borderTopWidth));
			width.value = target.offsetWidth;
			height.value = target.offsetHeight;
			const { borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius } = nodeStyle;
			borderRadius.value = [
				validateNum(Number.parseFloat(borderTopLeftRadius)),
				validateNum(Number.parseFloat(borderTopRightRadius)),
				validateNum(Number.parseFloat(borderBottomRightRadius)),
				validateNum(Number.parseFloat(borderBottomLeftRadius))
			];
		}
		function triggerEffect() {
			const element = divRef.value;
			if (!element) return;
			element.classList.remove("wave-motion-appear");
			element.classList.remove("wave-motion-appear-active");
			element.offsetHeight;
			element.classList.add("wave-motion-appear");
			element.classList.add("wave-motion-appear-active");
		}
		const rafId = ref();
		let resizeObserver;
		let deadlineId;
		const handleTransitionEnd = (event) => {
			if (event.target !== divRef.value) return;
			if (event.propertyName === "opacity") emitFinish();
		};
		watch(() => divRef.value, (newEl, oldEl) => {
			oldEl?.removeEventListener("transitionend", handleTransitionEnd);
			newEl?.addEventListener("transitionend", handleTransitionEnd);
		}, { immediate: true });
		function stopEffectSync() {
			if (rafId.value !== void 0) {
				raf.cancel(rafId.value);
				rafId.value = void 0;
			}
			resizeObserver?.disconnect();
			resizeObserver = void 0;
			if (deadlineId !== void 0) {
				window.clearTimeout(deadlineId);
				deadlineId = void 0;
			}
		}
		watch(() => props.target, (target, _, onCleanup) => {
			if (!target) return;
			let active = true;
			rafId.value = raf(() => {
				if (!active) return;
				syncPos(target);
				enabled.value = true;
				nextTick(() => {
					if (!active) return;
					triggerEffect();
					deadlineId = window.setTimeout(() => {
						emitFinish();
					}, 5e3);
				});
			});
			if (typeof ResizeObserver !== "undefined") {
				resizeObserver = new ResizeObserver(() => {
					syncPos(target);
				});
				resizeObserver.observe(target);
			}
			onCleanup(() => {
				active = false;
				stopEffectSync();
			});
		}, { immediate: true });
		onBeforeUnmount(() => {
			stopEffectSync();
			emitFinish();
		});
		return () => {
			if (!enabled.value) return null;
			return createVNode("div", {
				"ref": divRef,
				"class": classes.value,
				"style": waveStyle.value
			}, null);
		};
	}
});
const showWaveEffect = (target, info) => {
	const { component } = info;
	if (component === "Checkbox" && !target.querySelector("input")?.checked) return;
	const holder = (target.ownerDocument ?? document).createElement("div");
	holder.style.position = "absolute";
	holder.style.left = "0px";
	holder.style.top = "0px";
	target.insertBefore(holder, target.firstChild);
	let unmounted = false;
	const destroy = () => {
		if (unmounted) return;
		unmounted = true;
		render(null, holder);
		holder.remove();
	};
	render(createVNode(WaveEffect, {
		className: info.className,
		target,
		component,
		colorSource: info.colorSource,
		onFinish: destroy
	}), holder);
};
var WaveEffect_default = showWaveEffect;

//#endregion
export { WaveEffect, WaveEffect_default as default };