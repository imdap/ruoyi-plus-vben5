import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import InfoOutlinedSvg from "@ant-design/icons-svg/es/asn/InfoOutlined.js";

//#region src/icons/InfoOutlined.tsx
/**![info](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ0OCAyMjRhNjQgNjQgMCAxMDEyOCAwIDY0IDY0IDAgMTAtMTI4IDB6bTk2IDE2OGgtNjRjLTQuNCAwLTggMy42LTggOHY0NjRjMCA0LjQgMy42IDggOCA4aDY0YzQuNCAwIDgtMy42IDgtOFY0MDBjMC00LjQtMy42LTgtOC04eiIgLz48L3N2Zz4=) */
const InfoOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": InfoOutlinedSvg }), null);
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
	name: "InfoOutlined"
});

//#endregion
export { InfoOutlined as default };