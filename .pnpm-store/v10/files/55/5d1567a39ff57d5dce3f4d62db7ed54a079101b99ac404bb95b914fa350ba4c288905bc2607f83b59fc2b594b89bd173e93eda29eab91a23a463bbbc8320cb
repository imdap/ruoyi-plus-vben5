import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import SwitcherOutlinedSvg from "@ant-design/icons-svg/es/asn/SwitcherOutlined.js";

//#region src/icons/SwitcherOutlined.tsx
/**![switcher](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTc1MiAyNDBIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY2MDhjMCAxNy43IDE0LjMgMzIgMzIgMzJoNjA4YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjI3MmMwLTE3LjctMTQuMy0zMi0zMi0zMnptLTQwIDYwMEgxODRWMzEyaDUyOHY1Mjh6bTE2OC03MjhIMjY0Yy00LjQgMC04IDMuNi04IDh2NTZjMCA0LjQgMy42IDggOCA4aDU3NnY1NzZjMCA0LjQgMy42IDggOCA4aDU2YzQuNCAwIDgtMy42IDgtOFYxNDRjMC0xNy43LTE0LjMtMzItMzItMzJ6TTMwMCA1NTBoMjk2djY0SDMwMHoiIC8+PC9zdmc+) */
const SwitcherOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": SwitcherOutlinedSvg }), null);
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
	name: "SwitcherOutlined"
});

//#endregion
export { SwitcherOutlined as default };