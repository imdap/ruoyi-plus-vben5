Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
const CollectionContext = Symbol("CollectionContext");
const Collection = /* @__PURE__ */ (0, vue.defineComponent)({
	props: { onBatchResize: {
		type: Function,
		required: false,
		default: void 0
	} },
	setup(props, { slots }) {
		const resizeIdRef = (0, vue.shallowRef)(0);
		const resizeInfosRef = (0, vue.shallowRef)([]);
		const onCollectionResize = (0, vue.inject)(CollectionContext, () => {});
		const onResize = (size, element, data) => {
			const resizeId = resizeIdRef.value + 1;
			resizeIdRef.value = resizeId;
			resizeInfosRef.value.push({
				size,
				element,
				data
			});
			Promise.resolve().then(() => {
				if (resizeIdRef.value === resizeId) {
					const resizeInfos = resizeInfosRef.value;
					resizeInfosRef.value = [];
					props.onBatchResize?.(resizeInfos);
				}
			});
			onCollectionResize?.(size, element, data);
		};
		(0, vue.provide)(CollectionContext, onResize);
		return () => {
			return slots.default?.();
		};
	}
});
exports.Collection = Collection;
exports.CollectionContext = CollectionContext;
