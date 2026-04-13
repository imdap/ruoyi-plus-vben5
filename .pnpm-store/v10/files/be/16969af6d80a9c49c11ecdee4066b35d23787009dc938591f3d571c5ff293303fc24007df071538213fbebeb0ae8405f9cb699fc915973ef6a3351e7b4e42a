import { useConfig } from "../../config-provider/context.js";
import useToken from "../../theme/useToken.js";
import { TARGET_CLS } from "./interface.js";
import WaveEffect_default from "./WaveEffect.js";
import { onBeforeUnmount, ref, unref } from "vue";
import raf from "@v-c/util/dist/raf";

//#region src/_util/wave/useWave.ts
function useWave(nodeRef, className, component, colorSource) {
	const configCtx = useConfig();
	const [, token, hashId] = useToken();
	const showWave = (event) => {
		const node = nodeRef.value;
		if (!node) return;
		const waveConfig = configCtx.value.wave;
		if (waveConfig?.disabled) return;
		const targetNode = node.querySelector(`.${TARGET_CLS}`) || node;
		const { showEffect } = waveConfig ?? {};
		(showEffect || WaveEffect_default)(targetNode, {
			className: unref(className),
			token: token.value,
			component: unref(component) ?? void 0,
			event,
			hashId: hashId.value,
			colorSource: colorSource ? unref(colorSource) : void 0
		});
	};
	const rafId = ref();
	const showDebounceWave = (event) => {
		if (rafId.value !== void 0) raf.cancel(rafId.value);
		rafId.value = raf(() => {
			showWave(event);
		});
	};
	onBeforeUnmount(() => {
		if (rafId.value !== void 0) raf.cancel(rafId.value);
	});
	return showDebounceWave;
}

//#endregion
export { useWave as default };