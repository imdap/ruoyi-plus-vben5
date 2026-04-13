import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import PauseOutlinedSvg from "@ant-design/icons-svg/es/asn/PauseOutlined.js";

//#region src/icons/PauseOutlined.tsx
/**![pause](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMwNCAxNzZoODB2NjcyaC04MHptNDA4IDBoLTY0Yy00LjQgMC04IDMuNi04IDh2NjU2YzAgNC40IDMuNiA4IDggOGg2NGM0LjQgMCA4LTMuNiA4LThWMTg0YzAtNC40LTMuNi04LTgtOHoiIC8+PC9zdmc+) */
const PauseOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": PauseOutlinedSvg }), null);
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
	name: "PauseOutlined"
});

//#endregion
export { PauseOutlined as default };