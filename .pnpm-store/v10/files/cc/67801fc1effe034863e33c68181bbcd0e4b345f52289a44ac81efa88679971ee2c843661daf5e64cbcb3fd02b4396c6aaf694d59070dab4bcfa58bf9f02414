Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_AjaxUploader = require("./AjaxUploader.cjs");
let vue = require("vue");
function empty() {}
var defaults = {
	component: "span",
	prefixCls: "vc-upload",
	data: {},
	headers: {},
	name: "file",
	onStart: empty,
	onError: empty,
	onSuccess: empty,
	multiple: false,
	beforeUpload: void 0,
	customRequest: void 0,
	withCredentials: false,
	openFileDialogOnClick: true,
	hasControlInside: false
};
var Upload = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs, expose, slots }) => {
	const uploaderRef = (0, vue.ref)();
	const abort = (file) => {
		uploaderRef.value?.abort(file);
	};
	expose({ abort });
	const mergedProps = (0, vue.computed)(() => ({
		...defaults,
		...props
	}));
	return () => (0, vue.createVNode)(require_AjaxUploader.default, (0, vue.mergeProps)({ "ref": uploaderRef }, mergedProps.value, attrs), { default: () => [slots.default?.()] });
}, {
	props: /* @__PURE__ */ (0, vue.mergeDefaults)({
		name: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		component: {
			type: [
				Object,
				Function,
				String
			],
			required: false,
			default: void 0
		},
		action: {
			type: [String, Function],
			required: false,
			default: void 0
		},
		method: {
			type: String,
			required: false,
			default: void 0
		},
		directory: {
			type: Boolean,
			required: false,
			default: void 0
		},
		data: {
			type: [Object, Function],
			required: false,
			default: void 0
		},
		headers: {
			type: Object,
			required: false,
			default: void 0
		},
		accept: {
			type: [String, Object],
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onBatchStart: {
			type: Function,
			required: false,
			default: void 0
		},
		onStart: {
			type: Function,
			required: false,
			default: void 0
		},
		onError: {
			type: Function,
			required: false,
			default: void 0
		},
		onSuccess: {
			type: Function,
			required: false,
			default: void 0
		},
		onProgress: {
			type: Function,
			required: false,
			default: void 0
		},
		beforeUpload: {
			type: Function,
			required: false,
			default: void 0
		},
		customRequest: {
			type: Function,
			required: false,
			default: void 0
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
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: false,
			default: void 0
		},
		onMouseEnter: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseLeave: {
			type: Function,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
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
		}
	}, defaults),
	name: "Upload"
});
var Upload_default = Upload;
exports.default = Upload_default;
