import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import MoonFilledSvg from "@ant-design/icons-svg/es/asn/MoonFilled.js";

//#region src/icons/MoonFilled.tsx
/**![moon](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDg5LjUgMTExLjY2YzMwLjY1LTEuOCA0NS45OCAzNi40NCAyMi41OCA1Ni4zM0EyNDMuMzUgMjQzLjM1IDAgMDA0MjYgMzU0YzAgMTM0Ljc2IDEwOS4yNCAyNDQgMjQ0IDI0NCA3Mi41OCAwIDEzOS45LTMxLjgzIDE4Ni4wMS04Ni4wOCAxOS44Ny0yMy4zOCA1OC4wNy04LjEgNTYuMzQgMjIuNTNDOTAwLjQgNzQ1LjgyIDcyNS4xNSA5MTIgNTEyLjUgOTEyIDI5MS4zMSA5MTIgMTEyIDczMi42OSAxMTIgNTExLjVjMC0yMTEuMzkgMTY0LjI5LTM4Ni4wMiAzNzQuMi0zOTkuNjVsLjItLjAxeiIgLz48L3N2Zz4=) */
const MoonFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": MoonFilledSvg }), null);
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
	name: "MoonFilled"
});

//#endregion
export { MoonFilled as default };