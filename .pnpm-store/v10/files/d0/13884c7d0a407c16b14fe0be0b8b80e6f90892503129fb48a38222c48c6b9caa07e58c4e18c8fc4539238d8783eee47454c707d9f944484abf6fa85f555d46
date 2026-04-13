import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import DownOutlinedSvg from "@ant-design/icons-svg/es/asn/DownOutlined.js";

//#region src/icons/DownOutlined.tsx
/**![down](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4NCAyNTZoLTc1Yy01LjEgMC05LjkgMi41LTEyLjkgNi42TDUxMiA2NTQuMiAyMjcuOSAyNjIuNmMtMy00LjEtNy44LTYuNi0xMi45LTYuNmgtNzVjLTYuNSAwLTEwLjMgNy40LTYuNSAxMi43bDM1Mi42IDQ4Ni4xYzEyLjggMTcuNiAzOSAxNy42IDUxLjcgMGwzNTIuNi00ODYuMWMzLjktNS4zLjEtMTIuNy02LjQtMTIuN3oiIC8+PC9zdmc+) */
const DownOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": DownOutlinedSvg }), null);
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
	name: "DownOutlined"
});

//#endregion
export { DownOutlined as default };