import { inject, provide, ref } from "vue";
var StepsContext = Symbol("StepsContext");
function useStepsContext() {
	return inject(StepsContext, ref(null));
}
function useStepsProvider(props) {
	provide(StepsContext, props);
}
export { useStepsContext, useStepsProvider };
