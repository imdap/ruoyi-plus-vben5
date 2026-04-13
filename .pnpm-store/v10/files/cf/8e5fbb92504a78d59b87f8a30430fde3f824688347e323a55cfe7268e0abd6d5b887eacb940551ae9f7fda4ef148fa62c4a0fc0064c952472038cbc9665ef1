var KeyCode = {
	MAC_ENTER: 3,
	BACKSPACE: 8,
	TAB: 9,
	NUM_CENTER: 12,
	ENTER: 13,
	SHIFT: 16,
	CTRL: 17,
	ALT: 18,
	PAUSE: 19,
	CAPS_LOCK: 20,
	ESC: 27,
	SPACE: 32,
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	PRINT_SCREEN: 44,
	INSERT: 45,
	DELETE: 46,
	ZERO: 48,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,
	QUESTION_MARK: 63,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	META: 91,
	WIN_KEY_RIGHT: 92,
	CONTEXT_MENU: 93,
	NUM_ZERO: 96,
	NUM_ONE: 97,
	NUM_TWO: 98,
	NUM_THREE: 99,
	NUM_FOUR: 100,
	NUM_FIVE: 101,
	NUM_SIX: 102,
	NUM_SEVEN: 103,
	NUM_EIGHT: 104,
	NUM_NINE: 105,
	NUM_MULTIPLY: 106,
	NUM_PLUS: 107,
	NUM_MINUS: 109,
	NUM_PERIOD: 110,
	NUM_DIVISION: 111,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	NUMLOCK: 144,
	SEMICOLON: 186,
	DASH: 189,
	EQUALS: 187,
	COMMA: 188,
	PERIOD: 190,
	SLASH: 191,
	APOSTROPHE: 192,
	SINGLE_QUOTE: 222,
	OPEN_SQUARE_BRACKET: 219,
	BACKSLASH: 220,
	CLOSE_SQUARE_BRACKET: 221,
	WIN_KEY: 224,
	MAC_FF_META: 224,
	WIN_IME: 229,
	isTextModifyingKeyEvent: function isTextModifyingKeyEvent(e) {
		const { keyCode } = e;
		if (e.altKey && !e.ctrlKey || e.metaKey || keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) return false;
		switch (keyCode) {
			case KeyCode.ALT:
			case KeyCode.CAPS_LOCK:
			case KeyCode.CONTEXT_MENU:
			case KeyCode.CTRL:
			case KeyCode.DOWN:
			case KeyCode.END:
			case KeyCode.ESC:
			case KeyCode.HOME:
			case KeyCode.INSERT:
			case KeyCode.LEFT:
			case KeyCode.MAC_FF_META:
			case KeyCode.META:
			case KeyCode.NUMLOCK:
			case KeyCode.NUM_CENTER:
			case KeyCode.PAGE_DOWN:
			case KeyCode.PAGE_UP:
			case KeyCode.PAUSE:
			case KeyCode.PRINT_SCREEN:
			case KeyCode.RIGHT:
			case KeyCode.SHIFT:
			case KeyCode.UP:
			case KeyCode.WIN_KEY:
			case KeyCode.WIN_KEY_RIGHT: return false;
			default: return true;
		}
	},
	isCharacterKey: function isCharacterKey(keyCode) {
		if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) return true;
		if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) return true;
		if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) return true;
		if (window.navigator.userAgent.includes("WebKit") && keyCode === 0) return true;
		switch (keyCode) {
			case KeyCode.SPACE:
			case KeyCode.QUESTION_MARK:
			case KeyCode.NUM_PLUS:
			case KeyCode.NUM_MINUS:
			case KeyCode.NUM_PERIOD:
			case KeyCode.NUM_DIVISION:
			case KeyCode.SEMICOLON:
			case KeyCode.DASH:
			case KeyCode.EQUALS:
			case KeyCode.COMMA:
			case KeyCode.PERIOD:
			case KeyCode.SLASH:
			case KeyCode.APOSTROPHE:
			case KeyCode.SINGLE_QUOTE:
			case KeyCode.OPEN_SQUARE_BRACKET:
			case KeyCode.BACKSLASH:
			case KeyCode.CLOSE_SQUARE_BRACKET: return true;
			default: return false;
		}
	}
};
var KeyCode_default = KeyCode;
const KeyCodeStr = {
	Enter: "Enter",
	Backspace: "Backspace",
	Tab: "Tab",
	Space: " ",
	Escape: "Escape",
	Shift: "Shift",
	Control: "Control",
	Alt: "Alt",
	Meta: "Meta",
	ArrowLeft: "ArrowLeft",
	ArrowUp: "ArrowUp",
	ArrowRight: "ArrowRight",
	ArrowDown: "ArrowDown",
	Home: "Home",
	End: "End",
	PageUp: "PageUp",
	PageDown: "PageDown",
	Insert: "Insert",
	Delete: "Delete",
	F1: "F1",
	F2: "F2",
	F3: "F3",
	F4: "F4",
	F5: "F5",
	F6: "F6",
	F7: "F7",
	F8: "F8",
	F9: "F9",
	F10: "F10",
	F11: "F11",
	F12: "F12",
	Digit0: "0",
	Digit1: "1",
	Digit2: "2",
	Digit3: "3",
	Digit4: "4",
	Digit5: "5",
	Digit6: "6",
	Digit7: "7",
	Digit8: "8",
	Digit9: "9",
	KeyA: "a",
	KeyB: "b",
	KeyC: "c",
	KeyD: "d",
	KeyE: "e",
	KeyF: "f",
	KeyG: "g",
	KeyH: "h",
	KeyI: "i",
	KeyJ: "j",
	KeyK: "k",
	KeyL: "l",
	KeyM: "m",
	KeyN: "n",
	KeyO: "o",
	KeyP: "p",
	KeyQ: "q",
	KeyR: "r",
	KeyS: "s",
	KeyT: "t",
	KeyU: "u",
	KeyV: "v",
	KeyW: "w",
	KeyX: "x",
	KeyY: "y",
	KeyZ: "z",
	Semicolon: ";",
	Equal: "=",
	Comma: ",",
	Minus: "-",
	Period: ".",
	Slash: "/",
	Backquote: "`",
	BracketLeft: "[",
	Backslash: "\\",
	BracketRight: "]",
	Quote: "'"
};
export { KeyCodeStr, KeyCode_default as default };
