function checkSlotProp(props, slots, name, ...args) {
	if (slots[name]) return slots[name]?.(...args);
	if (name in props) {
		if (typeof props[name] === "function") return props[name]?.(...args);
		return props[name];
	}
	return null;
}
export { checkSlotProp };
