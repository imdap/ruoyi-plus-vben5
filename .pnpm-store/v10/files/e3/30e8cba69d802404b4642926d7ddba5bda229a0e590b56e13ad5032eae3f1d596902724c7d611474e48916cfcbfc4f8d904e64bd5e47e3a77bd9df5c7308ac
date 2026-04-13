const require_shared_getActiveElement = require('./getActiveElement.cjs');

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
				if (require_shared_getActiveElement.getActiveElement() === firstFocusableEl) {
					lastFocusableEl.focus();
					e.preventDefault();
				}
			} else if (require_shared_getActiveElement.getActiveElement() === lastFocusableEl) {
				firstFocusableEl.focus();
				e.preventDefault();
			}
		});
		return firstFocusableEl;
	}
}

//#endregion
Object.defineProperty(exports, 'trapFocus', {
  enumerable: true,
  get: function () {
    return trapFocus;
  }
});
//# sourceMappingURL=trap-focus.cjs.map