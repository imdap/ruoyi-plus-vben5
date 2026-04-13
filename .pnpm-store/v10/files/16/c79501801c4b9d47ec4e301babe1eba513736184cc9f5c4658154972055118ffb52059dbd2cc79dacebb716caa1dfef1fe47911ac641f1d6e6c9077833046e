import { toValue } from "vue";
function unrefElement(elRef) {
	const plain = toValue(elRef);
	return plain?.$el ?? plain;
}
export { unrefElement };
