import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import StockOutlinedSvg from "@ant-design/icons-svg/es/asn/StockOutlined.js";

//#region src/icons/StockOutlined.tsx
/**![stock](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkwNCA3NDdIMTIwYy00LjQgMC04IDMuNi04IDh2NTZjMCA0LjQgMy42IDggOCA4aDc4NGM0LjQgMCA4LTMuNiA4LTh2LTU2YzAtNC40LTMuNi04LTgtOHpNMTY1LjcgNjIxLjhsMzkuNyAzOS41YzMuMSAzLjEgOC4yIDMuMSAxMS4zIDBsMjM0LjctMjMzLjkgOTcuNiA5Ny4zYTMyLjExIDMyLjExIDAgMDA0NS4yIDBsMjY0LjItMjYzLjJjMy4xLTMuMSAzLjEtOC4yIDAtMTEuM2wtMzkuNy0zOS42YTguMDMgOC4wMyAwIDAwLTExLjMgMGwtMjM1LjcgMjM1LTk3LjctOTcuM2EzMi4xMSAzMi4xMSAwIDAwLTQ1LjIgMEwxNjUuNyA2MTAuNWE3Ljk0IDcuOTQgMCAwMDAgMTEuM3oiIC8+PC9zdmc+) */
const StockOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": StockOutlinedSvg }), null);
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
	name: "StockOutlined"
});

//#endregion
export { StockOutlined as default };