function addEventListener(...args) {
	const [target, eventType, cb, option] = args;
	if (target?.addEventListener) target.addEventListener(eventType, cb, option);
	return { remove() {
		target?.removeEventListener?.(eventType, cb, option);
	} };
}
export { addEventListener };
