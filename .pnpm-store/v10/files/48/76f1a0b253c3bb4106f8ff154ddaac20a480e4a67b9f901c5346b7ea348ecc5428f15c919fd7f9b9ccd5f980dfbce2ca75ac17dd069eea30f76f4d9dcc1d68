import { inject, provide } from "vue";
var FocusBoundaryContextKey = Symbol("FocusBoundaryContext");
function useFocusBoundaryProvider(props) {
	provide(FocusBoundaryContextKey, props);
}
function useFocusBoundary() {
	return inject(FocusBoundaryContextKey, null);
}
export { useFocusBoundary, useFocusBoundaryProvider };
