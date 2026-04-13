import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import EnterOutlinedSvg from "@ant-design/icons-svg/es/asn/EnterOutlined.js";

//#region src/icons/EnterOutlined.tsx
/**![enter](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2NCAxNzBoLTYwYy00LjQgMC04IDMuNi04IDh2NTE4SDMxMHYtNzNjMC02LjctNy44LTEwLjUtMTMtNi4zbC0xNDEuOSAxMTJhOCA4IDAgMDAwIDEyLjZsMTQxLjkgMTEyYzUuMyA0LjIgMTMgLjQgMTMtNi4zdi03NWg0OThjMzUuMyAwIDY0LTI4LjcgNjQtNjRWMTc4YzAtNC40LTMuNi04LTgtOHoiIC8+PC9zdmc+) */
const EnterOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": EnterOutlinedSvg }), null);
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
	name: "EnterOutlined"
});

//#endregion
export { EnterOutlined as default };