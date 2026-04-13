import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import CreditCardFilledSvg from "@ant-design/icons-svg/es/asn/CreditCardFilled.js";

//#region src/icons/CreditCardFilled.tsx
/**![credit-card](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkyOCAxNjBIOTZjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjE2MGg4OTZWMTkyYzAtMTcuNy0xNC4zLTMyLTMyLTMyek02NCA4MzJjMCAxNy43IDE0LjMgMzIgMzIgMzJoODMyYzE3LjcgMCAzMi0xNC4zIDMyLTMyVjQ0MEg2NHYzOTJ6bTU3OS0xODRjMC00LjQgMy42LTggOC04aDE2NWM0LjQgMCA4IDMuNiA4IDh2NzJjMCA0LjQtMy42IDgtOCA4SDY1MWMtNC40IDAtOC0zLjYtOC04di03MnoiIC8+PC9zdmc+) */
const CreditCardFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": CreditCardFilledSvg }), null);
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
	name: "CreditCardFilled"
});

//#endregion
export { CreditCardFilled as default };