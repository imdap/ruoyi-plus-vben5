import { computed, defineComponent, inject, provide, ref } from "vue";
var MentionsContextKey = Symbol("MentionsContext");
function useMentionsContext() {
	return inject(MentionsContextKey, ref());
}
const MentionsProvider = defineComponent((props, { slots }) => {
	provide(MentionsContextKey, computed(() => props.value));
	return () => {
		return slots?.default?.();
	};
}, {
	name: "MentionsProvider",
	inheritAttrs: false,
	props: ["value"]
});
export { MentionsProvider, useMentionsContext };
