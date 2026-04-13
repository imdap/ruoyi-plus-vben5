Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
var UnstableContextKey = Symbol("UnstableContext");
function useUnstableContext() {
	return (0, vue.inject)(UnstableContextKey, { railFollowPrevStatus: (0, vue.ref)() });
}
function useUnstableProvider(value) {
	(0, vue.provide)(UnstableContextKey, value);
}
exports.useUnstableContext = useUnstableContext;
exports.useUnstableProvider = useUnstableProvider;
