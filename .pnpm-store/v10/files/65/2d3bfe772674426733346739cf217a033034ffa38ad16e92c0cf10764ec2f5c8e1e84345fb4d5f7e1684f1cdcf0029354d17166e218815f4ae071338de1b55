import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import WarningOutlinedSvg from "@ant-design/icons-svg/es/asn/WarningOutlined.js";

//#region src/icons/WarningOutlined.tsx
/**![warning](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ2NCA3MjBhNDggNDggMCAxMDk2IDAgNDggNDggMCAxMC05NiAwem0xNi0zMDR2MTg0YzAgNC40IDMuNiA4IDggOGg0OGM0LjQgMCA4LTMuNiA4LThWNDE2YzAtNC40LTMuNi04LTgtOGgtNDhjLTQuNCAwLTggMy42LTggOHptNDc1LjcgNDQwbC00MTYtNzIwYy02LjItMTAuNy0xNi45LTE2LTI3LjctMTZzLTIxLjYgNS4zLTI3LjcgMTZsLTQxNiA3MjBDNTYgODc3LjQgNzEuNCA5MDQgOTYgOTA0aDgzMmMyNC42IDAgNDAtMjYuNiAyNy43LTQ4em0tNzgzLjUtMjcuOUw1MTIgMjM5LjlsMzM5LjggNTg4LjJIMTcyLjJ6IiAvPjwvc3ZnPg==) */
const WarningOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": WarningOutlinedSvg }), null);
	};
}, {
	props: {
		twoToneColor: {
			type: [String, Array],
			required: false
		},
		onClick: {
			type: Function,
			required: false
		},
		tabIndex: {
			type: Number,
			required: false
		},
		spin: {
			type: Boolean,
			required: false
		},
		rotate: {
			type: Number,
			required: false
		}
	},
	name: "WarningOutlined"
});

//#endregion
export { WarningOutlined as default };