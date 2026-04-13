import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import CameraFilledSvg from "@ant-design/icons-svg/es/asn/CameraFilled.js";

//#region src/icons/CameraFilled.tsx
/**![camera](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2NCAyNjBINzI4bC0zMi40LTkwLjhhMzIuMDcgMzIuMDcgMCAwMC0zMC4yLTIxLjJIMzU4LjZjLTEzLjUgMC0yNS42IDguNS0zMC4xIDIxLjJMMjk2IDI2MEgxNjBjLTQ0LjIgMC04MCAzNS44LTgwIDgwdjQ1NmMwIDQ0LjIgMzUuOCA4MCA4MCA4MGg3MDRjNDQuMiAwIDgwLTM1LjggODAtODBWMzQwYzAtNDQuMi0zNS44LTgwLTgwLTgwek01MTIgNzE2Yy04OC40IDAtMTYwLTcxLjYtMTYwLTE2MHM3MS42LTE2MCAxNjAtMTYwIDE2MCA3MS42IDE2MCAxNjAtNzEuNiAxNjAtMTYwIDE2MHptLTk2LTE2MGE5NiA5NiAwIDEwMTkyIDAgOTYgOTYgMCAxMC0xOTIgMHoiIC8+PC9zdmc+) */
const CameraFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": CameraFilledSvg }), null);
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
	name: "CameraFilled"
});

//#endregion
export { CameraFilled as default };