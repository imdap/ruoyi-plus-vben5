import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import SmallDashOutlinedSvg from "@ant-design/icons-svg/es/asn/SmallDashOutlined.js";

//#region src/icons/SmallDashOutlined.tsx
/**![small-dash](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExMiA0NzZoNzJ2NzJoLTcyem0xODIgMGg3MnY3MmgtNzJ6bTM2NCAwaDcydjcyaC03MnptMTgyIDBoNzJ2NzJoLTcyem0tMzY0IDBoNzJ2NzJoLTcyeiIgLz48L3N2Zz4=) */
const SmallDashOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": SmallDashOutlinedSvg }), null);
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
	name: "SmallDashOutlined"
});

//#endregion
export { SmallDashOutlined as default };