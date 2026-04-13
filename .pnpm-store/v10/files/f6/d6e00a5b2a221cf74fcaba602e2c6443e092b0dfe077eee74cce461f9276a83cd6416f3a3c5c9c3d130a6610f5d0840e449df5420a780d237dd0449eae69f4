import destroyFns_default from "../destroyFns.js";
import { withConfirm, withError, withInfo, withSuccess, withWarn } from "../confirm.js";
import { usePatchElement } from "../../_util/hooks/usePatchElement.js";
import HookModal_default from "./HookModal.js";
import { Fragment, createVNode, defineComponent, shallowRef, watch } from "vue";

//#region src/modal/useModal/index.tsx
let uuid = 0;
const ElementsHolder = /* @__PURE__ */ defineComponent((_, { expose }) => {
	const [elements, patchElement] = usePatchElement();
	expose({ patchElement });
	return () => {
		return createVNode(Fragment, null, [elements.value]);
	};
}, {
	name: "ElementsHolder",
	inheritAttrs: false
});
function useModal() {
	const holderRef = shallowRef();
	const actionQueue = shallowRef([]);
	watch(actionQueue, () => {
		if (actionQueue.value.length) {
			[...actionQueue.value].forEach((action) => action());
			actionQueue.value = [];
		}
	}, { immediate: true });
	const getConfirmFunc = (withFunc) => function hookConfirm(config) {
		uuid += 1;
		const modalRef = shallowRef();
		let resolvePromise;
		const promise = new Promise((resolve) => {
			resolvePromise = resolve;
		});
		let silent = false;
		let closePatch;
		function closeFunc() {
			closePatch?.();
			const index = destroyFns_default.indexOf(closeFunc);
			if (index !== -1) destroyFns_default.splice(index, 1);
		}
		const modal = createVNode(/* @__PURE__ */ defineComponent({
			name: "ModalWrapper",
			setup() {
				return () => createVNode(HookModal_default, {
					"config": withFunc(config),
					"ref": modalRef,
					"afterClose": () => {
						closeFunc();
					},
					"isSilent": () => silent,
					"onConfirm": (confirmed) => {
						resolvePromise(confirmed);
					}
				}, null);
			}
		}), { "key": `modal-${uuid}` }, null);
		closePatch = holderRef.value?.patchElement(modal);
		if (closePatch) destroyFns_default.push(closeFunc);
		return {
			destroy: () => {
				const destroyAction = () => modalRef.value?.destroy();
				if (modalRef.value) destroyAction();
				else actionQueue.value = [...actionQueue.value, destroyAction];
			},
			update: (newConfig) => {
				const updateAction = () => modalRef.value?.update(newConfig);
				if (modalRef.value) updateAction();
				else actionQueue.value = [...actionQueue.value, updateAction];
			},
			then: (resolve) => {
				silent = true;
				return promise.then(resolve);
			}
		};
	};
	return [{
		info: getConfirmFunc(withInfo),
		success: getConfirmFunc(withSuccess),
		error: getConfirmFunc(withError),
		warning: getConfirmFunc(withWarn),
		confirm: getConfirmFunc(withConfirm)
	}, /* @__PURE__ */ defineComponent(() => {
		return () => {
			return createVNode(ElementsHolder, {
				"key": "modal-holder",
				"ref": holderRef
			}, null);
		};
	}, {
		name: "ContextHolder",
		inheritAttrs: false
	})];
}

//#endregion
export { useModal as default };