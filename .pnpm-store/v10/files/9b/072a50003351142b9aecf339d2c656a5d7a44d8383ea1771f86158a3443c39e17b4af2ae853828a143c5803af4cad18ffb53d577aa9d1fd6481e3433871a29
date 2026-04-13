function createRef() {
	const func = (node) => {
		func.current = node;
	};
	return func;
}
function fillRef(ref, node) {
	if (typeof ref === "function") ref(node);
	else if (typeof ref === "object" && ref && "current" in ref) ref.current = node;
}
function composeRef(...refs) {
	return (node) => {
		refs.forEach((ref) => {
			fillRef(ref, node);
		});
	};
}
var createRef_default = createRef;
export { composeRef, createRef_default as default, fillRef };
