import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import SwapOutlinedSvg from "@ant-design/icons-svg/es/asn/SwapOutlined.js";

//#region src/icons/SwapOutlined.tsx
/**![swap](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg0Ny45IDU5MkgxNTJjLTQuNCAwLTggMy42LTggOHY2MGMwIDQuNCAzLjYgOCA4IDhoNjA1LjJMNjEyLjkgODUxYy00LjEgNS4yLS40IDEzIDYuMyAxM2g3Mi41YzQuOSAwIDkuNS0yLjIgMTIuNi02LjFsMTY4LjgtMjE0LjFjMTYuNS0yMSAxLjYtNTEuOC0yNS4yLTUxLjh6TTg3MiAzNTZIMjY2LjhsMTQ0LjMtMTgzYzQuMS01LjIuNC0xMy02LjMtMTNoLTcyLjVjLTQuOSAwLTkuNSAyLjItMTIuNiA2LjFMMTUwLjkgMzgwLjJjLTE2LjUgMjEtMS42IDUxLjggMjUuMSA1MS44aDY5NmM0LjQgMCA4LTMuNiA4LTh2LTYwYzAtNC40LTMuNi04LTgtOHoiIC8+PC9zdmc+) */
const SwapOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": SwapOutlinedSvg }), null);
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
	name: "SwapOutlined"
});

//#endregion
export { SwapOutlined as default };