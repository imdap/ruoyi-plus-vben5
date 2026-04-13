import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import Upload_default from "./Upload.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef } from "vue";

//#region src/upload/Dragger.tsx
const Dragger = /* @__PURE__ */ defineComponent((props, { slots, attrs, expose }) => {
	const uploadRef = shallowRef();
	expose({
		onBatchStart: (...args) => uploadRef.value?.onBatchStart?.(...args),
		onSuccess: (...args) => uploadRef.value?.onSuccess?.(...args),
		onProgress: (...args) => uploadRef.value?.onProgress?.(...args),
		onError: (...args) => uploadRef.value?.onError?.(...args),
		fileList: computed(() => uploadRef.value?.fileList ?? []),
		upload: computed(() => uploadRef.value?.upload ?? null),
		nativeElement: computed(() => uploadRef.value?.nativeElement ?? null)
	});
	return () => {
		const { height, hasControlInside = false, ...restProps } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const mergedStyle = {
			...style,
			height
		};
		return createVNode(Upload_default, mergeProps(restAttrs, restProps, {
			"ref": uploadRef,
			"class": className,
			"style": mergedStyle,
			"hasControlInside": hasControlInside,
			"type": "drag"
		}), { default: () => [slots.default?.()] });
	};
}, {
	props: {
		type: {
			type: String,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		defaultFileList: {
			type: Array,
			required: false
		},
		fileList: {
			type: Array,
			required: false
		},
		action: {
			type: [String, Function],
			required: false
		},
		directory: {
			type: Boolean,
			required: false,
			default: void 0
		},
		data: {
			type: [Object, Function],
			required: false
		},
		method: {
			type: String,
			required: false
		},
		headers: {
			type: Object,
			required: false
		},
		showUploadList: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		accept: {
			type: [String, Object],
			required: false
		},
		beforeUpload: {
			type: Function,
			required: false
		},
		listType: {
			type: String,
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		supportServerRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false
		},
		customRequest: {
			type: Function,
			required: false
		},
		withCredentials: {
			type: Boolean,
			required: false,
			default: void 0
		},
		openFileDialogOnClick: {
			type: Boolean,
			required: false,
			default: void 0
		},
		locale: {
			type: Object,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		previewFile: {
			type: Function,
			required: false
		},
		iconRender: {
			type: Function,
			required: false
		},
		isImageUrl: {
			type: Function,
			required: false
		},
		progress: {
			type: Object,
			required: false
		},
		itemRender: {
			type: Function,
			required: false
		},
		maxCount: {
			type: Number,
			required: false
		},
		onRemove: {
			type: Function,
			required: false
		},
		onPreview: {
			type: Function,
			required: false
		},
		onDownload: {
			type: Function,
			required: false
		},
		capture: {
			type: [String, Boolean],
			required: false,
			default: void 0
		},
		hasControlInside: {
			type: Boolean,
			required: false,
			default: void 0
		},
		pastable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		height: {
			type: Number,
			required: false
		}
	},
	name: "AUploadDragger",
	inheritAttrs: false
});
var Dragger_default = Dragger;

//#endregion
export { Dragger_default as default };