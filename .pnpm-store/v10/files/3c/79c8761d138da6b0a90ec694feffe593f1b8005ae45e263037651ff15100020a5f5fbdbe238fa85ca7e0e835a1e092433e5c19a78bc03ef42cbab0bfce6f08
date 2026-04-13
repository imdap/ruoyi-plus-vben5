import { warning as warning$1 } from "@v-c/util/dist/warning";
function useRange(range) {
	if (range === true || !range) return [
		!!range,
		false,
		false,
		0
	];
	const { editable = false, draggableTrack = false, minCount, maxCount } = range;
	if (process.env.NODE_ENV !== "production") warning$1(!editable || !draggableTrack, "`editable` can not work with `draggableTrack`.");
	return [
		true,
		editable,
		!editable && draggableTrack,
		minCount || 0,
		maxCount
	];
}
export { useRange as default };
