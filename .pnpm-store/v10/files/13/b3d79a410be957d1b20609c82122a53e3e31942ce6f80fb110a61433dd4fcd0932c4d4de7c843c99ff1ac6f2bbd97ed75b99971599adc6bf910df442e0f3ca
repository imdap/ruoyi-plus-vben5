import { matchScreen } from "../../_util/responsiveObserver.js";
import { computed } from "vue";

//#region src/descriptions/hooks/useItems.ts
function useItems(screens, items) {
	return computed(() => {
		return items.value.map(({ span, ...restItem }, index) => {
			if (span === "filled") return {
				...restItem,
				filled: true,
				_$index: index
			};
			return {
				_$index: index,
				...restItem,
				span: typeof span === "number" ? span : matchScreen(screens.value, span)
			};
		});
	});
}

//#endregion
export { useItems as default };