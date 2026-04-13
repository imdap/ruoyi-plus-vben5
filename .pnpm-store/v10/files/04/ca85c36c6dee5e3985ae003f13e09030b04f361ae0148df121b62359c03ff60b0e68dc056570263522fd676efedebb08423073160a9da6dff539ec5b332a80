import { Fragment, computed, createApp, createCommentVNode, createElementBlock, defineComponent, h, inject, normalizeClass, normalizeStyle, onMounted, openBlock, provide, ref, renderList, renderSlot } from "vue";
import { FastColor } from "@ant-design/fast-color";

//#region src/composables/useHappyMode.ts
const HAPPY_MODE_KEY = Symbol("HAPPY_MODE");
/**
* Use happy mode state from HappyProvider
* @returns A function that returns the current happy mode state
*/
function useHappyMode() {
	return inject(HAPPY_MODE_KEY, () => false);
}

//#endregion
//#region src/DotEffect/useStyle.ts
const TARGET_ATTR = "data-happy-wave-target";
const antWaveTargetEffect = `
@keyframes antWaveTargetEffect {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.1);
  }
  35% {
    transform: scale(0.94);
  }
  60% {
    transform: scale(1.05);
  }
  85% {
    transform: scale(0.97);
  }
  100% {
    transform: scale(1);
  }
}
`;
const antWaveDotEffect = `
@keyframes antWaveDotEffect {
  0% {
    opacity: 0;
    left: var(--start-x);
    top: var(--start-y);
    width: var(--start-size);
    height: var(--start-size);
    background: var(--background);
    border: var(--border);
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    left: var(--end-x);
    top: var(--end-y);
    width: var(--end-size);
    height: var(--end-size);
    background: var(--background);
    border: var(--border);
  }
}
`;
let styleInjected = false;
function injectStyles(hashId) {
	if (styleInjected) return;
	const styleId = "happy-work-theme-styles";
	if (document.getElementById(styleId)) return;
	const style = document.createElement("style");
	style.id = styleId;
	style.textContent = `
    ${antWaveTargetEffect}
    ${antWaveDotEffect}

    [${TARGET_ATTR}-${hashId}], & [${TARGET_ATTR}-${hashId}] {
      animation-name: antWaveTargetEffect;
      animation-duration: 0.45s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: backwards;
    }

    .happy-wave {
      position: fixed;
      pointer-events: none;
      z-index: 999999;
    }

    .happy-wave-dot {
      box-sizing: border-box;
      position: absolute;
      border-radius: 100%;
      opacity: 0;
      transform: translate3d(-50%, -50%, 0);
      z-index: 999999;
    }

    .happy-wave-dot.happy-in-out-active {
      animation-name: antWaveDotEffect;
      animation-duration: 0.6s;
      animation-timing-function: linear;
      animation-fill-mode: backwards;
    }
  `;
	document.head.appendChild(style);
	styleInjected = true;
}

//#endregion
//#region src/DotEffect/index.vue?vue&type=script&setup=true&lang.ts
const DOT_COUNT = 7;
const DOT_COUNT_LG = 10;
const prefixCls = "happy-wave";
var index_vue_vue_type_script_setup_true_lang_default$1 = /* @__PURE__ */ defineComponent({
	__name: "index",
	props: {
		target: {},
		token: {},
		hashId: {},
		onFinish: { type: Function }
	},
	setup(__props) {
		const props = __props;
		const dotPrefixCls = `${prefixCls}-dot`;
		const dots = ref([]);
		const left = ref(0);
		const top = ref(0);
		const showDots = ref(false);
		const targetAttrName = `${TARGET_ATTR}-${props.hashId}`;
		function inRange(x, y, left, top, right, bottom) {
			return x >= left && x <= right && y >= top && y <= bottom;
		}
		function adjustHue(color, hueDelta) {
			const colorHsv = new FastColor(color).toHsv();
			colorHsv.h = (colorHsv.h + hueDelta) % 360;
			if (colorHsv.h < 0) colorHsv.h += 360;
			return new FastColor(colorHsv).toHexString();
		}
		onMounted(() => {
			injectStyles(props.hashId);
			requestAnimationFrame(() => {
				if (["-dangerous", "-error"].some((skipCls) => props.target.className.includes(skipCls))) {
					props.onFinish();
					return;
				}
				const rect = props.target.getBoundingClientRect();
				const { width, height } = rect;
				left.value = rect.left + width / 2;
				top.value = rect.top + height / 2;
				const minSize = Math.min(width, height);
				const maxSize = Math.max(width, height);
				const halfMinSize = minSize / 2;
				const halfMaxSize = maxSize / 2;
				const halfWidth = width / 2;
				const halfHeight = height / 2;
				const OFFSET_MIN = 15;
				const OFFSET_MAX = 30;
				const halfOffsetMinWidth = halfWidth + OFFSET_MIN;
				const halfOffsetMinHeight = halfHeight + OFFSET_MIN;
				const halfOffsetMaxWidth = halfWidth + OFFSET_MAX;
				const halfOffsetMaxHeight = halfHeight + OFFSET_MAX;
				const dotCount = minSize >= 20 ? DOT_COUNT_LG : DOT_COUNT;
				setTimeout(() => {
					const offsetAngle = Math.random() * 360;
					const { colorPrimary } = props.token;
					const colorPrimaryWeak = adjustHue(colorPrimary, -30);
					dots.value = Array.from({ length: dotCount }).map((_, index) => {
						const randomAngle = offsetAngle + 360 / dotCount * index;
						let startX = 0;
						let startY = 0;
						for (let startDist = halfMinSize - 1; startDist <= halfMaxSize; startDist += 1) {
							const x = Math.cos(randomAngle * Math.PI / 180) * startDist;
							const y = Math.sin(randomAngle * Math.PI / 180) * startDist;
							if (!inRange(x, y, -halfWidth, -halfHeight, halfWidth, halfHeight)) break;
							startX = x;
							startY = y;
						}
						let endX = startX;
						let endY = startY;
						let endDist = halfMinSize;
						const endHalfWidth = Math.random() * (halfOffsetMaxWidth - halfOffsetMinWidth) + halfOffsetMinWidth;
						const endHalfHeight = Math.random() * (halfOffsetMaxHeight - halfOffsetMinHeight) + halfOffsetMinHeight;
						do {
							endX = Math.cos(randomAngle * Math.PI / 180) * endDist;
							endY = Math.sin(randomAngle * Math.PI / 180) * endDist;
							endDist += 1;
						} while (inRange(endX, endY, -endHalfWidth, -endHalfHeight, endHalfWidth, endHalfHeight));
						let size = Math.random() * 3 + 3;
						if (height >= 20) size = Math.random() * 4 + 6;
						return {
							key: index + 1,
							startX: `${startX}px`,
							startY: `${startY}px`,
							endX: `${endX}px`,
							endY: `${endY}px`,
							startSize: `${size}px`,
							endSize: `${Math.random() > .75 ? size : 0}px`,
							type: Math.random() > .6 ? "outlined" : "fill",
							color: Math.random() > .5 ? colorPrimary : colorPrimaryWeak
						};
					});
					showDots.value = true;
					props.target.setAttribute(targetAttrName, "true");
				}, 50);
				setTimeout(() => {
					props.target.removeAttribute(targetAttrName);
					props.onFinish();
				}, 600);
			});
		});
		const dotStyle = computed(() => (dot) => {
			const style = {
				"--start-x": dot.startX,
				"--start-y": dot.startY,
				"--end-x": dot.endX,
				"--end-y": dot.endY,
				"--start-size": dot.startSize,
				"--end-size": dot.endSize
			};
			if (dot.type === "fill") {
				style["--background"] = dot.color;
				style["--border"] = "none";
			} else {
				style["--background"] = "transparent";
				style["--border"] = `1px solid ${dot.color}`;
			}
			return style;
		});
		const dotClass = computed(() => {
			return [dotPrefixCls, "happy-in-out-active"];
		});
		return (_ctx, _cache) => {
			return showDots.value ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass([prefixCls, __props.hashId]),
				style: normalizeStyle({
					left: `${left.value}px`,
					top: `${top.value}px`
				})
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(dots.value, (dot) => {
				return openBlock(), createElementBlock("div", {
					key: dot.key,
					class: normalizeClass(dotClass.value),
					style: normalizeStyle(dotStyle.value(dot))
				}, null, 6);
			}), 128))], 6)) : createCommentVNode("v-if", true);
		};
	}
});

//#endregion
//#region src/DotEffect/index.vue
var DotEffect_default = index_vue_vue_type_script_setup_true_lang_default$1;

//#endregion
//#region src/HappyProvider/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "index",
	props: { enabled: {
		type: Boolean,
		default: false
	} },
	setup(__props, { expose: __expose }) {
		const props = __props;
		provide(Symbol("HAPPY_MODE"), () => props.enabled);
		function showEffect(target, info) {
			const { token, hashId } = info;
			const holder = document.createElement("div");
			holder.style.position = "absolute";
			holder.style.left = "0px";
			holder.style.top = "0px";
			document.body.appendChild(holder);
			const app = createApp({ render() {
				return h(DotEffect_default, {
					target,
					token,
					hashId,
					onFinish: () => {
						app.unmount();
						holder.remove();
					}
				});
			} });
			app.mount(holder);
		}
		const wave = computed(() => {
			return props.enabled ? { showEffect } : void 0;
		});
		__expose({
			showEffect,
			wave
		});
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", { wave: wave.value });
		};
	}
});

//#endregion
//#region src/HappyProvider/index.vue
var HappyProvider_default = index_vue_vue_type_script_setup_true_lang_default;

//#endregion
export { DotEffect_default as DotEffect, HAPPY_MODE_KEY, HappyProvider_default as HappyProvider, TARGET_ATTR, injectStyles, useHappyMode };