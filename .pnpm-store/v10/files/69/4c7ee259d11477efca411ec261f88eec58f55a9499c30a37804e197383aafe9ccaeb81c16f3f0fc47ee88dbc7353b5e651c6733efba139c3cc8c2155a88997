import AntdIcon from "../components/AntdIcon.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import FolderOutlinedSvg from "@ant-design/icons-svg/es/asn/FolderOutlined.js";

//#region src/icons/FolderOutlined.tsx
/**![folder](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAyOTguNEg1MjFMNDAzLjcgMTg2LjJhOC4xNSA4LjE1IDAgMDAtNS41LTIuMkgxNDRjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjU5MmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg3MzZjMTcuNyAwIDMyLTE0LjMgMzItMzJWMzMwLjRjMC0xNy43LTE0LjMtMzItMzItMzJ6TTg0MCA3NjhIMTg0VjI1NmgxODguNWwxMTkuNiAxMTQuNEg4NDBWNzY4eiIgLz48L3N2Zz4=) */
const FolderOutlined = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		return createVNode(AntdIcon, mergeProps(props, { "icon": FolderOutlinedSvg }), null);
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
	name: "FolderOutlined"
});

//#endregion
export { FolderOutlined as default };