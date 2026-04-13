import { computed, reactive, toRefs, unref, watchEffect } from "vue";
var DEFAULT_OFFSET = 8;
var DEFAULT_THRESHOLD = 3;
var DEFAULT_GAP = 16;
var useStack = (config) => {
	const result = reactive({
		offset: DEFAULT_OFFSET,
		threshold: DEFAULT_THRESHOLD,
		gap: DEFAULT_GAP
	});
	watchEffect(() => {
		const _config = unref(config);
		if (_config && typeof _config === "object") {
			result.offset = _config.offset ?? DEFAULT_OFFSET;
			result.threshold = _config.threshold ?? DEFAULT_THRESHOLD;
			result.gap = _config.gap ?? DEFAULT_GAP;
		}
	});
	return [computed(() => !!unref(config)), toRefs(result)];
};
var useStack_default = useStack;
export { useStack_default as default };
