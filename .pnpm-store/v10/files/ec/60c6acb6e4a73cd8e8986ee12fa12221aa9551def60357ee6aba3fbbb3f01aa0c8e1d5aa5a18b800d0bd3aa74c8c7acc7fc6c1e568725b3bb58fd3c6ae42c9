import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import FilterFilledSvg from "@ant-design/icons-svg/es/asn/FilterFilled.js";

//#region src/icons/FilterFilled.tsx
/**![filter](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM0OSA4MzhjMCAxNy43IDE0LjIgMzIgMzEuOCAzMmgyNjIuNGMxNy42IDAgMzEuOC0xNC4zIDMxLjgtMzJWNjQySDM0OXYxOTZ6bTUzMS4xLTY4NEgxNDMuOWMtMjQuNSAwLTM5LjggMjYuNy0yNy41IDQ4bDIyMS4zIDM3NmgzNDguOGwyMjEuMy0zNzZjMTIuMS0yMS4zLTMuMi00OC0yNy43LTQ4eiIgLz48L3N2Zz4=) */
const FilterFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": FilterFilledSvg }), null);
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
	name: "FilterFilled"
});

//#endregion
export { FilterFilled as default };