import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import SwitcherFilledSvg from "@ant-design/icons-svg/es/asn/SwitcherFilled.js";

//#region src/icons/SwitcherFilled.tsx
/**![switcher](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTc1MiAyNDBIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY2MDhjMCAxNy43IDE0LjMgMzIgMzIgMzJoNjA4YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjI3MmMwLTE3LjctMTQuMy0zMi0zMi0zMnpNNTk2IDYwNmMwIDQuNC0zLjYgOC04IDhIMzA4Yy00LjQgMC04LTMuNi04LTh2LTQ4YzAtNC40IDMuNi04IDgtOGgyODBjNC40IDAgOCAzLjYgOCA4djQ4em0yODQtNDk0SDI2NGMtNC40IDAtOCAzLjYtOCA4djU2YzAgNC40IDMuNiA4IDggOGg1NzZ2NTc2YzAgNC40IDMuNiA4IDggOGg1NmM0LjQgMCA4LTMuNiA4LThWMTQ0YzAtMTcuNy0xNC4zLTMyLTMyLTMyeiIgLz48L3N2Zz4=) */
const SwitcherFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": SwitcherFilledSvg }), null);
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
	name: "SwitcherFilled"
});

//#endregion
export { SwitcherFilled as default };