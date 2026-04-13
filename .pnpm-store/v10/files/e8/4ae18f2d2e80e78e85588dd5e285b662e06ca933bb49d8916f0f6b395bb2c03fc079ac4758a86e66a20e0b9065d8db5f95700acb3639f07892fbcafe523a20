var warned = {};
var preWarningFns = [];
function preMessage(fn) {
	preWarningFns.push(fn);
}
function warning(valid, message) {
	if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
		const finalMessage = preWarningFns.reduce((msg, preMessageFn) => preMessageFn(msg ?? "", "warning"), message);
		if (finalMessage) console.error(`Warning: ${finalMessage}`);
	}
}
function note(valid, message) {
	if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
		const finalMessage = preWarningFns.reduce((msg, preMessageFn) => preMessageFn(msg ?? "", "note"), message);
		if (finalMessage) console.warn(`Note: ${finalMessage}`);
	}
}
function resetWarned() {
	warned = {};
}
function call(method, valid, message) {
	if (!valid && !warned[message]) {
		method(false, message);
		warned[message] = true;
	}
}
function warningOnce(valid, message) {
	call(warning, valid, message);
}
function noteOnce(valid, message) {
	call(note, valid, message);
}
warningOnce.preMessage = preMessage;
warningOnce.resetWarned = resetWarned;
warningOnce.noteOnce = noteOnce;
var warning_default = warningOnce;
export { call, warning_default as default, note, noteOnce, preMessage, resetWarned, warning, warningOnce };
