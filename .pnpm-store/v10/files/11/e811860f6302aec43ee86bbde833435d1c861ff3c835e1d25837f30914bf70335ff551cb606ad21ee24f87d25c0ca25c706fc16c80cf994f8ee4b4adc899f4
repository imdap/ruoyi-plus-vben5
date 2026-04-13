function getRoot(ele) {
	return ele?.getRootNode?.();
}
function inShadow(ele) {
	return getRoot(ele) instanceof ShadowRoot;
}
function getShadowRoot(ele) {
	return inShadow(ele) ? getRoot(ele) : null;
}
export { getShadowRoot, inShadow };
