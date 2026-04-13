import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import ToolFilledSvg from "@ant-design/icons-svg/es/asn/ToolFilled.js";

//#region src/icons/ToolFilled.tsx
/**![tool](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2NS4zIDI0NC43Yy0uMy0uMy02MS4xIDU5LjgtMTgyLjEgMTgwLjZsLTg0LjktODQuOSAxODAuOS0xODAuOWMtOTUuMi01Ny4zLTIxNy41LTQyLjYtMjk2LjggMzYuN0EyNDQuNDIgMjQ0LjQyIDAgMDA0MTkgNDMybDEuOCA2LjctMjgzLjUgMjgzLjRjLTYuMiA2LjItNi4yIDE2LjQgMCAyMi42bDE0MS40IDE0MS40YzYuMiA2LjIgMTYuNCA2LjIgMjIuNiAwbDI4My4zLTI4My4zIDYuNyAxLjhjODMuNyAyMi4zIDE3My42LS45IDIzNi02My4zIDc5LjQtNzkuMyA5NC4xLTIwMS42IDM4LTI5Ni42eiIgLz48L3N2Zz4=) */
const ToolFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": ToolFilledSvg }), null);
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
	name: "ToolFilled"
});

//#endregion
export { ToolFilled as default };