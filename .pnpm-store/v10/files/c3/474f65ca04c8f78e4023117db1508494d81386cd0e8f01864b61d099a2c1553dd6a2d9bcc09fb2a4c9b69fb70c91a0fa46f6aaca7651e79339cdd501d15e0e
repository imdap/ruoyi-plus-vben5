import { SEARCH_MARK } from "../hooks/useSearchOptions.js";
import { getFullPathKeys, toPathKey } from "../utils/commonUtil.js";
import KeyCode from "@v-c/util/dist/KeyCode";
function useKeyboard(options, fieldNames, activeValueCells, setActiveValueCells, onKeyBoardSelect, contextProps) {
	const getActiveStatus = () => {
		let activeIndex = -1;
		let currentOptions = options.value;
		const mergedActiveIndexes = [];
		const mergedActiveValueCells = [];
		const len = activeValueCells.value.length;
		const pathKeys = getFullPathKeys(options.value, fieldNames.value);
		for (let i = 0; i < len && currentOptions; i += 1) {
			const nextActiveIndex = currentOptions.findIndex((option, index) => (pathKeys[index] ? toPathKey(pathKeys[index]) : option[fieldNames.value.value]) === activeValueCells.value[i]);
			if (nextActiveIndex === -1) break;
			activeIndex = nextActiveIndex;
			mergedActiveIndexes.push(activeIndex);
			mergedActiveValueCells.push(activeValueCells.value[i]);
			currentOptions = currentOptions[activeIndex]?.[fieldNames.value.children];
		}
		let activeOptions = options.value;
		for (let i = 0; i < mergedActiveIndexes.length - 1; i += 1) activeOptions = activeOptions[mergedActiveIndexes[i]]?.[fieldNames.value.children] || [];
		return {
			validActiveValueCells: mergedActiveValueCells,
			lastActiveIndex: activeIndex,
			lastActiveOptions: activeOptions,
			fullPathKeys: pathKeys
		};
	};
	const internalSetActiveValueCells = (next) => {
		setActiveValueCells(next);
	};
	const offsetActiveOption = (offset) => {
		const { lastActiveOptions, lastActiveIndex, fullPathKeys, validActiveValueCells } = getActiveStatus();
		const len = lastActiveOptions.length;
		let currentIndex = lastActiveIndex;
		if (currentIndex === -1 && offset < 0) currentIndex = len;
		for (let i = 0; i < len; i += 1) {
			currentIndex = (currentIndex + offset + len) % len;
			const option = lastActiveOptions[currentIndex];
			if (option && !option.disabled) {
				internalSetActiveValueCells(validActiveValueCells.slice(0, -1).concat(fullPathKeys[currentIndex] ? toPathKey(fullPathKeys[currentIndex]) : option[fieldNames.value.value]));
				return;
			}
		}
	};
	const prevColumn = () => {
		const { validActiveValueCells } = getActiveStatus();
		if (validActiveValueCells.length > 1) internalSetActiveValueCells(validActiveValueCells.slice(0, -1));
		else contextProps.toggleOpen(false);
	};
	const nextColumn = () => {
		const { lastActiveOptions, lastActiveIndex, validActiveValueCells } = getActiveStatus();
		const nextOption = (lastActiveOptions[lastActiveIndex]?.[fieldNames.value.children] || []).find((option) => !option.disabled);
		if (nextOption) internalSetActiveValueCells([...validActiveValueCells, nextOption[fieldNames.value.value]]);
	};
	return {
		scrollTo: () => {},
		onKeyDown: (event) => {
			const { which } = event;
			const rtl = contextProps.direction.value === "rtl";
			const searchValue = contextProps.searchValue.value;
			const open = contextProps.open.value;
			switch (which) {
				case KeyCode.UP:
				case KeyCode.DOWN: {
					let offset = 0;
					if (which === KeyCode.UP) offset = -1;
					else if (which === KeyCode.DOWN) offset = 1;
					if (offset !== 0) offsetActiveOption(offset);
					break;
				}
				case KeyCode.LEFT:
					if (searchValue) break;
					if (rtl) nextColumn();
					else prevColumn();
					break;
				case KeyCode.RIGHT:
					if (searchValue) break;
					if (rtl) prevColumn();
					else nextColumn();
					break;
				case KeyCode.BACKSPACE:
					if (!searchValue) prevColumn();
					break;
				case KeyCode.ENTER: {
					const { validActiveValueCells, lastActiveOptions, lastActiveIndex } = getActiveStatus();
					if (validActiveValueCells.length) {
						const originOptions = lastActiveOptions[lastActiveIndex]?.["__vc_cascader_search_mark__"] || [];
						if (originOptions.length) onKeyBoardSelect(originOptions.map((opt) => opt[fieldNames.value.value]), originOptions[originOptions.length - 1]);
						else onKeyBoardSelect(validActiveValueCells, lastActiveOptions[lastActiveIndex]);
					}
					break;
				}
				case KeyCode.ESC:
					contextProps.toggleOpen(false);
					if (open) event.stopPropagation();
			}
		},
		onKeyUp: () => {}
	};
}
export { useKeyboard as default };
