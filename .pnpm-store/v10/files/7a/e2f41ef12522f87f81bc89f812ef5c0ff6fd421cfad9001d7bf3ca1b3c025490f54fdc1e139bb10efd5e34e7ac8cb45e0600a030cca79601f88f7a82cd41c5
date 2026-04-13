import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import CaretRightOutlinedSvg from "@ant-design/icons-svg/es/asn/CaretRightOutlined.js";

//#region src/icons/CaretRightOutlined.tsx
/**![caret-right](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcxNS44IDQ5My41TDMzNSAxNjUuMWMtMTQuMi0xMi4yLTM1LTEuMi0zNSAxOC41djY1Ni44YzAgMTkuNyAyMC44IDMwLjcgMzUgMTguNWwzODAuOC0zMjguNGMxMC45LTkuNCAxMC45LTI3LjYgMC0zN3oiIC8+PC9zdmc+) */
const CaretRightOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": CaretRightOutlinedSvg }), null);
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
	name: "CaretRightOutlined"
});

//#endregion
export { CaretRightOutlined as default };