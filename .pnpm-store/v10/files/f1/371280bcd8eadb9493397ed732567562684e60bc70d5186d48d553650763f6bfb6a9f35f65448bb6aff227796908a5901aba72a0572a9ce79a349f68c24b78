Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
var MentionsContextKey = Symbol("MentionsContext");
function useMentionsContext() {
	return (0, vue.inject)(MentionsContextKey, (0, vue.ref)());
}
const MentionsProvider = (0, vue.defineComponent)((props, { slots }) => {
	(0, vue.provide)(MentionsContextKey, (0, vue.computed)(() => props.value));
	return () => {
		return slots?.default?.();
	};
}, {
	name: "MentionsProvider",
	inheritAttrs: false,
	props: ["value"]
});
exports.MentionsProvider = MentionsProvider;
exports.useMentionsContext = useMentionsContext;
