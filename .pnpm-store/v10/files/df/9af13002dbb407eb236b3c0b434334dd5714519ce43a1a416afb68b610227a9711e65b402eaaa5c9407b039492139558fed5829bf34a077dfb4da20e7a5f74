Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let vue = require("vue");
var DEFAULT_OFFSET = 8;
var DEFAULT_THRESHOLD = 3;
var DEFAULT_GAP = 16;
var useStack = (config) => {
	const result = (0, vue.reactive)({
		offset: DEFAULT_OFFSET,
		threshold: DEFAULT_THRESHOLD,
		gap: DEFAULT_GAP
	});
	(0, vue.watchEffect)(() => {
		const _config = (0, vue.unref)(config);
		if (_config && typeof _config === "object") {
			result.offset = _config.offset ?? DEFAULT_OFFSET;
			result.threshold = _config.threshold ?? DEFAULT_THRESHOLD;
			result.gap = _config.gap ?? DEFAULT_GAP;
		}
	});
	return [(0, vue.computed)(() => !!(0, vue.unref)(config)), (0, vue.toRefs)(result)];
};
var useStack_default = useStack;
exports.default = useStack_default;
