Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_attrAccept = require("./attrAccept.cjs");
const require_request = require("./request.cjs");
const require_traverseFileTree = require("./traverseFileTree.cjs");
const require_uid = require("./uid.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_pickAttrs = require("@v-c/util/dist/pickAttrs");
_v_c_util_dist_pickAttrs = require_rolldown_runtime.__toESM(_v_c_util_dist_pickAttrs);
function noop() {}
var AjaxUploader = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs, expose, slots }) => {
	const uid$1 = (0, vue.ref)(require_uid.default());
	let _isMounted = false;
	const reqs = {};
	const fileInputRef = (0, vue.ref)();
	const cls = (0, vue.computed)(() => {
		const { prefixCls, disabled, className } = props;
		return (0, _v_c_util.clsx)({
			[prefixCls]: true,
			[`${prefixCls}-disabled`]: disabled,
			[className]: className
		});
	});
	const filterFile = (file, force = false) => {
		const { accept, directory } = props;
		let filterFn;
		let acceptFormat;
		if (typeof accept === "string") acceptFormat = accept;
		else {
			const { filter, format } = accept || {};
			acceptFormat = format;
			if (filter === "native") filterFn = () => true;
			else filterFn = filter;
		}
		return (filterFn || (directory || force ? (currentFile) => require_attrAccept.default(currentFile, acceptFormat) : () => true))(file);
	};
	const onClick = (event) => {
		if (!fileInputRef.value) return;
		const target = event.target;
		if (target && target.tagName === "BUTTON") {
			fileInputRef.value.parentNode.focus();
			target.blur();
		}
		fileInputRef.value.click();
		if (props.onClick) props.onClick(event);
	};
	const onKeyDown = (e) => {
		if (e.key === "Enter") onClick(e);
	};
	const post = ({ data, origin, action, parsedFile }) => {
		if (!_isMounted) return;
		const { onStart, customRequest, name, headers, withCredentials, method } = props;
		const { uid: uid$2 } = origin;
		const request = customRequest || require_request.default;
		const requestOption = {
			action,
			filename: name,
			data,
			file: parsedFile,
			headers,
			withCredentials,
			method: method || "post",
			onProgress: (e) => {
				const { onProgress } = props;
				onProgress?.(e, parsedFile);
			},
			onSuccess: (ret, xhr) => {
				const { onSuccess } = props;
				onSuccess?.(ret, parsedFile, xhr);
				delete reqs[uid$2];
			},
			onError: (err, ret) => {
				const { onError } = props;
				onError?.(err, ret, parsedFile);
				delete reqs[uid$2];
			}
		};
		onStart?.(origin);
		reqs[uid$2] = request(requestOption, { defaultRequest: require_request.default });
	};
	const processFile = async (file, fileList) => {
		const { beforeUpload } = props;
		let transformedFile = file;
		if (beforeUpload) {
			try {
				transformedFile = await beforeUpload(file, fileList);
			} catch (e) {
				transformedFile = false;
			}
			if (transformedFile === false) return {
				origin: file,
				parsedFile: null,
				action: null,
				data: null
			};
		}
		const { action } = props;
		let mergedAction;
		if (typeof action === "function") mergedAction = await action(file);
		else mergedAction = action;
		const { data } = props;
		let mergedData;
		if (typeof data === "function") mergedData = await data(file);
		else mergedData = data;
		const parsedData = (typeof transformedFile === "object" || typeof transformedFile === "string") && transformedFile ? transformedFile : file;
		let parsedFile;
		if (parsedData instanceof File) parsedFile = parsedData;
		else parsedFile = new File([parsedData], file.name, { type: file.type });
		const mergedParsedFile = parsedFile;
		mergedParsedFile.uid = file.uid;
		return {
			origin: file,
			data: mergedData,
			parsedFile: mergedParsedFile,
			action: mergedAction
		};
	};
	const uploadFiles = (files) => {
		const originFiles = [...files];
		const postFiles = originFiles.map((file) => {
			file.uid = require_uid.default();
			return processFile(file, originFiles);
		});
		Promise.all(postFiles).then((fileList) => {
			const { onBatchStart } = props;
			onBatchStart?.(fileList.map(({ origin, parsedFile }) => ({
				file: origin,
				parsedFile
			})));
			fileList.filter((file) => file.parsedFile !== null).forEach((file) => {
				post(file);
			});
		});
	};
	const onDataTransferFiles = async (dataTransfer, existFileCallback) => {
		if (!dataTransfer) return;
		const { multiple, directory } = props;
		const items = [...dataTransfer.items || []];
		let files = [...dataTransfer.files || []];
		if (files.length > 0 || items.some((item) => item.kind === "file")) existFileCallback?.();
		if (directory) {
			files = await require_traverseFileTree.default(Array.prototype.slice.call(items), (currentFile) => filterFile(currentFile));
			uploadFiles(files);
		} else {
			let acceptFiles = [...files].filter((file) => filterFile(file, true));
			if (multiple === false) acceptFiles = files.slice(0, 1);
			uploadFiles(acceptFiles);
		}
	};
	const onFileDrop = (e) => {
		e.preventDefault();
		if (e.type === "drop") {
			const dataTransfer = e.dataTransfer;
			return onDataTransferFiles(dataTransfer);
		}
	};
	const onFileDragOver = (e) => {
		e.preventDefault();
	};
	const reset = () => {
		uid$1.value = require_uid.default();
	};
	const onChange = (e) => {
		const { files } = e.target;
		uploadFiles([...files || []].filter((file) => filterFile(file)));
		reset();
	};
	const dirProps = (0, vue.computed)(() => {
		return props.directory ? {
			directory: "directory",
			webkitdirectory: "webkitdirectory"
		} : {};
	});
	const abort = (file) => {
		if (file) {
			const uid$2 = file.uid ? file.uid : file;
			if (reqs[uid$2] && reqs[uid$2].abort) reqs[uid$2].abort();
			delete reqs[uid$2];
		} else Object.keys(reqs).forEach((uid$2) => {
			if (reqs[uid$2] && reqs[uid$2].abort) reqs[uid$2].abort();
			delete reqs[uid$2];
		});
	};
	const events = (0, vue.computed)(() => {
		return props.disabled ? {} : {
			onClick: props.openFileDialogOnClick ? onClick : noop,
			onKeyDown: props.openFileDialogOnClick ? onKeyDown : noop,
			onMouseEnter: props.onMouseEnter,
			onMouseLeave: props.onMouseLeave,
			onDrop: onFileDrop,
			onDragover: onFileDragOver,
			tabIndex: props.hasControlInside ? void 0 : "0"
		};
	});
	const onFilePaste = async (e) => {
		const { pastable } = props;
		if (!pastable) return;
		if (e.type === "paste") {
			const clipboardData = e.clipboardData;
			return onDataTransferFiles(clipboardData, () => {
				e.preventDefault();
			});
		}
	};
	let prevPastable;
	(0, vue.onMounted)(() => {
		_isMounted = true;
		if (props.pastable) document.addEventListener("paste", onFilePaste);
		prevPastable = props.pastable;
	});
	(0, vue.onUpdated)(() => {
		const pastable = props.pastable;
		if (pastable && !prevPastable) document.addEventListener("paste", onFilePaste);
		else if (!pastable && prevPastable) document.removeEventListener("paste", onFilePaste);
		prevPastable = pastable;
	});
	(0, vue.onUnmounted)(() => {
		_isMounted = false;
		abort();
		document.removeEventListener("paste", onFilePaste);
	});
	expose({ abort });
	return () => {
		const { component, prefixCls, className, classNames = {}, disabled, id, name, style, styles = {}, multiple, accept, capture, directory, openFileDialogOnClick, onMouseEnter, onMouseLeave, hasControlInside, ...otherProps } = {
			...props,
			...attrs
		};
		const acceptFormat = typeof accept === "string" ? accept : accept?.format;
		return (0, vue.createVNode)(component, (0, vue.mergeProps)({ "class": cls.value }, events.value, {
			"role": hasControlInside ? void 0 : "button",
			"style": style
		}), { default: () => [(0, vue.createVNode)("input", (0, vue.mergeProps)((0, _v_c_util_dist_pickAttrs.default)(otherProps, {
			aria: true,
			data: true
		}), {
			"id": id,
			"name": name,
			"disabled": disabled,
			"type": "file",
			"ref": fileInputRef,
			"onClick": (e) => e.stopPropagation(),
			"key": uid$1.value,
			"style": {
				display: "none",
				...styles.input
			},
			"class": classNames.input
		}, dirProps.value, {
			"multiple": multiple,
			"accept": acceptFormat,
			"onChange": onChange
		}, capture != null ? { capture } : {}), null), slots.default?.()] });
	};
}, { props: {
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
} });
var AjaxUploader_default = AjaxUploader;
exports.default = AjaxUploader_default;
