var NO_EXIST = { __NOT_EXIST: true };
function spyElementPrototypes(elementClass, properties) {
	const propNames = Object.keys(properties);
	const originDescriptors = {};
	propNames.forEach((propName) => {
		const originDescriptor = Object.getOwnPropertyDescriptor(elementClass.prototype, propName);
		originDescriptors[propName] = originDescriptor || NO_EXIST;
		const spyProp = properties[propName];
		if (typeof spyProp === "function") elementClass.prototype[propName] = function spyFunc(...args) {
			return spyProp.call(this, originDescriptor, ...args);
		};
		else Object.defineProperty(elementClass.prototype, propName, {
			...spyProp,
			set(value) {
				if (spyProp.set) return spyProp.set.call(this, originDescriptor, value);
				return originDescriptor.set(value);
			},
			get() {
				if (spyProp.get) return spyProp.get.call(this, originDescriptor);
				return originDescriptor.get();
			},
			configurable: true
		});
	});
	return { mockRestore() {
		propNames.forEach((propName) => {
			const originDescriptor = originDescriptors[propName];
			if (originDescriptor === NO_EXIST) delete elementClass.prototype[propName];
			else if (typeof originDescriptor === "function") elementClass.prototype[propName] = originDescriptor;
			else Object.defineProperty(elementClass.prototype, propName, originDescriptor);
		});
	} };
}
function spyElementPrototype(Element, propName, property) {
	return spyElementPrototypes(Element, { [propName]: property });
}
export { spyElementPrototype, spyElementPrototypes };
