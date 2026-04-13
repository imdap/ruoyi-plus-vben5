import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import CloudFilledSvg from "@ant-design/icons-svg/es/asn/CloudFilled.js";

//#region src/icons/CloudFilled.tsx
/**![cloud](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTgxMS40IDQxOC43Qzc2NS42IDI5Ny45IDY0OC45IDIxMiA1MTIuMiAyMTJTMjU4LjggMjk3LjggMjEzIDQxOC42QzEyNy4zIDQ0MS4xIDY0IDUxOS4xIDY0IDYxMmMwIDExMC41IDg5LjUgMjAwIDE5OS45IDIwMGg0OTYuMkM4NzAuNSA4MTIgOTYwIDcyMi41IDk2MCA2MTJjMC05Mi43LTYzLjEtMTcwLjctMTQ4LjYtMTkzLjN6IiAvPjwvc3ZnPg==) */
const CloudFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": CloudFilledSvg }), null);
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
	name: "CloudFilled"
});

//#endregion
export { CloudFilled as default };