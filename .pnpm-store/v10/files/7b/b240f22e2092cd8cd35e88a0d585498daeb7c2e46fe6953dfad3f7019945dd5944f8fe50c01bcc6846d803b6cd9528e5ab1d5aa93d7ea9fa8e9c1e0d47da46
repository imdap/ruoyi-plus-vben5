import { getActiveElement } from "./getActiveElement.js";

//#region src/shared/trap-focus.ts
function trapFocus(element) {
	if (element) {
		const focusableEls = [...Array.from(element.querySelectorAll("a[href], button, input, textarea, select, details,[tabindex]:not([tabindex=\"-1\"])"))].filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
		const firstFocusableEl = focusableEls[0];
		const lastFocusableEl = focusableEls.at(-1);
		const KEYCODE_TAB = 9;
		if (firstFocusableEl) firstFocusableEl.focus();
		element.addEventListener("keydown", (e) => {
			const isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;
			if (!isTabPressed) return;
			if (e.shiftKey) {
				if (getActiveElement() === firstFocusableEl) {
					lastFocusableEl.focus();
					e.preventDefault();
				}
			} else if (getActiveElement() === lastFocusableEl) {
				firstFocusableEl.focus();
				e.preventDefault();
			}
		});
		return firstFocusableEl;
	}
}

//#endregion
export { trapFocus };
//# sourceMappingURL=trap-focus.js.map