import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import FolderFilledSvg from "@ant-design/icons-svg/es/asn/FolderFilled.js";

//#region src/icons/FolderFilled.tsx
/**![folder](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAyOTguNEg1MjFMNDAzLjcgMTg2LjJhOC4xNSA4LjE1IDAgMDAtNS41LTIuMkgxNDRjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjU5MmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg3MzZjMTcuNyAwIDMyLTE0LjMgMzItMzJWMzMwLjRjMC0xNy43LTE0LjMtMzItMzItMzJ6IiAvPjwvc3ZnPg==) */
const FolderFilled = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": FolderFilledSvg }), null);
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
	name: "FolderFilled"
});

//#endregion
export { FolderFilled as default };