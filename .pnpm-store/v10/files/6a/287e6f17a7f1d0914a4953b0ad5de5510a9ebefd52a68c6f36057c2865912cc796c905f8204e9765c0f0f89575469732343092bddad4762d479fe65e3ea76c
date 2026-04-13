import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import ShoppingFilledSvg from "@ant-design/icons-svg/es/asn/ShoppingFilled.js";

//#region src/icons/ShoppingFilled.tsx
/**![shopping](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTgzMiAzMTJINjk2di0xNmMwLTEwMS42LTgyLjQtMTg0LTE4NC0xODRzLTE4NCA4Mi40LTE4NCAxODR2MTZIMTkyYy0xNy43IDAtMzIgMTQuMy0zMiAzMnY1MzZjMCAxNy43IDE0LjMgMzIgMzIgMzJoNjQwYzE3LjcgMCAzMi0xNC4zIDMyLTMyVjM0NGMwLTE3LjctMTQuMy0zMi0zMi0zMnptLTIwOCAwSDQwMHYtMTZjMC02MS45IDUwLjEtMTEyIDExMi0xMTJzMTEyIDUwLjEgMTEyIDExMnYxNnoiIC8+PC9zdmc+) */
const ShoppingFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": ShoppingFilledSvg }), null);
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
	name: "ShoppingFilled"
});

//#endregion
export { ShoppingFilled as default };