import { defineComponent, inject, provide, shallowRef } from "vue";
const CollectionContext = Symbol("CollectionContext");
const Collection = /* @__PURE__ */ defineComponent({
	props: { onBatchResize: {
		type: Function,
		required: false,
		default: void 0
	} },
	setup(props, { slots }) {
		const resizeIdRef = shallowRef(0);
		const resizeInfosRef = shallowRef([]);
		const onCollectionResize = inject(CollectionContext, () => {});
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
		provide(CollectionContext, onResize);
		return () => {
			return slots.default?.();
		};
	}
});
export { Collection, CollectionContext };
