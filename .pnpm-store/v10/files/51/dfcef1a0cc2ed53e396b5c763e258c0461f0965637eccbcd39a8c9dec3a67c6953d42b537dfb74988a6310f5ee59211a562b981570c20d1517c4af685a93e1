import { ref } from "vue";
import warning from "@v-c/util/dist/warning";
function useCursor(input, focused) {
	const selectionRef = ref(null);
	function recordCursor() {
		try {
			const { selectionStart: start, selectionEnd: end, value } = input;
			selectionRef.value = {
				start,
				end,
				value,
				beforeTxt: value.substring(0, start),
				afterTxt: value.substring(end)
			};
		} catch (e) {}
	}
	function restoreCursor() {
		if (input && selectionRef.value && focused) try {
			const { value } = input;
			const { beforeTxt, afterTxt, start } = selectionRef.value;
			let startPos = value.length;
			if (beforeTxt && value.startsWith(beforeTxt)) startPos = beforeTxt.length;
			else if (afterTxt && value.endsWith(afterTxt)) startPos = value.length - selectionRef.value.afterTxt.length;
			else {
				const beforeLastChar = beforeTxt[start - 1];
				const newIndex = value.indexOf(beforeLastChar, start - 1);
				if (newIndex !== -1) startPos = newIndex + 1;
			}
			input.setSelectionRange(startPos, startPos);
		} catch (e) {
			warning(false, `Something warning of cursor restore. Please fire issue about this: ${e.message}`);
		}
	}
	return [recordCursor, restoreCursor];
}
export { useCursor as default };
