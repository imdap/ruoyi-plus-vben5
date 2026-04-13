import { resolveStyleOrClass } from "../../_util/hooks/useMergeSemantic.js";
import button_default from "../../button/index.js";
import { isImageUrl, previewImage } from "../utils.js";
import ListItem_default from "./ListItem.js";
import { TransitionGroup, cloneVNode, computed, createVNode, defineComponent, getCurrentInstance, isVNode, mergeDefaults, mergeProps, onMounted, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { FileTwoTone, LoadingOutlined, PaperClipOutlined, PictureTwoTone } from "@antdv-next/icons";
import { getTransitionGroupProps } from "@v-c/util/dist/utils/transition";

//#region src/upload/UploadList/index.tsx
const APPEND_ACTION_KEY = "__upload_append_action__";
const UploadList = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const forceUpdate = shallowRef(0);
	const motionAppear = shallowRef(false);
	const instance = getCurrentInstance();
	const hasPreviewListener = computed(() => !!instance?.vnode.props?.onPreview);
	onMounted(() => {
		motionAppear.value = true;
	});
	const listType = computed(() => props.listType ?? "text");
	const isPictureCardOrCircle = computed(() => ["picture-card", "picture-circle"].includes(listType.value));
	const isPictureType = computed(() => listType.value.startsWith("picture"));
	const prefixCls = computed(() => props.prefixCls ?? "ant-upload");
	const mergedPreviewFile = computed(() => props.previewFile ?? previewImage);
	const mergedIsImageUrl = computed(() => props.isImageUrl ?? isImageUrl);
	const resolvedClasses = computed(() => {
		if (!props.classes) return {};
		return resolveStyleOrClass(props.classes, { props });
	});
	const resolvedStyles = computed(() => {
		if (!props.styles) return {};
		return resolveStyleOrClass(props.styles, { props });
	});
	watch([
		isPictureType,
		() => props.items,
		mergedPreviewFile
	], () => {
		if (!isPictureType.value) return;
		(props.items || []).forEach((file) => {
			if (!(file.originFileObj instanceof File || file.originFileObj instanceof Blob) || file.thumbUrl !== void 0) return;
			file.thumbUrl = "";
			mergedPreviewFile.value?.(file.originFileObj).then((previewDataUrl) => {
				file.thumbUrl = previewDataUrl || "";
				forceUpdate.value += 1;
			});
		});
	}, { immediate: true });
	const onInternalPreview = (file, e) => {
		if (!hasPreviewListener.value) return;
		e?.preventDefault?.();
		props?.onPreview?.(file);
	};
	const onInternalDownload = (file) => {
		props?.onDownload?.(file);
	};
	const onInternalClose = (file) => {
		props.onRemove?.(file);
	};
	const internalIconRender = (file) => {
		if (slots.iconRender) return slots.iconRender({
			file,
			listType: listType.value
		});
		if (props.iconRender) return props.iconRender(file, listType.value);
		const isLoading = file.status === "uploading";
		if (listType.value.startsWith("picture")) {
			const loadingIcon = listType.value === "picture" ? createVNode(LoadingOutlined, null, null) : props.locale?.uploading;
			const fileIcon = mergedIsImageUrl.value?.(file) ? createVNode(PictureTwoTone, null, null) : createVNode(FileTwoTone, null, null);
			return isLoading ? loadingIcon : fileIcon;
		}
		return isLoading ? createVNode(LoadingOutlined, null, null) : createVNode(PaperClipOutlined, null, null);
	};
	const actionIconRender = (customIcon, callback, actionPrefixCls, title, acceptUploadDisabled) => {
		const mergedDisabled = acceptUploadDisabled ? props.disabled : false;
		const handleClick = (e) => {
			callback();
			if (customIcon?.props?.onClick) customIcon.props.onClick(e);
		};
		if (isVNode(customIcon)) return createVNode(button_default, mergeProps({
			"type": "text",
			"size": "small"
		}, { title }, {
			"class": `${actionPrefixCls}-list-item-action`,
			"disabled": mergedDisabled,
			"onClick": handleClick,
			"icon": cloneVNode(customIcon, { onClick: void 0 })
		}), null);
		return createVNode(button_default, mergeProps({
			"type": "text",
			"size": "small"
		}, { title }, {
			"class": `${actionPrefixCls}-list-item-action`,
			"disabled": mergedDisabled,
			"onClick": handleClick
		}), { default: () => [createVNode("span", null, [customIcon])] });
	};
	return () => {
		const items = props.items ?? [];
		const listClassNames = clsx(`${prefixCls.value}-list`, `${prefixCls.value}-list-${listType.value}`, resolvedClasses.value?.list);
		const transitionGroupProps = {
			...getTransitionGroupProps(`${prefixCls.value}-${isPictureCardOrCircle.value ? "animate-inline" : "animate"}`),
			appear: motionAppear.value
		};
		let appendAction = null;
		if (props.appendAction && props.appendActionVisible) appendAction = isVNode(props.appendAction) ? cloneVNode(props.appendAction, { key: APPEND_ACTION_KEY }) : props.appendAction;
		const itemRender = slots.itemRender ? (originNode, file, fileList, actions) => slots.itemRender?.({
			originNode,
			file,
			fileList,
			actions
		}) : props.itemRender;
		const removeIcon = slots.removeIcon ? (file) => slots.removeIcon?.({ file }) : props.removeIcon;
		const downloadIcon = slots.downloadIcon ? (file) => slots.downloadIcon?.({ file }) : props.downloadIcon;
		const previewIcon = slots.previewIcon ? (file) => slots.previewIcon?.({ file }) : props.previewIcon;
		return createVNode(TransitionGroup, mergeProps(transitionGroupProps, { "tag": "div" }, {
			class: listClassNames,
			style: resolvedStyles.value?.list
		}), { default: () => [items.map((file) => createVNode(ListItem_default, {
			"key": file.uid,
			"locale": props.locale,
			"prefixCls": prefixCls.value,
			"classes": resolvedClasses.value,
			"styles": resolvedStyles.value,
			"file": file,
			"items": items,
			"progress": props.progress,
			"listType": listType.value,
			"isImgUrl": mergedIsImageUrl.value,
			"showPreviewIcon": props.showPreviewIcon,
			"showRemoveIcon": props.showRemoveIcon,
			"showDownloadIcon": props.showDownloadIcon,
			"removeIcon": removeIcon,
			"previewIcon": previewIcon,
			"downloadIcon": downloadIcon,
			"extra": props.extra,
			"iconRender": internalIconRender,
			"actionIconRender": actionIconRender,
			"itemRender": itemRender,
			"onPreview": onInternalPreview,
			"onDownload": onInternalDownload,
			"onClose": onInternalClose
		}, null)), appendAction] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		listType: {
			type: String,
			required: false
		},
		items: {
			type: Array,
			required: false
		},
		progress: {
			type: Object,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		showRemoveIcon: {
			type: [Boolean, Function],
			required: false,
			default: void 0
		},
		showDownloadIcon: {
			type: [Boolean, Function],
			required: false,
			default: void 0
		},
		showPreviewIcon: {
			type: [Boolean, Function],
			required: false,
			default: void 0
		},
		removeIcon: {
			type: [
				Object,
				String,
				Number,
				Boolean,
				null,
				Array,
				Function
			],
			required: false,
			default: void 0
		},
		downloadIcon: {
			type: [
				Object,
				String,
				Number,
				Boolean,
				null,
				Array,
				Function
			],
			required: false,
			default: void 0
		},
		previewIcon: {
			type: [
				Object,
				String,
				Number,
				Boolean,
				null,
				Array,
				Function
			],
			required: false,
			default: void 0
		},
		extra: {
			type: [
				Object,
				String,
				Number,
				Boolean,
				null,
				Array,
				Function
			],
			required: false,
			default: void 0
		},
		locale: {
			type: Object,
			required: true
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
		appendAction: { required: false },
		appendActionVisible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		itemRender: {
			type: Function,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
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
		}
	}, {
		listType: "text",
		items: [],
		locale: {},
		showPreviewIcon: true,
		showRemoveIcon: true,
		showDownloadIcon: false,
		progress: {
			size: [-1, 2],
			showInfo: false
		},
		appendActionVisible: true
	}),
	name: "UploadList"
});
var UploadList_default = UploadList;

//#endregion
export { UploadList_default as default };