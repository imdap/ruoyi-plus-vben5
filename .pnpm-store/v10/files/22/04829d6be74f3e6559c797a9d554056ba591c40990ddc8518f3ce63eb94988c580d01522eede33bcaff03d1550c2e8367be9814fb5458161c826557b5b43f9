import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import UploadOutlinedSvg from "@ant-design/icons-svg/es/asn/UploadOutlined.js";

//#region src/icons/UploadOutlined.tsx
/**![upload](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQwMCAzMTcuN2g3My45VjY1NmMwIDQuNCAzLjYgOCA4IDhoNjBjNC40IDAgOC0zLjYgOC04VjMxNy43SDYyNGM2LjcgMCAxMC40LTcuNyA2LjMtMTIuOUw1MTguMyAxNjNhOCA4IDAgMDAtMTIuNiAwbC0xMTIgMTQxLjdjLTQuMSA1LjMtLjQgMTMgNi4zIDEzek04NzggNjI2aC02MGMtNC40IDAtOCAzLjYtOCA4djE1NEgyMTRWNjM0YzAtNC40LTMuNi04LTgtOGgtNjBjLTQuNCAwLTggMy42LTggOHYxOThjMCAxNy43IDE0LjMgMzIgMzIgMzJoNjg0YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjYzNGMwLTQuNC0zLjYtOC04LTh6IiAvPjwvc3ZnPg==) */
const UploadOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": UploadOutlinedSvg }), null);
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
	name: "UploadOutlined"
});

//#endregion
export { UploadOutlined as default };