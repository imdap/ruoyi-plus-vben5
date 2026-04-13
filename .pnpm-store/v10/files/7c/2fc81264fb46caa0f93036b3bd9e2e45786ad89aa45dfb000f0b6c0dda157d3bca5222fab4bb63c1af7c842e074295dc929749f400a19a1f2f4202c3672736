import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import BankFilledSvg from "@ant-design/icons-svg/es/asn/BankFilled.js";

//#region src/icons/BankFilled.tsx
/**![bank](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg5NCA0NjJjMzAuOSAwIDQzLjgtMzkuNyAxOC43LTU4TDUzMC44IDEyNi4yYTMxLjgxIDMxLjgxIDAgMDAtMzcuNiAwTDExMS4zIDQwNGMtMjUuMSAxOC4yLTEyLjIgNTggMTguOCA1OEgxOTJ2Mzc0aC03MmMtNC40IDAtOCAzLjYtOCA4djUyYzAgNC40IDMuNiA4IDggOGg3ODRjNC40IDAgOC0zLjYgOC04di01MmMwLTQuNC0zLjYtOC04LThoLTcyVjQ2Mmg2MnpNMzgxIDgzNkgyNjRWNDYyaDExN3YzNzR6bTE4OSAwSDQ1M1Y0NjJoMTE3djM3NHptMTkwIDBINjQyVjQ2MmgxMTh2Mzc0eiIgLz48L3N2Zz4=) */
const BankFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": BankFilledSvg }), null);
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
	name: "BankFilled"
});

//#endregion
export { BankFilled as default };