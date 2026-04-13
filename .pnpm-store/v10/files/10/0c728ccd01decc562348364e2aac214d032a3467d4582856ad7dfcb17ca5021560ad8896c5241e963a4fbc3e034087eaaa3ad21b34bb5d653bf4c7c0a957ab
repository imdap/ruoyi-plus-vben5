import { useComponentBaseConfig } from "../../config-provider/context.js";
import { getAttrStyleAndClass } from "../../_util/hooks/useMergeSemantic.js";
import tooltip_default from "../../tooltip/index.js";
import progress_default from "../../progress/index.js";
import { Transition, computed, createVNode, defineComponent, isVNode, mergeProps, onBeforeUnmount, onMounted, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { DeleteOutlined, DownloadOutlined, EyeOutlined } from "@antdv-next/icons";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";

//#region src/upload/UploadList/ListItem.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ListItem = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const mergedStatus = shallowRef(props.file.status);
	watch(() => props.file.status, (status) => {
		if (status !== "removed") mergedStatus.value = status;
	});
	const showProgress = shallowRef(false);
	let progressTimer = null;
	onMounted(() => {
		progressTimer = setTimeout(() => {
			showProgress.value = true;
		}, 300);
	});
	onBeforeUnmount(() => {
		if (progressTimer) {
			clearTimeout(progressTimer);
			progressTimer = null;
		}
	});
	const { rootPrefixCls } = useComponentBaseConfig("upload");
	const listType = computed(() => props.listType ?? "text");
	return () => {
		const { prefixCls, file, items, classes, styles, locale, isImgUrl, showPreviewIcon, showRemoveIcon, showDownloadIcon, previewIcon: customPreviewIcon, removeIcon: customRemoveIcon, downloadIcon: customDownloadIcon, extra: customExtra, iconRender, actionIconRender, itemRender, onPreview, onDownload, onClose, progress: progressProps } = props;
		const iconNode = iconRender(file);
		let icon = createVNode("div", { "class": `${prefixCls}-icon` }, [iconNode]);
		if (listType.value.startsWith("picture")) if (mergedStatus.value === "uploading" || !file.thumbUrl && !file.url) {
			const uploadingClassName = clsx(`${prefixCls}-list-item-thumbnail`, { [`${prefixCls}-list-item-file`]: mergedStatus.value !== "uploading" });
			icon = createVNode("div", { "class": uploadingClassName }, [iconNode]);
		} else {
			const isImage = isImgUrl?.(file);
			const thumbnail = isImage ? createVNode("img", {
				"src": file.thumbUrl || file.url,
				"alt": file.name,
				"class": `${prefixCls}-list-item-image`,
				"crossorigin": file.crossorigin
			}, null) : iconNode;
			const aClassName = clsx(`${prefixCls}-list-item-thumbnail`, { [`${prefixCls}-list-item-file`]: isImgUrl && !isImage });
			icon = createVNode("a", {
				"class": aClassName,
				"onClick": (e) => onPreview(file, e),
				"href": file.url || file.thumbUrl,
				"target": "_blank",
				"rel": "noopener noreferrer"
			}, [thumbnail]);
		}
		const listItemClassName = clsx(`${prefixCls}-list-item`, `${prefixCls}-list-item-${mergedStatus.value}`, classes?.item);
		let linkProps = file.linkProps;
		if (typeof linkProps === "string") try {
			linkProps = JSON.parse(linkProps);
		} catch {
			linkProps = {};
		}
		const removeIcon = (typeof showRemoveIcon === "function" ? showRemoveIcon(file) : showRemoveIcon) ? actionIconRender((typeof customRemoveIcon === "function" ? customRemoveIcon(file) : customRemoveIcon) || createVNode(DeleteOutlined, null, null), () => onClose(file), prefixCls, locale.removeFile, true) : null;
		const downloadIcon = (typeof showDownloadIcon === "function" ? showDownloadIcon(file) : showDownloadIcon) && mergedStatus.value === "done" ? actionIconRender((typeof customDownloadIcon === "function" ? customDownloadIcon(file) : customDownloadIcon) || createVNode(DownloadOutlined, null, null), () => onDownload(file), prefixCls, locale.downloadFile) : null;
		const downloadOrDelete = listType.value !== "picture-card" && listType.value !== "picture-circle" && createVNode("span", {
			"key": "download-delete",
			"class": clsx(`${prefixCls}-list-item-actions`, { picture: listType.value === "picture" })
		}, [downloadIcon, removeIcon]);
		const extraContent = typeof customExtra === "function" ? customExtra(file) : customExtra;
		const extra = extraContent && createVNode("span", { "class": `${prefixCls}-list-item-extra` }, [extraContent]);
		const listItemNameClass = clsx(`${prefixCls}-list-item-name`);
		const fileName = file.url ? createVNode("a", mergeProps({
			"key": "view",
			"target": "_blank",
			"rel": "noopener noreferrer",
			"class": listItemNameClass,
			"title": file.name
		}, linkProps, {
			"href": file.url,
			"onClick": (e) => onPreview(file, e)
		}), [file.name, extra]) : createVNode("span", {
			"key": "view",
			"class": listItemNameClass,
			"onClick": (e) => onPreview(file, e),
			"title": file.name
		}, [file.name, extra]);
		const previewIcon = (typeof showPreviewIcon === "function" ? showPreviewIcon(file) : showPreviewIcon) && (file.url || file.thumbUrl) ? createVNode("a", {
			"href": file.url || file.thumbUrl,
			"target": "_blank",
			"rel": "noopener noreferrer",
			"onClick": (e) => onPreview(file, e),
			"title": locale.previewFile
		}, [typeof customPreviewIcon === "function" ? customPreviewIcon(file) : customPreviewIcon || createVNode(EyeOutlined, null, null)]) : null;
		const pictureCardActions = (listType.value === "picture-card" || listType.value === "picture-circle") && mergedStatus.value !== "uploading" && createVNode("span", { "class": `${prefixCls}-list-item-actions` }, [
			previewIcon,
			mergedStatus.value === "done" && downloadIcon,
			removeIcon
		]);
		const dom = createVNode("div", {
			"class": listItemClassName,
			"style": styles?.item
		}, [
			icon,
			fileName,
			downloadOrDelete,
			pictureCardActions,
			showProgress.value && createVNode(Transition, mergeProps(getTransitionProps(`${rootPrefixCls.value}-fade`), { "appear": true }), { default: () => [mergedStatus.value === "uploading" ? createVNode("div", { "class": `${prefixCls}-list-item-progress` }, ["percent" in file ? createVNode(progress_default, mergeProps({
				"type": "line",
				"percent": file.percent,
				"aria-label": file["aria-label"],
				"aria-labelledby": file["aria-labelledby"]
			}, progressProps), null) : null]) : null] })
		]);
		const message = typeof file.response === "string" ? file.response : file.error?.statusText || file.error?.message || locale.uploadError;
		const item = mergedStatus.value === "error" ? createVNode(tooltip_default, {
			"title": message,
			"getPopupContainer": (node) => node.parentNode
		}, _isSlot(dom) ? dom : { default: () => [dom] }) : dom;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		return createVNode("div", mergeProps(restAttrs, {
			"class": clsx(`${prefixCls}-list-item-container`, className),
			"style": style
		}), [itemRender ? itemRender(item, file, items, {
			download: () => onDownload(file),
			preview: () => onPreview(file),
			remove: () => onClose(file)
		}) : item]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		classes: {
			type: Object,
			required: false
		},
		styles: {
			type: Object,
			required: false
		},
		locale: {
			type: Object,
			required: true
		},
		file: {
			type: Object,
			required: true
		},
		items: {
			type: Array,
			required: true
		},
		listType: {
			type: String,
			required: false
		},
		isImgUrl: {
			type: Function,
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
			type: Function,
			required: false,
			skipCheck: true
		},
		downloadIcon: {
			type: Function,
			required: false,
			skipCheck: true
		},
		previewIcon: {
			type: Function,
			required: false,
			skipCheck: true
		},
		extra: {
			type: Function,
			required: false,
			skipCheck: true
		},
		iconRender: {
			type: Function,
			required: true
		},
		actionIconRender: {
			type: Function,
			required: true
		},
		itemRender: {
			type: Function,
			required: false
		},
		onPreview: {
			type: Function,
			required: true
		},
		onClose: {
			type: Function,
			required: true
		},
		onDownload: {
			type: Function,
			required: true
		},
		progress: {
			type: Object,
			required: false
		}
	},
	name: "UploadListItem",
	inheritAttrs: false
});
var ListItem_default = ListItem;

//#endregion
export { ListItem_default as default };