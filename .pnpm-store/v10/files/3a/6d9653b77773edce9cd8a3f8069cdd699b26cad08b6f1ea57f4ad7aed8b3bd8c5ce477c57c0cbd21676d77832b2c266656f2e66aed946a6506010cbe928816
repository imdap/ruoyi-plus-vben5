//#region src/layout/hooks/useHasSider.ts
function useHasSider(siders, children, hasSider) {
	if (typeof hasSider === "boolean") return hasSider;
	if (siders.length) return true;
	return (Array.isArray(children) ? children : [children]).some((node) => node?.type?.name === "ALayoutSider");
}

//#endregion
export { useHasSider as default };