import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import FlagFilledSvg from "@ant-design/icons-svg/es/asn/FlagFilled.js";

//#region src/icons/FlagFilled.tsx
/**![flag](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAzMDVINjI0VjE5MmMwLTE3LjctMTQuMy0zMi0zMi0zMkgxODR2LTQwYzAtNC40LTMuNi04LTgtOGgtNTZjLTQuNCAwLTggMy42LTggOHY3ODRjMCA0LjQgMy42IDggOCA4aDU2YzQuNCAwIDgtMy42IDgtOFY2NDBoMjQ4djExM2MwIDE3LjcgMTQuMyAzMiAzMiAzMmg0MTZjMTcuNyAwIDMyLTE0LjMgMzItMzJWMzM3YzAtMTcuNy0xNC4zLTMyLTMyLTMyeiIgLz48L3N2Zz4=) */
const FlagFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": FlagFilledSvg }), null);
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
	name: "FlagFilled"
});

//#endregion
export { FlagFilled as default };