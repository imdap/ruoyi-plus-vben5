Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let _v_c_util_dist_warning = require("@v-c/util/dist/warning");
function useRange(range) {
	if (range === true || !range) return [
		!!range,
		false,
		false,
		0
	];
	const { editable = false, draggableTrack = false, minCount, maxCount } = range;
	if (process.env.NODE_ENV !== "production") (0, _v_c_util_dist_warning.warning)(!editable || !draggableTrack, "`editable` can not work with `draggableTrack`.");
	return [
		true,
		editable,
		!editable && draggableTrack,
		minCount || 0,
		maxCount
	];
}
exports.default = useRange;
