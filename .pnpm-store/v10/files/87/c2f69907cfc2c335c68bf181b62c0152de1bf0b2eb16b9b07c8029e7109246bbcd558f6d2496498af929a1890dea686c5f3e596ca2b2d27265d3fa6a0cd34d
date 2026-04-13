import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import TabletFilledSvg from "@ant-design/icons-svg/es/asn/TabletFilled.js";

//#region src/icons/TabletFilled.tsx
/**![tablet](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTgwMCA2NEgyMjRjLTM1LjMgMC02NCAyOC43LTY0IDY0djc2OGMwIDM1LjMgMjguNyA2NCA2NCA2NGg1NzZjMzUuMyAwIDY0LTI4LjcgNjQtNjRWMTI4YzAtMzUuMy0yOC43LTY0LTY0LTY0ek01MTIgODI0Yy0yMi4xIDAtNDAtMTcuOS00MC00MHMxNy45LTQwIDQwLTQwIDQwIDE3LjkgNDAgNDAtMTcuOSA0MC00MCA0MHoiIC8+PC9zdmc+) */
const TabletFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": TabletFilledSvg }), null);
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
	name: "TabletFilled"
});

//#endregion
export { TabletFilled as default };