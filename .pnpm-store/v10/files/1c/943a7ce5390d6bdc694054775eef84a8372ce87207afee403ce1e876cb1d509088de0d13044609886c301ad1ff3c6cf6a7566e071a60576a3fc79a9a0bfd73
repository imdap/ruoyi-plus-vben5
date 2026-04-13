import { inject, provide, ref } from "vue";
var PickerContextKey = Symbol("PickerContext");
function providePickerContext(context) {
	provide(PickerContextKey, context);
}
function usePickerContext() {
	return inject(PickerContextKey, ref({}));
}
export { providePickerContext, usePickerContext };
